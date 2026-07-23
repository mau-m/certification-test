# Simulador de certificación técnica

Página estática para practicar Java, SQL, diseño y buenas prácticas, seguridad y
testing mediante preguntas de opción múltiple con explicación inmediata.

## Ejecutar

Abre `index.html` en un navegador. No requiere dependencias ni servidor.

## Banco de preguntas

Los JSON fuente viven en `questions/`. Después de modificarlos, regenera
`questions/banco-preguntas.json` y `questions.js`:

```bash
python3 tools/build-question-bank.py
```

El banco contiene preguntas de seis categorías:

- Java
- SQL
- Certificación
- Buenas prácticas
- Seguridad
- Testing

La teoría consolidada de los documentos MDX y las referencias usadas para la
ampliación están en `guia-estudio-ampliada.md`.
