# Guía ampliada de estudio: Java, SQL, diseño, seguridad y testing

Esta guía consolida los documentos `*.mdx` del proyecto y añade los conceptos
avanzados usados para ampliar el simulador. No sustituye las especificaciones:
sirve como mapa de estudio y como explicación de las nuevas categorías.

## 1. Cómo estudiar con el simulador

No memorices la posición de una respuesta. Para cada pregunta:

1. Explica por qué la opción correcta lo es.
2. Refuta las demás opciones.
3. En preguntas de código, predice primero si compila, después el resultado y
   finalmente los efectos secundarios y excepciones.
4. En SQL, separa semántica estándar, comportamiento del motor y decisiones del
   optimizador.
5. Repite por categoría y registra los temas, no solo las preguntas, que fallas.

El itinerario oficial **Oracle Certified Professional: Java SE 21 Developer** y
el examen **1Z0-830** son buenas referencias del nivel esperado, pero este banco
también cubre ingeniería práctica que queda fuera de un examen de lenguaje.

## 2. Java avanzado

### Lenguaje y sistema de tipos

- La sobrecarga se resuelve en compilación. Primero se buscan coincidencias sin
  boxing/varargs, después con boxing y finalmente varargs. La sobrescritura se
  despacha en ejecución según el objeto real.
- Los genéricos son invariantes: `List<Integer>` no es subtipo de
  `List<Number>`. Con PECS, un productor se expresa como `? extends T` y un
  consumidor como `? super T`.
- El borrado de tipos explica por qué dos sobrecargas que solo difieren en
  `List<String>` y `List<Integer>` colisionan y por qué no puede crearse
  `new T[]`.
- Una variable de patrón solo está disponible donde el flujo demuestra que el
  patrón coincidió. `instanceof String s && use(s)` es seguro; con `||`, el lado
  derecho se ejecutaría cuando el patrón no coincidió.
- Un `record` es final y expresa un agregado de valores. Su inmutabilidad es
  superficial: un componente que apunta a una lista mutable sigue permitiendo
  cambios salvo copia defensiva.
- Un subtipo directo de una jerarquía `sealed` debe indicar si es `final`,
  `sealed` o `non-sealed` (o tener ese estado implícito).

### Colecciones, igualdad y streams

- `equals` debe ser reflexivo, simétrico, transitivo, consistente y falso frente
  a `null`. Objetos iguales deben tener el mismo `hashCode`.
- No se debe mutar una clave mientras está indexada en `HashMap`/`HashSet` si el
  cambio afecta igualdad o hash.
- Una vista `Collections.unmodifiableList` comparte la colección subyacente;
  `List.copyOf` crea una instantánea no modificable y rechaza elementos `null`.
- Un stream es perezoso y de un solo uso. Los callbacks deben ser no
  interferentes y, en general, sin estado.
- Las reducciones paralelas requieren operaciones asociativas e identidad
  correcta. El orden y los efectos secundarios rompen fácilmente esa propiedad.
- `orElse` evalúa su argumento aunque el `Optional` tenga valor; `orElseGet` es
  perezoso.

### Excepciones y recursos

- `finally` se ejecuta durante la salida normal o excepcional, pero lanzar o
  retornar desde él puede ocultar el resultado original.
- Try-with-resources cierra en orden inverso. Si el cuerpo ya lanzó, los fallos
  de `close` quedan en `getSuppressed()`.
- Captura una excepción donde exista una recuperación real o donde deba
  traducirse al contrato de la capa, conservando la causa.

### Concurrencia y Java Memory Model

- `volatile` aporta visibilidad y orden, no atomicidad a operaciones compuestas
  como `counter++`.
- `Thread.start`, `Thread.join`, monitores, locks y utilidades concurrentes
  establecen relaciones *happens-before* específicas.
- Una colección concurrente hace seguras sus operaciones, no una secuencia
  `containsKey` seguida de `put`; usa operaciones atómicas como
  `computeIfAbsent`.
- Los virtual threads de Java 21 aumentan el throughput de muchas tareas que
  esperan I/O. No aceleran una tarea CPU-bound ni deben agruparse como un recurso
  escaso. Los recursos externos sí necesitan límites.

### JVM, módulos y JDBC

- La identidad de una clase incluye su nombre binario y el class loader que la
  definió.
- `exports` publica tipos para acceso normal entre módulos; `opens` habilita
  reflexión profunda.
- El GC usa alcanzabilidad desde raíces y recolecta ciclos aislados.
- El dueño de una transacción JDBC debe hacer `commit` o `rollback`
  explícitamente y restaurar el estado de conexiones que vuelven a un pool.

## 3. SQL avanzado y diseño relacional

### Semántica

- SQL usa lógica de tres valores. `NULL` no es un valor ordinario: una
  comparación con él suele producir `UNKNOWN`, que `WHERE` descarta.
- `NOT EXISTS` es normalmente más robusto que `NOT IN` si la subconsulta puede
  contener `NULL`.
- En un `LEFT JOIN`, un filtro sobre la tabla derecha en `WHERE` puede eliminar
  las filas extendidas con `NULL`. En `ON`, limita coincidencias conservando la
  fila izquierda.
- `COUNT(*)` cuenta filas; `COUNT(expresión)` ignora valores `NULL`.
- Sin `ORDER BY` no existe orden garantizado. Para paginar o limitar se necesita
  además un desempate único.

### Agregados, ventanas y CTE

- `WHERE` filtra antes de agrupar y `HAVING` filtra grupos.
- Las funciones ventana calculan sin colapsar filas. `ROW_NUMBER` distingue
  filas; `RANK` deja huecos ante empates; `DENSE_RANK` no.
- `LAST_VALUE` actúa sobre el *window frame*, que puede terminar en la fila
  actual. Declara el frame explícitamente si quieres toda la partición.
- Una CTE recursiva necesita un caso base, un paso que converja y una estrategia
  de ciclos cuando recorre grafos no confiables.

### Modelo, constraints e índices

- Una clave artificial no reemplaza la restricción `UNIQUE` de la identidad de
  negocio.
- `CHECK` rechaza `FALSE`, pero una expresión con `NULL` puede ser `UNKNOWN`;
  combina con `NOT NULL` cuando sea necesario.
- 2NF elimina dependencias parciales de claves compuestas; 3NF elimina
  dependencias transitivas de atributos no clave.
- Un índice B-tree compuesto favorece predicados que siguen su prefijo
  izquierdo. Funciones sobre la columna pueden requerir índices de expresión.
- Los índices cuestan espacio y mantenimiento en cada escritura. Evalúalos con
  planes y carga reales, no por intuición.

### Transacciones

- `READ COMMITTED` evita dirty reads, pero puede permitir non-repeatable reads.
- Snapshot isolation puede permitir *write skew* cuando transacciones actualizan
  filas distintas después de leer el mismo invariante.
- Ante deadlock, el motor aborta una víctima; la aplicación debe poder reintentar
  la transacción completa de forma limitada y segura.
- Evita esperar HTTP dentro de una transacción de BD. Para coordinar sistemas,
  considera idempotencia y patrones como transactional outbox.
- Un upsert implementado con `SELECT` seguido de `INSERT` tiene una carrera
  TOCTOU. Usa una restricción única y la operación atómica del motor.

## 4. Principios y buenas prácticas

### SOLID

- **SRP:** una unidad tiene una razón de cambio, vinculada a un actor o política.
- **OCP:** una variación real puede extenderse sin editar el núcleo estable.
- **LSP:** un subtipo no fortalece precondiciones ni debilita poscondiciones y
  conserva invariantes observables.
- **ISP:** cada cliente depende de un contrato pequeño que realmente utiliza.
- **DIP:** las políticas de alto nivel y los detalles dependen de abstracciones
  orientadas al dominio. Usar un contenedor DI no basta por sí solo.

### DRY, KISS y YAGNI

- **DRY** elimina duplicación de conocimiento. Dos fragmentos iguales por
  accidente no justifican una abstracción compartida.
- **KISS** reduce complejidad accidental; no significa minimizar líneas.
- **YAGNI** evita funcionalidad especulativa. No justifica omitir tests,
  seguridad ni requisitos no funcionales presentes.

### GRASP y Ley de Demeter

- **Information Expert:** asigna comportamiento a quien posee la información.
- **Creator:** crea el objeto quien lo contiene, registra o dispone de sus datos.
- **Controller:** un objeto no UI coordina el caso de uso.
- **Low Coupling / High Cohesion:** limita conocimiento entre módulos y agrupa
  responsabilidades relacionadas.
- **Polymorphism:** expresa variaciones con contratos en lugar de condicionales
  repetidos.
- **Indirection:** un intermediario desacopla participantes.
- **Pure Fabrication:** una clase de diseño, como un repositorio, mejora cohesión
  aunque no represente un concepto físico.
- **Protected Variations:** rodea puntos inestables con contratos estables.
- **Ley de Demeter:** habla con colaboradores directos. El problema de las
  cadenas profundas no es el número de puntos, sino conocer estructura ajena.

### Patrones

- Creacionales: Factory Method, Abstract Factory, Builder, Prototype, Singleton.
- Estructurales: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.
- Comportamiento: Chain of Responsibility, Command, Iterator, Mediator, Memento,
  Observer, State, Strategy, Template Method, Interpreter y Visitor.

Un patrón es vocabulario para un problema recurrente, no una meta. Strategy
encapsula algoritmos variables; Adapter traduce contratos; Decorator compone
responsabilidades; Observer desacopla emisores, pero exige diseñar ciclo de vida,
orden y errores.

## 5. Seguridad

- Autenticar no autoriza. Verifica permisos por operación y objeto en el
  servidor; un identificador difícil de adivinar no es un control.
- Usa parámetros para valores SQL y una allowlist para identificadores u orden.
- Almacena contraseñas con Argon2id, scrypt, bcrypt o PBKDF2, salt único y coste
  calibrado. No uses hash rápido sin salt ni cifrado reversible como diseño base.
- En JWT fija algoritmos permitidos y valida firma, issuer, audience, expiración
  y contexto. Los tokens cortos reducen el problema de revocación.
- Codifica salida según el contexto para XSS. CSP es defensa adicional.
- Defiende CSRF en operaciones basadas en cookies con SameSite adecuado, token u
  origen verificado según el flujo.
- CORS es una política de lectura del navegador, no autenticación ni firewall.
- Para SSRF valida esquema, destino resuelto, rangos de red, redirects y egress.
- Para archivos y rutas usa identificadores indirectos, directorio base,
  normalización, límites, allowlist de tipo y almacenamiento fuera del webroot.
- No deserialices objetos Java nativos desde entrada hostil. Endurece parsers XML
  deshabilitando entidades externas y DTD si no son necesarias.
- Gestiona secretos fuera del código, con identidad de workload, mínimo
  privilegio, rotación y logs redactados.

## 6. Testing

- Un test valioso detecta una regresión relevante, es determinista, legible y
  produce un fallo diagnóstico. Cobertura alta no garantiza un buen oráculo.
- Unit tests aíslan lógica; integration tests verifican contratos con BD, red o
  framework; E2E valida pocos recorridos completos críticos.
- Un stub entrega respuestas; un mock también verifica interacciones. Verifica
  efectos cuando sea posible y no congeles detalles internos.
- TDD sigue Red–Green–Refactor. Given–When–Then comunica escenario, acción y
  resultado sin exigir una herramienta BDD.
- Parametriza particiones equivalentes y límites. Property-based testing explora
  invariantes; mutation testing mide si la suite detecta cambios artificiales.
- Inyecta `Clock`, controla seeds y espera condiciones con timeout en lugar de
  `sleep`.
- Testcontainers detecta dialecto, esquema, constraints y transacciones que un
  mock no puede representar.
- Aísla datos entre tests. Una transacción con rollback puede ocultar fallos que
  solo ocurren en flush/commit.
- Un test de estrés puede descubrir una carrera, nunca demostrar por sí solo que
  no existe.
- Trata un flaky test como defecto con dueño. Una cuarentena debe ser temporal y
  visible, no un cementerio.

## 7. Referencias

### Java y certificación

- [Oracle Certified Professional: Java SE 21 Developer](https://education.oracle.com/java-se-21-developer-certified-professional/trackp_JSE21OCP)
- [Examen Oracle Java SE 21 Developer Professional 1Z0-830](https://education.oracle.com/es/ouexam-pexam_1z0-830/pexam_1Z0-830)
- [Java Language Specification, Java SE 21](https://docs.oracle.com/javase/specs/jls/se21/html/)
- [Especificaciones JDK 21](https://docs.oracle.com/en/java/javase/21/docs/specs/)
- [Documentación JDK 21](https://docs.oracle.com/en/java/javase/21/)
- [Virtual threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html)
- [Java Memory Model, JLS 17](https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html)
- [API Stream](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html)

### SQL

- [PostgreSQL: sintaxis SQL](https://www.postgresql.org/docs/current/sql-syntax.html)
- [PostgreSQL: funciones de ventana](https://www.postgresql.org/docs/current/functions-window.html)
- [PostgreSQL: aislamiento de transacciones](https://www.postgresql.org/docs/current/transaction-iso.html)
- [PostgreSQL: constraints](https://www.postgresql.org/docs/current/ddl-constraints.html)
- [PostgreSQL: índices](https://www.postgresql.org/docs/current/indexes.html)
- [Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/)

### Diseño, seguridad y testing

- [Refactoring.Guru: patrones de diseño](https://refactoring.guru/es/design-patterns)
- [Martin Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [OWASP: prevención de SQL Injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [JUnit 5 User Guide](https://docs.junit.org/current/user-guide/)
- [Mockito documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org.mockito/org/mockito/Mockito.html)

## 8. Trazabilidad de la ampliación

Las 150 preguntas nuevas están en
`questions/ampliacion-avanzada.json`, distribuidas así:

| Categoría | Nuevas |
|---|---:|
| Java | 30 |
| SQL | 30 |
| Buenas prácticas | 30 |
| Seguridad | 30 |
| Testing | 30 |
| **Total** | **150** |

El banco generado conserva también las categorías y preguntas anteriores.
