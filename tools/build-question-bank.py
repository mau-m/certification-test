#!/usr/bin/env python3
"""Genera los artefactos consumidos por la web desde los JSON fuente en questions/."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
QUESTION_DIR = ROOT / "questions"
SOURCES = (
    QUESTION_DIR / "java.json",
    QUESTION_DIR / "java-maven.json",
    QUESTION_DIR / "java-testing.json",
    QUESTION_DIR / "spring.json",
    QUESTION_DIR / "sql.json",
    QUESTION_DIR / "sql-oracle.json",
    QUESTION_DIR / "sql-postgresql.json",
    QUESTION_DIR / "software-engineering.json",
    QUESTION_DIR / "git.json",
    QUESTION_DIR / "docker.json",
)

REQUIRED_FIELDS = ("id", "category", "topic", "question", "options", "correctIndex", "explanation")


def validate(question: dict, source: Path) -> None:
    missing = [field for field in REQUIRED_FIELDS if field not in question]
    if missing:
        raise ValueError(f"{source.name}: pregunta {question.get('id', '?')} sin campos {missing}")
    options = question["options"]
    if not isinstance(options, list) or len(options) < 2:
        raise ValueError(f"{source.name}: pregunta {question['id']} necesita al menos 2 opciones")
    if len(set(options)) != len(options):
        raise ValueError(f"{source.name}: pregunta {question['id']} tiene opciones duplicadas")
    correct = question["correctIndex"]
    if not isinstance(correct, int) or not (0 <= correct < len(options)):
        raise ValueError(f"{source.name}: pregunta {question['id']} tiene correctIndex inválido")


def main() -> None:
    questions = []
    counts = {}
    for source in SOURCES:
        if not source.exists():
            print(f"Aviso: no se encontró {source}, se omite.")
            continue
        with source.open(encoding="utf-8") as file:
            loaded = json.load(file)
        for question in loaded:
            validate(question, source)
        counts[source.stem] = len(loaded)
        questions.extend(loaded)

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

    print("Banco generado:")
    for name, count in counts.items():
        print(f"  {name}: {count}")
    print(f"  TOTAL: {len(questions)}")


if __name__ == "__main__":
    main()
