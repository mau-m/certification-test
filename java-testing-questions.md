# Banco de certificación: testing Java con JUnit y Mockito

100 preguntas basadas en [`java-testing-guide.md`](java-testing-guide.md). Salvo indicación **“selecciona dos”**, cada reactivo tiene una sola respuesta. El objetivo no es memorizar anotaciones: debes identificar qué evidencia aporta una prueba, qué costo tiene y qué contrato está verificando.

Las soluciones están plegadas para permitir simulaciones. Los fragmentos presuponen imports y clases de dominio razonables, excepto cuando el enunciado pregunta por compilación o configuración.

## Uso y calificación

- Simulación completa: 120 minutos; por bloque: 25 preguntas en 30 minutos.
- 1 punto por respuesta y sin penalización por error.
- 80–89 indica dominio operativo; 90–100, dominio avanzado.
- En cada error anota qué evidencia aportaría la opción correcta y qué falsa confianza produciría el distractor elegido.

## Bloque I — Estrategia y JUnit esencial (1–25)

### 1. ¿Qué propiedad se viola si una prueba pasa sola pero falla después de otra?

- A. Legibilidad.
- B. Aislamiento.
- C. Cobertura de líneas.
- D. Parametrización.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La prueba depende de estado u orden compartido y no controla sus precondiciones. Cada caso debe poder ejecutarse independientemente; ordenar pruebas rara vez corrige la causa. Referencia: §1 y §6.

</details>

### 2. ¿Qué pregunta responde principalmente una prueba de integración de repositorio contra PostgreSQL real?

- A. Si una regla aritmética pura devuelve el valor correcto.
- B. Si el nombre de una clase cumple convención.
- C. Si Mockito puede devolver un `Optional`.
- D. Si mapping, SQL, constraints, driver y motor colaboran realmente.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Una integración cruza una frontera técnica real. Es más lenta y costosa que una unitaria, pero detecta diferencias que un mock o una base distinta no pueden demostrar. Referencia: §2.

</details>

### 3. En testing, una “unidad” se define mejor como:

- A. Exactamente un método privado.
- B. Todo el proceso desplegado.
- C. Cualquier clase creada por Mockito.
- D. Una porción de comportamiento con una razón clara para fallar.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Una clase suele ser buena frontera, pero el comportamiento puede involucrar varios objetos baratos sin perder aislamiento. Forzar “un método” empuja a probar implementación. Referencia: §2.1.

</details>

### 4. Un método debe publicar un evento cuando completa una orden. ¿Qué observación es apropiada?

- A. Verificar que el publicador recibió el evento, porque esa interacción es el efecto observable.
- B. Medir cobertura y no hacer aserciones.
- C. Comprobar el nombre de la clase proxy.
- D. Verificar todos sus métodos privados.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Cuando el contrato es enviar un mensaje a una frontera, verificar la interacción tiene sentido. Para cálculos y objetos devueltos suele preferirse verificar estado. Referencia: §1.2.

</details>

### 5. ¿Qué componente de JUnit descubre motores y coordina su ejecución desde Maven o un IDE?

- A. Jupiter Assertions únicamente.
- B. Mockito Core.
- C. JUnit Platform.
- D. Maven Compiler Plugin.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Platform define launcher y descubrimiento de TestEngines. Jupiter es un motor y modelo de programación que aporta `@Test`, lifecycle, aserciones y extensiones. Referencia: §3.

</details>

### 6. ¿Qué requisito de runtime introduce JUnit 6?

- A. Java 8 exactamente.
- B. Spring Boot obligatorio.
- C. Java 17 o superior para ejecutar JUnit.
- D. Solo puede ejecutarse en módulos JPMS.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** JUnit 6 requiere Java 17 en runtime, aunque puede probar código compilado para targets anteriores. El framework no exige Spring ni module path. Referencia: §3.

</details>

### 7. ¿Qué import identifica una prueba Jupiter, no JUnit 4?

- A. `org.junit.Test`
- B. `org.mockito.Test`
- C. `org.junit.jupiter.api.Test`
- D. `java.testing.Test`

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Jupiter conserva `jupiter` en sus paquetes incluso en JUnit 6. Mezclar el import de JUnit 4 puede provocar que otro motor o ninguna configuración descubra la prueba. Referencia: §3.

</details>

### 8. ¿Por qué se importa `junit-bom` en `dependencyManagement`?

- A. Para ejecutar automáticamente todas las pruebas al abrir el IDE.
- B. Para cambiar el JDK instalado.
- C. Para alinear versiones compatibles de los módulos JUnit sin repetirlas.
- D. Para añadir Mockito transitivamente siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un BOM administra versiones; todavía se declaran los módulos usados, como `junit-jupiter`. No inicia pruebas ni instala Java. Referencia: §4.

</details>

### 9. ¿Qué scope deben usar `junit-jupiter` y `mockito-junit-jupiter`?

- A. `import`
- B. `runtime`
- C. `compile`
- D. `test`

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Son herramientas de prueba y no deben llegar al classpath/artefacto de producción. El BOM usa `import`, no las dependencias de ejecución de tests. Referencia: §4.

</details>

### 10. En el patrón AAA, ¿qué corresponde a **Act**?

- A. Ejecutar la única acción principal cuyo comportamiento se prueba.
- B. Construir datos y dobles.
- C. Comparar resultados.
- D. Limpiar reportes de Maven.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Arrange prepara, Act ejecuta y Assert observa. Mantener una acción principal reduce ambigüedad sobre qué produjo el fallo. Referencia: §5.

</details>

### 11. ¿Cuál nombre comunica mejor escenario y resultado?

- A. `test1()`
- B. `testTransfer()`
- C. `rejectsTransferWhenBalanceIsInsufficient()`
- D. `methodWorks()`

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El nombre funciona como especificación y ayuda a interpretar reportes. No necesita repetir “test”; debe describir condición y comportamiento observable. Referencia: §1.1 y §5.

</details>

### 12. ¿Qué aporta `assertAll`?

- A. Ejecuta automáticamente todas las clases del módulo.
- B. Agrupa aserciones relacionadas e informa múltiples fallos del mismo resultado.
- C. Convierte cualquier excepción en éxito.
- D. Hace atómica una prueba paralela.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Las aserciones del grupo se evalúan para presentar varios defectos coherentes. No debe usarse si una aserción depende lógicamente de que otra haya pasado. Referencia: §5.1 y §7.3.

</details>

### 13. ¿Cuál diferencia existe entre `assertEquals(a, b)` y `assertSame(a, b)`?

- A. `assertEquals` solo acepta primitivos.
- B. Ninguna.
- C. `assertSame` llama `hashCode`.
- D. `assertEquals` usa igualdad; `assertSame` exige la misma referencia.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Para objetos, `assertEquals` evalúa el contrato `equals`; `assertSame` compara identidad como `==`. Usar identidad para objetos de valor suele afirmar algo más fuerte e irrelevante. Referencia: §7.1.

</details>

### 14. ¿Cómo se compara normalmente un resultado `double` sujeto a error de punto flotante?

- A. `assertSame(expected, actual)`.
- B. Convertir ambos a `int` siempre.
- C. `assertEquals(expected, actual, delta)` con tolerancia justificada.
- D. Comparar sus `toString`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La tolerancia expresa el error aceptable del dominio/cálculo. Para dinero se prefiere modelado decimal, no una tolerancia arbitraria sobre `double`. Referencia: §7.1.

</details>

### 15. ¿Qué ventaja tiene pasar un `Supplier<String>` como mensaje de aserción?

- A. Evita escribir la aserción.
- B. Hace que la prueba sea paralela.
- C. El mensaje se calcula solo si la aserción falla.
- D. Cambia expected por actual.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La evaluación perezosa evita construir mensajes costosos en la ruta exitosa. El mensaje debe aportar contexto diagnóstico, no repetir la comparación. Referencia: §7.2.

</details>

### 16. ¿Qué acepta `assertThrows(IOException.class, executable)`?

- A. Únicamente `IOException` exacta.
- B. Ninguna excepción.
- C. `IOException` o una subclase.
- D. Cualquier `Throwable`, incluso si no es IOException.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `assertThrows` usa compatibilidad de tipo. Para exigir la clase exacta existe `assertThrowsExactly`. Limita el executable a la operación que debe fallar. Referencia: §8.1.

</details>

### 17. ¿Cuándo es más apropiado `assertThrowsExactly`?

- A. Para medir timeout.
- B. En toda prueba, sin excepción.
- C. Para comprobar que nada falla.
- D. Cuando el contrato distingue la clase concreta y una subclase indicaría otro fallo.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La exactitud solo aporta valor si forma parte del contrato. En otros casos acopla la prueba a una implementación innecesariamente específica. Referencia: §8.1.

</details>

### 18. ¿Qué riesgo particular tiene `assertTimeoutPreemptively`?

- A. Nunca detecta un timeout.
- B. Hace que todo el proceso termine con `System.exit`.
- C. Solo acepta duraciones de un día.
- D. Ejecuta en otro hilo y puede perder ThreadLocal/contexto o complicar limpieza.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El modo preemptivo intenta abortar trabajo en otro hilo. Esto difiere de `assertTimeout`, que espera terminación y luego evalúa duración. Ninguno sustituye JMH para micro-rendimiento. Referencia: §8.2.

</details>

### 19. ¿Qué significa una prueba abortada por `assumeTrue`?

- A. El comportamiento fue validado correctamente.
- B. La prueba falló por aserción.
- C. La precondición ambiental no se cumplió; no cuenta como éxito funcional.
- D. Mockito no pudo crear un mock.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un supuesto evita ejecutar bajo un entorno no aplicable. Si muchos casos se abortan, la suite puede dar confianza falsa; el reporte debe hacerlo visible. Referencia: §8.3.

</details>

### 20. Con lifecycle predeterminado, ¿cuántas instancias de la clase crea Jupiter para tres métodos de prueba?

- A. Una por suite completa.
- B. Depende de Mockito.
- C. Una por método, normalmente tres.
- D. Ninguna; todos los métodos son estáticos.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `PER_METHOD` ayuda al aislamiento creando una instancia por caso. Campos de instancia no se comparten entre pruebas salvo configuración diferente. Referencia: §6.

</details>

### 21. Con lifecycle predeterminado, ¿qué requisito tiene normalmente `@BeforeAll`?

- A. Ser `private`.
- B. Ser `static`.
- C. Devolver `boolean`.
- D. Llevar también `@Test`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Se ejecuta antes de que exista una instancia por caso, por lo que es estático en `PER_METHOD`. Con `PER_CLASS` puede ser de instancia. Referencia: §6.

</details>

### 22. ¿Qué tradeoff introduce `@TestInstance(PER_CLASS)`?

- A. Prohíbe `@BeforeEach`.
- B. Deshabilita Jupiter.
- C. Reutiliza la instancia y facilita estado compartido accidental.
- D. Ejecuta siempre en paralelo.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Permite `@BeforeAll` no estático y casos específicos, pero los campos persisten entre métodos. Requiere más disciplina de reinicio/aislamiento. Referencia: §6.

</details>

### 23. Una suite usa `@Order(1)` para crear un usuario y `@Order(2)` para editarlo. ¿Cuál es el problema central?

- A. Jupiter no soporta orden.
- B. Los usuarios no pueden editarse en pruebas.
- C. El segundo caso depende del efecto del primero y no es autónomo.
- D. `@Order` obliga a usar Mockito.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La suite es frágil ante selección/reintento/paralelismo. Prepara el usuario en cada caso o expresa el flujo inseparable en un escenario único. Referencia: §6.

</details>

### 24. ¿Qué uso aporta `@Nested`?

- A. Ejecutar únicamente métodos privados.
- B. Descargar dependencias Maven.
- C. Expresar contextos relacionados con preparación legible.
- D. Reemplazar todas las clases de producción.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Las clases anidadas organizan escenarios como “cuenta vacía” y comparten setup contextual. Una profundidad excesiva puede ocultar de dónde proviene el estado. Referencia: §10.1.

</details>

### 25. ¿Qué ventaja principal tiene `@ParameterizedTest` con `@CsvSource`?

- A. Simula colaboradores sin Mockito.
- B. Convierte automáticamente la prueba en integración.
- C. Permite omitir aserciones.
- D. Ejecuta un mismo contrato con varios conjuntos de datos y reporta cada invocación.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Reduce duplicación al recorrer una tabla de ejemplos, especialmente límites y clases de equivalencia. Cada invocación conserva lifecycle de prueba. Referencia: §9.1.

</details>

## Bloque II — JUnit avanzado y pruebas deterministas (26–50)

### 26. Con lifecycle `PER_METHOD`, ¿cómo se declara normalmente un factory usado por `@MethodSource("cases")`?

- A. Como constructor privado únicamente.
- B. Como método `@Test` que devuelve void.
- C. Como método `static`.
- D. Dentro de la clase de producción.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La fuente local suele ser estática porque se resuelve sin una instancia persistente de test. `PER_CLASS` permite fuentes no estáticas. Debe devolver un stream/iterable/arreglo compatible de argumentos. Referencia: §9.1.

</details>

### 27. ¿Qué casos agrega `@NullAndEmptySource` a un parámetro `String`?

- A. Solo `"null"` y `"empty"` como texto.
- B. Todos los strings Unicode.
- C. Un argumento null y otro string vacío.
- D. Un espacio en blanco y un salto de línea.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Combina `@NullSource` y `@EmptySource`. Un string de espacios no es vacío y debe agregarse explícitamente, por ejemplo con `@ValueSource`. Referencia: §9.1.

</details>

### 28. ¿Qué particularidad tienen los `DynamicTest` producidos por una `@TestFactory`?

- A. Cada dynamic test ejecuta automáticamente un nuevo `@BeforeEach` independiente.
- B. Se generan en runtime; el lifecycle se aplica a la fábrica, no como métodos `@Test` separados.
- C. No pueden tener aserciones.
- D. Solo funcionan con JUnit 4.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La fábrica es el nodo de lifecycle y devuelve ejecutables dinámicos. Para tablas fijas, las parametrizadas suelen dar semántica de lifecycle y reportes más sencillos. Referencia: §9.3.

</details>

### 29. ¿Por qué repetir veinte veces una prueba concurrente no demuestra ausencia de carreras?

- A. Porque toda carrera ocurre en la primera ejecución.
- B. Porque Jupiter ignora `@RepeatedTest`.
- C. Porque solo explora algunos interleavings y puede no reproducir el fallo.
- D. Porque los hilos se vuelven secuenciales en test.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El scheduling es enorme y no determinista. Repetir puede aumentar probabilidad, pero no sustituye diseño controlado o herramientas como JCStress para el Java Memory Model. Referencia: §9.2 y §16.4.

</details>

### 30. ¿Qué objetivo razonable tiene `@Tag("slow")`?

- A. Hacerlas rápidas automáticamente.
- B. Cambiar su resultado a skipped sin configuración.
- C. Deshabilitarlas para siempre.
- D. Clasificar pruebas para definir cuándo ejecutarlas en CI.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Tags permiten inclusión/exclusión por costo o propósito. La tubería debe ejecutar también las lentas en una etapa definida; etiquetarlas no corrige lentitud ni las omite por sí solo. Referencia: §10.3.

</details>

### 31. Antes de habilitar ejecución paralela, ¿qué recurso es una señal de riesgo compartido?

- A. Una variable local dentro del test.
- B. Un record inmutable creado por caso.
- C. Un `List.of` local.
- D. Un puerto fijo y un archivo con nombre global usados por varias pruebas.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Puertos, archivos, propiedades de sistema, bases y estado estático pueden colisionar. Usa recursos únicos/aislados y controla capacidad antes de paralelizar. Referencia: §10.4.

</details>

### 32. ¿Cuál es el mecanismo unificado de extensión de Jupiter?

- A. Únicamente `Runner`.
- B. La API `Extension`, registrada por `@ExtendWith`, `@RegisterExtension` o ServiceLoader.
- C. Heredar de `TestCase`.
- D. Anotar producción con `@Mock`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Jupiter reemplaza la fragmentación de Runner/Rules de JUnit 4 con callbacks y resolvers bajo `Extension`. MockitoExtension es un ejemplo. Referencia: §3 y §18.

</details>

### 33. ¿Qué extensión permite suministrar un objeto a un parámetro de constructor o método de prueba?

- A. `ParameterResolver`.
- B. `Comparator`.
- C. `ClassLoader`.
- D. `ItemWriter`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Un `ParameterResolver` decide si soporta el parámetro y crea/resuelve su valor mediante el contexto. No debe confundirse con argumentos indexados de una prueba parametrizada, cuyo orden tiene reglas propias. Referencia: §3.

</details>

### 34. ¿Cuándo es preferible `@EnabledOnOs` a un `assumeTrue` escondido dentro del test?

- A. Cuando se desea que la prueba pase aunque falle.
- B. Para ejecutar métodos privados.
- C. Para crear mocks.
- D. Cuando la condición de plataforma es estable y conviene hacerla visible declarativamente.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Las condiciones declarativas hacen evidente por qué no aplica un caso. Los supuestos siguen siendo útiles para precondiciones dinámicas, pero no deben ocultar permanentemente cobertura ausente. Referencia: §8.3.

</details>

### 35. ¿Por qué no hace falta envolver cada llamada normal en `assertDoesNotThrow`?

- A. Porque solo Mockito puede detectar excepciones.
- B. Porque una excepción inesperada ya hace fallar el test.
- C. Porque Jupiter ignora excepciones.
- D. Porque `assertDoesNotThrow` siempre falla.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Úsalo cuando además necesitas capturar el resultado o expresar explícitamente que la ausencia de excepción es el contrato. Envolver todo agrega ruido sin nueva evidencia. Referencia: §8.1.

</details>

### 36. “Una razón principal para fallar” significa:

- A. Exactamente una llamada `assert` por método.
- B. Un escenario cohesivo; puede contener varias aserciones del mismo resultado.
- C. Capturar y ocultar todas las excepciones.
- D. No usar `assertAll`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Tres campos de una factura creada pueden pertenecer al mismo comportamiento. Mezclar creación, edición, borrado y autorización en una prueba produce diagnósticos ambiguos. Referencia: §5.1.

</details>

### 37. `assertEquals(expectedCustomer, actualCustomer)` falla aunque los campos parecen iguales. ¿Cuál causa de diseño debe revisarse primero?

- A. El número de CPUs.
- B. El contrato `equals` del objeto de valor.
- C. La versión de Git.
- D. El nombre del método de prueba.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Para objetos de valor, igualdad estructural bien definida simplifica producción y pruebas. Comparar campo a campo en toda la suite puede esconder que el dominio carece de un contrato de igualdad. Referencia: §7.1.

</details>

### 38. Una prueba exige terminar en menos de 2 ms en cualquier máquina de CI. ¿Cuál crítica es correcta?

- A. Es un microbenchmark estable por definición.
- B. `assertTimeout` desactiva el JIT.
- C. Puede ser flaky por hardware, warmup, JIT y carga; el rendimiento debe medirse con herramienta y ambiente apropiados.
- D. Dos milisegundos siempre equivalen al mismo número de instrucciones.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un timeout amplio puede detectar bloqueo, pero no sustituye JMH ni objetivos de rendimiento con metodología. Mezclar corrección y microtiempo crea falsos negativos. Referencia: §8.2 y §16.4.

</details>

### 39. ¿Qué ventaja tiene un Test Data Builder frente a repetir constructores enormes?

- A. Elimina la necesidad de aserciones.
- B. Convierte unitarias en E2E.
- C. Hace que todo dato sea global.
- D. Centraliza defaults válidos y permite resaltar solo datos relevantes del escenario.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Un builder de prueba reduce ruido y mantiene intención. Debe evitar defaults mágicos que influyan silenciosamente; los campos relevantes siguen visibles. Referencia: §5 y §15.

</details>

### 40. Una prueba genera datos aleatorios. ¿Qué mejora facilita reproducir un fallo?

- A. Ocultar la semilla.
- B. Registrar/fijar la semilla y reducir el caso fallido.
- C. Reintentar hasta que pase.
- D. Usar `Math.random` global sin control.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La aleatoriedad controlada puede ampliar casos, pero el fallo debe ser reproducible. Inyectar fuente de azar o semilla hace posible investigar y conservar una regresión. Referencia: §15.1 y §16.4.

</details>

### 41. ¿Cuándo conviene afirmar el mensaje exacto de una excepción?

- A. Siempre, incluso si es texto interno sin contrato.
- B. Cuando el mensaje o código es parte estable del contrato que consume alguien.
- C. Nunca.
- D. Solo cuando no se afirma el tipo.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Afirmar texto interno vuelve frágil una refactorización. Si la API promete código/mensaje, sí debe protegerse; con frecuencia es mejor afirmar tipo y propiedades estructuradas. Referencia: §8.1.

</details>

### 42. ¿Por qué importa el orden `assertEquals(expected, actual)`?

- A. Cambia la igualdad calculada.
- B. Mejora el diff y el diagnóstico que presenta la herramienta.
- C. Hace thread-safe el objeto actual.
- D. Solo es una convención de Mockito.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La comparación suele ser simétrica, pero reportes etiquetan expected/actual y generan diffs según ese orden. Invertirlos confunde la interpretación. Referencia: §7.

</details>

### 43. ¿Cómo se prueba de manera determinista código que usa la fecha actual?

- A. Inyectar `Clock` y usar `Clock.fixed` en la prueba.
- B. Dormir hasta medianoche.
- C. Llamar `Instant.now()` tanto en producción como en la aserción y esperar coincidencia.
- D. Cambiar el reloj global del sistema en paralelo.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El reloj se vuelve una dependencia explícita y barata, sin necesidad de mock estático. La prueba controla instante y zona. Referencia: §15.1.

</details>

### 44. ¿Qué soporte Jupiter es apropiado para obtener un directorio temporal aislado?

- A. `@Spy`.
- B. `@Order`.
- C. `@TempDir`.
- D. `@Timeout`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `@TempDir` inyecta un `Path`/`File` temporal administrado, evita rutas globales y facilita limpieza. Aún se debe controlar nombres, permisos y contenido dentro del caso. Referencia: §10.4 y principios de aislamiento.

</details>

### 45. Una prueba asincrónica usa `Thread.sleep(500)` antes de afirmar. ¿Cuál alternativa es conceptualmente mejor?

- A. Esperar una condición observable con timeout o controlar el executor/scheduler.
- B. Aumentar siempre a 30 segundos.
- C. Quitar la aserción.
- D. Ejecutar cien veces y aceptar cualquier resultado.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Dormir espera de más cuando el evento es rápido y falla cuando es lento. Sincronizar con una señal, future, latch o scheduler controlado expresa el hecho esperado y conserva un límite. Referencia: §16.4.

</details>

### 46. ¿Cuál migración de anotación JUnit 4 → Jupiter es correcta?

- A. `@Before` → `@BeforeEach`.
- B. `@RunWith` → `@BeforeAll`.
- C. `@Ignore` → `@Order`.
- D. `@Test(expected=...)` → `@Disabled`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** También `@After` pasa a `@AfterEach`, `@Ignore` a `@Disabled` y la expectativa de excepción a `assertThrows`. Runner/Rules se rediseñan con extensiones. Referencia: §18.

</details>

### 47. ¿Qué papel tiene Vintage en JUnit 6?

- A. Motor de transición para pruebas JUnit 3/4, deprecado y no recomendado como estado permanente.
- B. Motor obligatorio para Jupiter.
- C. Plugin de cobertura.
- D. Reemplazo de Mockito.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Permite migración gradual, pero mantener dos modelos indefinidamente aumenta complejidad. Las pruebas nuevas deben usar Jupiter y el motor retirarse al finalizar. Referencia: §3 y §18.

</details>

### 48. Una clase JUnit 4 usa un único `@RunWith`. ¿Qué mejora ofrece el modelo Jupiter?

- A. Permite componer múltiples extensiones con puntos coherentes.
- B. Prohíbe cualquier integración externa.
- C. Requiere herencia de una clase base única.
- D. Solo admite extensiones estáticas.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El modelo `Extension` evita la limitación de un runner principal y unifica callbacks, resolución de parámetros y postprocesamiento. La migración debe revisar semántica, no solo cambiar imports. Referencia: §18.

</details>

### 49. ¿Qué nombre descubre Surefire por convención predeterminada?

- A. `PriceCalculatorTest.java`.
- B. `PriceCalculatorIT.java` únicamente.
- C. `ProductionService.java`.
- D. Cualquier archivo sin clase.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Surefire reconoce patrones como `*Test`, `*Tests` y `*TestCase`. `*IT` suele reservarse para Failsafe durante integración/verify. Referencia: §17.

</details>

### 50. El código de producción se compila con `--release 11`, pero JUnit 6 se ejecuta con JDK 17. ¿Es conceptualmente posible?

- A. No; target y runtime de tests deben ser el mismo número.
- B. Solo sin Maven.
- C. Solo si se usa Vintage.
- D. Sí; JUnit requiere runtime 17 y puede probar bytecode dirigido a una versión anterior compatible.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La JVM 17 puede cargar bytecode anterior y JUnit satisface su baseline. Debe cuidarse que el código realmente no use APIs fuera de su release objetivo. Referencia: §3–4.

</details>

## Bloque III — Dobles y Mockito (51–75)

### 51. ¿Qué doble es una implementación funcional simplificada, como un repositorio en memoria?

- A. Dummy.
- B. Fake.
- C. Mock estricto necesariamente.
- D. Captor.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Un fake mantiene comportamiento/estado útil sin infraestructura real. Un stub responde datos preparados; un mock se centra en expectativas de interacción; un dummy solo completa una firma. Referencia: §11.

</details>

### 52. ¿Qué debería usarse normalmente para un record de dominio barato e inmutable?

- A. Un mock de cada accessor.
- B. Una instancia real con valores significativos.
- C. Un mock estático.
- D. Un deep stub.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los objetos reales simples conservan invariantes y hacen la prueba legible. Simularlos replica su estructura y acopla sin aislar una frontera costosa. Referencia: §2.2 y §11.

</details>

### 53. Una prueba ejecuta un servicio con un repositorio mock, prepara `save` para devolver `saved` y comprueba que el servicio devuelve ese objeto. ¿Qué conclusión sigue sin estar respaldada?

- A. Que el escenario aislado ejecutó ese camino.
- B. Que el servicio propagó la respuesta preparada.
- C. Que el mock proporcionó la respuesta usada por el caso.
- D. Que el SQL, mapping y base real funcionan.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El mock sustituye la integración y solo reproduce lo configurado. Para probar driver, consultas y constraints se necesita una prueba contra la implementación/tecnología real. Referencia: §2 y §11.

</details>

### 54. ¿Qué hace `@ExtendWith(MockitoExtension.class)`?

- A. Arranca Spring Boot.
- B. Convierte todas las clases del classpath en mocks.
- C. Integra creación/inyección de anotaciones Mockito y validación con lifecycle Jupiter.
- D. Ejecuta pruebas E2E.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La extensión procesa `@Mock`, `@Captor`, `@InjectMocks` y el ciclo relacionado. No es un contenedor de aplicación ni inicia servidor/base. Referencia: §12.1.

</details>

### 55. ¿Cuál limitación debe recordarse sobre `@InjectMocks`?

- A. Es un contenedor DI completo equivalente a Spring.
- B. Solo funciona con métodos estáticos.
- C. Es una comodidad de construcción/inyección y puede ocultar cómo se creó el objeto.
- D. Persiste automáticamente los mocks.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Para dependencias simples, construir explícitamente la clase bajo prueba suele ser más transparente. `@InjectMocks` no resuelve configuración arbitraria ni valida una arquitectura DI real. Referencia: §12.1.

</details>

### 56. ¿Qué expresa este stubbing?

```java
when(repository.findByEmail("ada@example.org"))
        .thenReturn(Optional.empty());
```

- A. Verifica que el método ya fue llamado.
- B. Impide cualquier otra llamada al mock.
- C. Prepara la respuesta cuando coincida esa invocación.
- D. Ejecuta el repositorio real.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Stubbing define comportamiento futuro; `verify` comprueba interacciones después. No demuestra que el método fue invocado ni llama infraestructura real. Referencia: §12.2.

</details>

### 57. En estilo BDDMockito, ¿cuál es equivalente conceptual a `when(x).thenReturn(y)`?

- A. `verify(y).calls(x)`.
- B. `then(x).shouldReturn(y)`.
- C. `assertThat(x).is(y)`.
- D. `given(x).willReturn(y)`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `given/willReturn` encaja en Given; la verificación BDD suele usar `then(mock).should()`. Cambia vocabulario, no la naturaleza del doble. Referencia: §12.2.

</details>

### 58. ¿Cómo se prepara una excepción para un método `void`?

- A. `when(gateway.send()).thenThrow(...)` siempre.
- B. No es posible con Mockito.
- C. `assertThrows` sobre la creación del mock solamente.
- D. `doThrow(error).when(gateway).send(...)`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La familia `doThrow/doNothing/doAnswer` sirve para métodos void y también para spies cuando no debe invocarse el método real al preparar. Referencia: §12.2.

</details>

### 59. Un método no configurado de un mock devuelve normalmente:

- A. Valores vacíos/default según el tipo, no comportamiento de producción.
- B. Una excepción de compilación.
- C. La implementación real completa.
- D. El resultado de la última prueba.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Pueden ser `false`, cero, null, colección u Optional vacío según API/configuración. Una prueba que pasa por default no prueba la implementación real y puede estar omitiendo stubbing relevante. Referencia: §12.3.

</details>

### 60. ¿Qué señala normalmente un stubbing estricto que nunca se usa?

- A. Setup excesivo, camino inesperado o residuo de una refactorización.
- B. Que el método real fue demasiado rápido.
- C. Que falta un `Thread.sleep`.
- D. Que Mockito debe ignorarse siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La validación estricta mantiene cada escenario enfocado. Marcar todo como lenient oculta señales; primero elimina o corrige el stubbing. Referencia: §12.3.

</details>

### 61. Sin especificar modo, `verify(repository).save(user)` exige:

- A. Una llamada compatible.
- B. Cero llamadas.
- C. Al menos diez llamadas.
- D. Que `save` devuelva void.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `times(1)` es el valor implícito. Usa cantidades solo cuando son parte del contrato; una verificación redundante de cada detalle vuelve frágil la prueba. Referencia: §13.1.

</details>

### 62. En un escenario de email duplicado, debe garantizarse que no se guarde el usuario. ¿Qué verificación es directa?

- A. `when(repository.save(any())).thenReturn(null)`.
- B. `verify(repository, never()).save(any())`.
- C. `assertSame(repository, repository)`.
- D. `verify(repository, times(1)).save(any())`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** `never()` afirma ausencia de un efecto indebido. Debe acompañar la observación principal, por ejemplo la excepción o resultado que explica por qué no se guarda. Referencia: §13.1.

</details>

### 63. ¿Qué diferencia existe entre `verifyNoInteractions(mock)` y `verifyNoMoreInteractions(mock)`?

- A. La primera exige cero llamadas; la segunda exige que no queden llamadas sin verificar.
- B. La segunda borra todas las llamadas.
- C. Ninguna.
- D. La primera solo aplica a spies.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `verifyNoMoreInteractions` puede imponer un protocolo completo y acoplar demasiado si se usa rutinariamente. `verifyNoInteractions` expresa que la frontera no debió tocarse en absoluto. Referencia: §13.1.

</details>

### 64. ¿Por qué falla esta verificación?

```java
verify(audit).record("CREATED", any(Instant.class));
```

- A. Porque Mockito no acepta strings.
- B. Porque `verify` requiere retorno.
- C. Si un argumento usa matcher, los demás deben expresarse con matchers, por ejemplo `eq("CREATED")`.
- D. Porque `Instant` es final.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Mockito registra matchers en un contexto; mezclar un valor crudo con matcher causa uso inválido. `eq` conserva la igualdad exacta dentro del mismo mecanismo. Referencia: §13.2.

</details>

### 65. ¿Qué afirmación sobre `anyString()` es correcta?

- A. Coincide también con null por definición.
- B. Coincide con strings no null; si null es válido debe tratarse explícitamente.
- C. Solo coincide con el string literal `"any"`.
- D. Ejecuta una expresión regular.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los matchers tipados como `anyString` no representan null. Esto puede revelar una precondición no modelada; usa `isNull`, `nullable` o un contrato que evite null según el caso. Referencia: §13.2.

</details>

### 66. ¿Cuándo es útil `argThat`?

- A. Para arrancar una base real.
- B. Para cambiar el bytecode de producción permanentemente.
- C. Para reemplazar todas las aserciones Jupiter.
- D. Para expresar una condición semántica sobre un argumento sin capturarlo después.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Un matcher personalizado puede decir “usuario activo con ID válido”. Debe producir un diagnóstico comprensible; si se necesitan varias aserciones detalladas, un captor puede ser más claro. Referencia: §13.2.

</details>

### 67. ¿Cuál uso recomienda principalmente la documentación para `ArgumentCaptor`?

- A. Decidir stubbing complejo antes de ejecutar.
- B. Construir el objeto bajo prueba.
- C. Reemplazar el repositorio real en producción.
- D. Capturar argumentos durante verificación para inspeccionarlos.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El captor ayuda a afirmar el valor que cruzó una frontera. Para elegir respuesta de stubbing, un matcher o fake suele comunicar mejor la condición. Referencia: §13.3.

</details>

### 68. ¿Cuándo debe usarse `InOrder`?

- A. Cuando el orden forma parte real del protocolo, como guardar antes de publicar.
- B. Para medir tiempo.
- C. Para ordenar métodos JUnit.
- D. En toda interacción para que la prueba sea “más estricta”.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Imponer orden irrelevante acopla a implementación. Si invertir dos llamadas cambia el contrato o integridad, `InOrder` protege una regla observable. Referencia: §13.4.

</details>

### 69. ¿Qué distingue un spy de un mock ordinario?

- A. El spy siempre es remoto.
- B. El spy delega normalmente en un objeto real salvo stubbing; el mock no.
- C. El mock no puede verificarse.
- D. No existe diferencia.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Un spy es *partial double*: llamadas no preparadas ejecutan código real. Puede producir efectos inesperados y suele requerir más cuidado que un mock. Referencia: §14.1.

</details>

### 70. ¿Por qué se prefiere `doReturn(value).when(spy).method()` al preparar ciertos spies?

- A. Porque `doReturn` ejecuta el método dos veces.
- B. Porque `when(spy.method())` invoca el método real durante stubbing.
- C. Porque los spies no aceptan valores.
- D. Porque solo compila con Spring.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Si la llamada real tiene efectos, falla o depende de estado aún no preparado, `doReturn` evita ejecutarla al configurar. Referencia: §14.1.

</details>

### 71. ¿Por qué un mock estático debe limitarse con `try-with-resources`?

- A. Para acotar la interceptación y restaurar comportamiento al cerrar.
- B. Para persistirlo después de la suite.
- C. Para convertirlo en singleton global.
- D. Porque todo mock implementa `Closeable` permanentemente.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El alcance evita contaminar otras pruebas, especialmente en ejecución paralela. Aun así, inyectar `Clock`, fábrica o gateway explícito suele producir mejor diseño. Referencia: §14.3.

</details>

### 72. ¿Qué suele revelar una cadena de deep stubs como `order.customer().address().city()`?

- A. Un contrato perfectamente desacoplado.
- B. Que Mockito ejecutó SQL.
- C. Una integración real con base.
- D. Acoplamiento a la estructura interna y posible violación de Demeter.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La prueba replica el grafo de getters y se rompe al reorganizarlo. Objetos reales simples o una operación de dominio expresiva suelen ser mejores. Referencia: §14.4.

</details>

### 73. Un `thenAnswer` contiene cincuenta líneas que reproducen reglas del servicio remoto. ¿Qué alternativa evaluar?

- A. Un fake explícito, pequeño y probado, o simplificar el escenario.
- B. Agregar cien líneas más al lambda.
- C. Eliminar toda prueba.
- D. Usar `verifyNoMoreInteractions` como implementación.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Una Answer compleja se vuelve una segunda implementación oculta. Un fake con nombre y estado es más legible, pero tampoco demuestra integración real. Referencia: §14.2.

</details>

### 74. Mockito 5 puede simular muchas clases finales. ¿Qué conclusión de diseño sigue siendo válida?

- A. Todo objeto final debe mockearse.
- B. La capacidad técnica no justifica simular valores baratos ni ocultar dependencias.
- C. Ya no se necesitan interfaces ni pruebas de integración.
- D. Los mocks finales ejecutan la base real.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Mockear es una decisión sobre frontera y evidencia, no solo sobre posibilidad del framework. Un record final de valor se usa real; un cliente final externo quizá se envuelve tras un puerto. Referencia: §11 y §15.

</details>

### 75. Un servicio devuelve una factura y también llama internamente a tres métodos del repositorio. ¿Qué conviene afirmar primero?

- A. El nombre del mock generado.
- B. Toda llamada interna aunque pueda refactorizarse.
- C. El orden alfabético de los métodos.
- D. El estado/resultado de la factura, si expresa el contrato.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Verificar resultado protege comportamiento y permite cambiar implementación. Las interacciones se añaden si son efectos externos o protocolos relevantes, no para duplicar el código línea por línea. Referencia: §1.2 y §13.

</details>

## Bloque IV — Diseño, TDD, integración y CI (76–100)

### 76. Una clase llama directamente `Instant.now()` en una regla de expiración. ¿Qué refactor mejora testabilidad?

- A. Mockear `String`.
- B. Aumentar la velocidad del procesador.
- C. Hacer el método privado.
- D. Inyectar `Clock` y llamar `Instant.now(clock)`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El tiempo se vuelve una dependencia visible y la prueba usa `Clock.fixed`. También mejora producción al hacer explícita la zona/política temporal. Referencia: §15.1.

</details>

### 77. El código crea `UUID.randomUUID()` dentro del método y la prueba necesita un ID conocido. ¿Qué diseño es más directo?

- A. Recibir un `IdGenerator` o `Supplier<UUID>`.
- B. Comparar solo que el string contiene letras.
- C. Repetir hasta obtener el UUID esperado.
- D. Dormir antes de generarlo.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La fuente no determinista se inyecta y puede reemplazarse por una lambda fija. No hace falta un framework de mocking para una interfaz funcional simple. Referencia: §15.1.

</details>

### 78. ¿Qué significa “núcleo funcional, bordes imperativos”?

- A. Hacer todos los métodos `static` aunque compartan estado.
- B. Concentrar cálculos puros en el núcleo y aislar archivo/red/base en adaptadores.
- C. Evitar objetos de dominio.
- D. Poner I/O dentro de cada función pura.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Las reglas puras se prueban con valores reales; los bordes requieren pocas pruebas de interacción y sus propias integraciones. La separación reduce combinaciones y flakiness. Referencia: §15.2.

</details>

### 79. Un constructor requiere doce colaboradores. ¿Qué señal ofrece a la prueba?

- A. Se necesitan doce deep stubs obligatoriamente.
- B. La clase puede mezclar demasiadas responsabilidades.
- C. Deben ocultarse con inyección de campo.
- D. La clase ya cumple SRP por tener constructor.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El setup difícil puede ser feedback de diseño. Agrupar mocks artificialmente no elimina el acoplamiento; revisa casos de uso y responsabilidades antes de buscar una anotación. Referencia: §15.3.

</details>

### 80. Para probar una rama compleja de un método privado, ¿qué primera decisión es preferible?

- A. Hacerlo público solo para el test.
- B. Copiar su código al test.
- C. Probarla mediante el contrato público o extraer una responsabilidad con contrato propio.
- D. Usar reflexión en todas las pruebas.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Los privados son implementación. Si contienen lógica que merece pruebas independientes, quizá representan otro concepto; extraerlo mejora diseño sin ampliar visibilidad accidentalmente. Referencia: §15.3.

</details>

### 81. En TDD, ¿qué debe demostrar la fase Red?

- A. Que Mockito lanzó una excepción interna.
- B. Que todas las pruebas están deshabilitadas.
- C. Que la cobertura ya es 100 %.
- D. Que la prueba nueva falla por la razón esperada antes de implementar.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Observar el fallo evita una prueba que pasa sin ejercer el comportamiento. El mensaje debe apuntar a la ausencia/regla nueva, no a setup roto. Referencia: §16.1.

</details>

### 82. ¿Qué busca la fase Green?

- A. La arquitectura perfecta y todos los casos futuros.
- B. Optimizar antes de tener comportamiento.
- C. Eliminar la prueba roja.
- D. El cambio mínimo correcto que hace pasar el ejemplo actual.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Green da feedback rápido. La generalización y limpieza vienen con más ejemplos y Refactor, manteniendo la suite verde. Referencia: §16.1.

</details>

### 83. Durante Refactor en TDD, ¿qué restricción es central?

- A. Mejorar diseño conservando todas las pruebas verdes.
- B. Borrar casos de borde.
- C. Cambiar comportamiento observable deliberadamente sin prueba.
- D. Cambiar a E2E todas las unitarias.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La suite permite reestructurar con seguridad. Si cambia el contrato, se vuelve a Red con un nuevo ejemplo en lugar de esconder el cambio como refactor. Referencia: §16.1.

</details>

### 84. Una entrada válida está en `0..100`. ¿Qué conjunto cubre límites representativos?

- A. `50` únicamente.
- B. `1, 2, 3`.
- C. Todos los enteros posibles obligatoriamente.
- D. `-1, 0, 50, 100, 101`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Incluye clases inválidas bajo/alto, ambos límites y un interior. Se amplía según riesgos y reglas, no por enumeración ciega. Referencia: §16.2.

</details>

### 85. Una suite logra 100 % de cobertura de líneas sin aserciones. ¿Qué concluye?

- A. El sistema es correcto.
- B. El código se ejecutó, pero quizá ningún resultado fue comprobado.
- C. No puede existir ningún mutante.
- D. Todas las integraciones reales funcionan.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Cobertura es señal de ejecución, no calidad del oráculo. Sirve para detectar zonas nunca ejercitadas, pero no sustituye escenarios ni aserciones significativas. Referencia: §16.3.

</details>

### 86. ¿Qué revela un mutante sobreviviente?

- A. Que el compilador Java está roto.
- B. Que toda la suite debe borrarse.
- C. Posible aserción débil, caso ausente o código sin efecto observable.
- D. Que el código mutado es necesariamente correcto.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Mutation testing cambia condiciones/operadores y espera que una prueba lo detecte. No todos los mutantes son valiosos, pero sobrevivientes útiles cuestionan la fuerza de la suite. Referencia: §16.3.

</details>

### 87. Una prueba falla 1 de cada 50 veces. ¿Cuál respuesta es responsable?

- A. Investigar reloj, orden, recursos, asincronía y entorno; un reintento temporal debe quedar visible.
- B. Declararla exitosa en cualquier resultado.
- C. Añadir reintentos infinitos y olvidarla.
- D. Ejecutarla solo en la laptop del autor.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Flakiness erosiona confianza. El objetivo es controlar la fuente no determinista; reintentar puede reducir bloqueo temporal, no resolver causalidad. Referencia: §16.4.

</details>

### 88. ¿Qué interpretación correcta tiene la pirámide de pruebas?

- A. Exige porcentajes universales exactos.
- B. Expresa que pruebas más amplias suelen costar más y localizar peor una falla, por lo que convienen muchas rápidas y pocas E2E valiosas.
- C. Prohíbe integraciones.
- D. Dice que toda unitaria requiere mock.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Es un modelo de feedback/costo, no una cuota rígida. La distribución depende del sistema, riesgos y fronteras. Referencia: §2.

</details>

### 89. Dos servicios independientes evolucionan un contrato HTTP. ¿Qué prueba complementa unitarias sin desplegar todo el sistema?

- A. Solo cobertura de línea.
- B. Un assert sobre un método privado.
- C. Un mock que acepte cualquier JSON sin estructura.
- D. Una prueba de contrato que valida expectativas compatibles entre proveedor y consumidor.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Las pruebas de contrato protegen la forma/protocolo en el límite. No sustituyen por completo una prueba de integración/E2E, pero detectan incompatibilidades antes y con menor costo. Referencia: §2 y estrategia de niveles.

</details>

### 90. ¿Qué asociación Maven es correcta?

- A. Failsafe → compilación principal; Surefire → deploy.
- B. Surefire se usa únicamente con JUnit 4.
- C. Ambos solo generan Javadoc.
- D. Surefire → unitarias en `test`; Failsafe → integración en `integration-test`/`verify`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Separan ciclos y convenciones de nombres. JUnit Platform funciona con ambos; el tipo de prueba lo determina alcance/infraestructura, no solo el sufijo. Referencia: §17.

</details>

### 91. ¿Por qué se recomienda terminar integración con `mvn verify` y no usar `mvn integration-test` como comando final?

- A. Porque `verify` incluye fases posteriores de limpieza y evalúa el resultado registrado por Failsafe.
- B. Porque `integration-test` nunca ejecuta pruebas.
- C. Porque `verify` omite unitarias.
- D. Porque Maven no tiene fase `integration-test`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Failsafe está diseñado para no cortar antes de `post-integration-test`; `verify` decide el fallo final tras oportunidad de limpiar infraestructura. Referencia: §17.

</details>

### 92. ¿Qué directorios conviene conservar como artefactos cuando CI falla?

- A. Ningún reporte, para ahorrar espacio.
- B. Solo el repositorio local Maven completo.
- C. `target/surefire-reports` y `target/failsafe-reports`.
- D. Únicamente `.git/objects`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Sus XML/TXT contienen casos, stack traces y tiempos necesarios para diagnosticar. También pueden alimentar la UI del servidor CI. Referencia: §17.

</details>

### 93. ¿Qué mejora la reproducibilidad entre laptop y CI?

- A. Usar Maven Wrapper, JDK fijado, locale/zona controlados y `verify` desde checkout limpio.
- B. Depender del IDE personal.
- C. Descargar siempre versiones `LATEST`.
- D. Compartir `target/` manualmente.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Fijar herramientas y entorno reduce diferencias no funcionales. El build debe declarar lo que necesita en lugar de heredar configuración accidental del equipo. Referencia: §4 y §17.

</details>

### 94. ¿Qué aporta un contenedor de prueba con PostgreSQL frente a mockear `DataSource`?

- A. Ejecuta el driver, dialecto, schema y comportamiento reales de PostgreSQL.
- B. Hace que la prueba sea unitaria pura.
- C. Elimina necesidad de migraciones.
- D. Garantiza rendimiento de producción exacto.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Aumenta fidelidad de integración, aunque sigue siendo un entorno controlado y más lento. No reproduce automáticamente volumen/hardware de producción. Referencia: §2 y §17.

</details>

### 95. ¿Por qué una base H2 embebida puede no validar correctamente una integración PostgreSQL?

- A. Dialecto, tipos, constraints, funciones y aislamiento pueden diferir.
- B. Todas las bases SQL son idénticas por estándar.
- C. H2 no puede almacenar ninguna fila.
- D. JUnit prohíbe drivers reales.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Una sustitución más rápida puede servir para algunas pruebas, pero no demuestra comportamientos específicos del motor objetivo. El nivel de fidelidad debe corresponder al riesgo. Referencia: §2.

</details>

### 96. El repositorio lanza al guardar. Además de afirmar la excepción, ¿qué interacción negativa protege el caso?

- A. Ninguna; los efectos posteriores no importan.
- B. `verify(eventPublisher, never()).publish(any())`.
- C. `when(eventPublisher.toString()).thenReturn(...)`.
- D. `verify(eventPublisher).publish(any())`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Si publicar tras un guardado fallido violaría consistencia, la ausencia del evento es parte del contrato de error. La prueba no necesita verificar cada llamada interna. Referencia: §13 y §19.

</details>

### 97. Una prueba inicia una tarea y afirma inmediatamente un resultado asincrónico. Falla ocasionalmente. ¿Qué falta?

- A. Más mocks de strings.
- B. Una relación observable de finalización/espera con timeout.
- C. `verifyNoMoreInteractions` antes de iniciar.
- D. Cambiar todos los métodos a static.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Debe esperar el future, latch, señal o condición, no depender de scheduling. La sincronización también establece visibilidad del resultado. Referencia: §16.4.

</details>

### 98. ¿Qué riesgo tiene marcar toda la clase Mockito como lenient?

- A. Hace que las pruebas no compilen.
- B. Oculta stubbings innecesarios y caminos no ejercitados.
- C. Convierte mocks en bases reales.
- D. Obliga a verificar cada getter.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La leniencia debe ser excepcional y localizada. La configuración estricta aporta feedback sobre setup muerto o comportamiento diferente del esperado. Referencia: §12.3.

</details>

### 99. ¿Qué frontera conviene simular en una prueba unitaria de `PaymentService`?

- A. Un `PaymentGateway` propio que representa la pasarela remota.
- B. `BigDecimal` y `String`.
- C. Todos los records de comandos.
- D. El propio `PaymentService`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El puerto propio expresa lo que el servicio necesita y permite respuestas controladas. Se prueba aparte el adaptador que habla con la pasarela. Referencia: §11 y §15.

</details>

### 100. Una suite tarda 40 minutos y casi todas las pruebas arrancan servidor/base para validar reglas simples. ¿Cuál intervención ofrece mejor feedback?

- A. Mover reglas puras a objetos/servicios probables sin contexto, conservar integraciones enfocadas y pocas E2E críticas.
- B. Eliminar todas las pruebas.
- C. Añadir `Thread.sleep` para estabilizar.
- D. Reemplazar toda aserción por cobertura.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Reequilibrar niveles mantiene evidencia de fronteras y acelera la mayoría de reglas. El objetivo no es “solo unitarias”, sino usar el alcance mínimo que puede demostrar cada riesgo. Referencia: §2, §15 y §17.

</details>

