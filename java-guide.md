# Java a fondo — de "lo sé usar" a "lo entiendo por dentro"

Esta guía asume que **ya programas en Java**: sabes escribir una clase, un bucle, una lista. El objetivo aquí es otro — cerrar los huecos entre "usarlo" y "entender por qué funciona así", que es justo lo que separa a quien programa en Java de quien *domina* Java. Cada sección se apoya en la anterior: empezamos por el ecosistema (JDK/JRE/JVM) porque todo lo demás — memoria, concurrencia, rendimiento — se explica en términos de la JVM; seguimos con el modelo de objetos y tipos porque las colecciones y la programación funcional se apoyan en él; y terminamos en testing y certificación, que ponen a prueba todo lo anterior junto.

> **Cómo leer esta guía:** en orden, al menos la primera vez. La sección 3 (la JVM por dentro) es la que más ilumina retroactivamente — muchas "rarezas" del lenguaje que se ven en secciones posteriores (por qué `String` es inmutable, por qué el autoboxing cachea del -128 al 127, por qué un `StackOverflowError` es un `Error` y no una `Exception`) se entienden de raíz una vez que sabes cómo la JVM gestiona memoria y ejecuta bytecode.

---

## Índice

**Parte I — El ecosistema**

1. [JDK, JRE y JVM: qué es cada cosa y por qué importa la distinción](#1-jdk-jre-y-jvm-qué-es-cada-cosa-y-por-qué-importa-la-distinción)
2. [Historia y cadencia de versiones: de Java 8 al modelo de release actual](#2-historia-y-cadencia-de-versiones-de-java-8-al-modelo-de-release-actual)
3. [La JVM por dentro: bytecode, class loading, JIT y áreas de memoria](#3-la-jvm-por-dentro-bytecode-class-loading-jit-y-áreas-de-memoria)
4. [Gestión de memoria, Garbage Collection y optimización](#4-gestión-de-memoria-y-garbage-collection)

**Parte II — El lenguaje a fondo**

5. [Tipos de datos, conversiones y formateo](#5-tipos-de-datos-conversiones-y-formateo)
6. [Clases, interfaces y el modelo de objetos](#6-clases-interfaces-y-el-modelo-de-objetos)
7. [Modificadores de acceso, encapsulación, paquetes y módulos](#7-modificadores-de-acceso-encapsulación-paquetes-y-módulos)

**Parte III — La evolución del lenguaje**

8. [Java 8: el parteaguas (lambdas, streams, Optional, nuevo Date/Time)](#8-java-8-el-parteaguas-lambdas-streams-optional-nuevo-datetime)
9. [Java 9–11: módulos, `var`, y la nueva cadencia LTS](#9-java-911-módulos-var-y-la-nueva-cadencia-lts)
10. [Java 17: records, sealed classes, pattern matching](#10-java-17-records-sealed-classes-pattern-matching)
11. [Java 21: virtual threads y pattern matching avanzado](#11-java-21-virtual-threads-y-pattern-matching-avanzado)

**Parte IV — Estructuras de datos, funcional y diseño**

12. [Colecciones a fondo: Collections Framework](#12-colecciones-a-fondo-collections-framework)
13. [Programación funcional: lambdas y Streams API](#13-programación-funcional-lambdas-y-streams-api)
14. [Principios SOLID](#14-principios-solid)
15. [Patrones de diseño idiomáticos en Java](#15-patrones-de-diseño-idiomáticos-en-java)

**Parte V — Robustez y concurrencia**

16. [Manejo de excepciones a fondo](#16-manejo-de-excepciones-a-fondo)
17. [Concurrencia y paralelismo](#17-concurrencia-y-paralelismo)

**Parte VI — Persistencia y acceso a datos**

18. [Manejo de archivos y E/S](#18-manejo-de-archivos-y-es)
19. [JDBC: acceso a bases de datos desde Java](#19-jdbc-acceso-a-bases-de-datos-desde-java)
20. [ORM e Hibernate](#20-orm-e-hibernate)
21. [Transacciones: ACID y JTA](#21-transacciones-acid-y-jta)

**Parte VII — Calidad y certificación**

22. [Testing: JUnit 5, Mockito y Spring](#22-testing-junit-5-mockito-y-spring)
23. [Preguntas y ejercicios de certificación](#23-preguntas-y-ejercicios-de-certificación)

---

## 1. JDK, JRE y JVM: qué es cada cosa y por qué importa la distinción

Esta confusión es universal incluso entre gente con años de experiencia, así que empecemos por aquí porque **todo el resto de la guía depende de estos 3 conceptos**.

```
┌─────────────────────────────────────────────────────────┐
│ JDK (Java Development Kit)                                │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ JRE (Java Runtime Environment)                        │  │
│  │  ┌───────────────────────────────────────────────┐    │  │
│  │  │ JVM (Java Virtual Machine)                     │    │  │
│  │  │   - Class Loader                                │    │  │
│  │  │   - Áreas de memoria (heap, stack, metaspace)   │    │  │
│  │  │   - Execution Engine (intérprete + JIT)         │    │  │
│  │  └───────────────────────────────────────────────┘    │  │
│  │  + Librerías estándar (java.lang, java.util, ...)      │  │
│  └─────────────────────────────────────────────────────┘  │
│  + Compilador (javac), debugger (jdb), javadoc, jlink, jar  │
└─────────────────────────────────────────────────────────┘
```

| Componente | Qué es | Para quién |
|---|---|---|
| **JVM** | La máquina virtual que **ejecuta bytecode** (`.class`). Es una especificación (la *JVM Specification*) con varias implementaciones (HotSpot de Oracle/OpenJDK, GraalVM, Eclipse OpenJ9). | Necesaria para ejecutar CUALQUIER programa Java |
| **JRE** | JVM + las librerías estándar en tiempo de ejecución (`java.lang`, `java.util`, etc.) necesarias para **correr** programas Java ya compilados. | Usuarios finales que solo ejecutan programas Java (nota: desde Java 11, Oracle dejó de distribuir el JRE como paquete separado — ver sección 2) |
| **JDK** | JRE + herramientas de **desarrollo**: `javac` (compilador), `jar`, `javadoc`, `jdb` (debugger), `jshell` (REPL, desde Java 9), `jlink` (desde Java 9, genera runtimes a medida). | Desarrolladores que escriben y compilan código Java |

**Por qué importa distinguirlos:**

1. **"Java es multiplataforma" en realidad significa "la JVM abstrae la plataforma".** Compilas una vez a bytecode (`.class`), y **cualquier JVM** en cualquier sistema operativo puede ejecutar ese mismo bytecode — "write once, run anywhere" (WORA). El compilador `javac` no genera código máquina x86/ARM directamente; genera bytecode, y es la JVM (específica de cada SO) la que lo interpreta/compila a código nativo en tiempo de ejecución.
2. **Hay varias JVMs y varios JDKs (distribuciones).** OpenJDK es el proyecto open source de referencia; Oracle JDK, Eclipse Temurin (Adoptium), Amazon Corretto, Azul Zulu, GraalVM son todas **distribuciones** que empaquetan (y a veces modifican) OpenJDK con distintos términos de soporte/licencia. En el trabajo profesional es común usar Temurin o Corretto en vez del Oracle JDK por razones de licenciamiento.
3. Desde Java 11, **ya no existe un "JRE" descargable por separado** de Oracle — se usa `jlink` para generar un runtime mínimo a medida con solo los módulos que tu aplicación necesita (ver sección 9).

**Pregunta típica de certificación:** *"¿Qué herramienta compila código fuente Java a bytecode?"* → `javac` (parte del JDK, no del JRE). *"¿Puede un JRE compilar código?"* → No, el JRE no incluye `javac`.

---

## 2. Historia y cadencia de versiones: de Java 8 al modelo de release actual

### 2.1 Hitos que vale la pena conocer

| Año | Versión | Por qué importa |
|---|---|---|
| 1995 | Java 1.0 | Lanzamiento original de Sun Microsystems, con el lema "write once, run anywhere" |
| 2004 | Java 5 | Generics, enums, anotaciones, autoboxing, enhanced for-loop, varargs — el salto que modernizó la sintaxis |
| 2011 | Java 7 | try-with-resources, multi-catch, diamond operator (`<>`), switch sobre `String` |
| **2014** | **Java 8** | **El cambio más grande de la historia del lenguaje**: lambdas, Streams, `Optional`, nuevo API de fecha/hora (`java.time`), interfaces con métodos `default`/`static` |
| 2017 | Java 9 | Sistema de módulos (JPMS / Project Jigsaw), `jshell` |
| 2018 | Java 10 | Inferencia de tipo local (`var`) |
| **2018** | **Java 11 (LTS)** | Primera LTS tras el cambio de modelo de release; `HttpClient` estándar, ejecutar `.java` sin compilar explícitamente |
| 2020-2021 | Java 14-16 | Records, pattern matching para `instanceof`, sealed classes, text blocks (todos primero como *preview features*) |
| **2021** | **Java 17 (LTS)** | Records, sealed classes y pattern matching para `instanceof` ya **estables**; nueva licencia de Oracle JDK |
| 2022-2023 | Java 18-20 | Pattern matching para `switch` (preview), virtual threads (preview), record patterns (preview) |
| **2023** | **Java 21 (LTS)** | **Virtual threads estables** (Project Loom), pattern matching completo para `switch`, sequenced collections |

### 2.2 El cambio de modelo de release (2017 en adelante)

Antes de 2017, Java lanzaba una versión mayor cada 2-3 **años**, con features acumuladas y a veces retrasadas (Java 8 se retrasó por las lambdas). Desde Java 9, Oracle adoptó un **ciclo de 6 meses**: una versión nueva cada marzo y septiembre, con **features que salen cuando están listas** en vez de esperarse todas juntas.

Para no obligar a todos a actualizar cada 6 meses, se marcan versiones específicas como **LTS (Long-Term Support)**: reciben parches de seguridad por años. Las LTS son **8, 11, 17, 21** (y en adelante, cada 2 años: 25, etc.). En la práctica empresarial, casi todo el mundo vive en una LTS — por eso esta guía organiza la sección de "novedades" alrededor de 8 → 11 → 17 → 21 en vez de listar las 13 versiones intermedias.

**Dato de entrevista/certificación:** las versiones **no-LTS** (9, 10, 12, 13, ...) solo reciben soporte hasta que sale la siguiente versión (6 meses) — no están pensadas para producción de largo plazo, sino para probar features nuevas antes de que se consoliden en la siguiente LTS.

---

## 3. La JVM por dentro: bytecode, class loading, JIT y áreas de memoria

Entender esto es la base para razonar sobre rendimiento, memoria y hasta el comportamiento de `String`/autoboxing más adelante.

### 3.1 De `.java` a ejecución: el pipeline completo

```
MiClase.java --(javac)--> MiClase.class (bytecode)
                                │
                                ▼
                     ┌─────────────────────┐
                     │   JVM (en ejecución)  │
                     │                       │
   1. Class Loader ──┤  carga, enlaza (link) │
                     │  e inicializa clases   │
                     │                       │
   2. Execution     ─┤  intérprete de bytecode│
      Engine         │  + JIT compiler        │
                     └─────────────────────┘
                                │
                                ▼
                       Código máquina nativo
```

### 3.2 Class Loading: carga, enlace (linking) e inicialización

El *Class Loader Subsystem* hace 3 cosas, en orden, la primera vez que una clase se usa:

1. **Loading (carga):** lee el `.class` (desde el classpath, un JAR, o la red) y crea el objeto `Class` correspondiente en memoria. Hay una jerarquía de class loaders: **Bootstrap** (carga `java.lang.*` y el núcleo del JDK, escrito en C++), **Platform/Extension** (carga módulos de la plataforma), **Application/System** (carga tus clases y las de tus dependencias). Cada uno delega primero al padre (*delegation model*): tu `Application ClassLoader` primero le pregunta al `Bootstrap` si ya cargó la clase, antes de intentarlo él mismo — esto evita que puedas "suplantar" `java.lang.String` con tu propia clase maliciosa del mismo nombre.
2. **Linking:** se divide en *verification* (el bytecode es válido y seguro — no hace, por ejemplo, un salto a memoria arbitraria), *preparation* (se reserva memoria para los campos `static` y se inicializan a sus valores por defecto — `0`, `null`, `false`) y *resolution* (las referencias simbólicas, ej. nombres de otras clases, se resuelven a referencias directas en memoria).
3. **Initialization:** aquí sí se ejecutan los bloques `static { ... }` y se les asigna a los campos `static` su valor real de inicialización — **en el orden en que aparecen en el código fuente**. Esto ocurre la primera vez que la clase se usa activamente (se instancia, se llama un método estático, se accede a un campo estático no-`final`-constante).

**Por qué importa:** explica por qué un `static` field con inicialización costosa (ej. abrir un archivo) no se ejecuta hasta el primer uso real de la clase (*lazy initialization* natural), y por qué el orden de bloques `static` en el código importa para el resultado final.

### 3.3 Execution Engine: intérprete + JIT

La JVM **no** ejecuta bytecode directamente como si fuera código máquina — lo interpreta instrucción por instrucción al inicio (arranque rápido, ejecución lenta). Pero el **JIT (Just-In-Time compiler)** monitorea qué métodos se ejecutan con más frecuencia ("hot methods") y los **compila a código máquina nativo** en caliente, reemplazando la interpretación por ejecución nativa para esas rutas calientes. Esto es lo que hace que un programa Java de larga duración (ej. un servidor) termine corriendo casi tan rápido como C++ en sus rutas críticas, aunque arranque más lento que un binario compilado de antemano.

- **HotSpot** (la JVM de referencia de Oracle/OpenJDK) usa 2 compiladores JIT: **C1** (compilación rápida, optimización básica — bueno para arranque) y **C2** (compilación más lenta pero con optimizaciones agresivas — bueno para código de larga ejecución). El modo por defecto (*tiered compilation*) usa C1 primero y "asciende" a C2 el código realmente caliente.
- **GraalVM** añade la posibilidad de compilar **Ahead-Of-Time (AOT)** a un binario nativo (`native-image`), sacrificando algunas optimizaciones en caliente a cambio de arranque casi instantáneo y menor footprint de memoria — muy relevante hoy para microservicios/serverless.

### 3.4 Las áreas de memoria de la JVM (mapa completo)

```
┌───────────────────────────────── JVM Memory ─────────────────────────────────┐
│                                                                                │
│   COMPARTIDAS ENTRE TODOS LOS HILOS         POR CADA HILO (thread-local)      │
│  ┌─────────────────────────────┐          ┌────────────────────────────┐     │
│  │ Heap                          │          │ JVM Stack (por hilo)         │     │
│  │  - Young Gen (Eden, S0, S1)    │          │  - frames de método           │     │
│  │  - Old Gen (Tenured)           │          │  - variables locales           │     │
│  │  (todos los objetos y arrays)  │          │  - operand stack                │     │
│  ├─────────────────────────────┤          │  - StackOverflowError si se     │     │
│  │ Metaspace                      │          │    excede                        │     │
│  │  (metadatos de clases,          │          ├────────────────────────────┤     │
│  │   antes llamado PermGen)        │          │ PC Register (por hilo)          │     │
│  ├─────────────────────────────┤          │  - dirección de la instrucción  │     │
│  │ Code Cache                      │          │    actual                        │     │
│  │  (código nativo generado        │          ├────────────────────────────┤     │
│  │   por el JIT)                    │          │ Native Method Stack (por hilo)  │     │
│  └─────────────────────────────┘          │  - para código JNI (C/C++)      │     │
│                                              └────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────────┘
```

| Área | Qué contiene | Compartida entre hilos | Error si se agota |
|---|---|---|---|
| **Heap** | Todos los objetos y arrays creados con `new` | Sí | `OutOfMemoryError: Java heap space` |
| **Stack** | Frames de método (variables locales, referencias, valores intermedios) — uno por cada hilo | No (uno por hilo) | `StackOverflowError` (ej. recursión infinita) |
| **Metaspace** | Metadatos de las clases cargadas (estructura, métodos, no instancias) — vive en memoria nativa del SO, no en el heap, desde Java 8 | Sí | `OutOfMemoryError: Metaspace` |
| **PC Register** | Puntero a la instrucción de bytecode que el hilo está ejecutando | No | — |
| **Native Method Stack** | Para llamadas a código nativo vía JNI | No | — |

**El dato de certificación/entrevista más repetido:** *un objeto siempre vive en el heap; una variable local de tipo primitivo o una referencia a un objeto vive en el stack del hilo que la declaró.* Por eso pasar un objeto "por valor" en Java realmente copia la **referencia** (que vive en el stack), no el objeto (que sigue en el heap) — de ahí el debate eterno de "Java pasa por valor o por referencia": **Java siempre pasa por valor, pero el valor de una variable de tipo referencia ES la referencia misma** (parecido a un puntero), así que modificar el **objeto apuntado** dentro de un método sí se refleja afuera, pero reasignar la variable local dentro del método no.

```java
void modificar(StringBuilder sb, int numero) {
    sb.append("cambiado");     // SÍ se refleja afuera: mismo objeto en el heap
    sb = new StringBuilder();  // NO se refleja afuera: solo reasigna la variable LOCAL (una copia de la referencia)
    numero = 99;                // NO se refleja afuera: los primitivos siempre se copian
}
```

---

## 4. Gestión de memoria y Garbage Collection

### 4.1 Generational hypothesis: por qué el heap se divide en generaciones

La observación empírica detrás de casi todos los recolectores de basura modernos: **la mayoría de los objetos mueren jóvenes** (variables locales temporales, objetos de una sola petición HTTP, etc.). Por eso el heap se divide:

- **Young Generation**: donde nacen todos los objetos nuevos. Se subdivide en **Eden** (donde se crean) y dos espacios **Survivor** (`S0`/`S1`), usados para ir "envejeciendo" a los objetos que sobreviven varias recolecciones menores.
- **Old Generation (Tenured)**: objetos que han sobrevivido suficientes ciclos de recolección en la generación joven se **promueven** aquí. Se recolecta con menos frecuencia, pero cada recolección es más costosa (hay más objetos vivos y de mayor tamaño que revisar).

```
Objeto nuevo → Eden → (sobrevive un GC menor) → S0/S1 → (sobrevive varios) → Old Gen
```

- **Minor GC**: limpia solo la Young Generation. Frecuente y rápido.
- **Major/Full GC**: limpia la Old Generation (y típicamente toda la heap). Infrecuente pero costoso — es la causa #1 de "pausas" (*stop-the-world*) perceptibles en aplicaciones Java.

### 4.2 Algoritmos de recolección — evolución y trade-offs

| Recolector | Estrategia | Pausas | Cuándo usarlo |
|---|---|---|---|
| **Serial GC** | Un solo hilo, para todo el mundo (*stop-the-world*) durante la recolección | Largas | Aplicaciones pequeñas de un solo núcleo, o contenedores con recursos muy limitados |
| **Parallel GC** ("throughput collector") | Varios hilos recolectando en paralelo, pero sigue deteniendo la aplicación | Medianas, pero mayor throughput total | Procesamiento batch donde importa más el rendimiento total que la latencia |
| **G1 (Garbage-First)** | Divide el heap en regiones pequeñas; recolecta primero las regiones con más basura ("garbage first"); **default desde Java 9** | Cortas y predecibles (configurable con `-XX:MaxGCPauseMillis`) | El default razonable para la mayoría de aplicaciones de propósito general hoy en día |
| **ZGC** (Java 11+, producción desde 15) | Concurrente casi por completo, usando *colored pointers* y *load barriers* | Sub-milisegundo, casi independiente del tamaño del heap | Heaps enormes (cientos de GB) donde la latencia es crítica |
| **Shenandoah** (Red Hat/OpenJDK, producción desde 12/15 según distro) | Similar a ZGC: compactación concurrente | Muy bajas, independientes del tamaño del heap | Alternativa a ZGC, mismo caso de uso |

**Idea clave para la entrevista:** el Garbage Collector determina que un objeto es basura por **alcanzabilidad (reachability)**, no por conteo de referencias: si no hay ningún camino de referencias vivas desde un *GC root* (variables locales activas en algún stack, campos `static`, etc.) hasta el objeto, es candidato a recolección — **incluso si dos objetos se referencian mutuamente entre sí pero nada más los referencia**, ambos son basura (a diferencia de un recolector de conteo de referencias ingenuo, que fallaría con ciclos).

### 4.3 Tipos de referencias (`java.lang.ref`) — para casos avanzados (cachés, listeners)

| Tipo | Comportamiento | Caso de uso |
|---|---|---|
| **Strong reference** | La normal (`Object o = new Object();`). Mientras exista, el GC nunca recolecta el objeto. | El 99.9% del código |
| **SoftReference** | El GC la recolecta solo si hace falta memoria (justo antes de un `OutOfMemoryError`) | Cachés que quieres que sobrevivan mientras haya memoria disponible |
| **WeakReference** | El GC la recolecta en el **próximo ciclo**, sin importar si hay memoria disponible o no | `WeakHashMap`, evitar memory leaks en listeners/cachés de metadatos |
| **PhantomReference** | Nunca se puede acceder al objeto a través de ella; solo sirve para que te avisen (vía `ReferenceQueue`) DESPUÉS de que el objeto fue finalizado | Limpieza de recursos nativos, reemplazo moderno de `finalize()` |

### 4.4 `finalize()` está deprecado — usa `try-with-resources` / `Cleaner`

El método `finalize()` (heredado de `Object`) fue el mecanismo original para liberar recursos antes de la recolección, pero es **impredecible** (no garantiza cuándo, ni si quiera si, se ejecuta) y está deprecado desde Java 9. La alternativa moderna es `AutoCloseable` + `try-with-resources` (determinístico, ver sección 16) o `java.lang.ref.Cleaner` para casos donde de verdad necesitas engancharte a la recolección.

### 4.5 El Heap a fondo: tuning con flags de la JVM

En desarrollo casi nunca tocas los parámetros del heap — la JVM elige valores por defecto razonables según la memoria de la máquina/contenedor. En producción, entender estos flags es la diferencia entre una aplicación que responde de forma predecible y una que sufre pausas erráticas:

| Flag | Qué controla |
|---|---|
| `-Xms<tamaño>` | Tamaño **inicial** del heap (ej. `-Xms512m`) |
| `-Xmx<tamaño>` | Tamaño **máximo** del heap (ej. `-Xmx2g`) |
| `-Xmn<tamaño>` / `-XX:NewRatio=N` | Tamaño de la Young Generation, directo o como proporción respecto a la Old Gen |
| `-XX:SurvivorRatio=N` | Proporción entre Eden y cada espacio Survivor |
| `-XX:+UseG1GC` / `-XX:+UseZGC` | Selecciona el recolector (sección 4.2) |
| `-XX:MaxGCPauseMillis=N` | Objetivo (no garantía absoluta) de pausa máxima para G1/ZGC |
| `-XX:MetaspaceSize` / `-XX:MaxMetaspaceSize` | Tamaño inicial/máximo del Metaspace (por defecto, casi sin límite — puede ser buena idea acotarlo en producción) |

**La recomendación más importante en producción:** fija `-Xms` igual a `-Xmx` (`-Xms2g -Xmx2g`). Si los dejas distintos, la JVM **redimensiona el heap dinámicamente** conforme crece la demanda — cada redimensionamiento es una pausa adicional, y en contenedores puede provocar que el heap "respire" de forma impredecible contra el límite de memoria del contenedor.

**JVMs conscientes de contenedores (desde Java 10, retro-portado a 8u191+):** antes de esto, la JVM leía la memoria **total del host**, no el límite del contenedor Docker/Kubernetes — un contenedor con límite de 512MB en un host de 64GB terminaba con un `-Xmx` calculado sobre 64GB, causando `OOMKilled` por el orquestador. Hoy `-XX:+UseContainerSupport` (activado por defecto) hace que la JVM respete los `cgroups` del contenedor automáticamente.

### 4.6 El Stack a fondo: anatomía de un stack frame

Cada llamada a un método empuja un **frame** nuevo al stack del hilo que lo ejecuta. Un frame contiene:

- **Local variable array**: las variables locales y parámetros del método (incluida la referencia `this` si no es estático), indexados por posición, no por nombre (el nombre es solo metadata de depuración).
- **Operand stack**: una pila auxiliar donde el bytecode empuja/saca valores intermedios para evaluar expresiones (ej. al calcular `a + b * c`, los operandos se apilan aquí paso a paso).
- **Referencia al *constant pool*** de la clase, para resolver constantes/referencias simbólicas.

```java
int sumarYMultiplicar(int a, int b, int c) {
    return a + b * c;   // el bytecode empuja b y c al operand stack, multiplica, empuja a, suma
}
```

**`-Xss<tamaño>`** controla el tamaño del stack **por hilo** (por defecto ~512KB-1MB, según SO/arquitectura). El trade-off es directo: un stack más grande permite más profundidad de recursión antes de `StackOverflowError`, pero con **platform threads** (no virtuales), cada hilo reserva ese espacio — con miles de hilos, la memoria total reservada para stacks puede volverse significativa (`1000 hilos × 1MB = 1GB` solo en stacks, incluso si la mayoría casi no se usa).

**Java no hace *tail-call optimization*** (a diferencia de Scala/Kotlin en ciertos casos, o de Scheme por especificación): una función recursiva, aunque esté escrita en "forma de cola" (el `return` es directamente la llamada recursiva, sin nada pendiente después), **sigue consumiendo un frame por cada llamada**. Esto significa que convertir recursión profunda a un bucle iterativo (o a una pila explícita en el heap) es, en Java, la única forma segura de evitar `StackOverflowError` en algoritmos con muchísima profundidad (ej. recorrer un árbol muy desbalanceado).

```java
// Recursivo "de cola" -- en Java esto SIGUE arriesgando StackOverflowError con n grande, NO se optimiza
long factorialRecursivo(long n, long acumulador) {
    if (n <= 1) return acumulador;
    return factorialRecursivo(n - 1, n * acumulador);   // Java no colapsa este frame
}

// Iterativo -- O(1) en uso de stack, sin importar qué tan grande sea n
long factorialIterativo(long n) {
    long acumulador = 1;
    for (long i = n; i > 1; i--) acumulador *= i;
    return acumulador;
}
```

**Nota de conexión con virtual threads (secciones 11.1/17.8):** los stacks de los virtual threads **no** son bloques fijos preasignados de ~1MB — viven parcialmente en el heap y crecen/encogen bajo demanda, lo que es una de las razones por las que se pueden crear millones de ellos sin agotar memoria, algo impensable con platform threads tradicionales.

### 4.7 Escape analysis: cuando la JVM decide NO usar el heap

El JIT (sección 3.3) puede probar, para ciertos objetos, que **nunca "escapan"** del método donde se crean (no se guardan en un campo, no se devuelven, no se pasan a otro hilo). Cuando eso ocurre, HotSpot puede aplicar **scalar replacement**: en vez de alojar el objeto en el heap, descompone sus campos y los trata como si fueran variables locales normales (potencialmente en registros de CPU), **sin ninguna asignación real en el heap** y, por lo tanto, sin ningún costo de recolección de basura después.

```java
double calcularDistancia(int x1, int y1, int x2, int y2) {
    record Punto(int x, int y) {}       // creado y usado SOLO dentro de este método
    Punto p1 = new Punto(x1, y1);         // candidato perfecto para escape analysis:
    Punto p2 = new Punto(x2, y2);         // nunca "escapan" del método -> el JIT puede
    return Math.hypot(p2.x() - p1.x(), p2.y() - p1.y());  // evitar alojarlos en el heap por completo
}
```

**Por qué importa saber esto (más allá de la curiosidad):** explica por qué "crear muchos objetos pequeños de corta vida en un método" **no siempre** es tan costoso como la intuición ingenua sugiere — el JIT puede eliminar el costo por completo en rutas calientes. También explica por qué `synchronized` sobre un objeto que el JIT prueba que **ningún otro hilo puede ver** puede eliminarse en tiempo de ejecución (*lock elision*) sin cambiar el comportamiento observable. Esto **no es algo que debas programar buscando activamente** — es una optimización automática del JIT — pero conocerla evita conclusiones erróneas al hacer benchmarks ingenuos ("por qué mi micro-benchmark de asignación de objetos no muestra ningún costo de GC").

### 4.8 Fugas de memoria en Java — sí existen, a pesar del GC

Un *memory leak* en un lenguaje con GC no es "olvidar liberar memoria" (eso no existe en Java) — es mantener **referencias fuertes** vivas más tiempo del necesario, de forma que el GC nunca puede recolectar objetos que, lógicamente, ya deberían estar muertos. Los patrones más comunes en código real:

**1. Colecciones `static` que solo crecen:**
```java
class Cache {
    static final Map<String, Object> DATOS = new HashMap<>();   // static = vive TODA la vida de la aplicación
    static void agregar(String clave, Object valor) { DATOS.put(clave, valor); }   // sin eviction -> crece para siempre
}
```

Solución: usar una caché con política de expiración/tamaño máximo (`LinkedHashMap` LRU de la sección 12.4, Caffeine, o `SoftReference`/`WeakReference` de la sección 4.3 según el caso).

**2. Listeners/observadores nunca desuscritos:**
```java
publicador.suscribir(observador);   // el Publicador ahora mantiene una referencia fuerte al observador
// si "observador" debería morir después (ej. es un componente de UI cerrado), pero nunca se llama
// publicador.desuscribir(observador), el Publicador lo mantiene vivo para siempre -- leak clásico.
```

**3. `ThreadLocal` no limpiado en pools de hilos (uno de los leaks más insidiosos en apps de servidor):**
```java
static final ThreadLocal<UsuarioActual> CONTEXTO = new ThreadLocal<>();

void manejarPeticion(UsuarioActual usuario) {
    CONTEXTO.set(usuario);
    // ... procesar la petición ...
    // si OLVIDAS CONTEXTO.remove() aquí, y este código corre en un hilo de un POOL reutilizable
    // (ExecutorService, servidor de aplicaciones), el hilo SIGUE VIVO después de esta petición
    // y su ThreadLocal retiene "usuario" indefinidamente -- memoria que crece con cada usuario distinto
    // que alguna vez pasó por ese hilo, y datos de un usuario "filtrándose" a la siguiente petición.
    CONTEXTO.remove();   // OBLIGATORIO en un finally, exactamente como cerrar un recurso
}
```

**4. Clases internas no-estáticas y lambdas que capturan `this`:**
```java
class ActividadAndroid {   // ejemplo clásico también fuera de Android, con cualquier objeto "pesado"
    Runnable tareaDiferida = () -> System.out.println("hola");   // si esta lambda NO usa ningún campo de
                                                                    // la clase externa, no captura "this" -- OK
    Runnable otraTarea = () -> System.out.println(this.toString());  // SÍ captura "this" implícitamente
    // Si "otraTarea" se guarda en algo de larga vida (un Timer, un listener global),
    // TODA la instancia de ActividadAndroid queda viva mientras esa referencia exista,
    // aunque la actividad "debería" haber terminado hace rato.
}
```

**Regla práctica general:** cualquier vez que un objeto de **larga vida** (`static`, un singleton, un pool de hilos) mantenga una referencia a un objeto que **debería** ser de **corta vida**, tienes un candidato a leak. El GC es excelente resolviendo el problema de "¿cuándo es seguro liberar esto?" — pero no puede adivinar que, lógicamente, una referencia que sigue siendo alcanzable ya no debería estarlo.

### 4.9 Herramientas de diagnóstico: cómo se ve un leak/problema de memoria en la práctica

| Herramienta | Para qué sirve |
|---|---|
| `jps` | Lista los procesos JVM corriendo en la máquina, con su PID |
| `jstat -gc <pid>` | Estadísticas de GC en vivo (tamaño de cada generación, número de recolecciones, tiempo total en GC) |
| `jmap -dump:live,format=b,file=heap.hprof <pid>` | Genera un *heap dump*: una foto completa de todos los objetos vivos en el heap |
| `jstack <pid>` | *Thread dump*: el estado de todos los hilos — esencial para diagnosticar deadlocks o hilos colgados |
| `jcmd <pid> <comando>` | Herramienta moderna "todo en uno" que reemplaza gran parte de las anteriores |
| **JFR** (Java Flight Recorder) | Profiler continuo de bajísimo overhead, **incluido gratis en el JDK desde Java 11** — graba eventos de GC, asignación de objetos, hilos, I/O, en producción, sin apenas impacto de rendimiento |
| **JDK Mission Control (JMC)** | La herramienta gráfica para analizar grabaciones de JFR |
| **Eclipse MAT** (Memory Analyzer Tool) | Analiza un heap dump (`.hprof`) y encuentra automáticamente los "dominadores" (qué objeto retiene más memoria) y sospechosos de leak |

```bash
# Grabar 60 segundos de actividad con JFR sin reiniciar la aplicación:
jcmd <pid> JFR.start duration=60s filename=recording.jfr

# Generar un heap dump para analizar en Eclipse MAT:
jcmd <pid> GC.heap_dump heap.hprof
```

### 4.10 Optimización práctica: el costo real de un objeto, boxing y dimensionamiento de colecciones

**Cada objeto tiene overhead de por sí, independiente de sus campos:** en HotSpot de 64 bits (con *compressed oops*, el default para heaps menores a ~32GB), cada objeto lleva una cabecera de 12 bytes (mark word + puntero comprimido a su clase) más padding para alinear a múltiplos de 8 bytes. Esto significa que un `Integer` (objeto) para guardar un solo `int` de 4 bytes en realidad ocupa **16 bytes** — 4 veces más que el primitivo equivalente. En una colección con un millón de `Integer` autoboxeados, esa diferencia es real memoria y real presión sobre el GC.

```java
// Costoso: un millón de objetos Integer en el heap, con toda su cabecera de objeto
List<Integer> numeros = new ArrayList<>();
for (int i = 0; i < 1_000_000; i++) numeros.add(i);   // autoboxing en cada add()

// Más eficiente para cálculo numérico intensivo: streams primitivos especializados, SIN boxing
int suma = IntStream.range(0, 1_000_000).sum();   // IntStream, no Stream<Integer> -- sin cabecera de objeto por elemento
```

**Dimensiona la capacidad inicial de tus colecciones cuando conozcas (aunque sea aproximadamente) el tamaño final** — evita realojamientos/rehashes intermedios costosos:

```java
// Sin dimensionar: ArrayList empieza con capacidad 10 y va DUPLICANDO (creando un array nuevo y copiando) cada vez que se llena
List<String> lista = new ArrayList<>();

// Dimensionado: UNA sola asignación de array, sin realojamientos intermedios
List<String> lista2 = new ArrayList<>(10_000);

// Para HashMap, recuerda que el resize ocurre al superar loadFactor * capacidad (0.75 por defecto) --
// dimensiona considerando ese factor para evitar un rehash a mitad de carga:
Map<String, Object> mapa = new HashMap<>((int) (10_000 / 0.75) + 1);
```

**Regla de oro final de esta sección:** nunca micro-optimices por intuición — mide con [JMH](https://github.com/openjdk/jmh) (Java Microbenchmark Harness), la herramienta estándar para benchmarks confiables en la JVM (que evita trampas comunes como que el JIT elimine código "muerto" que en realidad quieres medir). La mayoría de las optimizaciones de esta sección importan solo en rutas realmente calientes — aplicarlas a ciegas en código que no es un cuello de botella real solo agrega complejidad sin beneficio medible.

---

## 5. Tipos de datos, conversiones y formateo

### 5.1 Primitivos vs. tipos referencia

Java tiene **8 tipos primitivos**, que viven directamente en el stack (o inline dentro de un objeto en el heap si son campos de instancia) — no son objetos, no tienen métodos, no pueden ser `null`:

| Tipo | Tamaño | Rango | Valor por defecto |
|---|---|---|---|
| `byte` | 8 bits | -128 a 127 | `0` |
| `short` | 16 bits | -32,768 a 32,767 | `0` |
| `int` | 32 bits | ≈ -2.1×10⁹ a 2.1×10⁹ | `0` |
| `long` | 64 bits | ≈ ±9.2×10¹⁸ | `0L` |
| `float` | 32 bits (IEEE 754) | precisión ~7 dígitos decimales | `0.0f` |
| `double` | 64 bits (IEEE 754) | precisión ~15-16 dígitos decimales | `0.0d` |
| `char` | 16 bits (UTF-16, sin signo) | 0 a 65,535 | `' '` |
| `boolean` | JVM-dependiente (no especificado, típicamente 1 bit lógico) | `true`/`false` | `false` |

Cada primitivo tiene su **wrapper class** (`Integer`, `Long`, `Double`, `Character`, `Boolean`, etc.) que sí es un objeto, vive en el heap, puede ser `null`, y provee métodos utilitarios (`Integer.parseInt`, `Integer.MAX_VALUE`, etc.).

### 5.2 Autoboxing/unboxing — y su trampa más famosa

Desde Java 5, la conversión entre primitivo y wrapper es automática:

```java
Integer boxed = 10;        // autoboxing: int -> Integer, internamente Integer.valueOf(10)
int unboxed = boxed;       // unboxing: Integer -> int, internamente boxed.intValue()
```

**La trampa de certificación #1 de todo Java:** `Integer` (y `Short`, `Byte`, `Long`, `Character`, `Boolean`) **cachean** las instancias para valores pequeños. `Integer.valueOf(n)` reutiliza un objeto cacheado para `n` entre **-128 y 127**; fuera de ese rango, crea un objeto nuevo cada vez.

```java
Integer a = 100;
Integer b = 100;
System.out.println(a == b);   // true  -> ambos vienen del cache (-128..127)

Integer c = 200;
Integer d = 200;
System.out.println(c == d);   // false -> fuera del cache, son dos objetos DISTINTOS

System.out.println(c.equals(d));  // true -> equals() SIEMPRE compara el valor, no la identidad
```

**Regla práctica que evita el 100% de estos bugs:** nunca uses `==` para comparar wrappers (ni objetos en general, salvo que quieras comparar identidad a propósito) — usa siempre `.equals()`. Y ten cuidado con el **NullPointerException silencioso** del unboxing:

```java
Integer valor = null;
int primitivo = valor;   // NullPointerException al hacer unboxing de null
```

### 5.3 Conversiones (casting) — implícitas vs explícitas, y pérdida de datos

**Widening (ensanchamiento)** — implícito, nunca pierde datos (salvo precisión en el caso de long→float/double):
```java
int i = 100;
long l = i;      // int -> long: automático
double d = l;    // long -> double: automático
```

**Narrowing (estrechamiento)** — requiere cast explícito, **puede perder datos silenciosamente**:
```java
double d = 3.99;
int i = (int) d;          // 3 -> trunca, NO redondea

int grande = 300;
byte b = (byte) grande;    // 44 -> overflow: 300 no cabe en un byte (rango -128..127), "da la vuelta"
```

**Por qué 300 se vuelve 44:** el cast a `byte` simplemente **descarta los bits más significativos** y se queda con los 8 bits menos significativos. `300` en binario es `100101100`; al quedarnos solo con los últimos 8 bits (`00101100` = 44), ese es el resultado. Este comportamiento ("wraparound") es una fuente clásica de bugs sutiles y de preguntas de certificación.

### 5.4 Aritmética de enteros: overflow silencioso

A diferencia de otros lenguajes, Java **no lanza excepción** en overflow de enteros — simplemente da la vuelta (comportamiento *modular*, complemento a 2):

```java
int maximo = Integer.MAX_VALUE;   // 2147483647
System.out.println(maximo + 1);   // -2147483648 (¡se vuelve negativo, sin ningún error!)
```

Para detectar esto explícitamente, usa los métodos `Math.addExact`, `Math.multiplyExact`, etc. (desde Java 8), que lanzan `ArithmeticException` en overflow en vez de fallar silenciosamente.

### 5.5 Punto flotante: por qué `0.1 + 0.2 != 0.3`

`float`/`double` usan representación binaria IEEE 754, que **no puede representar exactamente** la mayoría de las fracciones decimales (igual que `1/3` no tiene representación decimal finita).

```java
System.out.println(0.1 + 0.2);              // 0.30000000000000004
System.out.println(0.1 + 0.2 == 0.3);        // false
```

**Regla práctica:** nunca uses `float`/`double` para dinero o cualquier cálculo que requiera precisión decimal exacta — usa `BigDecimal`:

```java
BigDecimal a = new BigDecimal("0.1");   // SIEMPRE construir BigDecimal desde String, no desde double
BigDecimal b = new BigDecimal("0.2");
System.out.println(a.add(b));            // 0.3 exacto

// Trampa: esto NO arregla nada, ya perdiste precisión antes de llegar a BigDecimal:
BigDecimal malo = new BigDecimal(0.1);    // 0.1000000000000000055511151231257827021181583404541015625
```

### 5.6 `String`: inmutabilidad, el String Pool, y por qué importa

`String` es **inmutable**: una vez creado, su contenido nunca cambia — cualquier operación que "modifica" un String (`concat`, `toUpperCase`, `replace`, ...) en realidad **devuelve un `String` nuevo**.

```java
String s = "hola";
s.toUpperCase();          // devuelve "HOLA" pero NO modifica `s`
System.out.println(s);    // sigue imprimiendo "hola"
s = s.toUpperCase();      // ahora sí, `s` apunta al String nuevo
```

**El String Pool:** los literales de `String` (`"hola"`) se almacenan en un pool especial dentro del heap (desde Java 7; antes vivía en PermGen), y se **reutilizan** — dos literales con el mismo contenido apuntan al mismo objeto:

```java
String a = "hola";
String b = "hola";
System.out.println(a == b);           // true: mismo objeto del pool

String c = new String("hola");
System.out.println(a == c);           // false: new String() SIEMPRE crea un objeto nuevo, fuera del pool
System.out.println(a.equals(c));      // true: mismo contenido

String d = c.intern();                // fuerza a buscar/agregar al pool y devuelve la referencia del pool
System.out.println(a == d);           // true
```

**Por qué `String` es inmutable — 3 razones que sí se preguntan en entrevistas:**
1. **Seguridad del String Pool**: si `String` fuera mutable, modificar un literal afectaría a TODAS las otras variables que apuntan al mismo objeto del pool.
2. **Thread-safety gratis**: un objeto inmutable se puede compartir entre hilos sin sincronización — nunca cambia, nunca hay condición de carrera sobre él.
3. **Seguridad general**: `String` se usa para nombres de clase, contraseñas en tránsito, URLs, credenciales de conexión — si fuera mutable, código que ya validó un valor podría verlo cambiar después "por debajo" a través de otra referencia.

**`StringBuilder` / `StringBuffer`: la versión mutable, para construir strings en un bucle:**

```java
// MAL: en un bucle, esto crea un String nuevo en cada iteración -> O(n²)
String resultado = "";
for (int i = 0; i < 1000; i++) {
    resultado += i;   // cada += crea un StringBuilder temporal internamente, ¡en cada vuelta!
}

// BIEN: un solo buffer mutable, O(n)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String resultado2 = sb.toString();
```

`StringBuffer` es la versión sincronizada (thread-safe, más lenta) de `StringBuilder`; en código de un solo hilo, siempre usa `StringBuilder`.

### 5.7 Formateo de datos

**Ejemplo 1 — `String.format` / `printf` (estilo C):**
```java
String s = String.format("Nombre: %s, Edad: %d, Salario: %.2f", "Ana", 30, 4500.5);
// "Nombre: Ana, Edad: 30, Salario: 4500.50"
System.out.printf("%-10s|%5d%n", "código", 42);   // "-" alinea a la izquierda, 5 = ancho mínimo
```

**Ejemplo 2 — `DecimalFormat` para control fino de números:**
```java
DecimalFormat df = new DecimalFormat("#,##0.00");
System.out.println(df.format(1234567.5));   // "1,234,567.50"
```

**Ejemplo 3 — formateo de fechas con `DateTimeFormatter` (API moderna, ver 8.4):**
```java
LocalDate fecha = LocalDate.of(2026, 7, 17);
DateTimeFormatter formato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
System.out.println(fecha.format(formato));   // "17/07/2026"
```

**Ejemplo 4 — `NumberFormat` sensible al idioma/región (locale):**
```java
NumberFormat moneda = NumberFormat.getCurrencyInstance(Locale.of("es", "MX"));
System.out.println(moneda.format(1234.5));   // "$1,234.50" (formato de México)
```

---

## 6. Clases, interfaces y el modelo de objetos

### 6.1 Clase concreta vs. clase abstracta vs. interfaz — la tabla que resuelve el 90% de las dudas

| Aspecto | Clase concreta | Clase abstracta | Interfaz |
|---|---|---|---|
| ¿Se puede instanciar? | Sí | No (`new` da error de compilación) | No |
| ¿Puede tener estado (campos de instancia)? | Sí | Sí | No (solo constantes `public static final` implícitas) |
| ¿Puede tener constructor? | Sí | Sí (lo usan las subclases vía `super()`) | No |
| ¿Métodos con cuerpo? | Sí | Sí (mezclados con abstractos) | Sí, desde Java 8: `default` y `static`; desde Java 9: `private` |
| ¿Herencia múltiple? | No (una sola superclase) | No (una sola superclase abstracta) | **Sí** (una clase puede implementar varias interfaces) |
| ¿Modificadores de acceso en miembros? | Cualquiera | Cualquiera | Implícitamente `public` (métodos abstractos/default/static); `private` solo para helpers internos |

**Cuándo usar cada una — la pregunta de diseño real, no solo sintáctica:**

- **Interfaz**: define un **contrato** ("qué puede hacer algo"), sin importar su implementación ni su jerarquía. Úsala cuando quieras que clases *no relacionadas* compartan capacidades (`Comparable`, `Runnable`, `Serializable`). Favorece el desacoplamiento: "programa contra la interfaz, no la implementación".
- **Clase abstracta**: define una **relación "es-un"** con estado y comportamiento parcialmente compartido. Úsala cuando varias subclases comparten campos y lógica común, y solo difieren en partes específicas (patrón *Template Method*, ver sección 15).
- **Clase concreta**: la implementación final, instanciable.

```java
interface Volador {                 // contrato: "puede volar"
    void volar();
}

abstract class Ave {                // relación es-un, con estado compartido
    protected String nombre;
    Ave(String nombre) { this.nombre = nombre; }
    abstract String sonido();       // cada subclase lo implementa distinto
    void presentarse() {             // comportamiento compartido, ya implementado
        System.out.println(nombre + " dice " + sonido());
    }
}

class Pinguino extends Ave {        // NO implementa Volador: los pingüinos no vuelan
    Pinguino() { super("Pingüino"); }
    String sonido() { return "cuac"; }
}

class Aguila extends Ave implements Volador {   // SÍ vuela, y también ES un Ave
    Aguila() { super("Águila"); }
    String sonido() { return "screech"; }
    public void volar() { System.out.println(nombre + " vuela alto"); }
}
```

### 6.2 Interfaces desde Java 8+: `default`, `static` y `private`

Antes de Java 8, una interfaz solo podía declarar métodos abstractos — agregar un método nuevo a una interfaz rompía **todas** las clases que la implementaban. Los métodos `default` resolvieron esto:

```java
interface Descuento {
    double aplicar(double precio);

    default double aplicarConIva(double precio) {   // método con cuerpo, "gratis" para quien implemente
        return aplicar(precio) * 1.16;
    }

    static Descuento sinDescuento() {                // método estático de fábrica
        return precio -> precio;                      // implementación vía lambda
    }

    private double log(double valor) {                // desde Java 9: helper privado, reutilizable
        System.out.println("Calculando sobre " + valor);
        return valor;
    }
}
```

**Diamond problem con `default` methods:** si una clase implementa 2 interfaces que declaran el **mismo** método `default`, hay ambigüedad y el compilador **obliga** a resolverla explícitamente:

```java
interface A { default String saludo() { return "Hola desde A"; } }
interface B { default String saludo() { return "Hola desde B"; } }

class C implements A, B {
    @Override
    public String saludo() {
        return A.super.saludo() + " y " + B.super.saludo();  // sintaxis explícita obligatoria
    }
}
```

### 6.3 Ocultamiento (hiding) vs. sobrescritura (overriding) — trampa clásica de certificación

Esta es, probablemente, **la** distinción más preguntada en exámenes tipo OCP: los métodos de **instancia** se sobrescriben con *binding dinámico* (se decide en tiempo de ejecución, según el tipo real del objeto); los campos y métodos **`static`** se **ocultan**, con *binding estático* (se decide en tiempo de compilación, según el tipo de la referencia).

```java
class Padre {
    static String tipo = "Padre-estatico";
    String nombre = "Padre-instancia";

    static String metodoEstatico() { return "estático de Padre"; }
    String metodoInstancia() { return "instancia de Padre"; }
}

class Hijo extends Padre {
    static String tipo = "Hijo-estatico";      // OCULTA (hides) el campo de Padre
    String nombre = "Hijo-instancia";           // OCULTA el campo de Padre

    static String metodoEstatico() { return "estático de Hijo"; }   // OCULTA
    @Override
    String metodoInstancia() { return "instancia de Hijo"; }        // SOBRESCRIBE (overrides)
}

Padre p = new Hijo();
System.out.println(p.tipo);              // "Padre-estatico"  <- se decide por el TIPO DE LA REFERENCIA (Padre)
System.out.println(p.nombre);             // "Padre-instancia" <- ¡los CAMPOS nunca son polimórficos!
System.out.println(p.metodoEstatico());   // "estático de Padre" <- por el tipo de la referencia
System.out.println(p.metodoInstancia());  // "instancia de Hijo"  <- por el TIPO REAL DEL OBJETO (polimorfismo real)
```

**La conclusión que hay que memorizar:** **solo los métodos de instancia no-`static`, no-`private`, no-`final` participan en polimorfismo real (dynamic dispatch)**. Los campos, los métodos `static`, y cualquier acceso resuelto en tiempo de compilación, se resuelven según el **tipo declarado de la referencia**, no el tipo real del objeto.

### 6.4 `equals()`, `hashCode()` y el contrato que hay que respetar

Si sobrescribes `equals()`, **debes** sobrescribir `hashCode()` de forma consistente — de lo contrario, tu objeto se comporta de forma inconsistente dentro de un `HashMap`/`HashSet` (ver sección 12).

**El contrato de `equals()`:** reflexivo (`a.equals(a)`), simétrico (`a.equals(b) == b.equals(a)`), transitivo, consistente, y `a.equals(null)` siempre `false`.

**El contrato de `hashCode()`:** si `a.equals(b)` es `true`, entonces **obligatoriamente** `a.hashCode() == b.hashCode()`. Lo inverso NO se exige (dos objetos distintos pueden compartir hash — eso es una "colisión", manejada internamente por la tabla hash).

```java
class Punto {
    final int x, y;
    Punto(int x, int y) { this.x = x; this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Punto p)) return false;   // pattern matching instanceof, Java 16+ (ver sección 10)
        return x == p.x && y == p.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);   // combina los hashes de forma consistente con equals()
    }
}
```

**Error clásico:** sobrescribir solo `equals()` y olvidar `hashCode()` (o al revés). El resultado: `Set<Punto> set = new HashSet<>(); set.add(new Punto(1,2)); set.contains(new Punto(1,2))` puede devolver `false` porque el objeto termina en un "bucket" distinto de la tabla hash aunque `equals()` diría que son iguales.

---

## 7. Modificadores de acceso, encapsulación, paquetes y módulos

### 7.1 Los 4 niveles de acceso

| Modificador | Misma clase | Mismo paquete | Subclase (otro paquete) | Cualquier lugar |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| *(default, sin modificador)* | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

**Nota sutil sobre `protected`:** el acceso desde una subclase en otro paquete **solo aplica a través de una referencia de tipo `this`/la propia subclase**, no a través de una instancia arbitraria del padre:

```java
package base;
public class Animal {
    protected void sonido() { System.out.println("..."); }
}

package derivado;
public class Perro extends Animal {
    void ladrar() {
        this.sonido();                  // OK: acceso vía `this`/herencia
        new Animal().sonido();          // ERROR de compilación: no es acceso vía herencia, es un Animal "ajeno"
    }
}
```

### 7.2 Encapsulación: por qué "todo `private` + getters/setters" no siempre es suficiente

La encapsulación real no es solo "poner `private` a los campos" — es **proteger los invariantes** del objeto. Un getter/setter automático sin validación no encapsula nada de verdad:

```java
// Encapsulación DE NOMBRE, sin protección real:
class CuentaMala {
    private double saldo;
    public void setSaldo(double saldo) { this.saldo = saldo; }   // permite poner saldo negativo!
    public double getSaldo() { return saldo; }
}

// Encapsulación REAL: protege el invariante "el saldo nunca es negativo"
class CuentaBuena {
    private double saldo;
    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException("El monto debe ser positivo");
        saldo += monto;
    }
    public void retirar(double monto) {
        if (monto > saldo) throw new IllegalStateException("Fondos insuficientes");
        saldo -= monto;
    }
    public double getSaldo() { return saldo; }   // sin setter público: el saldo solo cambia por reglas de negocio
}
```

### 7.3 Paquetes (`package`)

Un paquete agrupa clases relacionadas y define un namespace (evita colisiones de nombres) y controla la visibilidad por defecto (package-private). Convención: nombre de dominio invertido (`com.empresa.proyecto.modulo`).

```java
package com.miempresa.facturacion;

import java.util.List;               // import específico
import java.util.*;                   // import de todo el paquete (evitar en código de producción: menos explícito)
import static java.lang.Math.PI;      // import estático: permite usar `PI` directo, sin prefijo `Math.`
```

### 7.4 El sistema de módulos (JPMS, Java 9+) — panorama general

Antes de Java 9, la unidad de encapsulación más grande era el paquete, pero **cualquier clase `public` era accesible desde cualquier JAR en el classpath** — no había forma de decir "esta clase es pública dentro de mi librería, pero no para quien me consuma". El *Java Platform Module System* introduce el archivo `module-info.java` en la raíz del código:

```java
module com.miempresa.facturacion {
    requires java.sql;                          // dependo del módulo java.sql
    requires transitive com.miempresa.core;      // quien me use, también obtiene acceso a com.miempresa.core

    exports com.miempresa.facturacion.api;        // SOLO este paquete es visible desde fuera del módulo
    // com.miempresa.facturacion.interno NO se exporta -> encapsulación real, ni siquiera reflection puede verlo
    // salvo que se declare "opens" explícitamente:
    opens com.miempresa.facturacion.modelo to com.fasterxml.jackson.databind;  // acceso reflexivo puntual
}
```

**Por qué importa aunque tu proyecto no use módulos explícitamente:** el propio JDK está modularizado desde Java 9 (`java.base`, `java.sql`, `java.xml`, etc.), lo que permite generar runtimes a medida con `jlink` (solo empaquetas los módulos que tu app realmente usa, reduciendo drásticamente el tamaño de la imagen — muy relevante para contenedores Docker).

---

## 8. Java 8: el parteaguas (lambdas, streams, `Optional`, nuevo Date/Time)

Java 8 introdujo más cambios de fondo que cualquier otra versión — por eso el resto del ecosistema (Spring, librerías modernas) asume Java 8 como el piso mínimo.

### 8.1 Interfaces funcionales y lambdas (repaso rápido — a fondo en sección 13)

Una **interfaz funcional** es una interfaz con **exactamente un método abstracto** (puede tener varios `default`/`static`). Una lambda es, literalmente, una instancia anónima de esa interfaz:

```java
@FunctionalInterface
interface Operacion { int aplicar(int a, int b); }

Operacion suma = (a, b) -> a + b;     // lambda: implementación inline de Operacion
System.out.println(suma.aplicar(2, 3));  // 5
```

### 8.2 `Optional<T>` — modelar la ausencia de valor sin `null`

```java
Optional<String> nombre = Optional.ofNullable(obtenerNombre());   // puede ser null internamente

String resultado = nombre
    .map(String::toUpperCase)
    .orElse("SIN NOMBRE");

nombre.ifPresentOrElse(
    n -> System.out.println("Hola " + n),
    () -> System.out.println("Nombre no disponible")
);
```

**Uso correcto vs. incorrecto (muy preguntado en revisiones de código):**
- ✅ Úsalo como **tipo de retorno** de un método que puede legítimamente no tener resultado (`buscarUsuarioPorId`).
- ❌ **Nunca** lo uses como tipo de un campo de clase, ni como parámetro de método, ni dentro de una colección (`List<Optional<X>>`) — para eso ya existe `null` o, mejor, no permitir el estado ausente en primer lugar.
- ❌ Nunca llames `.get()` sin antes comprobar `.isPresent()` — es exactamente el mismo error que un `null` sin comprobar, solo que con más pasos.

### 8.3 Method references — azúcar sintáctica sobre lambdas

| Tipo | Ejemplo | Equivalente lambda |
|---|---|---|
| Método estático | `Integer::parseInt` | `s -> Integer.parseInt(s)` |
| Método de instancia sobre un objeto particular | `nombre::toUpperCase` | `() -> nombre.toUpperCase()` |
| Método de instancia sobre el primer parámetro | `String::toUpperCase` | `s -> s.toUpperCase()` |
| Constructor | `ArrayList::new` | `() -> new ArrayList<>()` |

### 8.4 El nuevo API de fecha/hora (`java.time`) — reemplaza `Date`/`Calendar`

`java.util.Date` y `Calendar` eran mutables, con zonas horarias mal diseñadas, y de meses indexados en 0 (un clásico generador de bugs). `java.time` (inspirado en Joda-Time) es **inmutable** y mucho más claro:

```java
LocalDate fecha = LocalDate.of(2026, 7, 17);              // solo fecha, sin hora ni zona
LocalTime hora = LocalTime.of(14, 30);                     // solo hora
LocalDateTime fechaHora = LocalDateTime.of(fecha, hora);   // fecha + hora, sin zona horaria
ZonedDateTime conZona = fechaHora.atZone(ZoneId.of("America/Mexico_City"));

Duration duracion = Duration.between(LocalTime.of(9,0), LocalTime.of(17,30));  // diferencia en tiempo (horas/min/seg)
Period periodo = Period.between(LocalDate.of(2020,1,1), LocalDate.now());        // diferencia en fechas (años/meses/días)

LocalDate siguienteLunes = fecha.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
```

Todas las clases son **inmutables y thread-safe** — cada operación (`plusDays`, `minusMonths`, etc.) devuelve un objeto nuevo, igual que `String`.

---

## 9. Java 9–11: módulos, `var`, y la nueva cadencia LTS

### 9.1 `var` — inferencia de tipo local (Java 10)

`var` infiere el tipo en tiempo de **compilación** a partir del valor asignado — Java sigue siendo **estáticamente tipado**, `var` no es "tipado dinámico" como en JavaScript/Python:

```java
var lista = new ArrayList<String>();   // el compilador infiere ArrayList<String>
lista.add("hola");
// lista.add(42);   // ERROR de compilación: el tipo YA quedó fijo como ArrayList<String>

var numero = 10;      // int
// var sinInicializar; // ERROR: var EXIGE inicialización inmediata, no puede inferir de la nada
```

**Restricciones:** solo para variables locales (no campos de clase, no parámetros de método salvo en lambdas desde Java 11), y no puede usarse con `null` sin un cast explícito (no hay nada de qué inferir).

**Buena práctica de estilo:** usa `var` cuando el tipo ya es obvio por el lado derecho (`var lista = new ArrayList<String>()`), pero evítalo cuando oscurece el tipo (`var resultado = procesar()` — ¿qué devuelve `procesar()`? mejor tipo explícito ahí).

### 9.2 Factory methods inmutables para colecciones (Java 9)

```java
List<String> lista = List.of("a", "b", "c");     // inmutable de verdad
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> mapa = Map.of("uno", 1, "dos", 2);

lista.add("d");   // UnsupportedOperationException: List.of() es INMUTABLE, no solo "de solo lectura por convención"
```

Distinto de `Collections.unmodifiableList(...)`, que envuelve una lista **mutable subyacente** (si alguien tiene la referencia original, sí puede modificarla, y el wrapper lo reflejaría).

### 9.3 Java 11 (LTS): novedades prácticas

```java
// Ejecutar un archivo .java directo, sin compilar explícitamente (útil para scripts):
// $ java MiScript.java

var texto = "  hola mundo  ";
texto.isBlank();          // true si está vacío o solo espacios (distinto de isEmpty())
texto.strip();             // como trim(), pero Unicode-aware (respeta espacios de otros idiomas)
texto.repeat(3);            // "  hola mundo    hola mundo    hola mundo  "
texto.lines();               // Stream<String> de las líneas de un texto multilínea

// HttpClient estándar (reemplaza a HttpURLConnection, mucho más ergonómico):
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder(URI.create("https://api.ejemplo.com")).build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
```

---

## 10. Java 17: records, sealed classes, pattern matching

### 10.1 Records — clases de datos inmutables sin boilerplate (estable desde Java 16)

Antes de records, una clase de datos simple requería escribir a mano constructor, getters, `equals`, `hashCode` y `toString` (o generarlos con Lombok/el IDE). Un `record` genera todo eso automáticamente a partir de sus componentes:

```java
record Punto(int x, int y) { }

// El compilador genera automáticamente:
// - constructor canónico: Punto(int x, int y)
// - getters con el nombre del campo (NO "getX()", sino "x()")
// - equals()/hashCode() basados en TODOS los componentes
// - toString(): "Punto[x=1, y=2]"

Punto p = new Punto(1, 2);
System.out.println(p.x());       // 1 (no getX())
System.out.println(p);           // Punto[x=1, y=2]
```

**Un record puede tener validación en el constructor (constructor compacto) y métodos adicionales:**
```java
record RangoEdad(int min, int max) {
    RangoEdad {   // constructor compacto: sin lista de parámetros, valida antes de asignar
        if (min > max) throw new IllegalArgumentException("min no puede ser mayor que max");
    }
    boolean contiene(int edad) { return edad >= min && edad <= max; }
}
```

**Limitaciones deliberadas (son parte del diseño, no un descuido):** todos los campos son `private final` (inmutables), no puede extender otra clase (implícitamente extiende `Record`), y no puede declarar campos de instancia adicionales fuera de los componentes del constructor — un record es, por diseño, un **portador de datos transparente e inmutable**, no una clase de propósito general.

### 10.2 Sealed classes — jerarquías cerradas y exhaustivas (estable desde Java 17)

Una jerarquía `sealed` restringe explícitamente **qué clases pueden extenderla/implementarla** — el compilador conoce el conjunto completo de subtipos posibles, lo que habilita pattern matching *exhaustivo* (sin necesitar un `default`):

```java
sealed interface Forma permits Circulo, Cuadrado, Triangulo { }

record Circulo(double radio) implements Forma { }
record Cuadrado(double lado) implements Forma { }
record Triangulo(double base, double altura) implements Forma { }

// Cualquier OTRA clase que intente "implements Forma" -> ERROR de compilación
```

Cada subtipo permitido debe declararse `final`, `sealed` (si a su vez restringe sus propios subtipos) o `non-sealed` (si quiere reabrir la jerarquía a extensión libre desde ahí).

### 10.3 Pattern matching para `instanceof` (estable desde Java 16)

```java
// ANTES:
if (obj instanceof String) {
    String s = (String) obj;      // cast manual, redundante
    System.out.println(s.length());
}

// AHORA:
if (obj instanceof String s) {     // "s" queda declarada y ya casteada, con scope inteligente
    System.out.println(s.length());
}

// El scope inteligente incluso funciona con && :
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}
```

### 10.4 Combinando sealed + records + pattern matching: el trío que reemplaza mucho boilerplate de patrones "visitor"

```java
sealed interface Forma permits Circulo, Cuadrado, Triangulo { }
record Circulo(double radio) implements Forma { }
record Cuadrado(double lado) implements Forma { }
record Triangulo(double base, double altura) implements Forma { }

double calcularArea(Forma forma) {
    if (forma instanceof Circulo c) return Math.PI * c.radio() * c.radio();
    if (forma instanceof Cuadrado cu) return cu.lado() * cu.lado();
    if (forma instanceof Triangulo t) return t.base() * t.altura() / 2;
    throw new IllegalStateException("Forma desconocida");  // en Java 21, ni esto haría falta (ver sección 11)
}
```

### 10.5 Text blocks — strings multilínea legibles (estable desde Java 15)

```java
String json = """
    {
        "nombre": "Ana",
        "edad": 30
    }
    """;
// La indentación común a todas las líneas se elimina automáticamente
```

---

## 11. Java 21: virtual threads y pattern matching avanzado

### 11.1 Virtual Threads (Project Loom) — el cambio más grande desde las lambdas

Hasta Java 21, cada `Thread` de Java era un **hilo del sistema operativo** (*platform thread*): pesado (~1MB de stack por defecto), limitado a unos pocos miles simultáneos antes de agotar recursos. Un **virtual thread** es gestionado **por la JVM**, no por el SO — es extremadamente ligero (se pueden crear millones), y la JVM los "monta" sobre un pool pequeño de hilos de plataforma reales, desmontándolos automáticamente cada vez que el código bloquea en I/O (una llamada de red, una query a BD, un `Thread.sleep`), liberando el hilo de plataforma subyacente para otro virtual thread mientras tanto.

```java
// Crear un virtual thread directamente:
Thread hilo = Thread.ofVirtual().start(() -> System.out.println("Corriendo en virtual thread"));

// El caso de uso real: un ExecutorService que crea un virtual thread POR TAREA
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        int id = i;
        executor.submit(() -> {
            // código que bloquea en I/O (ej. una llamada HTTP) -- con platform threads,
            // 100,000 de estas tareas simultáneas serían impensables; con virtual threads, trivial
            Thread.sleep(Duration.ofMillis(100));
            return id;
        });
    }
}
```

**Por qué importa tanto:** el modelo tradicional para alta concurrencia en Java era **programación reactiva/asíncrona** (`CompletableFuture` encadenado, WebFlux) precisamente para **evitar bloquear hilos costosos** del SO. Los virtual threads permiten escribir código **secuencial y bloqueante de toda la vida** (mucho más legible y debuggeable) sin pagar el costo de rendimiento — la JVM gestiona la parte difícil por debajo. **No** son magia de paralelismo (siguen limitados por núcleos de CPU para trabajo con cálculo intensivo) — el beneficio es específicamente para cargas **I/O-bound** con muchísima concurrencia (servidores web, microservicios).

### 11.2 Pattern matching para `switch` (estable desde Java 21)

```java
Object valor = 42;

String descripcion = switch (valor) {
    case Integer i when i > 100 -> "entero grande: " + i;   // guard condition con "when"
    case Integer i               -> "entero: " + i;
    case String s                 -> "string de longitud " + s.length();
    case null                      -> "es null";              // switch ahora SÍ puede manejar null explícitamente
    default                        -> "otro tipo";
};
```

### 11.3 Record patterns (estable desde Java 21) — desestructurar records directamente

```java
record Punto(int x, int y) { }
record Linea(Punto inicio, Punto fin) { }

static String describir(Object obj) {
    return switch (obj) {
        case Punto(int x, int y) when x == y -> "punto en la diagonal (%d,%d)".formatted(x, y);
        case Punto(int x, int y) -> "punto (%d,%d)".formatted(x, y);
        case Linea(Punto(var x1, var y1), Punto(var x2, var y2)) ->
            "línea de (%d,%d) a (%d,%d)".formatted(x1, y1, x2, y2);   // desestructuración ANIDADA
        default -> "desconocido";
    };
}
```

Combinado con `sealed`, el compilador puede verificar **exhaustividad completa** en un `switch` sin necesitar `default` — si mañana agregas un nuevo subtipo `permits`, el compilador te avisa en cada `switch` que quedó incompleto.

### 11.4 Sequenced Collections (Java 21) — una interfaz que faltaba desde siempre

Antes de Java 21, no había una forma uniforme de pedir "el primer" o "el último" elemento de una colección ordenada — `List` tenía `get(0)`/`get(size()-1)`, `LinkedHashSet` no tenía ninguna, `Deque` tenía su propio vocabulario. `SequencedCollection` unifica esto:

```java
List<String> lista = new ArrayList<>(List.of("a", "b", "c"));
lista.getFirst();     // "a"
lista.getLast();       // "c"
lista.reversed();       // vista invertida, sin copiar los datos
lista.addFirst("z");    // ahora también en List/Deque/LinkedHashSet de forma consistente
```

---

## 12. Colecciones a fondo: Collections Framework

### 12.1 El mapa completo de la jerarquía

```
Iterable
  └── Collection
        ├── List        (orden de inserción, permite duplicados, acceso por índice)
        │     ├── ArrayList
        │     └── LinkedList        (también implementa Deque)
        ├── Set          (sin duplicados)
        │     ├── HashSet
        │     │     └── LinkedHashSet
        │     └── SortedSet
        │           └── NavigableSet
        │                 └── TreeSet
        └── Queue         (FIFO por defecto)
              ├── Deque    (doble extremo)
              │     └── ArrayDeque
              └── PriorityQueue

Map (NO extiende Collection — es su propia jerarquía, clave->valor)
  ├── HashMap
  │     └── LinkedHashMap
  ├── SortedMap
  │     └── NavigableMap
  │           └── TreeMap
  └── Hashtable (legado)
```

### 12.2 `List`: `ArrayList` vs `LinkedList`

| | `ArrayList` | `LinkedList` |
|---|---|---|
| Estructura interna | Array dinámico (redimensionable) | Lista doblemente enlazada |
| `get(i)` por índice | **O(1)** | O(n) (recorre desde el extremo más cercano) |
| Insertar/borrar al final | O(1) amortizado | O(1) |
| Insertar/borrar al **inicio** o en medio | O(n) (desplaza elementos) | O(1) **si ya tienes el nodo/iterador**; O(n) si hay que buscarlo primero |
| Uso de memoria | Compacto (solo los datos + espacio libre reservado) | Mayor overhead (cada nodo guarda 2 punteros extra) |
| Implementa `Deque` | No | Sí (`addFirst`, `addLast`, `poll`, `peek`) |

**Conclusión práctica (y respuesta típica de entrevista):** usa `ArrayList` casi siempre — el acceso aleatorio rápido y la localidad de caché de un array contiguo ganan en la gran mayoría de casos reales, incluso para inserciones frecuentes al final. `LinkedList` solo brilla cuando tienes **inserciones/borrados frecuentes en los extremos o en medio usando un `ListIterator` que ya está posicionado ahí** (ej. implementar una estructura tipo deque/cola manualmente) — y aun así, hoy se prefiere `ArrayDeque` para eso (ver 12.5).

### 12.3 `Set`: `HashSet` vs `LinkedHashSet` vs `TreeSet`

| | `HashSet` | `LinkedHashSet` | `TreeSet` |
|---|---|---|---|
| Orden | Ninguno garantizado | Orden de **inserción** | Orden **natural** (`Comparable`) o por `Comparator` |
| `add`/`contains`/`remove` | O(1) promedio | O(1) promedio | O(log n) |
| Estructura interna | `HashMap` por debajo | `HashMap` + lista enlazada de orden | Árbol rojo-negro |
| Cuándo usarlo | No te importa el orden, solo unicidad + velocidad | Necesitas unicidad Y recordar el orden en que se insertaron | Necesitas los elementos siempre ordenados, o operaciones de rango (`headSet`, `tailSet`, `first`, `last`) |

### 12.4 `Map`: `HashMap` vs `LinkedHashMap` vs `TreeMap` vs `Hashtable` vs `ConcurrentHashMap`

| | Orden | Thread-safe | `null` permitido | Nota |
|---|---|---|---|---|
| `HashMap` | Ninguno | No | 1 clave `null`, múltiples valores `null` | El default para el 90% de los casos |
| `LinkedHashMap` | Inserción (o **acceso**, configurable) | No | Igual que `HashMap` | Base perfecta para implementar una caché **LRU** (`removeEldestEntry`) |
| `TreeMap` | Orden natural/`Comparator` de las claves | No | Clave `null` **no permitida** | Cuando necesitas iterar en orden o rangos (`ceilingKey`, `floorKey`, `subMap`) |
| `Hashtable` | Ninguno | Sí (sincronización total, `synchronized` en cada método) | **No** permite `null` ni en clave ni en valor | Legado (pre-Java 2) — no usar en código nuevo |
| `ConcurrentHashMap` | Ninguno | Sí (segmentado/CAS, mucho más eficiente que `Hashtable`) | **No** permite `null` (ni clave ni valor) — a propósito, para evitar ambigüedad entre "no está" y "vale null" en un entorno concurrente | El estándar moderno para mapas concurrentes |

**Ejemplo — `LinkedHashMap` como caché LRU (pregunta común de entrevista de diseño):**
```java
class CacheLRU<K, V> extends LinkedHashMap<K, V> {
    private final int capacidad;
    CacheLRU(int capacidad) {
        super(16, 0.75f, true);   // el 3er argumento "true" = ordenar por ACCESO, no solo inserción
        this.capacidad = capacidad;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacidad;   // al superar la capacidad, elimina automáticamente el menos recientemente usado
    }
}
```

### 12.5 `Queue`/`Deque`: `ArrayDeque` y `PriorityQueue`

- **`ArrayDeque`**: array circular redimensionable. Es **más eficiente que `LinkedList` y que la vieja clase `Stack`** para implementar tanto pilas (`push`/`pop`) como colas (`offer`/`poll`) — es la recomendación moderna por defecto para ambos casos.
- **`PriorityQueue`**: un heap binario — no mantiene orden de inserción, siempre te da el elemento "menor" (según orden natural o `Comparator`) al hacer `poll()`. Útil para colas de prioridad reales (ej. procesar tareas por urgencia), algoritmos de grafos (Dijkstra), *top-K* elementos.

```java
Deque<Integer> pila = new ArrayDeque<>();
pila.push(1); pila.push(2); pila.push(3);
pila.pop();    // 3 (LIFO)

PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());  // max-heap
pq.addAll(List.of(5, 1, 8, 3));
pq.poll();   // 8 (el mayor, por el Comparator invertido)
```

### 12.6 `Comparable` vs `Comparator`

- **`Comparable<T>`**: el objeto define su **orden natural**, implementando `compareTo` dentro de su propia clase. Solo puede haber UNA forma natural de ordenar.
- **`Comparator<T>`**: orden **externo**, definido aparte — puedes tener tantos `Comparator` como criterios de orden necesites, sin tocar la clase original.

```java
class Empleado implements Comparable<Empleado> {
    String nombre; double salario;
    @Override
    public int compareTo(Empleado otro) { return Double.compare(this.salario, otro.salario); }  // orden natural: por salario
}

Comparator<Empleado> porNombre = Comparator.comparing(e -> e.nombre);
Comparator<Empleado> porSalarioDesc = Comparator.comparingDouble((Empleado e) -> e.salario).reversed();
Comparator<Empleado> combinado = porNombre.thenComparing(porSalarioDesc);   // desempate encadenado
```

### 12.7 Fail-fast vs. fail-safe iterators

**Fail-fast** (la mayoría de colecciones estándar: `ArrayList`, `HashMap`, `HashSet`): llevan un contador interno `modCount`; si detectan una modificación estructural mientras se itera (fuera del propio iterador), lanzan `ConcurrentModificationException` **inmediatamente**, para evitar comportamiento indefinido.

```java
List<Integer> lista = new ArrayList<>(List.of(1, 2, 3));
for (Integer n : lista) {
    if (n == 2) lista.remove(n);   // ConcurrentModificationException en la siguiente vuelta del for-each
}

// Forma correcta de borrar mientras iteras:
Iterator<Integer> it = lista.iterator();
while (it.hasNext()) {
    if (it.next() == 2) it.remove();   // remove() DEL PROPIO ITERATOR: seguro
}
// O, más idiomático aún:
lista.removeIf(n -> n == 2);
```

**Fail-safe** (`CopyOnWriteArrayList`, `ConcurrentHashMap`): iteran sobre una **instantánea** (o de forma débilmente consistente) — nunca lanzan `ConcurrentModificationException`, pero el iterador puede no reflejar modificaciones concurrentes que ocurrieron después de crearlo.

### 12.8 Guía de decisión y buenas prácticas

**Árbol de decisión rápido — "¿qué estructura uso?":**

```
¿Necesitas asociar una CLAVE a un VALOR?
├── Sí -> Map
│         ¿Necesitas orden? -> TreeMap (por clave) / LinkedHashMap (inserción o acceso)
│         ¿Necesitas thread-safety? -> ConcurrentHashMap
│         ¿Ninguno de los anteriores? -> HashMap (el default)
└── No -> ¿Los elementos deben ser ÚNICOS (sin duplicados)?
          ├── Sí -> Set
          │         ¿Necesitas orden? -> TreeSet / LinkedHashSet
          │         ¿Ninguno? -> HashSet (el default)
          └── No -> ¿Necesitas acceso solo por los EXTREMOS (pila/cola)?
                    ├── Sí -> Deque -> ArrayDeque (default) / PriorityQueue (si necesitas "el menor primero")
                    └── No -> List
                              ¿Muchas inserciones/borrados en medio, con iterador ya posicionado? -> LinkedList (raro)
                              ¿Todo lo demás (el 95% de los casos)? -> ArrayList (el default)
```

**Buenas prácticas que distinguen código junior de código senior:**

1. **Programa contra la interfaz, no la implementación.** Declara `List<String> lista = new ArrayList<>();`, nunca `ArrayList<String> lista = ...` — así puedes cambiar la implementación después (a `LinkedList`, a una inmutable) sin tocar el resto del código que solo usa el contrato de `List`.

2. **No expongas colecciones mutables internas desde un getter.** Es una fuga de encapsulación (viola el espíritu de la sección 7.2): quien recibe la referencia puede mutar tu estado interno sin que tu clase se entere.

   ```java
   class Equipo {
       private final List<String> jugadores = new ArrayList<>();
       // MAL: expone la lista mutable real -- cualquiera puede hacer equipo.getJugadores().clear()
       List<String> getJugadoresMal() { return jugadores; }
       // BIEN: devuelve una vista inmutable, o una copia
       List<String> getJugadoresBien() { return List.copyOf(jugadores); }
   }
   ```

3. **Nunca uses un objeto mutable como clave de `HashMap`/`HashSet` si sus campos relevantes para `equals()`/`hashCode()` pueden cambiar después de insertarlo.** Si el hash cambia tras la inserción, el objeto queda "perdido" en el bucket equivocado — `map.get(esaClave)` puede devolver `null` aunque el objeto siga técnicamente en el mapa. Prefiere claves inmutables (`String`, `record`s, wrappers).

4. **Prefiere inmutabilidad por defecto.** Si una colección no necesita cambiar después de construirse, usa `List.of(...)`/`Set.of(...)`/`Map.of(...)` (sección 9.2) — el compilador/runtime te protege de mutaciones accidentales, y es más seguro compartir la referencia entre hilos sin sincronización (igual que con `String`, sección 5.6).

5. **No sobre-generalices "por si acaso".** Usar `TreeMap` cuando nunca necesitas iterar en orden significa pagar `O(log n)` en cada operación sin ningún beneficio real sobre el `O(1)` amortizado de `HashMap`. Elige la estructura más simple que resuelva el problema *actual*, no el que podrías tener algún día.

6. **En código concurrente, usa las colecciones de `java.util.concurrent` en vez de sincronizar manualmente colecciones normales.** `Collections.synchronizedList(new ArrayList<>())` sincroniza cada operación individual, pero **no** las operaciones compuestas (`if (!lista.contains(x)) lista.add(x)` sigue siendo una condición de carrera sin un bloque `synchronized` externo adicional) — `ConcurrentHashMap`/`CopyOnWriteArrayList` están diseñadas explícitamente para ese tipo de composición segura (ver sección 17.4).

7. **Arrays vs. Collections — no descartes los arrays por "anticuados".** Para datos primitivos en rutas de cálculo intensivo, un `int[]` evita por completo el overhead de boxing (sección 4.10) y de la cabecera de objeto de cada elemento — es la opción correcta cuando el rendimiento numérico importa de verdad y el tamaño es fijo y conocido. Usa `Collection`s cuando necesites la riqueza de su API (streams, genéricos, redimensionamiento) por encima del último bit de rendimiento.

---

## 13. Programación funcional: lambdas y Streams API

### 13.1 Las interfaces funcionales predefinidas de `java.util.function`

No necesitas declarar tu propia interfaz funcional para casi ningún caso común — el JDK ya trae las más usadas:

| Interfaz | Método abstracto | Uso |
|---|---|---|
| `Function<T,R>` | `R apply(T t)` | transforma T en R |
| `BiFunction<T,U,R>` | `R apply(T t, U u)` | transforma 2 valores en uno |
| `Predicate<T>` | `boolean test(T t)` | condición sobre T |
| `Consumer<T>` | `void accept(T t)` | efecto secundario sobre T, sin retorno |
| `Supplier<T>` | `T get()` | provee un valor, sin argumentos |
| `UnaryOperator<T>` | `T apply(T t)` | `Function<T,T>` especializado |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | `BiFunction<T,T,T>` especializado (usado en `reduce`) |

### 13.2 Streams: el modelo mental correcto

Un Stream **no es una estructura de datos** (no almacena nada) — es una **secuencia de operaciones** sobre una fuente de datos, evaluada de forma **perezosa (lazy)**. Se divide en:

- **Operaciones intermedias** (`filter`, `map`, `sorted`, `distinct`, `limit`): devuelven otro Stream, y **no se ejecutan hasta que hay una operación terminal**.
- **Operación terminal** (`collect`, `forEach`, `reduce`, `count`, `findFirst`): dispara la ejecución real de toda la cadena, elemento por elemento.

```java
List<String> nombres = List.of("Ana", "Bruno", "Carla", "David", "Elena");

List<String> resultado = nombres.stream()
    .filter(n -> n.length() > 4)     // intermedia: NO se ejecuta todavía
    .map(String::toUpperCase)         // intermedia: NO se ejecuta todavía
    .sorted()                          // intermedia: NO se ejecuta todavía
    .collect(Collectors.toList());     // TERMINAL: aquí se ejecuta TODO, elemento por elemento
```

**Por qué importa que sea perezoso:** Java procesa **un elemento a la vez a través de toda la cadena**, no "todo el filter, luego todo el map" — esto permite operaciones como `limit(3)` cortar el procesamiento temprano sin recorrer la colección entera (*short-circuiting*).

### 13.3 Collectors — el vocabulario de agregación más usado

```java
List<Empleado> empleados = ...;

// Agrupar por departamento
Map<String, List<Empleado>> porDepto = empleados.stream()
    .collect(Collectors.groupingBy(e -> e.departamento));

// Agrupar Y contar
Map<String, Long> conteoPorDepto = empleados.stream()
    .collect(Collectors.groupingBy(e -> e.departamento, Collectors.counting()));

// Agrupar Y sumar un campo
Map<String, Double> nominaPorDepto = empleados.stream()
    .collect(Collectors.groupingBy(e -> e.departamento, Collectors.summingDouble(e -> e.salario)));

// Particionar en dos grupos (true/false) según un predicado
Map<Boolean, List<Empleado>> particionados = empleados.stream()
    .collect(Collectors.partitioningBy(e -> e.salario > 50000));

// Unir en un String
String nombres = empleados.stream().map(e -> e.nombre).collect(Collectors.joining(", ", "[", "]"));

// A un Map clave->valor
Map<Integer, String> porId = empleados.stream()
    .collect(Collectors.toMap(e -> e.id, e -> e.nombre));
```

### 13.4 `reduce` — la operación terminal más general

```java
int suma = List.of(1, 2, 3, 4).stream().reduce(0, Integer::sum);
Optional<Integer> maximo = List.of(1, 2, 3, 4).stream().reduce(Integer::max);   // sin identidad -> devuelve Optional
```

### 13.5 Streams paralelos — Fork/Join por debajo, no siempre más rápido

```java
long cuenta = listaEnorme.parallelStream()
    .filter(n -> n % 2 == 0)
    .count();
```

`parallelStream()` divide la fuente en trozos y los procesa en el `ForkJoinPool.commonPool()` (compartido globalmente por toda la JVM, ¡incluidos frameworks de terceros!). **Es más rápido solo si:** la fuente de datos es grande, el trabajo por elemento es significativo, y la fuente se puede dividir eficientemente (`ArrayList`/arrays se dividen mejor que `LinkedList`). Para colecciones pequeñas o operaciones triviales, el overhead de coordinación entre hilos **hace que sea más lento** que un stream secuencial — nunca asumas que "paralelo" implica "más rápido" sin medir.

### 13.6 Errores comunes con Streams

```java
// ERROR: un Stream solo se puede consumir UNA VEZ
Stream<Integer> s = List.of(1,2,3).stream();
s.count();
s.count();   // IllegalStateException: stream has already been operated upon or closed

// ERROR (sutil): efectos secundarios dentro de un map() -- rompe la transparencia funcional
List<Integer> resultado = new ArrayList<>();
lista.stream().map(n -> { resultado.add(n * 2); return n; }).collect(Collectors.toList());
// Usa map() para TRANSFORMAR y devolver, no para mutar estado externo -- para eso está forEach()
```

---

## 14. Principios SOLID

Los patrones de diseño (siguiente sección) son *soluciones*; SOLID son los *principios* que explican **por qué** esas soluciones son buenas. Vale la pena verlos primero: cuando entiendas SOLID, muchos patrones dejan de sentirse como "recetas mágicas" y se ven como consecuencias naturales de aplicar estos 5 principios.

### 14.1 S — Single Responsibility Principle (Principio de responsabilidad única)

**Una clase debe tener una, y solo una, razón para cambiar.** No significa "una clase debe hacer una sola cosa" en sentido literal microscópico — significa que no debe mezclar responsabilidades que cambian por **motivos distintos** y a **ritmos distintos**.

```java
// MAL: mezcla lógica de negocio, formato de presentación Y persistencia -- 3 razones de cambio distintas
class ReporteVentas {
    double calcularTotal(List<Venta> ventas) { return ventas.stream().mapToDouble(Venta::monto).sum(); }
    String formatearComoHtml(double total) { return "<html><body>Total: " + total + "</body></html>"; }
    void guardarEnBaseDeDatos(double total) { /* JDBC directo aquí */ }
}
// Si cambia la REGLA de cálculo, el FORMATO de salida, o el MOTOR de persistencia,
// los 3 casos obligan a tocar la MISMA clase -- alta probabilidad de romper algo no relacionado.

// BIEN: cada responsabilidad en su propia clase, cada una con una sola razón para cambiar
class CalculadoraVentas { double calcularTotal(List<Venta> ventas) { /* ... */ return 0; } }
class FormateadorHtml { String formatear(double total) { /* ... */ return ""; } }
class RepositorioReportes { void guardar(double total) { /* ... */ } }
```

### 14.2 O — Open/Closed Principle (Abierto/cerrado)

**Una clase debe estar abierta a extensión, pero cerrada a modificación.** Cuando agregar un caso nuevo te obliga a **editar** código ya existente y probado, el diseño viola OCP. La solución casi siempre es polimorfismo (herencia/interfaces) en vez de condicionales sobre el tipo.

```java
// MAL: cada tipo de descuento nuevo obliga a MODIFICAR este método (y volver a probarlo todo)
double calcularDescuento(String tipoCliente, double precio) {
    if (tipoCliente.equals("VIP")) return precio * 0.8;
    if (tipoCliente.equals("EMPLEADO")) return precio * 0.7;
    // agregar un tipo nuevo = editar este if/else otra vez
    return precio;
}

// BIEN: agregar un tipo nuevo = agregar una clase nueva, SIN tocar el código existente
interface EstrategiaDescuento { double aplicar(double precio); }
class DescuentoVip implements EstrategiaDescuento { public double aplicar(double p) { return p * 0.8; } }
class DescuentoEmpleado implements EstrategiaDescuento { public double aplicar(double p) { return p * 0.7; } }
// (este es exactamente el patrón Strategy, sección 15.3)
```

**Tensión honesta con lo que ya viste en la sección 10:** las `sealed` classes (pattern matching exhaustivo) en cierto sentido **van deliberadamente en contra** de OCP puro — al enumerar `permits` explícitamente, agregar un nuevo subtipo SÍ te obliga a revisar (aunque el compilador te avise dónde) cada `switch` exhaustivo existente. Es una decisión consciente: se cambia "cerrado a modificación" por "el compilador garantiza que no se te olvida ningún caso" — útil cuando el conjunto de variantes es conceptualmente fijo (un AST, tipos de resultado), y contraproducente cuando esperas que terceros agreguen variantes nuevas libremente (ahí sí quieres una interfaz abierta, no `sealed`).

### 14.3 L — Liskov Substitution Principle (Sustitución de Liskov)

**Si `S` es subtipo de `T`, debe ser posible sustituir cualquier objeto de tipo `T` por uno de tipo `S` sin alterar la corrección del programa.** El ejemplo clásico (y trampa de entrevista) es "Cuadrado hereda de Rectángulo":

```java
class Rectangulo {
    protected int ancho, alto;
    void setAncho(int a) { this.ancho = a; }
    void setAlto(int a) { this.alto = a; }
    int area() { return ancho * alto; }
}

class Cuadrado extends Rectangulo {
    @Override void setAncho(int a) { this.ancho = a; this.alto = a; }   // rompe la expectativa del padre
    @Override void setAlto(int a) { this.ancho = a; this.alto = a; }
}

void probar(Rectangulo r) {
    r.setAncho(5);
    r.setAlto(10);
    assert r.area() == 50;   // Para un Rectangulo normal: correcto. Para un Cuadrado: area() == 100 -- ¡FALLA!
}
```

`Cuadrado` **es-un** `Rectangulo` matemáticamente, pero **no es sustituible** por uno en código que asume que `setAncho`/`setAlto` son independientes — viola LSP. La lección: la herencia debe modelar un contrato de **comportamiento**, no solo una relación conceptual "es-un". Si una subclase debe fortalecer precondiciones, debilitar postcondiciones, o lanzar excepciones que el padre no lanzaba, probablemente no debería ser una subclase.

### 14.4 I — Interface Segregation Principle (Segregación de interfaces)

**Ningún cliente debería verse forzado a depender de métodos que no usa.** Prefiere varias interfaces pequeñas y específicas sobre una interfaz grande y genérica ("fat interface").

```java
// MAL: una interfaz "gorda" que obliga a implementar métodos irrelevantes
interface Trabajador {
    void trabajar();
    void comer();       // ¡un Robot no come!
}
class Robot implements Trabajador {
    public void trabajar() { /* ... */ }
    public void comer() { throw new UnsupportedOperationException(); }   // señal de mal diseño
}

// BIEN: interfaces segregadas por capacidad real
interface Trabajable { void trabajar(); }
interface Alimentable { void comer(); }
class Robot implements Trabajable { public void trabajar() { /* ... */ } }
class Empleado implements Trabajable, Alimentable { /* implementa ambas, porque SÍ aplican */ }
```

Esto conecta directamente con la sección 6.1: las interfaces pequeñas y enfocadas son justo lo que hace que "programar contra la interfaz" sea útil — una interfaz gorda es casi tan rígida como depender de una clase concreta.

### 14.5 D — Dependency Inversion Principle (Inversión de dependencias)

**Los módulos de alto nivel no deben depender de módulos de bajo nivel — ambos deben depender de abstracciones.** Y las abstracciones no deben depender de los detalles; los detalles deben depender de las abstracciones.

```java
// MAL: el servicio (alto nivel) depende DIRECTAMENTE de una implementación concreta (bajo nivel)
class ServicioNotificaciones {
    private final EnviadorEmailSMTP enviador = new EnviadorEmailSMTP();   // acoplado a UNA implementación concreta
    void notificar(String mensaje) { enviador.enviar(mensaje); }
}

// BIEN: el servicio depende de una ABSTRACCIÓN, no de un detalle concreto
interface Enviador { void enviar(String mensaje); }
class ServicioNotificaciones {
    private final Enviador enviador;
    ServicioNotificaciones(Enviador enviador) { this.enviador = enviador; }   // inyectado desde afuera
    void notificar(String mensaje) { enviador.enviar(mensaje); }
}
class EnviadorEmailSMTP implements Enviador { public void enviar(String m) { /* ... */ } }
class EnviadorSMS implements Enviador { public void enviar(String m) { /* ... */ } }
// Cambiar de email a SMS -- o agregar ambos -- no requiere tocar ServicioNotificaciones para nada.
```

**Esto es, literalmente, lo que ya viste en la sección 22.3 sobre Spring:** el contenedor de Inversión de Control (IoC) de Spring es un **mecanismo automatizado** para aplicar DIP a escala de una aplicación entera — en vez de que tú conectes manualmente cada `new ServicioX(new ImplementacionY())`, declaras la abstracción que necesitas (`Enviador enviador` en el constructor) y el framework decide, por configuración, qué implementación concreta inyectar. DIP es el principio; la Inyección de Dependencias (DI) es la técnica; el contenedor de Spring es una herramienta que automatiza esa técnica.

### 14.6 SOLID, de un vistazo, y su relación con lo que ya viste

| Principio | En una frase | Dónde ya lo viste en esta guía |
|---|---|---|
| **S**RP | Una razón para cambiar | Separar `ServicioPedidos` de `RepositorioPedidos` (sección 22.3) |
| **O**CP | Extender sin modificar | Patrón Strategy con lambdas (sección 15.3) |
| **L**SP | Los subtipos deben ser sustituibles | La trampa de `equals()` roto también aplica aquí — un `equals()` inconsistente entre padre e hijo viola LSP |
| **I**SP | Interfaces pequeñas y enfocadas | `Comparable` vs `Comparator` (sección 12.6): 2 interfaces chicas y enfocadas, no una gigante |
| **D**IP | Depender de abstracciones | Inyección de dependencias por constructor en Spring (sección 22.3) |

---

## 15. Patrones de diseño idiomáticos en Java

Los patrones no son "recetas de UML" — son soluciones nombradas a problemas recurrentes. Aquí, versiones idiomáticas con Java moderno.

### 15.1 Singleton — la forma *correcta* es un enum

```java
// La forma clásica requiere cuidado extra con concurrencia y serialización:
class ConfiguracionClasica {
    private static volatile ConfiguracionClasica instancia;
    private ConfiguracionClasica() {}
    public static ConfiguracionClasica getInstance() {
        if (instancia == null) {
            synchronized (ConfiguracionClasica.class) {
                if (instancia == null) instancia = new ConfiguracionClasica();  // double-checked locking
            }
        }
        return instancia;
    }
}

// La forma RECOMENDADA (Joshua Bloch, "Effective Java"): un enum de un solo valor
enum Configuracion {
    INSTANCIA;
    private final Map<String, String> valores = new HashMap<>();
    public String get(String clave) { return valores.get(clave); }
}
// Un enum es, por diseño de la JVM, thread-safe, serializable de forma segura,
// y a prueba de ataques de reflexión que romperían un singleton "a mano".
```

### 15.2 Builder — para construir objetos complejos/inmutables paso a paso

```java
public final class Pizza {
    private final String masa;
    private final List<String> ingredientes;

    private Pizza(Builder b) { this.masa = b.masa; this.ingredientes = List.copyOf(b.ingredientes); }

    public static class Builder {
        private String masa = "tradicional";
        private final List<String> ingredientes = new ArrayList<>();
        public Builder masa(String masa) { this.masa = masa; return this; }
        public Builder agregar(String ingrediente) { ingredientes.add(ingrediente); return this; }
        public Pizza build() { return new Pizza(this); }
    }
}

Pizza pizza = new Pizza.Builder().masa("delgada").agregar("queso").agregar("champiñones").build();
```

### 15.3 Strategy — antes una jerarquía de clases, hoy a menudo una lambda

```java
interface EstrategiaDescuento { double aplicar(double precio); }

// Antes de Java 8: una clase por cada estrategia
class SinDescuento implements EstrategiaDescuento { public double aplicar(double p) { return p; } }

// Con lambdas: la estrategia es simplemente un valor que se pasa
Map<String, EstrategiaDescuento> estrategias = Map.of(
    "vip", p -> p * 0.8,
    "empleado", p -> p * 0.7,
    "normal", p -> p
);
double precioFinal = estrategias.get(tipoCliente).aplicar(precioBase);
```

### 15.4 Observer — la base de casi todo sistema de eventos/listeners

```java
interface Observador { void notificar(String evento); }

class Publicador {
    private final List<Observador> observadores = new ArrayList<>();
    void suscribir(Observador o) { observadores.add(o); }
    void emitir(String evento) { observadores.forEach(o -> o.notificar(evento)); }
}
```

### 15.5 Decorator — añadir comportamiento sin herencia ni modificar la clase original

```java
interface Cafe { double costo(); }
class CafeSimple implements Cafe { public double costo() { return 20; } }

class ConLeche implements Cafe {
    private final Cafe base;
    ConLeche(Cafe base) { this.base = base; }
    public double costo() { return base.costo() + 5; }
}

Cafe pedido = new ConLeche(new CafeSimple());   // se pueden anidar decoradores libremente
```

### 15.6 Template Method — usando una clase abstracta (el clásico que muestra por qué existen las clases abstractas)

```java
abstract class ProcesoETL {
    public final void ejecutar() {          // "template": el ORDEN de pasos es fijo
        extraer();
        transformar();
        cargar();
    }
    abstract void extraer();
    abstract void transformar();
    void cargar() { System.out.println("Carga estándar a la BD"); }   // paso con default, override opcional
}
```

---

## 16. Manejo de excepciones a fondo

### 16.1 La jerarquía completa de `Throwable`

```
Throwable
  ├── Error                          (problemas graves del entorno, NO se espera capturarlos)
  │     ├── OutOfMemoryError
  │     └── StackOverflowError
  └── Exception
        ├── RuntimeException          (UNCHECKED: no obligan try/catch ni "throws")
        │     ├── NullPointerException
        │     ├── ArrayIndexOutOfBoundsException
        │     ├── IllegalArgumentException
        │     ├── IllegalStateException
        │     └── ClassCastException
        └── (checked exceptions)      (CHECKED: el compilador EXIGE manejarlas o declararlas)
              ├── IOException
              └── SQLException
```

### 16.2 Checked vs. Unchecked — la decisión de diseño más debatida de Java

- **Checked** (subclases directas de `Exception`, no de `RuntimeException`): el compilador **obliga** a capturarlas o declararlas con `throws`. Pensadas para condiciones **recuperables** que el llamador puede/debe anticipar (un archivo que no existe, una conexión de red caída).
- **Unchecked** (`RuntimeException` y sus subclases): no obligan nada. Pensadas para **errores de programación** (un `null` no esperado, un índice fuera de rango) que idealmente se **previenen con código correcto**, no se "manejan" en cada punto de llamada.

**La controversia (que vale la pena conocer para discusiones de diseño):** muchos frameworks modernos (Spring, Hibernate) **evitan las checked exceptions** deliberadamente — envuelven excepciones checked de bajo nivel (`SQLException`) en excepciones unchecked propias (`DataAccessException`), porque en la práctica las checked exceptions tienden a **forzar manejo superficial** (`catch (Exception e) { }` vacíos solo para que compile) en vez de manejo significativo.

### 16.3 `try-with-resources` — cierre determinístico de recursos

Cualquier clase que implemente `AutoCloseable` (o `Closeable`) se puede usar así, garantizando que `close()` se llame **siempre**, incluso si hay una excepción:

```java
try (FileReader fr = new FileReader("datos.txt");
     BufferedReader br = new BufferedReader(fr)) {
    System.out.println(br.readLine());
}   // fr y br se cierran automáticamente, en orden INVERSO al de declaración, incluso si readLine() lanza excepción
```

**Recurso propio que implementa `AutoCloseable`:**
```java
class Conexion implements AutoCloseable {
    Conexion() { System.out.println("Abriendo conexión"); }
    @Override public void close() { System.out.println("Cerrando conexión"); }
}
```

### 16.4 Multi-catch y jerarquía de `catch` (trampa de compilación clásica)

```java
try {
    riesgoso();
} catch (IOException | SQLException e) {   // multi-catch (Java 7+): un solo bloque para varios tipos NO relacionados
    log(e.getMessage());
}

try {
    riesgoso();
} catch (IOException e) {
    manejarIO(e);
} catch (Exception e) {      // DEBE ir DESPUÉS de IOException: si fuera antes, sería código inalcanzable
    manejarGeneral(e);
}
// catch (Exception e) {} seguido de catch (IOException e) {} -> ERROR DE COMPILACIÓN:
// "exception IOException has already been caught" (bloque inalcanzable)
```

### 16.5 La trampa de `finally` con `return`

```java
static int trampa() {
    try {
        return 1;
    } finally {
        return 2;   // ¡ADVERTENCIA! esto DESCARTA el "return 1" -- finally "gana" siempre
    }
}
// trampa() devuelve 2, no 1. Un `return` (o excepción no capturada) dentro de un `finally`
// SIEMPRE sobrescribe cualquier resultado o excepción pendiente del try/catch.
// Regla práctica: NUNCA pongas un `return` dentro de un bloque finally.
```

`finally` se ejecuta siempre — salvo por `System.exit()` (termina la JVM inmediatamente, sin dar chance a nada) o si la propia JVM se cae (`kill -9`, corte de energía).

### 16.6 Excepciones personalizadas y *exception chaining*

```java
class SaldoInsuficienteException extends RuntimeException {
    SaldoInsuficienteException(String mensaje, Throwable causa) {
        super(mensaje, causa);   // preserva la excepción ORIGINAL como "cause" -- no la pierdas nunca
    }
}

try {
    consultarBaseDeDatos();
} catch (SQLException e) {
    throw new SaldoInsuficienteException("No se pudo verificar el saldo", e);   // encadenamiento correcto
}
```

**Buenas prácticas resumidas:** nunca captures `Exception`/`Throwable` genérico salvo en el borde de la aplicación (ej. un manejador global); nunca dejes un `catch` vacío; usa excepciones para condiciones **excepcionales**, no como control de flujo normal (no lances una excepción para "salir de un bucle" cuando un `break` basta); siempre incluye la causa original al envolver una excepción.

---

## 17. Concurrencia y paralelismo

### 17.1 Concurrencia ≠ paralelismo — la distinción conceptual

- **Concurrencia**: **estructurar** un programa para manejar varias tareas que progresan de forma intercalada, sin necesariamente ejecutarse en el mismo instante (incluso con **un solo núcleo**, el SO puede simular concurrencia alternando rápidamente entre hilos).
- **Paralelismo**: ejecutar **literalmente al mismo tiempo**, lo que requiere **múltiples núcleos** físicos.

Un programa puede ser concurrente sin ser paralelo (una sola CPU alternando tareas) y puede ser paralelo sin la complejidad típica de la concurrencia (ej. `parallelStream` sobre datos sin estado compartido). Java te da herramientas para ambos: hilos/`ExecutorService`/locks para **estructurar concurrencia**, y Fork/Join/`parallelStream` para **paralelismo de datos**.

### 17.2 Creación de hilos: `Thread` vs `Runnable`

```java
// Extender Thread: desaconsejado (ya "gastas" tu única herencia posible en Thread)
class MiHilo extends Thread { public void run() { System.out.println("corriendo"); } }

// Implementar Runnable: preferido (más flexible, se puede combinar con ExecutorService)
Runnable tarea = () -> System.out.println("corriendo");   // lambda: Runnable es una interfaz funcional
new Thread(tarea).start();
```

**Ciclo de vida de un `Thread`:** `NEW` → `RUNNABLE` → (`BLOCKED`/`WAITING`/`TIMED_WAITING`, según qué esté esperando) → `TERMINATED`.

### 17.3 `synchronized`, `volatile` y el Java Memory Model

**`synchronized`** garantiza **exclusión mutua** (solo un hilo a la vez ejecuta el bloque) Y **visibilidad** (los cambios hechos dentro se publican a otros hilos al liberar el lock):

```java
class Contador {
    private int valor = 0;
    public synchronized void incrementar() { valor++; }   // el monitor es "this"
    public synchronized int getValor() { return valor; }   // el getter TAMBIÉN debe sincronizarse, si no, puede leer un valor "viejo" cacheado
}
```

**`volatile`** garantiza **solo visibilidad** (todo hilo lee siempre el valor más reciente de memoria principal, no una copia cacheada en su núcleo/registro) — **NO** garantiza atomicidad:

```java
volatile boolean detener = false;   // CORRECTO: solo se lee/escribe como flag simple, sin operación compuesta

volatile int contador = 0;
contador++;   // ¡INCORRECTO como mecanismo de sincronización! contador++ es LEER + SUMAR + ESCRIBIR,
              // 3 pasos NO atómicos -- dos hilos pueden entrelazarse y perder un incremento,
              // aunque cada paso individual sea "visible" gracias a volatile.
```

**Regla práctica:** `volatile` para flags simples de un solo hilo escritor; para contadores/operaciones compuestas usa `synchronized` o, mejor, las clases `Atomic*` (sección 17.5).

### 17.4 `java.util.concurrent`: el toolkit moderno

**`ExecutorService`** — gestiona un pool de hilos reutilizables, en vez de crear un `Thread` nuevo por tarea:

```java
try (ExecutorService executor = Executors.newFixedThreadPool(4)) {
    Future<Integer> resultado = executor.submit(() -> calcularAlgoCostoso());
    System.out.println(resultado.get());   // bloquea hasta que la tarea termine
}
```

**`CompletableFuture`** — composición asíncrona sin bloquear, encadenando transformaciones:

```java
CompletableFuture<String> flujo = CompletableFuture
    .supplyAsync(() -> obtenerUsuario(id))
    .thenApply(usuario -> usuario.getNombre())
    .thenApply(String::toUpperCase)
    .exceptionally(ex -> "USUARIO DESCONOCIDO");

CompletableFuture<Void> combinado = CompletableFuture
    .supplyAsync(this::obtenerPrecio)
    .thenCombine(CompletableFuture.supplyAsync(this::obtenerImpuesto), (precio, imp) -> precio + imp)
    .thenAccept(total -> System.out.println("Total: " + total));
```

### 17.5 Clases `Atomic*` — operaciones lock-free vía CAS (Compare-And-Swap)

```java
AtomicInteger contador = new AtomicInteger(0);
contador.incrementAndGet();          // atómico de verdad, sin necesitar synchronized
contador.compareAndSet(5, 10);        // "si vale 5, cámbialo a 10" -- atómico, base de algoritmos lock-free
```

CAS es una instrucción de hardware: lee el valor, compara con el esperado, y si coincide, escribe el nuevo valor — todo en una sola operación atómica de CPU, sin necesitar un lock del sistema operativo (mucho más barato bajo alta contención moderada).

### 17.6 Locks explícitos: `ReentrantLock`

Más flexible que `synchronized` (permite `tryLock` con timeout, lock interrumpible, lock justo condiciones múltiples vía `newCondition()`), a costa de que **tú** eres responsable de liberar el lock:

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // sección crítica
} finally {
    lock.unlock();   // OBLIGATORIO en un finally -- si no, un lock nunca liberado bloquea el programa para siempre
}
```

### 17.7 Coordinación entre hilos: `CountDownLatch`, `CyclicBarrier`, `Semaphore`

| Herramienta | Para qué sirve |
|---|---|
| `CountDownLatch` | Un hilo (o varios) esperan a que **N eventos** ocurran (ej. esperar a que 5 servicios terminen de arrancar) — se usa **una sola vez** |
| `CyclicBarrier` | Varios hilos se esperan mutuamente en un punto de sincronización, y **se puede reutilizar** para múltiples rondas |
| `Semaphore` | Limita cuántos hilos acceden **simultáneamente** a un recurso (ej. máximo 10 conexiones concurrentes a una API externa) |

### 17.8 Virtual Threads (repaso desde la perspectiva de concurrencia, ver también 11.1)

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> resultados = tareas.stream()
        .map(tarea -> executor.submit(() -> procesar(tarea)))
        .toList();
}
```

Todo el código de `synchronized`, `ExecutorService`, `CompletableFuture` que ya conoces **sigue funcionando igual** con virtual threads — Loom no introdujo una API paralela nueva que aprender, solo una implementación de `Thread` radicalmente más barata. La única precaución real: código que usa `synchronized` alrededor de operaciones bloqueantes puede "fijar" (*pin*) el virtual thread a su hilo de plataforma subyacente durante ese bloqueo (perdiendo parte del beneficio) — para código nuevo pensado para virtual threads, se prefiere `ReentrantLock` sobre `synchronized` en rutas calientes de I/O.

---

## 18. Manejo de archivos y E/S

Todo lo visto hasta ahora vive dentro del proceso Java. Esta sección y las siguientes 3 tratan de cómo Java habla con el **mundo exterior**: el sistema de archivos primero, bases de datos después.

### 18.1 Dos generaciones de I/O: `java.io.File` vs. `java.nio.file.Path`/`Files`

La API original (`java.io.File`, desde Java 1.0) mezcla la **representación** de una ruta con las **operaciones** sobre ella, y reporta errores devolviendo `false` en vez de lanzar una excepción con contexto (`archivo.delete()` que falla no te dice *por qué* falló). Desde Java 7, **NIO.2** (`java.nio.file.Path` + la clase utilitaria `Files`) es la forma moderna recomendada:

```java
Path ruta = Path.of("datos", "reporte.txt");           // Path.of() desde Java 11; antes, Paths.get(...)
Files.createDirectories(ruta.getParent());
boolean existe = Files.exists(ruta);

List<String> lineas = Files.readAllLines(ruta, StandardCharsets.UTF_8);
Files.writeString(ruta, "contenido nuevo", StandardOpenOption.CREATE, StandardOpenOption.APPEND);  // Java 11+

Files.copy(ruta, Path.of("respaldo", "reporte.txt"));
Files.delete(ruta);   // lanza NoSuchFileException/IOException con contexto real, no un simple `false`
```

### 18.2 Streams de bytes vs. streams de caracteres — y por qué el *charset* nunca debe ser implícito

| Familia | Para qué | Clases base |
|---|---|---|
| `InputStream`/`OutputStream` | Datos **binarios** crudos, byte a byte (imágenes, PDFs, protocolos binarios) | `FileInputStream`, `FileOutputStream` |
| `Reader`/`Writer` | **Texto**, con decodificación/codificación de caracteres según un *charset* | `FileReader`, `FileWriter` |
| `InputStreamReader`/`OutputStreamWriter` | El **puente** entre ambos mundos: decodifica bytes a caracteres (o viceversa) usando un `Charset` explícito | — |

```java
// PELIGROSO: depende del "default charset de la plataforma" -- puede ser UTF-8 en Linux/macOS
// y algo distinto (ej. windows-1252) en Windows -- clásico bug "en mi máquina funciona"
Reader r = new FileReader("datos.txt");

// CORRECTO: charset SIEMPRE explícito
Reader r2 = new InputStreamReader(new FileInputStream("datos.txt"), StandardCharsets.UTF_8);
// o, más simple con NIO.2:
BufferedReader br = Files.newBufferedReader(Path.of("datos.txt"), StandardCharsets.UTF_8);
```

### 18.3 Buffered I/O — por qué importa casi siempre

Sin buffer, cada `read()`/`write()` individual puede implicar una llamada al sistema operativo (*syscall*) — extremadamente cara si se repite byte a byte o línea a línea. Los decoradores `Buffered*` agrupan la E/S real en bloques grandes, reduciendo drásticamente el número de syscalls:

```java
try (BufferedReader br = Files.newBufferedReader(Path.of("datos.txt"), StandardCharsets.UTF_8)) {
    String linea;
    while ((linea = br.readLine()) != null) {
        procesar(linea);
    }
}   // se cierra automáticamente (try-with-resources, sección 16.3)
```

**Regla práctica:** envuelve siempre un stream/reader "crudo" de archivo con su versión `Buffered*`, salvo que ya uses una API de alto nivel que lo haga por ti internamente (como `Files.readAllLines`).

### 18.4 `Files.lines()` — procesar archivos enormes sin cargarlos completos a memoria

```java
try (Stream<String> lineas = Files.lines(Path.of("log_gigante.txt"), StandardCharsets.UTF_8)) {
    long totalErrores = lineas.filter(l -> l.contains("ERROR")).count();
}
```

`Files.lines()` es **perezoso** (lazy, igual que cualquier Stream — sección 13.2): lee bajo demanda, línea por línea, ideal para archivos de varios GB que jamás cabrían enteros en el heap — a diferencia de `Files.readAllLines()`, que carga el archivo **completo** a una `List` en memoria antes de devolver el control.

### 18.5 Serialización de objetos (`Serializable`) — y por qué se usa cada vez menos

```java
class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;   // "versión" del formato -- cámbialo si el shape de la clase cambia incompatiblemente
    String nombre;
}
```

La serialización nativa de Java convierte un grafo de objetos a bytes (y viceversa) sin código adicional, pero tiene 3 problemas serios que han hecho que caiga en desuso frente a JSON/Protobuf: **seguridad** (deserializar datos de origen no confiable es una superficie de ataque documentada — "Java deserialization vulnerabilities" ha sido la causa de múltiples CVEs graves en el ecosistema), **fragilidad de versión** (un cambio aparentemente inocuo en la clase puede romper la compatibilidad con datos ya serializados), y **tamaño de payload** (formato binario propio de Java, no interoperable con otros lenguajes). Para intercambio de datos moderno, usa JSON (Jackson/Gson) o formatos binarios interoperables (Protocol Buffers, Avro).

### 18.6 Rutas multiplataforma

Nunca hardcodees `"/"` ni `"\\"` como separador de ruta — usa `Path.of(...)` (que resuelve el separador correcto según el SO) o, si trabajas con `String`, la constante `File.separator`.

```java
Path ruta = Path.of("config", "app", "settings.yml");   // se resuelve correctamente en Windows y en Linux/macOS
```

---

## 19. JDBC: acceso a bases de datos desde Java

### 19.1 Arquitectura de JDBC — las piezas del rompecabezas

JDBC (*Java Database Connectivity*) es la API estándar para que Java hable con cualquier base de datos relacional, a través de un **driver** específico de cada motor (PostgreSQL, MySQL, Oracle, etc.) que implementa las interfaces de `java.sql`. Desde JDBC 4.0 (Java 6), el driver se descubre automáticamente vía `ServiceLoader` — ya no hace falta el clásico `Class.forName("...")` para "registrarlo" manualmente.

| Interfaz | Qué representa |
|---|---|
| `Connection` | Una conexión activa a la base de datos |
| `Statement` | Una sentencia SQL simple, sin parámetros |
| `PreparedStatement` | Una sentencia SQL **parametrizada** y precompilada (ver 19.3) |
| `ResultSet` | El cursor sobre las filas devueltas por una consulta |

### 19.2 Anatomía de una consulta

```java
String url = "jdbc:postgresql://localhost:5432/miapp";
try (Connection conn = DriverManager.getConnection(url, "usuario", "clave");
     PreparedStatement ps = conn.prepareStatement(
         "SELECT id, nombre FROM empleados WHERE salario > ?")) {

    ps.setDouble(1, 50000);   // los parámetros se indexan desde 1, NO desde 0

    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getInt("id") + " " + rs.getString("nombre"));
        }
    }
}   // Connection, PreparedStatement y ResultSet se cierran automáticamente, en orden inverso (sección 16.3)
```

### 19.3 `PreparedStatement` vs. `Statement` — no es solo rendimiento, es seguridad

```java
// VULNERABLE a inyección SQL: el texto del usuario se concatena directo dentro del SQL
Statement st = conn.createStatement();
st.executeQuery("SELECT * FROM usuarios WHERE nombre = '" + nombreIngresado + "'");
// Si nombreIngresado es:  ' OR '1'='1
// la consulta final se convierte en: SELECT * FROM usuarios WHERE nombre = '' OR '1'='1'
// -- ¡devuelve TODOS los usuarios de la tabla, sin excepción!

// SEGURO: PreparedStatement separa el SQL (fijo) de los datos (parámetros), NUNCA se concatenan como texto
PreparedStatement ps = conn.prepareStatement("SELECT * FROM usuarios WHERE nombre = ?");
ps.setString(1, nombreIngresado);   // el driver lo trata SIEMPRE como dato, nunca como sintaxis SQL
```

Además de eliminar por completo la clase de vulnerabilidad de inyección SQL, `PreparedStatement` permite que el motor de base de datos **cachee el plan de ejecución** de la consulta y lo reutilice en llamadas repetidas con distintos parámetros — más rápido en cargas con la misma consulta ejecutada muchas veces.

### 19.4 Batch updates — insertar/actualizar muchas filas eficientemente

```java
try (PreparedStatement ps = conn.prepareStatement("INSERT INTO logs (mensaje) VALUES (?)")) {
    for (String msg : mensajes) {
        ps.setString(1, msg);
        ps.addBatch();          // acumula, no ejecuta todavía
    }
    ps.executeBatch();           // UNA sola ida y vuelta a la base de datos para todas las inserciones
}
```

### 19.5 Connection pooling — por qué nunca abrir una conexión cruda por petición

Abrir una conexión TCP nueva y autenticar contra la base de datos toma del orden de decenas de milisegundos — en una aplicación con tráfico real, crear y destruir una conexión por cada petición HTTP arruina el rendimiento. Un **pool de conexiones** mantiene un conjunto de conexiones ya abiertas y las presta/recicla bajo demanda. **HikariCP** es el estándar de facto hoy (el que usa Spring Boot por defecto):

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl(url);
config.setUsername("usuario");
config.setPassword("clave");
config.setMaximumPoolSize(10);
HikariDataSource ds = new HikariDataSource(config);   // se usa como DataSource, en vez de DriverManager directo
```

### 19.6 Transacciones a nivel JDBC (introducción — se profundiza en la sección 21)

```java
conn.setAutoCommit(false);   // JDBC hace autocommit de CADA sentencia por defecto -- lo desactivas para agrupar varias
try {
    // varias sentencias relacionadas que deben aplicarse juntas o no aplicarse ninguna
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
}
```

---

## 20. ORM e Hibernate

### 20.1 Qué problema resuelve un ORM: el "impedance mismatch"

El modelo orientado a objetos (herencia, referencias entre objetos, grafos) no se traduce 1:1 al modelo relacional (tablas, filas, claves foráneas) — a esta fricción se le llama *object-relational impedance mismatch*. Un **ORM** (Object-Relational Mapping) automatiza la traducción entre ambos mundos. **JPA** (*Jakarta Persistence API*, antes *Java Persistence API*) es la **especificación** estándar; **Hibernate** es la implementación más usada (también existen EclipseLink, OpenJPA).

### 20.2 Entidades JPA básicas

```java
@Entity
@Table(name = "empleados")
class Empleado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departamento_id")
    private Departamento departamento;
}
```

### 20.3 Estrategias de fetch: `LAZY` vs. `EAGER` — y el temido problema N+1

- **`LAZY`**: la relación se carga solo cuando se accede explícitamente (a través de un proxy). Es el default para colecciones (`@OneToMany`, `@ManyToMany`).
- **`EAGER`**: se carga siempre junto con la entidad principal. Es el default para `@ManyToOne`/`@OneToOne` — pero en la práctica se recomienda **forzar `LAZY` explícitamente** casi siempre, y cargar lo necesario a propósito.

**El problema N+1**, la trampa de rendimiento más famosa de cualquier ORM:

```java
// PROBLEMA: 1 query para traer los N empleados, y N queries ADICIONALES (una por cada .getDepartamento())
List<Empleado> empleados = entityManager.createQuery("FROM Empleado", Empleado.class).getResultList();
for (Empleado e : empleados) {
    System.out.println(e.getDepartamento().getNombre());   // dispara 1 SELECT extra POR CADA empleado
}
// Total: 1 + N consultas, cuando el mismo resultado cabía en 1 sola consulta con JOIN

// SOLUCIÓN: JOIN FETCH explícito -- trae empleados Y departamentos en UNA sola consulta
List<Empleado> empleados2 = entityManager
    .createQuery("SELECT e FROM Empleado e JOIN FETCH e.departamento", Empleado.class)
    .getResultList();
```

### 20.4 El contexto de persistencia y el ciclo de vida de una entidad

```
Transient (new Empleado(), sin id, sin asociar a nada)
    │  entityManager.persist(e)
    ▼
Managed/Persistent (asociada al EntityManager -- Hibernate vigila sus cambios)
    │  entityManager.detach(e) / cerrar la sesión
    ▼
Detached (fuera del contexto -- cambios YA NO se sincronizan solos)

Managed  --entityManager.remove(e)-->  Removed (marcada para DELETE en el próximo flush/commit)
```

**Dirty checking**: mientras una entidad está *managed*, Hibernate detecta automáticamente los cambios en sus campos y genera el `UPDATE` correspondiente al hacer `flush`/`commit` — **no** hace falta llamar a ningún método de "guardar" explícito para una entidad ya administrada:

```java
Empleado e = entityManager.find(Empleado.class, 1L);   // queda MANAGED
e.setSalario(60000);   // Hibernate lo detecta solo (dirty checking)
// al hacer commit: UPDATE empleados SET salario=60000 WHERE id=1  -- generado automáticamente, sin pedirlo
```

### 20.5 JPQL — consultas a nivel de objetos, no de tablas

```java
List<Empleado> resultado = entityManager
    .createQuery("SELECT e FROM Empleado e WHERE e.salario > :minimo", Empleado.class)
    .setParameter("minimo", 50000.0)
    .getResultList();
// JPQL opera sobre ENTIDADES y sus CAMPOS (Empleado, e.salario), no sobre tablas/columnas SQL directas
```

### 20.6 Spring Data JPA — la capa de conveniencia sobre JPA/Hibernate

```java
interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findBySalarioGreaterThan(double minimo);   // Spring GENERA la consulta solo a partir del nombre del método

    @Query("SELECT e FROM Empleado e JOIN FETCH e.departamento")
    List<Empleado> buscarConDepartamento();                    // JPQL explícito cuando el nombre del método no basta
}
```

### 20.7 Cuándo NO usar un ORM — honestidad de diseño

Para reportes complejos con agregaciones pesadas, actualizaciones masivas (*bulk updates*), o consultas que dependen de características específicas del motor de base de datos, forzarlas a través del modelo de objetos de un ORM a menudo termina siendo más complicado y menos predecible que usar JDBC/SQL nativo directamente (o herramientas intermedias como jOOQ o MyBatis, que dan más control sobre el SQL exacto sin perder toda la comodidad de un mapeo a objetos).

---

## 21. Transacciones: ACID y JTA

### 21.1 ACID — las 4 garantías que promete una transacción de base de datos

| Letra | Garantiza | Ejemplo de violación si falla |
|---|---|---|
| **A**tomicity (Atomicidad) | Todo-o-nada: si una parte de la transacción falla, se deshace **completa** | Una transferencia bancaria resta de una cuenta pero no llega a sumar en la otra por un fallo a medias |
| **C**onsistency (Consistencia) | La transacción lleva la base de datos de un estado válido a otro estado válido, respetando todas las reglas/constraints | Un saldo queda negativo, violando una regla de negocio o un `CHECK` |
| **I**solation (Aislamiento) | Transacciones concurrentes no se "ven" entre sí a medias (según el nivel de aislamiento configurado) | Una transacción lee datos no confirmados ("sucios") de otra que después hace `ROLLBACK` |
| **D**urability (Durabilidad) | Una vez confirmada (`COMMIT`), el cambio sobrevive incluso a un fallo inmediato del servidor | Un commit "exitoso" que desaparece tras un apagón |

Este es exactamente el mismo ACID que se cubre a fondo, con ejemplos SQL concretos y niveles de aislamiento en detalle, en la guía dedicada de SQL/Oracle de esta misma carpeta ([`sql-oracle-guide.md`](sql-oracle-guide.md), sección 10 TCL) — aquí nos enfocamos en cómo Java **expone y controla** esas garantías.

### 21.2 Niveles de aislamiento, desde Java

| Nivel | Dirty read | Non-repeatable read | Phantom read |
|---|---|---|---|
| `READ_UNCOMMITTED` | posible | posible | posible |
| `READ_COMMITTED` | no | posible | posible |
| `REPEATABLE_READ` | no | no | posible (según motor) |
| `SERIALIZABLE` | no | no | no |

```java
// A nivel JDBC puro:
conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);

// A nivel Spring/JPA:
@Transactional(isolation = Isolation.READ_COMMITTED)
public void metodo() { /* ... */ }
```

Más aislamiento = más seguridad frente a condiciones de carrera entre transacciones, pero típicamente también más contención y menor throughput — es un trade-off explícito, no "siempre usa el más estricto".

### 21.3 `@Transactional` en Spring — demarcación declarativa de transacciones

```java
@Service
class ServicioTransferencias {
    @Transactional
    public void transferir(Long origenId, Long destinoId, BigDecimal monto) {
        Cuenta origen = repo.findById(origenId).orElseThrow();
        Cuenta destino = repo.findById(destinoId).orElseThrow();
        origen.retirar(monto);
        destino.depositar(monto);
        // si CUALQUIER excepción unchecked se propaga desde aquí, Spring hace ROLLBACK de TODO automáticamente
    }
}
```

**Dos trampas clásicas de `@Transactional` que hay que conocer:**

1. **Se implementa con un proxy (AOP).** Si un método transaccional se llama **desde dentro de la misma clase** (`this.transferir(...)`, o simplemente `transferir(...)` sin pasar por el bean gestionado por Spring), la llamada **no pasa por el proxy** y la anotación **no se aplica en absoluto** — silenciosamente. Solo funciona en llamadas que llegan desde **otro** bean.
2. **Por defecto, solo hace rollback ante `RuntimeException`** (unchecked). Para que también revierta ante una excepción *checked*, hay que ser explícito: `@Transactional(rollbackFor = MiExcepcionChequeada.class)`.

### 21.4 JTA (Java Transaction API) — transacciones distribuidas, multi-recurso

JDBC y las transacciones locales de Hibernate/`@Transactional` (sección 21.3) coordinan **un solo recurso transaccional** (una conexión a una base de datos). **JTA** existe para cuando una única operación de negocio debe ser atómica a través de **varios recursos heterogéneos a la vez** — por ejemplo, escribir en dos bases de datos distintas, o en una base de datos **y** enviar un mensaje a una cola JMS, como una sola unidad de todo-o-nada.

El protocolo clásico detrás de JTA es **Two-Phase Commit (2PC)**: un coordinador de transacciones (`TransactionManager`) le pregunta a cada recurso participante (`XAResource`) "¿puedes comprometer esto?" (fase de *prepare*); solo si **todos** responden que sí, el coordinador les pide confirmar de verdad (fase de *commit*); si cualquiera falla en la fase de preparación, **todos** hacen rollback.

```java
UserTransaction utx = ...;   // obtenido vía JNDI en un servidor de aplicaciones, o gestionado por
                              // un transaction manager embebido (Atomikos, Narayana) integrado con Spring
utx.begin();
try {
    actualizarBaseDeDatosA(...);
    enviarMensajeAColaJMS(...);   // recurso TRANSACCIONAL DISTINTO, misma unidad atómica
    utx.commit();
} catch (Exception e) {
    utx.rollback();
}
```

**Cuándo de verdad se necesita JTA (y cuándo no):** solo cuando una operación de negocio debe garantizar atomicidad a través de **más de un recurso transaccional heterogéneo** de verdad. Si todo tu trabajo vive dentro de una sola base de datos, las transacciones locales (`@Transactional` de Spring, sección 21.3) son más simples, más rápidas, y perfectamente suficientes — JTA introduce complejidad y costo de coordinación reales (2PC es lento y frágil ante fallos de red a medias), así que **no se adopta "por si acaso"**, sino solo cuando el requisito de negocio de verdad cruza más de un recurso transaccional distinto.

---

## 22. Testing: JUnit 5, Mockito y Spring

### 22.1 JUnit 5 (Jupiter) — anatomía de un test

```java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculadoraTest {

    Calculadora calculadora;

    @BeforeEach   // se ejecuta antes de CADA @Test -- útil para reiniciar estado
    void setUp() { calculadora = new Calculadora(); }

    @Test
    @DisplayName("Sumar dos números positivos")
    void sumaBasica() {
        assertEquals(5, calculadora.sumar(2, 3));
    }

    @Test
    void dividirEntreCeroLanzaExcepcion() {
        assertThrows(ArithmeticException.class, () -> calculadora.dividir(10, 0));
    }

    @Test
    void variasAserciones() {
        assertAll("resultados",
            () -> assertEquals(4, calculadora.sumar(2, 2)),
            () -> assertEquals(0, calculadora.restar(2, 2))
        );   // assertAll ejecuta TODAS las aserciones, incluso si la primera falla -- reporta todos los fallos juntos
    }

    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8})
    void esPar(int numero) {
        assertTrue(calculadora.esPar(numero));
    }

    @Nested   // agrupa tests relacionados, útil para organizar por escenario
    class CuandoElDivisorEsCero {
        @Test
        void lanzaExcepcionEspecifica() { /* ... */ }
    }
}
```

### 22.2 Mockito — dobles de prueba (mocks) para aislar la unidad bajo prueba

```java
@ExtendWith(MockitoExtension.class)
class ServicioPedidosTest {

    @Mock
    RepositorioPedidos repositorio;   // un doble falso, sin lógica real

    @InjectMocks
    ServicioPedidos servicio;          // Mockito inyecta el mock en el constructor/campos automáticamente

    @Test
    void calculaTotalCorrectamente() {
        when(repositorio.buscarPorId(1)).thenReturn(new Pedido(1, 100.0));

        double total = servicio.calcularTotal(1);

        assertEquals(116.0, total);   // asumiendo 16% de IVA
        verify(repositorio).buscarPorId(1);   // verifica que SÍ se llamó, exactamente con ese argumento
    }

    @Test
    void capturaElArgumentoRealUsado() {
        ArgumentCaptor<Pedido> captor = ArgumentCaptor.forClass(Pedido.class);
        servicio.guardar(new Pedido(2, 50.0));
        verify(repositorio).guardar(captor.capture());
        assertEquals(2, captor.getValue().getId());
    }
}
```

**Distinción clave:** un **mock** (Mockito) verifica **interacciones** (¿se llamó tal método, con qué argumentos, cuántas veces?); un **stub** simplemente devuelve datos predefinidos sin verificar nada; un test con `assert` sobre el resultado final, sin mocks, es un test de **estado**. Mockito permite ambos estilos con `when/thenReturn` (stubbing) y `verify` (verificación de interacción).

### 22.3 Spring / Spring Boot — panorama de Inversión de Control

**La idea central:** en vez de que tu código construya sus propias dependencias (`new ServicioX()`), declaras **qué necesitas**, y un contenedor (el *ApplicationContext*) se encarga de construir e **inyectar** esas dependencias — *Inversion of Control* (el framework llama a tu código, no al revés) vía *Dependency Injection*.

```java
@Service
class ServicioPedidos {
    private final RepositorioPedidos repositorio;

    @Autowired   // desde Spring 4.3+, si solo hay UN constructor, @Autowired es opcional aquí
    ServicioPedidos(RepositorioPedidos repositorio) {   // inyección por CONSTRUCTOR: la recomendada
        this.repositorio = repositorio;
    }
}

@Repository
interface RepositorioPedidos extends JpaRepository<Pedido, Long> { }   // Spring Data genera la implementación

@Configuration
class AppConfig {
    @Bean
    public ObjectMapper objectMapper() { return new ObjectMapper(); }   // registra un bean manualmente
}
```

**Por qué inyección por constructor y no por campo (`@Autowired` directo en el campo):** permite que los campos sean `final` (inmutabilidad), hace explícitas las dependencias obligatorias, y sobre todo, **permite testear la clase con `new ServicioPedidos(mockDelRepositorio)` sin necesitar el contenedor de Spring en absoluto** — la clase no sabe ni le importa que existe Spring.

**Testing con Spring Boot:**

```java
@SpringBootTest   // levanta TODO el contexto de Spring -- lento, para tests de integración completos
class AplicacionIntegrationTest { /* ... */ }

@WebMvcTest(PedidosController.class)   // solo levanta la capa web, con MockMvc -- más rápido
class PedidosControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean ServicioPedidos servicio;   // reemplaza el bean real por un mock DENTRO del contexto de Spring

    @Test
    void getDevuelve200() throws Exception {
        mockMvc.perform(get("/pedidos/1"))
               .andExpect(status().isOk());
    }
}

@DataJpaTest   // solo levanta la capa de persistencia (repositorios JPA), con BD en memoria
class RepositorioPedidosTest { /* ... */ }
```

**La pirámide de testing en un proyecto Spring típico:** muchos tests unitarios puros (sin Spring, con Mockito) en la base → menos tests de slice (`@WebMvcTest`, `@DataJpaTest`, cargan solo una porción del contexto) en medio → pocos `@SpringBootTest` de integración completa en la punta (son los más lentos y frágiles).

---

## 23. Preguntas y ejercicios de certificación

Preguntas estilo OCP/OCA (Oracle Certified Professional/Associate) — cada una prueba una trampa conceptual ya cubierta arriba. Intenta responder antes de ver la explicación.

### Pregunta 1
```java
Integer a = 127, b = 127;
Integer c = 128, d = 128;
System.out.println((a == b) + " " + (c == d));
```
<details><summary>Respuesta</summary>

`true false`. El *Integer cache* cubre -128 a 127 (sección 5.2); `127` reutiliza el mismo objeto cacheado, `128` no.
</details>

### Pregunta 2
```java
public static void main(String[] args) {
    try {
        System.out.println("A");
        throw new RuntimeException("boom");
    } finally {
        System.out.println("B");
    }
}
```
¿Qué se imprime, y qué pasa al final?
<details><summary>Respuesta</summary>

Imprime `A` y `B` (el `finally` **siempre** corre, incluso cuando hay una excepción no capturada), y luego el programa termina abruptamente porque nadie capturó el `RuntimeException` — se imprime el stack trace y el proceso sale con código distinto de 0.
</details>

### Pregunta 3
```java
class Padre { static void metodo() { System.out.println("Padre"); } }
class Hijo extends Padre { static void metodo() { System.out.println("Hijo"); } }

Padre p = new Hijo();
p.metodo();
```
<details><summary>Respuesta</summary>

Imprime `Padre`. Los métodos `static` se **ocultan**, no se sobrescriben — se resuelven por el **tipo de la referencia** (`Padre`), no por el tipo real del objeto (sección 6.3). (Nota extra: llamar a un método estático a través de una instancia como `p.metodo()` es válido pero mala práctica — debería llamarse `Padre.metodo()`.)
</details>

### Pregunta 4
```java
List<Integer> lista = List.of(1, 2, 3);
lista.add(4);
```
<details><summary>Respuesta</summary>

Lanza `UnsupportedOperationException`. `List.of(...)` crea una lista **inmutable de verdad** (sección 9.2), a diferencia de `Arrays.asList(...)` (de tamaño fijo, pero permite `set()`) o una `ArrayList` normal.
</details>

### Pregunta 5
```java
double resultado = 0.1 + 0.2;
System.out.println(resultado == 0.3);
```
<details><summary>Respuesta</summary>

`false`. Error de representación binaria en punto flotante (sección 5.5) — nunca compares `double`/`float` con `==` para igualdad exacta; usa un epsilon de tolerancia o `BigDecimal`.
</details>

### Pregunta 6
```java
class A {
    A() { System.out.println("A"); metodo(); }
    void metodo() { System.out.println("metodo de A"); }
}
class B extends A {
    int valor = 10;
    @Override void metodo() { System.out.println("valor=" + valor); }
}
new B();
```
<details><summary>Respuesta</summary>

Imprime `A` y luego `valor=0` (¡no `10`!). El constructor de `A` corre **antes** de que se inicialicen los campos de instancia de `B` (el orden es: campos de la superclase → constructor de la superclase → campos de la subclase → constructor de la subclase). Como `metodo()` está sobrescrito, se invoca la versión de `B` mediante *dynamic dispatch* — pero en ese momento `valor` todavía no fue asignado y vale su default (`0`). **Regla de oro:** nunca llames a un método sobrescribible desde un constructor.
</details>

### Pregunta 7
```java
var lista = new ArrayList<Integer>();
for (var i = 0; i < 5; i++) {
    lista.add(i);
    if (i == 2) lista.remove(Integer.valueOf(2));
}
System.out.println(lista);
```
¿Qué diferencia hay entre `lista.remove(2)` y `lista.remove(Integer.valueOf(2))`?
<details><summary>Respuesta</summary>

`List.remove(int)` está **sobrecargado**: si el argumento es `int` primitivo, se interpreta como **índice** (`remove(int index)`); si es `Integer` (objeto), se interpreta como el **valor** a eliminar (`remove(Object o)`). `Integer.valueOf(2)` fuerza la segunda sobrecarga — elimina el elemento cuyo *valor* es 2, sin importar su posición. Esta ambigüedad es una trampa de examen extremadamente común.
</details>

### Pregunta 8
```java
sealed interface Figura permits Circulo, Cuadrado {}
record Circulo(double r) implements Figura {}
record Cuadrado(double l) implements Figura {}

static double area(Figura f) {
    return switch (f) {
        case Circulo c -> Math.PI * c.r() * c.r();
        case Cuadrado c -> c.l() * c.l();
    };
}
```
¿Por qué este `switch` **no** necesita una cláusula `default`?
<details><summary>Respuesta</summary>

Porque `Figura` es `sealed` con un `permits` que enumera **exhaustivamente** todos sus subtipos posibles (`Circulo`, `Cuadrado`). El compilador sabe que no puede existir ningún otro subtipo de `Figura` en tiempo de compilación, así que puede verificar que el `switch` cubre el 100% de los casos sin necesitar un `default` de respaldo (sección 10.2/11.2).
</details>

### Pregunta 9
```java
class ProcesadorDePedidos {
    void procesar(Pedido pedido) {
        double total = pedido.calcularTotal();                       // regla de negocio
        String html = "<div>Total: " + total + "</div>";             // presentación
        jdbcTemplate.update("INSERT INTO logs VALUES (?)", html);     // persistencia
    }
}
```
¿Qué principio SOLID viola esta clase, y por qué?
<details><summary>Respuesta</summary>

Viola **SRP** (Single Responsibility Principle, sección 14.1): mezcla 3 responsabilidades que cambian por motivos distintos — la regla de cálculo del pedido, el formato de presentación (HTML), y el mecanismo de persistencia (JDBC directo). Un cambio en cualquiera de los 3 (ej. cambiar de HTML a JSON, o de JDBC a otro almacenamiento) obliga a tocar esta misma clase, con el riesgo de romper las otras 2 responsabilidades no relacionadas.
</details>

### Pregunta 10
```java
ThreadLocal<Usuario> CONTEXTO = new ThreadLocal<>();

// Ejecutado dentro de un ExecutorService de tamaño fijo (los hilos se REUTILIZAN entre tareas):
void manejarPeticion(Usuario usuario) {
    CONTEXTO.set(usuario);
    procesarPeticion();
    // sin CONTEXTO.remove() aquí
}
```
¿Qué problema tiene este código en un servidor de aplicaciones de larga duración?
<details><summary>Respuesta</summary>

Es un **memory leak clásico de `ThreadLocal`** (sección 4.8). Como los hilos de un `ExecutorService` se reutilizan entre peticiones, cada hilo retiene indefinidamente el último `Usuario` asignado a través de su `ThreadLocal`, aunque la petición ya haya terminado — la memoria ocupada crece con cada usuario distinto que alguna vez pasó por ese hilo, y además puede "filtrar" datos de un usuario hacia el procesamiento de la siguiente petición en ese mismo hilo. La corrección es llamar a `CONTEXTO.remove()` en un bloque `finally`, exactamente con la misma disciplina que cerrar un recurso.
</details>

### Pregunta 11
```java
String nombre = request.getParameter("nombre");
Statement st = conn.createStatement();
ResultSet rs = st.executeQuery("SELECT * FROM usuarios WHERE nombre = '" + nombre + "'");
```
Si `nombre` llega con el valor `' OR '1'='1`, ¿qué ocurre, y cómo se corrige?
<details><summary>Respuesta</summary>

La consulta final queda como `SELECT * FROM usuarios WHERE nombre = '' OR '1'='1'`, que es **siempre verdadera** — devuelve TODOS los usuarios de la tabla, no solo el que se buscaba. Es una **inyección SQL** (sección 19.3), posible porque el dato del usuario se concatena directamente dentro del texto del SQL. Se corrige usando `PreparedStatement` con parámetros (`?`), que el driver siempre trata como **datos**, nunca como sintaxis SQL ejecutable, sin importar qué contenga el string.
</details>

### Pregunta 12
```java
List<Empleado> empleados = entityManager.createQuery("FROM Empleado", Empleado.class).getResultList();
for (Empleado e : empleados) {
    System.out.println(e.getDepartamento().getNombre());   // @ManyToOne(fetch = FetchType.LAZY)
}
```
Con 500 empleados, ¿cuántas consultas SQL dispara este código, y cómo se reduce a una sola?
<details><summary>Respuesta</summary>

**501 consultas**: 1 para traer los 500 empleados, más 500 adicionales (una por cada `.getDepartamento()`, al acceder al proxy `LAZY` de la relación). Es el clásico **problema N+1** (sección 20.3). Se resuelve con un `JOIN FETCH` explícito en la consulta original (`SELECT e FROM Empleado e JOIN FETCH e.departamento`), que trae empleados y departamentos en una sola consulta con `JOIN`.
</details>

### Pregunta 13
```java
@Service
class ServicioA {
    @Transactional
    public void metodoA() {
        // ...
        this.metodoB();   // llamada DENTRO de la misma clase
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void metodoB() { /* ... */ }
}
```
¿La anotación `@Transactional` de `metodoB()` se respeta cuando se invoca desde `metodoA()` de esta forma?
<details><summary>Respuesta</summary>

**No.** `@Transactional` en Spring se implementa mediante un **proxy** (sección 21.3): las anotaciones solo se aplican en llamadas que pasan **a través del proxy** (es decir, invocaciones que llegan desde OTRO bean gestionado por Spring). Una llamada `this.metodoB()` desde dentro de la propia clase **evita el proxy por completo** — `metodoB()` se ejecutará dentro de la misma transacción (o falta de transacción) de `metodoA()`, ignorando silenciosamente `REQUIRES_NEW`. La solución típica es inyectar el propio bean (o extraer `metodoB()` a otra clase/bean) para que la llamada sí pase por el proxy.
</details>

### Ejercicio 1 (básico) — colecciones y `equals`/`hashCode`
Implementa una clase `Coordenada(int x, int y)` (puedes usar un `record`) y demuestra, con código, por qué agregarla a un `HashSet` y luego buscarla con `contains()` **falla** si solo sobrescribes `equals()` sin `hashCode()` — y cómo un `record` evita el problema por diseño.

### Ejercicio 2 (intermedio) — Streams
Dada una `List<Empleado>` con campos `nombre`, `departamento` y `salario`, escribe una sola expresión de Stream que devuelva un `Map<String, Double>` con el **salario promedio por departamento**, usando `Collectors.groupingBy` + `Collectors.averagingDouble`.

### Ejercicio 3 (avanzado) — concurrencia
Implementa un contador compartido entre 10 hilos que incrementan 100,000 veces cada uno, de 3 formas distintas: (a) sin sincronización (observa el resultado incorrecto), (b) con `synchronized`, (c) con `AtomicInteger`. Mide el tiempo de cada versión y explica el trade-off entre corrección y rendimiento observado.

### Ejercicio 4 (intermedio) — JDBC y seguridad
Escribe un método `buscarUsuarioPorNombre(Connection conn, String nombre)` usando `Statement` con concatenación de strings (deliberadamente vulnerable), demuestra con un valor de entrada que "rompe" la consulta (inyección SQL), y luego refactorízalo a `PreparedStatement`. Explica en una frase por qué la versión corregida es inmune a ese ataque sin importar qué texto se pase como `nombre`.

### Ejercicio 5 (avanzado) — memoria y `ThreadLocal`
Crea un `ExecutorService` de tamaño fijo (2 hilos) y un `ThreadLocal<byte[]>` que, en cada tarea, asigna un arreglo grande (ej. 10 MB) sin llamar nunca a `remove()`. Envía 100 tareas y observa (con `jstat`/`jconsole`/simplemente `Runtime.getRuntime().totalMemory()`) cómo la memoria retenida no baja como debería. Corrige el código agregando `remove()` en un `finally` y vuelve a medir.

---

**Siguiente paso sugerido:** si quieres profundizar más en un área específica (JVM tuning con flags de GC, Spring Security, reactive streams con WebFlux, o preparación específica para el examen OCP 1Z0-829), dilo y se puede extender esta guía con una sección dedicada.
