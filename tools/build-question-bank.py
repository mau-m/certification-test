#!/usr/bin/env python3
"""Genera los artefactos consumidos por la web desde los JSON fuente."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
QUESTION_DIR = ROOT / "questions"
SOURCES = (
    QUESTION_DIR / "java.json",
    QUESTION_DIR / "sql.json",
    QUESTION_DIR / "certificacion.json",
    QUESTION_DIR / "ampliacion-avanzada.json",
)


def main() -> None:
    questions = []
    for source in SOURCES:
        with source.open(encoding="utf-8") as file:
            questions.extend(json.load(file))

    ids = [question["id"] for question in questions]
    duplicates = sorted({question_id for question_id in ids if ids.count(question_id) > 1})
    if duplicates:
        raise ValueError(f"IDs duplicados: {', '.join(duplicates)}")

    payload = json.dumps(questions, ensure_ascii=False, indent=2)
    (QUESTION_DIR / "banco-preguntas.json").write_text(payload + "\n", encoding="utf-8")
    (ROOT / "questions.js").write_text(
        "/* Generado por tools/build-question-bank.py. No editar manualmente. */\n"
        f"window.QUESTION_BANK = {payload};\n",
        encoding="utf-8",
    )
    print(f"Banco generado: {len(questions)} preguntas")


if __name__ == "__main__":
    main()
