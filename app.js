/* Simulador de Certificación — lógica de la aplicación (vanilla JS, sin dependencias) */

(function () {
  "use strict";

  const ALL_QUESTIONS = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];

  const CATEGORY_META = {
    java: { label: "Java", badgeClass: "badge-java", ring: "ring-orange-400", text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
    sql: { label: "SQL", badgeClass: "badge-sql", ring: "ring-blue-400", text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
    certificacion: { label: "Certificación", badgeClass: "badge-certificacion", ring: "ring-red-400", text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
    "buenas-practicas": { label: "Buenas prácticas", badgeClass: "badge-buenas-practicas", ring: "ring-violet-400", text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
    seguridad: { label: "Seguridad", badgeClass: "badge-seguridad", ring: "ring-rose-400", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
    testing: { label: "Testing", badgeClass: "badge-testing", ring: "ring-emerald-400", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  };

  const app = document.getElementById("app");

  /** Estado global de la sesión de examen en curso */
  let session = null;

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function countByCategory(list) {
    const counts = Object.fromEntries(Object.keys(CATEGORY_META).map((category) => [category, 0]));
    for (const q of list) {
      if (counts[q.category] !== undefined) counts[q.category]++;
    }
    return counts;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /** Renderiza texto de pregunta/opción: si contiene salto de línea, se muestra como bloque de código monoespaciado */
  function renderTextBlock(text) {
    const safe = escapeHtml(text);
    if (text.includes("\n")) {
      return `<pre class="code-block font-mono-code mt-2">${safe}</pre>`;
    }
    return `<p class="leading-relaxed">${safe}</p>`;
  }

  function renderInlineOrCode(text) {
    const safe = escapeHtml(text);
    if (text.includes("\n")) {
      return `<pre class="code-block font-mono-code text-sm">${safe}</pre>`;
    }
    return safe;
  }

  // ---------------------------------------------------------------------
  // Pantalla 1: configuración del examen
  // ---------------------------------------------------------------------
  function renderSetupScreen() {
    const totals = countByCategory(ALL_QUESTIONS);
    const totalAvailable = ALL_QUESTIONS.length;
    const presets = [10, 20, 30, 50, 100];

    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-6 sm:p-9 pop">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Configura tu simulacro</h2>
        <p class="text-slate-500 text-sm mb-6">Elige cuántas preguntas quieres responder y de qué categorías. Banco total disponible: <strong>${totalAvailable}</strong> preguntas.</p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          ${Object.keys(CATEGORY_META).map((cat) => {
            const meta = CATEGORY_META[cat];
            return `
              <label class="flex items-center gap-3 border ${meta.border} ${meta.bg} rounded-xl px-4 py-3 cursor-pointer hover:brightness-95 transition">
                <input type="checkbox" class="chk w-4 h-4 cat-checkbox" value="${cat}" checked />
                <span class="flex-1">
                  <span class="block font-semibold ${meta.text}">${meta.label}</span>
                  <span class="block text-xs text-slate-500">${totals[cat]} preguntas</span>
                </span>
              </label>`;
          }).join("")}
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 mb-2">Cantidad de preguntas</label>
          <div class="flex flex-wrap gap-2 mb-3" id="preset-buttons">
            ${presets.map((n) => `<button type="button" data-preset="${n}" class="preset-btn px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-600 transition">${n}</button>`).join("")}
            <button type="button" data-preset="all" class="preset-btn px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-600 transition">Todas</button>
          </div>
          <div class="flex items-center gap-3">
            <input type="number" id="question-count" min="1" max="${totalAvailable}" value="20"
              class="w-28 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <span class="text-sm text-slate-500">preguntas (máximo <span id="max-count-label">${totalAvailable}</span> según categorías seleccionadas)</span>
          </div>
        </div>

        <div id="setup-error" class="hidden text-sm text-red-600 font-medium mb-4"></div>

        <button id="start-btn" class="w-full bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.99] transition">
          Comenzar simulacro →
        </button>
      </div>
    `;

    const countInput = document.getElementById("question-count");
    const maxLabel = document.getElementById("max-count-label");
    const checkboxes = Array.from(document.querySelectorAll(".cat-checkbox"));

    function currentMax() {
      const selected = checkboxes.filter((c) => c.checked).map((c) => c.value);
      return countByCategoryFiltered(selected);
    }
    function countByCategoryFiltered(selectedCats) {
      return ALL_QUESTIONS.filter((q) => selectedCats.includes(q.category)).length;
    }

    function refreshMax() {
      const max = currentMax();
      countInput.max = String(Math.max(max, 1));
      maxLabel.textContent = String(max);
      if (parseInt(countInput.value, 10) > max) countInput.value = String(Math.max(max, 1));
    }

    checkboxes.forEach((c) => c.addEventListener("change", refreshMax));

    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const max = currentMax();
        const preset = btn.dataset.preset;
        countInput.value = preset === "all" ? String(max) : String(Math.min(parseInt(preset, 10), max));
      });
    });

    document.getElementById("start-btn").addEventListener("click", () => {
      const selectedCats = checkboxes.filter((c) => c.checked).map((c) => c.value);
      const errorBox = document.getElementById("setup-error");
      const max = countByCategoryFiltered(selectedCats);
      const requested = parseInt(countInput.value, 10);

      if (selectedCats.length === 0) {
        errorBox.textContent = "Selecciona al menos una categoría.";
        errorBox.classList.remove("hidden");
        return;
      }
      if (!requested || requested < 1) {
        errorBox.textContent = "Ingresa una cantidad válida de preguntas.";
        errorBox.classList.remove("hidden");
        return;
      }
      if (requested > max) {
        errorBox.textContent = `Solo hay ${max} preguntas disponibles para las categorías seleccionadas.`;
        errorBox.classList.remove("hidden");
        return;
      }

      startSession(selectedCats, requested);
    });

    refreshMax();
  }

  // ---------------------------------------------------------------------
  // Sesión de examen
  // ---------------------------------------------------------------------
  function startSession(selectedCats, count) {
    const pool = ALL_QUESTIONS.filter((q) => selectedCats.includes(q.category));
    const chosen = shuffle(pool).slice(0, count).map((q) => {
      // Baraja las opciones y recalcula el índice correcto, para que no siempre esté en el mismo lugar
      const optionOrder = shuffle(q.options.map((_, idx) => idx));
      const options = optionOrder.map((idx) => q.options[idx]);
      const correctIndex = optionOrder.indexOf(q.correctIndex);
      return { ...q, options, correctIndex };
    });

    session = {
      questions: chosen,
      currentIndex: 0,
      answers: [], // { selectedIndex, correct }
      selectedOption: null,
      answered: false,
    };

    renderQuestionScreen();
  }

  function renderQuestionScreen() {
    const { questions, currentIndex } = session;
    const q = questions[currentIndex];
    const meta = CATEGORY_META[q.category] || CATEGORY_META.certificacion;
    const total = questions.length;
    const progressPct = Math.round((currentIndex / total) * 100);
    const letters = ["A", "B", "C", "D", "E", "F"];

    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-6 sm:p-8 fade-in">
        <div class="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <span class="badge-${q.category} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">${meta.label}</span>
          <span class="text-xs text-slate-500 font-medium">${escapeHtml(q.topic || "")}</span>
          <span class="text-sm font-semibold text-slate-600">Pregunta ${currentIndex + 1} / ${total}</span>
        </div>

        <div class="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div class="progress-fill h-full bg-gradient-to-r from-blue-600 via-orange-500 to-red-600" style="width:${progressPct}%"></div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg sm:text-xl font-bold text-slate-800">${renderTextBlock(q.question)}</h3>
        </div>

        <div id="options-container" class="space-y-3 mb-6"></div>

        <div id="explanation-box" class="hidden mb-6"></div>

        <div class="flex items-center justify-between gap-3">
          <div id="score-preview" class="text-sm text-slate-500 font-medium">
            Puntaje actual: <strong>${session.answers.filter((a) => a.correct).length}</strong> / ${session.answers.length}
          </div>
          <button id="action-btn" disabled
            class="bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-105 active:scale-[0.98] transition">
            Enviar respuesta
          </button>
        </div>
      </div>
    `;

    const optionsContainer = document.getElementById("options-container");
    session.selectedOption = null;
    session.answered = false;

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn w-full text-left border-2 border-slate-200 rounded-xl px-4 py-3 flex items-start gap-3 hover:border-orange-300 hover:bg-orange-50/40";
      btn.dataset.index = String(idx);
      btn.innerHTML = `
        <span class="flex-shrink-0 w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500 option-letter">${letters[idx]}</span>
        <span class="flex-1 text-slate-700 option-text">${renderInlineOrCode(opt)}</span>
      `;
      btn.addEventListener("click", () => selectOption(idx));
      optionsContainer.appendChild(btn);
    });

    const actionBtn = document.getElementById("action-btn");
    actionBtn.addEventListener("click", handleActionClick);
  }

  function selectOption(idx) {
    if (session.answered) return;
    session.selectedOption = idx;
    const buttons = document.querySelectorAll("#options-container .option-btn");
    buttons.forEach((b) => {
      const active = parseInt(b.dataset.index, 10) === idx;
      b.classList.toggle("border-orange-500", active);
      b.classList.toggle("bg-orange-50", active);
      b.classList.toggle("ring-2", active);
      b.classList.toggle("ring-orange-300", active);
    });
    document.getElementById("action-btn").disabled = false;
  }

  function handleActionClick() {
    if (!session.answered) {
      submitAnswer();
    } else {
      advanceQuestion();
    }
  }

  function submitAnswer() {
    const q = session.questions[session.currentIndex];
    const selected = session.selectedOption;
    const correct = selected === q.correctIndex;

    session.answered = true;
    session.answers.push({ questionId: q.id, selectedIndex: selected, correct });

    const buttons = document.querySelectorAll("#options-container .option-btn");
    buttons.forEach((b) => {
      const idx = parseInt(b.dataset.index, 10);
      b.disabled = true;
      b.classList.remove("hover:border-orange-300", "hover:bg-orange-50/40");
      const letterSpan = b.querySelector(".option-letter");
      if (idx === q.correctIndex) {
        b.classList.add("border-emerald-500", "bg-emerald-50");
        letterSpan.classList.add("bg-emerald-500", "border-emerald-500", "text-white");
      } else if (idx === selected) {
        b.classList.add("border-red-500", "bg-red-50");
        letterSpan.classList.add("bg-red-500", "border-red-500", "text-white");
      } else {
        b.classList.add("opacity-60");
      }
    });

    const explanationBox = document.getElementById("explanation-box");
    explanationBox.classList.remove("hidden");
    explanationBox.innerHTML = `
      <div class="fade-in rounded-xl border-2 ${correct ? "border-emerald-300 bg-emerald-50" : "border-red-300 bg-red-50"} p-4">
        <p class="font-bold ${correct ? "text-emerald-700" : "text-red-700"} mb-1 flex items-center gap-2">
          <span class="text-lg">${correct ? "✓" : "✗"}</span>
          ${correct ? "¡Correcto!" : "Incorrecto"}
        </p>
        <p class="text-sm text-slate-700 leading-relaxed">${escapeHtml(q.explanation)}</p>
      </div>
    `;

    const actionBtn = document.getElementById("action-btn");
    const isLast = session.currentIndex === session.questions.length - 1;
    actionBtn.textContent = isLast ? "Ver resultados →" : "Siguiente pregunta →";
    actionBtn.disabled = false;

    document.getElementById("score-preview").innerHTML =
      `Puntaje actual: <strong>${session.answers.filter((a) => a.correct).length}</strong> / ${session.answers.length}`;
  }

  function advanceQuestion() {
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex++;
      renderQuestionScreen();
    } else {
      renderResultsScreen();
    }
  }

  // ---------------------------------------------------------------------
  // Pantalla final: resultados
  // ---------------------------------------------------------------------
  function renderResultsScreen() {
    const { questions, answers } = session;
    const correctCount = answers.filter((a) => a.correct).length;
    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);

    const byCategory = {};
    questions.forEach((q, i) => {
      const cat = q.category;
      if (!byCategory[cat]) byCategory[cat] = { correct: 0, total: 0 };
      byCategory[cat].total++;
      if (answers[i].correct) byCategory[cat].correct++;
    });

    let scoreColor = "text-red-600";
    let scoreMsg = "Sigue practicando — repasa los módulos donde fallaste.";
    if (pct >= 85) { scoreColor = "text-emerald-600"; scoreMsg = "¡Excelente dominio del contenido!"; }
    else if (pct >= 70) { scoreColor = "text-blue-600"; scoreMsg = "Buen desempeño, ya casi dominas el temario."; }
    else if (pct >= 50) { scoreColor = "text-orange-600"; scoreMsg = "Vas por buen camino, pero conviene repasar más."; }

    const missed = questions
      .map((q, i) => ({ q, a: answers[i] }))
      .filter((x) => !x.a.correct);

    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-6 sm:p-9 pop">
        <div class="text-center mb-8">
          <p class="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Resultado final</p>
          <div class="text-6xl font-extrabold ${scoreColor} mb-2">${pct}%</div>
          <p class="text-slate-700 font-medium">${correctCount} de ${total} respuestas correctas</p>
          <p class="text-sm text-slate-500 mt-1">${scoreMsg}</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          ${Object.keys(CATEGORY_META).map((cat) => {
            const meta = CATEGORY_META[cat];
            const stats = byCategory[cat];
            if (!stats) return "";
            const catPct = Math.round((stats.correct / stats.total) * 100);
            return `
              <div class="border ${meta.border} ${meta.bg} rounded-xl p-4 text-center">
                <p class="text-xs font-bold ${meta.text} uppercase tracking-wide mb-1">${meta.label}</p>
                <p class="text-2xl font-extrabold text-slate-800">${catPct}%</p>
                <p class="text-xs text-slate-500">${stats.correct} / ${stats.total} correctas</p>
              </div>`;
          }).join("")}
        </div>

        ${missed.length > 0 ? `
        <div class="mb-8">
          <h3 class="font-bold text-slate-800 mb-3">Preguntas para repasar (${missed.length})</h3>
          <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
            ${missed.map(({ q, a }) => `
              <div class="border border-red-200 bg-red-50/60 rounded-xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge-${q.category} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${CATEGORY_META[q.category].label}</span>
                  <span class="text-[11px] text-slate-500">${escapeHtml(q.topic || "")}</span>
                </div>
                <div class="text-sm font-semibold text-slate-800 mb-2">${renderTextBlock(q.question)}</div>
                <p class="text-xs text-slate-600 mb-1"><strong>Tu respuesta:</strong> ${a.selectedIndex !== null && a.selectedIndex !== undefined ? escapeHtml(String(q.options[a.selectedIndex])) : "(sin respuesta)"}</p>
                <p class="text-xs text-emerald-700 mb-2"><strong>Correcta:</strong> ${escapeHtml(String(q.options[q.correctIndex]))}</p>
                <p class="text-xs text-slate-600 bg-white/70 rounded-lg p-2">${escapeHtml(q.explanation)}</p>
              </div>
            `).join("")}
          </div>
        </div>` : `
        <div class="mb-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p class="text-emerald-700 font-semibold">¡Respondiste todo correctamente! 🎉</p>
        </div>`}

        <div class="flex flex-col sm:flex-row gap-3">
          <button id="retry-same-btn" class="flex-1 border-2 border-slate-300 text-slate-700 font-bold py-3 rounded-xl hover:border-orange-400 hover:text-orange-600 transition">
            Repetir con la misma configuración
          </button>
          <button id="new-quiz-btn" class="flex-1 bg-gradient-to-r from-blue-600 via-orange-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-105 active:scale-[0.99] transition">
            Nuevo simulacro
          </button>
        </div>
      </div>
    `;

    const lastCats = [...new Set(questions.map((q) => q.category))];
    const lastCount = questions.length;

    document.getElementById("retry-same-btn").addEventListener("click", () => startSession(lastCats, lastCount));
    document.getElementById("new-quiz-btn").addEventListener("click", renderSetupScreen);
  }

  // Atajos de teclado: 1-4 selecciona opción, Enter envía/avanza
  document.addEventListener("keydown", (e) => {
    if (!session) return;
    const optionButtons = document.querySelectorAll("#options-container .option-btn");
    if (!session.answered && ["1", "2", "3", "4", "5", "6"].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      if (optionButtons[idx]) selectOption(idx);
    }
    if (e.key === "Enter") {
      const actionBtn = document.getElementById("action-btn");
      if (actionBtn && !actionBtn.disabled) actionBtn.click();
    }
  });

  // ---------------------------------------------------------------------
  // Arranque
  // ---------------------------------------------------------------------
  if (ALL_QUESTIONS.length === 0) {
    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-8 text-center">
        <p class="text-red-600 font-bold">No se encontró el banco de preguntas.</p>
        <p class="text-slate-500 text-sm mt-2">Verifica que <span class="font-mono-code">questions.js</span> esté cargado antes de <span class="font-mono-code">app.js</span> y que defina <span class="font-mono-code">window.QUESTION_BANK</span>.</p>
      </div>`;
  } else {
    renderSetupScreen();
  }
})();
