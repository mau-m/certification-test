Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
# Banco de certificación: Java y Maven

100 preguntas de opción múltiple basadas en [`README.md`](README.md). Salvo que el enunciado diga **“selecciona dos”**, existe una sola respuesta correcta. Los fragmentos se consideran dentro de un método o clase válidos y con imports disponibles, excepto cuando se pregunta expresamente si compilan.

Intenta responder antes de abrir cada solución. Una respuesta acertada por intuición no se considera dominada hasta poder explicar por qué las demás opciones no cumplen el modelo de Java.

## Uso y calificación

- Simulación completa: 120 minutos, sin abrir soluciones.
- Simulación por bloque: 25 preguntas en 30 minutos.
- 1 punto por respuesta; no hay penalización por error.
- 80–89: dominio operativo; 90–100: dominio avanzado. Bajo 80, repasa las referencias de cada fallo y repite solo después de explicar los distractores.

## Bloque I — JDK, Maven y fundamentos (1–25)

### 1. ¿Qué relación describe correctamente JDK, JRE y JVM?

- A. El JRE compila fuentes y el JDK únicamente ejecuta archivos JAR.
- B. La JVM contiene `javac`; el JDK solo agrega documentación.
- C. El JDK contiene herramientas de desarrollo y un runtime; la JVM ejecuta bytecode.
- D. JDK, JRE y JVM son nombres equivalentes desde Java 9.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La JVM es el motor especificado para ejecutar bytecode. Conceptualmente, el runtime agrega bibliotecas necesarias para ejecutar y el JDK añade compilador, debugger, `javadoc`, `jcmd` y otras herramientas. Que una distribución moderna no entregue un JRE separado no elimina esa distinción conceptual. Referencia: §2.1.

</details>

Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
### 2. Después de ejecutar `javac Order.java`, ¿qué produce normalmente el compilador?

- A. Código máquina exclusivo de la CPU actual.
- B. Uno o más archivos `.class` con bytecode.
- C. Un proceso JVM ya iniciado.
- D. Un JAR ejecutable con todas las dependencias.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** `javac` genera bytecode en archivos `.class`; pueden ser varios si hay clases anidadas u otras declaraciones. La JVM interpreta o compila ese bytecode mediante JIT. Crear un JAR y resolver dependencias son pasos de empaquetado, no una consecuencia automática de `javac`. Referencia: §2.2.

</details>

### 3. ¿Qué ocurre al ejecutar `mvn package` en un proyecto `jar` estándar?

- A. Se ejecutan las fases hasta `package`, incluidas compilación y pruebas unitarias.
- B. Se publica obligatoriamente el artefacto en un repositorio remoto.
- C. Solo se crea el JAR; no se ejecutan fases anteriores.
- D. Se elimina primero `target/` aunque no se solicite `clean`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Invocar una fase ejecuta las fases anteriores del mismo ciclo: `validate`, `compile`, `test` y finalmente `package`. `deploy` publica remotamente y `clean` pertenece a otro ciclo, por lo que deben pedirse explícitamente. Referencia: §1A.4.

</details>

### 4. En `mvn dependency:tree`, ¿qué representan `dependency` y `tree`?

- A. Plugin y goal.
- B. Artefacto y classifier.
- C. Scope y packaging.
- D. Ciclo y fase.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La forma abreviada `prefix:goal` ejecuta un goal concreto de un plugin. Una fase, como `test`, es un punto del ciclo de vida al que Maven vincula goals según packaging y configuración. Referencia: §1A.4.

</details>

### 5. Una biblioteca se necesita para compilar pruebas y ejecutarlas, pero nunca debe formar parte del artefacto de producción. ¿Qué scope corresponde?

- A. `runtime`
- B. `test`
- C. `provided`
- D. `compile`

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El scope `test` limita la dependencia al classpath de compilación y ejecución de pruebas. `compile` es el predeterminado y se propaga; `runtime` no está para compilar código principal; `provided` supone que el entorno de ejecución la aportará. Referencia: §1A.5.

</details>

### 6. ¿Qué efecto tiene declarar una versión dentro de `dependencyManagement` sin añadirla a `dependencies`?

- A. La dependencia se añade con scope `compile`.
- B. Sobrescribe todas las dependencias transitivas aunque nadie use el artefacto.
- C. Se descarga y se añade únicamente en tests.
- D. Solo administra valores para declaraciones que realmente la soliciten.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `dependencyManagement` centraliza versión, scope u otra información, pero no incorpora por sí solo la biblioteca. Un módulo todavía debe declararla en `dependencies`. Esta diferencia permite un BOM común sin cargar todos sus artefactos. Referencia: §1A.7.

</details>

### 7. Dos rutas transitivas aportan versiones diferentes del mismo artefacto. ¿Qué regla básica usa Maven para mediar?

- A. Selecciona siempre la versión numéricamente mayor.
- B. Falla siempre el build.
- C. Usa la primera descargada en el repositorio local.
- D. Prefiere la definición más cercana en el árbol de dependencias.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Maven aplica *nearest definition*; si ambas están a la misma profundidad, el orden de declaración puede decidir. No es una selección automática de “la más nueva”. Por eso conviene declarar directamente las bibliotecas usadas y alinear familias mediante `dependencyManagement`/BOM. Referencia: §1A.6.

</details>

### 8. ¿Por qué suele preferirse `<maven.compiler.release>17</maven.compiler.release>` a configurar solo `target=17`?

- A. Porque obliga a usar Maven 17.
- B. Porque convierte todas las dependencias al formato modular.
- C. Porque descarga automáticamente un JDK 17.
- D. Porque controla sintaxis, bytecode y APIs públicas disponibles para la versión objetivo.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `--release` evita compilar accidentalmente contra APIs de un JDK más reciente aunque el bytecode use un target anterior. No instala un JDK ni transforma dependencias. Referencia: §1A.3.

</details>

### 9. ¿Cuál afirmación distingue herencia y agregación en un proyecto Maven multimódulo?

- A. Un POM padre aporta configuración; un agregador lista módulos para el reactor.
- B. Solo un POM con packaging `jar` puede ser padre.
- C. Todo padre debe construir físicamente a sus hijos.
- D. Agregar un módulo hace que herede automáticamente todas las dependencias.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Herencia y agregación son relaciones diferentes aunque un POM raíz pueda cumplir ambas. El padre se declara con `<parent>`; el agregador enumera `<modules>` y suele usar packaging `pom`. Agregar no implica heredar si el hijo no declara ese padre. Referencia: §1A.9.

</details>

### 10. ¿Qué comando ayuda a descubrir de dónde proviene una configuración heredada o predeterminada del POM?

- A. `mvn java:bytecode`
- B. `mvn package:explain`
- C. `mvn help:effective-pom`
- D. `mvn dependency:purge`

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El POM efectivo combina el POM del proyecto, padres, perfiles y defaults. `dependency:tree` responde otra pregunta: el árbol de artefactos. Referencia: §1A.6.

</details>

### 11. ¿Qué imprime el siguiente código?

```java
byte a = 10;
byte b = 20;
var result = a + b;
System.out.println(((Object) result).getClass().getSimpleName());
```

- A. `Byte`
- B. `Short`
- C. `Integer`
- D. No compila porque `var` no admite primitivos.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La promoción numérica binaria convierte `byte`, `short` y `char` a `int` para la suma. `var` infiere `int`; el cast a `Object` lo boxea como `Integer`. Referencia: §3.

</details>

### 12. ¿Qué imprime este fragmento?

```java
int value = 0;
boolean result = false && (++value > 0);
System.out.println(value + ":" + result);
```

- A. No compila por modificar `value` dentro de la expresión.
- B. `1:false`
- C. `1:true`
- D. `0:false`

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `&&` es de cortocircuito: al ser falso el operando izquierdo no evalúa `++value`. Los operadores `&` y `|` sobre booleanos sí evaluarían ambos lados. Referencia: §3.

</details>

### 13. ¿Qué resultado produce?

```java
String a = "java";
String b = new String("java");
System.out.println((a == b) + ":" + a.equals(b));
```

- A. `true:true`
- B. `false:true`
- C. `true:false`
- D. `false:false`

<details><summary>Ver respuesta</summary>

**Respuesta: B.** `==` compara identidad de referencias y `new` crea otro objeto. `String.equals` compara la secuencia de caracteres. El string pool no hace que toda instancia con el mismo texto sea la misma referencia. Referencia: §3.

</details>

### 14. ¿Qué afirmación es correcta sobre este código?

```java
Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
```

- A. Ambas comparaciones con `==` deben ser `false`.
- B. Ninguna compila porque `Integer` no admite literales.
- C. Ambas deben ser `true` por autoboxing.
- D. `a == b` debe ser `true`; no debe dependerse de la identidad de `c` y `d`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El boxing de ciertas expresiones constantes en el rango al menos `-128..127` debe reutilizar identidad. Fuera de ese rango una implementación puede cachear más, por lo que `c == d` no es un contrato de valor. Para valores usa `equals`. Referencia: §3.

</details>

### 15. ¿Cuál declaración con `var` no compila?

- A. `var names = new ArrayList<String>();`
- B. `var count = 10;`
- C. `for (var name : names) { }`
- D. `var mapper = (String s) -> s.length();`

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Una lambda necesita un tipo objetivo funcional; `var` no puede inferirlo únicamente desde la lambda. En las demás posiciones existe un inicializador o contexto permitido. `var` no hace Java dinámico: el tipo inferido sigue siendo estático. Referencia: §3.

</details>

### 16. ¿Qué garantiza `final` aquí?

```java
final List<String> names = new ArrayList<>();
names.add("Ada");
```

- A. La referencia no puede reasignarse, pero el objeto puede mutar.
- B. La lista se vuelve automáticamente thread-safe.
- C. `add` no compila.
- D. La lista y sus elementos son inmutables.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `final` sobre una variable de referencia impide asignarle otra referencia después de inicializarla; no cambia la mutabilidad del objeto apuntado. Inmutabilidad y seguridad concurrente son contratos diferentes. Referencia: §3 y §14.

</details>

### 17. ¿Qué genera automáticamente un `record Customer(String id, String name)`?

- A. Setters públicos para ambos componentes.
- B. Campos de instancia mutables y constructor vacío.
- C. Accessors, constructor canónico, `equals`, `hashCode` y `toString` basados en componentes.
- D. Persistencia y serialización JSON.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un record modela datos transparentes y genera miembros asociados a sus componentes. Sus campos son finales, pero un componente puede referir a un objeto mutable. Ningún record obtiene persistencia o JSON por el lenguaje. Referencia: §5.15.

</details>

### 18. Dado `sealed interface Shape permits Circle, Rectangle`, ¿qué debe cumplir una implementación directa permitida?

- A. Ser necesariamente `final`.
- B. Ser un record.
- C. Vivir siempre como clase anidada de `Shape`.
- D. Declararse `final`, `sealed` o `non-sealed`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Un subtipo directo debe declarar cómo continúa o cierra la jerarquía. `final` es una opción, no la única; `sealed` restringe de nuevo y `non-sealed` vuelve a abrir. Referencia: §5.14.

</details>

### 19. ¿Por qué no conviene persistir `status.ordinal()` de un enum?

- A. Porque `ordinal()` siempre devuelve `-1` fuera de un switch.
- B. Porque el ordinal cambia si se reordenan o insertan constantes.
- C. Porque los enums no son objetos.
- D. Porque `ordinal()` solo existe durante compilación.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El ordinal representa la posición declarativa, no un código de negocio estable. Persistirlo acopla datos al orden del fuente. Usa un código explícito o una estrategia de migración por nombre. Referencia: §5.17.

</details>

### 20. Si `a.equals(b)` es `true`, ¿qué exige el contrato de hashing?

- A. `a` y `b` deben ser la misma referencia.
- B. `a.hashCode()` y `b.hashCode()` deben ser iguales.
- C. Sus hash codes deben ser distintos para evitar colisiones.
- D. Solo importa si ambos son `String`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Objetos iguales deben producir el mismo hash. El inverso no se exige: dos objetos no iguales pueden colisionar. Romper el contrato hace que `HashMap`/`HashSet` no encuentren correctamente valores lógicamente iguales. Referencia: §4.

</details>

### 21. ¿Qué sobrecarga se invoca?

```java
void process(long value)   { System.out.print("long"); }
void process(Integer value){ System.out.print("Integer"); }

process(10);
```

- A. Es ambiguo.
- B. `Integer`
- C. `long`
- D. Ninguna; se requiere sufijo `L`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Para un literal `int`, widening primitivo a `long` se prefiere sobre boxing a `Integer` durante resolución de overload. La selección ocurre en compilación. Referencia: §6.

</details>

### 22. ¿Qué imprime?

```java
class Parent { void run() { System.out.print("P"); } }
class Child extends Parent { @Override void run() { System.out.print("C"); } }

Parent value = new Child();
value.run();
```

- A. `C`, por despacho dinámico.
- B. `P`, por el tipo declarado.
- C. `PC`.
- D. No compila por asignar `Child` a `Parent`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La firma aplicable se conoce desde el tipo declarado, pero una llamada a método de instancia sobrescribible se despacha según el tipo real. El upcast es implícito y seguro. Referencia: §6 y §7.6.

</details>

### 23. ¿Qué imprime este código sobre métodos `static`?

```java
class Parent { static void show() { System.out.print("P"); } }
class Child extends Parent { static void show() { System.out.print("C"); } }

Parent value = new Child();
value.show();
```

- A. `PC`
- B. `P`
- C. `C`
- D. No compila porque un método estático no puede repetirse.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los métodos estáticos se ocultan, no se sobrescriben; la selección depende del tipo declarado de la expresión. Invocarlos mediante una instancia es legal pero confuso: prefiere `Parent.show()`. Referencia: §6.

</details>

### 24. Dos interfaces no relacionadas proporcionan el mismo método `default`. ¿Qué debe hacer la clase que implementa ambas?

- A. Nada; siempre gana la primera interfaz de la declaración.
- B. Convertir ambos métodos en `static` durante compilación.
- C. Sobrescribir el método y resolver explícitamente la ambigüedad.
- D. Declararse abstracta final.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Si ninguna interfaz es más específica y no existe un método de clase que gane, el compilador obliga a resolver. La implementación puede elegir `A.super.method()` o combinar comportamientos. El orden textual de interfaces no decide. Referencia: §5.10–5.12.

</details>

### 25. ¿Qué imprime?

```java
class Parent {
    Parent() { print(); }
    void print() { System.out.print("P"); }
}
class Child extends Parent {
    int value = 7;
    @Override void print() { System.out.print(value); }
}
new Child();
```

- A. `7`
- B. `0`
- C. `P`
- D. Lanza `NullPointerException`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El constructor padre llama virtualmente a `Child.print`, pero el inicializador `value = 7` todavía no se ejecutó; el campo conserva su valor predeterminado `0`. Es la razón para no llamar métodos sobrescribibles desde constructores. Referencia: §7.4.

</details>
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
Failed to create stream fd: Operation not permitted
## Bloque II — Genéricos, errores, APIs y diseño (26–50)

### 26. ¿Por qué no puede asignarse `List<Integer>` a `List<Number>`?

- A. Porque los genéricos Java son covariantes solo para números.
- B. Porque `List` solo acepta tipos finales.
- C. Porque `Integer` no extiende `Number`.
- D. Porque son invariantes; la asignación permitiría insertar un `Double` en una lista de enteros.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La relación entre argumentos no se propaga a los tipos parametrizados: `List<Integer>` no es subtipo de `List<Number>`. Los comodines expresan varianza de uso cuando corresponde. Referencia: §7.8 y §7A.4.

</details>

### 27. ¿Qué firma expresa mejor una copia desde una lista productora hacia una consumidora?

- A. `<T> void copy(List<T> source, List<T> target)` únicamente.
- B. `<T> void copy(List<? super T> source, List<? extends T> target)`.
- C. `<T> void copy(List<? extends T> source, List<? super T> target)`.
- D. `void copy(List<?> source, List<?> target)` y `target.add(source.get(0))`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** PECS: quien produce valores se declara `? extends T`; quien los consume, `? super T`. La firma acepta, por ejemplo, copiar `List<Integer>` hacia `List<Number>`. Referencia: §7A.4.

</details>

### 28. Dada `List<? extends Number> values`, ¿qué operación es segura?

- A. `values.add(1)`.
- B. `values.add(2.5)`.
- C. `Integer value = values.get(0)` sin cast.
- D. `Number value = values.get(0)`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La lista real podría ser de `Integer`, `Double` u otro subtipo. Puede leerse como `Number`, pero no agregarse un subtipo concreto porque podría violar el tipo real desconocido. Referencia: §7.9 y §7A.4.

</details>

### 29. ¿Cuál comprobación compila por efecto del borrado de tipos?

- A. `new T()`.
- B. `value instanceof T` dentro de `class Box<T>`.
- C. `value instanceof List<String>`.
- D. `value instanceof List<?>`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `List<?>` es reificable: no afirma un argumento concreto que se haya borrado. `List<String>` y `T` no están disponibles para esa comprobación runtime; construir `T` también requiere una fábrica o token de tipo. Referencia: §7A.5.

</details>

### 30. ¿Por qué estas dos declaraciones no pueden coexistir en la misma clase?

```java
void process(List<String> values) { }
void process(List<Integer> values) { }
```

- A. Porque los métodos no pueden sobrecargarse con colecciones.
- B. Porque `String` e `Integer` son finales.
- C. Porque tras erasure ambas firmas tienen esencialmente `process(List)`.
- D. Porque faltan comodines.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El borrado produce el mismo descriptor de parámetros y causa un *name clash*. Se necesita otro nombre o una diferencia reificable en la firma. Referencia: §7A.5.

</details>

### 31. Un método padre declara `void load() throws IOException`. ¿Qué sobrescritura es válida?

- A. `void load() throws Exception`.
- B. `void load() throws FileNotFoundException`.
- C. `void load() throws Throwable`.
- D. `private void load()`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Una sobrescritura puede reducir o eliminar checked exceptions, no ampliarlas. `FileNotFoundException` es subtipo de `IOException`. Tampoco puede reducir visibilidad. Referencia: §6 y §7B.

</details>

### 32. El cuerpo de un `try-with-resources` lanza `ParseException` y `close()` lanza `IOException`. ¿Cómo se conservan normalmente?

- A. Solo queda la excepción de cierre.
- B. Se suman en una `MultiException` automática.
- C. Ambas se descartan.
- D. La del cuerpo es principal y la de cierre queda suprimida.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El fallo que motivó la salida permanece como excepción principal; los fallos al cerrar se consultan con `getSuppressed()`. Esto evita que la limpieza oculte la causa original. Referencia: §7B.4.

</details>

### 33. ¿Cuál multi-catch no compila?

- A. `catch (NoSuchFileException | AccessDeniedException e)`.
- B. `catch (IOException | FileNotFoundException e)`.
- C. `catch (IOException | SQLException e)`.
- D. `catch (ParseException | IOException e)`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Las alternativas no pueden tener relación padre-hija; `FileNotFoundException` ya está cubierta por `IOException`. Las demás parejas son tipos hermanos o no relacionados. Referencia: §7B.5.

</details>

### 34. ¿Qué devuelve este método?

```java
int value() {
    try {
        return 1;
    } finally {
        return 2;
    }
}
```

- A. `1`
- B. `2`
- C. No compila.
- D. Lanza `IllegalStateException`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El `return` de `finally` reemplaza el retorno pendiente del `try`; también podría ocultar una excepción. Es legal pero un antipatrón: `finally` debe limpiar, no decidir el resultado. Referencia: §7B.4.

</details>

### 35. Al traducir una excepción técnica a una de dominio, ¿qué práctica conserva mejor el diagnóstico?

- A. Incluir contexto seguro y pasar la excepción original como `cause`.
- B. Guardar solo `exception.getMessage()` en un campo estático.
- C. Lanzar la nueva excepción sin mensaje ni causa.
- D. Capturar `Throwable` y continuar.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La traducción cambia el vocabulario de la capa sin destruir stack trace ni causa. El contexto debe identificar la operación, pero no filtrar secretos. Referencia: §7B.3 y §7B.6.

</details>

### 36. Un objeto usado como clave de `HashMap` cambia un campo incluido en `hashCode`. ¿Qué riesgo aparece?

- A. El mapa reubica automáticamente la entrada.
- B. La entrada puede permanecer en un bucket que ya no corresponde y no encontrarse.
- C. La JVM convierte la clave en inmutable.
- D. Solo cambia el orden de iteración.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** `HashMap` no observa mutaciones de la clave para reindexarla. Las claves deben mantener estable su identidad lógica mientras estén almacenadas; records u objetos de valor inmutables son buenas opciones. Referencia: §7F.4.

</details>

### 37. ¿Qué ocurre aquí?

```java
List<String> values = List.of("A", null);
```

- A. No compila porque `List.of` solo acepta números.
- B. Crea una lista no modificable que permite `null`.
- C. Crea una lista modificable de tamaño dos.
- D. Lanza `NullPointerException` durante la creación.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Las fábricas `List.of`, `Set.of` y `Map.of` rechazan null y crean colecciones no modificables. La falla ocurre al construir. Referencia: §7F.7.

</details>

### 38. ¿Qué imprime?

```java
List<String> source = new ArrayList<>(List.of("A"));
List<String> view = Collections.unmodifiableList(source);
List<String> copy = List.copyOf(source);
source.add("B");
System.out.println(view.size() + ":" + copy.size());
```

- A. `2:1`
- B. `1:1`
- C. `2:2`
- D. Lanza `UnsupportedOperationException` en `source.add`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `unmodifiableList` es una vista que refleja cambios efectuados a través de `source`; `copyOf` toma un snapshot no modificable. `source` continúa siendo mutable. Referencia: §7F.7.

</details>

### 39. ¿Qué garantiza `PriorityQueue`?

- A. Que su iterador recorre todos los elementos ordenados.
- B. Que conserva orden de inserción.
- C. Que es thread-safe.
- D. Que la cabeza obtenida con `peek`/`poll` respeta la prioridad.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La estructura mantiene el elemento prioritario en la cabeza, pero su iteración no es un recorrido ordenado total. Para extraer en orden hay que hacer `poll` repetidamente. Referencia: §7F.5.

</details>

### 40. Un `TreeSet<Person>` usa un comparator que compara solo apellido. Dos personas distintas comparten apellido. ¿Qué puede ocurrir?

- A. Siempre conserva ambas porque usa `equals` para unicidad.
- B. Cambia automáticamente a `HashSet`.
- C. Considera duplicada a la segunda si el comparator devuelve cero.
- D. Lanza `ClassCastException` por comparar strings.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** En colecciones ordenadas, un resultado de comparación cero determina equivalencia para el set. Incluye criterios de desempate, como ID, si ambas personas deben coexistir. Referencia: §7F.3 y §7F.6.

</details>

### 41. ¿Qué hace esta llamada si `word` no estaba en el mapa?

```java
counts.merge(word, 1, Integer::sum);
```

- A. Invoca `Integer::sum` con un argumento null obligatoriamente.
- B. No modifica el mapa.
- C. Inserta `word -> 1`.
- D. Lanza `NoSuchElementException`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `merge` inserta el valor dado cuando no existe uno asociado; si existe, combina viejo y nuevo con la función. Expresa el conteo sin un bloque `containsKey` separado. Referencia: §7F.4.

</details>

### 42. ¿Qué estructura es la opción general recomendada para usar como pila LIFO moderna?

- A. `Stack`
- B. `CopyOnWriteArrayList`
- C. `TreeSet`
- D. `ArrayDeque`

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `ArrayDeque` implementa operaciones `push`/`pop` y evita la API histórica sincronizada de `Stack`. No acepta null. Referencia: §7F.5.

</details>

### 43. ¿Cuál forma elimina elementos durante una iteración sin violar el contrato del iterador?

- A. Llamar siempre `collection.remove(value)` dentro de for-each.
- B. Usar `iterator.remove()` después de `iterator.next()`.
- C. Reasignar la variable del for-each a null.
- D. Modificar la colección desde otro hilo.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El iterador conoce la modificación realizada mediante su propio `remove`. Para una condición simple también existe `removeIf`. Modificar estructuralmente por otra ruta puede causar `ConcurrentModificationException` y no aporta sincronización. Referencia: §7F.8.

</details>

### 44. ¿Qué afirmación sobre `BigDecimal` es correcta?

- A. `new BigDecimal(0.1)` siempre representa decimal 0.1 exacto.
- B. `new BigDecimal("0.1")` evita arrastrar la aproximación binaria de un `double`.
- C. `new BigDecimal("2.0").equals(new BigDecimal("2.00"))` es `true`.
- D. `BigDecimal` elige redondeo automáticamente en toda división.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Construir desde texto conserva la representación decimal indicada. `equals` considera valor y escala, por lo que `2.0` y `2.00` difieren; `compareTo` los considera numéricamente iguales. Algunas divisiones requieren escala/modo de redondeo explícitos. Referencia: §7D.4.

</details>

### 45. Se recibe `LocalDateTime` para programar una reunión mundial. ¿Qué información falta para convertirla inequívocamente a `Instant`?

- A. Una `ZoneId` y una política para posibles ambigüedades de horario.
- B. Un `Locale` únicamente.
- C. Un `Period`.
- D. Un formatter JSON.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `LocalDateTime` no representa zona ni offset. Una zona resuelve reglas históricas, incluidos solapamientos o huecos. `Locale` afecta presentación, no posición en la línea de tiempo. Referencia: §7D.1.

</details>

### 46. ¿Por qué debe cerrarse el stream devuelto por `Files.lines(path)`?

- A. Porque mantiene un recurso de archivo abierto durante el consumo perezoso.
- B. Porque los streams Java siempre crean un hilo.
- C. Porque de otro modo no puede ejecutarse `filter`.
- D. Porque convierte el archivo a escritura.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El stream está respaldado por I/O y debe usarse en `try-with-resources`. Las colecciones convertidas a stream normalmente no requieren cierre, pero las fuentes de recursos sí. Referencia: §7D.2 y §7B.4.

</details>

### 47. ¿Qué diferencia principal existe entre `Matcher.matches()` y `Matcher.find()`?

- A. `matches` busca una subsecuencia; `find` exige toda la entrada.
- B. `find` modifica la expresión regular.
- C. `matches` exige coincidencia completa; `find` busca la siguiente ocurrencia.
- D. No hay diferencia.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `matches()` valida que el patrón cubra toda la región; `find()` recorre coincidencias parciales. Elegir el equivocado puede aceptar texto adicional o rechazar búsquedas válidas. Referencia: §7D.3.

</details>

### 48. En JPMS, ¿qué diferencia resume `exports` y `opens`?

- A. `exports` incluye automáticamente todos los subpaquetes.
- B. `opens` compila el módulo y `exports` lo ejecuta.
- C. Ambos son alias.
- D. `exports` habilita acceso público normal; `opens` permite reflexión profunda.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Exportar hace accesibles tipos públicos a módulos lectores; abrir permite acceso reflexivo a miembros según la configuración. Los paquetes no son jerárquicos para JPMS: exportar uno no exporta subpaquetes. Referencia: §7E.1.

</details>

### 49. ¿Qué pareja de directivas conecta un consumidor y un proveedor mediante `ServiceLoader`?

- A. `main-class` y `manifest`.
- B. `exports` y `opens` solamente.
- C. `requires static` en ambos.
- D. `uses` en el consumidor y `provides ... with ...` en el proveedor.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `uses` declara consumo de un servicio y `provides Service with Implementation` registra una implementación modular. El consumidor carga proveedores sin conocer la clase concreta. Referencia: §7E.1.

</details>

### 50. ¿Qué diseño aplica mejor Dependency Inversion?

- A. `OrderService` crea `new StripeGateway()` dentro de cada método.
- B. Todos los métodos de pago son estáticos globales.
- C. `OrderService` recibe un `PaymentGateway` por constructor y la composición elige la implementación.
- D. `StripeGateway` extiende `OrderService`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La política de alto nivel depende de un contrato estable; el ensamblaje suministra un detalle concreto. Esto hace explícita la dependencia y facilita sustitución sin acoplar el servicio a construcción o framework. Referencia: §8.4.

</details>

## Bloque III — Lambdas, Streams y JVM (51–75)

### 51. ¿Por qué esta interfaz continúa siendo funcional?

```java
@FunctionalInterface
interface Action {
    void run();
    boolean equals(Object other);
}
```

- A. Porque `equals` es `static` dentro de una interfaz.
- B. Porque `equals(Object)` corresponde a un método público de `Object` y no añade otro contrato funcional independiente.
- C. Porque toda interfaz con dos métodos es funcional.
- D. No es funcional y la anotación no compila.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los métodos que corresponden a métodos públicos de `Object` no cuentan como un segundo método abstracto funcional. El descriptor de la lambda es `void run()`. Referencia: §11.

</details>

### 52. ¿Por qué no compila?

```java
int total = 0;
List.of(1, 2, 3).forEach(n -> total += n);
```

- A. `total` no es final ni efectivamente final porque se modifica.
- B. `List.of` no implementa `Iterable`.
- C. `forEach` solo acepta métodos estáticos.
- D. Una lambda no puede recibir enteros.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Las variables locales capturadas deben ser finales o efectivamente finales. Mutar un objeto referenciado puede compilar, pero introducir estado compartido mutable en lambdas suele ser una señal para usar reducción o un ciclo. Referencia: §11.

</details>

### 53. Dentro de una lambda declarada en un método de instancia, ¿a qué se refiere `this`?

- A. A la instancia envolvente en la que se declaró la lambda.
- B. A un objeto sintético que representa la lambda.
- C. Siempre a `Thread.currentThread()`.
- D. No puede usarse `this` en lambdas.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Una lambda no introduce su propio `this`; una clase anónima sí. Esta diferencia afecta resolución de miembros y semántica, aunque ambas puedan implementar una interfaz funcional. Referencia: §5.16 y §11.

</details>

### 54. ¿Qué referencia a método es equivalente a `text -> text.trim()`?

- A. `text::String`
- B. `String.trim()`
- C. `String::trim`
- D. `Object::new`

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Es una referencia a método de instancia de un objeto arbitrario de tipo `String`; el parámetro de la función se convierte en receptor. Su validez final depende del tipo objetivo funcional. Referencia: §11.

</details>

### 55. Para `Function<A,B> first` y `Function<B,C> second`, ¿qué expresa `first.andThen(second)`?

- A. Ejecutar `second` y pasar su resultado a `first`.
- B. Ejecutar ambas en paralelo.
- C. Ejecutar `first` y pasar su resultado a `second`.
- D. Combinar sus resultados en una lista.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `andThen` sigue el orden de lectura: primero `first`, después `second`. `compose` invierte el orden conceptual. Los tipos de salida/entrada hacen explícita la composición. Referencia: §11.

</details>

### 56. ¿Qué imprime antes de llamar a `count()`?

```java
Stream<Integer> stream = Stream.of(1, 2, 3)
        .filter(n -> {
            System.out.print(n);
            return n > 1;
        });
System.out.print("A");
long count = stream.count();
```

- A. `A123`
- B. Nada, incluso después de `count`.
- C. `A` únicamente.
- D. `123A`

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Las operaciones intermedias son perezosas; construir el pipeline no recorre la fuente. Primero se imprime `A`; la terminal `count` dispara el filtro y sus efectos en orden secuencial. Referencia: §12.

</details>

### 57. ¿Qué ocurre al ejecutar una segunda operación terminal sobre el mismo stream?

```java
Stream<String> stream = Stream.of("A", "B");
stream.count();
stream.findFirst();
```

- A. Devuelve siempre `Optional.empty()`.
- B. Se vuelve a recorrer desde el principio.
- C. La segunda operación normalmente lanza `IllegalStateException` porque el stream ya fue consumido.
- D. Solo falla si el stream era paralelo.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un stream representa un pipeline de un solo uso. Si se necesita repetir, conserva la fuente o una `Supplier<Stream<T>>` que cree uno nuevo. Referencia: §12.

</details>

### 58. ¿Qué operación transforma `Stream<List<String>>` en `Stream<String>` con todos los elementos internos?

- A. `map(List::stream)`.
- B. `peek(List::clear)`.
- C. `filter(List::isEmpty)`.
- D. `flatMap(List::stream)`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `map` produciría `Stream<Stream<String>>`; `flatMap` mapea y aplana un nivel. Se usa para relaciones uno-a-muchos o resultados opcionales/streams anidados. Referencia: §12.

</details>

### 59. ¿De qué depende `stream.distinct()` para objetos normales?

- A. Del contrato `equals` y `hashCode`.
- B. De `Comparable` obligatoriamente.
- C. Solo de identidad `==`.
- D. Del orden alfabético de `toString`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La noción de duplicado sigue igualdad lógica. Una implementación incoherente de `equals`/`hashCode` produce resultados sorprendentes igual que en un `HashSet`. Referencia: §4 y §12.

</details>

### 60. ¿Por qué esta reducción es problemática en paralelo?

```java
int result = numbers.parallelStream()
        .reduce(0, (a, b) -> a - b);
```

- A. La resta no está definida para enteros.
- B. El identificador debe ser siempre uno.
- C. La operación no es asociativa y las particiones pueden agruparse de distintas formas.
- D. `reduce` nunca funciona con streams paralelos.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Una reducción paralela necesita identidad compatible y operación asociativa. La resta cambia con el agrupamiento, por lo que el resultado puede diferir del recorrido secuencial. Referencia: §12.

</details>

### 61. ¿Qué ocurre si dos elementos generan la misma clave aquí?

```java
people.stream().collect(Collectors.toMap(Person::name, Person::age));
```

- A. Se conserva silenciosamente el último.
- B. Se conserva silenciosamente el primero.
- C. Se lanza una excepción por clave duplicada si no se da función merge.
- D. La clave se convierte en lista automáticamente.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `toMap` requiere una política explícita para colisiones. Si las repeticiones son parte del modelo, usa una función merge o `groupingBy`; no dependas de pérdida silenciosa. Referencia: §12.

</details>

### 62. ¿Qué collector crea un mapa de departamento a lista de empleados?

- A. `joining(Employee::department)`.
- B. `groupingBy(Employee::department)`.
- C. `partitioningBy(Employee::department)`.
- D. `counting(Employee::department)`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** `groupingBy` clasifica por una clave arbitraria y, por defecto, acumula listas. `partitioningBy` solo divide por predicado booleano. Referencia: §12.

</details>

### 63. ¿Cuál diferencia existe entre `optional.orElse(expensive())` y `optional.orElseGet(this::expensive)`?

- A. Ninguna; ambas son siempre perezosas.
- B. `orElse` evalúa su argumento aunque el optional tenga valor; `orElseGet` invoca el supplier solo si está vacío.
- C. `orElseGet` solo funciona con null.
- D. `orElse` no devuelve el contenido presente.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los argumentos de métodos se evalúan antes de invocar, por lo que `expensive()` se ejecuta con `orElse`. El supplier de `orElseGet` conserva evaluación perezosa. Referencia: §12.

</details>

### 64. ¿Qué devuelve `Stream.<Integer>empty().allMatch(n -> n > 0)`?

- A. `false`
- B. Lanza `NoSuchElementException`.
- C. `null`
- D. `true`

<details><summary>Ver respuesta</summary>

**Respuesta: D.** No existe elemento que contradiga el predicado; es verdad vacía. De forma dual, `anyMatch` sobre vacío es falso y `noneMatch` es verdadero. Referencia: §12.

</details>

### 65. ¿Qué problema tiene este código?

```java
List<Integer> target = new ArrayList<>();
source.parallelStream().forEach(target::add);
```

- A. `ArrayList` recibe mutaciones concurrentes no seguras.
- B. `forEach` preserva orden y sincroniza automáticamente.
- C. Un stream paralelo nunca usa más de un hilo.
- D. `add` es una operación intermedia.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El efecto lateral comparte una colección no thread-safe. Usa una reducción/collector diseñado para combinar resultados o mantén el pipeline secuencial si no existe beneficio medido. Referencia: §12 y §14.

</details>

### 66. ¿Qué propiedad de un `Spliterator` favorece paralelismo eficiente?

- A. Que nunca pueda dividir la fuente.
- B. Que convierta cada elemento en `String`.
- C. Que todo elemento se sincronice con un monitor global.
- D. Que `trySplit` produzca particiones razonablemente balanceadas y baratas.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Los streams paralelos dependen de dividir el trabajo. Fuentes indexadas como arrays suelen particionarse mejor que estructuras enlazadas o iteradores con división costosa. Referencia: §12.

</details>

### 67. ¿Cuál es el propósito de Stream Gatherers finalizados en Java 24?

- A. Definir operaciones intermedias personalizadas con estado e integración al pipeline.
- B. Hacer mutable cualquier stream.
- C. Sustituir toda la Collections API.
- D. Ejecutar SQL desde `Stream`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Los gatherers amplían el repertorio de transformaciones intermedias, por ejemplo ventanas o acumulación incremental, sin convertirlas en terminales. No eliminan la necesidad de colecciones ni vuelven seguro cualquier paralelismo. Referencia: §12 y §13.2.

</details>

### 68. ¿Qué acción provoca inicialización de una clase, no solo carga/enlace?

- A. Copiar un literal `static final` constante inlined desde otra clase.
- B. Leer un campo `static` no constante por primera vez.
- C. Declarar una variable de referencia sin crear objeto.
- D. Mencionar su nombre en un comentario.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El uso activo, como crear instancia, invocar método estático o leer/escribir campo estático no constante, dispara `<clinit>`. Una constante de compilación puede quedar inlined y no inicializar al propietario. Referencia: §2.4.

</details>

### 69. ¿Qué contiene principalmente el runtime constant pool de una clase?

- A. Los stacks de todos los hilos.
- B. Solo objetos creados con `new`.
- C. Únicamente strings internados globales.
- D. Constantes y referencias simbólicas derivadas del archivo `.class`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Incluye literales y referencias simbólicas a tipos, campos y métodos que la JVM resuelve según necesidad. No es equivalente al heap ni al string pool. Referencia: §2.

</details>

### 70. Una recursión sin caso base termina normalmente con:

- A. `StackOverflowError` al agotar el stack del hilo.
- B. `OutOfMemoryError` obligatorio en heap.
- C. `ConcurrentModificationException`.
- D. Recolección automática del frame anterior.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Cada llamada agrega un frame con variables locales, operand stack y datos de retorno. Si la profundidad excede el stack disponible se produce `StackOverflowError`. Referencia: §2 y §16.

</details>

### 71. ¿Qué afirmación describe mejor heap y stacks?

- A. Cada objeto vive siempre en el stack del método que lo creó.
- B. Cada hilo tiene un heap privado completo.
- C. Los campos estáticos viven dentro del frame de `main`.
- D. El heap es compartido; cada hilo tiene su propio stack de frames.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El modelo de la JVM comparte objetos/estado de heap entre hilos, mientras cada hilo mantiene su pila de ejecución. Optimizaciones pueden eliminar asignaciones, pero no cambian el modelo semántico observable. Referencia: §2.

</details>

### 72. Una aplicación genera clases/proxies dinámicamente y conserva sus class loaders. ¿Qué área puede crecer por una fuga de carga de clases?

- A. Metaspace.
- B. Solo TLAB del hilo principal.
- C. PC register.
- D. Operand stack de un método ya terminado.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** HotSpot almacena metadata de clases en Metaspace. Las clases se descargan con su class loader cuando este deja de ser alcanzable; retener loaders puede producir crecimiento y `OutOfMemoryError: Metaspace`. Referencia: §2.

</details>

### 73. ¿Qué afirmación sobre `String.intern()` es correcta?

- A. Garantiza menor memoria para cualquier carga sin costo.
- B. Convierte el string en mutable.
- C. Copia el string al stack actual.
- D. Devuelve una representación canónica del pool para contenido igual.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `intern` consulta/agrega una referencia canónica. Puede ahorrar duplicación en casos medidos, pero añade tabla global y costo; no es una optimización universal ni cambia inmutabilidad. Referencia: §2.

</details>

### 74. ¿Por qué la JVM puede desoptimizar código previamente compilado por JIT?

- A. Porque una suposición especulativa, como tipos observados o inlining, deja de ser válida.
- B. Porque el bytecode se borra después de ejecutarse.
- C. Porque cada excepción elimina permanentemente el método.
- D. Porque JIT solo compila métodos `final`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** HotSpot optimiza según perfiles y supuestos; si aparece un subtipo o camino no previsto puede volver a una representación menos optimizada y recompilar. Es parte del carácter adaptativo del JIT. Referencia: §2.

</details>

### 75. ¿Qué puede permitir el análisis de escape?

- A. Hacer accesible un objeto privado desde cualquier módulo.
- B. Eliminar una asignación o reemplazarla por valores escalares si el objeto no escapa.
- C. Convertir toda referencia débil en fuerte.
- D. Evitar verificación de bytecode.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Si el JIT demuestra que una instancia no es observable fuera de cierto alcance puede aplicar eliminación de asignación, reemplazo escalar o eliminación de locks. Es una optimización, no una garantía para razonar sobre identidad o memoria exacta. Referencia: §2.

</details>

## Bloque IV — Memoria, concurrencia y diagnóstico (76–100)

### 76. Un objeto solo es alcanzable mediante `WeakReference`. ¿Qué puede hacer el GC?

- A. Nunca recolectarlo hasta cerrar la JVM.
- B. Limpiar la referencia débil y volver elegible el objeto sin esperar agotamiento de heap.
- C. Promoverlo obligatoriamente a old generation.
- D. Convertirlo en literal internado.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Una referencia débil no conserva fuertemente al referente. El GC puede limpiarla cuando detecta que no hay alcance fuerte/soft apropiado. `WeakHashMap` aprovecha esta propiedad para claves, pero la recolección no tiene tiempo determinista. Referencia: §9.

</details>

### 77. ¿Por qué `SoftReference` no es una política de caché de negocio predecible?

- A. Porque solo acepta primitivas.
- B. Porque su `get()` siempre devuelve null.
- C. Porque la JVM decide su limpieza según presión y política, sin TTL ni tamaño contractual.
- D. Porque mantiene objetos para siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Una soft reference puede sobrevivir más que una weak, pero no ofrece expiración, capacidad ni comportamiento portable suficiente para una caché controlada. Usa límites y TTL explícitos cuando sean requisitos. Referencia: §9.

</details>

### 78. ¿Qué devuelve `PhantomReference.get()`?

- A. El referente mientras no se cierre.
- B. Siempre `null`.
- C. Un `Optional`.
- D. El objeto finalizado.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Las phantom references se usan junto con `ReferenceQueue` para notificación/limpieza posterior al alcance, no para resucitar o acceder al objeto. Referencia: §9.

</details>

### 79. ¿Qué intuición explota la hipótesis generacional del GC?

- A. Todos los objetos viven exactamente lo mismo.
- B. Los objetos grandes nunca se recolectan.
- C. Los campos `final` solo existen en old generation.
- D. La mayoría de objetos muere joven y pocos sobreviven mucho tiempo.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Separar lógicamente generaciones permite recolectar con frecuencia áreas donde muchos objetos ya murieron. Es una observación de cargas comunes, no una regla semántica del lenguaje. Referencia: §10.

</details>

### 80. Una aplicación tiene heap grande y un objetivo estricto de pausas muy bajas. ¿Qué collector merece evaluación específica?

- A. Ninguno; todos tienen pausas idénticas.
- B. ZGC.
- C. Serial GC obligatoriamente.
- D. Epsilon como solución permanente de memoria.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** ZGC está diseñado para baja latencia y trabajo mayormente concurrente. La selección requiere medir throughput, latencia, memoria y versión; G1 sigue siendo una opción general. Epsilon no recolecta y se usa en escenarios especiales. Referencia: §10.

</details>

### 81. ¿Qué garantiza `volatile int count; count++;`?

- A. Exclusión mutua para todo el objeto.
- B. El incremento completo es atómico.
- C. Visibilidad/orden de lecturas y escrituras volátiles, pero no atomicidad del read-modify-write.
- D. Que nunca se pierden actualizaciones.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `count++` lee, suma y escribe; dos hilos pueden intercalarse. `volatile` sirve para publicación/visibilidad de un valor, no convierte operaciones compuestas en atómicas. Referencia: §14.10 y §14.14.

</details>

### 82. ¿Qué relación *happens-before* crea un monitor?

- A. Todo acceso de cualquier hilo sucede antes de cualquier otro.
- B. Solo aplica a campos `final`.
- C. `sleep` sucede antes de todas las escrituras.
- D. Un unlock sobre un monitor sucede antes de un lock posterior del mismo monitor.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** La liberación publica los efectos previos para quien adquiere posteriormente el mismo monitor. Usar objetos de lock distintos no crea esa relación. Referencia: §14.11–14.12.

</details>

### 83. ¿Qué opción implementa un contador compartido con incrementos atómicos simples?

- A. `volatile int` con `++`.
- B. `Integer` final reasignado.
- C. `AtomicInteger.incrementAndGet()`.
- D. `Thread.sleep` antes de incrementar.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `AtomicInteger` implementa operaciones read-modify-write atómicas normalmente mediante CAS. Un lock también podría proteger el contador, pero `volatile ++` no basta. Referencia: §14.16.

</details>

### 84. ¿Qué describe el problema ABA en algoritmos CAS?

- A. Una excepción se captura y vuelve a lanzar.
- B. Un valor cambia A→B→A y CAS no detecta que hubo cambios intermedios.
- C. Un thread local se hereda dos veces.
- D. Dos locks se adquieren siempre en el mismo orden.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Comparar solo el valor actual puede concluir que “nada cambió” aunque el estado transitó. Versiones, stamps u otra identidad pueden formar parte de la solución cuando el historial importa. Referencia: §14.16.

</details>

### 85. ¿Cuándo suele ser apropiado `LongAdder` frente a `AtomicLong`?

- A. Para métricas con muchas actualizaciones contendidas y lecturas de suma ocasionales.
- B. Cuando se necesita `compareAndSet` linealizable sobre un único valor.
- C. Para reemplazar cualquier saldo bancario transaccional.
- D. Cuando solo existe un hilo y se requiere menos objetos.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `LongAdder` distribuye contención entre celdas y suma al leer. Su `sum()` no es un snapshot atómico respecto a todas las actualizaciones, por lo que no sustituye un valor linealizable requerido por reglas de negocio. Referencia: §14.17.

</details>

### 86. ¿Qué ocurre al ejecutar `lock.wait()` sin poseer el monitor de `lock`?

- A. El hilo espera normalmente.
- B. Adquiere el monitor implícitamente.
- C. Lanza `IllegalMonitorStateException`.
- D. Finaliza la JVM.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `wait`, `notify` y `notifyAll` exigen que el hilo sea propietario del monitor, normalmente dentro de `synchronized(lock)`. Además, la condición debe revisarse en un bucle por despertares espurios. Referencia: §14.13.

</details>

### 87. Un hilo ejecuta `Thread.sleep` dentro de `synchronized(lock)`. ¿Qué pasa con el monitor?

- A. Se libera mientras duerme.
- B. Se transfiere al hilo más antiguo.
- C. Se conserva; otros hilos que necesitan ese monitor siguen bloqueados.
- D. El bloque `synchronized` termina.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `sleep` pausa el hilo pero no libera locks. `wait` sí libera temporalmente el monitor asociado como parte de su protocolo. Referencia: §14.7 y §14.12–14.13.

</details>

### 88. ¿Qué técnica reduce directamente el riesgo de deadlock al necesitar varios locks?

- A. Adquirirlos en un orden global consistente.
- B. Agregar más llamadas a `sleep` aleatorias.
- C. Ignorar interrupciones.
- D. Usar un lock diferente en cada acceso al mismo estado.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Un orden total evita el ciclo de espera circular. También ayudan reducir alcance, usar `tryLock` con política, evitar llamadas externas bajo lock y preferir abstracciones de mayor nivel. Referencia: §14.21.

</details>

### 89. Después de enviar tareas a un `ExecutorService`, ¿qué práctica permite terminar ordenadamente?

- A. Invocar `Thread.stop` sobre los workers.
- B. Olvidar la referencia y esperar al GC.
- C. Llamar `shutdown`, esperar un límite y escalar a `shutdownNow` si la política lo requiere.
- D. Crear otro executor para cerrarlo.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El pool administra hilos que pueden mantener viva la JVM. Un cierre ordenado deja de aceptar tareas y permite terminar las existentes; la cancelación cooperativa depende de interrupciones y del código de tarea. Referencia: §14.22–14.25.

</details>

### 90. ¿Qué diferencia básica existe entre `Future` y `CompletableFuture`?

- A. `Future` no representa resultados.
- B. `CompletableFuture` añade composición, callbacks y combinación de etapas.
- C. `CompletableFuture` siempre crea virtual threads.
- D. `Future.get` nunca bloquea.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Un `Future` clásico permite consultar/cancelar/esperar. `CompletableFuture` modela pipelines asincrónicos y manejo de éxito/fallo, pero sus executors, bloqueo y backpressure todavía requieren diseño. Referencia: §14.23 y §14.29.

</details>

### 91. ¿Qué carga suele beneficiarse más de virtual threads?

- A. Código que necesita más memoria por tarea deliberadamente.
- B. Millones de tareas principalmente bloqueadas en I/O con estilo thread-per-task.
- C. Un único cálculo matricial CPU-bound que ya ocupa todos los núcleos.
- D. Una operación que exige un único hilo de interfaz gráfica.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los virtual threads abaratan el bloqueo y permiten mantener código secuencial legible para alta concurrencia I/O-bound. No crean CPU ni vuelven paralelo un cálculo por sí solos. Referencia: §13.4–13.8.

</details>

### 92. ¿Por qué no se recomienda crear un pool fijo de virtual threads reutilizables?

- A. Porque un virtual thread no puede ejecutar lambdas.
- B. Porque siempre están fijados a un carrier.
- C. Porque solo puede existir uno por JVM.
- D. Porque son baratos y están pensados como una instancia por tarea; el límite debe aplicarse al recurso escaso.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Reutilizarlos como workers recupera complejidad de pooling sin necesidad. Si una base acepta 50 conexiones, limita ese recurso con pool de conexiones/semaphore, no el número arbitrario de virtual threads. Referencia: §13.7–13.9.

</details>

### 93. Se lanzan 10 000 virtual threads, pero un API permite 100 solicitudes concurrentes. ¿Qué mecanismo expresa el límite?

- A. Un `WeakReference` al cliente.
- B. Convertir cada thread en platform thread.
- C. Un `Semaphore` de 100 permisos alrededor de la llamada.
- D. Aumentar el heap sin límite.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El semaphore modela capacidad real y desacopla concurrencia lógica de recursos limitados. También puede existir un limitador de tasa según el contrato del API. Referencia: §13.9 y §14.31.

</details>

### 94. ¿Qué ventaja conceptual tienen Scoped Values sobre usar `ThreadLocal` mutable para contexto de petición?

- A. Ofrecen enlace inmutable y alcance léxico, más razonable con virtual threads y subtareas.
- B. Permiten compartir datos mutables globalmente sin límites.
- C. Se persisten automáticamente en base de datos.
- D. Solo funcionan en platform threads.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Un scoped value se enlaza por un alcance controlado y se hereda de forma estructurada según la API. Reduce fugas y costos de miles de copias de thread locals, aunque no reemplaza todos los estados locales. Referencia: §13.11.

</details>

### 95. En Java 25, ¿cuál es el estado de Structured Concurrency?

- A. API final sin flags.
- B. Eliminada del JDK.
- C. Quinta preview; requiere habilitar preview y puede cambiar.
- D. Parte de Maven, no del JDK.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** JEP 505 mantiene la API como preview en Java 25. Su modelo agrupa subtareas como una unidad para cancelación, error y observabilidad, pero no debe presentarse como contrato permanente. Referencia: §13.12.

</details>

### 96. ¿Qué diferencia resume `exceptionally` y `handle` en `CompletableFuture`?

- A. `exceptionally` recupera fallos; `handle` observa y transforma tanto éxito como fallo.
- B. Ambos solo se ejecutan en éxito.
- C. `handle` cancela siempre el executor.
- D. `exceptionally` no puede devolver valor.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `exceptionally` proporciona un valor alternativo ante excepción. `handle` recibe resultado y throwable y puede producir un nuevo valor en ambas rutas. La elección debe evitar esconder fallos relevantes. Referencia: §14.29.

</details>

### 97. En `ConcurrentHashMap`, ¿qué operación expresa de forma segura “crear lista si falta” como acción compuesta?

- A. `if (!map.containsKey(k)) map.put(k, value)` sin coordinación.
- B. `map.computeIfAbsent(k, key -> newValue())`.
- C. `map.get(k)` seguido siempre de `put`.
- D. Envolver solo `containsKey` en `volatile`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Las operaciones compuestas del mapa concurrente coordinan la decisión sobre la clave. Aun así, la función debe ser corta y no provocar recursión o efectos bloqueantes inesperados. Referencia: §14.30.

</details>

### 98. ¿Cuál característica es permanente en Java 25?

- A. Scoped Values.
- B. String Templates.
- C. Structured Concurrency.
- D. Stable Values.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Scoped Values se finalizaron en Java 25. Structured Concurrency y Stable Values permanecen preview; String Templates fue retirada y no debe enseñarse como característica actual. Referencia: §13.

</details>

### 99. ¿Qué herramienta inspecciona instrucciones bytecode y el constant pool de una clase?

- A. `javap -c -v Example`
- B. `jcmd <pid> GC.heap_info`
- C. `mvn dependency:tree`
- D. `jar --create`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `javap` desensambla el archivo `.class`; `-c` muestra instrucciones y `-v` información detallada como constant pool, flags y atributos. No perfila ejecución. Referencia: §16.1.

</details>

### 100. ¿Qué combinación asigna la herramienta correcta al problema?

- A. JMH para microbenchmarks; JFR para eventos/perfil de ejecución; `jcmd` para diagnóstico de una JVM activa.
- B. JFR para resolver dependencias Maven; JMH para crear heap dumps.
- C. `jcmd` para compilar Java; `javac` para medir contención.
- D. JMH para demostrar corrección del Java Memory Model en todos los interleavings.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** JMH controla warmup y optimizaciones en microbenchmarks; JFR registra CPU, asignaciones, locks, GC y otros eventos; `jcmd` consulta/comanda una JVM activa. Para pruebas de concurrencia/JMM existe JCStress. Referencia: §16.

</details>


