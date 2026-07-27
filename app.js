/* Simulador de Certificación — lógica de la aplicación (vanilla JS, sin dependencias) */

(function () {
  "use strict";

  const ALL_QUESTIONS = Array.isArray(window.QUESTION_BANK) ? window.QUESTION_BANK : [];

  const CATEGORY_META = {
    java: { label: "Java", badgeClass: "badge-java", ring: "ring-orange-400", text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
    sql: { label: "SQL", badgeClass: "badge-sql", ring: "ring-blue-400", text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
    programacion: { label: "Programación", badgeClass: "badge-programacion", ring: "ring-violet-400", text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200" },
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

  function topicsByCategory(list) {
    const topics = Object.fromEntries(Object.keys(CATEGORY_META).map((category) => [category, new Map()]));
    for (const question of list) {
      const categoryTopics = topics[question.category];
      if (!categoryTopics) continue;
      const topic = question.topic || "General";
      categoryTopics.set(topic, (categoryTopics.get(topic) || 0) + 1);
    }
    return topics;
  }

  function topicKey(category, topic) {
    return `${category}\u001f${topic || "General"}`;
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

  function renderQuestionCode(question, compact = false) {
    if (!question.code) return "";
    const language = escapeHtml(question.language || "código");
    return `
      <div class="question-code rounded-xl overflow-hidden border border-slate-700 ${compact ? "mb-3" : "mb-6"}">
        <div class="bg-slate-800 text-slate-300 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
          <span>Fragmento de código</span>
          <span>${language}</span>
        </div>
        <pre class="font-mono-code bg-slate-950 text-slate-100 overflow-x-auto ${compact ? "text-[11px] p-3" : "text-sm p-4 sm:p-5"} leading-relaxed"><code>${escapeHtml(question.code)}</code></pre>
      </div>`;
  }

  // ---------------------------------------------------------------------
  // Pantalla 1: configuración del examen
  // ---------------------------------------------------------------------
  function renderSetupScreen() {
    const totals = countByCategory(ALL_QUESTIONS);
    const topics = topicsByCategory(ALL_QUESTIONS);
    const totalAvailable = ALL_QUESTIONS.length;
    const codeAvailable = ALL_QUESTIONS.filter((question) => question.code).length;
    const presets = [10, 20, 30, 50, 100, 200];

    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-6 sm:p-9 pop">
        <h2 class="text-xl sm:text-2xl font-bold text-slate-800 mb-1">Configura tu simulacro</h2>
        <p class="text-slate-500 text-sm mb-6">Elige categorías completas o subtemas concretos. Banco disponible: <strong>${totalAvailable}</strong> preguntas, incluidas <strong>${codeAvailable}</strong> de análisis de código.</p>

        <div class="grid md:grid-cols-3 gap-3 mb-4">
          ${Object.keys(CATEGORY_META).map((cat) => {
            const meta = CATEGORY_META[cat];
            const topicEntries = Array.from(topics[cat].entries()).sort((a, b) => a[0].localeCompare(b[0], "es"));
            return `
              <div class="border ${meta.border} ${meta.bg} rounded-xl overflow-hidden">
                <label class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:brightness-95 transition">
                  <input type="checkbox" class="chk w-4 h-4 cat-checkbox" value="${cat}" checked />
                  <span class="flex-1">
                    <span class="block font-semibold ${meta.text}">${meta.label}</span>
                    <span class="block text-xs text-slate-500">${totals[cat]} preguntas · ${topicEntries.length} temas</span>
                  </span>
                </label>
                <details class="border-t ${meta.border} bg-white/50">
                  <summary class="px-4 py-2 text-xs font-semibold ${meta.text} cursor-pointer select-none">
                    Seleccionar subtemas
                    <span class="font-normal text-slate-500">(<span data-selected-count="${cat}">${topicEntries.length}</span>/${topicEntries.length})</span>
                  </summary>
                  <div class="px-3 pb-3">
                    <div class="flex gap-2 py-2 sticky top-0 bg-white/95 z-10">
                      <button type="button" class="topic-action flex-1 rounded-md border ${meta.border} bg-white px-2 py-1 text-[10px] font-bold ${meta.text}" data-category="${cat}" data-action="all">Todos</button>
                      <button type="button" class="topic-action flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-500" data-category="${cat}" data-action="none">Ninguno</button>
                    </div>
                    <div class="max-h-52 overflow-y-auto space-y-1 pr-1">
                      ${topicEntries.map(([topic, count]) => `
                        <label class="flex items-start gap-2 rounded-md bg-white/70 px-2 py-1.5 text-[11px] cursor-pointer hover:bg-white">
                          <input type="checkbox" class="topic-checkbox chk mt-0.5" data-category="${cat}" data-topic="${encodeURIComponent(topic)}" checked />
                          <span class="flex-1 text-slate-600">${escapeHtml(topic)}</span>
                          <span class="font-bold ${meta.text}">${count}</span>
                        </label>`).join("")}
                    </div>
                  </div>
                </details>
              </div>`;
          }).join("")}
        </div>
        <p class="text-xs text-slate-500 mb-6">Marca una categoría completa o abre “Seleccionar subtemas” para practicar contenidos específicos.</p>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-slate-700 mb-2">Cantidad de preguntas</label>
          <div class="flex flex-wrap gap-2 mb-3" id="preset-buttons">
            ${presets.map((n) => `<button type="button" data-preset="${n}" class="preset-btn px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-600 transition">${n}</button>`).join("")}
            <button type="button" data-preset="all" class="preset-btn px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-600 transition">Todas</button>
          </div>
          <div class="flex items-center gap-3">
            <input type="number" id="question-count" min="1" max="${totalAvailable}" value="20"
              class="w-28 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <span class="text-sm text-slate-500">preguntas (máximo <span id="max-count-label">${totalAvailable}</span> según subtemas seleccionados)</span>
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
    const categoryCheckboxes = Array.from(document.querySelectorAll(".cat-checkbox"));
    const topicCheckboxes = Array.from(document.querySelectorAll(".topic-checkbox"));

    function selectedTopicKeys() {
      return topicCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => topicKey(
          checkbox.dataset.category,
          decodeURIComponent(checkbox.dataset.topic)
        ));
    }

    function countByTopicFiltered(keys) {
      const selected = new Set(keys);
      return ALL_QUESTIONS.filter((question) =>
        selected.has(topicKey(question.category, question.topic))
      ).length;
    }

    function syncCategory(category) {
      const categoryCheckbox = categoryCheckboxes.find((checkbox) => checkbox.value === category);
      const categoryTopics = topicCheckboxes.filter((checkbox) => checkbox.dataset.category === category);
      const selectedCount = categoryTopics.filter((checkbox) => checkbox.checked).length;
      categoryCheckbox.checked = selectedCount > 0;
      categoryCheckbox.indeterminate = selectedCount > 0 && selectedCount < categoryTopics.length;
      const countLabel = document.querySelector(`[data-selected-count="${category}"]`);
      if (countLabel) countLabel.textContent = String(selectedCount);
    }

    function setCategoryTopics(category, checked) {
      topicCheckboxes
        .filter((checkbox) => checkbox.dataset.category === category)
        .forEach((checkbox) => { checkbox.checked = checked; });
      syncCategory(category);
      refreshMax();
    }

    function refreshMax() {
      const max = countByTopicFiltered(selectedTopicKeys());
      countInput.max = String(Math.max(max, 1));
      maxLabel.textContent = String(max);
      if (parseInt(countInput.value, 10) > max) countInput.value = String(Math.max(max, 1));
      document.getElementById("setup-error").classList.add("hidden");
    }

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => setCategoryTopics(checkbox.value, checkbox.checked));
    });
    topicCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        syncCategory(checkbox.dataset.category);
        refreshMax();
      });
    });
    document.querySelectorAll(".topic-action").forEach((button) => {
      button.addEventListener("click", () => {
        setCategoryTopics(button.dataset.category, button.dataset.action === "all");
      });
    });

    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const max = countByTopicFiltered(selectedTopicKeys());
        const preset = btn.dataset.preset;
        countInput.value = preset === "all" ? String(max) : String(Math.min(parseInt(preset, 10), max));
      });
    });

    document.getElementById("start-btn").addEventListener("click", () => {
      const selectedTopics = selectedTopicKeys();
      const errorBox = document.getElementById("setup-error");
      const max = countByTopicFiltered(selectedTopics);
      const requested = parseInt(countInput.value, 10);

      if (selectedTopics.length === 0) {
        errorBox.textContent = "Selecciona al menos un subtema.";
        errorBox.classList.remove("hidden");
        return;
      }
      if (!requested || requested < 1) {
        errorBox.textContent = "Ingresa una cantidad válida de preguntas.";
        errorBox.classList.remove("hidden");
        return;
      }
      if (requested > max) {
        errorBox.textContent = `Solo hay ${max} preguntas disponibles para los subtemas seleccionados.`;
        errorBox.classList.remove("hidden");
        return;
      }

      startSession(selectedTopics, requested);
    });

    Object.keys(CATEGORY_META).forEach(syncCategory);
    refreshMax();
  }

  // ---------------------------------------------------------------------
  // Sesión de examen
  // ---------------------------------------------------------------------
  function startSession(selectedTopics, count) {
    const topicFilter = new Set(selectedTopics);
    const pool = ALL_QUESTIONS.filter((question) =>
      topicFilter.has(topicKey(question.category, question.topic))
    );
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
      selectedTopics: selectedTopics.slice(),
    };

    renderQuestionScreen();
  }

  function renderQuestionScreen() {
    const { questions, currentIndex } = session;
    const q = questions[currentIndex];
    const meta = CATEGORY_META[q.category] || CATEGORY_META.programacion;
    const total = questions.length;
    const progressPct = Math.round((currentIndex / total) * 100);
    const letters = ["A", "B", "C", "D", "E", "F"];

    app.innerHTML = `
      <div class="glass rounded-2xl shadow-2xl p-6 sm:p-8 fade-in">
        <div class="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <span class="badge-${q.category} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">${meta.label}</span>
          <span class="text-xs text-slate-500 font-medium flex items-center gap-2">
            ${escapeHtml(q.topic || "")}
            ${q.code ? `<span class="rounded-full bg-slate-800 text-white px-2 py-0.5 text-[9px] font-bold uppercase">Código</span>` : ""}
          </span>
          <span class="text-sm font-semibold text-slate-600">Pregunta ${currentIndex + 1} / ${total}</span>
        </div>

        <div class="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
          <div class="progress-fill h-full bg-gradient-to-r from-blue-600 via-orange-500 to-red-600" style="width:${progressPct}%"></div>
        </div>

        <div class="mb-6">
          ${renderQuestionCode(q)}
          <div class="text-lg sm:text-xl font-bold text-slate-800">${renderTextBlock(q.question)}</div>
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
        ${q.source ? `<p class="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200"><strong>Fuente de estudio:</strong> ${escapeHtml(q.source)}</p>` : ""}
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
                  <span class="badge-${q.category} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${(CATEGORY_META[q.category] || CATEGORY_META.programacion).label}</span>
                  <span class="text-[11px] text-slate-500">${escapeHtml(q.topic || "")}</span>
                </div>
                ${renderQuestionCode(q, true)}
                <div class="text-sm font-semibold text-slate-800 mb-2">${renderTextBlock(q.question)}</div>
                <div class="text-xs text-slate-600 mb-2"><strong>Tu respuesta:</strong><div class="mt-1">${a.selectedIndex !== null && a.selectedIndex !== undefined ? renderInlineOrCode(String(q.options[a.selectedIndex])) : "(sin respuesta)"}</div></div>
                <div class="text-xs text-emerald-700 mb-2"><strong>Correcta:</strong><div class="mt-1">${renderInlineOrCode(String(q.options[q.correctIndex]))}</div></div>
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

    const lastTopics = session.selectedTopics.slice();
    const lastCount = questions.length;

    document.getElementById("retry-same-btn").addEventListener("click", () => startSession(lastTopics, lastCount));
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
