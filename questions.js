/* Generado por tools/build-question-bank.py. No editar manualmente. */
window.QUESTION_BANK = [
  {
    "id": "java-001",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Qué herramienta compila código fuente Java (.java) a bytecode (.class)?",
    "options": [
      "java",
      "javac",
      "jshell",
      "jlink"
    ],
    "correctIndex": 1,
    "explanation": "javac es el compilador, parte del JDK. 'java' ejecuta bytecode, no lo compila."
  },
  {
    "id": "java-002",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Cuál de estos componentes ejecuta directamente el bytecode Java?",
    "options": [
      "El JDK",
      "El JRE",
      "La JVM",
      "javac"
    ],
    "correctIndex": 2,
    "explanation": "La JVM (Java Virtual Machine) es la que interpreta/compila el bytecode a código nativo en tiempo de ejecución."
  },
  {
    "id": "java-003",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Puede un JRE, por sí solo, compilar un archivo .java?",
    "options": [
      "Sí, siempre pudo",
      "No, el JRE no incluye javac",
      "Solo si se usa jshell",
      "Solo en Java 21+"
    ],
    "correctIndex": 1,
    "explanation": "El JRE trae la JVM y las librerías estándar para EJECUTAR programas, pero no el compilador javac (eso es del JDK)."
  },
  {
    "id": "java-004",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Qué relación describe mejor a JDK, JRE y JVM?",
    "options": [
      "Son tres nombres distintos para la misma cosa",
      "JDK ⊃ JRE ⊃ JVM (el JDK incluye al JRE, que incluye a la JVM)",
      "La JVM incluye al JDK",
      "JRE y JDK son independientes entre sí"
    ],
    "correctIndex": 1,
    "explanation": "El JDK contiene el JRE (para ejecutar) más herramientas de desarrollo (javac, jar, etc.); el JRE contiene la JVM más las librerías estándar."
  },
  {
    "id": "java-005",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Qué significa la frase 'write once, run anywhere' (WORA) aplicada a Java?",
    "options": [
      "Que el código fuente Java corre igual en cualquier IDE",
      "Que el mismo bytecode compilado puede ejecutarse en cualquier plataforma que tenga una JVM",
      "Que no hace falta instalar nada para ejecutar Java",
      "Que Java no necesita compilarse"
    ],
    "correctIndex": 1,
    "explanation": "El bytecode es portable: cualquier JVM (Windows, Linux, macOS) sabe interpretarlo, aunque internamente cada JVM esté compilada para su plataforma."
  },
  {
    "id": "java-006",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "¿Cuál de las siguientes NO es una distribución/implementación de OpenJDK usada en la industria?",
    "options": [
      "Eclipse Temurin (Adoptium)",
      "Amazon Corretto",
      "Azul Zulu",
      "Apache Tomcat"
    ],
    "correctIndex": 3,
    "explanation": "Apache Tomcat es un servidor de aplicaciones (contenedor de servlets), no una distribución de JDK."
  },
  {
    "id": "java-007",
    "category": "java",
    "topic": "JDK/JRE/JVM",
    "question": "Desde Java 11, ¿qué cambió respecto a la distribución del JRE por parte de Oracle?",
    "options": [
      "Se volvió gratuito por primera vez",
      "Oracle dejó de distribuir un JRE descargable por separado",
      "El JRE pasó a incluir javac",
      "Se eliminó por completo la JVM"
    ],
    "correctIndex": 1,
    "explanation": "Desde Java 11 ya no hay un 'JRE' descargable independiente de Oracle; se usa jlink para generar runtimes a medida."
  },
  {
    "id": "java-008",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Qué versión de Java se considera el cambio más grande en la historia del lenguaje por introducir lambdas y Streams?",
    "options": [
      "Java 5",
      "Java 7",
      "Java 8",
      "Java 11"
    ],
    "correctIndex": 2,
    "explanation": "Java 8 (2014) introdujo lambdas, Streams, Optional y el nuevo API java.time — el salto más grande de la historia del lenguaje."
  },
  {
    "id": "java-009",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Qué característica NO se introdujo en Java 5?",
    "options": [
      "Generics",
      "Enums",
      "Autoboxing",
      "Lambdas"
    ],
    "correctIndex": 3,
    "explanation": "Las lambdas llegaron en Java 8. Java 5 introdujo generics, enums, anotaciones, autoboxing, enhanced for-loop y varargs."
  },
  {
    "id": "java-010",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "Desde Java 9, ¿cada cuánto tiempo se lanza una nueva versión mayor del lenguaje?",
    "options": [
      "Cada año",
      "Cada 6 meses",
      "Cada 2 años",
      "Sin fecha fija"
    ],
    "correctIndex": 1,
    "explanation": "Desde Java 9, Oracle adoptó un ciclo de 6 meses (marzo y septiembre), con features que salen cuando están listas."
  },
  {
    "id": "java-011",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Qué significa que una versión de Java sea 'LTS' (Long-Term Support)?",
    "options": [
      "Que es la última versión disponible",
      "Que recibe parches de seguridad por años, a diferencia de las versiones intermedias",
      "Que solo se puede usar en LTS de Linux",
      "Que no tiene nuevas features"
    ],
    "correctIndex": 1,
    "explanation": "Las versiones LTS (8, 11, 17, 21...) reciben soporte y parches por años; las no-LTS solo hasta la siguiente versión (6 meses)."
  },
  {
    "id": "java-012",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Cuáles son, en orden, las versiones LTS clásicas de Java mencionadas como hitos hasta 2023?",
    "options": [
      "8, 9, 10, 11",
      "8, 11, 17, 21",
      "7, 9, 11, 13",
      "6, 8, 10, 12"
    ],
    "correctIndex": 1,
    "explanation": "Las LTS son 8, 11, 17 y 21 (y en adelante cada 2 años: 25, etc.)."
  },
  {
    "id": "java-013",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Qué feature estabilizó Java 21 que había estado en preview en versiones anteriores, permitiendo miles de hilos ligeros?",
    "options": [
      "Records",
      "Sealed classes",
      "Virtual threads (Project Loom)",
      "Módulos (JPMS)"
    ],
    "correctIndex": 2,
    "explanation": "Java 21 estabilizó los virtual threads de Project Loom, además del pattern matching completo para switch."
  },
  {
    "id": "java-014",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿En qué versión se estabilizaron los records, las sealed classes y el pattern matching para instanceof?",
    "options": [
      "Java 8",
      "Java 11",
      "Java 17",
      "Java 21"
    ],
    "correctIndex": 2,
    "explanation": "Java 17 (LTS) marcó la estabilización de records, sealed classes y pattern matching para instanceof, tras haber sido preview desde Java 14-16."
  },
  {
    "id": "java-015",
    "category": "java",
    "topic": "Historia de versiones",
    "question": "¿Qué introdujo Java 10 como novedad principal?",
    "options": [
      "Records",
      "Inferencia de tipo local con 'var'",
      "Sistema de módulos",
      "Virtual threads"
    ],
    "correctIndex": 1,
    "explanation": "Java 10 introdujo 'var' para inferencia de tipo local en variables locales."
  },
  {
    "id": "java-016",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Qué componente de la JVM se encarga de leer y registrar las clases .class en memoria antes de usarlas?",
    "options": [
      "El Garbage Collector",
      "El Class Loader",
      "El JIT Compiler",
      "El Verifier"
    ],
    "correctIndex": 1,
    "explanation": "El Class Loader carga las clases de forma perezosa (lazy), la primera vez que se referencian."
  },
  {
    "id": "java-017",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Qué hace el JIT (Just-In-Time compiler)?",
    "options": [
      "Compila el código fuente .java a bytecode",
      "Compila en tiempo real el bytecode más usado ('hot code') a código máquina nativo para acelerar la ejecución",
      "Verifica la sintaxis del código fuente",
      "Administra la memoria del heap"
    ],
    "correctIndex": 1,
    "explanation": "El JIT detecta el código ejecutado frecuentemente y lo compila a código nativo en tiempo de ejecución, en vez de solo interpretarlo."
  },
  {
    "id": "java-018",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Por qué un programa Java típicamente 'arranca más lento pero corre rápido' con el tiempo?",
    "options": [
      "Porque el disco duro se calienta",
      "Porque el JIT necesita tiempo para detectar y compilar el código más ejecutado a nativo",
      "Porque la JVM se reinicia sola",
      "Porque javac recompila en cada ejecución"
    ],
    "correctIndex": 1,
    "explanation": "El intérprete ejecuta bytecode desde el inicio; el JIT compila a nativo las rutas 'calientes' según se van detectando, ganando velocidad progresivamente."
  },
  {
    "id": "java-019",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Qué verifica la JVM antes de ejecutar cualquier bytecode cargado?",
    "options": [
      "Que el código tenga comentarios",
      "Que el bytecode sea válido y seguro (tipos correctos, sin accesos fuera de rango)",
      "Que el archivo .java exista",
      "Que el usuario tenga permisos de administrador"
    ],
    "correctIndex": 1,
    "explanation": "La verificación de bytecode es una de las razones por las que Java es más resistente a corrupción de memoria que C/C++."
  },
  {
    "id": "java-020",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Cuándo se carga una clase en la JVM?",
    "options": [
      "Todas al iniciar el programa, sin excepción",
      "De forma perezosa (lazy), la primera vez que se referencia realmente",
      "Solo si se declara 'public'",
      "Nunca, se interpretan directamente desde el .java"
    ],
    "correctIndex": 1,
    "explanation": "El Class Loader carga las clases de forma perezosa: no se cargan hasta que el programa realmente las necesita."
  },
  {
    "id": "java-021",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Qué es el bytecode en el contexto de Java?",
    "options": [
      "Código máquina específico de Windows",
      "Un conjunto de instrucciones portables e intermedias que genera javac, ejecutadas por la JVM",
      "El código fuente .java sin comentarios",
      "Un tipo de dato primitivo"
    ],
    "correctIndex": 1,
    "explanation": "El bytecode no es código máquina de ningún procesador específico: es intermedio y portable, interpretado/compilado por la JVM."
  },
  {
    "id": "java-022",
    "category": "java",
    "topic": "JVM interna",
    "question": "¿Qué diferencia principal hay entre HotSpot, GraalVM y Eclipse OpenJ9?",
    "options": [
      "Ninguna, son el mismo producto con distinto nombre",
      "Son implementaciones distintas de la especificación de la JVM",
      "Solo GraalVM puede ejecutar bytecode Java",
      "OpenJ9 no soporta Garbage Collection"
    ],
    "correctIndex": 1,
    "explanation": "La JVM es una especificación; HotSpot (Oracle/OpenJDK), GraalVM y OpenJ9 son implementaciones distintas de esa misma especificación."
  },
  {
    "id": "java-023",
    "category": "java",
    "topic": "JVM interna",
    "question": "Un programa Java compilado en Linux, ¿puede ejecutarse sin recompilar en Windows?",
    "options": [
      "No, hay que recompilar en cada sistema operativo",
      "Sí, siempre que exista una JVM instalada en Windows capaz de interpretar ese bytecode",
      "Solo si se usa la misma versión exacta de Windows",
      "Solo con Java 8"
    ],
    "correctIndex": 1,
    "explanation": "Esa es la esencia de WORA: el .class es portable entre JVMs de distintos sistemas operativos."
  },
  {
    "id": "java-024",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Qué zona de memoria de la JVM guarda las variables locales primitivas y las referencias a objetos?",
    "options": [
      "El Heap",
      "El Stack",
      "El Metaspace",
      "El Method Area compartido"
    ],
    "correctIndex": 1,
    "explanation": "Cada hilo tiene su propio Stack, donde viven las variables locales primitivas y las referencias (no los objetos en sí)."
  },
  {
    "id": "java-025",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Dónde vive el objeto real creado con 'new Estudiante(...)'?",
    "options": [
      "En el Stack",
      "En el Heap",
      "En el Metaspace",
      "En el registro del CPU"
    ],
    "correctIndex": 1,
    "explanation": "Los objetos (instancias, arrays, el contenido de un String) viven en el Heap, compartido entre todos los hilos."
  },
  {
    "id": "java-026",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Qué causa típicamente un StackOverflowError?",
    "options": [
      "Un heap demasiado pequeño",
      "Una recursión sin caso base (o incorrecto) que apila stack frames indefinidamente",
      "Un archivo muy grande al leerlo",
      "Una consulta SQL sin WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Cada llamada a método crea un stack frame nuevo; sin un caso base que la detenga, la recursión agota el stack del hilo."
  },
  {
    "id": "java-027",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Qué hace el Garbage Collector en Java?",
    "options": [
      "Compila el bytecode a código nativo",
      "Libera automáticamente la memoria de objetos del Heap que ya nadie referencia",
      "Verifica la sintaxis del código",
      "Gestiona las conexiones de red"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de C/C++, Java no requiere liberar memoria manualmente (free()/delete); el GC lo hace automáticamente."
  },
  {
    "id": "java-028",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Qué le ocurre a un stack frame cuando el método que lo creó retorna?",
    "options": [
      "Se mueve al Heap",
      "Se destruye automáticamente, liberando sus variables locales",
      "Permanece indefinidamente en el Stack",
      "Se convierte en un objeto"
    ],
    "correctIndex": 1,
    "explanation": "Los stack frames se destruyen automáticamente al retornar del método — es una liberación rápida y determinista, a diferencia del Heap."
  },
  {
    "id": "java-029",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "Si un objeto del Heap ya no tiene ninguna referencia apuntándole, ¿qué ocurre?",
    "options": [
      "Sigue ocupando memoria para siempre",
      "Queda elegible para ser recolectado por el Garbage Collector",
      "Se copia automáticamente al Stack",
      "Lanza una excepción inmediatamente"
    ],
    "correctIndex": 1,
    "explanation": "Un objeto sin referencias vivas es 'basura' y el GC lo recolectará en algún momento futuro, liberando esa memoria."
  },
  {
    "id": "java-030",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "¿Qué tienen en común OutOfMemoryError y StackOverflowError?",
    "options": [
      "Ambos son excepciones checked",
      "Ambos son subclases de Error, no de Exception",
      "Ambos ocurren solo en tiempo de compilación",
      "Ambos se deben siempre a bugs de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "Ambos extienden java.lang.Error: representan problemas graves del entorno/JVM, no errores de lógica de negocio recuperables normalmente."
  },
  {
    "id": "java-031",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Cuál es el resultado de 'int r = 7 / 2;' en Java?",
    "options": [
      "3.5",
      "3",
      "4",
      "Error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Con ambos operandos int, la división es entera y trunca el decimal: 7 / 2 = 3."
  },
  {
    "id": "java-032",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Cuál es el resultado de 'double r = 7 / 2;' en Java?",
    "options": [
      "3.5",
      "3.0",
      "4.0",
      "Error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "'7 / 2' se evalúa PRIMERO como división entera (3), y luego ese 3 se convierte a double (3.0) al asignarse — no da 3.5."
  },
  {
    "id": "java-033",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Cómo se obtiene correctamente 3.5 al dividir dos enteros a=7, b=2?",
    "options": [
      "(double) a / b",
      "a / (double) b",
      "(double) (a / b)",
      "Tanto la opción A como la B son correctas"
    ],
    "correctIndex": 3,
    "explanation": "Convertir cualquiera de los dos operandos a double ANTES de la división evita el truncamiento entero; convertir el resultado ya truncado (opción C) no sirve."
  },
  {
    "id": "java-034",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Qué imprime 'System.out.println(10 % 3);'?",
    "options": [
      "3",
      "1",
      "3.33",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "% es el operador módulo (resto): 10 dividido 3 da 3 con resto 1."
  },
  {
    "id": "java-035",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Cuál de estos NO es un tipo primitivo en Java?",
    "options": [
      "int",
      "boolean",
      "String",
      "char"
    ],
    "correctIndex": 2,
    "explanation": "String es una clase (tipo referencia), no un tipo primitivo — a diferencia de int, boolean, char, double, etc."
  },
  {
    "id": "java-036",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Qué ocurre al ejecutar 'int x = 2147483647; x = x + 1;' (el máximo valor de int)?",
    "options": [
      "Lanza una excepción ArithmeticException",
      "x se desborda (overflow) y pasa a ser un número negativo (-2147483648)",
      "El compilador lo rechaza",
      "x queda en 2147483647 sin cambiar"
    ],
    "correctIndex": 1,
    "explanation": "Los enteros en Java hacen overflow silenciosamente (aritmética modular), sin lanzar excepción: el máximo +1 se convierte en el mínimo negativo."
  },
  {
    "id": "java-037",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Por qué se recomienda BigDecimal en vez de double para cálculos monetarios?",
    "options": [
      "Porque double no puede almacenar números negativos",
      "Porque double usa representación binaria de punto flotante, que introduce errores de redondeo en decimales exactos",
      "Porque BigDecimal es más rápido",
      "Porque double no soporta más de 2 decimales"
    ],
    "correctIndex": 1,
    "explanation": "Los double no pueden representar exactamente muchos decimales (ej. 0.1), acumulando errores de redondeo — crítico en dinero."
  },
  {
    "id": "java-038",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Qué es el 'autoboxing' en Java?",
    "options": [
      "La conversión automática entre un tipo primitivo y su clase wrapper (ej. int a Integer)",
      "La conversión automática de String a int",
      "Un tipo de excepción",
      "Un patrón de diseño estructural"
    ],
    "correctIndex": 0,
    "explanation": "Autoboxing convierte automáticamente, por ejemplo, un 'int' en un 'Integer' cuando se necesita un objeto (ej. en una colección genérica)."
  },
  {
    "id": "java-039",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Qué imprime 'char c = 'A'; System.out.println((int) c);'?",
    "options": [
      "A",
      "65",
      "Error de compilación",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "El char 'A' corresponde al código Unicode/ASCII 65; el cast (int) convierte el carácter a su valor numérico."
  },
  {
    "id": "java-040",
    "category": "java",
    "topic": "Tipos de datos",
    "question": "¿Qué palabra reservada convierte explícitamente un tipo de dato a otro en Java?",
    "options": [
      "convert",
      "as",
      "un cast entre paréntesis, ej. (double) x",
      "transform"
    ],
    "correctIndex": 2,
    "explanation": "Java usa la sintaxis de cast: (tipoDestino) expresión, ej. (double) x, (int) y."
  },
  {
    "id": "java-041",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Cuántas clases puede extender directamente una clase en Java (herencia simple)?",
    "options": [
      "Ninguna",
      "Una sola",
      "Hasta dos",
      "Tantas como interfaces implemente"
    ],
    "correctIndex": 1,
    "explanation": "Java solo permite herencia simple de clases (extends una sola clase), aunque una clase puede implementar varias interfaces."
  },
  {
    "id": "java-042",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué diferencia principal hay entre una clase abstracta y una interfaz (desde Java 8)?",
    "options": [
      "Las interfaces nunca pueden tener métodos con cuerpo",
      "Una clase abstracta puede tener estado (campos) y constructor; una interfaz no puede tener campos de instancia ni constructor",
      "Las clases abstractas no pueden tener métodos abstractos",
      "No hay ninguna diferencia real"
    ],
    "correctIndex": 1,
    "explanation": "Una clase abstracta modela un 'es-un' con estado compartido; una interfaz modela un contrato/capacidad, sin estado propio ni constructor."
  },
  {
    "id": "java-043",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué palabra clave usa una clase para declarar que implementa una interfaz?",
    "options": [
      "extends",
      "implements",
      "inherits",
      "uses"
    ],
    "correctIndex": 1,
    "explanation": "'implements' se usa para interfaces; 'extends' se usa para heredar de una clase (o para que una interfaz extienda otra interfaz)."
  },
  {
    "id": "java-044",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué tipo de método permite que una interfaz tenga un método con cuerpo, desde Java 8?",
    "options": [
      "abstract",
      "default",
      "final",
      "static void"
    ],
    "correctIndex": 1,
    "explanation": "Los métodos 'default' en interfaces (desde Java 8) permiten proveer una implementación por defecto sin romper a las clases que ya la implementaban."
  },
  {
    "id": "java-045",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué es 'dynamic dispatch' (despacho dinámico) en el contexto del polimorfismo?",
    "options": [
      "Que el compilador decide en compilación qué método sobrecargado llamar",
      "Que la JVM decide en tiempo de ejecución qué versión sobrescrita (@Override) de un método ejecutar, según el tipo real del objeto",
      "Un mecanismo de red para distribuir carga",
      "Una técnica de recolección de basura"
    ],
    "correctIndex": 1,
    "explanation": "El despacho dinámico decide en EJECUCIÓN, según el objeto real (no la variable declarada), qué versión sobrescrita del método se invoca."
  },
  {
    "id": "java-046",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "Dado 'Figura f = new Circulo(3.0);' donde Circulo sobrescribe calcularArea(), ¿qué versión de calcularArea() se ejecuta al llamar f.calcularArea()?",
    "options": [
      "La de Figura, porque la variable es de tipo Figura",
      "La de Circulo, porque el objeto real es un Circulo (dynamic dispatch)",
      "Ninguna, produce un error de compilación",
      "Depende del orden de declaración"
    ],
    "correctIndex": 1,
    "explanation": "Aunque la variable esté declarada como Figura, la JVM ejecuta la versión sobrescrita del tipo REAL del objeto: Circulo."
  },
  {
    "id": "java-047",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué es la sobrecarga de métodos (overloading)?",
    "options": [
      "Redefinir en una subclase el comportamiento de un método heredado",
      "Definir varios métodos con el mismo nombre pero distinta lista de parámetros en la misma clase",
      "Declarar un método como 'final'",
      "Usar el mismo nombre de variable en dos métodos distintos"
    ],
    "correctIndex": 1,
    "explanation": "El overloading (sobrecarga) es polimorfismo en TIEMPO DE COMPILACIÓN: mismo nombre, distinta firma de parámetros, decidido por el compilador."
  },
  {
    "id": "java-048",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué significa @Override en Java?",
    "options": [
      "Que el método es privado",
      "Una anotación que indica que el método sobrescribe uno heredado, permitiendo que el compilador verifique la firma",
      "Que el método no puede lanzar excepciones",
      "Que el método es estático"
    ],
    "correctIndex": 1,
    "explanation": "@Override no es obligatoria mecánicamente, pero permite que el compilador detecte errores (ej. una firma mal escrita que no sobrescribe nada realmente)."
  },
  {
    "id": "java-049",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Puede una interfaz en Java (desde Java 8) tener métodos estáticos?",
    "options": [
      "No, nunca",
      "Sí, con la palabra clave 'static'",
      "Solo si la interfaz no tiene otros métodos",
      "Solo en clases abstractas, no en interfaces"
    ],
    "correctIndex": 1,
    "explanation": "Desde Java 8, las interfaces pueden tener métodos 'static' (utilitarios, invocados sobre la interfaz misma) además de 'default'."
  },
  {
    "id": "java-050",
    "category": "java",
    "topic": "POO: clases e interfaces",
    "question": "¿Qué error de diseño describe mejor 'una subclase que sobrescribe un método heredado solo para lanzar UnsupportedOperationException'?",
    "options": [
      "Cumple perfectamente con la herencia",
      "Es una señal típica de violación del Liskov Substitution Principle (LSP)",
      "Es obligatorio en Java para todo @Override",
      "Es la forma correcta de deshabilitar un método heredado"
    ],
    "correctIndex": 1,
    "explanation": "Si la subclase no puede cumplir el contrato del método heredado, probablemente no debería ser subclase de esa jerarquía (viola LSP)."
  },
  {
    "id": "java-051",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Cuál es el modificador de acceso MÁS restrictivo en Java?",
    "options": [
      "public",
      "protected",
      "private",
      "el paquete por defecto (sin modificador)"
    ],
    "correctIndex": 2,
    "explanation": "private solo permite acceso desde dentro de la misma clase; es el más restrictivo de los 4 niveles."
  },
  {
    "id": "java-052",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Qué nivel de acceso tiene un miembro declarado SIN ningún modificador explícito?",
    "options": [
      "public",
      "private",
      "protected",
      "acceso de paquete (package-private): visible solo dentro del mismo paquete"
    ],
    "correctIndex": 3,
    "explanation": "La ausencia de modificador implica visibilidad de paquete: accesible desde cualquier clase del mismo paquete, pero no desde fuera."
  },
  {
    "id": "java-053",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Por qué se considera mala práctica declarar todos los campos como 'public' con getters/setters triviales sin validación?",
    "options": [
      "Porque Java no permite compilar así",
      "Porque no aporta encapsulación real: cualquiera puede poner el objeto en un estado inválido sin control",
      "Porque hace el código más rápido",
      "No es mala práctica, es el estándar recomendado"
    ],
    "correctIndex": 1,
    "explanation": "La encapsulación real no es solo 'usar getters/setters' — requiere que los setters validen invariantes (ej. rechazar un promedio fuera de 0-10)."
  },
  {
    "id": "java-054",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Qué significa que un campo sea 'protected'?",
    "options": [
      "Solo accesible dentro de la misma clase",
      "Accesible desde el mismo paquete Y desde subclases en otros paquetes",
      "Accesible desde cualquier parte del programa",
      "Solo accesible desde métodos static"
    ],
    "correctIndex": 1,
    "explanation": "protected amplía el acceso de paquete para incluir también a las subclases, aunque estén en otro paquete."
  },
  {
    "id": "java-055",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Qué palabra clave impide que una clase sea heredada (extendida)?",
    "options": [
      "static",
      "final",
      "private",
      "sealed (únicamente)"
    ],
    "correctIndex": 1,
    "explanation": "'final' aplicada a una clase impide que otra clase la extienda; aplicada a un método impide que se sobrescriba."
  },
  {
    "id": "java-056",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Para qué sirve 'this' dentro de un constructor como 'this.nombre = nombre;'?",
    "options": [
      "Para llamar al constructor de la superclase",
      "Para distinguir el campo de instancia del parámetro que tiene el mismo nombre",
      "Para declarar una variable estática",
      "Para lanzar una excepción"
    ],
    "correctIndex": 1,
    "explanation": "Cuando el parámetro tiene el mismo nombre que el campo, 'this.nombre' se refiere explícitamente al campo de la instancia, no al parámetro."
  },
  {
    "id": "java-057",
    "category": "java",
    "topic": "Encapsulación y modificadores",
    "question": "¿Qué instrucción se usa en un constructor de subclase para invocar el constructor de la superclase?",
    "options": [
      "this(...)",
      "super(...)",
      "extends(...)",
      "base(...)"
    ],
    "correctIndex": 1,
    "explanation": "super(...) invoca el constructor de la clase padre; debe ser la primera instrucción del constructor de la subclase si se usa."
  },
  {
    "id": "java-058",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué es una expresión lambda en Java?",
    "options": [
      "Una anotación especial",
      "Una forma compacta de escribir una implementación de una interfaz funcional (un solo método abstracto)",
      "Un nuevo tipo primitivo",
      "Un tipo de excepción checked"
    ],
    "correctIndex": 1,
    "explanation": "Las lambdas son azúcar sintáctico para implementar interfaces funcionales (como Runnable, Comparator, o las de java.util.function) sin una clase anónima verbosa."
  },
  {
    "id": "java-059",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué método de Stream transforma cada elemento aplicando una función, produciendo un nuevo Stream?",
    "options": [
      "filter",
      "map",
      "reduce",
      "forEach"
    ],
    "correctIndex": 1,
    "explanation": "map() aplica una función a cada elemento y devuelve un nuevo Stream con los resultados transformados."
  },
  {
    "id": "java-060",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué método de Stream selecciona solo los elementos que cumplen una condición?",
    "options": [
      "map",
      "filter",
      "sorted",
      "collect"
    ],
    "correctIndex": 1,
    "explanation": "filter() recibe un Predicate y conserva únicamente los elementos que lo cumplen (devuelve true)."
  },
  {
    "id": "java-061",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué produce 'lista.stream().collect(Collectors.toList())'?",
    "options": [
      "Un array",
      "Una nueva List con los elementos del stream",
      "Un Optional",
      "Un Map"
    ],
    "correctIndex": 1,
    "explanation": "Collectors.toList() es una operación terminal que acumula los elementos del stream en una nueva List."
  },
  {
    "id": "java-062",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Para qué se introdujo la clase Optional<T> en Java 8?",
    "options": [
      "Para reemplazar por completo a las excepciones",
      "Para representar explícitamente la posible ausencia de un valor, evitando NullPointerException accidentales",
      "Para acelerar el rendimiento de los streams",
      "Para reemplazar a los arrays"
    ],
    "correctIndex": 1,
    "explanation": "Optional obliga al código llamador a considerar explícitamente el caso 'sin valor', en vez de arriesgarse a un NullPointerException silencioso."
  },
  {
    "id": "java-063",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué método de Optional devuelve el valor si existe, o un valor por defecto si está vacío?",
    "options": [
      "get()",
      "orElse(valorPorDefecto)",
      "isPresent()",
      "of(valor)"
    ],
    "correctIndex": 1,
    "explanation": "orElse(valorPorDefecto) devuelve el valor contenido si existe, o el valor por defecto indicado si el Optional está vacío."
  },
  {
    "id": "java-064",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué paquete introdujo Java 8 para reemplazar a las antiguas Date/Calendar, mucho más consistente e inmutable?",
    "options": [
      "java.util.time",
      "java.time",
      "java.date",
      "java.util.date8"
    ],
    "correctIndex": 1,
    "explanation": "java.time (con clases como LocalDate, LocalDateTime, Instant) reemplazó a la problemática API antigua de Date/Calendar."
  },
  {
    "id": "java-065",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Cuál de estas es una operación TERMINAL de un Stream (dispara la ejecución de toda la cadena)?",
    "options": [
      "map",
      "filter",
      "collect",
      "sorted"
    ],
    "correctIndex": 2,
    "explanation": "collect() es una operación terminal; map, filter y sorted son operaciones intermedias (lazy, no se ejecutan hasta que hay una terminal)."
  },
  {
    "id": "java-066",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué característica tienen las operaciones intermedias de un Stream como map() o filter()?",
    "options": [
      "Se ejecutan inmediatamente al llamarlas",
      "Son perezosas (lazy): no hacen nada hasta que se invoca una operación terminal",
      "Modifican la colección original",
      "Solo pueden usarse una vez por programa"
    ],
    "correctIndex": 1,
    "explanation": "Las operaciones intermedias construyen una 'receta' que solo se ejecuta cuando aparece una operación terminal como collect(), forEach() o reduce()."
  },
  {
    "id": "java-067",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué interfaz funcional de java.util.function representa una función que recibe un argumento y devuelve un boolean?",
    "options": [
      "Function<T,R>",
      "Supplier<T>",
      "Predicate<T>",
      "Consumer<T>"
    ],
    "correctIndex": 2,
    "explanation": "Predicate<T> tiene un método test(T t) que devuelve boolean — se usa típicamente en filter()."
  },
  {
    "id": "java-068",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué hace 'lista.stream().reduce(0, (a, b) -> a + b)'?",
    "options": [
      "Filtra los elementos mayores que 0",
      "Suma todos los elementos del stream, empezando desde 0",
      "Ordena la lista",
      "Elimina duplicados"
    ],
    "correctIndex": 1,
    "explanation": "reduce() combina los elementos usando la función dada, acumulando desde el valor inicial (0) — en este caso, una suma."
  },
  {
    "id": "java-069",
    "category": "java",
    "topic": "Java 8",
    "question": "¿Qué interfaz de método permite a una interfaz proveer una implementación de método SIN cuerpo obligatorio para las clases que la implementan?",
    "options": [
      "abstract (obligatorio implementar)",
      "default (opcional sobrescribir)",
      "static",
      "private"
    ],
    "correctIndex": 1,
    "explanation": "Un método 'default' en una interfaz ya trae implementación; las clases implementadoras pueden usarla tal cual o sobrescribirla."
  },
  {
    "id": "java-070",
    "category": "java",
    "topic": "Java 9-11",
    "question": "¿Qué sistema introdujo Java 9 para dividir la plataforma en módulos (Project Jigsaw)?",
    "options": [
      "Maven",
      "JPMS (Java Platform Module System)",
      "Gradle",
      "JNDI"
    ],
    "correctIndex": 1,
    "explanation": "JPMS permite declarar módulos explícitos con 'module-info.java', mejorando encapsulación a nivel de plataforma."
  },
  {
    "id": "java-071",
    "category": "java",
    "topic": "Java 9-11",
    "question": "¿Qué permite hacer 'var' desde Java 10?",
    "options": [
      "Declarar una variable sin especificar su tipo explícito, que el compilador infiere del valor asignado",
      "Declarar una variable que puede cambiar de tipo en tiempo de ejecución",
      "Crear variables globales",
      "Evitar la inicialización de variables"
    ],
    "correctIndex": 0,
    "explanation": "'var' es inferencia de tipo en tiempo de COMPILACIÓN (Java sigue siendo fuertemente tipado) — no es un tipo dinámico como en JavaScript/Python."
  },
  {
    "id": "java-072",
    "category": "java",
    "topic": "Java 9-11",
    "question": "¿Qué herramienta interactiva (REPL) introdujo Java 9 para probar código Java línea por línea?",
    "options": [
      "jlink",
      "jshell",
      "javac -i",
      "jdb"
    ],
    "correctIndex": 1,
    "explanation": "jshell permite ejecutar expresiones y sentencias Java de forma interactiva, sin crear un proyecto completo."
  },
  {
    "id": "java-073",
    "category": "java",
    "topic": "Java 9-11",
    "question": "¿Qué API estándar (sin librerías externas) se agregó en Java 11 para hacer peticiones HTTP?",
    "options": [
      "java.net.http.HttpClient",
      "java.io.HttpConnection",
      "javax.ws.rs.Client",
      "org.apache.http.HttpClient"
    ],
    "correctIndex": 0,
    "explanation": "Java 11 estandarizó HttpClient en java.net.http, reemplazando la necesidad de librerías externas para casos simples."
  },
  {
    "id": "java-074",
    "category": "java",
    "topic": "Java 9-11",
    "question": "¿Qué permite hacer Java 11 respecto a ejecutar un archivo .java sin compilación explícita previa?",
    "options": [
      "Nada nuevo, siempre se pudo",
      "Ejecutar directamente 'java MiClase.java' sin invocar javac por separado, para scripts de un solo archivo",
      "Compilar automáticamente todo un proyecto Maven",
      "Ejecutar código Python embebido"
    ],
    "correctIndex": 1,
    "explanation": "Java 11 permite lanzar directamente un archivo fuente de un solo .java con 'java Archivo.java', útil para scripts rápidos."
  },
  {
    "id": "java-075",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Qué son los 'records' introducidos (estables) en Java 17?",
    "options": [
      "Una forma de guardar logs",
      "Una forma compacta de declarar clases inmutables de solo datos, generando automáticamente constructor, getters, equals/hashCode y toString",
      "Un nuevo tipo de colección",
      "Un reemplazo de las interfaces"
    ],
    "correctIndex": 1,
    "explanation": "Un record como 'record Punto(int x, int y) {}' genera automáticamente el boilerplate típico de una clase de datos inmutable."
  },
  {
    "id": "java-076",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Qué controlan las 'sealed classes' introducidas en Java 17?",
    "options": [
      "El acceso a internet de la clase",
      "Qué clases específicas pueden extender o implementar un tipo, mediante la cláusula 'permits'",
      "El tamaño máximo del heap",
      "La cantidad de hilos concurrentes"
    ],
    "correctIndex": 1,
    "explanation": "Una clase/interfaz 'sealed' declara explícitamente (con 'permits') qué subtipos están autorizados a extenderla — útil para jerarquías cerradas y exhaustivas."
  },
  {
    "id": "java-077",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Qué permite hacer el pattern matching para 'instanceof' (estable desde Java 16/17)?",
    "options": [
      "Verificar el tipo Y hacer el cast automáticamente en una sola expresión: 'if (obj instanceof String s)'",
      "Reemplazar por completo al operador '=='",
      "Ejecutar código en paralelo automáticamente",
      "Evitar el uso de excepciones"
    ],
    "correctIndex": 0,
    "explanation": "'if (obj instanceof String s)' verifica el tipo y, si es verdadero, ya deja disponible la variable 's' con el cast hecho, sin cast manual adicional."
  },
  {
    "id": "java-078",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Qué relación tienen las 'sealed classes' con el principio Open/Closed (OCP) de SOLID?",
    "options": [
      "Ninguna relación",
      "Las sealed classes van deliberadamente en contra de OCP puro: agregar un subtipo nuevo obliga a revisar los switch exhaustivos existentes",
      "Las sealed classes son la implementación exacta de OCP",
      "OCP prohíbe usar sealed classes"
    ],
    "correctIndex": 1,
    "explanation": "Es una tensión consciente: se cambia 'cerrado a modificación' por la garantía del compilador de que ningún caso se olvida — útil cuando el conjunto de variantes es conceptualmente fijo."
  },
  {
    "id": "java-079",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Un record puede tener métodos adicionales además de los generados automáticamente?",
    "options": [
      "No, un record solo puede tener los campos declarados",
      "Sí, puede declarar métodos propios, incluyendo validación en un constructor compacto",
      "Solo métodos static",
      "Solo si implementa Serializable"
    ],
    "correctIndex": 1,
    "explanation": "Los records permiten agregar métodos y hasta un constructor compacto para validar invariantes al construirse."
  },
  {
    "id": "java-080",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Qué palabra clave usa una clase sealed para declarar qué subtipos están permitidos?",
    "options": [
      "allows",
      "extends only",
      "permits",
      "restricted to"
    ],
    "correctIndex": 2,
    "explanation": "La sintaxis es 'sealed class Figura permits Circulo, Cuadrado { ... }'."
  },
  {
    "id": "java-081",
    "category": "java",
    "topic": "Java 17",
    "question": "¿Son los campos de un record modificables (mutables) después de construido?",
    "options": [
      "Sí, con setters generados automáticamente",
      "No, los campos de un record son implícitamente 'final' — son inmutables",
      "Solo si se declara 'mutable'",
      "Depende del tipo de dato"
    ],
    "correctIndex": 1,
    "explanation": "Los records están diseñados para ser inmutables: sus campos son final y no se generan setters, solo accesores de lectura."
  },
  {
    "id": "java-082",
    "category": "java",
    "topic": "Java 21",
    "question": "¿Qué son los 'virtual threads' estabilizados en Java 21 (Project Loom)?",
    "options": [
      "Hilos que solo existen en simulación, sin ejecutar código real",
      "Hilos ligeros gestionados por la JVM (no por el sistema operativo), que permiten crear miles/millones de ellos con bajo costo",
      "Un reemplazo de los hilos del sistema operativo que elimina la concurrencia",
      "Una forma de ejecutar Java sin JVM"
    ],
    "correctIndex": 1,
    "explanation": "Los virtual threads permiten un modelo de concurrencia mucho más económico que los hilos de plataforma (respaldados 1:1 por hilos del SO)."
  },
  {
    "id": "java-083",
    "category": "java",
    "topic": "Java 21",
    "question": "¿Qué feature de Java 21 permite un 'switch' que compara tanto el TIPO como el contenido de un objeto de forma exhaustiva?",
    "options": [
      "Records",
      "Pattern matching completo para switch",
      "Virtual threads",
      "Sequenced collections"
    ],
    "correctIndex": 1,
    "explanation": "El pattern matching para switch (estable en Java 21) permite casos por tipo y por patrón de forma exhaustiva, con soporte para sealed types."
  },
  {
    "id": "java-084",
    "category": "java",
    "topic": "Java 21",
    "question": "¿Qué introdujo Java 21 para dar una interfaz común de 'primero/último elemento' a listas, sets y otras colecciones ordenadas?",
    "options": [
      "JPMS",
      "Sequenced Collections",
      "Virtual threads",
      "Records patterns"
    ],
    "correctIndex": 1,
    "explanation": "Las Sequenced Collections agregan métodos como getFirst(), getLast(), reversed() de forma uniforme a colecciones con orden definido."
  },
  {
    "id": "java-085",
    "category": "java",
    "topic": "Java 21",
    "question": "¿Los virtual threads reemplazan la necesidad de escribir código concurrente correctamente (sincronización, etc.)?",
    "options": [
      "Sí, eliminan por completo la necesidad de pensar en concurrencia",
      "No, siguen requiriendo las mismas precauciones de concurrencia; solo cambian el costo de crear/mantener hilos",
      "Solo aplican a bases de datos",
      "Solo funcionan con Spring Boot"
    ],
    "correctIndex": 1,
    "explanation": "Los virtual threads abaratan la CREACIÓN de hilos masivos, pero la lógica de sincronización, condiciones de carrera, etc. sigue aplicando igual."
  },
  {
    "id": "java-086",
    "category": "java",
    "topic": "Java 21",
    "question": "¿Qué son los 'record patterns' (estabilizados junto con Java 21)?",
    "options": [
      "Una forma de deconstruir un record directamente en un patrón de instanceof/switch, extrayendo sus componentes",
      "Un tipo de excepción",
      "Un algoritmo de ordenamiento",
      "Una anotación de testing"
    ],
    "correctIndex": 0,
    "explanation": "Un record pattern como 'case Punto(int x, int y)' permite extraer x e y directamente al hacer match, sin llamar a los accesores manualmente."
  },
  {
    "id": "java-087",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Cuál es la diferencia principal entre un array (int[]) y un ArrayList<Integer>?",
    "options": [
      "No hay ninguna diferencia real",
      "El array tiene tamaño fijo desde su creación; el ArrayList puede crecer o encogerse dinámicamente",
      "ArrayList es más rápido para todo",
      "Los arrays no pueden contener números"
    ],
    "correctIndex": 1,
    "explanation": "Un array se crea con tamaño fijo; ArrayList maneja internamente un array que redimensiona automáticamente al usar add()/remove()."
  },
  {
    "id": "java-088",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Cuál es la complejidad típica de acceder a un elemento por índice en un ArrayList?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n²)"
    ],
    "correctIndex": 1,
    "explanation": "ArrayList se respalda en un array interno, por lo que el acceso por índice es directo y constante: O(1)."
  },
  {
    "id": "java-089",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Cuál es la complejidad típica de acceder a un elemento por índice en un LinkedList?",
    "options": [
      "O(1)",
      "O(n), porque hay que recorrer nodo por nodo desde el principio o el final",
      "O(log n)",
      "Siempre falla, LinkedList no soporta acceso por índice"
    ],
    "correctIndex": 1,
    "explanation": "LinkedList es una lista doblemente enlazada: para llegar al índice k hay que recorrer nodos secuencialmente, a diferencia del acceso directo de ArrayList."
  },
  {
    "id": "java-090",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué estructura NO garantiza ningún orden particular al iterar sus elementos?",
    "options": [
      "TreeMap",
      "LinkedHashMap",
      "HashMap",
      "Una List cualquiera"
    ],
    "correctIndex": 2,
    "explanation": "HashMap no garantiza orden de iteración; TreeMap ordena por clave, LinkedHashMap mantiene el orden de inserción."
  },
  {
    "id": "java-091",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué estructura mantiene los elementos ORDENADOS según su orden natural o un Comparator?",
    "options": [
      "HashSet",
      "ArrayList",
      "TreeSet",
      "LinkedList"
    ],
    "correctIndex": 2,
    "explanation": "TreeSet (respaldado por un árbol) mantiene sus elementos siempre ordenados, con complejidad O(log n) para inserción/búsqueda."
  },
  {
    "id": "java-092",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué diferencia a un Set de una List en Java?",
    "options": [
      "Set no permite elementos duplicados; List sí los permite",
      "List no permite null; Set sí",
      "Set siempre está ordenado; List nunca",
      "No hay diferencia, son sinónimos"
    ],
    "correctIndex": 0,
    "explanation": "La característica definitoria de Set es que no admite duplicados (según equals()); List sí permite elementos repetidos y mantiene orden de inserción/índice."
  },
  {
    "id": "java-093",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué devuelve 'mapa.getOrDefault(\"clave\", 0)' si \"clave\" no existe en el Map?",
    "options": [
      "null",
      "El valor por defecto indicado (0 en este caso), sin modificar el mapa",
      "Lanza NoSuchElementException",
      "Inserta la clave automáticamente con valor 0"
    ],
    "correctIndex": 1,
    "explanation": "getOrDefault devuelve el valor por defecto si la clave no existe, evitando un NullPointerException al usar el resultado, y sin modificar el mapa."
  },
  {
    "id": "java-094",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué hace 'mapa.putIfAbsent(\"a\", 5)' si la clave \"a\" ya existía con el valor 3?",
    "options": [
      "Sobrescribe el valor con 5",
      "No hace nada: como la clave ya existía, el valor permanece en 3",
      "Lanza una excepción",
      "Elimina la clave"
    ],
    "correctIndex": 1,
    "explanation": "putIfAbsent solo inserta el valor si la clave AÚN NO existe (o está asociada a null); si ya tenía un valor, lo deja intacto."
  },
  {
    "id": "java-095",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Cuál sería la estructura más adecuada para implementar una cola (FIFO) con inserciones/eliminaciones frecuentes en ambos extremos?",
    "options": [
      "ArrayList",
      "LinkedList (implementa Deque)",
      "TreeSet",
      "HashMap"
    ],
    "correctIndex": 1,
    "explanation": "LinkedList implementa la interfaz Deque, ofreciendo operaciones O(1) para agregar/quitar en ambos extremos, ideal para colas/pilas."
  },
  {
    "id": "java-096",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué estructura conviene si necesitas búsquedas por clave lo más rápidas posible y NO te importa el orden?",
    "options": [
      "TreeMap",
      "HashMap",
      "LinkedList",
      "ArrayList recorrido linealmente"
    ],
    "correctIndex": 1,
    "explanation": "HashMap ofrece O(1) promedio para get/put por clave; TreeMap es O(log n) pero mantiene orden, más costoso si el orden no importa."
  },
  {
    "id": "java-097",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué interfaz implementan tanto ArrayList como LinkedList?",
    "options": [
      "Set",
      "List",
      "Map",
      "Queue únicamente"
    ],
    "correctIndex": 1,
    "explanation": "Ambas implementan la interfaz List, aunque con estructuras internas e implicaciones de rendimiento muy distintas."
  },
  {
    "id": "java-098",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué mantiene distinto a LinkedHashMap respecto a un HashMap normal?",
    "options": [
      "LinkedHashMap no permite null",
      "LinkedHashMap conserva el orden de INSERCIÓN al iterar, a diferencia de HashMap",
      "LinkedHashMap es más lento para get() en todos los casos por mucho margen",
      "No hay ninguna diferencia"
    ],
    "correctIndex": 1,
    "explanation": "LinkedHashMap añade una lista enlazada interna que preserva el orden en que se insertaron las claves, algo que HashMap no garantiza."
  },
  {
    "id": "java-099",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Modifica una operación como stream().filter(...) la colección original?",
    "options": [
      "Sí, siempre la modifica in-place",
      "No, los Streams son inmutables respecto a la fuente: producen un nuevo flujo de datos sin alterar la colección original",
      "Solo si la colección es una List",
      "Solo si se usa map() en vez de filter()"
    ],
    "correctIndex": 1,
    "explanation": "Un Stream no modifica la fuente de datos; produce una nueva secuencia derivada, dejando la colección original intacta."
  },
  {
    "id": "java-100",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué ocurre si intentas reutilizar (consumir dos veces) el mismo Stream ya usado en una operación terminal?",
    "options": [
      "Funciona normalmente, como una colección reutilizable",
      "Lanza IllegalStateException: un Stream solo puede consumirse una vez",
      "Se reinicia automáticamente",
      "Devuelve una copia del stream anterior"
    ],
    "correctIndex": 1,
    "explanation": "Un Stream es de un solo uso: tras una operación terminal, queda 'consumido' y cualquier reutilización lanza IllegalStateException."
  },
  {
    "id": "java-101",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué hace Collectors.groupingBy(...) sobre un Stream?",
    "options": [
      "Ordena los elementos",
      "Agrupa los elementos del stream en un Map, según una función clasificadora",
      "Elimina duplicados",
      "Cuenta el total de elementos"
    ],
    "correctIndex": 1,
    "explanation": "groupingBy produce un Map<K, List<T>> (u otra colección) agrupando los elementos según el resultado de la función clasificadora dada."
  },
  {
    "id": "java-102",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Cuál es la interfaz funcional adecuada para una operación que recibe un valor y no devuelve nada (efecto secundario, como imprimir)?",
    "options": [
      "Function<T,R>",
      "Supplier<T>",
      "Consumer<T>",
      "Predicate<T>"
    ],
    "correctIndex": 2,
    "explanation": "Consumer<T> tiene un método accept(T t) sin retorno — usado típicamente en forEach()."
  },
  {
    "id": "java-103",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué hace 'IntStream.rangeClosed(1, 5)'?",
    "options": [
      "Genera 1, 2, 3, 4 (excluye el 5)",
      "Genera 1, 2, 3, 4, 5 (incluye ambos extremos)",
      "Genera solo 1 y 5",
      "Lanza una excepción"
    ],
    "correctIndex": 1,
    "explanation": "rangeClosed incluye AMBOS extremos, a diferencia de range() que excluye el límite superior."
  },
  {
    "id": "java-104",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué devuelve 'stream.anyMatch(x -> x > 10)' sobre una lista vacía?",
    "options": [
      "true",
      "false",
      "Lanza una excepción",
      "null"
    ],
    "correctIndex": 1,
    "explanation": "anyMatch sobre un stream vacío devuelve false por definición: no hay ningún elemento que pueda cumplir la condición."
  },
  {
    "id": "java-105",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué devuelve 'stream.allMatch(x -> x > 10)' sobre una lista vacía?",
    "options": [
      "false",
      "true (vacuously true: no hay ningún elemento que la incumpla)",
      "Lanza una excepción",
      "Depende del tipo de dato"
    ],
    "correctIndex": 1,
    "explanation": "allMatch sobre un stream vacío es 'verdadero por vacuidad': no existe ningún contraejemplo que la haga falsa."
  },
  {
    "id": "java-106",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué tipo de interfaz funcional es Comparator<T>, usada por ejemplo en Collections.sort()?",
    "options": [
      "Una interfaz con un solo método abstracto: compare(T o1, T o2)",
      "Una clase concreta, no una interfaz",
      "Un tipo primitivo especial",
      "Una anotación"
    ],
    "correctIndex": 0,
    "explanation": "Comparator es una interfaz funcional cuyo método abstracto compare(T, T) define el criterio de orden, usable con una lambda o referencia a método."
  },
  {
    "id": "java-107",
    "category": "java",
    "topic": "Streams y funcional",
    "question": "¿Qué método de Stream permite limitar el flujo a los primeros N elementos?",
    "options": [
      "skip(n)",
      "limit(n)",
      "take(n)",
      "first(n)"
    ],
    "correctIndex": 1,
    "explanation": "limit(n) trunca el stream a como máximo n elementos; skip(n) hace lo contrario, descarta los primeros n."
  },
  {
    "id": "java-108",
    "category": "java",
    "topic": "SOLID",
    "question": "¿Qué principio SOLID establece que 'una clase debe tener una, y solo una, razón para cambiar'?",
    "options": [
      "Open/Closed",
      "Single Responsibility Principle",
      "Liskov Substitution",
      "Dependency Inversion"
    ],
    "correctIndex": 1,
    "explanation": "SRP (Single Responsibility Principle) es la 'S' de SOLID: evita mezclar responsabilidades que cambian por motivos distintos en la misma clase."
  },
  {
    "id": "java-109",
    "category": "java",
    "topic": "SOLID",
    "question": "Una clase con métodos calcularTotal(), generarPdf() y guardarEnBaseDeDatos() todos en la misma clase, ¿qué principio viola típicamente?",
    "options": [
      "Liskov Substitution",
      "Single Responsibility Principle",
      "Interface Segregation",
      "Ninguno, es una buena práctica"
    ],
    "correctIndex": 1,
    "explanation": "Mezcla cálculo de negocio, formato de presentación y persistencia: 3 razones de cambio distintas en la misma clase, violando SRP."
  },
  {
    "id": "java-110",
    "category": "java",
    "topic": "SOLID",
    "question": "¿Qué principio dice que 'una entidad debe estar abierta a extensión, pero cerrada a modificación'?",
    "options": [
      "Single Responsibility",
      "Open/Closed Principle",
      "Interface Segregation",
      "Dependency Inversion"
    ],
    "correctIndex": 1,
    "explanation": "OCP: agregar un caso nuevo debería ser agregar código (ej. una clase nueva), no editar código existente y ya probado."
  },
  {
    "id": "java-111",
    "category": "java",
    "topic": "SOLID",
    "question": "Un método con un 'if/else' o 'switch' largo sobre un campo 'tipo', que crece cada vez que aparece un caso nuevo, es señal típica de violar:",
    "options": [
      "Liskov Substitution",
      "Open/Closed Principle",
      "Single Responsibility únicamente",
      "Ningún principio SOLID"
    ],
    "correctIndex": 1,
    "explanation": "La solución típica es reemplazar el condicional por polimorfismo (una interfaz + una clase por caso), permitiendo extender sin modificar código existente."
  },
  {
    "id": "java-112",
    "category": "java",
    "topic": "SOLID",
    "question": "¿Qué garantiza el Liskov Substitution Principle (LSP)?",
    "options": [
      "Que toda clase tenga un único constructor",
      "Que un objeto de una subclase pueda sustituir a uno de la superclase sin alterar la corrección del programa",
      "Que las interfaces sean pequeñas",
      "Que no existan clases abstractas"
    ],
    "correctIndex": 1,
    "explanation": "LSP exige que la sustitución de un tipo padre por un subtipo no rompa las expectativas de comportamiento que el código que lo usa ya tenía."
  },
  {
    "id": "java-113",
    "category": "java",
    "topic": "SOLID",
    "question": "Una subclase Pinguino que sobrescribe volar() para lanzar UnsupportedOperationException, heredando de Ave (que sí implementa volar()), viola:",
    "options": [
      "Interface Segregation Principle",
      "Liskov Substitution Principle",
      "Single Responsibility Principle",
      "Ninguno, es código correcto"
    ],
    "correctIndex": 1,
    "explanation": "Pinguino no puede sustituir a Ave en código que asuma que toda Ave vuela — rompe la expectativa de comportamiento del padre, violando LSP."
  },
  {
    "id": "java-114",
    "category": "java",
    "topic": "SOLID",
    "question": "¿Qué recomienda el Interface Segregation Principle (ISP)?",
    "options": [
      "Usar una única interfaz grande para todo el sistema",
      "Preferir varias interfaces pequeñas y específicas sobre una interfaz 'gorda' con métodos irrelevantes para algunos clientes",
      "Evitar el uso de interfaces por completo",
      "Que toda clase implemente Serializable"
    ],
    "correctIndex": 1,
    "explanation": "ISP busca que ningún cliente se vea forzado a depender de (o implementar) métodos que no necesita."
  },
  {
    "id": "java-115",
    "category": "java",
    "topic": "SOLID",
    "question": "¿Qué principio dice que 'los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones'?",
    "options": [
      "Dependency Inversion Principle",
      "Open/Closed Principle",
      "Single Responsibility Principle",
      "Interface Segregation Principle"
    ],
    "correctIndex": 0,
    "explanation": "DIP: la lógica de negocio (alto nivel) debe depender de una interfaz, no de una implementación concreta (bajo nivel) instanciada con 'new' directamente."
  },
  {
    "id": "java-116",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué patrón de diseño reemplaza un 'if/else' largo sobre un tipo por una familia de clases intercambiables que implementan la misma interfaz?",
    "options": [
      "Singleton",
      "Strategy",
      "Observer",
      "Factory Method"
    ],
    "correctIndex": 1,
    "explanation": "Strategy encapsula distintos algoritmos/comportamientos intercambiables detrás de una interfaz común, evitando condicionales rígidos (conecta con OCP)."
  },
  {
    "id": "java-117",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué garantiza el patrón Singleton?",
    "options": [
      "Que una clase tenga múltiples subclases",
      "Que exista una única instancia de una clase en toda la aplicación, con un punto de acceso global",
      "Que una clase no pueda ser instanciada",
      "Que dos objetos sean siempre iguales"
    ],
    "correctIndex": 1,
    "explanation": "Singleton restringe la instanciación de una clase a un único objeto compartido, accesible globalmente."
  },
  {
    "id": "java-118",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué patrón se usa típicamente para notificar automáticamente a varios objetos ('suscriptores') cuando cambia el estado de otro objeto ('sujeto')?",
    "options": [
      "Observer",
      "Builder",
      "Adapter",
      "Decorator"
    ],
    "correctIndex": 0,
    "explanation": "El patrón Observer define una relación uno-a-muchos: cuando el sujeto cambia, notifica a todos sus observadores registrados."
  },
  {
    "id": "java-119",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué patrón centraliza la lógica de creación de objetos, delegando la decisión de qué clase concreta instanciar?",
    "options": [
      "Factory Method",
      "Observer",
      "Strategy",
      "Decorator"
    ],
    "correctIndex": 0,
    "explanation": "Factory Method encapsula la lógica de 'qué implementación concreta crear', desacoplando al código cliente de las clases concretas."
  },
  {
    "id": "java-120",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Con qué principio SOLID se relaciona más directamente el patrón Strategy?",
    "options": [
      "Single Responsibility Principle únicamente",
      "Open/Closed Principle",
      "Interface Segregation Principle únicamente",
      "No se relaciona con SOLID"
    ],
    "correctIndex": 1,
    "explanation": "Strategy permite agregar un algoritmo/comportamiento nuevo (una clase nueva) sin modificar el código que ya usa la interfaz — la esencia de OCP."
  },
  {
    "id": "java-121",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué patrón permite añadir funcionalidad a un objeto dinámicamente, envolviéndolo, sin modificar su clase original?",
    "options": [
      "Decorator",
      "Singleton",
      "Factory Method",
      "Template Method"
    ],
    "correctIndex": 0,
    "explanation": "Decorator envuelve un objeto con otro que implementa la misma interfaz, añadiendo comportamiento antes/después de delegar al objeto envuelto."
  },
  {
    "id": "java-122",
    "category": "java",
    "topic": "Patrones de diseño",
    "question": "¿Qué mecanismo de la inyección de dependencias (DI) automatiza el contenedor IoC de Spring?",
    "options": [
      "La compilación del bytecode",
      "Conectar automáticamente las implementaciones concretas a las abstracciones que un componente declara necesitar (ej. en su constructor)",
      "La generación de reportes PDF",
      "El manejo de memoria del heap"
    ],
    "correctIndex": 1,
    "explanation": "En vez de que el desarrollador conecte manualmente 'new ServicioX(new ImplementacionY())', el contenedor de Spring decide qué implementación inyectar según configuración — DIP llevado a escala de framework."
  },
  {
    "id": "java-123",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Cuál es la superclase de TODAS las excepciones y errores en Java?",
    "options": [
      "Exception",
      "RuntimeException",
      "Throwable",
      "Error"
    ],
    "correctIndex": 2,
    "explanation": "Throwable es la raíz de la jerarquía; de ella heredan tanto Error como Exception (y de esta última, RuntimeException)."
  },
  {
    "id": "java-124",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué distingue a una excepción 'checked' de una 'unchecked'?",
    "options": [
      "Las checked son más rápidas de lanzar",
      "El compilador OBLIGA a manejar (try/catch o throws) las checked; las unchecked (RuntimeException y subclases) no lo exige",
      "Las unchecked nunca pueden capturarse",
      "No hay diferencia real, es solo terminología"
    ],
    "correctIndex": 1,
    "explanation": "Toda excepción que NO extiende RuntimeException es checked y el compilador exige manejarla explícitamente; RuntimeException y sus subclases son unchecked."
  },
  {
    "id": "java-125",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Es NullPointerException una excepción checked o unchecked?",
    "options": [
      "Checked",
      "Unchecked (extiende RuntimeException)",
      "Ninguna de las dos, es un Error",
      "Depende de la versión de Java"
    ],
    "correctIndex": 1,
    "explanation": "NullPointerException extiende RuntimeException — es unchecked, típicamente indica un bug de programación, no un problema recuperable del entorno."
  },
  {
    "id": "java-126",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué excepción lanza 'arr[arr.length]' sobre un array de longitud 3?",
    "options": [
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "ClassCastException",
      "ArithmeticException"
    ],
    "correctIndex": 1,
    "explanation": "Los índices válidos van de 0 a length-1; arr[length] está un lugar más allá del final, lanzando ArrayIndexOutOfBoundsException."
  },
  {
    "id": "java-127",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué diferencia hay entre 'throw' y 'throws' en Java?",
    "options": [
      "Son sinónimos intercambiables",
      "'throw' lanza una excepción concreta en un punto del código; 'throws' declara en la firma qué excepciones checked puede propagar el método",
      "'throws' lanza la excepción; 'throw' la declara",
      "Ambos solo aplican a excepciones unchecked"
    ],
    "correctIndex": 1,
    "explanation": "'throw new IllegalArgumentException(...)' lanza; 'public void metodo() throws IOException' declara que el método puede propagar esa excepción checked."
  },
  {
    "id": "java-128",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué bloque se ejecuta SIEMPRE, haya o no excepción, tras un try/catch?",
    "options": [
      "else",
      "finally",
      "ensure",
      "always"
    ],
    "correctIndex": 1,
    "explanation": "El bloque finally se ejecuta siempre (salvo casos extremos como System.exit()), tanto si hubo excepción como si no."
  },
  {
    "id": "java-129",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué ocurre si un método recursivo nunca alcanza su caso base?",
    "options": [
      "Se detiene automáticamente tras 1000 llamadas",
      "Lanza StackOverflowError al agotar el espacio de pila del hilo",
      "Devuelve null silenciosamente",
      "El compilador lo rechaza"
    ],
    "correctIndex": 1,
    "explanation": "Cada llamada recursiva apila un stack frame nuevo; sin caso base que detenga la recursión, se agota el stack y se lanza StackOverflowError."
  },
  {
    "id": "java-130",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué tipo de excepción representa típicamente 'un problema esperable del entorno externo, del que el programa puede intentar recuperarse' (ej. archivo no encontrado)?",
    "options": [
      "Una excepción unchecked como NullPointerException",
      "Una excepción checked como IOException",
      "Un Error como OutOfMemoryError",
      "Ninguna excepción, se maneja con un if"
    ],
    "correctIndex": 1,
    "explanation": "IOException es checked precisamente porque representa un fallo externo esperable (archivo ausente, red caída) del que vale la pena intentar recuperarse."
  },
  {
    "id": "java-131",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué principio de buena práctica se rompe si se captura 'catch (Exception e) {}' dejando el bloque vacío?",
    "options": [
      "Se silencia el error sin manejarlo ni registrarlo, ocultando fallos reales del sistema",
      "Es la forma correcta y recomendada de manejar cualquier excepción",
      "Mejora el rendimiento de la aplicación",
      "Convierte la excepción en checked automáticamente"
    ],
    "correctIndex": 0,
    "explanation": "Un catch vacío ('swallow' de la excepción) oculta el problema en vez de resolverlo o registrarlo — dificulta enormemente el diagnóstico de fallos."
  },
  {
    "id": "java-132",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué es una 'condición de carrera' (race condition)?",
    "options": [
      "Un error de sintaxis del compilador",
      "Un escenario donde el resultado de un programa depende del orden/tiempo impredecible en que se intercalan operaciones de hilos concurrentes",
      "Un tipo de excepción checked",
      "Un algoritmo de ordenamiento"
    ],
    "correctIndex": 1,
    "explanation": "Las condiciones de carrera ocurren cuando múltiples hilos acceden/modifican datos compartidos sin la sincronización adecuada, produciendo resultados no deterministas."
  },
  {
    "id": "java-133",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Para qué sirve la palabra clave 'synchronized' en Java?",
    "options": [
      "Para declarar una variable constante",
      "Para garantizar que solo un hilo a la vez pueda ejecutar un bloque/método sobre un mismo objeto de bloqueo (mutex)",
      "Para acelerar la ejecución de un bucle",
      "Para convertir un método en estático"
    ],
    "correctIndex": 1,
    "explanation": "'synchronized' adquiere un lock intrínseco del objeto indicado, serializando el acceso de hilos concurrentes a la sección crítica."
  },
  {
    "id": "java-134",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué diferencia principal hay entre un hilo de plataforma tradicional y un virtual thread (Java 21)?",
    "options": [
      "No hay ninguna diferencia funcional",
      "El virtual thread es gestionado por la JVM (no 1:1 con un hilo del SO), permitiendo crear muchísimos más con menor costo",
      "Los virtual threads no pueden ejecutar código bloqueante",
      "Los virtual threads solo sirven para testing"
    ],
    "correctIndex": 1,
    "explanation": "Los hilos de plataforma están respaldados 1:1 por hilos del sistema operativo (costosos); los virtual threads son mucho más ligeros y gestionados por la JVM."
  },
  {
    "id": "java-135",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué interfaz representa una tarea que se puede ejecutar en otro hilo y devuelve un resultado (a diferencia de Runnable)?",
    "options": [
      "Runnable",
      "Callable<V>",
      "Thread",
      "Executor"
    ],
    "correctIndex": 1,
    "explanation": "Callable<V> tiene un método call() que devuelve un valor de tipo V y puede lanzar excepciones checked, a diferencia de run() en Runnable."
  },
  {
    "id": "java-136",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué es un ExecutorService en el paquete java.util.concurrent?",
    "options": [
      "Una excepción especial de concurrencia",
      "Un framework que gestiona un pool de hilos para ejecutar tareas de forma administrada, sin crear hilos manualmente",
      "Una anotación de Spring",
      "Un tipo de colección"
    ],
    "correctIndex": 1,
    "explanation": "ExecutorService abstrae la creación/gestión de hilos, reutilizando un pool en vez de crear un Thread nuevo por cada tarea."
  },
  {
    "id": "java-137",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué garantiza la palabra clave 'volatile' aplicada a un campo?",
    "options": [
      "Que el campo sea privado",
      "Que las lecturas/escrituras de ese campo sean visibles inmediatamente entre hilos, evitando que cada hilo use una copia cacheada obsoleta",
      "Que el campo no pueda modificarse nunca",
      "Que el campo sea thread-local (exclusivo por hilo)"
    ],
    "correctIndex": 1,
    "explanation": "'volatile' resuelve problemas de VISIBILIDAD entre hilos (no de atomicidad compuesta) al forzar lecturas/escrituras directas a memoria principal."
  },
  {
    "id": "java-138",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué clase de java.util.concurrent.atomic permite incrementar un contador de forma atómica sin usar 'synchronized' explícito?",
    "options": [
      "AtomicInteger",
      "Integer",
      "volatile int",
      "SynchronizedInt"
    ],
    "correctIndex": 0,
    "explanation": "AtomicInteger (y similares) ofrece operaciones atómicas como incrementAndGet() sin necesidad de bloqueos explícitos, usando operaciones a nivel de hardware (CAS)."
  },
  {
    "id": "java-139",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué colección de java.util.concurrent está diseñada para ser segura ante acceso concurrente sin bloquear todo el mapa en cada operación?",
    "options": [
      "HashMap",
      "ConcurrentHashMap",
      "TreeMap",
      "LinkedHashMap"
    ],
    "correctIndex": 1,
    "explanation": "ConcurrentHashMap permite lecturas/escrituras concurrentes con mucho mejor rendimiento que sincronizar manualmente un HashMap completo."
  },
  {
    "id": "java-140",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué problema previene principalmente adquirir siempre los locks en el MISMO orden en distintos hilos?",
    "options": [
      "Los NullPointerException",
      "Los deadlocks (bloqueos mutuos donde dos o más hilos esperan indefinidamente locks que el otro tiene)",
      "Los StackOverflowError",
      "Los errores de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Un deadlock clásico ocurre cuando el Hilo A tiene el Lock 1 y espera el Lock 2, mientras el Hilo B tiene el Lock 2 y espera el Lock 1 — adquirir en orden consistente lo evita."
  },
  {
    "id": "java-141",
    "category": "java",
    "topic": "Archivos y E/S",
    "question": "¿Qué ventaja ofrece 'try-with-resources' al trabajar con un archivo (ej. un BufferedReader)?",
    "options": [
      "Hace el código más lento a propósito",
      "Cierra automáticamente el recurso al salir del bloque try, incluso si ocurre una excepción",
      "Evita tener que declarar el recurso como 'final'",
      "Permite abrir el archivo sin manejar IOException"
    ],
    "correctIndex": 1,
    "explanation": "try-with-resources llama automáticamente a close() sobre cualquier recurso que implemente AutoCloseable, sin necesitar un finally explícito."
  },
  {
    "id": "java-142",
    "category": "java",
    "topic": "Archivos y E/S",
    "question": "¿Qué excepción checked es común al trabajar con archivos que pueden no existir o fallar al leer/escribir?",
    "options": [
      "NullPointerException",
      "IOException",
      "ArithmeticException",
      "ClassCastException"
    ],
    "correctIndex": 1,
    "explanation": "IOException (y sus subclases como FileNotFoundException) es checked, obligando a manejarla o declararla con throws."
  },
  {
    "id": "java-143",
    "category": "java",
    "topic": "Archivos y E/S",
    "question": "¿Qué clase moderna del paquete java.nio.file se prefiere hoy sobre la antigua java.io.File para operaciones de archivo?",
    "options": [
      "Path (junto con Files)",
      "String",
      "Scanner únicamente",
      "InputStream sin Path"
    ],
    "correctIndex": 0,
    "explanation": "java.nio.file.Path junto con la clase utilitaria Files ofrece una API más moderna y completa que la antigua java.io.File."
  },
  {
    "id": "java-144",
    "category": "java",
    "topic": "Archivos y E/S",
    "question": "¿Qué interfaz deben implementar los recursos usados dentro de un try-with-resources?",
    "options": [
      "Serializable",
      "AutoCloseable (o su subinterfaz Closeable)",
      "Comparable",
      "Runnable"
    ],
    "correctIndex": 1,
    "explanation": "try-with-resources llama automáticamente al método close() definido por la interfaz AutoCloseable al finalizar el bloque."
  },
  {
    "id": "java-145",
    "category": "java",
    "topic": "Archivos y E/S",
    "question": "¿Qué método de la clase utilitaria Files permite leer todas las líneas de un archivo de texto en una List<String> de una vez?",
    "options": [
      "Files.readAllLines(path)",
      "Files.open(path)",
      "Files.scan(path)",
      "Files.toList(path)"
    ],
    "correctIndex": 0,
    "explanation": "Files.readAllLines(Path) lee el archivo completo y devuelve sus líneas como una List<String>, ideal para archivos de tamaño moderado."
  },
  {
    "id": "java-146",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Por qué se recomienda SIEMPRE usar PreparedStatement en vez de concatenar Strings para construir SQL con datos de entrada?",
    "options": [
      "Porque PreparedStatement es más lento pero más 'elegante'",
      "Porque previene inyección SQL: el valor se envía como dato, nunca se interpreta como parte del comando SQL",
      "Porque Statement no permite SELECT",
      "No hay diferencia real de seguridad"
    ],
    "correctIndex": 1,
    "explanation": "Con PreparedStatement y parámetros (?), el driver envía el valor como DATO puro, imposibilitando que un atacante altere la estructura de la consulta."
  },
  {
    "id": "java-147",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Cuál es el valor por defecto de 'autoCommit' en una Connection de JDBC recién obtenida?",
    "options": [
      "false: hay que confirmar manualmente cada sentencia",
      "true: cada sentencia se confirma (COMMIT) automáticamente por sí sola",
      "Depende del driver, nunca tiene un default",
      "No existe el concepto de autoCommit en JDBC"
    ],
    "correctIndex": 1,
    "explanation": "JDBC inicia con autoCommit=true; para agrupar varias sentencias en una transacción atómica hay que desactivarlo con setAutoCommit(false)."
  },
  {
    "id": "java-148",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Qué método de Connection se usa para deshacer los cambios pendientes de una transacción?",
    "options": [
      "conn.commit()",
      "conn.rollback()",
      "conn.close()",
      "conn.undo()"
    ],
    "correctIndex": 1,
    "explanation": "rollback() revierte todos los cambios pendientes desde el último commit (o desde el inicio de la transacción)."
  },
  {
    "id": "java-149",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Qué interfaz de JDBC representa el resultado de ejecutar una consulta SELECT?",
    "options": [
      "Statement",
      "Connection",
      "ResultSet",
      "DriverManager"
    ],
    "correctIndex": 2,
    "explanation": "ResultSet representa el cursor sobre las filas devueltas por una consulta, recorrido típicamente con rs.next()."
  },
  {
    "id": "java-150",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Qué método se usa en un PreparedStatement para asignar el primer parámetro '?' a un valor entero?",
    "options": [
      "ps.setInt(1, valor)",
      "ps.setInt(0, valor)",
      "ps.bindInt(1, valor)",
      "ps.param(1, valor)"
    ],
    "correctIndex": 0,
    "explanation": "Los índices de parámetros en JDBC empiezan en 1 (no en 0), a diferencia de los índices de array/lista en Java."
  },
  {
    "id": "java-151",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Qué patrón de código es indispensable para no agotar las conexiones disponibles a la base de datos?",
    "options": [
      "Nunca cerrar la Connection explícitamente",
      "Cerrar Connection/Statement/ResultSet (idealmente con try-with-resources) tan pronto como ya no se necesiten",
      "Abrir una Connection nueva por cada fila procesada",
      "Usar solo Statement, nunca PreparedStatement"
    ],
    "correctIndex": 1,
    "explanation": "Las conexiones son un recurso limitado; no cerrarlas provoca fugas de recursos (connection leaks) que eventualmente agotan el pool disponible."
  },
  {
    "id": "java-152",
    "category": "java",
    "topic": "JDBC",
    "question": "¿Qué configura conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED) desde Java?",
    "options": [
      "El tamaño del pool de conexiones",
      "El nivel de aislamiento de la transacción para esa conexión",
      "El timeout de la consulta",
      "El driver JDBC a usar"
    ],
    "correctIndex": 1,
    "explanation": "Permite controlar, desde código Java, qué nivel de aislamiento (READ_COMMITTED, SERIALIZABLE, etc.) tendrá la transacción de esa conexión."
  },
  {
    "id": "java-153",
    "category": "java",
    "topic": "ORM / Hibernate",
    "question": "¿Qué problema principal resuelve un ORM (Object-Relational Mapping) como Hibernate/JPA?",
    "options": [
      "Reemplazar por completo a SQL sin necesidad de una base de datos",
      "El 'impedance mismatch': mapear automáticamente objetos Java a filas/tablas relacionales y viceversa",
      "Acelerar la red",
      "Sustituir a JDBC como protocolo de bajo nivel"
    ],
    "correctIndex": 1,
    "explanation": "Un ORM automatiza la traducción entre el modelo de objetos de Java y el modelo relacional de tablas/filas, reduciendo código repetitivo de mapeo manual."
  },
  {
    "id": "java-154",
    "category": "java",
    "topic": "ORM / Hibernate",
    "question": "¿Qué anotación de JPA marca una clase Java como mapeada a una tabla de base de datos?",
    "options": [
      "@Table únicamente, sin @Entity",
      "@Entity",
      "@Repository",
      "@Component"
    ],
    "correctIndex": 1,
    "explanation": "@Entity marca la clase como una entidad JPA gestionada; @Table (opcional) especifica el nombre de tabla si difiere del nombre de la clase."
  },
  {
    "id": "java-155",
    "category": "java",
    "topic": "ORM / Hibernate",
    "question": "¿Qué riesgo de rendimiento es clásico en Hibernate al recorrer una colección de entidades con relaciones asociadas sin cuidado?",
    "options": [
      "El problema N+1: una consulta adicional por cada entidad para cargar su asociación, en vez de una sola consulta con JOIN",
      "Un StackOverflowError garantizado",
      "Una fuga de memoria en el Stack",
      "Ninguno, Hibernate siempre optimiza automáticamente"
    ],
    "correctIndex": 0,
    "explanation": "El problema N+1 ocurre cuando cargar N entidades dispara N consultas adicionales para sus relaciones, en vez de resolverlo con un JOIN o fetch adecuado."
  },
  {
    "id": "java-156",
    "category": "java",
    "topic": "ORM / Hibernate",
    "question": "¿Qué representa el 'Persistence Context' (o Session) en Hibernate/JPA?",
    "options": [
      "Una conexión de red permanente",
      "Una caché de primer nivel que rastrea las entidades gestionadas dentro de una unidad de trabajo/transacción",
      "Un archivo de configuración XML",
      "Un tipo de excepción"
    ],
    "correctIndex": 1,
    "explanation": "El Persistence Context mantiene el estado de las entidades 'gestionadas', detectando cambios automáticamente (dirty checking) para sincronizarlos con la base de datos."
  },
  {
    "id": "java-157",
    "category": "java",
    "topic": "ORM / Hibernate",
    "question": "¿Qué estrategia de carga ('fetch') trae también las asociaciones inmediatamente al cargar la entidad principal, en vez de retrasarlo hasta que se acceda a ellas?",
    "options": [
      "LAZY",
      "EAGER",
      "NONE",
      "DEFERRED"
    ],
    "correctIndex": 1,
    "explanation": "FetchType.EAGER carga la asociación de inmediato; LAZY la retrasa hasta que realmente se accede a ella (pudiendo causar el problema N+1 si se usa sin cuidado)."
  },
  {
    "id": "java-158",
    "category": "java",
    "topic": "Transacciones (Java)",
    "question": "¿Qué ocurre si un método anotado con @Transactional en Spring se invoca desde DENTRO de la misma clase (this.metodo())?",
    "options": [
      "Funciona exactamente igual que si viniera de otro bean",
      "La anotación NO se aplica: al no pasar por el proxy de Spring, no hay demarcación transaccional",
      "Lanza una excepción de compilación",
      "Spring lo detecta y lo corrige automáticamente"
    ],
    "correctIndex": 1,
    "explanation": "@Transactional se implementa con un proxy (AOP); una llamada interna (this.metodo()) evita el proxy y la anotación se ignora silenciosamente."
  },
  {
    "id": "java-159",
    "category": "java",
    "topic": "Transacciones (Java)",
    "question": "Por defecto, ¿ante qué tipo de excepción hace rollback automático @Transactional de Spring?",
    "options": [
      "Ante cualquier Throwable, sin excepción",
      "Ante excepciones unchecked (RuntimeException y sus subclases), no ante checked por defecto",
      "Nunca hace rollback automático",
      "Solo ante SQLException"
    ],
    "correctIndex": 1,
    "explanation": "Por defecto, @Transactional solo revierte ante RuntimeException; para checked hay que ser explícito con rollbackFor."
  },
  {
    "id": "java-160",
    "category": "java",
    "topic": "Transacciones (Java)",
    "question": "¿Cuándo se justifica usar JTA (Java Transaction API) en vez de transacciones locales simples?",
    "options": [
      "Siempre, por si acaso se necesita en el futuro",
      "Solo cuando una operación de negocio debe ser atómica a través de más de un recurso transaccional heterogéneo distinto (ej. dos bases de datos, o BD + cola de mensajes)",
      "Solo para aplicaciones de un solo usuario",
      "JTA reemplazó por completo a JDBC"
    ],
    "correctIndex": 1,
    "explanation": "JTA introduce complejidad real (2PC) que solo se justifica cuando de verdad se cruzan múltiples recursos transaccionales heterogéneos a la vez."
  },
  {
    "id": "java-161",
    "category": "java",
    "topic": "Transacciones (Java)",
    "question": "¿Qué protocolo clásico coordina JTA para garantizar atomicidad entre varios recursos (Two-Phase Commit)?",
    "options": [
      "Round-robin",
      "2PC: fase de 'prepare' seguida de fase de 'commit' solo si todos los recursos confirmaron poder comprometerse",
      "TCP handshake de 3 vías",
      "OAuth2"
    ],
    "correctIndex": 1,
    "explanation": "En 2PC, el coordinador pregunta primero a todos los recursos si pueden comprometerse (prepare); solo si todos dicen que sí, ordena el commit final a todos."
  },
  {
    "id": "java-162",
    "category": "java",
    "topic": "Transacciones (Java)",
    "question": "¿Qué nivel de aislamiento en Java/Spring, siendo el más estricto, previene dirty reads, non-repeatable reads Y phantom reads simultáneamente?",
    "options": [
      "READ_UNCOMMITTED",
      "READ_COMMITTED",
      "REPEATABLE_READ",
      "SERIALIZABLE"
    ],
    "correctIndex": 3,
    "explanation": "SERIALIZABLE es el nivel más estricto, previniendo los 3 fenómenos, típicamente a costa de mayor contención y menor throughput."
  },
  {
    "id": "java-163",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué anotación de JUnit 5 marca un método que debe ejecutarse ANTES de cada prueba individual?",
    "options": [
      "@BeforeAll",
      "@BeforeEach",
      "@Test",
      "@AfterEach"
    ],
    "correctIndex": 1,
    "explanation": "@BeforeEach se ejecuta antes de CADA método @Test, típicamente para reiniciar el estado (ej. crear un objeto nuevo bajo prueba)."
  },
  {
    "id": "java-164",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué diferencia hay entre un Stub y un Mock, como dobles de prueba?",
    "options": [
      "Son sinónimos exactos",
      "Un Stub solo devuelve respuestas predefinidas; un Mock además permite VERIFICAR que fue invocado correctamente (con qué argumentos, cuántas veces)",
      "Un Mock nunca puede devolver un valor",
      "Un Stub siempre lanza excepciones"
    ],
    "correctIndex": 1,
    "explanation": "La distinción clave: 'when(...).thenReturn(...)' es modo stub (solo respuesta); 'verify(...)' es lo que confirma la interacción, propio de un mock."
  },
  {
    "id": "java-165",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué hace @Mock de Mockito?",
    "options": [
      "Crea una instancia real de la clase, ejecutando su lógica real",
      "Crea un doble de prueba (objeto simulado) de una dependencia, sin lógica real por defecto",
      "Marca un método como prueba a ejecutar",
      "Configura la base de datos de prueba"
    ],
    "correctIndex": 1,
    "explanation": "@Mock crea un objeto simulado (sin comportamiento real) que se puede programar con when()/thenReturn() y verificar con verify()."
  },
  {
    "id": "java-166",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué principio de la pirámide de pruebas indica que debe haber MUCHAS pruebas unitarias y POCAS pruebas E2E?",
    "options": [
      "Porque las E2E son gratis de mantener",
      "Porque las E2E son las más lentas y frágiles ante cambios, mientras las unitarias son rápidas y baratas de mantener",
      "Porque JUnit no soporta pruebas E2E",
      "No es una recomendación real"
    ],
    "correctIndex": 1,
    "explanation": "Invertir la pirámide (pocas unitarias, muchas E2E) produce suites lentas y llenas de falsos negativos ante cualquier cambio de UI."
  },
  {
    "id": "java-167",
    "category": "java",
    "topic": "Testing",
    "question": "En el ciclo TDD (Rojo-Verde-Refactor), ¿qué ocurre en el paso 'Verde'?",
    "options": [
      "Se escribe una prueba que falla",
      "Se escribe el código de producción MÍNIMO necesario para que la prueba pase",
      "Se mejora el diseño sin cambiar el comportamiento",
      "Se elimina la prueba"
    ],
    "correctIndex": 1,
    "explanation": "El paso Verde consiste en escribir solo el código mínimo que hace pasar la prueba que acababa de fallar en el paso Rojo — nada más."
  },
  {
    "id": "java-168",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué letra del principio FIRST de buenas pruebas exige que el resultado de una prueba NO dependa de que otra se haya ejecutado antes?",
    "options": [
      "Fast",
      "Independent",
      "Repeatable",
      "Timely"
    ],
    "correctIndex": 1,
    "explanation": "Independent exige que cada prueba sea aislada del resto: su resultado no debe depender del orden de ejecución ni del estado dejado por otra prueba."
  },
  {
    "id": "java-169",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué mide la cobertura de código (code coverage) con herramientas como JaCoCo?",
    "options": [
      "Qué tan buenas son las aserciones de las pruebas",
      "Qué porcentaje de líneas/ramas del código de producción se EJECUTAN al correr la suite de pruebas",
      "El tiempo total que tarda la suite en correr",
      "La cantidad de bugs encontrados"
    ],
    "correctIndex": 1,
    "explanation": "100% de cobertura solo significa que cada línea se ejecutó al menos una vez, NO que se verificó correctamente con una aserción significativa."
  },
  {
    "id": "java-170",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué anotación de Spring permite probar un controlador REST sin levantar un servidor HTTP real?",
    "options": [
      "@SpringBootTest completo",
      "@WebMvcTest junto con MockMvc",
      "@Entity",
      "@Autowired sin más contexto"
    ],
    "correctIndex": 1,
    "explanation": "@WebMvcTest levanta solo la capa web y permite usar MockMvc para simular peticiones HTTP directamente contra los controladores, sin un puerto real."
  },
  {
    "id": "java-171",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué usa Testcontainers para las pruebas de integración con una base de datos?",
    "options": [
      "Una base de datos en memoria como H2, simulando el motor real",
      "Docker, para levantar una base de datos REAL (ej. PostgreSQL) durante las pruebas y destruirla al terminar",
      "Mocks de Mockito para simular JDBC",
      "Un archivo de texto plano"
    ],
    "correctIndex": 1,
    "explanation": "Testcontainers evita el problema de 'en las pruebas pasaba, en producción falló' al usar el motor real (vía Docker) en vez de uno simulado como H2."
  },
  {
    "id": "java-172",
    "category": "java",
    "topic": "Testing",
    "question": "¿Qué estructura de 3 bloques se recomienda para organizar claramente cada prueba unitaria?",
    "options": [
      "Import, Class, Method",
      "Arrange, Act, Assert (AAA)",
      "Setup, Run, Teardown únicamente sin aserciones",
      "Given, When, Then, And, But"
    ],
    "correctIndex": 1,
    "explanation": "AAA divide la prueba en: preparar el escenario (Arrange), ejecutar la acción bajo prueba (Act), y verificar el resultado (Assert), en ese orden."
  },
  {
    "id": "sql-001",
    "category": "sql",
    "topic": "Introducción a SQL",
    "question": "¿Qué significa SQL?",
    "options": [
      "Structured Query Language",
      "Sequential Query Logic",
      "System Query Language",
      "Standard Question Language"
    ],
    "correctIndex": 0,
    "explanation": "SQL (Structured Query Language) es el lenguaje estándar para gestionar y consultar bases de datos relacionales."
  },
  {
    "id": "sql-002",
    "category": "sql",
    "topic": "Introducción a SQL",
    "question": "¿En qué categoría se clasifica el comando SELECT?",
    "options": [
      "DDL (Data Definition Language)",
      "DQL (Data Query Language)",
      "DCL (Data Control Language)",
      "TCL (Transaction Control Language)"
    ],
    "correctIndex": 1,
    "explanation": "SELECT pertenece a DQL: el lenguaje para consultar/extraer datos, sin modificar estructura ni datos."
  },
  {
    "id": "sql-003",
    "category": "sql",
    "topic": "Introducción a SQL",
    "question": "¿En qué categoría se clasifican CREATE, ALTER y DROP?",
    "options": [
      "DML",
      "DDL (Data Definition Language)",
      "DQL",
      "TCL"
    ],
    "correctIndex": 1,
    "explanation": "DDL define la ESTRUCTURA de los objetos de la base de datos (tablas, índices, vistas), a diferencia de DML que manipula datos."
  },
  {
    "id": "sql-004",
    "category": "sql",
    "topic": "Introducción a SQL",
    "question": "¿En qué categoría se clasifican INSERT, UPDATE y DELETE?",
    "options": [
      "DML (Data Manipulation Language)",
      "DDL",
      "DCL",
      "TCL"
    ],
    "correctIndex": 0,
    "explanation": "DML manipula los DATOS dentro de estructuras ya existentes, sin cambiar la estructura de las tablas."
  },
  {
    "id": "sql-005",
    "category": "sql",
    "topic": "Introducción a SQL",
    "question": "¿Qué categoría de comandos SQL controla quién puede hacer qué dentro de la base de datos (GRANT/REVOKE)?",
    "options": [
      "DDL",
      "DML",
      "DCL (Data Control Language)",
      "DQL"
    ],
    "correctIndex": 2,
    "explanation": "DCL (Data Control Language) gestiona privilegios y permisos: GRANT otorga, REVOKE quita."
  },
  {
    "id": "sql-006",
    "category": "sql",
    "topic": "Arquitectura Oracle",
    "question": "En Oracle, ¿qué representa un 'schema' (esquema)?",
    "options": [
      "Un archivo de configuración del sistema operativo",
      "La colección de objetos (tablas, vistas, secuencias, etc.) que pertenecen a un usuario específico",
      "Un tipo de índice",
      "Una sola tabla"
    ],
    "correctIndex": 1,
    "explanation": "En Oracle, cada usuario tiene su propio schema: el conjunto de objetos que le pertenecen y que puede crear/gestionar."
  },
  {
    "id": "sql-007",
    "category": "sql",
    "topic": "Arquitectura Oracle",
    "question": "¿Qué tabla especial de Oracle se usa para hacer SELECT de expresiones que no dependen de ninguna tabla real (ej. SELECT SYSDATE FROM dual)?",
    "options": [
      "SYSTEM",
      "DUAL",
      "TEMP",
      "DEFAULT"
    ],
    "correctIndex": 1,
    "explanation": "DUAL es una tabla ficticia de una sola fila y columna, usada por convención para evaluar expresiones/funciones sin necesitar una tabla real."
  },
  {
    "id": "sql-008",
    "category": "sql",
    "topic": "Arquitectura Oracle",
    "question": "¿Qué usuario administrador de Oracle tiene privilegios totales sobre toda la base de datos?",
    "options": [
      "RRHH",
      "SYSTEM/SYS",
      "PUBLIC",
      "DUAL"
    ],
    "correctIndex": 1,
    "explanation": "SYS y SYSTEM son las cuentas administrativas por defecto de Oracle, con privilegios extensos sobre toda la instancia."
  },
  {
    "id": "sql-009",
    "category": "sql",
    "topic": "Arquitectura Oracle",
    "question": "¿Qué es un 'tablespace' en Oracle?",
    "options": [
      "Un tipo de dato numérico",
      "Una unidad lógica de almacenamiento que agrupa archivos físicos donde se guardan los datos de los objetos",
      "Un tipo de JOIN",
      "Una vista del diccionario de datos"
    ],
    "correctIndex": 1,
    "explanation": "Un tablespace es la unidad lógica de almacenamiento en Oracle; los objetos (tablas, índices) se crean 'dentro' de un tablespace, que a su vez mapea a archivos físicos."
  },
  {
    "id": "sql-010",
    "category": "sql",
    "topic": "Arquitectura Oracle",
    "question": "¿Qué comando otorga a un usuario nuevo el privilegio mínimo para poder simplemente conectarse a la base de datos?",
    "options": [
      "GRANT CREATE TABLE",
      "GRANT CREATE SESSION",
      "GRANT DBA",
      "GRANT SELECT"
    ],
    "correctIndex": 1,
    "explanation": "CREATE SESSION es el privilegio de sistema mínimo indispensable para que un usuario pueda iniciar sesión en la base de datos."
  },
  {
    "id": "sql-011",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "En el esquema de práctica RRHH, ¿qué tipo de relación existe entre DEPARTAMENTOS y EMPLEADOS?",
    "options": [
      "Muchos a muchos (N:M)",
      "Uno a muchos (1:N): un departamento tiene muchos empleados",
      "Uno a uno (1:1)",
      "No existe relación entre esas tablas"
    ],
    "correctIndex": 1,
    "explanation": "Un departamento puede tener muchos empleados, pero cada empleado pertenece (típicamente) a un solo departamento — relación 1:N."
  },
  {
    "id": "sql-012",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "¿Qué tabla intermedia resuelve la relación muchos-a-muchos entre EMPLEADOS y PROYECTOS?",
    "options": [
      "DEPARTAMENTOS",
      "PUESTOS",
      "EMPLEADO_PROYECTO",
      "No hace falta tabla intermedia"
    ],
    "correctIndex": 2,
    "explanation": "EMPLEADO_PROYECTO tiene una clave primaria compuesta (id_empleado, id_proyecto) que resuelve la relación N:M entre EMPLEADOS y PROYECTOS."
  },
  {
    "id": "sql-013",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "¿Qué representa la columna id_jefe dentro de la propia tabla EMPLEADOS?",
    "options": [
      "Una clave foránea que apunta a la tabla DEPARTAMENTOS",
      "Una auto-referencia: una clave foránea que apunta a otra fila de la MISMA tabla EMPLEADOS",
      "Un campo calculado automáticamente",
      "Un tipo de índice"
    ],
    "correctIndex": 1,
    "explanation": "id_jefe referencia a id_empleado de la misma tabla (auto-referencia), modelando que el jefe de un empleado también es un empleado."
  },
  {
    "id": "sql-014",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "¿Qué tabla del esquema RRHH funciona como catálogo de cargos con su rango salarial (salario_minimo/salario_maximo)?",
    "options": [
      "DEPARTAMENTOS",
      "PUESTOS",
      "PROYECTOS",
      "EMPLEADO_PROYECTO"
    ],
    "correctIndex": 1,
    "explanation": "PUESTOS es el catálogo de puestos de trabajo, con id_puesto, titulo_puesto, salario_minimo y salario_maximo."
  },
  {
    "id": "sql-015",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "¿Qué columnas forman la clave primaria compuesta de EMPLEADO_PROYECTO?",
    "options": [
      "Solo id_empleado",
      "Solo id_proyecto",
      "id_empleado + id_proyecto juntos",
      "id_empleado + rol"
    ],
    "correctIndex": 2,
    "explanation": "La combinación (id_empleado, id_proyecto) identifica de forma única cada asignación de un empleado a un proyecto — típico de tablas intermedias N:M."
  },
  {
    "id": "sql-016",
    "category": "sql",
    "topic": "Esquema RRHH",
    "question": "¿Qué tipo de relación existe entre DEPARTAMENTOS y PROYECTOS en el esquema RRHH?",
    "options": [
      "Muchos a muchos",
      "Uno a muchos: un departamento puede tener muchos proyectos",
      "Uno a uno",
      "No hay relación"
    ],
    "correctIndex": 1,
    "explanation": "PROYECTOS tiene una FK id_departamento hacia DEPARTAMENTOS: un departamento puede impulsar varios proyectos (1:N)."
  },
  {
    "id": "sql-017",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "¿Qué representan 'p' y 's' en NUMBER(p, s)?",
    "options": [
      "p = página, s = sección",
      "p = precisión total de dígitos, s = escala (dígitos decimales)",
      "p = precio, s = stock",
      "No tienen significado especial"
    ],
    "correctIndex": 1,
    "explanation": "p es la precisión total (cantidad máxima de dígitos), s es la escala (cuántos de esos dígitos van después del punto decimal)."
  },
  {
    "id": "sql-018",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "¿Qué ocurre al insertar 123456.789 en una columna definida como NUMBER(8,2)?",
    "options": [
      "Se inserta sin problema, truncando a 123456.78",
      "Lanza un error: ORA-01438, el valor excede la precisión especificada para la columna",
      "Se convierte automáticamente a NUMBER(10,2)",
      "Se guarda como texto"
    ],
    "correctIndex": 1,
    "explanation": "NUMBER(8,2) permite máximo 8 dígitos totales (6 enteros + 2 decimales) = hasta 999999.99; 123456.789 tiene 6 enteros pero requiere redondeo, y valores mayores exceden la precisión."
  },
  {
    "id": "sql-019",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "¿Qué hace una escala NEGATIVA en NUMBER(12,-3)?",
    "options": [
      "Produce un error de sintaxis",
      "Redondea el valor a la centena/millar más cercana según el exponente indicado (en este caso, miles)",
      "Convierte el número en negativo",
      "No tiene ningún efecto"
    ],
    "correctIndex": 1,
    "explanation": "Una escala negativa redondea hacia la izquierda del punto decimal: NUMBER(12,-3) redondea a miles (1234567 se guarda como 1235000)."
  },
  {
    "id": "sql-020",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "¿Cuál es 'el tipo numérico universal' de Oracle, usado tanto para enteros como decimales?",
    "options": [
      "INT",
      "FLOAT",
      "NUMBER",
      "BINARY_DOUBLE"
    ],
    "correctIndex": 2,
    "explanation": "NUMBER(p,s) es el tipo numérico de propósito general en Oracle; INTEGER es solo un alias de NUMBER(38) por compatibilidad con el estándar SQL."
  },
  {
    "id": "sql-021",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "¿Qué tipo numérico de Oracle está optimizado para cálculos científicos de punto flotante IEEE 754 de 64 bits?",
    "options": [
      "NUMBER",
      "BINARY_DOUBLE",
      "INTEGER",
      "CHAR"
    ],
    "correctIndex": 1,
    "explanation": "BINARY_DOUBLE implementa IEEE 754 de doble precisión, más rápido que NUMBER para cálculos científicos intensivos."
  },
  {
    "id": "sql-022",
    "category": "sql",
    "topic": "Tipos de datos numéricos",
    "question": "Al insertar 0.12345 en una columna NUMBER(5,4), ¿qué valor queda almacenado?",
    "options": [
      "0.1234 (trunca)",
      "0.1235 (Oracle redondea al insertar, no trunca)",
      "Error de precisión",
      "0.12345 sin cambios"
    ],
    "correctIndex": 1,
    "explanation": "Oracle redondea automáticamente al insertar un valor que excede la escala definida, en vez de truncarlo."
  },
  {
    "id": "sql-023",
    "category": "sql",
    "topic": "Tipos de datos texto",
    "question": "¿Cuál es el tipo de texto recomendado por defecto para el 95% de los casos en Oracle?",
    "options": [
      "CHAR(n)",
      "VARCHAR2(n)",
      "LONG",
      "CLOB siempre"
    ],
    "correctIndex": 1,
    "explanation": "VARCHAR2 almacena longitud VARIABLE (solo ocupa lo que realmente se escribe); CHAR rellena con espacios hasta su longitud fija, lo cual rara vez es lo que se quiere."
  },
  {
    "id": "sql-024",
    "category": "sql",
    "topic": "Tipos de datos texto",
    "question": "Si insertas 'Ana' en una columna CHAR(5), ¿cuál es el resultado de LENGTH(columna)?",
    "options": [
      "3",
      "5 (rellenado con espacios a la derecha)",
      "0",
      "Error, no cabe"
    ],
    "correctIndex": 1,
    "explanation": "CHAR(n) siempre ocupa exactamente n caracteres, rellenando con espacios a la derecha si el valor es más corto."
  },
  {
    "id": "sql-025",
    "category": "sql",
    "topic": "Tipos de datos texto",
    "question": "¿Qué tipo se usa para almacenar texto de gran tamaño (documentos, JSON como texto) sin límite práctico?",
    "options": [
      "VARCHAR2(4000)",
      "CHAR(2000)",
      "CLOB",
      "RAW(2000)"
    ],
    "correctIndex": 2,
    "explanation": "CLOB (Character Large Object) soporta hasta 4 GB de texto, muy por encima del límite de VARCHAR2 (4000 bytes o 32767 con MAX_STRING_SIZE=EXTENDED)."
  },
  {
    "id": "sql-026",
    "category": "sql",
    "topic": "Tipos de datos texto",
    "question": "¿Qué diferencia hay entre VARCHAR2 y NVARCHAR2?",
    "options": [
      "Ninguna diferencia real",
      "NVARCHAR2 se almacena en el juego de caracteres nacional (Unicode) para soporte multi-idioma garantizado",
      "NVARCHAR2 no permite texto en español",
      "VARCHAR2 no puede indexarse"
    ],
    "correctIndex": 1,
    "explanation": "NVARCHAR2 garantiza almacenamiento en Unicode independientemente del character set de la base, útil para aplicaciones verdaderamente multi-idioma."
  },
  {
    "id": "sql-027",
    "category": "sql",
    "topic": "Tipos de datos texto",
    "question": "¿Por qué se considera obsoleto el tipo LONG en código nuevo?",
    "options": [
      "Porque no puede almacenar texto",
      "Porque fue reemplazado por CLOB, que es más flexible y con menos restricciones de uso",
      "Porque Oracle lo eliminó por completo",
      "No es obsoleto, se recomienda su uso"
    ],
    "correctIndex": 1,
    "explanation": "LONG es el predecesor de CLOB, con muchas restricciones (solo una columna LONG por tabla, no se puede usar en WHERE, etc.) — se evita en desarrollo nuevo."
  },
  {
    "id": "sql-028",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "A diferencia de otros motores de base de datos, ¿qué característica tiene siempre el tipo DATE en Oracle?",
    "options": [
      "Solo almacena la fecha, nunca la hora",
      "Siempre incluye hora (día, mes, año, hora, minuto, segundo), aunque no se especifique al insertar",
      "No puede usarse en cálculos",
      "Es un alias de VARCHAR2"
    ],
    "correctIndex": 1,
    "explanation": "DATE en Oracle SIEMPRE incluye componente de hora con precisión de segundos, aunque solo insertes la fecha (la hora queda en 00:00:00)."
  },
  {
    "id": "sql-029",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "¿Qué diferencia principal hay entre DATE y TIMESTAMP?",
    "options": [
      "No hay ninguna diferencia",
      "TIMESTAMP añade precisión de fracciones de segundo, que DATE no tiene",
      "DATE es más preciso que TIMESTAMP",
      "TIMESTAMP no puede compararse con DATE"
    ],
    "correctIndex": 1,
    "explanation": "TIMESTAMP(p) extiende DATE con fracciones de segundo (hasta 9 dígitos decimales), útil cuando se necesita mayor granularidad temporal."
  },
  {
    "id": "sql-030",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "¿Qué devuelve 'SELECT SYSDATE + 7 FROM dual'?",
    "options": [
      "Un error, no se puede sumar a una fecha",
      "La fecha actual más 7 días",
      "El número 7",
      "SYSDATE multiplicado por 7"
    ],
    "correctIndex": 1,
    "explanation": "Oracle permite aritmética directa de fechas: sumar/restar un número a una DATE representa días."
  },
  {
    "id": "sql-031",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "¿Qué tipo almacena además el offset de zona horaria junto con la fecha/hora?",
    "options": [
      "DATE",
      "TIMESTAMP (sin más)",
      "TIMESTAMP WITH TIME ZONE",
      "INTERVAL DAY TO SECOND"
    ],
    "correctIndex": 2,
    "explanation": "TIMESTAMP WITH TIME ZONE guarda explícitamente el offset de zona horaria del valor almacenado."
  },
  {
    "id": "sql-032",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "¿Qué representa el tipo INTERVAL DAY TO SECOND?",
    "options": [
      "Una fecha absoluta",
      "Un intervalo/diferencia de tiempo expresado en días, horas, minutos y segundos",
      "Un tipo de índice",
      "Un tipo de restricción CHECK"
    ],
    "correctIndex": 1,
    "explanation": "INTERVAL DAY TO SECOND modela DURACIONES (diferencias de tiempo), no fechas/instantes absolutos como DATE o TIMESTAMP."
  },
  {
    "id": "sql-033",
    "category": "sql",
    "topic": "Tipos de datos fecha/hora",
    "question": "¿Qué diferencia hay entre SYSDATE y SYSTIMESTAMP?",
    "options": [
      "Son exactamente lo mismo",
      "SYSDATE tiene precisión de segundo; SYSTIMESTAMP incluye fracciones de segundo y zona horaria",
      "SYSTIMESTAMP no incluye la hora",
      "SYSDATE es más preciso que SYSTIMESTAMP"
    ],
    "correctIndex": 1,
    "explanation": "SYSTIMESTAMP ofrece mayor precisión (fracciones de segundo) y además la zona horaria de la sesión, a diferencia de SYSDATE."
  },
  {
    "id": "sql-034",
    "category": "sql",
    "topic": "Tipos binarios y otros",
    "question": "¿Qué tipo se usa para almacenar archivos binarios grandes (imágenes, PDFs) directamente dentro de la base de datos?",
    "options": [
      "RAW(2000)",
      "BLOB",
      "VARCHAR2",
      "ROWID"
    ],
    "correctIndex": 1,
    "explanation": "BLOB (Binary Large Object) soporta hasta 4 GB de datos binarios, adecuado para archivos grandes; RAW tiene un límite mucho menor."
  },
  {
    "id": "sql-035",
    "category": "sql",
    "topic": "Tipos binarios y otros",
    "question": "¿Qué representa un BFILE?",
    "options": [
      "Un archivo binario almacenado dentro de la tabla",
      "Una referencia/puntero a un archivo binario almacenado FUERA de la base de datos, en el sistema de archivos del servidor",
      "Un tipo de índice binario",
      "Un booleano"
    ],
    "correctIndex": 1,
    "explanation": "BFILE no almacena el archivo en sí dentro de la BD; solo guarda una referencia a su ubicación en el sistema de archivos del servidor."
  },
  {
    "id": "sql-036",
    "category": "sql",
    "topic": "Tipos binarios y otros",
    "question": "¿Cómo se simula típicamente un tipo BOOLEAN en una columna de tabla SQL de Oracle (versiones sin tipo nativo)?",
    "options": [
      "No es posible representar booleanos en Oracle",
      "Con NUMBER(1) restringido a 0/1, o CHAR(1) con 'S'/'N', usando un CHECK",
      "Con el tipo BOOLEAN nativo de SQL, igual que en PL/SQL",
      "Con VARCHAR2(100)"
    ],
    "correctIndex": 1,
    "explanation": "BOOLEAN solo existe de forma nativa en PL/SQL, no como tipo de columna en SQL puro (en versiones no muy recientes); se simula con NUMBER(1) o CHAR(1) más un CHECK."
  },
  {
    "id": "sql-037",
    "category": "sql",
    "topic": "Tipos binarios y otros",
    "question": "¿Qué es el ROWID de una fila en Oracle?",
    "options": [
      "Un campo que el usuario debe definir manualmente",
      "El identificador físico único e interno de esa fila, su 'dirección' física en el almacenamiento",
      "Un tipo de JOIN",
      "Un sinónimo de PRIMARY KEY"
    ],
    "correctIndex": 1,
    "explanation": "ROWID es un identificador interno gestionado por Oracle, que permite acceso directo ultra-rápido a la fila física exacta."
  },
  {
    "id": "sql-038",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Por qué es riesgoso escribir 'WHERE fecha = '2026-07-14'' comparando directamente contra un texto?",
    "options": [
      "Porque Oracle no permite comparar fechas nunca",
      "Porque depende del NLS_DATE_FORMAT de la sesión y puede interpretarse distinto (o fallar) en otro entorno",
      "Porque las fechas no pueden usarse en WHERE",
      "No es riesgoso, es la forma recomendada"
    ],
    "correctIndex": 1,
    "explanation": "La forma segura es usar TO_DATE(...) explícito o un literal ANSI como DATE '2026-07-14', independiente de la configuración regional de la sesión."
  },
  {
    "id": "sql-039",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué elemento del modelo de formato de fecha representa el año con 4 dígitos?",
    "options": [
      "YY",
      "YYYY",
      "RR",
      "MM"
    ],
    "correctIndex": 1,
    "explanation": "YYYY representa el año completo con 4 dígitos (ej. 2026); YY solo usa 2 dígitos, ambiguo entre siglos."
  },
  {
    "id": "sql-040",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué diferencia hay entre 'YY' y 'RR' al interpretar años de 2 dígitos como '70'?",
    "options": [
      "Son exactamente equivalentes",
      "'RR' aplica una regla de 'pivote' más inteligente sobre el siglo (interpreta 1970); 'YY' asume simplemente el siglo actual (2070)",
      "'YY' siempre es más preciso que 'RR'",
      "Ninguno de los dos funciona con TO_DATE"
    ],
    "correctIndex": 1,
    "explanation": "RR usa una regla de pivote (años 50-99 se asumen del siglo pasado, 00-49 del siglo actual) diseñada para manejar mejor la ambigüedad de siglo que YY."
  },
  {
    "id": "sql-041",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué produce TO_CHAR(SYSDATE, 'YYYY-MM-DD')?",
    "options": [
      "La fecha actual en formato ISO, como texto, ej. '2026-07-22'",
      "Un NUMBER",
      "Un error de sintaxis",
      "La hora actual solamente"
    ],
    "correctIndex": 0,
    "explanation": "TO_CHAR convierte una fecha/número al formato de TEXTO indicado por la máscara — aquí, formato ISO 'YYYY-MM-DD'."
  },
  {
    "id": "sql-042",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué elemento de formato numérico rellena con CEROS a la izquierda, a diferencia de '9' que no rellena?",
    "options": [
      "'0'",
      "'.'",
      "'L'",
      "'FM'"
    ],
    "correctIndex": 0,
    "explanation": "'0' rellena con ceros (ej. '01234.50'); '9' deja espacios en blanco en las posiciones no usadas (ej. ' 1234.50')."
  },
  {
    "id": "sql-043",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué hace el modificador 'FM' en un formato numérico como 'FM9999'?",
    "options": [
      "Formatea como moneda",
      "Elimina (fill mode) espacios/ceros de relleno sobrantes del resultado",
      "Fuerza el resultado a mayúsculas",
      "Convierte el número en fecha"
    ],
    "correctIndex": 1,
    "explanation": "'FM' ('fill mode') produce una salida más compacta, sin el padding de espacios que Oracle añade por defecto para alinear resultados."
  },
  {
    "id": "sql-044",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué elemento de formato numérico produce el formato contable, mostrando los negativos entre '< >'?",
    "options": [
      "'MI'",
      "'S'",
      "'PR'",
      "'EEEE'"
    ],
    "correctIndex": 2,
    "explanation": "'PR' formatea los valores negativos entre corchetes angulares, ej. '<1234.50>', típico de reportes contables."
  },
  {
    "id": "sql-045",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué función convierte un texto a un valor DATE interpretándolo según una máscara explícita?",
    "options": [
      "TO_CHAR",
      "TO_DATE",
      "TO_NUMBER",
      "CAST únicamente"
    ],
    "correctIndex": 1,
    "explanation": "TO_DATE(texto, 'formato') interpreta un string como fecha según el patrón indicado, ej. TO_DATE('14/07/2026', 'DD/MM/YYYY')."
  },
  {
    "id": "sql-046",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Qué representa el elemento 'HH24' en un formato de fecha?",
    "options": [
      "Hora en formato 12 horas",
      "Hora en formato 24 horas (00-23)",
      "Los minutos",
      "El día del año"
    ],
    "correctIndex": 1,
    "explanation": "HH24 muestra la hora en formato de 24 horas; HH/HH12 usa el formato de 12 horas con AM/PM."
  },
  {
    "id": "sql-047",
    "category": "sql",
    "topic": "Formatos de fecha/número",
    "question": "¿Cuál es la forma recomendada de escribir un valor de fecha CONSTANTE (literal) en un script SQL, independiente del NLS de la sesión?",
    "options": [
      "'2026-07-14' entre comillas simples, sin más",
      "DATE '2026-07-14' (literal ANSI)",
      "TO_CHAR('2026-07-14')",
      "SYSDATE - 'texto'"
    ],
    "correctIndex": 1,
    "explanation": "Los literales ANSI como DATE '2026-07-14' son interpretados de forma consistente por Oracle, sin depender del NLS_DATE_FORMAT configurado en la sesión."
  },
  {
    "id": "sql-048",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué característica tienen los comandos DDL respecto a COMMIT/ROLLBACK?",
    "options": [
      "Se pueden revertir siempre con ROLLBACK",
      "Cada DDL hace COMMIT automático antes y después de ejecutarse, no se puede revertir con ROLLBACK",
      "Nunca afectan la base de datos hasta hacer COMMIT manual",
      "Los DDL no existen en Oracle"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de DML, cualquier sentencia DDL (CREATE, ALTER, DROP) confirma automáticamente los cambios pendientes — un ROLLBACK posterior no la deshace."
  },
  {
    "id": "sql-049",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué hace 'CREATE TABLE empleados_backup AS SELECT * FROM empleados WHERE 1 = 0;'?",
    "options": [
      "Copia la tabla completa con todos los datos",
      "Crea una tabla nueva con la MISMA estructura que empleados, pero sin ninguna fila (WHERE 1=0 nunca es verdadero)",
      "Lanza un error de sintaxis",
      "Borra la tabla empleados"
    ],
    "correctIndex": 1,
    "explanation": "'WHERE 1=0' es un truco clásico de CTAS (CREATE TABLE AS SELECT) para copiar solo la ESTRUCTURA de una tabla, sin copiar ningún dato."
  },
  {
    "id": "sql-050",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué diferencia hay entre DELETE FROM tabla (sin WHERE) y TRUNCATE TABLE tabla?",
    "options": [
      "Son exactamente equivalentes en todo sentido",
      "DELETE es DML (reversible con ROLLBACK antes del COMMIT, dispara triggers); TRUNCATE es DDL (no reversible, no dispara triggers, más rápido)",
      "TRUNCATE borra también la estructura de la tabla",
      "DELETE siempre es más rápido que TRUNCATE"
    ],
    "correctIndex": 1,
    "explanation": "TRUNCATE es una operación DDL que libera el espacio inmediatamente y no puede revertirse con ROLLBACK; DELETE es DML, más lento pero reversible antes del COMMIT."
  },
  {
    "id": "sql-051",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué diferencia hay entre DROP TABLE y TRUNCATE TABLE?",
    "options": [
      "Son sinónimos",
      "DROP TABLE elimina también la ESTRUCTURA de la tabla (deja de existir); TRUNCATE solo vacía los datos, la tabla sigue existiendo vacía",
      "TRUNCATE elimina la estructura y DROP solo los datos",
      "Ninguno de los dos es DDL"
    ],
    "correctIndex": 1,
    "explanation": "DROP TABLE borra la tabla por completo (estructura + datos); TRUNCATE TABLE vacía los datos mantiendo la estructura, columnas, índices, etc."
  },
  {
    "id": "sql-052",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Cómo se recupera una tabla recién borrada con DROP TABLE (sin PURGE), mientras siga en la papelera de reciclaje de Oracle?",
    "options": [
      "No se puede recuperar bajo ninguna circunstancia",
      "Con FLASHBACK TABLE nombre_tabla TO BEFORE DROP;",
      "Con un simple ROLLBACK",
      "Volviendo a ejecutar el CREATE TABLE original"
    ],
    "correctIndex": 1,
    "explanation": "Oracle mueve las tablas borradas con DROP a una 'papelera de reciclaje'; FLASHBACK TABLE ... TO BEFORE DROP las restaura mientras sigan ahí."
  },
  {
    "id": "sql-053",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué hace la cláusula PURGE en 'DROP TABLE empleados_backup PURGE;'?",
    "options": [
      "Vacía solo los datos, sin borrar la tabla",
      "Borra la tabla de forma DEFINITIVA, sin pasar por la papelera de reciclaje (no se puede recuperar después)",
      "Crea un respaldo automático antes de borrar",
      "Es sinónimo de TRUNCATE"
    ],
    "correctIndex": 1,
    "explanation": "PURGE evita que la tabla borrada quede en la papelera de reciclaje, haciendo el borrado irreversible de inmediato."
  },
  {
    "id": "sql-054",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué comando se usa para AGREGAR una columna nueva a una tabla ya existente?",
    "options": [
      "ALTER TABLE tabla ADD (columna tipo)",
      "CREATE COLUMN columna ON tabla",
      "UPDATE TABLE tabla ADD columna",
      "INSERT COLUMN columna INTO tabla"
    ],
    "correctIndex": 0,
    "explanation": "La sintaxis correcta es ALTER TABLE tabla ADD (nombre_columna tipo_de_dato);"
  },
  {
    "id": "sql-055",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué comando renombra una columna existente en Oracle?",
    "options": [
      "ALTER TABLE tabla RENAME COLUMN viejo TO nuevo;",
      "RENAME COLUMN viejo TO nuevo;",
      "UPDATE COLUMN tabla SET nombre = nuevo;",
      "MODIFY COLUMN tabla RENAME nuevo;"
    ],
    "correctIndex": 0,
    "explanation": "ALTER TABLE tabla RENAME COLUMN nombre_viejo TO nombre_nuevo; es la sintaxis correcta en Oracle."
  },
  {
    "id": "sql-056",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué diferencia hay entre GLOBAL TEMPORARY TABLE con 'ON COMMIT DELETE ROWS' y con 'ON COMMIT PRESERVE ROWS'?",
    "options": [
      "No hay diferencia real",
      "DELETE ROWS borra los datos automáticamente al hacer COMMIT; PRESERVE ROWS los mantiene hasta el fin de la SESIÓN",
      "PRESERVE ROWS borra los datos al hacer COMMIT",
      "Ambas opciones eliminan la tabla completa al hacer COMMIT"
    ],
    "correctIndex": 1,
    "explanation": "Son las dos variantes de tablas temporales globales de Oracle: una limpia los datos en cada COMMIT, la otra los conserva mientras dure la sesión."
  },
  {
    "id": "sql-057",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué hace 'ALTER TABLE empleados MODIFY (telefono VARCHAR2(30));'?",
    "options": [
      "Agrega una columna nueva llamada telefono",
      "Cambia el tipo/tamaño de la columna telefono ya existente",
      "Borra la columna telefono",
      "Renombra la tabla empleados"
    ],
    "correctIndex": 1,
    "explanation": "MODIFY cambia las características (tipo de dato, tamaño, nulabilidad, default) de una columna que ya existe en la tabla."
  },
  {
    "id": "sql-058",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué comando otorga a un usuario los privilegios mínimos para conectarse y crear objetos propios?",
    "options": [
      "GRANT CREATE SESSION, RESOURCE TO usuario;",
      "GRANT DBA TO usuario;",
      "CREATE USER usuario;",
      "ALTER USER usuario;"
    ],
    "correctIndex": 0,
    "explanation": "CREATE SESSION permite conectarse; RESOURCE permite crear objetos propios como tablas y secuencias — juntos son el mínimo típico para un usuario funcional."
  },
  {
    "id": "sql-059",
    "category": "sql",
    "topic": "DDL",
    "question": "¿Qué comando DDL permite bloquear (impedir el login de) un usuario existente sin borrarlo?",
    "options": [
      "DROP USER usuario;",
      "ALTER USER usuario ACCOUNT LOCK;",
      "REVOKE CREATE SESSION FROM usuario;",
      "TRUNCATE USER usuario;"
    ],
    "correctIndex": 1,
    "explanation": "ALTER USER usuario ACCOUNT LOCK; bloquea la cuenta sin eliminar al usuario ni sus objetos; ACCOUNT UNLOCK la reactiva."
  },
  {
    "id": "sql-060",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué garantiza una restricción PRIMARY KEY?",
    "options": [
      "Que la columna pueda repetirse libremente",
      "Que cada fila tenga un identificador único y NO NULO (combina UNIQUE + NOT NULL)",
      "Que la columna sea siempre de tipo NUMBER",
      "Que exista un índice de texto completo"
    ],
    "correctIndex": 1,
    "explanation": "PRIMARY KEY es la combinación de NOT NULL + UNIQUE: identifica de forma única e ineludible cada fila de la tabla."
  },
  {
    "id": "sql-061",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué garantiza una restricción FOREIGN KEY?",
    "options": [
      "Que la columna sea siempre positiva",
      "Que el valor de la columna deba existir como clave primaria/única en OTRA tabla (integridad referencial)",
      "Que la columna no admita valores NULL nunca",
      "Que la tabla tenga como máximo una fila"
    ],
    "correctIndex": 1,
    "explanation": "FOREIGN KEY garantiza integridad referencial: no puedes insertar un valor que no exista en la tabla/columna referenciada."
  },
  {
    "id": "sql-062",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué diferencia hay entre ON DELETE CASCADE y ON DELETE SET NULL en una FOREIGN KEY?",
    "options": [
      "Son exactamente lo mismo",
      "CASCADE borra también las filas hijas al borrar el padre; SET NULL deja la FK en NULL en las filas hijas, sin borrarlas",
      "SET NULL borra las filas hijas; CASCADE las conserva",
      "Ninguna opción afecta a las filas hijas"
    ],
    "correctIndex": 1,
    "explanation": "ON DELETE CASCADE propaga el borrado a los hijos; ON DELETE SET NULL conserva los hijos pero anula su referencia al padre borrado."
  },
  {
    "id": "sql-063",
    "category": "sql",
    "topic": "Constraints",
    "question": "Si una FOREIGN KEY se declara SIN especificar ninguna cláusula ON DELETE, ¿cuál es el comportamiento por defecto al intentar borrar el padre con hijos existentes?",
    "options": [
      "CASCADE automático",
      "RESTRICT: Oracle NO permite borrar el padre mientras existan filas hijas que lo referencien",
      "SET NULL automático",
      "Se borra el padre y los hijos quedan huérfanos sin control"
    ],
    "correctIndex": 1,
    "explanation": "Por defecto (sin ON DELETE explícito), Oracle protege la integridad referencial impidiendo el borrado del padre si aún tiene hijos dependientes (RESTRICT)."
  },
  {
    "id": "sql-064",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué tipo de restricción permite validar una condición lógica arbitraria sobre una columna, como 'salario > 0'?",
    "options": [
      "UNIQUE",
      "CHECK",
      "DEFAULT",
      "FOREIGN KEY"
    ],
    "correctIndex": 1,
    "explanation": "CHECK valida que el valor cumpla una expresión booleana arbitraria definida al crear la restricción."
  },
  {
    "id": "sql-065",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Puede una PRIMARY KEY estar compuesta por más de una columna?",
    "options": [
      "No, siempre debe ser una sola columna",
      "Sí, una PRIMARY KEY compuesta combina varias columnas para identificar de forma única cada fila (típico en tablas intermedias N:M)",
      "Solo en MySQL, no en Oracle",
      "Solo si todas las columnas son NUMBER"
    ],
    "correctIndex": 1,
    "explanation": "Las claves primarias compuestas son comunes en tablas intermedias como EMPLEADO_PROYECTO: (id_empleado, id_proyecto) juntas identifican la fila."
  },
  {
    "id": "sql-066",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué diferencia hay entre UNIQUE y PRIMARY KEY?",
    "options": [
      "Son exactamente lo mismo en todo sentido",
      "UNIQUE permite valores NULL (varios, según el motor) y puede haber varias UNIQUE por tabla; PRIMARY KEY no permite NULL y solo puede haber una por tabla",
      "PRIMARY KEY permite duplicados, UNIQUE no",
      "UNIQUE solo aplica a columnas de texto"
    ],
    "correctIndex": 1,
    "explanation": "Una tabla puede tener múltiples restricciones UNIQUE (que sí toleran NULL), pero solo una PRIMARY KEY, que además implica NOT NULL."
  },
  {
    "id": "sql-067",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué hace 'ALTER TABLE puestos ADD CONSTRAINT ck_rango CHECK (salario_maximo >= salario_minimo);'?",
    "options": [
      "Agrega un índice sobre salario_maximo",
      "Agrega una restricción CHECK que exige que el salario máximo del puesto sea siempre mayor o igual al mínimo",
      "Borra la columna salario_minimo",
      "Crea una vista"
    ],
    "correctIndex": 1,
    "explanation": "Esta restricción CHECK compuesta valida una relación lógica entre dos columnas de la misma fila."
  },
  {
    "id": "sql-068",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Se puede tener una restricción UNIQUE compuesta (sobre la combinación de varias columnas)?",
    "options": [
      "No, UNIQUE solo aplica a una columna",
      "Sí: la COMBINACIÓN no puede repetirse, aunque cada columna individualmente sí pueda tener valores repetidos",
      "Solo si las columnas son de tipo texto",
      "Solo en la clave primaria"
    ],
    "correctIndex": 1,
    "explanation": "Ej. UNIQUE (id_empleado, rol) permite que un empleado tenga varios roles y que un rol se repita entre empleados, pero no la MISMA combinación dos veces."
  },
  {
    "id": "sql-069",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Qué restricción se usa para asignar automáticamente un valor cuando no se especifica uno al insertar?",
    "options": [
      "CHECK",
      "DEFAULT",
      "UNIQUE",
      "FOREIGN KEY"
    ],
    "correctIndex": 1,
    "explanation": "DEFAULT define un valor que se usa automáticamente si la sentencia INSERT no especifica un valor explícito para esa columna."
  },
  {
    "id": "sql-070",
    "category": "sql",
    "topic": "Usuarios y schemas",
    "question": "¿Qué comando crea un usuario nuevo en Oracle con un tablespace por defecto?",
    "options": [
      "CREATE USER usuario IDENTIFIED BY \"clave\" DEFAULT TABLESPACE users;",
      "NEW USER usuario;",
      "INSERT USER usuario;",
      "CREATE SCHEMA usuario;"
    ],
    "correctIndex": 0,
    "explanation": "La sintaxis estándar de Oracle es CREATE USER nombre IDENTIFIED BY \"contraseña\" DEFAULT TABLESPACE ...;"
  },
  {
    "id": "sql-071",
    "category": "sql",
    "topic": "Usuarios y schemas",
    "question": "¿Qué hace 'DROP USER app_user CASCADE;'?",
    "options": [
      "Solo bloquea al usuario, sin borrarlo",
      "Borra al usuario Y TODOS los objetos que le pertenecen (sus tablas, vistas, etc.)",
      "Solo borra los objetos del usuario, dejando la cuenta activa",
      "Cambia la contraseña del usuario"
    ],
    "correctIndex": 1,
    "explanation": "CASCADE extiende el borrado del usuario a todo su schema (todos los objetos que posee); sin CASCADE, el DROP falla si el usuario tiene objetos."
  },
  {
    "id": "sql-072",
    "category": "sql",
    "topic": "Usuarios y schemas",
    "question": "¿Qué controla un PROFILE en Oracle, asignado a un usuario?",
    "options": [
      "El color de la interfaz gráfica",
      "Límites de recursos y políticas de seguridad, como intentos fallidos de login o vida útil de la contraseña",
      "El tablespace donde se guardan los datos",
      "El nivel de aislamiento de las transacciones"
    ],
    "correctIndex": 1,
    "explanation": "Un PROFILE agrupa políticas como FAILED_LOGIN_ATTEMPTS o PASSWORD_LIFE_TIME, aplicables a uno o varios usuarios."
  },
  {
    "id": "sql-073",
    "category": "sql",
    "topic": "Usuarios y schemas",
    "question": "¿Qué comando cambia la contraseña de un usuario ya existente?",
    "options": [
      "ALTER USER usuario IDENTIFIED BY \"nueva_clave\";",
      "UPDATE USER usuario SET password = 'nueva';",
      "CHANGE PASSWORD usuario TO 'nueva';",
      "SET PASSWORD FOR usuario = 'nueva';"
    ],
    "correctIndex": 0,
    "explanation": "ALTER USER nombre IDENTIFIED BY \"nueva_contraseña\"; es la sintaxis correcta para cambiar la contraseña de un usuario existente."
  },
  {
    "id": "sql-074",
    "category": "sql",
    "topic": "DML - INSERT",
    "question": "Si listas explícitamente las columnas en un INSERT, ¿en qué orden deben ir los valores en VALUES?",
    "options": [
      "En el orden físico real de columnas de la tabla, sin importar el INSERT",
      "En el MISMO orden en que se listaron las columnas en el INSERT (no necesariamente el orden físico de la tabla)",
      "El orden no importa en absoluto",
      "Siempre en orden alfabético"
    ],
    "correctIndex": 1,
    "explanation": "Si escribes INSERT INTO tabla (colB, colA) VALUES (v1, v2), v1 va a colB y v2 va a colA — el orden de VALUES sigue al de la lista de columnas declarada, no al de la tabla."
  },
  {
    "id": "sql-075",
    "category": "sql",
    "topic": "DML - INSERT",
    "question": "¿Qué ocurre con una columna que se OMITE al hacer un INSERT parcial (sin listarla)?",
    "options": [
      "Provoca siempre un error de sintaxis",
      "Toma su valor DEFAULT si tiene uno definido, o queda NULL si no lo tiene (y no es NOT NULL sin default)",
      "Se rellena automáticamente con 0 o cadena vacía siempre",
      "La fila no se inserta"
    ],
    "correctIndex": 1,
    "explanation": "Las columnas no listadas en un INSERT usan su DEFAULT si existe, o quedan NULL — a menos que tengan NOT NULL sin default, en cuyo caso el INSERT falla."
  },
  {
    "id": "sql-076",
    "category": "sql",
    "topic": "DML - INSERT",
    "question": "¿Qué hace 'INSERT INTO empleados_backup SELECT * FROM empleados WHERE id_departamento = 10;'?",
    "options": [
      "Crea la tabla empleados_backup desde cero",
      "Inserta en empleados_backup (ya existente) las filas resultado de la consulta SELECT",
      "Borra empleados_backup",
      "Actualiza empleados_backup"
    ],
    "correctIndex": 1,
    "explanation": "INSERT INTO ... SELECT ... inserta el resultado de una consulta en una tabla ya existente, sin necesitar VALUES explícitos."
  },
  {
    "id": "sql-077",
    "category": "sql",
    "topic": "DML - UPDATE",
    "question": "¿Qué ocurre exactamente al ejecutar 'UPDATE empleados SET salario = salario * 1.05;' SIN cláusula WHERE?",
    "options": [
      "No hace nada porque falta el WHERE",
      "Sube el salario un 5% a TODAS las filas de la tabla, sin excepción",
      "Da error de sintaxis obligando a poner un WHERE",
      "Solo afecta a la primera fila"
    ],
    "correctIndex": 1,
    "explanation": "Sin WHERE, un UPDATE afecta absolutamente todas las filas de la tabla — la trampa más clásica de SQL básico."
  },
  {
    "id": "sql-078",
    "category": "sql",
    "topic": "DML - UPDATE",
    "question": "¿Qué hace un UPDATE con subconsulta correlacionada como 'SET salario = (SELECT salario_maximo FROM puestos p WHERE p.id_puesto = e.id_puesto)'?",
    "options": [
      "Asigna a cada empleado el salario_maximo del PUESTO al que pertenece, calculado individualmente por fila",
      "Asigna el mismo valor fijo a todos los empleados",
      "Produce un error porque no se permiten subconsultas en SET",
      "Borra la columna salario"
    ],
    "correctIndex": 0,
    "explanation": "La subconsulta se correlaciona con la fila externa (e.id_puesto) y se reevalúa para cada empleado, según su propio puesto."
  },
  {
    "id": "sql-079",
    "category": "sql",
    "topic": "DML - UPDATE",
    "question": "¿Cuál es la disciplina recomendada antes de correr un UPDATE masivo en producción?",
    "options": [
      "Ejecutarlo directamente y revisar después",
      "Ejecutar primero un SELECT con el MISMO WHERE, revisar qué filas se verían afectadas, y solo entonces convertir el SELECT en UPDATE",
      "Nunca usar WHERE en un UPDATE",
      "Hacer TRUNCATE antes del UPDATE"
    ],
    "correctIndex": 1,
    "explanation": "Verificar con un SELECT idéntico en su condición WHERE antes de ejecutar el UPDATE/DELETE evita afectar filas no deseadas por error."
  },
  {
    "id": "sql-080",
    "category": "sql",
    "topic": "DML - DELETE",
    "question": "Al borrar filas relacionadas por integridad referencial (padre-hijo), ¿en qué orden deben ejecutarse los DELETE?",
    "options": [
      "Primero el padre, luego los hijos",
      "Primero las filas HIJAS (tabla dependiente), luego las filas PADRE, para no violar la FOREIGN KEY",
      "El orden no importa nunca",
      "Solo se puede borrar el padre con CASCADE, nunca manualmente"
    ],
    "correctIndex": 1,
    "explanation": "Si existe una FK del hijo hacia el padre (sin ON DELETE CASCADE), intentar borrar primero el padre falla mientras existan hijos que lo referencien."
  },
  {
    "id": "sql-081",
    "category": "sql",
    "topic": "DML - DELETE",
    "question": "¿Qué le ocurre a 'DELETE FROM empleados WHERE departamento = NULL;' (usando '=' contra NULL)?",
    "options": [
      "Borra todos los empleados sin departamento asignado",
      "No borra NINGUNA fila: NULL nunca es igual a nada, ni siquiera comparado con '='",
      "Lanza un error de sintaxis",
      "Borra toda la tabla"
    ],
    "correctIndex": 1,
    "explanation": "La comparación correcta para NULL es 'IS NULL', no '='. Con '= NULL', la condición nunca se evalúa como verdadera para ninguna fila."
  },
  {
    "id": "sql-082",
    "category": "sql",
    "topic": "DML - DELETE",
    "question": "¿Cuál es la diferencia de rendimiento y reversibilidad entre DELETE FROM tabla (sin WHERE) y TRUNCATE TABLE tabla?",
    "options": [
      "Son idénticos en rendimiento y reversibilidad",
      "DELETE registra cada fila en el log de redo/undo (más lento, reversible con ROLLBACK antes de COMMIT); TRUNCATE es DDL, libera espacio de inmediato y no es reversible",
      "TRUNCATE es más lento porque borra la estructura",
      "DELETE nunca puede revertirse"
    ],
    "correctIndex": 1,
    "explanation": "DELETE es DML fila por fila (más costoso pero reversible antes del COMMIT); TRUNCATE es una operación DDL mucho más rápida pero irreversible."
  },
  {
    "id": "sql-083",
    "category": "sql",
    "topic": "DML - MERGE",
    "question": "¿Para qué se usa principalmente la sentencia MERGE en Oracle?",
    "options": [
      "Solo para borrar filas duplicadas",
      "Para sincronizar una tabla destino contra una tabla origen: insertar si no existe, actualizar si ya existe ('UPSERT')",
      "Para crear una tabla nueva combinando dos existentes",
      "Para cambiar el tipo de una columna"
    ],
    "correctIndex": 1,
    "explanation": "MERGE combina en una sola sentencia la lógica de 'si coincide, actualiza; si no coincide, inserta', evitando tener que programar esa lógica con IF/ELSE manual."
  },
  {
    "id": "sql-084",
    "category": "sql",
    "topic": "DML - MERGE",
    "question": "En una sentencia MERGE, ¿qué cláusula ejecuta un INSERT cuando NO existe una fila coincidente en el destino?",
    "options": [
      "WHEN MATCHED THEN",
      "WHEN NOT MATCHED THEN",
      "ON DELETE",
      "WHERE NOT EXISTS"
    ],
    "correctIndex": 1,
    "explanation": "WHEN NOT MATCHED THEN INSERT ... se ejecuta cuando la condición ON no encuentra una fila correspondiente ya existente en la tabla destino."
  },
  {
    "id": "sql-085",
    "category": "sql",
    "topic": "DML - MERGE",
    "question": "¿Qué cláusula del MERGE ejecuta un UPDATE cuando SÍ existe una fila coincidente entre origen y destino?",
    "options": [
      "WHEN NOT MATCHED THEN",
      "WHEN MATCHED THEN UPDATE SET ...",
      "ON (condición) únicamente",
      "GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "WHEN MATCHED THEN UPDATE SET ... se ejecuta cuando la condición de la cláusula ON encuentra coincidencia entre la fila origen y una fila ya existente en destino."
  },
  {
    "id": "sql-086",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Cuál es el orden lógico REAL de evaluación de una consulta SELECT con todas sus cláusulas?",
    "options": [
      "SELECT → FROM → WHERE → ORDER BY",
      "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
      "WHERE → SELECT → FROM → GROUP BY",
      "ORDER BY → SELECT → FROM → WHERE"
    ],
    "correctIndex": 1,
    "explanation": "Aunque se ESCRIBE SELECT primero, Oracle lo EVALÚA después de FROM/WHERE/GROUP BY/HAVING — por eso no puedes usar un alias del SELECT en el WHERE."
  },
  {
    "id": "sql-087",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Por qué NO puedes usar un alias de columna definido en el SELECT dentro de la cláusula WHERE de la misma consulta?",
    "options": [
      "Porque Oracle no soporta alias en absoluto",
      "Porque WHERE se evalúa ANTES que SELECT en el orden lógico de ejecución, así que el alias todavía no existe en ese punto",
      "Porque los alias solo funcionan con GROUP BY",
      "Es solo una limitación de la sintaxis, sin razón lógica"
    ],
    "correctIndex": 1,
    "explanation": "El orden lógico es FROM → WHERE → ... → SELECT, así que cualquier alias creado en el SELECT aún no existe cuando se evalúa el WHERE."
  },
  {
    "id": "sql-088",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Puedes usar un alias del SELECT dentro de la cláusula ORDER BY?",
    "options": [
      "No, nunca",
      "Sí, porque ORDER BY se evalúa DESPUÉS de SELECT en el orden lógico",
      "Solo si el alias es un número",
      "Solo en subconsultas"
    ],
    "correctIndex": 1,
    "explanation": "ORDER BY es de las últimas cláusulas en evaluarse, después de que el SELECT ya calculó sus alias — por eso sí puede referenciarlos."
  },
  {
    "id": "sql-089",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Qué hace DISTINCT en 'SELECT DISTINCT id_departamento FROM empleados;'?",
    "options": [
      "Ordena los resultados",
      "Elimina valores duplicados, devolviendo cada id_departamento una sola vez",
      "Cuenta cuántos departamentos hay",
      "Filtra los departamentos con más de un empleado"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT elimina filas duplicadas del resultado, considerando la(s) columna(s) indicadas."
  },
  {
    "id": "sql-090",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Qué patrón describe correctamente 'WHERE nombres LIKE '_na''?",
    "options": [
      "Nombres que contienen 'na' en cualquier posición",
      "Nombres de EXACTAMENTE 3 caracteres donde el tercer carácter es 'a' y el segundo es 'n' (el '_' representa un único carácter cualquiera)",
      "Nombres que terminan en 'na', sin importar longitud",
      "Un error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "'_' en LIKE representa exactamente UN carácter cualquiera (a diferencia de '%' que representa cero o más); '_na' calza con 'Ana', 'Ina', pero no con 'Adriana'."
  },
  {
    "id": "sql-091",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Qué devuelve 'SELECT * FROM empleados WHERE salario BETWEEN 30000 AND 60000;' respecto a los límites 30000 y 60000?",
    "options": [
      "Excluye ambos extremos",
      "Incluye AMBOS extremos (30000 y 60000 califican)",
      "Solo incluye el límite inferior",
      "Solo incluye el límite superior"
    ],
    "correctIndex": 1,
    "explanation": "BETWEEN en SQL es inclusivo en ambos extremos: equivale a 'salario >= 30000 AND salario <= 60000'."
  },
  {
    "id": "sql-092",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Qué devuelve 'SELECT nombres FROM empleados WHERE id_departamento NOT IN (10, 20);'?",
    "options": [
      "Empleados de los departamentos 10 y 20",
      "Empleados que NO pertenecen a los departamentos 10 ni 20 (excluye ambos)",
      "Todos los empleados sin excepción",
      "Error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "NOT IN excluye las filas cuyo valor coincida con cualquiera de los valores listados."
  },
  {
    "id": "sql-093",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Cómo se combinan correctamente dos condiciones OR con una condición AND adicional, dando precedencia explícita al OR?",
    "options": [
      "depto = 'TI' OR depto = 'RRHH' AND salario > 40000, sin paréntesis",
      "(depto = 'TI' OR depto = 'RRHH') AND salario > 40000, con paréntesis explícitos",
      "depto = 'TI' AND OR depto = 'RRHH'",
      "No se pueden combinar AND y OR en la misma condición"
    ],
    "correctIndex": 1,
    "explanation": "AND tiene mayor precedencia que OR por defecto; para agrupar el OR primero hace falta paréntesis explícitos, evitando ambigüedad."
  },
  {
    "id": "sql-094",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Qué es FETCH FIRST n ROWS ONLY (Oracle 12c+)?",
    "options": [
      "Un tipo de JOIN",
      "El equivalente moderno de LIMIT: restringe el resultado a como máximo n filas",
      "Una función de agregación",
      "Una restricción de integridad"
    ],
    "correctIndex": 1,
    "explanation": "FETCH FIRST n ROWS ONLY es la forma moderna y estándar (ANSI) de limitar filas en Oracle 12c en adelante, reemplazando el patrón antiguo con ROWNUM."
  },
  {
    "id": "sql-095",
    "category": "sql",
    "topic": "DQL básico",
    "question": "¿Por qué la consulta clásica pre-12c con ROWNUM necesita envolver el SELECT ordenado en una subconsulta, en vez de aplicar 'WHERE ROWNUM <= 5' directo sobre una consulta con ORDER BY?",
    "options": [
      "No hace falta, ROWNUM siempre respeta el ORDER BY",
      "Porque ROWNUM se asigna ANTES de que se aplique el ORDER BY si se usa directo en el WHERE externo, dando resultados incorrectos",
      "Porque ROWNUM no existe en Oracle",
      "Porque ORDER BY no puede usarse con ROWNUM bajo ninguna circunstancia"
    ],
    "correctIndex": 1,
    "explanation": "ROWNUM se calcula sobre el orden de recuperación de filas, no sobre el orden final deseado; hay que ordenar PRIMERO en una subconsulta y luego filtrar ROWNUM sobre ese resultado ya ordenado."
  },
  {
    "id": "sql-096",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué diferencia hay entre WHERE y HAVING?",
    "options": [
      "Son exactamente intercambiables",
      "WHERE filtra FILAS individuales antes de agrupar; HAVING filtra GRUPOS ya calculados (después de GROUP BY)",
      "HAVING filtra filas; WHERE filtra grupos",
      "WHERE no puede usarse junto con GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "WHERE actúa sobre filas crudas antes de agrupar; HAVING actúa sobre el resultado ya agregado por grupo (ej. HAVING AVG(salario) > 45000)."
  },
  {
    "id": "sql-097",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué devuelve COUNT(*) sobre una tabla vacía?",
    "options": [
      "NULL",
      "0",
      "Lanza una excepción",
      "-1"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(*) siempre devuelve un número, incluso 0 si no hay filas; a diferencia de otras funciones de agregación que pueden devolver NULL sobre conjuntos vacíos."
  },
  {
    "id": "sql-098",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué devuelve AVG(salario) si TODOS los valores de salario en el conjunto son NULL?",
    "options": [
      "0",
      "NULL",
      "Lanza una excepción",
      "Un error de división por cero"
    ],
    "correctIndex": 1,
    "explanation": "Las funciones de agregación como AVG, SUM, MAX, MIN ignoran los NULL; si todos los valores son NULL, no hay nada que promediar y el resultado es NULL."
  },
  {
    "id": "sql-099",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "En 'SELECT id_departamento, COUNT(*) FROM empleados GROUP BY id_departamento;', ¿por qué NO se puede agregar 'nombres' al SELECT sin agruparlo o agregarlo?",
    "options": [
      "Sí se puede sin restricción alguna",
      "Porque cada grupo puede tener VARIOS empleados con distintos nombres — SQL no sabría cuál nombre individual mostrar por grupo",
      "Porque nombres es un tipo de dato incompatible con GROUP BY",
      "Porque GROUP BY solo permite una columna en el SELECT"
    ],
    "correctIndex": 1,
    "explanation": "Toda columna en el SELECT de una consulta con GROUP BY debe estar en el GROUP BY o dentro de una función de agregación — de lo contrario, sería ambiguo qué valor mostrar por grupo."
  },
  {
    "id": "sql-100",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué hace GROUP BY ROLLUP(id_departamento, id_puesto)?",
    "options": [
      "Es idéntico a un GROUP BY normal, sin ninguna diferencia",
      "Genera el detalle por combinación, más subtotales por id_departamento, más un gran total general",
      "Elimina las columnas repetidas",
      "Solo agrupa por id_puesto, ignorando id_departamento"
    ],
    "correctIndex": 1,
    "explanation": "ROLLUP añade automáticamente filas de subtotal (por el primer nivel de agrupación) y una fila de gran total, útil para reportes jerárquicos."
  },
  {
    "id": "sql-101",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué error produce 'SELECT id_departamento, salario FROM empleados GROUP BY id_departamento;' (sin agregar salario)?",
    "options": [
      "Ningún error, funciona perfectamente",
      "Error: 'salario' no es una expresión GROUP BY válida — debe estar en el GROUP BY o envuelta en una función de agregación",
      "Se muestra el salario del primer empleado de cada grupo automáticamente sin avisar",
      "Solo funciona si hay un único empleado por departamento"
    ],
    "correctIndex": 1,
    "explanation": "Oracle exige que toda columna del SELECT esté o bien en el GROUP BY, o bien dentro de una función de agregación — de lo contrario lanza un error de sintaxis, no un resultado ambiguo silencioso."
  },
  {
    "id": "sql-102",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Es válido usar HAVING sin GROUP BY en la misma consulta?",
    "options": [
      "No, siempre es un error de sintaxis",
      "Sí, es válido: trata toda la tabla como un único grupo implícito",
      "Solo en MySQL, no en Oracle",
      "Solo si hay más de una tabla"
    ],
    "correctIndex": 1,
    "explanation": "HAVING puede usarse sin GROUP BY explícito, tratando el resultado completo como un solo grupo — aunque es poco común, es sintácticamente válido."
  },
  {
    "id": "sql-103",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué devuelve la consulta 'SELECT id_departamento, AVG(salario) FROM empleados WHERE fecha_contratacion > DATE '2020-01-01' GROUP BY id_departamento HAVING AVG(salario) > 45000;'?",
    "options": [
      "El promedio de salario de TODOS los empleados de cada departamento, sin filtrar por fecha",
      "El promedio de salario por departamento, considerando solo empleados contratados después de 2020-01-01, mostrando solo los departamentos cuyo promedio resultante supera 45000",
      "Solo empleados con salario mayor a 45000, sin agrupar",
      "Un error de sintaxis por combinar WHERE con HAVING"
    ],
    "correctIndex": 1,
    "explanation": "El WHERE filtra filas individuales ANTES de agrupar (por fecha); el GROUP BY agrupa por departamento; el HAVING filtra los GRUPOS resultantes cuyo promedio supera 45000."
  },
  {
    "id": "sql-104",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Cuál de estas funciones de agregación IGNORA los valores NULL al calcularse?",
    "options": [
      "Ninguna de las funciones de agregación ignora NULL",
      "SUM, AVG, MAX, MIN y COUNT(columna) ignoran los NULL de esa columna (COUNT(*) es la excepción, cuenta filas)",
      "Solo COUNT(*) ignora NULL",
      "Solo SUM ignora NULL, las demás fallan con NULL"
    ],
    "correctIndex": 1,
    "explanation": "Las funciones de agregación estándar excluyen los NULL del cálculo; COUNT(*) es diferente porque cuenta FILAS, no valores de una columna específica."
  },
  {
    "id": "sql-105",
    "category": "sql",
    "topic": "Agregación y GROUP BY",
    "question": "¿Qué agrupa 'GROUP BY id_departamento, id_puesto' (dos columnas)?",
    "options": [
      "Solo por id_departamento, ignorando id_puesto",
      "Por cada combinación ÚNICA de (id_departamento, id_puesto)",
      "Produce un error de sintaxis, GROUP BY solo acepta una columna",
      "Agrupa todo en un solo grupo"
    ],
    "correctIndex": 1,
    "explanation": "GROUP BY con varias columnas agrupa por cada combinación distinta de esos valores, no por cada columna de forma independiente."
  },
  {
    "id": "sql-106",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué filas devuelve un INNER JOIN entre dos tablas?",
    "options": [
      "Todas las filas de ambas tablas, coincidan o no",
      "Solo las filas que tienen coincidencia en AMBAS tablas según la condición ON",
      "Solo las filas de la tabla izquierda",
      "Un producto cartesiano completo"
    ],
    "correctIndex": 1,
    "explanation": "INNER JOIN (el tipo más común) solo conserva las combinaciones de filas donde la condición de unión (ON) se cumple en ambos lados."
  },
  {
    "id": "sql-107",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué devuelve un LEFT JOIN entre empleados y departamentos si un empleado tiene id_departamento = NULL?",
    "options": [
      "El empleado desaparece del resultado por completo",
      "El empleado SÍ aparece, con las columnas de departamentos mostrando NULL (sin coincidencia)",
      "Se lanza un error",
      "El JOIN se comporta igual que un INNER JOIN"
    ],
    "correctIndex": 1,
    "explanation": "LEFT JOIN conserva TODAS las filas de la tabla izquierda (empleados), aunque no haya coincidencia en la derecha — en ese caso, las columnas de la derecha salen NULL."
  },
  {
    "id": "sql-108",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué tipo de JOIN devuelve TODAS las filas de ambas tablas, coincidan o no, rellenando con NULL donde falte coincidencia?",
    "options": [
      "INNER JOIN",
      "LEFT JOIN únicamente",
      "FULL OUTER JOIN",
      "CROSS JOIN"
    ],
    "correctIndex": 2,
    "explanation": "FULL OUTER JOIN combina el comportamiento de LEFT y RIGHT JOIN: conserva las filas sin coincidencia de AMBOS lados."
  },
  {
    "id": "sql-109",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué produce un CROSS JOIN entre dos tablas de 5 y 3 filas respectivamente?",
    "options": [
      "8 filas (5+3)",
      "15 filas: el producto cartesiano de todas las combinaciones posibles (5×3)",
      "3 filas, el mínimo de ambas",
      "0 filas, requiere una condición ON"
    ],
    "correctIndex": 1,
    "explanation": "CROSS JOIN combina cada fila de una tabla con CADA fila de la otra, sin condición de coincidencia — el resultado es multiplicativo, no aditivo."
  },
  {
    "id": "sql-110",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué es un 'self join' y para qué se usa típicamente en el esquema RRHH?",
    "options": [
      "Un JOIN entre dos tablas completamente distintas",
      "Una tabla unida CONSIGO MISMA, típico para mostrar la relación empleado-jefe usando id_jefe",
      "Un JOIN que siempre falla",
      "Sinónimo de INNER JOIN"
    ],
    "correctIndex": 1,
    "explanation": "Un self join usa alias distintos para la MISMA tabla (ej. 'emp' y 'jefe'), permitiendo relacionar filas de una tabla entre sí, como empleados con sus propios jefes."
  },
  {
    "id": "sql-111",
    "category": "sql",
    "topic": "JOIN",
    "question": "En 'FROM empleados emp LEFT JOIN empleados jefe ON emp.id_jefe = jefe.id_empleado;', ¿qué pasa con los empleados que NO tienen jefe (id_jefe IS NULL)?",
    "options": [
      "Desaparecen del resultado",
      "Aparecen en el resultado, con las columnas de 'jefe' en NULL",
      "Producen un error de auto-referencia",
      "Se muestran duplicados"
    ],
    "correctIndex": 1,
    "explanation": "El LEFT JOIN conserva a todos los empleados (tabla izquierda 'emp'), aunque no tengan jefe asignado — el 'jefe' correspondiente sale NULL."
  },
  {
    "id": "sql-112",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Cuántas tablas como MÁXIMO se pueden combinar en una sola consulta con múltiples JOIN?",
    "options": [
      "Solo 2, es el límite de Oracle",
      "No hay un límite práctico fijo — se pueden encadenar tantos JOIN como se necesiten (3, 4, o más tablas)",
      "Máximo 3",
      "Depende de la versión de Windows"
    ],
    "correctIndex": 1,
    "explanation": "SQL permite encadenar tantos JOIN como haga falta para combinar múltiples tablas relacionadas, como se ve en el ejemplo de empleados+departamentos+puestos."
  },
  {
    "id": "sql-113",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Cuál es la sintaxis MODERNA (ANSI, recomendada) para un JOIN, frente a la sintaxis antigua de 'join implícito' en el WHERE?",
    "options": [
      "FROM tabla1, tabla2 WHERE tabla1.col = tabla2.col",
      "FROM tabla1 JOIN tabla2 ON tabla1.col = tabla2.col",
      "Ambas son igual de recomendadas hoy en día",
      "JOIN tabla1 WITH tabla2"
    ],
    "correctIndex": 1,
    "explanation": "La sintaxis ANSI con JOIN...ON explícito es más clara y menos propensa a errores (como olvidar la condición y generar un producto cartesiano accidental) que el join implícito en el WHERE."
  },
  {
    "id": "sql-114",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué riesgo tiene la sintaxis antigua 'FROM empleados e, departamentos d WHERE ...' si accidentalmente se OLVIDA la condición de unión?",
    "options": [
      "Ningún riesgo, Oracle la agrega automáticamente",
      "Se produce silenciosamente un CROSS JOIN (producto cartesiano) con muchísimas más filas de las esperadas",
      "La consulta simplemente no devuelve resultados",
      "Lanza un error de sintaxis inmediato"
    ],
    "correctIndex": 1,
    "explanation": "Sin la condición de unión en el WHERE, la sintaxis antigua degenera en un producto cartesiano accidental — uno de los motivos por los que se prefiere la sintaxis ANSI JOIN...ON explícita."
  },
  {
    "id": "sql-115",
    "category": "sql",
    "topic": "JOIN",
    "question": "Para obtener empleados de un proyecto específico junto con su rol, ¿qué tablas hay que unir en el esquema RRHH?",
    "options": [
      "Solo EMPLEADOS y PROYECTOS directamente",
      "EMPLEADOS, EMPLEADO_PROYECTO y PROYECTOS (la tabla intermedia es indispensable para la relación N:M)",
      "Solo DEPARTAMENTOS y PROYECTOS",
      "Solo EMPLEADOS y DEPARTAMENTOS"
    ],
    "correctIndex": 1,
    "explanation": "Como la relación EMPLEADOS-PROYECTOS es N:M, hay que pasar necesariamente por la tabla intermedia EMPLEADO_PROYECTO para conectar ambas."
  },
  {
    "id": "sql-116",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué produce 'SELECT e.nombres, d.nombre_departamento FROM empleados e RIGHT JOIN departamentos d ON e.id_departamento = d.id_departamento;' respecto a departamentos SIN empleados asignados?",
    "options": [
      "Los departamentos sin empleados desaparecen del resultado",
      "Los departamentos sin empleados SÍ aparecen, con nombres de empleado en NULL",
      "Produce un error",
      "Se comporta igual que INNER JOIN"
    ],
    "correctIndex": 1,
    "explanation": "RIGHT JOIN conserva todas las filas de la tabla derecha (departamentos), incluso sin coincidencia en la izquierda (empleados) — mostrando NULL donde falte."
  },
  {
    "id": "sql-117",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué diferencia hay, en resultado final, entre 'A LEFT JOIN B' y 'B RIGHT JOIN A' (mismas tablas, condición ON equivalente)?",
    "options": [
      "Producen resultados completamente distintos e incompatibles",
      "Producen conceptualmente el MISMO resultado: ambas conservan todas las filas de A y agregan coincidencias de B",
      "RIGHT JOIN no existe en Oracle",
      "LEFT JOIN siempre tiene más filas que RIGHT JOIN"
    ],
    "correctIndex": 1,
    "explanation": "LEFT JOIN de A hacia B es equivalente a RIGHT JOIN de B hacia A (con la misma condición) — solo cambia qué tabla se escribe primero en la sintaxis."
  },
  {
    "id": "sql-118",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué tipo de JOIN usarías para listar TODOS los empleados, muestren o no un proyecto asignado?",
    "options": [
      "INNER JOIN entre empleados y empleado_proyecto",
      "LEFT JOIN desde empleados hacia empleado_proyecto (y proyectos)",
      "CROSS JOIN",
      "RIGHT JOIN desde proyectos hacia empleados"
    ],
    "correctIndex": 1,
    "explanation": "Un LEFT JOIN desde empleados conserva a TODOS los empleados, muestren o no una fila coincidente en empleado_proyecto/proyectos."
  },
  {
    "id": "sql-119",
    "category": "sql",
    "topic": "JOIN",
    "question": "Si dos tablas se unen con INNER JOIN y NINGUNA fila cumple la condición ON, ¿qué devuelve la consulta?",
    "options": [
      "Un error",
      "Un resultado vacío (cero filas), sin fallar",
      "Todas las filas de ambas tablas igualmente",
      "NULL como único valor"
    ],
    "correctIndex": 1,
    "explanation": "INNER JOIN simplemente no incluye ninguna fila si no hay coincidencias — el resultado es un conjunto vacío, no un error."
  },
  {
    "id": "sql-120",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué verifica 'WHERE EXISTS (SELECT 1 FROM empleado_proyecto ep WHERE ep.id_empleado = e.id_empleado)'?",
    "options": [
      "Que el empleado tenga salario mayor a 1",
      "Que exista AL MENOS una fila en empleado_proyecto relacionada con ese empleado (tiene algún proyecto asignado)",
      "Que el empleado no tenga ningún proyecto",
      "Cuenta cuántos proyectos tiene cada empleado"
    ],
    "correctIndex": 1,
    "explanation": "EXISTS solo comprueba si la subconsulta devuelve AL MENOS una fila; el 'SELECT 1' es una convención, el valor seleccionado no importa para EXISTS."
  },
  {
    "id": "sql-121",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué es una 'subconsulta correlacionada'?",
    "options": [
      "Una subconsulta que no depende de la consulta externa en absoluto",
      "Una subconsulta que referencia columnas de la consulta EXTERNA, y por eso se re-ejecuta conceptualmente por cada fila externa",
      "Una subconsulta que siempre devuelve un solo valor",
      "Un sinónimo de CTE"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de una subconsulta independiente (se ejecuta una sola vez), una correlacionada depende de la fila externa actual, como en 'WHERE e2.id_departamento = e.id_departamento'."
  },
  {
    "id": "sql-122",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Cuál es la trampa clásica de usar 'NOT IN' con una subconsulta cuyo resultado puede incluir NULL?",
    "options": [
      "No hay ninguna trampa, funciona siempre igual que NOT EXISTS",
      "Si la subconsulta devuelve al menos un NULL, 'NOT IN' NO devuelve NINGUNA fila en absoluto",
      "NOT IN lanza un error de sintaxis con NULL",
      "NOT IN ignora automáticamente los NULL de la subconsulta"
    ],
    "correctIndex": 1,
    "explanation": "Debido a la lógica de tres valores de SQL con NULL, un solo NULL en la lista de NOT IN hace que la comparación completa sea indeterminada para todas las filas, devolviendo un resultado vacío."
  },
  {
    "id": "sql-123",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué alternativa se recomienda usar en vez de NOT IN cuando la subconsulta puede contener NULL?",
    "options": [
      "IN en su lugar",
      "NOT EXISTS, que no sufre el mismo problema con NULL",
      "UNION",
      "GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "NOT EXISTS evalúa la existencia de coincidencias fila por fila y no se ve afectado por NULL de la misma forma que NOT IN."
  },
  {
    "id": "sql-124",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué tipo de subconsulta se coloca dentro del propio SELECT, devolviendo un único valor por fila, como '(SELECT AVG(salario) FROM empleados) AS promedio_general'?",
    "options": [
      "Subconsulta en FROM (inline view)",
      "Subconsulta escalar",
      "Subconsulta con EXISTS",
      "CTE recursivo"
    ],
    "correctIndex": 1,
    "explanation": "Una subconsulta escalar devuelve exactamente un valor (una fila, una columna) y puede usarse directamente como si fuera una expresión dentro del SELECT."
  },
  {
    "id": "sql-125",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué es una 'inline view' (subconsulta en el FROM)?",
    "options": [
      "Una vista permanente guardada en el diccionario de datos",
      "Una subconsulta usada directamente como si fuera una tabla dentro de la cláusula FROM de la consulta externa",
      "Un tipo de índice",
      "Un sinónimo de trigger"
    ],
    "correctIndex": 1,
    "explanation": "Una inline view es una subconsulta temporal usada solo dentro de esa consulta, en el FROM, tratada como si fuera una tabla derivada."
  },
  {
    "id": "sql-126",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué obtiene la consulta 'SELECT e.nombres FROM empleados e WHERE e.salario > (SELECT AVG(e2.salario) FROM empleados e2 WHERE e2.id_departamento = e.id_departamento);'?",
    "options": [
      "Empleados que ganan más que el promedio GENERAL de toda la empresa",
      "Empleados que ganan más que el promedio de SU PROPIO departamento (subconsulta correlacionada)",
      "Todos los empleados sin excepción",
      "Un error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "La subconsulta se correlaciona por id_departamento con la fila externa 'e', calculando un promedio distinto para cada departamento, no un promedio global."
  },
  {
    "id": "sql-127",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué diferencia principal hay entre usar IN con una subconsulta y usar un INNER JOIN para el mismo propósito de filtrado?",
    "options": [
      "IN nunca puede reemplazar a un JOIN",
      "Ambos pueden lograr resultados equivalentes en muchos casos, pero JOIN además permite traer columnas de la tabla relacionada en el SELECT, cosa que IN con subconsulta no permite directamente",
      "JOIN siempre es más lento que IN",
      "No hay ninguna diferencia en ningún caso"
    ],
    "correctIndex": 1,
    "explanation": "IN con subconsulta solo sirve para FILTRAR filas según pertenencia; si además necesitas mostrar columnas de la tabla relacionada, un JOIN es la herramienta adecuada."
  },
  {
    "id": "sql-128",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Qué devuelve 'SELECT nombres FROM empleados WHERE id_departamento IN (SELECT id_departamento FROM departamentos WHERE ubicacion LIKE '%México%');'?",
    "options": [
      "Empleados de TODOS los departamentos",
      "Empleados cuyos departamentos tienen una ubicación que contiene la palabra 'México'",
      "Solo los nombres de los departamentos",
      "Un error de sintaxis por anidar SELECT"
    ],
    "correctIndex": 1,
    "explanation": "La subconsulta obtiene primero los IDs de los departamentos cuya ubicación contiene 'México'; la consulta externa filtra empleados que pertenezcan a esos departamentos."
  },
  {
    "id": "sql-129",
    "category": "sql",
    "topic": "Subconsultas y EXISTS",
    "question": "¿Puede una subconsulta escalar en el SELECT devolver MÁS de una fila sin causar error?",
    "options": [
      "Sí, siempre sin problema",
      "No: si una subconsulta escalar devuelve más de una fila, Oracle lanza un error en tiempo de ejecución (ORA-01427: single-row subquery returns more than one row)",
      "Solo si se usa DISTINCT",
      "Depende del tipo de dato"
    ],
    "correctIndex": 1,
    "explanation": "Una subconsulta usada como valor escalar debe devolver como máximo una fila y una columna; si devuelve más de una fila, Oracle lanza un error explícito."
  },
  {
    "id": "sql-130",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué palabra clave introduce un Common Table Expression (CTE) en Oracle?",
    "options": [
      "WITH",
      "AS TABLE",
      "DEFINE",
      "USING"
    ],
    "correctIndex": 0,
    "explanation": "La cláusula WITH nombre_cte AS (subconsulta) define un CTE, que luego se referencia como si fuera una tabla en la consulta principal."
  },
  {
    "id": "sql-131",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué ventaja principal ofrece un CTE frente a repetir la misma subconsulta varias veces en una consulta compleja?",
    "options": [
      "Ninguna, son exactamente equivalentes en todo sentido",
      "Mejora la legibilidad al dar un nombre reutilizable a la subconsulta, evitando repetir la misma lógica varias veces",
      "Los CTE siempre son más rápidos automáticamente",
      "Los CTE no pueden usar JOIN"
    ],
    "correctIndex": 1,
    "explanation": "Un CTE le da un nombre legible a una subconsulta compleja, permitiendo reutilizarla dentro de la misma sentencia sin repetir su definición."
  },
  {
    "id": "sql-132",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué caso de uso clásico resuelve un CTE RECURSIVO, como alternativa moderna a CONNECT BY?",
    "options": [
      "Ordenar resultados alfabéticamente",
      "Recorrer jerarquías (ej. empleado-jefe) combinando un caso base con un paso recursivo que se une consigo mismo",
      "Calcular promedios simples",
      "Insertar datos masivamente"
    ],
    "correctIndex": 1,
    "explanation": "Un CTE recursivo define un caso base (UNION ALL) y un paso recursivo que se referencia a sí mismo, ideal para árboles/jerarquías como la cadena de mando."
  },
  {
    "id": "sql-133",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué hace la cláusula 'START WITH id_jefe IS NULL' en una consulta CONNECT BY?",
    "options": [
      "Define el paso recursivo",
      "Define el punto de PARTIDA (raíz) de la jerarquía: los empleados sin jefe asignado",
      "Ordena el resultado",
      "Filtra empleados con salario nulo"
    ],
    "correctIndex": 1,
    "explanation": "START WITH indica desde qué fila(s) arranca el recorrido jerárquico — en este caso, los 'top' de la jerarquía que no tienen jefe."
  },
  {
    "id": "sql-134",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué representa PRIOR en 'CONNECT BY PRIOR id_empleado = id_jefe'?",
    "options": [
      "Un tipo de índice",
      "Hace referencia a la fila 'padre' (anterior en el recorrido) dentro de la cláusula de jerarquía",
      "Un operador de comparación de fechas",
      "Una función de agregación"
    ],
    "correctIndex": 1,
    "explanation": "PRIOR indica cuál de las dos columnas de la condición corresponde a la fila padre ya procesada en el recorrido jerárquico, definiendo la dirección del árbol."
  },
  {
    "id": "sql-135",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Para qué sirve la pseudo-columna LEVEL en una consulta con CONNECT BY?",
    "options": [
      "Indica el salario del empleado",
      "Indica la profundidad/nivel jerárquico de cada fila dentro del árbol recorrido (1 para la raíz, 2 para sus hijos directos, etc.)",
      "Cuenta cuántas filas tiene la tabla",
      "Es sinónimo de ROWNUM"
    ],
    "correctIndex": 1,
    "explanation": "LEVEL es una pseudo-columna exclusiva de consultas jerárquicas que indica en qué profundidad del árbol está cada fila devuelta."
  },
  {
    "id": "sql-136",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "¿Qué función construye una ruta textual completa (como 'A > B > C') mostrando el camino jerárquico hasta cada fila?",
    "options": [
      "SYS_CONNECT_BY_PATH",
      "CONNECT_BY_ROOT",
      "LEVEL",
      "PRIOR"
    ],
    "correctIndex": 0,
    "explanation": "SYS_CONNECT_BY_PATH(columna, separador) concatena los valores desde la raíz hasta la fila actual, formando una ruta legible."
  },
  {
    "id": "sql-137",
    "category": "sql",
    "topic": "CTE y jerarquías",
    "question": "En un CTE recursivo con 'UNION ALL', ¿qué representa la primera parte (antes de UNION ALL) y qué representa la segunda?",
    "options": [
      "Ambas partes son el caso base, ejecutado dos veces",
      "La primera es el CASO BASE (punto de partida); la segunda es el PASO RECURSIVO, que se une consigo mismo repetidamente",
      "La primera es el paso recursivo; la segunda el caso base",
      "No tiene un orden definido, son intercambiables"
    ],
    "correctIndex": 1,
    "explanation": "La estructura estándar de un CTE recursivo es: caso_base UNION ALL paso_recursivo (que referencia al propio CTE), continuando hasta que el paso recursivo no produzca más filas."
  },
  {
    "id": "sql-138",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué diferencia principal hay entre una función de ventana (OVER) y GROUP BY?",
    "options": [
      "Son exactamente lo mismo",
      "GROUP BY COLAPSA el resultado en un valor por grupo; una función de ventana calcula un valor por CADA FILA, sin colapsar el detalle",
      "Las funciones de ventana no pueden usar agregaciones",
      "GROUP BY siempre es más rápido"
    ],
    "correctIndex": 1,
    "explanation": "Con OVER(), cada fila conserva su propio detalle mientras 've' el resultado calculado sobre un conjunto de filas relacionadas (la 'ventana'), a diferencia de GROUP BY que reduce el número de filas del resultado."
  },
  {
    "id": "sql-139",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué diferencia hay entre RANK() y DENSE_RANK() ante un EMPATE en el criterio de orden?",
    "options": [
      "Son exactamente idénticas siempre",
      "RANK() deja 'huecos' en la numeración tras un empate (ej. 1,2,2,4); DENSE_RANK() no deja huecos (ej. 1,2,2,3)",
      "DENSE_RANK() siempre empieza en 0",
      "RANK() no puede usarse con PARTITION BY"
    ],
    "correctIndex": 1,
    "explanation": "Ante un empate en la posición 2, RANK() salta directamente al 4 para la siguiente fila distinta; DENSE_RANK() continúa consecutivamente en 3."
  },
  {
    "id": "sql-140",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué hace la cláusula PARTITION BY dentro de una función de ventana?",
    "options": [
      "Ordena el resultado final de la consulta completa",
      "Divide las filas en grupos independientes, calculando la función de ventana por separado DENTRO de cada grupo",
      "Elimina duplicados",
      "Filtra filas antes del cálculo"
    ],
    "correctIndex": 1,
    "explanation": "PARTITION BY reinicia el cálculo de la función de ventana para cada partición — ej. RANK() reinicia el ranking en cada departamento por separado."
  },
  {
    "id": "sql-141",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Para qué sirven las funciones LAG() y LEAD()?",
    "options": [
      "Para calcular sumas acumuladas únicamente",
      "Para acceder al valor de una fila ANTERIOR (LAG) o SIGUIENTE (LEAD) según un orden definido, sin necesidad de un self-join",
      "Para eliminar filas duplicadas",
      "Para convertir tipos de datos"
    ],
    "correctIndex": 1,
    "explanation": "LAG/LEAD permiten comparar cada fila con la fila 'vecina' (anterior/siguiente) según el ORDER BY de la ventana, sin escribir un self-join manual."
  },
  {
    "id": "sql-142",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué calcula 'SUM(salario) OVER (ORDER BY fecha_contratacion)' sin PARTITION BY?",
    "options": [
      "El total general fijo, repetido en cada fila",
      "Un total ACUMULADO (running total): la suma de todos los salarios desde el inicio del orden hasta la fila actual",
      "El promedio de salarios",
      "Un error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "Sin un marco explícito, ORDER BY dentro de OVER() por defecto acumula desde el principio hasta la fila actual — produciendo un total corriente (running total)."
  },
  {
    "id": "sql-143",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué obtiene esta consulta? 'SELECT * FROM (SELECT nombres, salario, id_departamento, RANK() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS puesto FROM empleados) WHERE puesto = 1;'",
    "options": [
      "Todos los empleados ordenados por salario",
      "El empleado (o empleados empatados) mejor pagado de CADA departamento",
      "El empleado peor pagado de toda la empresa",
      "Un error, no se puede filtrar sobre una función de ventana en el WHERE directamente sin subconsulta"
    ],
    "correctIndex": 1,
    "explanation": "RANK() particionado por departamento asigna el puesto 1 al salario más alto DENTRO de cada departamento; filtrar puesto=1 en la subconsulta externa aísla al mejor pagado de cada uno."
  },
  {
    "id": "sql-144",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué calcula RATIO_TO_REPORT(salario) OVER (PARTITION BY id_departamento)?",
    "options": [
      "El salario absoluto de cada empleado",
      "La proporción (fracción) que representa el salario de cada empleado respecto al TOTAL de su propio departamento",
      "El ranking del empleado",
      "La diferencia respecto al salario anterior"
    ],
    "correctIndex": 1,
    "explanation": "RATIO_TO_REPORT calcula qué fracción del total de la partición representa cada fila — típicamente multiplicado por 100 para expresarlo como porcentaje."
  },
  {
    "id": "sql-145",
    "category": "sql",
    "topic": "Funciones analíticas",
    "question": "¿Qué controla la cláusula 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW' dentro de una función de ventana?",
    "options": [
      "Ordena de forma descendente",
      "Define un MARCO explícito: solo considera la fila actual y las 2 filas anteriores para el cálculo (ej. un promedio móvil)",
      "Excluye la fila actual del cálculo",
      "Es sinónimo de PARTITION BY"
    ],
    "correctIndex": 1,
    "explanation": "Este marco explícito acota la ventana a un rango específico de filas relativas a la actual, típico para calcular promedios/sumas móviles."
  },
  {
    "id": "sql-146",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué diferencia hay entre UNION y UNION ALL?",
    "options": [
      "Son exactamente lo mismo",
      "UNION elimina filas duplicadas del resultado combinado; UNION ALL las conserva (y es más rápido al no tener que comparar/eliminar duplicados)",
      "UNION ALL elimina duplicados, UNION no",
      "UNION solo funciona con una tabla"
    ],
    "correctIndex": 1,
    "explanation": "UNION hace un paso adicional de deduplicación (más costoso); UNION ALL simplemente concatena ambos resultados sin comparar filas entre sí."
  },
  {
    "id": "sql-147",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué operador de conjuntos usa Oracle para 'filas del primer resultado que NO están en el segundo' (a diferencia del estándar EXCEPT de otros motores)?",
    "options": [
      "EXCEPT",
      "MINUS",
      "DIFFERENCE",
      "NOT IN"
    ],
    "correctIndex": 1,
    "explanation": "Oracle usa MINUS con esta semántica; otros motores (SQL Server, PostgreSQL) usan la palabra EXCEPT para lo mismo."
  },
  {
    "id": "sql-148",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué devuelve INTERSECT entre dos consultas?",
    "options": [
      "Todas las filas de ambas consultas combinadas",
      "Solo las filas que aparecen en AMBOS resultados simultáneamente",
      "Las filas que están en la primera pero no en la segunda",
      "Un producto cartesiano"
    ],
    "correctIndex": 1,
    "explanation": "INTERSECT conserva únicamente las filas presentes en ambos conjuntos de resultados a la vez."
  },
  {
    "id": "sql-149",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué requisito estructural deben cumplir dos consultas para poder combinarse con UNION/INTERSECT/MINUS?",
    "options": [
      "Deben usar exactamente las mismas tablas en el FROM",
      "Deben devolver el MISMO número de columnas, con tipos de datos compatibles entre sí, en el mismo orden",
      "Deben tener el mismo número de filas",
      "No hay ningún requisito"
    ],
    "correctIndex": 1,
    "explanation": "La 'regla de oro' de los operadores de conjuntos: mismo número de columnas y tipos compatibles posición a posición, sin importar los nombres de columna originales."
  },
  {
    "id": "sql-150",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué obtiene 'SELECT id_departamento FROM empleados MINUS SELECT id_departamento FROM proyectos;'?",
    "options": [
      "Departamentos que tienen tanto empleados como proyectos",
      "Departamentos que tienen empleados pero NO tienen ningún proyecto asociado",
      "Todos los departamentos sin excepción",
      "Un error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "MINUS conserva los valores del primer conjunto que NO aparecen en el segundo — departamentos con empleados que carecen de proyectos."
  },
  {
    "id": "sql-151",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Cuál de estos operadores de conjunto es generalmente más RÁPIDO, al no requerir un paso de eliminación de duplicados?",
    "options": [
      "UNION",
      "UNION ALL",
      "INTERSECT",
      "MINUS"
    ],
    "correctIndex": 1,
    "explanation": "UNION ALL simplemente concatena resultados sin comparar filas para deduplicar, por lo que suele ser más eficiente que UNION cuando los duplicados no son un problema."
  },
  {
    "id": "sql-152",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué hace la función NVL(telefono, 'Sin teléfono')?",
    "options": [
      "Convierte telefono a mayúsculas",
      "Devuelve el valor de telefono si NO es NULL, o el texto 'Sin teléfono' si telefono ES NULL",
      "Elimina la columna telefono",
      "Cuenta cuántos teléfonos hay"
    ],
    "correctIndex": 1,
    "explanation": "NVL(expresión, valor_si_null) es la función clásica de Oracle para sustituir NULL por un valor alternativo."
  },
  {
    "id": "sql-153",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué diferencia hay entre NVL y NVL2?",
    "options": [
      "Son exactamente iguales",
      "NVL solo ofrece UN valor alternativo si es NULL; NVL2 permite un valor SI es NULL y otro DISTINTO si NO es NULL",
      "NVL2 no existe en Oracle",
      "NVL solo funciona con números"
    ],
    "correctIndex": 1,
    "explanation": "NVL2(expr, valor_si_no_null, valor_si_null) da más flexibilidad al permitir un resultado distinto según si la expresión es NULL o no, no solo un reemplazo del NULL."
  },
  {
    "id": "sql-154",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué hace COALESCE(telefono, email, 'Sin datos de contacto')?",
    "options": [
      "Concatena los tres valores en un solo texto",
      "Devuelve el PRIMER valor no-NULL de la lista, en orden: telefono, si es NULL prueba email, si también es NULL usa el texto por defecto",
      "Siempre devuelve 'Sin datos de contacto'",
      "Solo funciona con dos argumentos, no con tres"
    ],
    "correctIndex": 1,
    "explanation": "COALESCE generaliza a NVL para más de dos argumentos, devolviendo el primero que no sea NULL en la lista, evaluados en orden."
  },
  {
    "id": "sql-155",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué produce SUBSTR('García', 1, 3)?",
    "options": [
      "'ía'",
      "'Gar' (los primeros 3 caracteres, empezando en la posición 1)",
      "'arc'",
      "Un error, SUBSTR necesita 4 argumentos"
    ],
    "correctIndex": 1,
    "explanation": "SUBSTR(texto, posición_inicio, longitud) extrae una subcadena; en Oracle, la posición inicial es 1 (no 0)."
  },
  {
    "id": "sql-156",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué hace la función INITCAP('maría lópez')?",
    "options": [
      "Convierte todo a mayúsculas: 'MARÍA LÓPEZ'",
      "Pone en mayúscula la primera letra de CADA palabra: 'María López'",
      "Convierte todo a minúsculas",
      "Elimina los espacios"
    ],
    "correctIndex": 1,
    "explanation": "INITCAP capitaliza (pone en mayúscula) la primera letra de cada palabra del texto, dejando el resto en minúscula."
  },
  {
    "id": "sql-157",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué diferencia hay entre ROUND(salario, -3) y TRUNC(salario, -3) para el valor 1234567?",
    "options": [
      "Ambos devuelven exactamente 1234000",
      "ROUND redondea a la unidad de mil más cercana (1235000); TRUNC simplemente corta sin redondear (1234000)",
      "TRUNC redondea y ROUND trunca (comportamiento invertido)",
      "Ambos producen un error con escala negativa"
    ],
    "correctIndex": 1,
    "explanation": "ROUND aplica redondeo matemático estándar; TRUNC simplemente descarta los dígitos sin considerar si deberían redondear hacia arriba."
  },
  {
    "id": "sql-158",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué devuelve MOD(salario, 1000) para salario = 45500?",
    "options": [
      "45",
      "500 (el resto de dividir 45500 entre 1000)",
      "45.5",
      "45000"
    ],
    "correctIndex": 1,
    "explanation": "MOD(a, b) devuelve el resto de la división entera de a entre b: 45500 / 1000 = 45 con resto 500."
  },
  {
    "id": "sql-159",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué hace CASE en una consulta SQL, comparado con IF/ELSE en un lenguaje de programación?",
    "options": [
      "No tiene equivalente, es exclusivo de PL/SQL",
      "Evalúa condiciones en orden y devuelve el primer resultado cuya condición WHEN sea verdadera, similar a un if/else if/else encadenado",
      "Solo puede usarse en el WHERE, nunca en el SELECT",
      "Reemplaza por completo a GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "CASE WHEN condicion1 THEN valor1 WHEN condicion2 THEN valor2 ELSE valor_default END funciona como una cadena de if/else if/else dentro de una expresión SQL."
  },
  {
    "id": "sql-160",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué hace DECODE(id_departamento, 10, 'Tecnología', 20, 'Ventas', 'Otro')?",
    "options": [
      "Es equivalente a un CASE de igualdad simple: compara id_departamento contra cada valor listado y devuelve el resultado correspondiente, o 'Otro' si no coincide con ninguno",
      "Solo funciona con fechas",
      "Convierte el número a texto codificado en base64",
      "Es sinónimo exacto de NVL"
    ],
    "correctIndex": 0,
    "explanation": "DECODE es la forma clásica (pre-CASE) de Oracle para comparaciones de igualdad simples: valor, comparación1, resultado1, comparación2, resultado2, ..., default."
  },
  {
    "id": "sql-161",
    "category": "sql",
    "topic": "Funciones escalares",
    "question": "¿Qué devuelve TRIM('  hola  ')?",
    "options": [
      "'  hola  ' sin cambios",
      "'hola' (elimina los espacios en blanco de ambos extremos)",
      "'holahola'",
      "Un error de sintaxis"
    ],
    "correctIndex": 1,
    "explanation": "TRIM elimina espacios en blanco (u otro carácter especificado) del inicio y del final de un texto, sin afectar espacios internos."
  },
  {
    "id": "sql-162",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué diferencia hay entre un privilegio de SISTEMA y un privilegio de OBJETO en Oracle?",
    "options": [
      "Son exactamente lo mismo",
      "Los privilegios de sistema controlan acciones a nivel de toda la base de datos (ej. CREATE TABLE); los de objeto controlan acciones sobre un objeto específico (ej. SELECT sobre una tabla concreta)",
      "Los privilegios de objeto son siempre más poderosos",
      "Solo existen privilegios de sistema en Oracle"
    ],
    "correctIndex": 1,
    "explanation": "CREATE SESSION/CREATE TABLE son privilegios de sistema (alcance global); SELECT/INSERT/UPDATE sobre 'rrhh.empleados' son privilegios de objeto (alcance específico)."
  },
  {
    "id": "sql-163",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué hace 'GRANT SELECT ON rrhh.empleados TO PUBLIC;'?",
    "options": [
      "Otorga el privilegio SELECT únicamente al usuario 'PUBLIC'",
      "Otorga el privilegio SELECT sobre esa tabla a TODOS los usuarios de la base de datos",
      "Revoca el privilegio SELECT de todos",
      "Crea una vista pública"
    ],
    "correctIndex": 1,
    "explanation": "PUBLIC es una palabra clave especial que representa a TODOS los usuarios de la base — otorgar un privilegio a PUBLIC lo concede globalmente."
  },
  {
    "id": "sql-164",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué permite hacer la cláusula WITH GRANT OPTION al otorgar un privilegio?",
    "options": [
      "Que el privilegio expire automáticamente en 30 días",
      "Que el usuario que RECIBE el privilegio pueda, a su vez, otorgárselo a otros usuarios",
      "Que el privilegio sea de solo lectura",
      "Que el privilegio aplique solo los fines de semana"
    ],
    "correctIndex": 1,
    "explanation": "WITH GRANT OPTION propaga la capacidad de conceder ese mismo privilegio, no solo de usarlo — hay que otorgarla con cuidado, ya que delega poder adicional."
  },
  {
    "id": "sql-165",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué hace REVOKE en Oracle?",
    "options": [
      "Otorga un privilegio nuevo",
      "Retira/quita un privilegio previamente otorgado a un usuario o rol",
      "Elimina un usuario completo",
      "Crea una copia de seguridad"
    ],
    "correctIndex": 1,
    "explanation": "REVOKE es el comando inverso de GRANT: quita un privilegio de sistema u objeto que había sido concedido anteriormente."
  },
  {
    "id": "sql-166",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Para qué sirve crear un ROLE (rol) en vez de otorgar privilegios individualmente a cada usuario?",
    "options": [
      "Los roles no tienen ninguna utilidad real en Oracle",
      "Agrupar varios privilegios bajo un solo nombre, para asignarlos/revocarlos en bloque a muchos usuarios de forma más manejable",
      "Los roles reemplazan por completo a los usuarios",
      "Solo sirven para privilegios de sistema, nunca de objeto"
    ],
    "correctIndex": 1,
    "explanation": "Un ROLE agrupa privilegios relacionados (ej. rol_analista con varios SELECT) que luego se asignan de una sola vez a múltiples usuarios, simplificando la administración."
  },
  {
    "id": "sql-167",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué rol predefinido de Oracle otorga privilegios TOTALES de administrador, y por qué se debe usar con extremo cuidado?",
    "options": [
      "CONNECT",
      "RESOURCE",
      "DBA",
      "PUBLIC"
    ],
    "correctIndex": 2,
    "explanation": "El rol DBA concede prácticamente todos los privilegios sobre la base de datos — otorgarlo sin necesidad real representa un riesgo grave de seguridad."
  },
  {
    "id": "sql-168",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué vista del diccionario de datos consultarías para ver los privilegios de OBJETO otorgados al usuario actual?",
    "options": [
      "user_tab_privs",
      "dba_users",
      "v$session",
      "all_objects"
    ],
    "correctIndex": 0,
    "explanation": "user_tab_privs muestra los privilegios de objeto (SELECT, INSERT, etc.) que el usuario actual tiene sobre distintas tablas/vistas."
  },
  {
    "id": "sql-169",
    "category": "sql",
    "topic": "DCL",
    "question": "¿Qué otorga el rol predefinido CONNECT de Oracle?",
    "options": [
      "Privilegios totales de DBA",
      "Privilegios básicos para poder conectarse a la base de datos",
      "Privilegios para crear tablas y secuencias propias",
      "Acceso de solo lectura a todas las tablas del sistema"
    ],
    "correctIndex": 1,
    "explanation": "CONNECT es un rol predefinido con privilegios mínimos orientados a permitir la conexión; RESOURCE es el que típicamente se combina para permitir crear objetos propios."
  },
  {
    "id": "sql-170",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué hace COMMIT en una transacción SQL?",
    "options": [
      "Deshace todos los cambios pendientes",
      "Confirma de forma PERMANENTE todos los cambios pendientes de la transacción actual",
      "Crea un punto de control intermedio",
      "Bloquea la tabla para otros usuarios"
    ],
    "correctIndex": 1,
    "explanation": "COMMIT hace permanentes los cambios de DML pendientes; después de un COMMIT, ya no se pueden deshacer con ROLLBACK."
  },
  {
    "id": "sql-171",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué hace ROLLBACK (sin especificar un SAVEPOINT)?",
    "options": [
      "Confirma los cambios pendientes",
      "Deshace TODOS los cambios pendientes desde el último COMMIT (o desde el inicio de la transacción)",
      "Solo deshace la última sentencia ejecutada",
      "Elimina la tabla completa"
    ],
    "correctIndex": 1,
    "explanation": "ROLLBACK sin SAVEPOINT revierte absolutamente todo lo pendiente de confirmar en la transacción actual, no solo el cambio más reciente."
  },
  {
    "id": "sql-172",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué permite hacer un SAVEPOINT dentro de una transacción?",
    "options": [
      "Confirmar cambios de forma permanente e irreversible",
      "Crear un punto de control intermedio al que se puede volver con ROLLBACK TO, deshaciendo solo lo posterior a ese punto",
      "Bloquear la tabla completa",
      "Cambiar el nivel de aislamiento"
    ],
    "correctIndex": 1,
    "explanation": "SAVEPOINT marca un punto intermedio; 'ROLLBACK TO SAVEPOINT nombre' deshace solo los cambios posteriores a ese punto, conservando lo anterior."
  },
  {
    "id": "sql-173",
    "category": "sql",
    "topic": "TCL",
    "question": "Si se ejecuta un DDL (como CREATE TABLE) en medio de una transacción con cambios DML pendientes, ¿qué ocurre con esos cambios pendientes?",
    "options": [
      "Se deshacen automáticamente",
      "Se confirman (COMMIT implícito) automáticamente ANTES de que el DDL se ejecute",
      "No pasa nada, quedan pendientes igual que antes",
      "El DDL falla si hay cambios DML pendientes"
    ],
    "correctIndex": 1,
    "explanation": "Cualquier sentencia DDL hace un COMMIT implícito de todo lo pendiente antes de ejecutarse — un ROLLBACK posterior ya no podría deshacer esos cambios DML."
  },
  {
    "id": "sql-174",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué alcance tiene un COMMIT o ROLLBACK: afecta solo a la última sentencia ejecutada, o a toda la transacción?",
    "options": [
      "Solo a la última sentencia ejecutada",
      "A TODA la transacción activa: todas las sentencias DML pendientes desde el último COMMIT/ROLLBACK, no solo la última",
      "Depende de si se usa DELETE o UPDATE",
      "Solo afecta sentencias SELECT"
    ],
    "correctIndex": 1,
    "explanation": "COMMIT/ROLLBACK operan sobre toda la transacción en curso, confirmando o revirtiendo TODAS las sentencias DML pendientes, sin importar cuántas fueron."
  },
  {
    "id": "sql-175",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué hace 'SET TRANSACTION READ ONLY;'?",
    "options": [
      "Impide cualquier consulta SELECT en la sesión",
      "Garantiza una 'foto' (snapshot) consistente de los datos durante toda la transacción, sin permitir escrituras",
      "Borra todos los datos de solo lectura",
      "Es sinónimo de ROLLBACK"
    ],
    "correctIndex": 1,
    "explanation": "Una transacción de solo lectura asegura que todas las consultas dentro de ella vean el mismo snapshot consistente de los datos, sin permitir modificaciones."
  },
  {
    "id": "sql-176",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué controla 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;'?",
    "options": [
      "El tamaño máximo de la transacción",
      "El nivel de aislamiento respecto a otras transacciones concurrentes, siendo SERIALIZABLE el más estricto",
      "El tiempo máximo de espera de un bloqueo",
      "El usuario que ejecuta la transacción"
    ],
    "correctIndex": 1,
    "explanation": "SERIALIZABLE es el nivel de aislamiento más estricto disponible, previniendo dirty reads, non-repeatable reads y phantom reads."
  },
  {
    "id": "sql-177",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué controla la configuración AUTOCOMMIT en una herramienta cliente como SQL*Plus?",
    "options": [
      "El formato de fecha por defecto",
      "Si cada sentencia DML se confirma (COMMIT) automáticamente por sí sola, o si el usuario decide cuándo confirmar manualmente",
      "El nivel de privilegios del usuario",
      "El tamaño de los resultados mostrados"
    ],
    "correctIndex": 1,
    "explanation": "Con AUTOCOMMIT ON, cada DML se confirma solo, perdiendo el control manual de la transacción; el comportamiento recomendado suele ser AUTOCOMMIT OFF."
  },
  {
    "id": "sql-178",
    "category": "sql",
    "topic": "TCL",
    "question": "Tras ejecutar 'SAVEPOINT punto_control;' dos veces (reutilizando el mismo nombre), ¿a qué punto exacto apunta un ROLLBACK TO SAVEPOINT punto_control posterior?",
    "options": [
      "Al PRIMER SAVEPOINT con ese nombre",
      "Al SEGUNDO (más reciente) SAVEPOINT con ese nombre: el nombre reutilizado 'mueve' el punto de control",
      "Produce un error por nombre duplicado",
      "Al inicio de la transacción, ignorando ambos SAVEPOINT"
    ],
    "correctIndex": 1,
    "explanation": "Al reutilizar el mismo nombre de SAVEPOINT, este se reposiciona al punto más reciente donde se declaró, y el ROLLBACK TO usa esa última posición."
  },
  {
    "id": "sql-179",
    "category": "sql",
    "topic": "TCL",
    "question": "¿Qué hace RELEASE SAVEPOINT nombre?",
    "options": [
      "Ejecuta un ROLLBACK hasta ese punto",
      "Libera/elimina ese punto de control, de forma que ya no se puede hacer ROLLBACK TO ese SAVEPOINT después",
      "Confirma la transacción completa",
      "Crea un nuevo SAVEPOINT"
    ],
    "correctIndex": 1,
    "explanation": "RELEASE SAVEPOINT simplemente descarta la referencia a ese punto de control, sin deshacer ni confirmar ningún cambio por sí mismo."
  },
  {
    "id": "sql-180",
    "category": "sql",
    "topic": "Índices",
    "question": "¿Qué estructura de datos usa típicamente un índice de Oracle para acelerar búsquedas?",
    "options": [
      "Una lista enlazada",
      "Un árbol B-tree",
      "Una tabla hash pura únicamente",
      "Un array sin ordenar"
    ],
    "correctIndex": 1,
    "explanation": "Los índices B-tree son la estructura por defecto en Oracle, eficientes para búsquedas por igualdad y por rango."
  },
  {
    "id": "sql-181",
    "category": "sql",
    "topic": "Índices",
    "question": "¿En qué orden importa declarar las columnas de un ÍNDICE COMPUESTO (varias columnas)?",
    "options": [
      "El orden nunca importa",
      "Sí importa: el índice es más útil cuando el filtro usa las columnas en el MISMO orden en que fueron declaradas en el índice (empezando por la primera)",
      "Solo importa si son del mismo tipo de dato",
      "Los índices compuestos no existen en Oracle"
    ],
    "correctIndex": 1,
    "explanation": "Un índice sobre (id_departamento, salario) es óptimo para 'WHERE id_departamento = X AND salario > Y', pero mucho menos útil si solo filtras por salario sin id_departamento."
  },
  {
    "id": "sql-182",
    "category": "sql",
    "topic": "Índices",
    "question": "¿Cuándo NO conviene crear un índice sobre una columna?",
    "options": [
      "Siempre conviene indexar cualquier columna, sin excepciones",
      "Cuando la columna tiene muy pocos valores distintos (baja cardinalidad, ej. 'M'/'F'), en tablas muy pequeñas, o en columnas rara vez filtradas",
      "Solo cuando la tabla tiene más de un millón de filas",
      "Nunca se debe indexar una clave primaria"
    ],
    "correctIndex": 1,
    "explanation": "Un índice ocupa espacio y ralentiza INSERT/UPDATE/DELETE (hay que mantenerlo actualizado); en columnas de baja cardinalidad o poco filtradas, el costo supera el beneficio."
  },
  {
    "id": "sql-183",
    "category": "sql",
    "topic": "Índices",
    "question": "¿Qué permite hacer un índice BASADO EN FUNCIÓN, como CREATE INDEX ... ON empleados (LOWER(email))?",
    "options": [
      "Indexar solo columnas numéricas",
      "Que una búsqueda como WHERE LOWER(email) = '...' pueda usar el índice, algo que un índice normal sobre 'email' no permitiría de forma eficiente",
      "Eliminar la necesidad de una PRIMARY KEY",
      "Ordenar automáticamente toda la tabla"
    ],
    "correctIndex": 1,
    "explanation": "Un índice basado en función precalcula el resultado de esa expresión (ej. LOWER(email)) para poder usarlo eficientemente en búsquedas case-insensitive."
  },
  {
    "id": "sql-184",
    "category": "sql",
    "topic": "Vistas (VIEW)",
    "question": "¿Qué es una VIEW (vista) en SQL?",
    "options": [
      "Una copia física de los datos, actualizada periódicamente por defecto",
      "Una consulta guardada que se comporta como una tabla virtual, ejecutándose de nuevo cada vez que se consulta",
      "Un tipo de índice especial",
      "Un sinónimo de tabla temporal"
    ],
    "correctIndex": 1,
    "explanation": "Una vista NO almacena datos por sí misma (salvo que sea materializada); es una consulta guardada que se re-ejecuta contra las tablas base cada vez que se consulta la vista."
  },
  {
    "id": "sql-185",
    "category": "sql",
    "topic": "Vistas (VIEW)",
    "question": "¿Qué diferencia hay entre una VIEW normal y una MATERIALIZED VIEW?",
    "options": [
      "Son exactamente lo mismo",
      "La VIEW normal recalcula su consulta en cada acceso; la MATERIALIZED VIEW guarda físicamente el resultado, que debe refrescarse manualmente o programado",
      "MATERIALIZED VIEW no puede usar JOIN",
      "Una VIEW normal es siempre más lenta que una tabla física"
    ],
    "correctIndex": 1,
    "explanation": "Las vistas materializadas son útiles para reportes pesados: evitan recalcular la consulta completa cada vez, a cambio de que los datos puedan quedar 'desactualizados' hasta el próximo REFRESH."
  },
  {
    "id": "sql-186",
    "category": "sql",
    "topic": "Vistas (VIEW)",
    "question": "¿Qué evita la cláusula 'WITH READ ONLY' al crear una vista?",
    "options": [
      "Que la vista se pueda consultar con SELECT",
      "Que alguien intente INSERT/UPDATE/DELETE datos 'a través' de la vista hacia las tablas base",
      "Que la vista use JOIN",
      "Que la vista se elimine accidentalmente"
    ],
    "correctIndex": 1,
    "explanation": "WITH READ ONLY convierte la vista en estrictamente de solo consulta, previniendo modificaciones indirectas sobre las tablas subyacentes a través de ella."
  },
  {
    "id": "sql-187",
    "category": "sql",
    "topic": "Secuencias e IDENTITY",
    "question": "¿Por qué Oracle usa SEQUENCE en vez de un AUTO_INCREMENT como MySQL?",
    "options": [
      "Oracle no soporta generar valores automáticos de ningún tipo",
      "Oracle históricamente implementa la generación de valores únicos como un objeto INDEPENDIENTE (la secuencia), no ligado directamente a una columna específica de una tabla",
      "SEQUENCE es una función, no un objeto de base de datos",
      "AUTO_INCREMENT y SEQUENCE son sinónimos exactos en Oracle"
    ],
    "correctIndex": 1,
    "explanation": "Una SEQUENCE es un objeto de base de datos separado que genera valores únicos consecutivos, reutilizable por cualquier tabla, a diferencia del AUTO_INCREMENT ligado directamente a una columna."
  },
  {
    "id": "sql-188",
    "category": "sql",
    "topic": "Secuencias e IDENTITY",
    "question": "¿Qué diferencia hay entre seq.NEXTVAL y seq.CURRVAL?",
    "options": [
      "Son exactamente lo mismo",
      "NEXTVAL genera y devuelve el SIGUIENTE valor de la secuencia (avanzándola); CURRVAL devuelve el ÚLTIMO valor ya generado en la sesión actual, sin avanzar",
      "CURRVAL siempre devuelve 1",
      "NEXTVAL solo puede usarse una vez por sesión"
    ],
    "correctIndex": 1,
    "explanation": "CURRVAL requiere haber llamado a NEXTVAL al menos una vez en esa misma sesión; NEXTVAL siempre avanza la secuencia a un valor nuevo cada vez que se invoca."
  },
  {
    "id": "sql-189",
    "category": "sql",
    "topic": "Secuencias e IDENTITY",
    "question": "¿Qué diferencia hay entre GENERATED ALWAYS AS IDENTITY y GENERATED BY DEFAULT AS IDENTITY en una columna (Oracle 12c+)?",
    "options": [
      "Son exactamente iguales",
      "ALWAYS no permite insertar un valor manual para esa columna (siempre usa la secuencia interna); BY DEFAULT sí permite un valor manual explícito si hace falta",
      "BY DEFAULT nunca genera un valor automático",
      "ALWAYS solo funciona con VARCHAR2"
    ],
    "correctIndex": 1,
    "explanation": "GENERATED ALWAYS rechaza un INSERT que especifique manualmente esa columna; GENERATED BY DEFAULT permite tanto el valor automático como uno manual explícito cuando se necesita (ej. migrar datos con IDs preexistentes)."
  },
  {
    "id": "sql-190",
    "category": "sql",
    "topic": "Sinónimos",
    "question": "¿Para qué sirve un SYNONYM (sinónimo) en Oracle?",
    "options": [
      "Para cifrar los datos de una tabla",
      "Para crear un alias alternativo con el que referenciar un objeto (tabla, vista, etc.), simplificando el nombre o el schema al que pertenece",
      "Para crear una copia física de una tabla",
      "Para definir una restricción de integridad"
    ],
    "correctIndex": 1,
    "explanation": "Un SYNONYM permite referenciar 'empleados' en vez de escribir 'rrhh.empleados' completo cada vez, o exponer un alias público entre distintos schemas."
  },
  {
    "id": "sql-191",
    "category": "sql",
    "topic": "PL/SQL básico",
    "question": "¿Qué es PL/SQL en relación con SQL?",
    "options": [
      "Un motor de base de datos completamente distinto a Oracle",
      "El lenguaje PROCEDURAL propio de Oracle, que extiende SQL con variables, control de flujo (IF, LOOP) y estructuras reutilizables (procedimientos, funciones, triggers)",
      "Un sinónimo exacto de T-SQL de SQL Server",
      "Un tipo de índice"
    ],
    "correctIndex": 1,
    "explanation": "PL/SQL agrega capacidades procedurales (variables, condicionales, bucles) que el SQL puro no tiene, permitiendo escribir lógica de negocio compleja dentro de la base de datos."
  },
  {
    "id": "sql-192",
    "category": "sql",
    "topic": "PL/SQL básico",
    "question": "¿Qué diferencia hay entre un PROCEDURE y una FUNCTION en PL/SQL?",
    "options": [
      "Son exactamente lo mismo",
      "Una FUNCTION siempre debe devolver un valor con RETURN (usable directamente en una expresión SQL); un PROCEDURE no necesariamente devuelve un valor",
      "Un PROCEDURE siempre es más rápido que una FUNCTION",
      "Las FUNCTION no pueden recibir parámetros"
    ],
    "correctIndex": 1,
    "explanation": "Una FUNCTION está diseñada para devolver un único valor y poder usarse dentro de una consulta SQL (ej. SELECT mi_funcion(x) FROM dual); un PROCEDURE ejecuta una acción sin ese requisito."
  },
  {
    "id": "sql-193",
    "category": "sql",
    "topic": "PL/SQL básico",
    "question": "¿Cuándo se ejecuta automáticamente un TRIGGER como 'AFTER UPDATE OF salario ON empleados'?",
    "options": [
      "Cuando un usuario ejecuta manualmente el trigger con EXEC",
      "Automáticamente, cada vez que se actualiza la columna salario de la tabla empleados, sin que nadie lo invoque explícitamente",
      "Solo una vez al día, de forma programada",
      "Nunca, los triggers son solo documentación"
    ],
    "correctIndex": 1,
    "explanation": "Los triggers se disparan AUTOMÁTICAMENTE en respuesta al evento declarado (aquí, un UPDATE sobre la columna salario), sin invocación manual — útiles para auditoría automática."
  },
  {
    "id": "cert-001",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "Sobre la tabla empleados(id, nombre, departamento, salario, fecha_ingreso), ¿qué devuelve 'SELECT nombre FROM empleados WHERE salario IS NULL;'?",
    "options": [
      "Un error de sintaxis",
      "Los nombres de empleados cuyo salario no tiene ningún valor asignado",
      "Los nombres de empleados con salario igual a 0",
      "Todos los empleados"
    ],
    "correctIndex": 1,
    "explanation": "NULL representa ausencia de valor; se compara con IS NULL, nunca con '=', porque NULL nunca es igual a nada, ni siquiera a sí mismo."
  },
  {
    "id": "cert-002",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué hace 'UPDATE empleados SET salario = 47000;' SIN cláusula WHERE?",
    "options": [
      "No hace nada porque falta el WHERE",
      "Actualiza el salario de TODOS los empleados de la tabla a 47000",
      "Da un error de sintaxis obligatorio",
      "Solo actualiza la primera fila"
    ],
    "correctIndex": 1,
    "explanation": "Un UPDATE sin WHERE afecta todas las filas de la tabla — la trampa #1 de todo examen de SQL básico."
  },
  {
    "id": "cert-003",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Cuál es la disciplina recomendada antes de ejecutar un DELETE o UPDATE con condición sobre datos reales?",
    "options": [
      "Ejecutarlo directamente, sin verificación previa",
      "Escribir primero un SELECT con el MISMO WHERE, revisar qué filas afectaría, y solo entonces cambiar a UPDATE/DELETE",
      "Hacer un TRUNCATE de la tabla antes",
      "Nunca usar WHERE en producción"
    ],
    "correctIndex": 1,
    "explanation": "Verificar con un SELECT idéntico en su condición evita afectar accidentalmente filas no deseadas."
  },
  {
    "id": "cert-004",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Es válido escribir 'SELECT nombre FROM empleados ORDER BY salario;' aunque 'salario' no aparezca en el SELECT?",
    "options": [
      "No, es un error de sintaxis",
      "Sí, es válido: ORDER BY puede usar columnas que no aparecen en el SELECT",
      "Solo es válido si se usa DISTINCT",
      "Solo es válido en Oracle, no en otros motores"
    ],
    "correctIndex": 1,
    "explanation": "Un error común es creer que ORDER BY solo puede usar columnas ya seleccionadas — en realidad puede ordenar por cualquier columna de la tabla origen."
  },
  {
    "id": "cert-005",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Cuál es el error en 'WHERE nombre = \"Ana\"' en la mayoría de motores SQL?",
    "options": [
      "No hay ningún error",
      "La mayoría de motores usan comillas SIMPLES para texto ('Ana'); las comillas dobles suelen reservarse para nombres de columna/tabla",
      "Debe escribirse en mayúsculas",
      "Falta un punto y coma"
    ],
    "correctIndex": 1,
    "explanation": "El estándar SQL usa comillas simples para literales de texto; las comillas dobles identifican objetos (columnas/tablas) en muchos motores, incluido Oracle."
  },
  {
    "id": "cert-006",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué devuelve 'SELECT * FROM empleados WHERE departamento = 'TI' OR departamento = 'RRHH' AND salario > 40000;' respecto a la precedencia de operadores?",
    "options": [
      "(departamento = 'TI' OR departamento = 'RRHH') se evalúa primero como conjunto, luego se aplica el AND a ambos",
      "AND tiene mayor precedencia que OR, así que se evalúa como: departamento='TI' OR (departamento='RRHH' AND salario>40000)",
      "Es un error de sintaxis por combinar AND y OR",
      "OR siempre se evalúa antes que AND en SQL"
    ],
    "correctIndex": 1,
    "explanation": "AND tiene mayor precedencia que OR — todos los empleados de TI aparecen sin importar su salario, mientras que los de RRHH solo si además ganan más de 40000. Usar paréntesis explícitos evita esta ambigüedad."
  },
  {
    "id": "cert-007",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "Si se listan las columnas explícitamente en un INSERT, ¿debe el orden de VALUES coincidir con el orden físico real de la tabla?",
    "options": [
      "Sí, siempre debe coincidir con el orden físico de la tabla",
      "No, debe coincidir con el ORDEN en que se listaron las columnas en el propio INSERT, no necesariamente con el de la tabla",
      "El orden nunca importa",
      "Solo importa en UPDATE, no en INSERT"
    ],
    "correctIndex": 1,
    "explanation": "El orden de VALUES debe corresponder al orden de columnas indicado explícitamente en el INSERT — puede diferir del orden físico real de columnas de la tabla."
  },
  {
    "id": "cert-008",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "Dada la tabla empleados con Ana(45000,TI), Luis(38000,Ventas), Carla(52000,TI), Marco(30000,RRHH), Sofía(41000,Ventas): ¿cuántas filas afecta 'DELETE FROM empleados WHERE salario < 35000;'?",
    "options": [
      "0 filas",
      "1 fila (solo Marco, con 30000)",
      "2 filas",
      "Todas las filas"
    ],
    "correctIndex": 1,
    "explanation": "Solo Marco tiene salario menor a 35000 (30000); los demás (45000, 38000, 52000, 41000) no cumplen la condición."
  },
  {
    "id": "cert-009",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué sentencia aumenta un 5% el salario únicamente a los empleados del departamento 'TI'?",
    "options": [
      "UPDATE empleados SET salario = salario * 1.05;",
      "UPDATE empleados SET salario = salario * 1.05 WHERE departamento = 'TI';",
      "UPDATE empleados SET salario * 1.05 WHERE departamento = 'TI';",
      "SELECT salario * 1.05 FROM empleados WHERE departamento = 'TI';"
    ],
    "correctIndex": 1,
    "explanation": "Se necesita la cláusula SET con la expresión de aumento Y el WHERE para acotar el cambio solo al departamento TI; la opción A afecta a todos, sin excepción."
  },
  {
    "id": "cert-010",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué hace 'SELECT DISTINCT departamento FROM empleados;'?",
    "options": [
      "Devuelve todos los empleados sin repetir filas completas",
      "Devuelve la lista de departamentos, cada uno una sola vez, sin duplicados",
      "Ordena los departamentos alfabéticamente",
      "Cuenta cuántos empleados hay por departamento"
    ],
    "correctIndex": 1,
    "explanation": "DISTINCT elimina duplicados del resultado — aquí, cada nombre de departamento aparece una sola vez, sin importar cuántos empleados tenga."
  },
  {
    "id": "cert-011",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué comando SQL, entre los cubiertos en el Módulo 1 (SELECT/INSERT/UPDATE/DELETE/ORDER BY), NO modifica los datos de la tabla?",
    "options": [
      "INSERT",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    "correctIndex": 2,
    "explanation": "SELECT solo consulta/extrae datos (DQL); INSERT, UPDATE y DELETE son sentencias DML que sí modifican el contenido de la tabla."
  },
  {
    "id": "cert-012",
    "category": "certificacion",
    "topic": "Módulo 1 - SQL I",
    "question": "¿Qué produce 'SELECT nombre, salario FROM empleados WHERE departamento = 'Ventas' ORDER BY salario DESC;'?",
    "options": [
      "Los empleados de Ventas ordenados de menor a mayor salario",
      "Los empleados de Ventas ordenados de MAYOR a menor salario",
      "Todos los empleados ordenados por departamento",
      "Un error de sintaxis por combinar WHERE y ORDER BY"
    ],
    "correctIndex": 1,
    "explanation": "DESC ordena de forma descendente (mayor a menor); WHERE ya filtró previamente solo a los empleados del departamento Ventas."
  },
  {
    "id": "cert-013",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "En la simbología ANSI de diagramas de flujo, ¿qué figura representa una DECISIÓN con exactamente 2 salidas (Sí/No)?",
    "options": [
      "Un rectángulo",
      "Un rombo",
      "Un óvalo",
      "Un paralelogramo"
    ],
    "correctIndex": 1,
    "explanation": "El rombo (notación de texto '< >' en esta guía) representa siempre una pregunta con dos salidas posibles: Sí y No (o Verdadero/Falso)."
  },
  {
    "id": "cert-014",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué figura ANSI representa el Inicio o el Fin de un diagrama de flujo?",
    "options": [
      "Un rombo",
      "Un rectángulo",
      "Un óvalo (terminal)",
      "Un hexágono"
    ],
    "correctIndex": 2,
    "explanation": "El símbolo Terminal (óvalo o rectángulo de bordes redondeados) marca siempre el Inicio o el Fin — siempre hay exactamente un Inicio, puede haber varios Fin."
  },
  {
    "id": "cert-015",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué figura ANSI se usa para leer un dato de entrada o mostrar un resultado?",
    "options": [
      "Rectángulo (Proceso)",
      "Paralelogramo (Entrada/Salida)",
      "Rombo (Decisión)",
      "Círculo (Conector)"
    ],
    "correctIndex": 1,
    "explanation": "El paralelogramo representa operaciones de Entrada/Salida: leer un dato o mostrar/imprimir un resultado."
  },
  {
    "id": "cert-016",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Cuál es la técnica más confiable para resolver '¿qué hace este diagrama?' o '¿cuál es la salida para esta entrada?'",
    "options": [
      "Adivinar el resultado final leyendo por encima",
      "Construir una tabla de trazado: una columna por variable, actualizada paso a paso exactamente como lo haría la computadora",
      "Ejecutar el diagrama mentalmente sin anotar nada",
      "Buscar la respuesta en internet"
    ],
    "correctIndex": 1,
    "explanation": "La tabla de trazado (trace table) es la técnica sistemática que evita 'adivinar' y garantiza seguir el flujo de control exactamente como la máquina lo haría."
  },
  {
    "id": "cert-017",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "Dado un diagrama que inicializa 'resultado ← 0, i ← 1', repite mientras 'i <= N' haciendo 'resultado ← resultado + i' e 'i ← i + 1', ¿qué calcula para N=4?",
    "options": [
      "El factorial de 4 (24)",
      "La suma de los primeros N números naturales: 1+2+3+4 = 10",
      "El promedio de 1 a 4",
      "Un bucle infinito"
    ],
    "correctIndex": 1,
    "explanation": "Es el patrón de acumulador con suma: resultado pasa por 0→1→3→6→10, calculando 1+2+3+4=10."
  },
  {
    "id": "cert-018",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "En un diagrama pensado para contar negativos, el proceso dice '[ contador ← 1 ]' dentro de la rama Sí de 'lista[i] < 0 ?', en vez de '[ contador ← contador + 1 ]'. ¿Qué error de lógica representa esto?",
    "options": [
      "Un error de sintaxis que impide ejecutar el diagrama",
      "El proceso REEMPLAZA el valor de contador en vez de INCREMENTARLO — contador termina en 1 si hubo al menos un negativo, o 0 si no hubo ninguno, nunca cuenta correctamente",
      "Es correcto, cuenta bien los negativos",
      "El error está en la condición, no en el proceso"
    ],
    "correctIndex": 1,
    "explanation": "Asignar un valor fijo en vez de sumar sobre el valor anterior es un error clásico de 'acumulador roto': el contador nunca refleja el conteo real acumulado."
  },
  {
    "id": "cert-019",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué patrón describe 'una variable de control que empieza en un valor, se compara contra un límite, y se incrementa en cada vuelta', equivalente a un 'for' en Java?",
    "options": [
      "Decisión anidada",
      "Bucle controlado por contador",
      "Búsqueda de máximo/mínimo",
      "Bucle controlado por condición"
    ],
    "correctIndex": 1,
    "explanation": "El bucle controlado por contador usa una variable de control (i) inicializada, comparada, e incrementada en cada iteración — el equivalente exacto de un for."
  },
  {
    "id": "cert-020",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "Para hallar el máximo de 3 números (a, b, c), el diagrama primero compara 'a > b ?' asignando max ← a o max ← b, y LUEGO compara 'c > max ?'. Con a=5, b=5, c=5, ¿qué valor final tiene max?",
    "options": [
      "max queda indefinido, error",
      "5 (el patrón funciona correctamente incluso con valores todos iguales)",
      "0",
      "15 (la suma de los tres)"
    ],
    "correctIndex": 1,
    "explanation": "'5 > 5' es falso, así que max ← b = 5; luego 'c > max' → '5 > 5' también falso, max se queda en 5 — el resultado correcto."
  },
  {
    "id": "cert-021",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué diferencia hay entre un 'bucle controlado por contador' y un 'bucle controlado por condición'?",
    "options": [
      "Son exactamente lo mismo",
      "El controlado por contador cuenta vueltas con una variable incremental (equivalente a 'for'); el controlado por condición se repite mientras/hasta que se cumpla una condición que no depende de contar vueltas (equivalente a 'while')",
      "El controlado por condición siempre se ejecuta una sola vez",
      "El controlado por contador nunca termina"
    ],
    "correctIndex": 1,
    "explanation": "Ambos son formas de repetición, pero difieren en QUÉ determina cuándo parar: un conteo de vueltas fijo, o una condición arbitraria evaluada en cada vuelta."
  },
  {
    "id": "cert-022",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "En el diagrama del factorial (fact ← 1, i ← 1, mientras i <= N: fact ← fact*i, i ← i+1), ¿cuántas veces se ejecuta el proceso 'fact ← fact * i' si N = 0?",
    "options": [
      "Una vez",
      "Cero veces: la condición 'i <= N' (1 <= 0) es falsa desde el inicio, el bucle nunca entra a su cuerpo",
      "N veces",
      "Un bucle infinito"
    ],
    "correctIndex": 1,
    "explanation": "Como es un bucle tipo 'mientras' (evalúa la condición ANTES de ejecutar), si la condición ya es falsa en la primera evaluación, el cuerpo nunca se ejecuta — fact queda en su valor inicial, 1."
  },
  {
    "id": "cert-023",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué ocurre en un diagrama con un bucle '< i <= N ? >' que inicializa i ← 1 pero NUNCA incrementa i dentro del cuerpo del bucle?",
    "options": [
      "El bucle se ejecuta exactamente una vez",
      "Un bucle INFINITO: la condición de salida nunca cambia, jamás se alcanza el camino 'No'",
      "El diagrama produce un error de compilación",
      "Termina automáticamente tras 100 iteraciones"
    ],
    "correctIndex": 1,
    "explanation": "Sin incrementar la variable de control, la condición de parada nunca se vuelve falsa — el diagrama repite indefinidamente el mismo ciclo."
  },
  {
    "id": "cert-024",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué representa el símbolo hexágono ('Preparación') en la simbología ANSI?",
    "options": [
      "El fin del diagrama",
      "La inicialización de una variable de control de bucle, como un contador antes de empezar a iterar",
      "Una llamada a una subrutina",
      "Una operación de entrada de datos"
    ],
    "correctIndex": 1,
    "explanation": "El símbolo de Preparación se usa típicamente para inicializar variables de control antes de entrar a un bucle, como 'i ← 1' o 'suma ← 0'."
  },
  {
    "id": "cert-025",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué representa el símbolo de 'Proceso predefinido' (rectángulo con doble barra vertical)?",
    "options": [
      "Una decisión con múltiples salidas",
      "Una llamada a una subrutina/función ya definida en otro diagrama",
      "El inicio del programa",
      "Una variable global"
    ],
    "correctIndex": 1,
    "explanation": "El proceso predefinido indica que se invoca una subrutina/función completa, ya definida en otro diagrama, sin repetir aquí su lógica interna."
  },
  {
    "id": "cert-026",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "Para el patrón 'suma de los números pares del 1 al N', ¿qué estructura de control adicional se necesita DENTRO del bucle, respecto a un simple acumulador de todos los números?",
    "options": [
      "Ninguna estructura adicional",
      "Una decisión (filtro) que verifique 'i % 2 == 0' antes de sumar al acumulador",
      "Un segundo bucle anidado",
      "Una variable de tipo texto"
    ],
    "correctIndex": 1,
    "explanation": "El patrón combina un bucle con acumulador MÁS un filtro (decisión) dentro del cuerpo: solo se suma al acumulador cuando la condición de paridad se cumple."
  },
  {
    "id": "cert-027",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Cuál es la relación explícita entre la técnica de 'trazado' del Módulo 2 y el Módulo 4 (Análisis de Código Java)?",
    "options": [
      "No tienen ninguna relación",
      "Es la MISMA técnica (tabla de variables paso a paso), aplicada primero sobre un diagrama de flujo y luego directamente sobre código Java",
      "El Módulo 4 reemplaza por completo al Módulo 2",
      "Los diagramas de flujo ya no se usan en la industria"
    ],
    "correctIndex": 1,
    "explanation": "Trazar un diagrama paso a paso y trazar código Java línea por línea son la misma habilidad fundamental de seguir el flujo de control sin asumir nada."
  },
  {
    "id": "cert-028",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "En una 'decisión anidada' (una decisión dentro de otra rama de decisión), ¿a qué estructura de Java equivale?",
    "options": [
      "Un bucle for anidado dentro de otro for",
      "Un if dentro de otro if/else",
      "Un switch sin break",
      "Una llamada recursiva"
    ],
    "correctIndex": 1,
    "explanation": "Una decisión anidada en un diagrama corresponde exactamente a anidar un if (o if/else) dentro de una rama de otro if/else en Java."
  },
  {
    "id": "cert-029",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Qué representa un 'Conector' (círculo pequeño) dentro de un diagrama de flujo de una sola página?",
    "options": [
      "El fin definitivo del programa",
      "Une dos puntos del mismo diagrama sin necesidad de cruzar líneas, muy usado para cerrar el ciclo de un bucle",
      "Una decisión con 3 salidas",
      "Una variable de tipo booleano"
    ],
    "correctIndex": 1,
    "explanation": "El conector permite 'saltar' visualmente de un punto a otro del mismo diagrama sin que las líneas de flujo se crucen entre sí, típico al cerrar el ciclo de vuelta a la condición de un bucle."
  },
  {
    "id": "cert-030",
    "category": "certificacion",
    "topic": "Módulo 2 - Diagramas de flujo",
    "question": "¿Por qué los diagramas de flujo siguen siendo útiles en un examen de lógica de programación, aunque en la industria se usen hoy sobre todo para documentar procesos de negocio?",
    "options": [
      "Porque son más rápidos de dibujar que escribir código",
      "Porque obligan a razonar el flujo de control de forma visual y explícita, sin poder 'saltarse' mentalmente una condición como a veces ocurre leyendo código directamente",
      "Porque reemplazan por completo la necesidad de aprender a programar",
      "No tienen ninguna utilidad real hoy en día"
    ],
    "correctIndex": 1,
    "explanation": "El valor pedagógico de un diagrama es que fuerza a seguir CADA paso explícitamente, sin dar nada por sentado — la misma disciplina que luego se necesita para depurar código real."
  },
  {
    "id": "cert-031",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué resultado tiene 'int division = 7 / 2;' en Java?",
    "options": [
      "3.5",
      "3 (división entera, trunca el decimal)",
      "4",
      "Error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Con ambos operandos int, Java realiza división entera y trunca cualquier parte decimal: 7/2 = 3, no 3.5."
  },
  {
    "id": "cert-032",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué imprime 'System.out.println(numeros.length);' para un array int[] numeros = {10,20,30}?",
    "options": [
      "Un error, porque length necesita paréntesis",
      "3 (length es un CAMPO del array, se usa sin paréntesis, a diferencia de String.length())",
      "30 (el último elemento)",
      "0"
    ],
    "correctIndex": 1,
    "explanation": "En arrays, 'length' es un campo (sin paréntesis); en String, 'length()' es un método (con paréntesis) — una distinción que confunde a muchos principiantes."
  },
  {
    "id": "cert-033",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué hace un 'do-while' que no tiene un 'while' equivalente?",
    "options": [
      "Nunca ejecuta su cuerpo",
      "Garantiza ejecutar el cuerpo AL MENOS UNA VEZ, porque la condición se evalúa al FINAL del ciclo",
      "Se ejecuta exactamente 2 veces siempre",
      "Es idéntico a un for"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de while (evalúa antes), do-while ejecuta el cuerpo primero y evalúa la condición después, garantizando al menos una ejecución."
  },
  {
    "id": "cert-034",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué caracteriza a la sobrecarga (overloading) de métodos, como en el ejemplo de varios métodos 'sumar' en la guía?",
    "options": [
      "Mismo nombre de método, MISMA lista exacta de parámetros",
      "Mismo nombre de método, pero distinta lista de parámetros (en tipo y/o cantidad)",
      "Distinto nombre de método, mismos parámetros",
      "Solo aplica a métodos static"
    ],
    "correctIndex": 1,
    "explanation": "La sobrecarga permite múltiples métodos con el mismo nombre siempre que su firma (tipos y/o cantidad de parámetros) sea distinta — tanto sumar(int,int) como sumar(double,double) o sumar(int,int,int) son válidos."
  },
  {
    "id": "cert-035",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué permite hacer un parámetro varargs como 'int... numeros' en un método?",
    "options": [
      "Recibir exactamente un argumento, nunca más",
      "Recibir un número VARIABLE de argumentos, incluido cero, tratándolos internamente como un array",
      "Recibir solo argumentos de tipo String",
      "Es exclusivo de métodos constructores"
    ],
    "correctIndex": 1,
    "explanation": "Varargs permite llamar al método con cualquier cantidad de argumentos del tipo indicado (incluso ninguno), que se reciben internamente como un array."
  },
  {
    "id": "cert-036",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "En el ejemplo de la clase Estudiante con setPromedio(double promedio) que valida el rango 0-10, ¿qué demuestra sobre encapsulación 'real'?",
    "options": [
      "Que basta con declarar los campos como private",
      "Que la encapsulación real requiere que los setters VALIDEN invariantes (ej. rechazar un promedio fuera de rango), no solo ocultar el campo",
      "Que los getters nunca deben usarse",
      "Que Java no permite validar datos en setters"
    ],
    "correctIndex": 1,
    "explanation": "Un setter 'de nombre' solo asigna sin verificar nada; la encapsulación real usa el setter como punto de control para mantener el objeto en un estado válido, lanzando una excepción si no lo está."
  },
  {
    "id": "cert-037",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "En la jerarquía Persona → Empleado (herencia), ¿qué hace 'super(nombre);' dentro del constructor de Empleado?",
    "options": [
      "Crea una nueva instancia de Persona independiente",
      "Invoca el constructor de la superclase Persona, pasándole el parámetro nombre",
      "Sobrescribe el método presentarse()",
      "Es opcional y no tiene ningún efecto"
    ],
    "correctIndex": 1,
    "explanation": "super(...) invoca explícitamente el constructor de la clase padre, debe ser la primera instrucción del constructor de la subclase si se usa explícitamente."
  },
  {
    "id": "cert-038",
    "category": "certificacion",
    "topic": "Módulo 3 - Java básico",
    "question": "¿Qué hace 'nombres.contains(\"Ana\")' sobre una List<String>?",
    "options": [
      "Cuenta cuántas veces aparece 'Ana'",
      "Devuelve true o false según si 'Ana' está presente en la lista",
      "Elimina 'Ana' de la lista",
      "Ordena la lista alfabéticamente"
    ],
    "correctIndex": 1,
    "explanation": "contains() devuelve un boolean indicando si el elemento existe en la colección, usando equals() para comparar contenido."
  },
  {
    "id": "cert-039",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (JVM)",
    "question": "¿Qué hace javac exactamente, según la teoría ampliada del Módulo 3?",
    "options": [
      "Ejecuta directamente el bytecode",
      "Compila el código fuente .java a bytecode portable (.class), sin ejecutar nada",
      "Interpreta el código línea por línea en tiempo real",
      "Administra la memoria del heap"
    ],
    "correctIndex": 1,
    "explanation": "javac es el compilador: traduce .java a bytecode .class, un formato intermedio y portable que luego la JVM interpreta/compila a código nativo."
  },
  {
    "id": "cert-040",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (JVM)",
    "question": "¿Qué hace el JIT (Just-In-Time compiler) dentro de la JVM?",
    "options": [
      "Compila el código fuente a bytecode",
      "Detecta el bytecode ejecutado con más frecuencia ('hot code') y lo compila a código máquina nativo en tiempo de ejecución para ganar velocidad",
      "Verifica la sintaxis del código Java",
      "Gestiona los privilegios de acceso a archivos"
    ],
    "correctIndex": 1,
    "explanation": "El JIT es responsable de que un programa Java 'arranque más lento pero corra rápido': compila a nativo las rutas más ejecutadas según se detectan durante la ejecución."
  },
  {
    "id": "cert-041",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Memoria)",
    "question": "Según el modelo de memoria Stack vs Heap, ¿dónde vive la REFERENCIA de un objeto (ej. la variable 'e' en 'Estudiante e = new Estudiante(...)')?",
    "options": [
      "En el Heap, junto con el objeto",
      "En el Stack del hilo que ejecuta el método (la referencia, no el objeto en sí)",
      "En el Metaspace",
      "En un archivo temporal en disco"
    ],
    "correctIndex": 1,
    "explanation": "La referencia (la 'dirección' hacia el objeto) vive en el Stack como variable local; el objeto real al que apunta esa referencia vive en el Heap."
  },
  {
    "id": "cert-042",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Memoria)",
    "question": "Dado 'static void modificarContenido(Estudiante e) { e.setPromedio(10.0); }', ¿el cambio de promedio se refleja en el objeto del llamador?",
    "options": [
      "No, nunca se refleja",
      "Sí: como 'e' es una copia de la REFERENCIA al mismo objeto en el Heap, modificar su CONTENIDO (vía setPromedio) sí afecta al objeto original",
      "Solo si el método es 'public'",
      "Solo si Estudiante es una clase abstracta"
    ],
    "correctIndex": 1,
    "explanation": "Java pasa la referencia POR VALOR: la copia local sigue apuntando al mismo objeto en el Heap, así que modificar su contenido (no reasignar la variable) sí se ve reflejado afuera."
  },
  {
    "id": "cert-043",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Memoria)",
    "question": "Dado 'static void reasignarParametro(Estudiante e) { e = new Estudiante(\"Otro\", 5.0); }', ¿se refleja este cambio en la variable del llamador?",
    "options": [
      "Sí, siempre se refleja",
      "No: reasignar el parámetro local solo cambia la copia local de la referencia, sin afectar a la variable original del llamador",
      "Solo si Estudiante implementa Cloneable",
      "Produce un error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Reasignar 'e' dentro del método apunta la copia LOCAL a un objeto nuevo, pero la variable original del llamador sigue apuntando al objeto original — 'paso por valor de la referencia'."
  },
  {
    "id": "cert-044",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Excepciones)",
    "question": "En la jerarquía de excepciones, ¿qué distingue a una excepción CHECKED de una UNCHECKED?",
    "options": [
      "Las checked son más lentas de lanzar",
      "El compilador OBLIGA a manejar (try/catch o throws) las checked; las unchecked (RuntimeException y subclases) no lo exige",
      "Las unchecked no pueden capturarse nunca",
      "No hay ninguna diferencia real"
    ],
    "correctIndex": 1,
    "explanation": "Toda excepción que NO extiende RuntimeException es checked y exige manejo explícito en compilación; las unchecked compilan igual aunque nunca se capturen."
  },
  {
    "id": "cert-045",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Excepciones)",
    "question": "¿StackOverflowError es una Exception o un Error?",
    "options": [
      "Una Exception checked",
      "Una Exception unchecked (RuntimeException)",
      "Un Error, no una Exception",
      "Ninguna de las dos, es un warning"
    ],
    "correctIndex": 2,
    "explanation": "StackOverflowError extiende Error, no Exception — representa un problema grave del entorno/JVM (agotamiento del stack), no una condición de negocio recuperable normalmente."
  },
  {
    "id": "cert-046",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (POO)",
    "question": "¿Cuál es la diferencia clave entre una clase abstracta y una interfaz respecto a la herencia múltiple?",
    "options": [
      "Ambas permiten herencia múltiple igual",
      "Una clase solo puede EXTENDER una clase abstracta (herencia simple), pero puede IMPLEMENTAR varias interfaces a la vez",
      "Las interfaces no pueden implementarse múltiples veces",
      "Las clases abstractas siempre permiten herencia múltiple"
    ],
    "correctIndex": 1,
    "explanation": "Java restringe la herencia de clases a una sola superclase, pero permite implementar cualquier cantidad de interfaces — una de las razones por las que las interfaces son más flexibles para modelar capacidades."
  },
  {
    "id": "cert-047",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (POO)",
    "question": "Con 'Figura f = new Circulo(3.0);' donde Circulo sobrescribe calcularArea(), ¿qué versión se ejecuta al llamar f.calcularArea()?",
    "options": [
      "La de Figura, porque la variable está declarada como Figura",
      "La de Circulo, decidido en tiempo de EJECUCIÓN según el tipo real del objeto (dynamic dispatch)",
      "Ninguna, produce un error",
      "Depende del orden de los imports"
    ],
    "correctIndex": 1,
    "explanation": "El despacho dinámico (polimorfismo en tiempo de ejecución) usa el tipo REAL del objeto, no el tipo de la variable declarada, para decidir qué versión sobrescrita ejecutar."
  },
  {
    "id": "cert-048",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (equals/hashCode)",
    "question": "Si sobrescribes equals() en una clase propia, ¿qué otro método DEBES sobrescribir de forma consistente?",
    "options": [
      "toString()",
      "hashCode()",
      "clone()",
      "No hace falta sobrescribir nada más"
    ],
    "correctIndex": 1,
    "explanation": "El contrato exige que dos objetos iguales según equals() tengan siempre el mismo hashCode(); romper esto hace que estructuras como HashSet/HashMap se comporten de forma incorrecta e impredecible."
  },
  {
    "id": "cert-049",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (String)",
    "question": "¿Qué resultado tiene 'String a = \"hola\"; String b = \"hola\"; System.out.println(a == b);'?",
    "options": [
      "false, porque son objetos distintos",
      "true, porque ambos literales apuntan al MISMO objeto reutilizado del String Pool",
      "Un error de compilación",
      "Depende de la versión de Java"
    ],
    "correctIndex": 1,
    "explanation": "Los literales de texto idénticos se reutilizan desde el String Pool: 'a' y 'b' apuntan al mismo objeto en memoria, por eso '==' (comparación de referencia) da true."
  },
  {
    "id": "cert-050",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (String)",
    "question": "¿Qué resultado tiene 'String a = \"hola\"; String c = new String(\"hola\"); System.out.println(a == c);'?",
    "options": [
      "true, porque el contenido es igual",
      "false: new String(...) siempre crea un objeto NUEVO fuera del String Pool, así que las referencias son distintas aunque el contenido sea idéntico",
      "Un error de compilación",
      "true solo en Java 21+"
    ],
    "correctIndex": 1,
    "explanation": "new String(...) fuerza la creación de un objeto nuevo en el heap, fuera del pool — '==' compara referencias (identidad), no contenido, por eso da false aunque a.equals(c) sí seria true."
  },
  {
    "id": "cert-051",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Generics)",
    "question": "¿Qué ventaja principal aportan los generics (ej. List<String>) frente a usar colecciones sin tipar (List a secas)?",
    "options": [
      "Hacen el código más lento",
      "Detectan errores de tipo incorrecto en TIEMPO DE COMPILACIÓN, en vez de descubrirlos como un ClassCastException en tiempo de ejecución",
      "Eliminan la necesidad de usar colecciones",
      "Solo funcionan con tipos primitivos"
    ],
    "correctIndex": 1,
    "explanation": "Con generics, intentar agregar un tipo incorrecto a una List<String> es un error de COMPILACIÓN; sin generics, el error solo aparece al hacer un cast fallido en tiempo de ejecución."
  },
  {
    "id": "cert-052",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Colecciones)",
    "question": "¿Cuál es la complejidad típica de acceder a un elemento por índice en un ArrayList, comparado con un LinkedList?",
    "options": [
      "Ambas son O(1)",
      "ArrayList es O(1) (acceso directo); LinkedList es O(n) (hay que recorrer nodo por nodo)",
      "ArrayList es O(n); LinkedList es O(1)",
      "Ambas son O(log n)"
    ],
    "correctIndex": 1,
    "explanation": "ArrayList se respalda en un array interno con acceso directo; LinkedList es una lista enlazada donde llegar al índice k requiere recorrer nodos secuencialmente."
  },
  {
    "id": "cert-053",
    "category": "certificacion",
    "topic": "Módulo 3 - Java teoría profunda (Colecciones)",
    "question": "¿Qué estructura conviene si necesitas búsquedas por clave muy rápidas y NO te importa mantener ningún orden particular?",
    "options": [
      "TreeMap",
      "HashMap",
      "LinkedList recorrida linealmente",
      "ArrayList recorrida linealmente"
    ],
    "correctIndex": 1,
    "explanation": "HashMap ofrece O(1) promedio para get/put por clave, más rápido que TreeMap (O(log n)) cuando el orden no es un requisito."
  },
  {
    "id": "cert-054",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué devuelve 'sumarHasta(5)' con 'for (int i = 0; i < n; i++) { suma += i; } return suma;'?",
    "options": [
      "15",
      "10 (el bucle va de i=0 a i=4, la condición i<n EXCLUYE a n)",
      "Un error de compilación",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "La condición 'i < n' excluye a n=5, así que suma 0+1+2+3+4=10, no 1+2+3+4+5=15 — un error off-by-one clásico si se pretendía incluir el 5."
  },
  {
    "id": "cert-055",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué devuelve 'promedio(3, 4)' con 'return (a + b) / 2;' donde a y b son int?",
    "options": [
      "3.5",
      "3.0 (división entera ANTES de convertir a double en el retorno)",
      "7.0",
      "Error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "'(a+b)' es 7 (int), y '7/2' con ambos operandos enteros se evalúa como división entera (3) antes de convertirse a double para el retorno — la corrección es '(a+b)/2.0'."
  },
  {
    "id": "cert-056",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué devuelve 'sonIguales(new String(\"hola\"), new String(\"hola\"))' si el método hace 'return a == b;'?",
    "options": [
      "true, porque el contenido es igual",
      "false: new String(...) crea objetos nuevos fuera del pool, '==' compara referencias, no contenido",
      "Un error de compilación",
      "Depende del recolector de basura"
    ],
    "correctIndex": 1,
    "explanation": "Cada 'new String(...)' crea un objeto distinto en el heap; '==' compara identidad de objeto, no contenido — la corrección es usar a.equals(b)."
  },
  {
    "id": "cert-057",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "En un switch sin ningún 'break' entre sus case, con 'case 9: resultado = \"Excelente\"; case 8: case 7: resultado = \"Bueno\"; default: resultado = \"Regular\";', ¿qué devuelve clasificar(9)?",
    "options": [
      "\"Excelente\"",
      "\"Regular\" (fall-through: la ejecución cae por todos los case siguientes hasta el default, que es el último valor asignado)",
      "\"Bueno\"",
      "Un error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Sin break, la ejecución 'cae' (fall-through) de case en case; el último valor que queda asignado a 'resultado' es el de 'default', que se ejecuta al final del recorrido."
  },
  {
    "id": "cert-058",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué ocurre al ejecutar 'ultimoElemento(new int[]{1,2,3})' con 'return arr[arr.length];'?",
    "options": [
      "Devuelve 3 correctamente",
      "Lanza ArrayIndexOutOfBoundsException: el último índice válido es arr.length - 1, no arr.length",
      "Devuelve 0",
      "Devuelve null"
    ],
    "correctIndex": 1,
    "explanation": "Un arreglo de longitud 3 tiene índices válidos 0,1,2; arr[3] (arr.length) está un lugar más allá del final del arreglo."
  },
  {
    "id": "cert-059",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "Dado 'esValido(int edad) { if (!(edad >= 18 && edad <= 65)) return true; return false; }', ¿qué devuelve esValido(30)?",
    "options": [
      "true",
      "false (el comportamiento está invertido respecto a lo que el nombre del método sugiere)",
      "Un error de compilación",
      "Lanza una excepción"
    ],
    "correctIndex": 1,
    "explanation": "La condición es verdadera precisamente cuando la edad NO está en el rango 18-65; para edad=30 (que SÍ está en rango), la condición es falsa, así que se devuelve false — pese a que el nombre 'esValido' sugeriría lo contrario."
  },
  {
    "id": "cert-060",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "Tras 'agregarSufijo(nombre)' donde el método hace 'texto = texto + \"_v2\";' internamente, ¿qué imprime 'System.out.println(nombre)' después?",
    "options": [
      "\"archivo_v2\"",
      "\"archivo\" (sin el sufijo): la reasignación local no afecta a la variable del llamador",
      "Un error de compilación",
      "null"
    ],
    "correctIndex": 1,
    "explanation": "Java pasa la referencia por valor; reasignar 'texto' dentro del método crea un String nuevo local, pero 'nombre' en el llamador sigue apuntando al String original sin modificar."
  },
  {
    "id": "cert-061",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "En 'contarPares', dentro del if se escribe 'int contador2 = contador + 1;' en vez de reasignar 'contador'. ¿Qué devuelve la función sobre cualquier arreglo?",
    "options": [
      "El conteo correcto de números pares",
      "0, siempre, sin importar el arreglo: se declara una variable NUEVA (contador2) que muere en cada iteración, en vez de modificar la variable externa contador",
      "Un error de compilación",
      "El total de elementos del arreglo"
    ],
    "correctIndex": 1,
    "explanation": "Declarar 'int contador2' crea una variable local nueva por iteración que se descarta inmediatamente, sin nunca modificar realmente la variable 'contador' externa — el código parece incrementar pero no lo hace."
  },
  {
    "id": "cert-062",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué calcula 'misterio(6)' con 'if (n <= 1) return n; return misterio(n-1) + misterio(n-2);'?",
    "options": [
      "El factorial de 6",
      "La sucesión de Fibonacci: misterio(6) = 8",
      "6 al cuadrado",
      "Un StackOverflowError, porque no tiene caso base"
    ],
    "correctIndex": 1,
    "explanation": "El caso base 'n<=1 return n' cubre n=0 y n=1 correctamente; la recursión implementa Fibonacci, y misterio(6)=8 (secuencia 0,1,1,2,3,5,8)."
  },
  {
    "id": "cert-063",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué ocurre al ejecutar 'factorial(5)' definido como 'return n * factorial(n - 1);' SIN ningún caso base?",
    "options": [
      "Devuelve 120 correctamente",
      "Lanza StackOverflowError: la recursión nunca se detiene, apilando un stack frame nuevo por cada llamada hasta agotar el stack",
      "Devuelve 0",
      "Produce un error de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Sin un 'if (n <= 1) return 1;' que detenga la recursión, la función se sigue llamando indefinidamente (5,4,3,2,1,0,-1,...), agotando el stack del hilo."
  },
  {
    "id": "cert-064",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "El método invertir() intercambia arr[i] con arr[arr.length-1-i] recorriendo solo hasta arr.length/2. ¿Qué produce sobre {1,2,3,4,5}?",
    "options": [
      "{5,4,3,2,1}: invierte el arreglo correctamente in-place, sin errores",
      "{1,2,3,4,5}: no cambia nada",
      "Un ArrayIndexOutOfBoundsException",
      "{5,4,3,2,1,0}: agrega un elemento"
    ],
    "correctIndex": 0,
    "explanation": "Recorrer solo la primera mitad e intercambiar cada elemento con su 'espejo' desde el final es el patrón correcto y completo para invertir un arreglo in-place — esta función no tiene errores."
  },
  {
    "id": "cert-065",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué devuelve 'signo(0)' con 'return n > 0 ? \"positivo\" : n < 0 ? \"negativo\" : \"cero\";'?",
    "options": [
      "\"positivo\"",
      "\"cero\": el operador ternario es asociativo a la derecha, y para n=0 ambas comparaciones (0>0 y 0<0) son falsas",
      "\"negativo\"",
      "Un error de compilación por ternarios anidados"
    ],
    "correctIndex": 1,
    "explanation": "Se lee como 'n>0 ? \"positivo\" : (n<0 ? \"negativo\" : \"cero\")'; para n=0, ambas condiciones fallan y el resultado final es \"cero\" — este patrón de ternarios encadenados es válido y correcto."
  },
  {
    "id": "cert-066",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Cuál es la técnica recomendada para analizar cualquier función Java 'ya escrita' antes de responder qué hace o si es correcta?",
    "options": [
      "Leer por encima y confiar en el nombre del método",
      "Construir una tabla con las variables relevantes y actualizarla línea por línea, exactamente como lo haría la JVM",
      "Ejecutar el código mentalmente sin anotar nada",
      "Asumir que toda función pública es correcta"
    ],
    "correctIndex": 1,
    "explanation": "El 90% de los errores al analizar código ajeno vienen de asumir qué hace una línea en vez de verificarlo con un trazado sistemático, variable por variable."
  },
  {
    "id": "cert-067",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué categoría de error representa comparar dos objetos String con '==' en vez de '.equals()'?",
    "options": [
      "Off-by-one",
      "Comparación de objetos con '==': compara referencias, no contenido",
      "Fall-through de switch",
      "Recursión sin caso base"
    ],
    "correctIndex": 1,
    "explanation": "Para tipos referencia como String, '==' compara identidad de objeto (misma dirección de memoria), no el contenido textual — se necesita .equals() para comparar contenido."
  },
  {
    "id": "cert-068",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué categoría de error representa declarar 'int x' DENTRO de un bloque en cada iteración, en vez de acumular en una variable externa?",
    "options": [
      "Recursión sin caso base",
      "Variable nueva en vez de reasignación: la variable local se descarta cada vuelta, sin acumular nada realmente en la variable externa",
      "División entera",
      "Índices fuera de rango"
    ],
    "correctIndex": 1,
    "explanation": "Es exactamente el error de la Función 'contarPares': crear una variable local nueva en cada iteración impide que el 'acumulador' externo se actualice de verdad."
  },
  {
    "id": "cert-069",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Por qué reasignar un parámetro de tipo String o de un objeto DENTRO de un método no cambia lo que ve el código que llamó al método?",
    "options": [
      "Porque Java copia el objeto completo en cada llamada",
      "Porque Java pasa la REFERENCIA por valor: reasignar la variable local del parámetro no afecta a la variable original del llamador",
      "Porque los Strings son primitivos en Java",
      "Porque los métodos no pueden recibir parámetros de tipo objeto"
    ],
    "correctIndex": 1,
    "explanation": "Este es el principio central detrás de la Función 7 (agregarSufijo) del Módulo 4: la copia local de la referencia se puede reasignar sin que el llamador se entere."
  },
  {
    "id": "cert-070",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué tipo de error representa 'arr[arr.length]' en vez de 'arr[arr.length - 1]' al buscar el último elemento de un arreglo?",
    "options": [
      "División entera",
      "Índice fuera de rango (off-by-one): arr.length está un lugar más allá del último índice válido",
      "Fall-through de switch",
      "Comparación con == en vez de equals()"
    ],
    "correctIndex": 1,
    "explanation": "Los índices válidos de un arreglo van de 0 a length-1; usar 'length' directo como índice apunta un lugar más allá del final, lanzando ArrayIndexOutOfBoundsException."
  },
  {
    "id": "cert-071",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué le falta típicamente a un switch clásico de Java (no un switch expression moderno) para evitar el fall-through accidental entre case?",
    "options": [
      "Un default al final",
      "Un 'break;' al final de cada bloque case que no deba continuar al siguiente",
      "Llaves {} alrededor de cada case",
      "Una condición booleana en cada case"
    ],
    "correctIndex": 1,
    "explanation": "Sin 'break', la ejecución de un switch clásico continúa cayendo hacia los siguientes case sin evaluar sus condiciones — la trampa más clásica de examen de análisis de código Java."
  },
  {
    "id": "cert-072",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "¿Qué indica que una función recursiva SÍ tiene garantizada su terminación, como misterio(n) que calcula Fibonacci?",
    "options": [
      "Que use un bucle for en vez de recursión",
      "Que exista un caso base bien definido, y que cada llamada recursiva se acerque progresivamente a ese caso base (ej. n-1, n-2 hacia n<=1)",
      "Que la función sea 'static'",
      "Que no reciba ningún parámetro"
    ],
    "correctIndex": 1,
    "explanation": "misterio(n) reduce el problema en cada llamada (n-1, n-2) hacia el caso base n<=1, garantizando que eventualmente la recursión termine — a diferencia de factorial() sin caso base."
  },
  {
    "id": "cert-073",
    "category": "certificacion",
    "topic": "Módulo 4 - Análisis de código",
    "question": "Si una función Java compila sin errores, ¿garantiza eso que su LÓGICA sea correcta?",
    "options": [
      "Sí, si compila es porque la lógica es correcta",
      "No: el compilador solo verifica sintaxis y tipos, no la corrección lógica (ej. esValido() compila perfectamente pese a tener su lógica invertida)",
      "Solo garantiza que no hay bucles infinitos",
      "Solo aplica a métodos privados"
    ],
    "correctIndex": 1,
    "explanation": "Compilar exitosamente solo confirma que el código es sintácticamente válido y respeta el sistema de tipos — errores de lógica (como condiciones invertidas o acumuladores rotos) compilan sin ningún problema."
  },
  {
    "id": "cert-074",
    "category": "certificacion",
    "topic": "Módulo 5 - Pirámide de pruebas",
    "question": "En la Pirámide de Pruebas, ¿qué nivel debe tener la BASE más grande (más cantidad de pruebas)?",
    "options": [
      "Pruebas E2E/UI",
      "Pruebas unitarias",
      "Pruebas de integración",
      "Todos deben tener la misma cantidad"
    ],
    "correctIndex": 1,
    "explanation": "La base masiva de pruebas unitarias (rápidas y baratas de mantener) es la recomendación central de la pirámide, con integración moderada y E2E mínima."
  },
  {
    "id": "cert-075",
    "category": "certificacion",
    "topic": "Módulo 5 - Pirámide de pruebas",
    "question": "¿Por qué se recomienda tener POCAS pruebas E2E, comparado con las unitarias?",
    "options": [
      "Porque las E2E son gratis de escribir",
      "Porque son las más lentas y frágiles ante cambios (un ajuste visual de UI puede romperlas sin que la lógica de negocio haya cambiado)",
      "Porque JUnit no soporta pruebas E2E",
      "No es una recomendación real"
    ],
    "correctIndex": 1,
    "explanation": "Cada nivel hacia arriba en la pirámide es más lento, más caro de mantener y más frágil — mantener las E2E al mínimo evita una suite lenta y llena de falsos negativos."
  },
  {
    "id": "cert-076",
    "category": "certificacion",
    "topic": "Módulo 5 - Pirámide de pruebas",
    "question": "¿Qué herramienta típica de Java se usa en el nivel de pruebas de INTEGRACIÓN, según la guía?",
    "options": [
      "JUnit 5 + Mockito puros",
      "Spring Boot Test, Testcontainers",
      "Selenium/Playwright",
      "Solo assertTrue(true)"
    ],
    "correctIndex": 1,
    "explanation": "Las pruebas de integración prueban varias piezas reales trabajando juntas (BD real, contexto de Spring), típicamente con Spring Boot Test y Testcontainers."
  },
  {
    "id": "cert-077",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "En el ciclo TDD Rojo-Verde-Refactor, ¿qué ocurre en el paso 'Rojo'?",
    "options": [
      "Se escribe el código de producción mínimo",
      "Se escribe una prueba que FALLA, porque el código que prueba todavía no existe",
      "Se mejora el diseño sin cambiar el comportamiento",
      "Se elimina la prueba anterior"
    ],
    "correctIndex": 1,
    "explanation": "El paso Rojo consiste en escribir la prueba PRIMERO, antes de que exista el código de producción — por definición, esa prueba debe fallar inicialmente."
  },
  {
    "id": "cert-078",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "¿Qué se hace exactamente en el paso 'Verde' del ciclo TDD?",
    "options": [
      "Se escribe una prueba nueva que falle",
      "Se escribe el código de producción MÍNIMO necesario para que la prueba recién escrita pase",
      "Se optimiza el rendimiento del sistema completo",
      "Se despliega a producción"
    ],
    "correctIndex": 1,
    "explanation": "El paso Verde exige escribir solo lo mínimo indispensable para pasar la prueba actual — nada de lógica adicional 'por si acaso' antes de que una prueba la exija."
  },
  {
    "id": "cert-079",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "En el kata de esPrimo(n) de la guía, la primera implementación 'return true;' siempre pasa la única prueba existente (dosEsPrimo). ¿Qué principio de TDD ilustra esto?",
    "options": [
      "Que TDD es inútil porque permite trampas",
      "Que el código de producción crece exactamente lo necesario para satisfacer la prueba que falló, ni más ni menos, en cada vuelta del ciclo",
      "Que siempre hay que escribir el algoritmo completo desde la primera prueba",
      "Que las pruebas deben escribirse después del código"
    ],
    "correctIndex": 1,
    "explanation": "Con una sola prueba (dosEsPrimo), 'return true' es honestamente el código MÍNIMO que la satisface; el resto de la lógica surge en iteraciones posteriores, forzada por pruebas nuevas que exponen el hueco."
  },
  {
    "id": "cert-080",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "¿Qué rol cumple el paso 'Refactorizar' del ciclo TDD, ilustrado en el kata al optimizar esPrimo() para comprobar divisores solo hasta √n?",
    "options": [
      "Agregar nuevas funcionalidades no probadas",
      "Mejorar el diseño/eficiencia del código SIN cambiar el comportamiento observable, con la seguridad de que las pruebas existentes avisan si algo se rompe",
      "Eliminar las pruebas que ya no se necesitan",
      "Escribir documentación"
    ],
    "correctIndex": 1,
    "explanation": "El refactor se apoya en las pruebas ya verdes como red de seguridad: se puede optimizar la implementación interna con confianza porque cualquier regresión sería detectada de inmediato."
  },
  {
    "id": "cert-081",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "¿Cuál es un error común al practicar TDD, entre los mencionados en la guía?",
    "options": [
      "Refactorizar después de que las pruebas pasan",
      "Escribir VARIAS pruebas antes de hacer pasar la primera, rompiendo el ciclo corto Rojo-Verde-Refactor",
      "Usar nombres descriptivos en las pruebas",
      "Ejecutar las pruebas frecuentemente"
    ],
    "correctIndex": 1,
    "explanation": "Escribir varias pruebas de golpe antes de satisfacer la primera diluye la retroalimentación inmediata que hace valioso al ciclo corto de TDD."
  },
  {
    "id": "cert-082",
    "category": "certificacion",
    "topic": "Módulo 5 - TDD",
    "question": "¿Por qué 'tener muchas pruebas escritas después del código' NO es lo mismo que practicar TDD?",
    "options": [
      "Porque TDD prohíbe tener más de 10 pruebas",
      "Porque TDD es un PROCESO de diseño donde la prueba nace ANTES que el código; escribir pruebas después solo valida lo que el código YA hace (incluyendo sus bugs), no necesariamente lo que DEBERÍA hacer",
      "Porque las pruebas después del código son siempre más rápidas",
      "No hay ninguna diferencia real"
    ],
    "correctIndex": 1,
    "explanation": "El valor de TDD no es solo 'tener pruebas' — es que la prueba, al escribirse primero, define el comportamiento ESPERADO antes de que exista una implementación que sesgue esa definición."
  },
  {
    "id": "cert-083",
    "category": "certificacion",
    "topic": "Módulo 5 - BDD",
    "question": "¿En qué lenguaje estructurado se escriben típicamente los escenarios de BDD (Behavior-Driven Development)?",
    "options": [
      "Java puro",
      "Gherkin (Dado/Cuando/Entonces), en lenguaje natural estructurado",
      "SQL",
      "XML"
    ],
    "correctIndex": 1,
    "explanation": "BDD describe el comportamiento observable en Gherkin ('Dado que... Cuando... Entonces...'), comprensible tanto por desarrolladores como por stakeholders no técnicos."
  },
  {
    "id": "cert-084",
    "category": "certificacion",
    "topic": "Módulo 5 - BDD",
    "question": "¿BDD reemplaza a TDD, según la guía?",
    "options": [
      "Sí, BDD es la evolución que hace obsoleto a TDD",
      "No, son complementarios: BDD define QUÉ comportamiento importa al negocio; TDD/pruebas unitarias validan CÓMO se implementa a nivel de código",
      "TDD reemplaza por completo a BDD",
      "No tienen ninguna relación"
    ],
    "correctIndex": 1,
    "explanation": "BDD opera a un nivel más alto (comportamiento observable del sistema), mientras TDD guía el diseño detallado del código — ambos coexisten en un mismo proyecto."
  },
  {
    "id": "cert-085",
    "category": "certificacion",
    "topic": "Módulo 5 - BDD",
    "question": "¿Qué herramienta de Java se usa típicamente para implementar BDD, traduciendo Gherkin a métodos Java ejecutables ('step definitions')?",
    "options": [
      "JUnit puro, sin herramientas adicionales",
      "Cucumber",
      "JaCoCo",
      "Testcontainers"
    ],
    "correctIndex": 1,
    "explanation": "Cucumber traduce cada línea Gherkin (Dado/Cuando/Entonces) a un método Java anotado que ejecuta pasos concretos de la prueba."
  },
  {
    "id": "cert-086",
    "category": "certificacion",
    "topic": "Módulo 5 - Test Doubles",
    "question": "¿Qué diferencia principal hay entre un Stub y un Mock como dobles de prueba?",
    "options": [
      "Son términos sinónimos, sin diferencia real",
      "Un Stub solo provee respuestas predefinidas ('enlatadas'); un Mock además permite VERIFICAR que fue invocado correctamente",
      "Un Mock nunca puede devolver un valor",
      "Un Stub siempre lanza excepciones"
    ],
    "correctIndex": 1,
    "explanation": "'when(...).thenReturn(...)' es modo stub (solo programa la respuesta); 'verify(...)' es lo que convierte ese mismo objeto en un mock en sentido estricto, al comprobar la interacción."
  },
  {
    "id": "cert-087",
    "category": "certificacion",
    "topic": "Módulo 5 - Test Doubles",
    "question": "¿Qué tipo de doble de prueba describe mejor 'una implementación en memoria de un repositorio, respaldada por un Map, usada en pruebas de integración ligeras'?",
    "options": [
      "Dummy",
      "Fake",
      "Mock",
      "Spy"
    ],
    "correctIndex": 1,
    "explanation": "Un Fake es una implementación FUNCIONAL simplificada, no apta para producción pero que se comporta razonablemente como la real — típico caso: un repositorio en memoria."
  },
  {
    "id": "cert-088",
    "category": "certificacion",
    "topic": "Módulo 5 - Test Doubles",
    "question": "¿Qué tipo de doble de prueba es más apropiado para 'verificar que un método de envío de correo fue invocado exactamente una vez'?",
    "options": [
      "Stub",
      "Mock, porque se necesita VERIFICAR la interacción, no solo obtener una respuesta predefinida",
      "Dummy",
      "Fake"
    ],
    "correctIndex": 1,
    "explanation": "Verificar cuántas veces (y con qué argumentos) se llamó a un método es precisamente la capacidad distintiva de un Mock, mediante verify()."
  },
  {
    "id": "cert-089",
    "category": "certificacion",
    "topic": "Módulo 5 - Test Doubles",
    "question": "¿Qué caracteriza a un Spy, a diferencia de un Mock puro?",
    "options": [
      "Un Spy nunca ejecuta código real",
      "Un Spy es un objeto REAL que además registra cómo fue invocado, permitiendo ejecutar lógica real Y verificar interacciones",
      "Un Spy solo puede usarse en pruebas E2E",
      "Un Spy es idéntico a un Dummy"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de un Mock (totalmente simulado), un Spy envuelve un objeto real, ejecutando su comportamiento genuino mientras registra las llamadas para verificación posterior."
  },
  {
    "id": "cert-090",
    "category": "certificacion",
    "topic": "Módulo 5 - Test Doubles",
    "question": "¿Qué es un Dummy como doble de prueba?",
    "options": [
      "Un objeto que verifica llamadas detalladamente",
      "Un objeto que solo 'rellena' un parámetro requerido, sin usarse realmente dentro de la prueba",
      "Un objeto que siempre lanza excepciones",
      "Sinónimo exacto de Mock"
    ],
    "correctIndex": 1,
    "explanation": "Un Dummy solo existe para satisfacer una firma de método que exige un argumento, pero la prueba nunca interactúa realmente con él (ej. pasar null o un objeto vacío)."
  },
  {
    "id": "cert-091",
    "category": "certificacion",
    "topic": "Módulo 5 - JUnit y Mockito",
    "question": "¿Qué anotación de JUnit 5 ejecuta un método de preparación ANTES de cada prueba individual?",
    "options": [
      "@AfterEach",
      "@BeforeEach",
      "@Test",
      "@DisplayName"
    ],
    "correctIndex": 1,
    "explanation": "@BeforeEach reinicia el estado necesario antes de CADA @Test, garantizando que las pruebas no compartan estado entre sí (principio Independent de FIRST)."
  },
  {
    "id": "cert-092",
    "category": "certificacion",
    "topic": "Módulo 5 - JUnit y Mockito",
    "question": "¿Qué hace @ParameterizedTest junto con @CsvSource en JUnit 5?",
    "options": [
      "Ejecuta la prueba una sola vez con valores fijos",
      "Ejecuta la MISMA prueba varias veces, una por cada combinación de valores indicada en el CSV",
      "Desactiva la prueba temporalmente",
      "Solo funciona con tipos String"
    ],
    "correctIndex": 1,
    "explanation": "@ParameterizedTest permite reutilizar la misma lógica de prueba con múltiples conjuntos de datos de entrada/salida esperada, evitando duplicar código de prueba."
  },
  {
    "id": "cert-093",
    "category": "certificacion",
    "topic": "Módulo 5 - JUnit y Mockito",
    "question": "¿Qué hace '@Mock RepositorioPedidos repositorio;' junto con '@InjectMocks ServicioPedidos servicio;' en una prueba con Mockito?",
    "options": [
      "Crea una base de datos real para la prueba",
      "Crea un doble de prueba del repositorio y lo inyecta automáticamente en el servicio bajo prueba, aislando la lógica de negocio de la persistencia real",
      "Ejecuta la prueba contra el servidor de producción",
      "Desactiva todas las demás pruebas"
    ],
    "correctIndex": 1,
    "explanation": "@Mock crea el doble de la dependencia; @InjectMocks inyecta automáticamente esos mocks (vía constructor u otros medios) en la clase bajo prueba (SUT)."
  },
  {
    "id": "cert-094",
    "category": "certificacion",
    "topic": "Módulo 5 - JUnit y Mockito",
    "question": "¿Qué distingue a 'verify(repositorio).buscarPorId(1);' de un simple 'assertEquals(...)' sobre el resultado?",
    "options": [
      "No hay ninguna diferencia",
      "verify() comprueba que una INTERACCIÓN específica ocurrió (que se llamó al método, con qué argumentos), mientras assertEquals comprueba el RESULTADO final",
      "verify() solo funciona con JUnit 4",
      "assertEquals reemplaza por completo a verify()"
    ],
    "correctIndex": 1,
    "explanation": "verify() valida el comportamiento de colaboración (cómo se usó el mock), complementando (no reemplazando) las aserciones sobre el resultado final de la lógica bajo prueba."
  },
  {
    "id": "cert-095",
    "category": "certificacion",
    "topic": "Módulo 5 - AssertJ",
    "question": "¿Qué cambia AssertJ respecto a las aserciones 'puras' de JUnit, como assertEquals/assertTrue?",
    "options": [
      "AssertJ permite verificar cosas que JUnit no puede verificar en absoluto",
      "AssertJ no cambia QUÉ se puede verificar, sino CÓMO se lee: permite encadenar aserciones fluidas sobre el mismo objeto, con mensajes de error más descriptivos",
      "AssertJ reemplaza completamente a Mockito",
      "AssertJ solo funciona con números"
    ],
    "correctIndex": 1,
    "explanation": "assertThat(lista).isNotNull().hasSize(3).contains(\"Ana\") se lee de forma más natural que múltiples assertEquals/assertTrue independientes, aunque verifique conceptualmente lo mismo."
  },
  {
    "id": "cert-096",
    "category": "certificacion",
    "topic": "Módulo 5 - Spring Testing",
    "question": "¿Qué prueba específicamente @WebMvcTest junto con MockMvc, SIN levantar un servidor HTTP real?",
    "options": [
      "La base de datos completa",
      "Los controladores REST (endpoints), simulando peticiones HTTP directamente contra la capa web",
      "Solo las clases de servicio, sin nada de la capa web",
      "El sistema operativo del servidor"
    ],
    "correctIndex": 1,
    "explanation": "@WebMvcTest levanta solo el contexto necesario para la capa web, y MockMvc simula peticiones HTTP sin abrir un puerto de red real — rápido y aislado."
  },
  {
    "id": "cert-097",
    "category": "certificacion",
    "topic": "Módulo 5 - Spring Testing",
    "question": "¿Qué problema evita Testcontainers al usar una base de datos REAL (vía Docker) en vez de una en memoria como H2 para pruebas de integración?",
    "options": [
      "Testcontainers es más lento, así que no evita ningún problema",
      "Evita el escenario de 'en las pruebas pasaba, en producción falló', causado por diferencias de sintaxis SQL, tipos o comportamiento con NULL entre H2 y el motor real de producción",
      "H2 no puede usarse nunca en pruebas",
      "Testcontainers reemplaza a JUnit por completo"
    ],
    "correctIndex": 1,
    "explanation": "Una base en memoria como H2 'se comporta distinto' del motor real (Oracle, PostgreSQL, etc.); Testcontainers usa el motor REAL en un contenedor Docker descartable, eliminando esa discrepancia."
  },
  {
    "id": "cert-098",
    "category": "certificacion",
    "topic": "Módulo 5 - Buenas prácticas",
    "question": "¿Qué significan las siglas AAA al estructurar una prueba unitaria?",
    "options": [
      "Authentication, Authorization, Accounting",
      "Arrange, Act, Assert: preparar el escenario, ejecutar la acción, verificar el resultado, en ese orden",
      "Assume, Analyze, Approve",
      "Array, Assertion, Assembly"
    ],
    "correctIndex": 1,
    "explanation": "AAA divide cada prueba en 3 bloques claros: preparar datos/mocks (Arrange), ejecutar la acción bajo prueba (Act), y verificar el resultado (Assert)."
  },
  {
    "id": "cert-099",
    "category": "certificacion",
    "topic": "Módulo 5 - Buenas prácticas",
    "question": "¿Qué garantiza la 'I' (Independent) del principio FIRST para pruebas unitarias?",
    "options": [
      "Que la prueba se ejecute muy rápido",
      "Que el resultado de una prueba NUNCA dependa de que otra prueba se haya ejecutado antes, ni del orden de ejecución",
      "Que la prueba use inteligencia artificial",
      "Que la prueba tenga un nombre único"
    ],
    "correctIndex": 1,
    "explanation": "Independent exige aislamiento total entre pruebas: compartir estado global (como una lista estática) entre pruebas viola este principio, haciendo el resultado dependiente del orden de ejecución."
  },
  {
    "id": "cert-100",
    "category": "certificacion",
    "topic": "Módulo 5 - Buenas prácticas",
    "question": "¿Qué garantiza la 'R' (Repeatable) del principio FIRST?",
    "options": [
      "Que la prueba se pueda repetir infinitas veces sin límite de licencia",
      "Que la prueba dé el MISMO resultado siempre, en cualquier entorno, sin depender de la hora del sistema, red real, u orden no determinista de un HashMap",
      "Que la prueba use un bucle repeat()",
      "Que la prueba se ejecute solo una vez por día"
    ],
    "correctIndex": 1,
    "explanation": "Repeatable exige determinismo: una prueba que a veces pasa y a veces falla sin cambios en el código (flaky test) rompe la confianza en toda la suite."
  },
  {
    "id": "cert-101",
    "category": "certificacion",
    "topic": "Módulo 5 - Métricas y CI/CD",
    "question": "¿Qué mide exactamente la cobertura de código (code coverage) con herramientas como JaCoCo?",
    "options": [
      "Qué tan buenas son las aserciones de las pruebas",
      "Qué porcentaje de líneas/ramas del código de producción se EJECUTAN durante la suite de pruebas — no si se verificaron correctamente",
      "El número total de bugs detectados",
      "El tiempo de compilación del proyecto"
    ],
    "correctIndex": 1,
    "explanation": "100% de cobertura solo significa que cada línea se ejecutó al menos una vez; es perfectamente posible tener alta cobertura con pruebas que no verifican nada útil (ej. assertTrue(true))."
  },
  {
    "id": "cert-102",
    "category": "certificacion",
    "topic": "Módulo 5 - Métricas y CI/CD",
    "question": "¿Por qué la guía advierte que '100% de cobertura NO significa cero errores'?",
    "options": [
      "Porque JaCoCo tiene bugs conocidos",
      "Porque cobertura mide EJECUCIÓN de líneas, no VERIFICACIÓN correcta de su resultado con una aserción significativa",
      "Porque el 100% de cobertura es matemáticamente imposible",
      "Porque la cobertura solo aplica a código Java, no a SQL"
    ],
    "correctIndex": 1,
    "explanation": "La cobertura es una señal de alerta (líneas sin ninguna prueba son un riesgo real) pero no una garantía de calidad — se puede alcanzar 100% sin validar nada de lógica real."
  },
  {
    "id": "cert-103",
    "category": "certificacion",
    "topic": "Módulo 5 - Métricas y CI/CD",
    "question": "¿Qué transforma la Integración Continua (CI/CD) al ejecutar automáticamente 'mvn test' en cada push?",
    "options": [
      "Elimina por completo la necesidad de escribir pruebas",
      "Convierte las pruebas de 'algo que se corre manualmente antes de un release' en una red de seguridad automática que bloquea la integración de código roto",
      "Solo sirve para desplegar a producción, no para pruebas",
      "Hace innecesario el control de versiones"
    ],
    "correctIndex": 1,
    "explanation": "El pipeline de CI corre la suite automáticamente en cada cambio, detectando regresiones de inmediato en vez de descubrirlas manualmente justo antes de un release."
  },
  {
    "id": "cert-104",
    "category": "certificacion",
    "topic": "Módulo 5 - Caso completo (PedidoService)",
    "question": "En el caso trabajado del PedidoService (pasarela de pago mockeada), ¿qué hace 'when(pasarelaPagoMock.cobrar(150.0)).thenReturn(true);'?",
    "options": [
      "Verifica que cobrar() fue llamado",
      "Configura el STUB: define qué debe devolver el mock cuando se le llame con ese argumento específico",
      "Ejecuta el cobro real contra una pasarela verdadera",
      "Lanza una excepción simulada"
    ],
    "correctIndex": 1,
    "explanation": "'when(...).thenReturn(...)' es la parte de programar la respuesta simulada (modo stub) del mock, antes de ejecutar la acción bajo prueba."
  },
  {
    "id": "cert-105",
    "category": "certificacion",
    "topic": "Módulo 5 - Caso completo (PedidoService)",
    "question": "En ese mismo caso, si pasarelaPago.cobrar(...) lanza una RuntimeException simulando que el servicio externo está caído, ¿qué le pasa al estado del pedido según el código de procesarPedido()?",
    "options": [
      "Cambia a 'RECHAZADO' de todas formas",
      "Permanece en 'PENDIENTE': la excepción se propaga antes de llegar al 'if' que cambiaría el estado",
      "Cambia a 'PAGADO' por error",
      "Lanza un NullPointerException adicional"
    ],
    "correctIndex": 1,
    "explanation": "Como la excepción se lanza dentro de pasarelaPago.cobrar(...), se propaga inmediatamente sin llegar al código que asigna 'PAGADO' o 'RECHAZADO' — el pedido nunca cambia de su estado inicial 'PENDIENTE'."
  },
  {
    "id": "cert-106",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (SRP)",
    "question": "¿Qué establece el Single Responsibility Principle (SRP)?",
    "options": [
      "Una clase debe implementar una sola interfaz",
      "Una clase debe tener una, y solo una, razón para cambiar",
      "Una clase solo puede tener un método público",
      "Todas las clases deben ser 'final'"
    ],
    "correctIndex": 1,
    "explanation": "SRP no significa 'una clase hace literalmente una sola cosa microscópica' — significa que no debe mezclar responsabilidades que cambian por motivos y ritmos distintos."
  },
  {
    "id": "cert-107",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (SRP)",
    "question": "Una clase 'Factura' con métodos calcularTotal(), generarPdf() y guardarEnBaseDeDatos() en un solo lugar, ¿qué principio viola?",
    "options": [
      "Open/Closed Principle",
      "Single Responsibility Principle: mezcla cálculo de negocio, presentación y persistencia, 3 razones de cambio distintas",
      "Liskov Substitution Principle",
      "Ninguno, es una buena práctica"
    ],
    "correctIndex": 1,
    "explanation": "Si cambia la regla de cálculo, el formato de salida, o el motor de persistencia, las 3 razones obligan a tocar la MISMA clase — el síntoma clásico de violar SRP."
  },
  {
    "id": "cert-108",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (OCP)",
    "question": "¿Qué establece el Open/Closed Principle (OCP)?",
    "options": [
      "Una clase debe estar abierta a modificación y cerrada a extensión",
      "Una clase/entidad debe estar ABIERTA a extensión, pero CERRADA a modificación",
      "Todas las clases deben ser públicas",
      "Los métodos deben estar siempre abiertos (no privados)"
    ],
    "correctIndex": 1,
    "explanation": "Agregar un caso nuevo debería significar AGREGAR código (ej. una clase nueva), no EDITAR código ya existente y probado."
  },
  {
    "id": "cert-109",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (OCP)",
    "question": "Un método con un 'if/else' largo que evalúa un 'tipo' de figura para calcular su área, y que crece cada vez que se agrega una figura nueva, ¿qué principio viola típicamente y cuál es la solución estándar?",
    "options": [
      "Viola SRP; la solución es agregar más comentarios",
      "Viola OCP; la solución típica es reemplazar el condicional por polimorfismo (una interfaz Figura + una clase por tipo)",
      "Viola ISP; la solución es usar más interfaces gordas",
      "No viola ningún principio SOLID"
    ],
    "correctIndex": 1,
    "explanation": "Cada figura nueva obliga a EDITAR el método existente en vez de solo AGREGAR una clase nueva — la señal más clásica de violación de OCP, resuelta con polimorfismo."
  },
  {
    "id": "cert-110",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (LSP)",
    "question": "¿Qué garantiza el Liskov Substitution Principle (LSP)?",
    "options": [
      "Que todas las clases tengan un constructor vacío",
      "Que cualquier código que use el tipo T siga funcionando correctamente si se le pasa un subtipo S de T en su lugar",
      "Que las interfaces sean siempre pequeñas",
      "Que no se puedan crear subclases de una clase concreta"
    ],
    "correctIndex": 1,
    "explanation": "LSP exige que un subtipo pueda sustituir a su tipo padre sin romper las expectativas de comportamiento que el código que lo usa ya tenía."
  },
  {
    "id": "cert-111",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (LSP)",
    "question": "Una clase 'Pinguino extends Ave' que sobrescribe volar() para lanzar UnsupportedOperationException (porque Ave sí implementa volar() concreto), ¿qué principio viola?",
    "options": [
      "Interface Segregation Principle",
      "Liskov Substitution Principle: Pinguino no puede sustituir a Ave en código que asuma que toda Ave vuela",
      "Single Responsibility Principle",
      "Dependency Inversion Principle"
    ],
    "correctIndex": 1,
    "explanation": "Cualquier código que reciba una 'Ave' y llame a volar() esperando que funcione, fallará inesperadamente si recibe un Pinguino — rompiendo la sustituibilidad que LSP exige."
  },
  {
    "id": "cert-112",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (LSP)",
    "question": "¿Cuál es la corrección típica cuando una jerarquía de herencia viola LSP porque no todos los subtipos pueden cumplir el contrato completo del padre?",
    "options": [
      "Agregar más métodos al padre para forzar la implementación",
      "Repensar la jerarquía: separar la capacidad problemática en una interfaz/abstracción distinta, implementada solo por los subtipos que realmente la cumplen",
      "Ignorar el problema, no tiene solución",
      "Convertir todos los métodos del padre en 'final'"
    ],
    "correctIndex": 1,
    "explanation": "En el ejemplo de Ave/Pinguino, la solución es crear una interfaz AveVoladora separada de Ave, implementada solo por las aves que realmente vuelan."
  },
  {
    "id": "cert-113",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (ISP)",
    "question": "¿Qué recomienda el Interface Segregation Principle (ISP)?",
    "options": [
      "Usar una única interfaz grande y genérica para todo el sistema",
      "Preferir varias interfaces PEQUEÑAS y específicas, en vez de una interfaz 'gorda' que obligue a implementar métodos irrelevantes",
      "Nunca usar interfaces, solo clases concretas",
      "Que toda clase implemente al menos 5 interfaces"
    ],
    "correctIndex": 1,
    "explanation": "ISP busca que ningún cliente (clase implementadora) se vea forzado a depender de o implementar métodos que no le aplican realmente."
  },
  {
    "id": "cert-114",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (ISP)",
    "question": "Una interfaz 'Impresora' con métodos imprimir(), escanear() y enviarFax(), implementada por una 'ImpresoraBasica' que lanza UnsupportedOperationException en escanear() y enviarFax() (porque no tiene esas capacidades), ¿qué indica esto?",
    "options": [
      "Que la interfaz Impresora está correctamente diseñada",
      "Que la interfaz es demasiado 'gorda': viola ISP al forzar a ImpresoraBasica a implementar capacidades que no tiene",
      "Que ImpresoraBasica tiene un bug de sintaxis",
      "Que se debe eliminar la interfaz por completo"
    ],
    "correctIndex": 1,
    "explanation": "La corrección es segregar la interfaz en Imprimible, Escaneable y Faxeable por separado, para que cada clase implemente solo las capacidades que realmente posee."
  },
  {
    "id": "cert-115",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (DIP)",
    "question": "¿Qué establece el Dependency Inversion Principle (DIP)?",
    "options": [
      "Los módulos de bajo nivel deben depender de los de alto nivel",
      "Los módulos de alto nivel NO deben depender de módulos de bajo nivel — ambos deben depender de ABSTRACCIONES",
      "Toda dependencia debe instanciarse con 'new' directamente",
      "Las clases nunca deben tener dependencias"
    ],
    "correctIndex": 1,
    "explanation": "DIP invierte la dirección 'natural' de dependencia: en vez de que la lógica de negocio dependa de un detalle concreto, ambos (negocio y detalle) dependen de una interfaz común."
  },
  {
    "id": "cert-116",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (DIP)",
    "question": "Una clase 'ServicioRegistro' que hace 'private RepositorioMySQL repositorio = new RepositorioMySQL();' directamente dentro de su código, ¿qué principio viola?",
    "options": [
      "Open/Closed Principle únicamente",
      "Dependency Inversion Principle: el servicio (alto nivel) depende directamente de un detalle concreto (bajo nivel) en vez de una abstracción",
      "Liskov Substitution Principle",
      "Ningún principio, es código válido y recomendado"
    ],
    "correctIndex": 1,
    "explanation": "Instanciar 'new RepositorioMySQL()' directamente acopla el servicio a ESA implementación específica; cambiar de motor de base de datos obligaría a editar ServicioRegistro."
  },
  {
    "id": "cert-117",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (DIP)",
    "question": "¿Qué técnica corrige la violación de DIP del ejemplo anterior?",
    "options": [
      "Hacer RepositorioMySQL una clase 'final'",
      "Definir una interfaz RepositorioDatos, y hacer que ServicioRegistro reciba esa interfaz inyectada por constructor, en vez de instanciar la implementación concreta directamente",
      "Eliminar por completo la clase RepositorioMySQL",
      "Convertir el método en 'static'"
    ],
    "correctIndex": 1,
    "explanation": "Inyectar una abstracción (interfaz) por constructor permite intercambiar la implementación concreta (MySQL, MongoDB, etc.) sin modificar ServicioRegistro en absoluto."
  },
  {
    "id": "cert-118",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "¿Qué relación tiene la Inyección de Dependencias (DI) de frameworks como Spring con el principio DIP?",
    "options": [
      "No tienen ninguna relación",
      "El contenedor de Inversión de Control (IoC) de Spring es un mecanismo AUTOMATIZADO para aplicar DIP a escala de toda la aplicación",
      "DI reemplaza por completo a DIP, son conceptos incompatibles",
      "DIP solo aplica a bases de datos, DI solo aplica a interfaces gráficas"
    ],
    "correctIndex": 1,
    "explanation": "DIP es el PRINCIPIO (depender de abstracciones); DI es la TÉCNICA (inyectar la dependencia desde afuera); el contenedor de Spring es una HERRAMIENTA que automatiza esa técnica a gran escala."
  },
  {
    "id": "cert-119",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "¿Cuál de las siguientes es la señal MÁS directa de que se está violando el Open/Closed Principle?",
    "options": [
      "Un método vacío que lanza UnsupportedOperationException",
      "Un 'switch' o cadena de 'if/else' sobre un campo 'tipo' que crece cada vez que aparece un caso de negocio nuevo",
      "Una clase con un solo constructor",
      "Un campo declarado como 'private'"
    ],
    "correctIndex": 1,
    "explanation": "OCP se viola cuando agregar un caso nuevo obliga a EDITAR una estructura condicional existente en vez de simplemente añadir una clase nueva que implemente una interfaz común."
  },
  {
    "id": "cert-120",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "¿Qué principio SOLID se relaciona más directamente con el patrón de diseño Strategy?",
    "options": [
      "Interface Segregation Principle únicamente",
      "Open/Closed Principle: Strategy permite agregar un algoritmo/comportamiento nuevo (una clase nueva) sin modificar el código que ya usa la interfaz",
      "Liskov Substitution Principle exclusivamente",
      "SOLID no se relaciona con los patrones de diseño"
    ],
    "correctIndex": 1,
    "explanation": "El patrón Strategy encapsula comportamientos intercambiables detrás de una interfaz común, siendo la implementación de código más directa del principio OCP."
  },
  {
    "id": "cert-121",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "¿Qué principio SOLID exige que dos objetos considerados 'iguales' por la lógica de una clase se comporten de forma coherente en toda jerarquía de herencia (conectando con equals()/hashCode())?",
    "options": [
      "Interface Segregation Principle",
      "Liskov Substitution Principle: un equals() inconsistente entre padre e hijo también viola LSP",
      "Dependency Inversion Principle",
      "Ninguno de los principios SOLID se relaciona con esto"
    ],
    "correctIndex": 1,
    "explanation": "Un equals() roto o inconsistente entre una clase padre y su subclase puede romper la sustituibilidad esperada por LSP, además del contrato normal de equals()/hashCode()."
  },
  {
    "id": "cert-122",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "¿Por qué SOLID se describe como 'los principios que explican por qué los patrones de diseño son buenas soluciones'?",
    "options": [
      "Porque SOLID fue creado después que los patrones de diseño y no tiene relación",
      "Porque los patrones de diseño son soluciones concretas y recurrentes; SOLID son los principios subyacentes que explican POR QUÉ esas soluciones funcionan bien",
      "Porque SOLID reemplaza completamente a los patrones de diseño",
      "Porque los patrones de diseño solo aplican a bases de datos"
    ],
    "correctIndex": 1,
    "explanation": "Entender SOLID primero hace que muchos patrones de diseño dejen de sentirse como 'recetas mágicas' y se vean como consecuencias naturales de aplicar estos 5 principios."
  },
  {
    "id": "cert-123",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "Ordena correctamente las 5 letras de SOLID con su principio correspondiente: S-O-L-I-D",
    "options": [
      "Segregation, Open, Liskov, Inversion, Dependency",
      "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
      "Simple, Object, Logic, Interface, Data",
      "Single, Open, Local, Immutable, Dynamic"
    ],
    "correctIndex": 1,
    "explanation": "S=Single Responsibility, O=Open/Closed, L=Liskov Substitution, I=Interface Segregation, D=Dependency Inversion — los 5 principios formulados por Robert C. Martin."
  },
  {
    "id": "cert-124",
    "category": "certificacion",
    "topic": "Módulo 6 - SOLID (general)",
    "question": "Un método 'UnsupportedOperationException' lanzado dentro de un método sobrescrito con @Override, en general, ¿qué principio SOLID suele señalar como violado?",
    "options": [
      "Single Responsibility Principle",
      "Liskov Substitution Principle: la subclase no puede cumplir el contrato completo que promete su clase/interfaz padre",
      "Dependency Inversion Principle",
      "Ningún principio, es una práctica común y recomendada"
    ],
    "correctIndex": 1,
    "explanation": "Cuando una subclase no puede honrar realmente un método heredado y solo lanza una excepción al sobrescribirlo, generalmente indica que la jerarquía de herencia no debería existir tal como está planteada — la señal clásica de violación de LSP."
  },
  {
    "id": "cert-125",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (Atomicity)",
    "question": "¿Qué garantiza la 'A' (Atomicity/Atomicidad) de ACID?",
    "options": [
      "Que las transacciones concurrentes no se vean entre sí",
      "Que una transacción se aplique COMPLETA o NO se aplique en absoluto (todo o nada)",
      "Que los cambios confirmados sobrevivan a un apagón",
      "Que la base de datos respete todas las reglas de negocio"
    ],
    "correctIndex": 1,
    "explanation": "Si una parte de la transacción falla, TODA la transacción se deshace — nunca queda una transferencia bancaria 'a medias' con el dinero restado de un lado sin haber llegado al otro."
  },
  {
    "id": "cert-126",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (Consistency)",
    "question": "¿Qué garantiza la 'C' (Consistency/Consistencia) de ACID?",
    "options": [
      "Que la transacción sea muy rápida",
      "Que la transacción lleve la base de datos de un estado VÁLIDO a otro estado VÁLIDO, respetando todas las reglas/constraints",
      "Que dos transacciones nunca se ejecuten al mismo tiempo",
      "Que los datos se repliquen automáticamente"
    ],
    "correctIndex": 1,
    "explanation": "Consistencia asegura que ninguna transacción deje la base de datos violando sus reglas de integridad (ej. un CHECK saldo >= 0), ni siquiera temporalmente al confirmarse."
  },
  {
    "id": "cert-127",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (Isolation)",
    "question": "¿Qué garantiza la 'I' (Isolation/Aislamiento) de ACID?",
    "options": [
      "Que los datos se cifren automáticamente",
      "Que las transacciones concurrentes no se 'vean' entre sí a medias, según el nivel de aislamiento configurado",
      "Que la transacción nunca falle",
      "Que los índices se reconstruyan automáticamente"
    ],
    "correctIndex": 1,
    "explanation": "El aislamiento controla qué tanto puede una transacción 'ver' de los cambios no confirmados de otra transacción concurrente — regulado por los niveles de aislamiento (READ COMMITTED, SERIALIZABLE, etc.)."
  },
  {
    "id": "cert-128",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (Durability)",
    "question": "¿Qué garantiza la 'D' (Durability/Durabilidad) de ACID?",
    "options": [
      "Que la transacción se pueda deshacer después del COMMIT",
      "Que, una vez confirmada (COMMIT), la transacción sobreviva incluso a un fallo inmediato del servidor (ej. un apagón)",
      "Que los datos se muestren más rápido al usuario",
      "Que dos usuarios nunca editen la misma fila"
    ],
    "correctIndex": 1,
    "explanation": "Un COMMIT exitoso es una promesa real: el motor escribe primero a un log de transacciones (write-ahead log) antes de confirmar como exitosa la operación, garantizando que sobreviva a un fallo posterior inmediato."
  },
  {
    "id": "cert-129",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (ejemplo bancario)",
    "question": "En la transferencia bancaria (restar de cuenta A, sumar a cuenta B), si el servidor falla justo DESPUÉS de restar de A pero ANTES de sumar a B, ¿qué debe garantizar ACID?",
    "options": [
      "Que el dinero quede restado de A permanentemente, sin llegar nunca a B",
      "Que la transacción completa se revierta (ROLLBACK automático): cuenta A vuelve a su saldo original, como si nada hubiera pasado",
      "Que se sume automáticamente el doble a B para compensar",
      "Que la cuenta A quede bloqueada permanentemente"
    ],
    "correctIndex": 1,
    "explanation": "La Atomicidad exige 'todo o nada': si la transacción no puede completarse íntegramente, el motor revierte cualquier cambio parcial ya aplicado, incluyendo el UPDATE de la cuenta A."
  },
  {
    "id": "cert-130",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID (ejemplo bancario)",
    "question": "Si una tabla 'cuentas' tiene la restricción 'CHECK (saldo >= 0)', y un UPDATE deja a una cuenta con saldo negativo, ¿qué ocurre al intentar el COMMIT?",
    "options": [
      "El COMMIT se ejecuta exitosamente de todas formas",
      "El motor RECHAZA el COMMIT: viola el CHECK, y toda la transacción se revierte",
      "Solo se revierte la parte que viola la restricción",
      "La restricción se ignora automáticamente en transacciones"
    ],
    "correctIndex": 1,
    "explanation": "Una violación de Consistencia (romper un CHECK) impide que el COMMIT se confirme; el motor rechaza la operación completa para no dejar la base de datos en un estado inválido."
  },
  {
    "id": "cert-131",
    "category": "certificacion",
    "topic": "Módulo 7 - Niveles de aislamiento",
    "question": "¿Cuál es el nivel de aislamiento MÁS ESTRICTO, que previene dirty reads, non-repeatable reads Y phantom reads simultáneamente?",
    "options": [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "REPEATABLE READ",
      "SERIALIZABLE"
    ],
    "correctIndex": 3,
    "explanation": "SERIALIZABLE es el nivel más estricto de la tabla de aislamiento, previniendo los 3 fenómenos, típicamente a costa de mayor contención y menor throughput concurrente."
  },
  {
    "id": "cert-132",
    "category": "certificacion",
    "topic": "Módulo 7 - Niveles de aislamiento",
    "question": "¿Qué es un 'dirty read' (lectura sucia)?",
    "options": [
      "Leer un dato que fue borrado accidentalmente",
      "Leer datos NO CONFIRMADOS de otra transacción que después podría hacer ROLLBACK",
      "Leer un archivo corrupto",
      "Un error de sintaxis SQL"
    ],
    "correctIndex": 1,
    "explanation": "Un dirty read ocurre cuando una transacción lee cambios de otra transacción que aún no ha hecho COMMIT — si esa otra transacción luego hace ROLLBACK, los datos leídos nunca 'existieron' realmente."
  },
  {
    "id": "cert-133",
    "category": "certificacion",
    "topic": "Módulo 7 - Niveles de aislamiento",
    "question": "¿Qué nivel de aislamiento típico (el más usado por defecto en muchos motores) previene dirty reads pero SIGUE permitiendo non-repeatable reads?",
    "options": [
      "READ UNCOMMITTED",
      "READ COMMITTED",
      "SERIALIZABLE únicamente",
      "Ninguno los previene todos"
    ],
    "correctIndex": 1,
    "explanation": "READ COMMITTED evita leer datos no confirmados de otras transacciones, pero no garantiza que releer la misma fila dentro de la misma transacción devuelva el mismo valor si otra transacción la modificó y confirmó mientras tanto."
  },
  {
    "id": "cert-134",
    "category": "certificacion",
    "topic": "Módulo 7 - Niveles de aislamiento",
    "question": "¿Qué trade-off central existe al elegir un nivel de aislamiento más estricto (ej. SERIALIZABLE)?",
    "options": [
      "No existe ningún trade-off, siempre conviene el más estricto",
      "Más aislamiento da más seguridad frente a condiciones de carrera, pero típicamente implica más contención y menor throughput con muchos usuarios concurrentes",
      "Más aislamiento siempre mejora el rendimiento",
      "El nivel de aislamiento no afecta el rendimiento en absoluto"
    ],
    "correctIndex": 1,
    "explanation": "No existe un nivel 'correcto' universal: se elige según qué tan grave sería cada tipo de lectura inconsistente para ese caso de negocio específico, sopesando el costo de rendimiento."
  },
  {
    "id": "cert-135",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID desde Java (JDBC)",
    "question": "¿Cuál es el valor por defecto de 'autoCommit' en una Connection JDBC recién obtenida?",
    "options": [
      "false: hay que confirmar manualmente cada sentencia",
      "true: cada sentencia se confirma sola, automáticamente",
      "Depende del driver, no tiene default",
      "No existe el concepto en JDBC"
    ],
    "correctIndex": 1,
    "explanation": "JDBC inicia con autoCommit=true por defecto; para agrupar varias sentencias en una transacción atómica hay que desactivarlo explícitamente con conn.setAutoCommit(false)."
  },
  {
    "id": "cert-136",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID desde Java (JDBC)",
    "question": "En el ejemplo de transferencia con JDBC puro, si se OMITE 'conn.setAutoCommit(false);', y el segundo UPDATE (sumar a B) falla tras haberse ejecutado el primero (restar de A), ¿qué ocurre?",
    "options": [
      "conn.rollback() deshace ambos cambios de todas formas",
      "El primer UPDATE YA quedó confirmado permanentemente (por el autocommit automático); rollback() no tiene nada pendiente que revertir — se rompe la atomicidad",
      "Ninguno de los dos UPDATE se ejecuta",
      "Se lanza una excepción de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Con autoCommit en true (el default), cada sentencia se confirma por su cuenta apenas se ejecuta — el dinero quedaría restado de A permanentemente sin haber llegado nunca a B."
  },
  {
    "id": "cert-137",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID desde Java (Spring)",
    "question": "¿Qué hace la anotación @Transactional de Spring sobre un método?",
    "options": [
      "Ejecuta el método en un hilo separado",
      "Abre una transacción antes del método y hace COMMIT o ROLLBACK automáticamente según el resultado, sin necesitar código explícito de conn.commit()/rollback()",
      "Convierte el método en privado",
      "Cachea el resultado del método"
    ],
    "correctIndex": 1,
    "explanation": "@Transactional demarca declarativamente el alcance de la transacción: si el método completa normalmente hace COMMIT; si lanza una excepción unchecked, hace ROLLBACK automático."
  },
  {
    "id": "cert-138",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID desde Java (Spring)",
    "question": "¿Qué ocurre si un método anotado con @Transactional se invoca desde DENTRO de la misma clase (this.metodo() o simplemente metodo())?",
    "options": [
      "Funciona exactamente igual que si viniera de otro bean externo",
      "La anotación NO se aplica: al no pasar por el proxy AOP de Spring, la demarcación transaccional se ignora silenciosamente",
      "Spring lanza una excepción explicando el problema",
      "El método se ejecuta dos veces"
    ],
    "correctIndex": 1,
    "explanation": "@Transactional se implementa mediante un proxy; una llamada interna dentro de la misma clase evita ese proxy por completo, y la anotación simplemente no tiene efecto, sin ningún aviso."
  },
  {
    "id": "cert-139",
    "category": "certificacion",
    "topic": "Módulo 7 - ACID desde Java (Spring)",
    "question": "Por defecto, ¿ante qué tipo de excepción hace ROLLBACK automático @Transactional de Spring?",
    "options": [
      "Ante cualquier Throwable, incluidos Error",
      "Ante excepciones UNCHECKED (RuntimeException y sus subclases); para checked hay que ser explícito con rollbackFor",
      "Nunca hace rollback automático bajo ninguna circunstancia",
      "Solo ante SQLException específicamente"
    ],
    "correctIndex": 1,
    "explanation": "Por defecto solo revierte ante RuntimeException (unchecked); para que también revierta ante una excepción checked personalizada, hay que declarar explícitamente @Transactional(rollbackFor = MiExcepcion.class)."
  },
  {
    "id": "cert-140",
    "category": "certificacion",
    "topic": "Módulo 7 - JTA",
    "question": "¿Cuándo se justifica realmente usar JTA (Java Transaction API) en vez de transacciones locales simples?",
    "options": [
      "Siempre, como buena práctica general en cualquier proyecto",
      "Solo cuando una operación de negocio debe ser atómica a través de MÁS DE UN recurso transaccional heterogéneo (ej. dos bases de datos distintas, o BD + cola de mensajes)",
      "Solo para aplicaciones de un único usuario",
      "JTA reemplazó por completo a JDBC en toda circunstancia"
    ],
    "correctIndex": 1,
    "explanation": "JTA introduce complejidad real (protocolo Two-Phase Commit) que solo se justifica cuando de verdad se cruzan múltiples recursos transaccionales distintos como una sola unidad atómica."
  },
  {
    "id": "cert-141",
    "category": "certificacion",
    "topic": "Módulo 7 - JTA",
    "question": "¿Qué protocolo coordina JTA para garantizar atomicidad entre varios recursos, conocido como 2PC?",
    "options": [
      "Round-robin scheduling",
      "Two-Phase Commit: una fase de 'prepare' (¿puedes comprometerte?) seguida de una fase de 'commit' solo si TODOS los recursos respondieron que sí",
      "TCP three-way handshake",
      "OAuth2 authorization code flow"
    ],
    "correctIndex": 1,
    "explanation": "En 2PC, el coordinador de transacciones pregunta primero a cada recurso si puede prepararse para comprometerse; solo si todos confirman, se ordena el commit final a todos ellos."
  },
  {
    "id": "cert-142",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A01",
    "question": "¿Qué describe la categoría A01:2021 - Broken Access Control?",
    "options": [
      "Contraseñas almacenadas sin cifrar",
      "Un usuario puede acceder a datos/funciones que no debería porque el servidor no verifica permisos en cada operación, confiando solo en ocultar la opción en la interfaz",
      "Uso de librerías con vulnerabilidades conocidas",
      "Falta de registro de eventos de seguridad"
    ],
    "correctIndex": 1,
    "explanation": "Ocultar un botón en la UI no es seguridad real; el servidor DEBE verificar en cada endpoint si el usuario autenticado realmente tiene permiso sobre el recurso solicitado."
  },
  {
    "id": "cert-143",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A01",
    "question": "Un endpoint '/pedidos/{id}' que devuelve cualquier pedido según el 'id' de la URL, SIN verificar que pertenezca al usuario autenticado, es un ejemplo de:",
    "options": [
      "A02 - Cryptographic Failures",
      "A01 - Broken Access Control",
      "A06 - Vulnerable Components",
      "A09 - Logging Failures"
    ],
    "correctIndex": 1,
    "explanation": "Cualquier usuario autenticado podría cambiar el 'id' en la URL y ver pedidos ajenos — la corrección es verificar en el servidor que el recurso pertenezca al usuario que hace la petición."
  },
  {
    "id": "cert-144",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A02",
    "question": "¿Por qué usar SHA-256 sin 'sal' (salt) para guardar contraseñas se considera una falla de A02 (Cryptographic Failures), aunque SHA-256 no esté 'roto' criptográficamente?",
    "options": [
      "Porque SHA-256 no es un algoritmo real",
      "Porque SHA-256 es una función RÁPIDA por diseño, vulnerable a fuerza bruta y rainbow tables sin sal; se necesita un algoritmo LENTO a propósito como BCrypt o Argon2",
      "Porque SHA-256 no puede procesar texto",
      "Porque SHA-256 requiere una licencia de pago"
    ],
    "correctIndex": 1,
    "explanation": "Los algoritmos de hash rápidos como SHA-256 están diseñados para integridad de archivos, no contraseñas; para contraseñas se necesitan algoritmos deliberadamente lentos y con sal automática (BCrypt, Argon2, scrypt)."
  },
  {
    "id": "cert-145",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A02",
    "question": "¿Qué corrección estándar recomienda la guía para almacenar contraseñas de forma segura?",
    "options": [
      "Guardarlas en texto plano para facilitar el soporte técnico",
      "Usar BCryptPasswordEncoder (o Argon2/scrypt): algoritmos lentos a propósito, con sal incluida automáticamente",
      "Usar MD5 con una sal fija compartida",
      "Cifrarlas con un algoritmo reversible y guardar la clave en el mismo servidor"
    ],
    "correctIndex": 1,
    "explanation": "BCrypt (y similares) están diseñados específicamente para contraseñas: son lentos a propósito (dificultan fuerza bruta) e incluyen sal automática en cada hash."
  },
  {
    "id": "cert-146",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A03",
    "question": "¿Qué categoría del OWASP Top 10 describe construir una consulta SQL concatenando directamente un valor recibido del usuario?",
    "options": [
      "A01 - Broken Access Control",
      "A03 - Injection (SQL Injection)",
      "A05 - Security Misconfiguration",
      "A08 - Software and Data Integrity Failures"
    ],
    "correctIndex": 1,
    "explanation": "Concatenar '\"SELECT * FROM usuarios WHERE nombre = '\" + usuario + \"'\"' permite que un atacante altere la estructura de la consulta enviando algo como \"' OR '1'='1\"."
  },
  {
    "id": "cert-147",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A03",
    "question": "¿Cuál es la corrección ESTÁNDAR, sin excepciones, para prevenir SQL Injection al usar valores del usuario en una consulta?",
    "options": [
      "Escapar manualmente las comillas simples del texto recibido",
      "Usar SIEMPRE PreparedStatement con parámetros (?), nunca concatenación de Strings dentro del SQL",
      "Validar que el texto no contenga la palabra 'DROP'",
      "Usar Statement en vez de PreparedStatement, es más simple"
    ],
    "correctIndex": 1,
    "explanation": "Con PreparedStatement y parámetros, el driver envía el valor como DATO puro al motor de base de datos — nunca se interpreta como parte del comando SQL, sin importar qué contenga el texto."
  },
  {
    "id": "cert-148",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A03",
    "question": "¿Qué produce el ataque clásico de enviar como 'usuario' el texto \"' OR '1'='1\" en una consulta SQL concatenada sin PreparedStatement?",
    "options": [
      "Un error de sintaxis que detiene la consulta",
      "La condición WHERE se vuelve siempre verdadera ('1'='1'), devolviendo TODOS los registros, saltándose el filtro original por completo",
      "El servidor se apaga automáticamente",
      "No tiene ningún efecto, SQL ignora comillas simples adicionales"
    ],
    "correctIndex": 1,
    "explanation": "'1'='1' es una condición siempre verdadera; al inyectarla vía OR, la cláusula WHERE completa se evalúa como verdadera para TODAS las filas, sin importar el resto de la condición."
  },
  {
    "id": "cert-149",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A04",
    "question": "¿Qué describe la categoría A04:2021 - Insecure Design?",
    "options": [
      "Un bug puntual de código fácil de corregir",
      "Vulnerabilidades que vienen de decisiones de ARQUITECTURA/diseño, no de un bug de código puntual — ej. un flujo de recuperación de contraseña sin límite de intentos",
      "El uso de una librería con una vulnerabilidad conocida",
      "La falta de un certificado TLS válido"
    ],
    "correctIndex": 1,
    "explanation": "A diferencia de un bug de implementación, el diseño inseguro requiere repensar el FLUJO completo del sistema (ej. agregar rate limiting desde el diseño, no como parche posterior)."
  },
  {
    "id": "cert-150",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A05",
    "question": "¿Qué describe la categoría A05:2021 - Security Misconfiguration?",
    "options": [
      "Uso de algoritmos criptográficos débiles",
      "Configuraciones por defecto inseguras, mensajes de error demasiado detallados que exponen información interna, o paneles administrativos expuestos sin necesidad",
      "Falta de un WAF (firewall de aplicaciones web)",
      "Un endpoint que hace peticiones a URLs controladas por el usuario"
    ],
    "correctIndex": 1,
    "explanation": "Devolver el stack trace completo al cliente en un error 500 (revelando rutas internas, versiones, estructura del código) es un ejemplo clásico de A05."
  },
  {
    "id": "cert-151",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A05",
    "question": "¿Cuál es la corrección estándar para el manejo de errores en un endpoint público, según A05?",
    "options": [
      "Mostrar siempre el stack trace completo al cliente para facilitar el debugging",
      "Registrar el detalle completo del error SOLO en logs internos del servidor, devolviendo al cliente un mensaje GENÉRICO",
      "Ignorar por completo cualquier excepción sin registrarla en ningún lado",
      "Enviar el error por correo electrónico al usuario que lo provocó"
    ],
    "correctIndex": 1,
    "explanation": "El detalle técnico completo (stack trace, nombres de clases, rutas) debe quedar solo en logs internos, accesibles al equipo de desarrollo, nunca expuesto directamente al cliente."
  },
  {
    "id": "cert-152",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A06",
    "question": "¿Qué describe la categoría A06:2021 - Vulnerable and Outdated Components?",
    "options": [
      "Errores de configuración del servidor web",
      "Usar librerías/frameworks con vulnerabilidades conocidas (CVEs) ya corregidas en versiones más nuevas, sin actualizar",
      "Falta de autenticación multifactor",
      "Consultas SQL concatenadas inseguras"
    ],
    "correctIndex": 1,
    "explanation": "El ejemplo clásico es seguir usando una versión de Log4j afectada por Log4Shell mucho después de que el parche estuviera disponible públicamente."
  },
  {
    "id": "cert-153",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A06",
    "question": "¿Qué práctica de CI/CD ayuda a detectar automáticamente dependencias con vulnerabilidades conocidas (A06)?",
    "options": [
      "Ejecutar un analizador de dependencias (ej. dependency-check, Dependabot, Snyk) como parte del pipeline",
      "Desactivar las actualizaciones automáticas para evitar cambios inesperados",
      "Usar siempre la versión 1.0.0 de cada librería",
      "No usar ninguna librería externa nunca"
    ],
    "correctIndex": 0,
    "explanation": "Integrar un escáner de dependencias en el pipeline detecta automáticamente cuándo una librería usada tiene un CVE publicado, permitiendo actualizar antes de que sea explotado."
  },
  {
    "id": "cert-154",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A07",
    "question": "¿Qué describe la categoría A07:2021 - Identification and Authentication Failures?",
    "options": [
      "Fallas en la validación de entradas del usuario",
      "Gestión débil de sesiones (ej. IDs de sesión predecibles), contraseñas débiles permitidas, o ausencia de autenticación multifactor donde el riesgo lo justifica",
      "Componentes de software desactualizados",
      "Peticiones HTTP a URLs controladas por el atacante"
    ],
    "correctIndex": 1,
    "explanation": "Un ID de sesión predecible (ej. basado directamente en el ID numérico del usuario) permite a un atacante 'adivinar' sesiones ajenas sin necesitar robar ninguna credencial."
  },
  {
    "id": "cert-155",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A08",
    "question": "¿Qué describe la categoría A08:2021 - Software and Data Integrity Failures, con la deserialización insegura como caso clásico?",
    "options": [
      "Falta de copias de seguridad de la base de datos",
      "Confiar en actualizaciones, plugins o datos DESERIALIZADOS sin verificar su integridad/origen, permitiendo ejecutar código arbitrario mediante objetos maliciosos",
      "Uso de contraseñas cortas",
      "Falta de un certificado SSL"
    ],
    "correctIndex": 1,
    "explanation": "Deserializar bytes de una fuente no confiable con ObjectInputStream puede permitir a un atacante construir objetos maliciosos que ejecuten código arbitrario al reconstruirse (gadget chains)."
  },
  {
    "id": "cert-156",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A08",
    "question": "¿Qué corrección recomienda la guía frente a la deserialización insegura de A08?",
    "options": [
      "Usar siempre ObjectInputStream sin ninguna restricción",
      "Usar formatos de datos sin ejecución de código al parsear (como JSON con una librería segura tipo Jackson), en vez de deserialización binaria de fuentes no confiables",
      "Aumentar el tamaño máximo de los objetos deserializados",
      "Deshabilitar por completo la seguridad del servidor para simplificar"
    ],
    "correctIndex": 1,
    "explanation": "JSON es 'datos puros', no código ejecutable al parsearse — preferirlo sobre deserialización Java nativa de fuentes no confiables elimina el vector de ataque de gadget chains."
  },
  {
    "id": "cert-157",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A09",
    "question": "¿Qué describe la categoría A09:2021 - Security Logging and Monitoring Failures?",
    "options": [
      "Uso de contraseñas débiles",
      "Sin registro (logs) de eventos de seguridad relevantes (logins fallidos, cambios de permisos, accesos denegados), un ataque puede pasar semanas sin ser detectado",
      "Consultas SQL sin PreparedStatement",
      "Falta de un índice en una tabla grande"
    ],
    "correctIndex": 1,
    "explanation": "Sin logging de eventos de seguridad, ni el equipo ni las herramientas de monitoreo pueden detectar patrones sospechosos (como múltiples intentos fallidos de login) a tiempo."
  },
  {
    "id": "cert-158",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A10",
    "question": "¿Qué describe la categoría A10:2021 - Server-Side Request Forgery (SSRF)?",
    "options": [
      "Un ataque de fuerza bruta contra contraseñas",
      "La aplicación hace una petición HTTP a una URL que el USUARIO controla, permitiendo que el atacante use al servidor como proxy hacia recursos internos",
      "La falta de un WAF",
      "Un JOIN mal escrito en una consulta SQL"
    ],
    "correctIndex": 1,
    "explanation": "Si un endpoint acepta una 'urlImagen' arbitraria del usuario y la consulta directamente, un atacante puede apuntarla hacia metadatos internos de la nube o servicios internos sin autenticación expuesta."
  },
  {
    "id": "cert-159",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP A10",
    "question": "¿Cuál es la corrección estándar recomendada contra SSRF (A10)?",
    "options": [
      "Permitir cualquier URL, ya que HTTP es un protocolo seguro por diseño",
      "Usar una WHITELIST explícita de dominios/IPs permitidos, rechazando cualquier URL fuera de esa lista",
      "Aumentar el timeout de las peticiones HTTP salientes",
      "Desactivar HTTPS para simplificar las validaciones"
    ],
    "correctIndex": 1,
    "explanation": "Restringir explícitamente a qué dominios puede la aplicación hacer peticiones salientes (whitelist) evita que un atacante redirija esas peticiones hacia recursos internos sensibles."
  },
  {
    "id": "cert-160",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP (general)",
    "question": "¿Qué representa el OWASP Top 10 en la industria del desarrollo de software?",
    "options": [
      "Una certificación oficial obligatoria para publicar cualquier aplicación web",
      "Una referencia estándar publicada por el Open Web Application Security Project, con las 10 categorías de vulnerabilidad más frecuentes y de mayor impacto en aplicaciones reales",
      "Un lenguaje de programación especializado en seguridad",
      "Un tipo de base de datos NoSQL"
    ],
    "correctIndex": 1,
    "explanation": "OWASP recopila datos de miles de aplicaciones reales para publicar, cada pocos años, las categorías de vulnerabilidad más comunes — el Top 10 2021 es la edición de referencia usada en esta guía."
  },
  {
    "id": "cert-161",
    "category": "certificacion",
    "topic": "Módulo 8 - OWASP (general)",
    "question": "Según la guía, ¿qué patrón subyacente comparten la mayoría de las categorías del OWASP Top 10?",
    "options": [
      "Todas requieren acceso físico al servidor",
      "En la inmensa mayoría de los casos, confiar en datos que vienen del usuario sin validarlos, verificarlos o escaparlos correctamente",
      "Todas dependen exclusivamente de errores de red",
      "Todas se resuelven únicamente actualizando el sistema operativo"
    ],
    "correctIndex": 1,
    "explanation": "Desde SQL Injection hasta SSRF, el hilo común es la confianza excesiva en entradas controladas por el usuario, sin la validación/verificación adecuada del lado del servidor."
  },
  {
    "id": "cert-162",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Cuál es la diferencia principal entre un arreglo (int[]) y un ArrayList en cuanto a tamaño?",
    "options": [
      "No hay diferencia",
      "El arreglo tiene tamaño FIJO desde su creación; el ArrayList puede crecer o encogerse dinámicamente",
      "ArrayList siempre es más rápido para todo",
      "Los arreglos no pueden usarse con enteros"
    ],
    "correctIndex": 1,
    "explanation": "Un array se define con tamaño fijo al crearse; ArrayList administra internamente un array que redimensiona automáticamente según se agregan/quitan elementos."
  },
  {
    "id": "cert-163",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué produce el siguiente código? 'int x = 5; if (x = 6) { System.out.println(\"entra\"); }'",
    "options": [
      "Imprime \"entra\"",
      "No compila: 'x = 6' es una asignación (no una comparación ==), y su tipo es int, no boolean, que es lo que exige el if",
      "Imprime nada, sin error",
      "Lanza una excepción en tiempo de ejecución"
    ],
    "correctIndex": 1,
    "explanation": "Java, a diferencia de C/C++, exige que la condición de un if sea estrictamente boolean — una asignación entera no compila ahí, previniendo ese bug clásico a nivel de compilador."
  },
  {
    "id": "cert-164",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué relación tiene la técnica de 'trazado' usada en diagramas de flujo (Módulo 2) con el análisis de código Java (Módulo 4)?",
    "options": [
      "Ninguna relación",
      "Es la MISMA técnica fundamental: seguir el flujo de control paso a paso, variable por variable, sin asumir nada, aplicada primero a un diagrama y luego a código real",
      "El Módulo 4 no requiere ninguna técnica especial",
      "Los diagramas de flujo son exclusivos de SQL"
    ],
    "correctIndex": 1,
    "explanation": "Ambos módulos entrenan la misma habilidad de trazado sistemático — la conexión explícita que la guía establece entre lógica de programación y lectura de código Java."
  },
  {
    "id": "cert-165",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "Combinando Módulo 6 (SOLID) y Módulo 8 (OWASP), ¿qué tienen en común el Dependency Inversion Principle y la corrección de A03 (SQL Injection) con PreparedStatement?",
    "options": [
      "No tienen ninguna relación conceptual",
      "Ambos evitan un acoplamiento/confianza directa y rígida hacia un detalle de bajo nivel (una implementación concreta, o un valor de texto sin validar), prefiriendo una capa de abstracción/control intermedia",
      "Ambos son exclusivos de bases de datos NoSQL",
      "Ambos requieren eliminar todas las interfaces del sistema"
    ],
    "correctIndex": 1,
    "explanation": "Aunque de dominios distintos, ambos principios comparten la idea de no confiar/acoplarse directamente a algo variable o no controlado (una implementación concreta vía 'new', o un texto crudo del usuario), interponiendo una capa que da control y seguridad."
  },
  {
    "id": "cert-166",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué principio de ACID se relaciona más directamente con la garantía de FIRST (Independent) al diseñar pruebas unitarias, en el sentido de 'aislamiento entre unidades'?",
    "options": [
      "Atomicity",
      "Isolation (Aislamiento): en ACID aísla transacciones concurrentes; en FIRST aísla pruebas entre sí, evitando que el resultado de una dependa de otra",
      "Durability",
      "Consistency"
    ],
    "correctIndex": 1,
    "explanation": "Aunque aplican a dominios distintos (transacciones de BD vs. pruebas de software), ambos 'Isolation'/'Independent' comparten la misma idea central: evitar que una unidad concurrente/independiente 'contamine' el resultado de otra."
  },
  {
    "id": "cert-167",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Cuál de estas afirmaciones sobre TDD y BDD es correcta según la guía?",
    "options": [
      "BDD reemplaza completamente a TDD en proyectos modernos",
      "TDD y BDD son complementarios: BDD define el comportamiento esperado desde la perspectiva del negocio, TDD guía cómo se implementa ese comportamiento a nivel de código",
      "TDD solo puede usarse en Java, BDD solo en Python",
      "BDD no requiere escribir ninguna prueba automatizada"
    ],
    "correctIndex": 1,
    "explanation": "Ambos operan en niveles distintos y se complementan: BDD en Gherkin comunica el QUÉ a stakeholders no técnicos; TDD guía el CÓMO a nivel de implementación de código."
  },
  {
    "id": "cert-168",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "En el ejemplo del Módulo 4 sobre 'contarPares', ¿qué principio general de buenas prácticas de programación ilustra mejor el error (declarar una variable local nueva en cada iteración)?",
    "options": [
      "La importancia de comentar cada línea de código",
      "La importancia de distinguir claramente entre DECLARAR una variable nueva y REASIGNAR una variable existente, especialmente dentro de bucles/condicionales",
      "La importancia de usar siempre nombres de variable de una sola letra",
      "La importancia de evitar el uso de bucles for"
    ],
    "correctIndex": 1,
    "explanation": "El bug de contarPares es sutil precisamente porque el código 'parece' incrementar un contador, pero en realidad crea y descarta una variable nueva cada vez, sin modificar jamás la variable externa."
  },
  {
    "id": "cert-169",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué tienen en común el patrón de 'acumulador' del Módulo 2 (diagramas de flujo) y el patrón de 'reduce()' de Streams en Java 8?",
    "options": [
      "No tienen ninguna relación conceptual",
      "Ambos combinan progresivamente los elementos de una colección/secuencia en un único valor resultante, partiendo de un valor inicial",
      "reduce() solo funciona con texto, no con números",
      "El patrón de acumulador es exclusivo de diagramas de flujo, nunca se usa en código real"
    ],
    "correctIndex": 1,
    "explanation": "Tanto el acumulador manual con bucle ('suma = suma + i') como stream.reduce(0, (a,b) -> a+b) expresan la misma idea: combinar elementos secuencialmente hacia un resultado único."
  },
  {
    "id": "cert-170",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "Un método Java que compila sin errores pero cuya lógica está invertida (como esValido() del Módulo 4), ¿qué nos recuerda sobre la relación entre COMPILAR y ser CORRECTO?",
    "options": [
      "Que si compila, necesariamente es correcto",
      "Que compilar exitosamente solo garantiza corrección SINTÁCTICA y de TIPOS, no corrección LÓGICA — se necesita trazado/pruebas para verificar el comportamiento real",
      "Que los errores de lógica son imposibles en Java",
      "Que solo los métodos privados pueden tener errores de lógica"
    ],
    "correctIndex": 1,
    "explanation": "El compilador de Java (como cualquier compilador) no puede detectar que una condición esté 'al revés' respecto a la intención del programador — solo pruebas bien diseñadas o un trazado cuidadoso lo revelan."
  },
  {
    "id": "cert-171",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué tienen en común el 'Fake' (test double) del Módulo 5 y una clase que implementa DIP del Módulo 6, en cuanto a diseño?",
    "options": [
      "No tienen relación alguna",
      "Ambos dependen de que el código de producción esté diseñado contra una ABSTRACCIÓN (interfaz), permitiendo sustituir la implementación real por una alternativa (un Fake en pruebas, u otra implementación concreta en producción) sin modificar el código cliente",
      "Un Fake siempre debe ser más lento que la implementación real",
      "DIP prohíbe el uso de test doubles"
    ],
    "correctIndex": 1,
    "explanation": "Poder sustituir una implementación real por un Fake en pruebas es posible precisamente PORQUE el código de producción ya depende de una interfaz (DIP) y no de una clase concreta — ambos conceptos se refuerzan mutuamente."
  },
  {
    "id": "cert-172",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Cuál de las siguientes NO es una de las 8 áreas cubiertas por la guía de certificación?",
    "options": [
      "Diagramas de flujo ANSI (lógica de programación)",
      "Principios SOLID",
      "Machine Learning y redes neuronales",
      "OWASP Top 10"
    ],
    "correctIndex": 2,
    "explanation": "La guía cubre SQL I, Lógica de Programación, Java II, Análisis de Código, Pruebas, SOLID, ACID y OWASP Top 10 — Machine Learning no forma parte de su alcance."
  },
  {
    "id": "cert-173",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué conexión existe entre el Módulo 7 (ACID) y el Módulo 1 (SQL I), respecto al comando UPDATE?",
    "options": [
      "Ninguna conexión: son temas completamente independientes",
      "Ambos módulos advierten sobre el mismo riesgo: un UPDATE sin WHERE afecta TODAS las filas, y en el contexto de una transacción, ese cambio completo se confirma o revierte como una sola unidad atómica",
      "El Módulo 7 prohíbe el uso de UPDATE por completo",
      "El Módulo 1 no menciona nunca el comando UPDATE"
    ],
    "correctIndex": 1,
    "explanation": "El Módulo 1 enseña la mecánica de UPDATE y su trampa clásica (olvidar el WHERE); el Módulo 7 explica la garantía transaccional (Atomicidad) que envuelve a ese mismo UPDATE dentro de una unidad de trabajo."
  },
  {
    "id": "cert-174",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "Según el análisis del Módulo 4, ¿por qué 'misterio(n)' (Fibonacci recursivo) SÍ termina, mientras que 'factorial(n)' sin caso base NO termina?",
    "options": [
      "Porque Fibonacci es un algoritmo más simple que factorial",
      "Porque misterio(n) tiene un caso base (n<=1) que la recursión alcanza progresivamente; factorial(n), tal como está escrito, carece por completo de caso base",
      "Porque misterio(n) no es realmente recursivo",
      "Porque factorial(n) usa un tipo de dato distinto"
    ],
    "correctIndex": 1,
    "explanation": "La presencia (o ausencia) de un caso base bien definido y alcanzable es la diferencia determinante entre una recursión que termina correctamente y una que provoca StackOverflowError."
  },
  {
    "id": "cert-175",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué principio de diseño de pruebas (FIRST) se relaciona más directamente con la práctica de usar Testcontainers en vez de mocks para pruebas de integración con base de datos?",
    "options": [
      "Fast (rapidez)",
      "Repeatable: usar el motor de base de datos REAL (vía Docker) en vez de una simulación produce un comportamiento más fiel y consistente entre entornos, evitando 'en pruebas pasaba, en producción falló'",
      "Timely (oportunidad)",
      "Self-validating"
    ],
    "correctIndex": 1,
    "explanation": "Aunque Testcontainers puede ser más lento que un mock, su valor principal es la fidelidad del comportamiento real replicado de forma consistente entre distintos entornos de ejecución."
  },
  {
    "id": "cert-176",
    "category": "certificacion",
    "topic": "Simulacro mixto",
    "question": "¿Qué error de la Función 6 del Módulo 4 (esValido) ilustra sobre la relación entre nombres de método y comportamiento real?",
    "options": [
      "Que el nombre de un método siempre garantiza su comportamiento correcto",
      "Que un nombre de método bien elegido NO sustituye la necesidad de trazar/verificar la lógica real: esValido() hace exactamente lo contrario de lo que su nombre sugiere",
      "Que los nombres de métodos no importan en absoluto",
      "Que Java revisa automáticamente la coherencia entre nombre y comportamiento"
    ],
    "correctIndex": 1,
    "explanation": "Un lector desprevenido que confía en el nombre 'esValido' sin trazar la condición negada llegaría a la conclusión equivocada — refuerza la importancia de verificar, no asumir, al analizar código."
  },
  {
    "id": "adv-java-001",
    "category": "java",
    "topic": "Generics y type erasure",
    "question": "¿Qué ocurre al compilar?\nList<Integer> ints = List.of(1, 2);\nList<? extends Number> nums = ints;\nnums.add(null);",
    "options": [
      "No compila porque nunca se puede invocar add sobre ? extends Number",
      "Compila; null es el único valor que puede añadirse sin violar la seguridad de tipos",
      "Compila y lanza UnsupportedOperationException en add",
      "Compila solo si nums se declara final"
    ],
    "correctIndex": 1,
    "explanation": "Con ? extends Number no se puede añadir un Number concreto, porque el tipo capturado podría ser Integer, Double, etc.; null es compatible con cualquier tipo de referencia. Si se ejecuta, List.of es inmutable y add(null) lanzaría UnsupportedOperationException."
  },
  {
    "id": "adv-java-002",
    "category": "java",
    "topic": "Generics y type erasure",
    "question": "¿Por qué no se pueden sobrecargar estos dos métodos en la misma clase?\nvoid process(List<String> x) {}\nvoid process(List<Integer> x) {}",
    "options": [
      "Porque String e Integer son final",
      "Porque tras el borrado ambos tienen la firma process(List)",
      "Porque List no admite sobrecarga",
      "Porque los genéricos solo existen en tiempo de ejecución"
    ],
    "correctIndex": 1,
    "explanation": "El type erasure elimina los argumentos de tipo para la firma de bytecode; ambos métodos colisionan como process(java.util.List)."
  },
  {
    "id": "adv-java-003",
    "category": "java",
    "topic": "Generics y PECS",
    "question": "Se desea copiar elementos de src a dst. ¿Qué firma expresa correctamente PECS?",
    "options": [
      "<T> void copy(List<T> src, List<T> dst)",
      "<T> void copy(List<? super T> src, List<? extends T> dst)",
      "<T> void copy(List<? extends T> src, List<? super T> dst)",
      "void copy(List<?> src, List<?> dst)"
    ],
    "correctIndex": 2,
    "explanation": "El productor usa extends y el consumidor usa super: src produce valores T y dst los consume."
  },
  {
    "id": "adv-java-004",
    "category": "java",
    "topic": "Sobrecarga y boxing",
    "question": "¿Qué imprime?\nstatic void f(long x){System.out.print(\"L\");}\nstatic void f(Integer x){System.out.print(\"I\");}\npublic static void main(String[] a){ f(1); }",
    "options": [
      "L",
      "I",
      "Error de ambigüedad",
      "Depende de la JVM"
    ],
    "correctIndex": 0,
    "explanation": "La ampliación primitiva int→long se prefiere a boxing int→Integer durante la resolución de sobrecarga."
  },
  {
    "id": "adv-java-005",
    "category": "java",
    "topic": "Sobrecarga y varargs",
    "question": "¿Qué método se selecciona para g(1, 2)?\nstatic void g(Integer a, Integer b){}\nstatic void g(int... xs){}",
    "options": [
      "g(int...) porque evita boxing",
      "g(Integer,Integer) porque los métodos de aridad fija se consideran antes que varargs",
      "Es ambiguo",
      "Ninguno compila"
    ],
    "correctIndex": 1,
    "explanation": "La resolución prueba primero métodos de aridad fija permitiendo boxing; varargs es una fase posterior."
  },
  {
    "id": "adv-java-006",
    "category": "java",
    "topic": "Strings",
    "question": "¿Qué imprime?\nString a = \"ab\";\nString b = \"a\" + \"b\";\nString x = \"a\";\nString c = x + \"b\";\nSystem.out.print((a == b) + \" \" + (a == c));",
    "options": [
      "true true",
      "true false",
      "false true",
      "false false"
    ],
    "correctIndex": 1,
    "explanation": "La concatenación de constantes se pliega en compilación y usa el pool; x + \"b\" se evalúa en ejecución y crea otro objeto."
  },
  {
    "id": "adv-java-007",
    "category": "java",
    "topic": "Records",
    "question": "En record Range(int min, int max), ¿qué forma de constructor compacto valida y normaliza correctamente antes de asignar los campos finales?",
    "options": [
      "Range { if(min>max){ int t=min; min=max; max=t; } }",
      "Range { this.min=min; this.max=max; }",
      "Range(int min,int max){ if(min>max) return; }",
      "Range { this.min=max; }"
    ],
    "correctIndex": 0,
    "explanation": "En un constructor compacto se pueden reasignar los parámetros; el compilador realiza al final las asignaciones implícitas a los componentes. No se asignan directamente los campos."
  },
  {
    "id": "adv-java-008",
    "category": "java",
    "topic": "Sealed classes",
    "question": "Una clase implementa directamente una interfaz sealed. ¿Cuál es una obligación de su declaración?",
    "options": [
      "Debe ser public",
      "Debe declararse final, sealed o non-sealed, salvo estados implícitos como record/enum",
      "Debe estar en el mismo paquete incluso si usa módulos nombrados",
      "Debe incluir siempre una cláusula permits"
    ],
    "correctIndex": 1,
    "explanation": "Todo subtipo directo debe declarar cómo continúa la jerarquía. En un módulo nombrado debe estar en el mismo módulo; la restricción de mismo paquete aplica al módulo no nombrado."
  },
  {
    "id": "adv-java-009",
    "category": "java",
    "topic": "Pattern matching",
    "question": "¿Por qué no compila este código?\nObject o = \"x\";\nif (o instanceof String s || s.isEmpty()) {}",
    "options": [
      "instanceof no admite variables de patrón",
      "s podría usarse cuando el lado izquierdo sea false, por lo que no está definitivamente asignada",
      "String no tiene isEmpty",
      "Debe usarse | en vez de ||"
    ],
    "correctIndex": 1,
    "explanation": "Con ||, el operando derecho se evalúa precisamente si el patrón no coincidió; s no estaría asignada. Con && sí sería segura."
  },
  {
    "id": "adv-java-010",
    "category": "java",
    "topic": "Excepciones",
    "question": "¿Qué excepción sale del método?\ntry { throw new IllegalStateException(\"body\"); }\nfinally { throw new IllegalArgumentException(\"finally\"); }",
    "options": [
      "IllegalStateException con IllegalArgumentException suprimida",
      "IllegalArgumentException; la excepción original se pierde",
      "MultiException con ambas causas",
      "No compila"
    ],
    "correctIndex": 1,
    "explanation": "Una excepción lanzada explícitamente en finally reemplaza la excepción pendiente del try; no se agrega automáticamente como suppressed."
  },
  {
    "id": "adv-java-011",
    "category": "java",
    "topic": "Try-with-resources",
    "question": "El cuerpo lanza E1 y close() de dos recursos, creados A y luego B, lanza E2 y E3 respectivamente. ¿Cuál es el resultado?",
    "options": [
      "E3 es principal; E2 y E1 son suppressed",
      "E1 es principal; E3 y después E2 quedan suppressed",
      "E1 es principal; E2 y después E3 quedan suppressed",
      "Solo E1; close no se ejecuta si falla el cuerpo"
    ],
    "correctIndex": 1,
    "explanation": "Los recursos cierran en orden inverso: B y luego A. La excepción del cuerpo sigue siendo principal y las de cierre se suprimen en ese orden."
  },
  {
    "id": "adv-java-012",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Qué riesgo contractual aparece si una clave de HashMap cambia un campo usado por equals y hashCode después de insertarse?",
    "options": [
      "El mapa reubica automáticamente la entrada",
      "La entrada puede quedar inencontrable en el bucket calculado para el nuevo hash",
      "HashMap convierte la clave en inmutable",
      "Solo afecta el orden de iteración"
    ],
    "correctIndex": 1,
    "explanation": "HashMap no vuelve a indexar claves mutadas; la búsqueda usa el hash actual y puede consultar otro bucket."
  },
  {
    "id": "adv-java-013",
    "category": "java",
    "topic": "Colecciones",
    "question": "¿Cuál es la diferencia crítica entre Collections.unmodifiableList(original) y List.copyOf(original)?",
    "options": [
      "Ambas siempre hacen copia profunda",
      "La primera es una vista que refleja cambios del original; copyOf crea una instantánea superficial y rechaza null",
      "copyOf permite null pero la vista no",
      "La vista es mutable mediante set"
    ],
    "correctIndex": 1,
    "explanation": "unmodifiableList bloquea mutaciones a través de la vista, pero comparte el backing list. copyOf produce una colección no modificable separada (salvo optimizaciones) y no admite elementos null."
  },
  {
    "id": "adv-java-014",
    "category": "java",
    "topic": "Streams",
    "question": "¿Qué afirmación sobre peek en un stream es correcta?",
    "options": [
      "Garantiza ejecutarse una vez por elemento del origen",
      "Es una operación terminal",
      "Puede no ejecutarse para algunos o todos los elementos debido a pereza y optimizaciones; no debe sostener lógica esencial",
      "Ordena el stream antes de observarlo"
    ],
    "correctIndex": 2,
    "explanation": "peek es intermedia y perezosa. Operaciones como count pueden permitir optimizaciones que eviten recorrer la fuente; se recomienda principalmente para depuración."
  },
  {
    "id": "adv-java-015",
    "category": "java",
    "topic": "Streams",
    "question": "¿Qué sucede?\nvar s = Stream.of(1,2,3);\nlong n = s.count();\nint sum = s.mapToInt(Integer::intValue).sum();",
    "options": [
      "n=3 y sum=6",
      "sum=0 porque el stream quedó vacío",
      "Se lanza IllegalStateException al reutilizar un stream consumido",
      "No compila porque count cierra la JVM"
    ],
    "correctIndex": 2,
    "explanation": "Un stream solo admite una operación terminal; tras count queda consumido y reutilizarlo es ilegal."
  },
  {
    "id": "adv-java-016",
    "category": "java",
    "topic": "Streams paralelos",
    "question": "¿Por qué reduce(0, (a,b)->a-b) no es seguro para obtener una resta determinista en parallelStream()?",
    "options": [
      "reduce no acepta enteros",
      "La operación no es asociativa y el resultado depende de cómo se particione y combine",
      "El identificador debe ser 1",
      "Los streams paralelos ignoran el acumulador"
    ],
    "correctIndex": 1,
    "explanation": "La reducción paralela requiere identidad y operador asociativo (y compatibilidad del combinador); la resta no es asociativa."
  },
  {
    "id": "adv-java-017",
    "category": "java",
    "topic": "Optional",
    "question": "¿Qué diferencia práctica existe entre optional.orElse(expensive()) y optional.orElseGet(this::expensive) cuando hay valor?",
    "options": [
      "Ninguna: ambos son siempre perezosos",
      "orElse evalúa expensive() de forma anticipada; orElseGet no invoca el supplier",
      "orElseGet devuelve siempre null",
      "orElse lanza si expensive falla aunque Optional esté vacío únicamente"
    ],
    "correctIndex": 1,
    "explanation": "Los argumentos normales se evalúan antes de llamar a orElse; el Supplier de orElseGet solo se ejecuta si falta el valor."
  },
  {
    "id": "adv-java-018",
    "category": "java",
    "topic": "Memoria y GC",
    "question": "Un objeto A referencia a B y ambos forman un ciclo, pero ningún GC root alcanza a A ni B. ¿Qué ocurre?",
    "options": [
      "El ciclo impide su recolección",
      "Ambos son elegibles para GC porque la alcanzabilidad, no el conteo de referencias, decide",
      "Solo B es elegible",
      "Java requiere cerrar el ciclo manualmente"
    ],
    "correctIndex": 1,
    "explanation": "Los recolectores de Java determinan alcanzabilidad desde raíces; los ciclos aislados no conservan objetos vivos."
  },
  {
    "id": "adv-java-019",
    "category": "java",
    "topic": "Java Memory Model",
    "question": "¿Qué garantiza volatile sobre int counter si varios hilos ejecutan counter++?",
    "options": [
      "Visibilidad y atomicidad del incremento compuesto",
      "Visibilidad de lecturas/escrituras, pero counter++ sigue siendo read-modify-write no atómico",
      "Solo atomicidad, no visibilidad",
      "Exclusión mutua equivalente a synchronized"
    ],
    "correctIndex": 1,
    "explanation": "volatile establece orden y visibilidad, pero no convierte una secuencia leer-modificar-escribir en una operación atómica."
  },
  {
    "id": "adv-java-020",
    "category": "java",
    "topic": "Java Memory Model",
    "question": "Tras t.start(), el hilo t lee campos escritos por el creador antes de start. ¿Qué establece el modelo de memoria?",
    "options": [
      "No existe garantía sin volatile",
      "Las acciones anteriores a start happen-before de las acciones del hilo iniciado",
      "Solo los campos final son visibles",
      "start equivale a join"
    ],
    "correctIndex": 1,
    "explanation": "La regla de Thread.start crea una relación happens-before desde las acciones previas del hilo iniciador hacia el nuevo hilo."
  },
  {
    "id": "adv-java-021",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué problema tiene usar ConcurrentHashMap y hacer if(!map.containsKey(k)) map.put(k,v) para inicialización única?",
    "options": [
      "ConcurrentHashMap no permite put",
      "Cada operación es segura, pero la secuencia compuesta no es atómica; debe usarse computeIfAbsent/putIfAbsent",
      "containsKey bloquea todo el mapa permanentemente",
      "put convierte el mapa en HashMap"
    ],
    "correctIndex": 1,
    "explanation": "La seguridad individual no hace atómica la operación check-then-act; dos hilos pueden observar ausencia."
  },
  {
    "id": "adv-java-022",
    "category": "java",
    "topic": "Concurrencia",
    "question": "¿Qué semántica tiene CompletableFuture.thenApply frente a thenCompose cuando la función devuelve CompletableFuture<U>?",
    "options": [
      "thenApply aplana y thenCompose anida",
      "thenApply produce CompletableFuture<CompletableFuture<U>>; thenCompose aplana a CompletableFuture<U>",
      "Son idénticos",
      "thenCompose solo funciona con errores"
    ],
    "correctIndex": 1,
    "explanation": "thenCompose es el flatMap de CompletionStage y evita futuros anidados."
  },
  {
    "id": "adv-java-023",
    "category": "java",
    "topic": "Virtual threads",
    "question": "¿Cuál es el objetivo principal de los virtual threads en Java 21?",
    "options": [
      "Acelerar cálculos CPU-bound individuales",
      "Aumentar throughput en muchas tareas concurrentes que esperan I/O, manteniendo estilo bloqueante simple",
      "Reemplazar synchronized por transacciones",
      "Garantizar menor latencia para toda tarea"
    ],
    "correctIndex": 1,
    "explanation": "Son ligeros y escalables para gran cantidad de tareas bloqueadas; no hacen que el código CPU-bound ejecute más rápido."
  },
  {
    "id": "adv-java-024",
    "category": "java",
    "topic": "Virtual threads",
    "question": "¿Qué práctica contradice el modelo recomendado para virtual threads?",
    "options": [
      "Crear un virtual thread por tarea",
      "Usar llamadas bloqueantes de I/O",
      "Agrupar y reutilizar un número pequeño de virtual threads como recurso escaso",
      "Limitar explícitamente un recurso externo con semáforo"
    ],
    "correctIndex": 2,
    "explanation": "Los virtual threads son abundantes y representan tareas; no deben agruparse como platform threads. Los recursos externos sí pueden requerir límites."
  },
  {
    "id": "adv-java-025",
    "category": "java",
    "topic": "Módulos JPMS",
    "question": "En module-info.java, ¿qué diferencia hay entre exports p y opens p?",
    "options": [
      "exports permite acceso normal a tipos públicos; opens habilita reflexión profunda en runtime",
      "opens permite compilación y exports solo reflexión",
      "No hay diferencia",
      "exports hace públicos también los miembros private"
    ],
    "correctIndex": 0,
    "explanation": "exports controla acceso de lenguaje a API pública. opens permite a otros módulos acceso reflectivo a miembros no públicos sin exportar la API para compilación."
  },
  {
    "id": "adv-java-026",
    "category": "java",
    "topic": "Class loading",
    "question": "Dos class loaders distintos cargan bytes idénticos de com.acme.Widget. ¿Son el mismo tipo para la JVM?",
    "options": [
      "Sí, porque el nombre binario coincide",
      "No; la identidad incluye nombre binario y class loader definidor",
      "Sí, si el hash del .class coincide",
      "Solo difieren en modo debug"
    ],
    "correctIndex": 1,
    "explanation": "La identidad de tipo en la JVM está formada por el nombre y el loader que lo define; esto explica ciertos ClassCastException en contenedores/plugins."
  },
  {
    "id": "adv-java-027",
    "category": "java",
    "topic": "Fechas y horas",
    "question": "¿Por qué LocalDateTime no basta para representar inequívocamente un instante global?",
    "options": [
      "Porque es mutable",
      "Porque carece de offset/zona; durante cambios DST una hora local puede ser ambigua o inexistente",
      "Porque solo admite fechas anteriores a 2038",
      "Porque siempre usa UTC"
    ],
    "correctIndex": 1,
    "explanation": "LocalDateTime describe campos civiles sin reglas de zona. Instant o ZonedDateTime resuelven la línea temporal."
  },
  {
    "id": "adv-java-028",
    "category": "java",
    "topic": "JDBC",
    "question": "Con autoCommit=false, una operación falla con SQLException. ¿Qué debe asumir código portable?",
    "options": [
      "El driver siempre hizo rollback total",
      "Debe ejecutar rollback explícito; el estado y alcance tras error dependen del motor/driver",
      "La conexión se cierra automáticamente",
      "commit confirmará solo sentencias correctas en todos los motores"
    ],
    "correctIndex": 1,
    "explanation": "JDBC no convierte todo error en rollback automático universal; el dueño de la transacción debe decidir rollback y restaurar autoCommit al devolver conexiones al pool."
  },
  {
    "id": "adv-java-029",
    "category": "java",
    "topic": "equals y herencia",
    "question": "Una clase base usa instanceof en equals y una subclase añade estado significativo. ¿Qué propiedad suele romperse si la subclase restringe equals a su tipo exacto?",
    "options": [
      "Reflexividad",
      "Simetría entre objeto base y subclase",
      "No nulidad",
      "Determinismo de hashCode únicamente"
    ],
    "correctIndex": 1,
    "explanation": "La base puede considerar igual a la subclase mientras la subclase rechaza a la base. La composición o clases value final evitan esta trampa."
  },
  {
    "id": "adv-java-030",
    "category": "java",
    "topic": "Inicialización",
    "question": "¿Qué imprime?\nclass X {\n static { System.out.print(\"S\"); }\n { System.out.print(\"I\"); }\n X(){ System.out.print(\"C\"); }\n public static void main(String[] a){ new X(); new X(); }\n}",
    "options": [
      "SICIC",
      "SICSIC",
      "ICIC",
      "SSICIC"
    ],
    "correctIndex": 0,
    "explanation": "El inicializador estático corre una vez al inicializar la clase; cada instancia ejecuta el inicializador de instancia antes del cuerpo del constructor."
  },
  {
    "id": "adv-sql-001",
    "category": "sql",
    "topic": "NULL y lógica ternaria",
    "question": "¿Qué devuelve WHERE x NOT IN (1, NULL) para x=2 en SQL estándar?",
    "options": [
      "La fila, porque 2 no es 1",
      "No devuelve la fila: la comparación produce UNKNOWN",
      "Error de sintaxis",
      "La fila solo en PostgreSQL"
    ],
    "correctIndex": 1,
    "explanation": "NOT IN equivale a negar una disyunción; 2=NULL es UNKNOWN y NOT(FALSE OR UNKNOWN) sigue siendo UNKNOWN, que WHERE descarta."
  },
  {
    "id": "adv-sql-002",
    "category": "sql",
    "topic": "Antijoins",
    "question": "¿Qué forma es normalmente más segura para buscar padres sin hijos cuando la subconsulta puede devolver NULL?",
    "options": [
      "id NOT IN (SELECT parent_id FROM child)",
      "NOT EXISTS (SELECT 1 FROM child c WHERE c.parent_id=p.id)",
      "id <> ALL(NULL)",
      "LEFT JOIN sin condición ON"
    ],
    "correctIndex": 1,
    "explanation": "NOT EXISTS prueba existencia correlacionada y no queda contaminado por un NULL ajeno como NOT IN."
  },
  {
    "id": "adv-sql-003",
    "category": "sql",
    "topic": "JOIN",
    "question": "¿Qué efecto tiene mover c.active=true desde ON a WHERE en un LEFT JOIN de parent p con child c?",
    "options": [
      "Ninguno",
      "Elimina filas sin hijo coincidente y suele convertir semánticamente el outer join en inner join",
      "Duplica solo padres sin hijos",
      "Hace la consulta no determinista"
    ],
    "correctIndex": 1,
    "explanation": "Las filas extendidas con NULL fallan c.active=true en WHERE. En ON se conservan los padres aunque no exista hijo activo."
  },
  {
    "id": "adv-sql-004",
    "category": "sql",
    "topic": "Agregación",
    "question": "En un LEFT JOIN, ¿por qué COUNT(*) y COUNT(child.id) pueden diferir por grupo?",
    "options": [
      "COUNT(*) ignora NULL y COUNT(id) no",
      "COUNT(*) cuenta la fila extendida del padre; COUNT(child.id) ignora el NULL cuando no hay hijo",
      "COUNT(id) cuenta dos veces",
      "Solo difieren con DISTINCT"
    ],
    "correctIndex": 1,
    "explanation": "COUNT(expresión) ignora NULL; COUNT(*) cuenta filas independientemente de sus valores."
  },
  {
    "id": "adv-sql-005",
    "category": "sql",
    "topic": "GROUP BY",
    "question": "¿Cuál es la diferencia conceptual entre WHERE y HAVING?",
    "options": [
      "WHERE filtra grupos después de agregar",
      "WHERE filtra filas antes de agrupar; HAVING filtra grupos después de la agregación lógica",
      "HAVING solo admite columnas sin agregación",
      "Son sinónimos optimizados igual"
    ],
    "correctIndex": 1,
    "explanation": "El orden lógico permite que HAVING use resultados agregados, mientras WHERE determina las filas de entrada."
  },
  {
    "id": "adv-sql-006",
    "category": "sql",
    "topic": "Funciones de ventana",
    "question": "¿Qué diferencia hay entre ROW_NUMBER, RANK y DENSE_RANK ante empates?",
    "options": [
      "Las tres asignan lo mismo",
      "ROW_NUMBER distingue filas; RANK deja huecos después de empates; DENSE_RANK no deja huecos",
      "DENSE_RANK deja huecos y RANK no",
      "ROW_NUMBER devuelve NULL en empates"
    ],
    "correctIndex": 1,
    "explanation": "Con valores 100,100,90: ROW_NUMBER 1,2,3; RANK 1,1,3; DENSE_RANK 1,1,2."
  },
  {
    "id": "adv-sql-007",
    "category": "sql",
    "topic": "Funciones de ventana",
    "question": "Para obtener el último valor de toda una partición, ¿por qué LAST_VALUE(x) OVER(ORDER BY ts) puede sorprender?",
    "options": [
      "LAST_VALUE no acepta ORDER BY",
      "El frame por defecto suele terminar en el peer actual; se debe especificar un frame hasta UNBOUNDED FOLLOWING",
      "Siempre devuelve el primer valor",
      "Requiere GROUP BY"
    ],
    "correctIndex": 1,
    "explanation": "LAST_VALUE actúa sobre el frame, no necesariamente sobre toda la partición. El frame debe declararse conforme a la intención."
  },
  {
    "id": "adv-sql-008",
    "category": "sql",
    "topic": "Funciones de ventana",
    "question": "¿Cuál consulta conserva cada fila y añade el total del departamento?",
    "options": [
      "SELECT dept, SUM(salary) FROM emp GROUP BY dept",
      "SELECT e.*, SUM(salary) OVER(PARTITION BY dept) total FROM emp e",
      "SELECT DISTINCT SUM(salary) FROM emp",
      "SELECT e.*, SUM(salary) FROM emp e"
    ],
    "correctIndex": 1,
    "explanation": "Una función ventana calcula sobre la partición sin colapsar las filas como GROUP BY."
  },
  {
    "id": "adv-sql-009",
    "category": "sql",
    "topic": "CTE recursivas",
    "question": "¿Qué componente evita conceptualmente una recursión infinita en WITH RECURSIVE?",
    "options": [
      "ORDER BY obligatorio",
      "Un caso base y una condición/transformación recursiva que alcance un punto fijo; además conviene detección de ciclos",
      "DISTINCT siempre obligatorio",
      "COMMIT entre iteraciones"
    ],
    "correctIndex": 1,
    "explanation": "La recursión debe dejar de producir filas. Jerarquías con ciclos requieren defensa específica del motor o ruta visitada."
  },
  {
    "id": "adv-sql-010",
    "category": "sql",
    "topic": "Operadores de conjunto",
    "question": "¿Qué diferencia principal hay entre UNION y UNION ALL?",
    "options": [
      "UNION conserva duplicados",
      "UNION elimina duplicados, normalmente con trabajo adicional; UNION ALL concatena resultados",
      "UNION ALL requiere columnas con nombres iguales",
      "UNION ordena de manera garantizada"
    ],
    "correctIndex": 1,
    "explanation": "UNION aplica semántica de conjunto; ninguna variante garantiza orden sin ORDER BY final."
  },
  {
    "id": "adv-sql-011",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Puede una FOREIGN KEY referenciar columnas que no sean PRIMARY KEY?",
    "options": [
      "Nunca",
      "Sí, si el conjunto referenciado tiene una restricción UNIQUE/clave candidata compatible según el motor",
      "Sí, cualquier columna con índice no único",
      "Solo si admite NULL"
    ],
    "correctIndex": 1,
    "explanation": "La referencia debe identificar de forma única una fila; una clave candidata UNIQUE puede servir, con detalles dependientes del DBMS."
  },
  {
    "id": "adv-sql-012",
    "category": "sql",
    "topic": "Constraints",
    "question": "¿Por qué CHECK (salary > 0) podría permitir NULL en salary?",
    "options": [
      "CHECK se evalúa después de COMMIT",
      "Una restricción CHECK rechaza FALSE; UNKNOWN por NULL no es FALSE. Se necesita además NOT NULL",
      "NULL se convierte en cero",
      "CHECK nunca valida INSERT"
    ],
    "correctIndex": 1,
    "explanation": "La lógica ternaria hace que salary > 0 sea UNKNOWN para NULL; NOT NULL expresa la otra regla."
  },
  {
    "id": "adv-sql-013",
    "category": "sql",
    "topic": "Claves",
    "question": "¿Qué ventaja de diseño tiene una clave natural estable frente a una surrogate key?",
    "options": [
      "Elimina toda necesidad de índices",
      "Impone directamente la unicidad del hecho de negocio; aun con surrogate debe conservarse UNIQUE sobre la clave natural",
      "Nunca cambia y por definición ocupa menos",
      "Permite duplicados de negocio"
    ],
    "correctIndex": 1,
    "explanation": "Una clave artificial facilita referencias, pero no reemplaza la restricción de unicidad del dominio."
  },
  {
    "id": "adv-sql-014",
    "category": "sql",
    "topic": "Normalización",
    "question": "Una tabla order_line(order_id, product_id, product_name, qty) usa PK(order_id,product_id), y product_name depende solo de product_id. ¿Qué viola?",
    "options": [
      "1NF por usar clave compuesta",
      "2NF por dependencia parcial de una parte de la clave",
      "3NF únicamente por dependencia transitiva",
      "BCNF porque qty es numérico"
    ],
    "correctIndex": 1,
    "explanation": "Un atributo no clave depende de parte de la clave compuesta; debe residir en Product."
  },
  {
    "id": "adv-sql-015",
    "category": "sql",
    "topic": "Normalización",
    "question": "Si employee_id→department_id y department_id→department_name dentro de Employee, ¿qué anomalía señala 3NF?",
    "options": [
      "Dependencia multivaluada",
      "Dependencia transitiva de department_name respecto a la clave",
      "Falta de atomicidad",
      "Producto cartesiano"
    ],
    "correctIndex": 1,
    "explanation": "department_name depende de la clave a través de department_id, generando redundancia y anomalías de actualización."
  },
  {
    "id": "adv-sql-016",
    "category": "sql",
    "topic": "Índices",
    "question": "Con índice B-tree(a,b,c), ¿qué predicado suele aprovechar mejor el prefijo del índice?",
    "options": [
      "WHERE b=2 AND c=3 sin condición sobre a",
      "WHERE a=1 AND b=2",
      "WHERE c=3 únicamente",
      "WHERE function(a)=1 siempre"
    ],
    "correctIndex": 1,
    "explanation": "Los B-tree compuestos suelen ser más eficaces siguiendo el prefijo izquierdo. Capacidades exactas dependen del optimizador."
  },
  {
    "id": "adv-sql-017",
    "category": "sql",
    "topic": "Índices",
    "question": "¿Por qué WHERE LOWER(email)=? puede no usar un índice ordinario sobre email?",
    "options": [
      "LOWER solo funciona en SELECT",
      "La función cambia la expresión indexada; puede requerir índice funcional/de expresión o comparación normalizada",
      "Los índices no admiten texto",
      "Los parámetros desactivan índices"
    ],
    "correctIndex": 1,
    "explanation": "La búsqueda se realiza sobre LOWER(email), no directamente sobre email; un índice correspondiente restaura sargabilidad."
  },
  {
    "id": "adv-sql-018",
    "category": "sql",
    "topic": "Índices",
    "question": "¿Por qué añadir muchos índices puede empeorar un sistema OLTP?",
    "options": [
      "SELECT deja de funcionar",
      "INSERT/UPDATE/DELETE deben mantenerlos y aumentan almacenamiento, WAL/redo y contención",
      "El optimizador usa todos simultáneamente",
      "Los índices eliminan constraints"
    ],
    "correctIndex": 1,
    "explanation": "Los índices aceleran ciertos accesos a cambio de coste en escrituras y espacio; deben responder a cargas reales."
  },
  {
    "id": "adv-sql-019",
    "category": "sql",
    "topic": "Optimización",
    "question": "¿Qué significa que un predicado sea sargable?",
    "options": [
      "Que usa sintaxis estándar únicamente",
      "Que puede convertirse eficazmente en condición de búsqueda sobre un índice, evitando envolver la columna innecesariamente",
      "Que contiene GROUP BY",
      "Que siempre fuerza un full scan"
    ],
    "correctIndex": 1,
    "explanation": "Por ejemplo, un rango sobre created_at suele ser más sargable que aplicar una función a cada created_at."
  },
  {
    "id": "adv-sql-020",
    "category": "sql",
    "topic": "Optimización",
    "question": "¿Por qué SELECT * es desaconsejable en APIs estables?",
    "options": [
      "SQL no permite asterisco en producción",
      "Acopla al esquema, transfiere columnas innecesarias y puede impedir index-only scans",
      "Siempre devuelve filas duplicadas",
      "Evita prepared statements"
    ],
    "correctIndex": 1,
    "explanation": "Proyectar explícitamente documenta el contrato y reduce I/O; también evita cambios accidentales cuando evoluciona la tabla."
  },
  {
    "id": "adv-sql-021",
    "category": "sql",
    "topic": "Aislamiento",
    "question": "¿Qué anomalía impide READ COMMITTED pero puede permitir respecto a dos lecturas de la misma fila?",
    "options": [
      "Dirty read impedido; non-repeatable read posible",
      "Dirty read posible; phantom imposible",
      "Todas las anomalías impedidas",
      "Lost update siempre imposible por estándar"
    ],
    "correctIndex": 0,
    "explanation": "READ COMMITTED evita leer datos no confirmados, pero otra transacción puede confirmar un cambio entre lecturas."
  },
  {
    "id": "adv-sql-022",
    "category": "sql",
    "topic": "Aislamiento",
    "question": "Dos médicos leen que el otro está de guardia y cada uno se retira, dejando cero, aunque actualizan filas distintas. ¿Qué anomalía MVCC ilustra?",
    "options": [
      "Dirty read",
      "Write skew, que snapshot isolation puede permitir",
      "Fuzzy checkpoint",
      "Lectura sucia de índice"
    ],
    "correctIndex": 1,
    "explanation": "Cada transacción conserva la restricción según su snapshot, pero juntas la violan; serializable o bloqueo explícito puede ser necesario."
  },
  {
    "id": "adv-sql-023",
    "category": "sql",
    "topic": "Bloqueos",
    "question": "¿Cuál es la estrategia correcta ante deadlocks detectados por el DBMS?",
    "options": [
      "Desactivar transacciones",
      "El motor aborta una víctima; la aplicación debe poder reintentar la transacción completa de forma segura",
      "Reintentar solo la última sentencia después de commit",
      "Usar NOLOCK universalmente"
    ],
    "correctIndex": 1,
    "explanation": "Un deadlock se resuelve abortando una transacción. Reintentar exige límites, backoff e idempotencia apropiada."
  },
  {
    "id": "adv-sql-024",
    "category": "sql",
    "topic": "Transacciones",
    "question": "¿Qué problema tiene mantener una transacción abierta mientras se espera una llamada HTTP externa?",
    "options": [
      "HTTP confirma automáticamente la BD",
      "Prolonga locks/snapshots y aumenta contención; conviene acortar la transacción y coordinar con patrones como outbox",
      "Convierte SQL en autocommit",
      "Garantiza exactly-once"
    ],
    "correctIndex": 1,
    "explanation": "Las transacciones de base de datos deben ser cortas. Coordinar sistemas requiere diseños explícitos, no sostener recursos indefinidamente."
  },
  {
    "id": "adv-sql-025",
    "category": "sql",
    "topic": "Paginación",
    "question": "¿Por qué OFFSET 100000 LIMIT 20 puede degradarse y producir páginas inestables bajo escrituras?",
    "options": [
      "OFFSET ordena aleatoriamente",
      "Debe recorrer/descartar muchas filas y los desplazamientos cambian; keyset pagination usa una clave ordenada estable",
      "LIMIT bloquea toda la tabla",
      "OFFSET solo admite valores menores de 1000"
    ],
    "correctIndex": 1,
    "explanation": "La paginación por cursor, por ejemplo WHERE (ts,id)>(?,?) ORDER BY ts,id, escala y conserva mejor la continuidad."
  },
  {
    "id": "adv-sql-026",
    "category": "sql",
    "topic": "Orden determinista",
    "question": "¿ORDER BY score DESC garantiza un orden repetible si varias filas comparten score?",
    "options": [
      "Sí, siempre por clave primaria implícita",
      "No; debe añadirse un desempate único, por ejemplo ORDER BY score DESC, id",
      "Sí, pero solo con LIMIT",
      "No se puede ordenar empates"
    ],
    "correctIndex": 1,
    "explanation": "El SQL no promete el orden relativo de peers; una clave única crea orden total."
  },
  {
    "id": "adv-sql-027",
    "category": "sql",
    "topic": "UPSERT",
    "question": "¿Qué riesgo general existe en implementar upsert como SELECT de existencia seguido de INSERT/UPDATE?",
    "options": [
      "SELECT confirma la transacción",
      "Hay una carrera TOCTOU; debe usarse operación atómica del motor y una restricción UNIQUE",
      "UPDATE no admite WHERE",
      "Solo falla si hay NULL"
    ],
    "correctIndex": 1,
    "explanation": "Dos sesiones pueden observar ausencia. La unicidad en la BD y MERGE/ON CONFLICT equivalente deben arbitrar la concurrencia."
  },
  {
    "id": "adv-sql-028",
    "category": "sql",
    "topic": "Seguridad SQL",
    "question": "¿Pueden los parámetros preparados sustituir dinámicamente un nombre de tabla o una dirección ASC/DESC?",
    "options": [
      "Sí, cualquier token SQL es parametrizable",
      "No; los parámetros representan valores. Los identificadores/keywords dinámicos requieren allowlist y composición controlada",
      "Solo en DELETE",
      "Sí si se escapan con comillas simples"
    ],
    "correctIndex": 1,
    "explanation": "Un placeholder no cambia la gramática. Las partes estructurales deben elegirse desde opciones confiables."
  },
  {
    "id": "adv-sql-029",
    "category": "sql",
    "topic": "Vistas materializadas",
    "question": "¿Qué diferencia esencial hay entre una vista ordinaria y una materializada?",
    "options": [
      "La ordinaria almacena filas y la materializada no",
      "La materializada persiste resultados y requiere refresco; la ordinaria normalmente ejecuta su consulta al usarse",
      "Ambas se refrescan en cada COMMIT por estándar",
      "La materializada no admite índices"
    ],
    "correctIndex": 1,
    "explanation": "Una materialización intercambia frescura y coste de mantenimiento por lecturas más rápidas; detalles de refresh son específicos del motor."
  },
  {
    "id": "adv-sql-030",
    "category": "sql",
    "topic": "Plan de ejecución",
    "question": "¿Por qué un EXPLAIN estimado puede diferir drásticamente de EXPLAIN ANALYZE?",
    "options": [
      "ANALYZE no ejecuta nada",
      "Estadísticas obsoletas, correlación de columnas o distribución sesgada pueden producir cardinalidades estimadas erróneas; ANALYZE mide ejecución real",
      "EXPLAIN usa otro lenguaje",
      "Los planes nunca cambian"
    ],
    "correctIndex": 1,
    "explanation": "Las decisiones del optimizador dependen de estimaciones. Comparar filas estimadas y reales ayuda a diagnosticar el plan, recordando que ANALYZE sí ejecuta."
  },
  {
    "id": "adv-pract-001",
    "category": "buenas-practicas",
    "topic": "SOLID — SRP",
    "question": "Una clase Invoice calcula impuestos, guarda en SQL y genera PDF. ¿Cuál refactor refleja mejor SRP?",
    "options": [
      "Dividirla por número de métodos",
      "Separar reglas de cálculo, persistencia y presentación porque cambian por actores/razones distintas",
      "Convertir todos los métodos en static",
      "Crear una interfaz por cada línea"
    ],
    "correctIndex": 1,
    "explanation": "SRP trata de razones de cambio, no de tamaño. Las tres políticas evolucionan independientemente."
  },
  {
    "id": "adv-pract-002",
    "category": "buenas-practicas",
    "topic": "SOLID — OCP",
    "question": "¿Qué diseño suele cumplir mejor OCP al añadir medios de pago?",
    "options": [
      "Un switch central creciente por tipo",
      "Una abstracción PaymentProcessor con implementaciones registrables y contrato estable",
      "Copiar el servicio por cada pago",
      "Hacer públicas todas las variables"
    ],
    "correctIndex": 1,
    "explanation": "El nuevo comportamiento se agrega como implementación sin modificar el núcleo ya probado, siempre que la variación sea real."
  },
  {
    "id": "adv-pract-003",
    "category": "buenas-practicas",
    "topic": "SOLID — LSP",
    "question": "Un subtipo sobrescribe withdraw(amount) y rechaza importes que el tipo base permitía. ¿Qué regla de LSP vulnera?",
    "options": [
      "Puede fortalecer precondiciones libremente",
      "Fortalece una precondición y los clientes del contrato base dejan de funcionar",
      "Debilita una poscondición únicamente",
      "LSP solo trata de firmas"
    ],
    "correctIndex": 1,
    "explanation": "Un subtipo no debe exigir más que su base ni prometer menos; debe preservar invariantes y comportamiento observable."
  },
  {
    "id": "adv-pract-004",
    "category": "buenas-practicas",
    "topic": "SOLID — ISP",
    "question": "Un cliente solo imprime, pero depende de MultiFunctionDevice con print/scan/fax. ¿Qué coste señala ISP?",
    "options": [
      "Más velocidad",
      "Acoplamiento a métodos irrelevantes y cambios que fuerzan recompilar/adaptar clientes",
      "Falta de herencia múltiple",
      "Demasiados objetos runtime necesariamente"
    ],
    "correctIndex": 1,
    "explanation": "Interfaces enfocadas en roles permiten que cada cliente dependa solo de capacidades usadas."
  },
  {
    "id": "adv-pract-005",
    "category": "buenas-practicas",
    "topic": "SOLID — DIP",
    "question": "¿Cuál aplicación de DIP es más precisa?",
    "options": [
      "Todo debe tener interfaz aunque exista una sola política estable",
      "La política de negocio depende de un puerto; adaptadores de SQL/HTTP implementan ese puerto",
      "Las capas bajas importan las capas altas y también al revés",
      "Usar un contenedor DI basta aunque se instancien concretos dentro del dominio"
    ],
    "correctIndex": 1,
    "explanation": "DIP orienta las dependencias hacia abstracciones definidas alrededor de la política; un framework de inyección no arregla acoplamiento conceptual."
  },
  {
    "id": "adv-pract-006",
    "category": "buenas-practicas",
    "topic": "DRY",
    "question": "Dos validaciones tienen hoy el mismo código pero representan reglas de negocio distintas y podrían divergir. ¿Qué recomienda una lectura madura de DRY?",
    "options": [
      "Unificarlas siempre por similitud textual",
      "No abstraer coincidencias accidentales; DRY elimina duplicación de conocimiento, no toda repetición sintáctica",
      "Usar reflexión para compartirlas",
      "Eliminar una regla"
    ],
    "correctIndex": 1,
    "explanation": "Una abstracción equivocada acopla conceptos independientes; a veces una pequeña duplicación es más honesta."
  },
  {
    "id": "adv-pract-007",
    "category": "buenas-practicas",
    "topic": "KISS",
    "question": "¿KISS implica elegir siempre el código con menos líneas?",
    "options": [
      "Sí",
      "No; busca menor complejidad esencial para comprender y cambiar, aunque una solución explícita pueda ocupar más líneas",
      "Solo aplica a algoritmos",
      "Prohíbe patrones"
    ],
    "correctIndex": 1,
    "explanation": "Concisión extrema puede ocultar intención. La simplicidad se evalúa por el modelo y sus costes, no por LOC."
  },
  {
    "id": "adv-pract-008",
    "category": "buenas-practicas",
    "topic": "YAGNI",
    "question": "¿Cuál decisión representa YAGNI sin sacrificar calidad?",
    "options": [
      "No escribir tests hasta producción",
      "Implementar la necesidad actual con diseño refactorizable, sin construir extensiones especulativas",
      "Ignorar requisitos no funcionales actuales",
      "Evitar cualquier abstracción"
    ],
    "correctIndex": 1,
    "explanation": "YAGNI rechaza funcionalidad hipotética, no pruebas, seguridad ni una estructura sostenible para requisitos presentes."
  },
  {
    "id": "adv-pract-009",
    "category": "buenas-practicas",
    "topic": "Ley de Demeter",
    "question": "¿Cuál es el problema principal de order.getCustomer().getAddress().getCountry().getTaxRate()?",
    "options": [
      "Usa demasiados puntos por una regla sintáctica absoluta",
      "El cliente conoce y depende de una estructura interna profunda; un método orientado a intención reduce el acoplamiento",
      "Los getters son siempre ilegales",
      "Solo afecta rendimiento"
    ],
    "correctIndex": 1,
    "explanation": "LoD limita conocimiento de colaboradores. No toda cadena es mala (p. ej. fluent APIs), importa el acoplamiento estructural."
  },
  {
    "id": "adv-pract-010",
    "category": "buenas-practicas",
    "topic": "GRASP — Experto",
    "question": "¿Quién debería calcular el total de una Order según Information Expert?",
    "options": [
      "Un controlador UI porque inicia el caso",
      "El objeto que posee líneas, cantidades y precios, salvo que la política pertenezca explícitamente a otro servicio de dominio",
      "Un singleton global",
      "La base de datos obligatoriamente"
    ],
    "correctIndex": 1,
    "explanation": "La responsabilidad se asigna donde está la información necesaria, equilibrándola con cohesión y reglas externas."
  },
  {
    "id": "adv-pract-011",
    "category": "buenas-practicas",
    "topic": "GRASP — Creador",
    "question": "Según Creator, ¿cuándo es buen candidato Cart para crear CartLine?",
    "options": [
      "Nunca; solo factories pueden crear",
      "Cuando Cart agrega, contiene y registra CartLine y dispone de datos de inicialización",
      "Cuando CartLine crea Cart",
      "Solo si Cart es abstract"
    ],
    "correctIndex": 1,
    "explanation": "Creator reduce dependencias al asignar creación a quien ya tiene una relación estrecha con el objeto creado."
  },
  {
    "id": "adv-pract-012",
    "category": "buenas-practicas",
    "topic": "GRASP — Controlador",
    "question": "¿Qué controlador GRASP conviene para PlaceOrder?",
    "options": [
      "El botón de la interfaz con toda la lógica",
      "Un objeto no UI que represente el sistema/caso de uso y coordine colaboradores",
      "Cada entidad debe conocer HTTP",
      "Una clase Utils estática"
    ],
    "correctIndex": 1,
    "explanation": "El controlador recibe el evento del sistema y delega; no debe convertirse en un objeto dios."
  },
  {
    "id": "adv-pract-013",
    "category": "buenas-practicas",
    "topic": "GRASP — Fabricación pura",
    "question": "¿Por qué OrderRepository puede ser una Pure Fabrication?",
    "options": [
      "Porque modela un objeto físico del dominio",
      "Porque no es concepto del dominio, pero concentra persistencia para alta cohesión y bajo acoplamiento",
      "Porque debe heredar de Order",
      "Porque evita cualquier dependencia"
    ],
    "correctIndex": 1,
    "explanation": "Una fabricación pura introduce una clase de diseño útil aunque no corresponda a un concepto del mundo real."
  },
  {
    "id": "adv-pract-014",
    "category": "buenas-practicas",
    "topic": "GRASP — Variaciones protegidas",
    "question": "¿Cómo protege un sistema ante cambios de proveedor de correo?",
    "options": [
      "Distribuyendo llamadas SDK por todo el dominio",
      "Encapsulando el punto variable detrás de un puerto estable y adaptadores",
      "Copiando el SDK al repositorio",
      "Usando variables globales"
    ],
    "correctIndex": 1,
    "explanation": "Protected Variations identifica puntos de inestabilidad y coloca una interfaz estable alrededor."
  },
  {
    "id": "adv-pract-015",
    "category": "buenas-practicas",
    "topic": "Clean Code",
    "question": "Un método booleano se llama checkUser. ¿Qué mejora aporta isEligibleForRenewal?",
    "options": [
      "Ninguna, los nombres no son parte del diseño",
      "Revela intención, naturaleza booleana y decisión de dominio; reduce necesidad de comentarios",
      "Hace el método más rápido",
      "Garantiza corrección"
    ],
    "correctIndex": 1,
    "explanation": "Un nombre preciso comunica propósito y nivel de abstracción; no sustituye tests, pero disminuye carga cognitiva."
  },
  {
    "id": "adv-pract-016",
    "category": "buenas-practicas",
    "topic": "Clean Code",
    "question": "¿Qué indica que un comentario explica 'qué hace' un bloque complejo línea por línea?",
    "options": [
      "El comentario siempre es la solución final",
      "Puede ser señal de que conviene extraer funciones y nombres que expresen la intención; comentarios útiles explican contexto o porqué no evidente",
      "Debe eliminarse sin refactor",
      "Hay que duplicarlo en tests"
    ],
    "correctIndex": 1,
    "explanation": "Los comentarios envejecen separados del código. La intención estable suele vivir mejor en estructura y nombres."
  },
  {
    "id": "adv-pract-017",
    "category": "buenas-practicas",
    "topic": "Code smells",
    "question": "¿Qué problema sugiere una larga lista de parámetros primitivos repetida entre métodos?",
    "options": [
      "Primitive obsession / data clumps; quizá falta un value object con invariantes",
      "Demasiada encapsulación",
      "Falta un singleton",
      "Violación de concurrencia"
    ],
    "correctIndex": 0,
    "explanation": "Agrupar conceptos relacionados como Money, Address o DateRange hace explícitas invariantes y reduce errores de orden."
  },
  {
    "id": "adv-pract-018",
    "category": "buenas-practicas",
    "topic": "Code smells",
    "question": "¿Qué es feature envy?",
    "options": [
      "Una clase con muchos constructores",
      "Un método que consulta más datos de otra clase que de la propia, sugiriendo responsabilidad mal ubicada",
      "Un método demasiado probado",
      "Uso de composición"
    ],
    "correctIndex": 1,
    "explanation": "Mover el comportamiento hacia el experto en información suele mejorar cohesión y reducir acoplamiento."
  },
  {
    "id": "adv-pract-019",
    "category": "buenas-practicas",
    "topic": "Patrones — Strategy",
    "question": "¿Cuándo Strategy es preferible a un switch por tipo?",
    "options": [
      "Siempre, incluso con dos casos estables triviales",
      "Cuando algoritmos varían independientemente, se seleccionan/intercambian y cada uno merece pruebas/evolución propia",
      "Cuando se necesita una única instancia global",
      "Para construir objetos paso a paso"
    ],
    "correctIndex": 1,
    "explanation": "Strategy encapsula familias de comportamiento; introducirlo sin una variación real puede ser sobreingeniería."
  },
  {
    "id": "adv-pract-020",
    "category": "buenas-practicas",
    "topic": "Patrones — Decorator",
    "question": "¿Qué distingue Decorator de heredar subclases por cada combinación de funcionalidades?",
    "options": [
      "Decorator compone responsabilidades envolviendo el mismo contrato en runtime",
      "Decorator crea una sola instancia global",
      "Decorator traduce interfaces incompatibles",
      "Decorator coordina eventos entre colegas"
    ],
    "correctIndex": 0,
    "explanation": "La composición de decoradores evita una explosión combinatoria de subclases y permite apilar comportamiento."
  },
  {
    "id": "adv-pract-021",
    "category": "buenas-practicas",
    "topic": "Patrones — Adapter",
    "question": "Un servicio espera PaymentPort pero un SDK expone chargeCents. ¿Qué patrón traduce entre ambos contratos?",
    "options": [
      "Observer",
      "Adapter",
      "Memento",
      "Template Method"
    ],
    "correctIndex": 1,
    "explanation": "Adapter convierte la interfaz de un colaborador existente en la que el cliente necesita."
  },
  {
    "id": "adv-pract-022",
    "category": "buenas-practicas",
    "topic": "Patrones — Observer",
    "question": "¿Qué riesgo operativo común introduce Observer con suscripciones de larga vida?",
    "options": [
      "No permite múltiples observadores",
      "Fugas de memoria o eventos duplicados si no se cancela la suscripción y semántica compleja ante fallos/orden",
      "Elimina desacoplamiento",
      "Obliga a usar threads"
    ],
    "correctIndex": 1,
    "explanation": "La relación queda indirecta pero sigue existiendo; lifecycle, backpressure, errores y orden deben diseñarse."
  },
  {
    "id": "adv-pract-023",
    "category": "buenas-practicas",
    "topic": "Patrones — Singleton",
    "question": "¿Cuál crítica sólida aplica a un Singleton global mutable?",
    "options": [
      "Java no puede implementarlo",
      "Oculta dependencias, comparte estado entre tests y complica concurrencia; unicidad de proceso quizá ni coincide con la necesidad distribuida",
      "Siempre consume demasiada memoria",
      "No admite métodos"
    ],
    "correctIndex": 1,
    "explanation": "Una única instancia administrada por composición/DI puede ser válida; el acceso global y estado mutable son el problema habitual."
  },
  {
    "id": "adv-pract-024",
    "category": "buenas-practicas",
    "topic": "Arquitectura",
    "question": "¿Qué significa alta cohesión en un módulo?",
    "options": [
      "Que depende de muchos módulos",
      "Que sus responsabilidades están estrechamente relacionadas alrededor de un propósito claro",
      "Que tiene muchas líneas",
      "Que no tiene interfaces"
    ],
    "correctIndex": 1,
    "explanation": "La cohesión facilita comprender qué pertenece al módulo; normalmente se busca junto a bajo acoplamiento."
  },
  {
    "id": "adv-pract-025",
    "category": "buenas-practicas",
    "topic": "Arquitectura",
    "question": "¿Qué métrica conceptual importa al evaluar acoplamiento?",
    "options": [
      "Solo cantidad de imports",
      "Número, dirección, estabilidad y naturaleza de las dependencias, incluyendo contratos y conocimiento compartido",
      "Solo número de clases",
      "Solo tiempo de compilación"
    ],
    "correctIndex": 1,
    "explanation": "Dos dependencias pueden tener costes muy distintos; depender de una abstracción estable no equivale a conocer detalles volátiles."
  },
  {
    "id": "adv-pract-026",
    "category": "buenas-practicas",
    "topic": "Refactoring",
    "question": "¿Qué prerrequisito reduce más el riesgo antes de un refactor que preserva comportamiento?",
    "options": [
      "Reescribir y probar al final",
      "Una red de tests de caracterización relevante y cambios pequeños verificables",
      "Cambiar API y comportamiento a la vez",
      "Eliminar casos límite"
    ],
    "correctIndex": 1,
    "explanation": "Los tests observan el contrato existente y los pasos pequeños localizan regresiones; refactor no debería cambiar conducta observable."
  },
  {
    "id": "adv-pract-027",
    "category": "buenas-practicas",
    "topic": "API design",
    "question": "¿Por qué devolver una colección interna mutable rompe encapsulación?",
    "options": [
      "Porque List es lenta",
      "El cliente puede violar invariantes sin pasar por operaciones del agregado; conviene copia/vista inmutable según semántica",
      "Porque impide GC",
      "Porque todos los getters son malos"
    ],
    "correctIndex": 1,
    "explanation": "Encapsular no es solo private; también se controla la mutabilidad transitiva expuesta."
  },
  {
    "id": "adv-pract-028",
    "category": "buenas-practicas",
    "topic": "Errores",
    "question": "¿Qué problema tiene capturar Exception, registrar y continuar devolviendo null?",
    "options": [
      "Ninguno si hay log",
      "Oculta el fallo, pierde semántica y desplaza un error claro hacia un NPE distante; debe recuperarse realmente o propagar contexto",
      "Exception no puede capturarse",
      "null siempre representa ausencia válida"
    ],
    "correctIndex": 1,
    "explanation": "Solo se captura donde existe una estrategia de recuperación. Traducir excepciones debe preservar causa y contrato."
  },
  {
    "id": "adv-pract-029",
    "category": "buenas-practicas",
    "topic": "Observabilidad",
    "question": "¿Qué hace a un log útil sin filtrar secretos?",
    "options": [
      "Concatenar objetos completos y tokens",
      "Evento estructurado con contexto/correlation id, resultado y campos permitidos; redactar credenciales y PII",
      "Registrar cada variable local",
      "Usar solo mensajes genéricos sin identificadores"
    ],
    "correctIndex": 1,
    "explanation": "La observabilidad requiere contexto consultable, pero minimización y redacción evitan convertir logs en una fuga."
  },
  {
    "id": "adv-pract-030",
    "category": "buenas-practicas",
    "topic": "Compatibilidad",
    "question": "En una API pública, ¿qué cambio suele ser más compatible?",
    "options": [
      "Renombrar un campo requerido",
      "Añadir un campo opcional que consumidores tolerantes puedan ignorar",
      "Cambiar tipo number a object sin versión",
      "Reutilizar un código de error con otro significado"
    ],
    "correctIndex": 1,
    "explanation": "La evolución aditiva suele ser más segura, pero debe probarse contra consumidores reales y contratos de serialización."
  },
  {
    "id": "adv-sec-001",
    "category": "seguridad",
    "topic": "SQL Injection",
    "question": "¿Cuál defensa primaria evita que un valor de usuario altere la estructura SQL?",
    "options": [
      "Escapar manualmente comillas en toda entrada",
      "Prepared statements con parámetros para valores y allowlist para partes estructurales",
      "Codificar Base64",
      "Ocultar errores de SQL únicamente"
    ],
    "correctIndex": 1,
    "explanation": "La parametrización separa código y datos. Identificadores u orden dinámicos no son valores y deben mapearse desde una lista permitida."
  },
  {
    "id": "adv-sec-002",
    "category": "seguridad",
    "topic": "Autorización",
    "question": "Un endpoint /invoice/{id} valida que el usuario esté autenticado pero no que sea dueño de la factura. ¿Qué vulnerabilidad es?",
    "options": [
      "CSRF exclusivamente",
      "Broken object level authorization/IDOR",
      "SQL truncation",
      "Hash collision"
    ],
    "correctIndex": 1,
    "explanation": "Conocer o adivinar un identificador no otorga acceso; la autorización se verifica por objeto en el servidor."
  },
  {
    "id": "adv-sec-003",
    "category": "seguridad",
    "topic": "Autenticación",
    "question": "¿Cómo deben almacenarse contraseñas?",
    "options": [
      "Cifradas con una clave global reversible",
      "Con una función adaptativa específica para contraseñas, salt único y coste calibrado; opcional pepper protegido",
      "SHA-256 sin salt",
      "Base64 y TLS"
    ],
    "correctIndex": 1,
    "explanation": "Argon2id, scrypt, bcrypt o PBKDF2 ralentizan ataques offline. Las contraseñas no necesitan recuperarse."
  },
  {
    "id": "adv-sec-004",
    "category": "seguridad",
    "topic": "Sesiones",
    "question": "¿Qué atributos protegen una cookie de sesión web?",
    "options": [
      "HttpOnly, Secure y SameSite adecuado, además de alcance mínimo",
      "Public, Cacheable y CrossDomain",
      "Solo Max-Age largo",
      "CORS:*"
    ],
    "correctIndex": 0,
    "explanation": "HttpOnly reduce robo por JS, Secure exige HTTPS y SameSite ayuda contra CSRF; Path/Domain y vida deben minimizarse."
  },
  {
    "id": "adv-sec-005",
    "category": "seguridad",
    "topic": "CSRF",
    "question": "¿Por qué SameSite=Lax no sustituye siempre un token CSRF?",
    "options": [
      "Porque SameSite cifra poco",
      "Hay flujos, navegadores y requisitos cross-site donde se envían cookies; operaciones sensibles necesitan defensa acorde al modelo",
      "Porque tokens solo sirven para GET",
      "Porque CSRF no afecta cookies"
    ],
    "correctIndex": 1,
    "explanation": "SameSite es defensa en profundidad. Tokens impredecibles u origen verificado siguen siendo relevantes según arquitectura."
  },
  {
    "id": "adv-sec-006",
    "category": "seguridad",
    "topic": "XSS",
    "question": "¿Cuál defensa es más correcta al insertar datos no confiables en HTML?",
    "options": [
      "Una función de escape universal para cualquier contexto",
      "Codificación contextual según HTML, atributo, URL o JavaScript, más plantillas seguras y CSP como defensa adicional",
      "Eliminar solo <script>",
      "Usar HTTPS"
    ],
    "correctIndex": 1,
    "explanation": "Los contextos tienen gramáticas distintas; sanitización se reserva para HTML permitido y CSP no corrige una salida insegura."
  },
  {
    "id": "adv-sec-007",
    "category": "seguridad",
    "topic": "CORS",
    "question": "¿Qué afirmación sobre CORS es correcta?",
    "options": [
      "Es un control de autenticación del servidor",
      "Es una política del navegador sobre lectura cross-origin; no impide que clientes no navegador llamen al API",
      "Cifra respuestas",
      "Evita CSRF en toda configuración"
    ],
    "correctIndex": 1,
    "explanation": "El servidor debe autenticar y autorizar independientemente; CORS no es un firewall."
  },
  {
    "id": "adv-sec-008",
    "category": "seguridad",
    "topic": "JWT",
    "question": "¿Qué debe hacer un verificador JWT seguro respecto al algoritmo?",
    "options": [
      "Confiar en cualquier alg del token",
      "Fijar algoritmos esperados y validar firma, issuer, audience, expiración y uso de clave",
      "Decodificar Base64 equivale a verificar",
      "Aceptar alg=none en redes internas"
    ],
    "correctIndex": 1,
    "explanation": "Los claims no son confiables hasta verificar integridad y contexto. La configuración evita confusión de algoritmo/clave."
  },
  {
    "id": "adv-sec-009",
    "category": "seguridad",
    "topic": "JWT",
    "question": "¿Qué dificultad introduce un access token JWT de larga duración?",
    "options": [
      "No se puede firmar",
      "La revocación inmediata es compleja; convienen vidas cortas, rotación y controles de sesión/refresh",
      "No admite claims",
      "Solo funciona sobre HTTP"
    ],
    "correctIndex": 1,
    "explanation": "Un token válido suele aceptarse sin consulta central; reducir su ventana limita daño por robo."
  },
  {
    "id": "adv-sec-010",
    "category": "seguridad",
    "topic": "Criptografía",
    "question": "¿Por qué AES-GCM requiere nonce único por clave?",
    "options": [
      "Para comprimir mejor",
      "Reutilizar nonce puede destruir confidencialidad e integridad; debe gestionarse sin colisiones",
      "Para que el ciphertext sea determinista",
      "Porque el nonce es la contraseña"
    ],
    "correctIndex": 1,
    "explanation": "GCM es AEAD y su seguridad depende críticamente de no repetir nonce con la misma clave."
  },
  {
    "id": "adv-sec-011",
    "category": "seguridad",
    "topic": "Criptografía",
    "question": "¿Qué propiedad aporta una firma digital que un hash sin clave no aporta?",
    "options": [
      "Confidencialidad",
      "Autenticidad e integridad verificables respecto a la clave privada",
      "Compresión",
      "Anonimato garantizado"
    ],
    "correctIndex": 1,
    "explanation": "Cualquiera puede recalcular un hash; solo quien controla la clave privada puede producir una firma válida."
  },
  {
    "id": "adv-sec-012",
    "category": "seguridad",
    "topic": "TLS",
    "question": "¿Qué error invalida gran parte de TLS en un cliente Java?",
    "options": [
      "Usar TLS 1.3",
      "Aceptar cualquier certificado o desactivar hostname verification",
      "Usar un truststore",
      "Cerrar sockets"
    ],
    "correctIndex": 1,
    "explanation": "Sin validar cadena y nombre, un atacante puede presentar su propio certificado y realizar MITM."
  },
  {
    "id": "adv-sec-013",
    "category": "seguridad",
    "topic": "Secretos",
    "question": "¿Cuál es la práctica más segura para secretos de producción?",
    "options": [
      "Hardcodearlos y ofuscar el JAR",
      "Gestor de secretos, identidad de workload, rotación, alcance mínimo y evitar logs/repositorio",
      "Variables en un archivo versionado",
      "Compartir una credencial por todos los servicios"
    ],
    "correctIndex": 1,
    "explanation": "La gestión central permite auditoría y rotación; la aplicación debe minimizar tiempo y superficie de exposición."
  },
  {
    "id": "adv-sec-014",
    "category": "seguridad",
    "topic": "SSRF",
    "question": "Un servidor descarga una URL proporcionada por el usuario. ¿Qué control reduce SSRF?",
    "options": [
      "Bloquear solo la cadena localhost",
      "Allowlist de destinos/esquemas, resolver y validar IP, bloquear rangos internos/metadata y controlar redirecciones/egress",
      "Codificar URL en Base64",
      "Añadir CORS"
    ],
    "correctIndex": 1,
    "explanation": "DNS rebinding, notaciones alternativas y redirects hacen insuficiente un filtro textual simple."
  },
  {
    "id": "adv-sec-015",
    "category": "seguridad",
    "topic": "Path traversal",
    "question": "¿Cómo defender una descarga /files?name=...?",
    "options": [
      "Eliminar ../ una vez",
      "Resolver contra un directorio base, normalizar/canonicalizar, comprobar que permanece dentro y usar identificadores indirectos",
      "Permitir rutas absolutas si existen",
      "Reemplazar slash por espacio únicamente"
    ],
    "correctIndex": 1,
    "explanation": "La verificación posterior a la resolución evita escapes por secuencias, enlaces o representaciones inesperadas; también se aplican permisos mínimos."
  },
  {
    "id": "adv-sec-016",
    "category": "seguridad",
    "topic": "Deserialización",
    "question": "¿Por qué deserializar Java nativo desde entrada no confiable es peligroso?",
    "options": [
      "Porque siempre pierde tipos",
      "El grafo puede activar gadgets y efectos durante deserialización; preferir formatos simples con DTO/allowlist estricta",
      "Porque JSON ejecuta bytecode automáticamente",
      "Solo consume CPU"
    ],
    "correctIndex": 1,
    "explanation": "ObjectInputStream sobre datos hostiles ha habilitado cadenas de gadgets; validar después puede ser demasiado tarde."
  },
  {
    "id": "adv-sec-017",
    "category": "seguridad",
    "topic": "XXE",
    "question": "¿Qué evita XXE al procesar XML no confiable?",
    "options": [
      "Habilitar DTD para validar",
      "Deshabilitar DTD y entidades externas, usar parser endurecido y límites de recursos",
      "Convertir XML a String primero",
      "Usar XPath"
    ],
    "correctIndex": 1,
    "explanation": "Entidades externas pueden leer archivos o hacer solicitudes; también existen ataques de expansión que agotan recursos."
  },
  {
    "id": "adv-sec-018",
    "category": "seguridad",
    "topic": "Subida de archivos",
    "question": "¿Qué controles son necesarios al aceptar archivos?",
    "options": [
      "Confiar en Content-Type del cliente",
      "Allowlist de tipo real, límites, nombre generado, almacenamiento fuera del webroot, escaneo según riesgo y autorización",
      "Guardar con el nombre original en /public",
      "Ejecutarlo para validar"
    ],
    "correctIndex": 1,
    "explanation": "Extensión y MIME declarados son manipulables; se debe reducir impacto incluso si la detección falla."
  },
  {
    "id": "adv-sec-019",
    "category": "seguridad",
    "topic": "Logging",
    "question": "¿Qué riesgo tiene log.info(\"Login \" + username) con entrada cruda?",
    "options": [
      "Solo rendimiento",
      "Log injection mediante saltos/control y posible exposición; usar logging estructurado, normalización y minimización",
      "SQL injection directa siempre",
      "Ninguno si el archivo es privado"
    ],
    "correctIndex": 1,
    "explanation": "Los logs son una interfaz de seguridad y auditoría; entradas manipuladas pueden falsificar eventos o atacar consumidores."
  },
  {
    "id": "adv-sec-020",
    "category": "seguridad",
    "topic": "Least privilege",
    "question": "¿Con qué credenciales debe conectarse una aplicación a la BD?",
    "options": [
      "DBA para evitar errores",
      "Una identidad dedicada con solo permisos requeridos, separada por servicio/entorno",
      "La cuenta personal del desarrollador",
      "Una cuenta compartida con todos los esquemas"
    ],
    "correctIndex": 1,
    "explanation": "El mínimo privilegio limita el radio de impacto de inyección o compromiso y mejora trazabilidad."
  },
  {
    "id": "adv-sec-021",
    "category": "seguridad",
    "topic": "Supply chain",
    "question": "¿Qué combinación mejora seguridad de dependencias?",
    "options": [
      "Usar siempre latest sin lockfile",
      "Versiones reproducibles, inventario/SBOM, escaneo, procedencia/verificación y parcheo gobernado",
      "Copiar binarios de foros",
      "Ignorar transitivas"
    ],
    "correctIndex": 1,
    "explanation": "No existe un único control; se necesita saber qué se ejecuta, de dónde vino y responder a vulnerabilidades."
  },
  {
    "id": "adv-sec-022",
    "category": "seguridad",
    "topic": "Rate limiting",
    "question": "¿Por qué limitar solo por IP puede ser insuficiente en login?",
    "options": [
      "Las IP no existen tras TLS",
      "Atacantes distribuidos evaden el límite y NAT comparte usuarios; combinar cuenta, IP, riesgo y backoff sin facilitar DoS de bloqueo",
      "Porque rate limiting solo aplica a SQL",
      "Porque CAPTCHA reemplaza autenticación"
    ],
    "correctIndex": 1,
    "explanation": "Los controles deben equilibrar credential stuffing, enumeración y disponibilidad de usuarios legítimos."
  },
  {
    "id": "adv-sec-023",
    "category": "seguridad",
    "topic": "Errores",
    "question": "¿Qué debe devolver un API ante un fallo SQL interno?",
    "options": [
      "Stack trace, query y parámetros",
      "Mensaje externo genérico con correlation id; detalles saneados en logs protegidos",
      "La contraseña de conexión para soporte",
      "Siempre HTTP 200"
    ],
    "correctIndex": 1,
    "explanation": "La respuesta no debe revelar estructura ni secretos, pero debe conservar trazabilidad operativa."
  },
  {
    "id": "adv-sec-024",
    "category": "seguridad",
    "topic": "Mass assignment",
    "question": "Un endpoint enlaza JSON directamente a UserEntity, incluyendo role e isAdmin. ¿Qué riesgo existe?",
    "options": [
      "Clickjacking",
      "Mass assignment/over-posting; usar DTO con campos permitidos y autorización explícita",
      "Race condition de GC",
      "Hash flooding únicamente"
    ],
    "correctIndex": 1,
    "explanation": "El cliente puede establecer propiedades sensibles que la interfaz no muestra; ocultarlas en UI no es control."
  },
  {
    "id": "adv-sec-025",
    "category": "seguridad",
    "topic": "Open redirect",
    "question": "¿Cómo validar un parámetro returnUrl tras login?",
    "options": [
      "Aceptar cualquier URL HTTPS",
      "Usar rutas relativas o allowlist exacta de destinos confiables; evitar validación por contains/sufijo débil",
      "Codificarla en Base64",
      "Añadir un token JWT sin validar destino"
    ],
    "correctIndex": 1,
    "explanation": "Un redirect abierto facilita phishing y fuga de tokens; parsers de URL y reglas exactas evitan bypass."
  },
  {
    "id": "adv-sec-026",
    "category": "seguridad",
    "topic": "Cache",
    "question": "¿Qué riesgo existe si una respuesta autenticada personalizada se almacena en caché pública sin variar correctamente?",
    "options": [
      "Solo datos obsoletos",
      "Puede servirse contenido de un usuario a otro; deben configurarse Cache-Control, claves de caché y Vary apropiados",
      "El navegador borra cookies",
      "CORS lo corrige"
    ],
    "correctIndex": 1,
    "explanation": "La caché forma parte del límite de autorización; respuestas sensibles suelen requerir private/no-store según caso."
  },
  {
    "id": "adv-sec-027",
    "category": "seguridad",
    "topic": "Race conditions",
    "question": "Un cupón de un solo uso se valida y luego se marca usado en dos sentencias sin transacción/constraint. ¿Qué falla?",
    "options": [
      "Confidencialidad",
      "Atomicidad: dos solicitudes pueden consumirlo; usar update condicional/lock y restricción dentro de transacción",
      "Disponibilidad de DNS",
      "Validación de JWT"
    ],
    "correctIndex": 1,
    "explanation": "La autorización/regla debe mantenerse atómicamente en el sistema que arbitra concurrencia."
  },
  {
    "id": "adv-sec-028",
    "category": "seguridad",
    "topic": "MFA",
    "question": "¿Qué mecanismo MFA es generalmente más resistente a phishing?",
    "options": [
      "Código SMS reutilizable",
      "WebAuthn/FIDO2 ligado al origen con criptografía asimétrica",
      "Pregunta secreta",
      "Código enviado al mismo email comprometido"
    ],
    "correctIndex": 1,
    "explanation": "El autenticador verifica el origen y no entrega un secreto reutilizable al sitio falso."
  },
  {
    "id": "adv-sec-029",
    "category": "seguridad",
    "topic": "Threat modeling",
    "question": "¿Cuándo aporta más valor un threat model?",
    "options": [
      "Solo después de un incidente",
      "Durante diseño y ante cambios de arquitectura, identificando activos, límites de confianza, amenazas y mitigaciones",
      "Solo al redactar política legal",
      "Después de desplegar y nunca actualizarlo"
    ],
    "correctIndex": 1,
    "explanation": "Modelar temprano permite cambiar arquitectura a bajo coste y debe evolucionar con el sistema."
  },
  {
    "id": "adv-sec-030",
    "category": "seguridad",
    "topic": "Fail secure",
    "question": "Si el servicio de autorización no responde, ¿qué comportamiento suele ser seguro para una operación sensible?",
    "options": [
      "Permitir por disponibilidad",
      "Denegar de forma controlada, salvo una política explícita y analizada; registrar sin filtrar secretos",
      "Asignar rol admin temporal",
      "Confiar en un parámetro del cliente"
    ],
    "correctIndex": 1,
    "explanation": "Fail closed evita que un fallo de dependencia se convierta en bypass, aunque disponibilidad y emergencias requieren diseño específico."
  },
  {
    "id": "adv-test-001",
    "category": "testing",
    "topic": "Diseño de tests",
    "question": "¿Qué hace valioso a un test más allá de cobertura?",
    "options": [
      "Que ejecuta muchas líneas sin assertions",
      "Que detecta regresiones relevantes, es determinista, legible y falla por una razón diagnóstica",
      "Que usa muchos mocks",
      "Que refleja cada método privado"
    ],
    "correctIndex": 1,
    "explanation": "La cobertura es señal incompleta; un test debe observar comportamiento significativo con bajo coste de mantenimiento."
  },
  {
    "id": "adv-test-002",
    "category": "testing",
    "topic": "Unit vs integration",
    "question": "Un test usa la clase real Repository pero reemplaza la BD por mock. ¿Qué demuestra?",
    "options": [
      "Compatibilidad real con SQL y esquema",
      "La colaboración programada, pero no mapeo, dialecto, constraints ni transacciones reales",
      "Rendimiento de producción",
      "Que no existen deadlocks"
    ],
    "correctIndex": 1,
    "explanation": "Es útil como test unitario del servicio, no sustituye pruebas de integración con el motor real."
  },
  {
    "id": "adv-test-003",
    "category": "testing",
    "topic": "Test doubles",
    "question": "¿Qué diferencia a un stub de un mock en sentido estricto?",
    "options": [
      "El stub proporciona respuestas; el mock además verifica interacciones esperadas",
      "El mock usa clases reales y el stub no",
      "Son términos definidos igual por JVM",
      "El stub siempre llama a red"
    ],
    "correctIndex": 0,
    "explanation": "Ambos son doubles, pero un mock orienta el test a comportamiento/interacciones; el abuso acopla a implementación."
  },
  {
    "id": "adv-test-004",
    "category": "testing",
    "topic": "Mockito",
    "question": "¿Por qué verificar verify(repo).save(entityExacta) puede volver frágil un test?",
    "options": [
      "verify nunca funciona",
      "Acopla a detalles de construcción/interacción; conviene verificar efecto o capturar solo atributos relevantes cuando esa interacción es contrato",
      "Porque save es privado",
      "Porque Mockito confirma la BD"
    ],
    "correctIndex": 1,
    "explanation": "La interacción importa en fronteras, pero sobreespecificar pasos internos dificulta refactors inocuos."
  },
  {
    "id": "adv-test-005",
    "category": "testing",
    "topic": "TDD",
    "question": "¿Cuál es el ciclo TDD y su intención?",
    "options": [
      "Diseñar todo, implementar, añadir tests",
      "Red: test pequeño que falla; Green: mínimo para pasar; Refactor: mejorar conservando verde",
      "Mock, deploy, rollback",
      "Coverage, benchmark, release"
    ],
    "correctIndex": 1,
    "explanation": "El ciclo corto ofrece feedback de diseño y una red de regresión; 'mínimo' no significa código descuidado permanente."
  },
  {
    "id": "adv-test-006",
    "category": "testing",
    "topic": "BDD",
    "question": "¿Qué aporta Given-When-Then si se usa bien?",
    "options": [
      "Reemplaza assertions",
      "Estructura precondición, acción y resultado observable en lenguaje del dominio",
      "Obliga a Cucumber",
      "Hace unit tests end-to-end"
    ],
    "correctIndex": 1,
    "explanation": "Es una forma de comunicar escenarios; herramientas específicas son opcionales."
  },
  {
    "id": "adv-test-007",
    "category": "testing",
    "topic": "JUnit 5",
    "question": "Con @TestInstance(PER_CLASS), ¿qué cambia principalmente?",
    "options": [
      "Se crea instancia por método",
      "Se comparte una instancia entre métodos y @BeforeAll puede ser no static; estado mutable puede filtrar entre tests",
      "Los tests se ordenan automáticamente",
      "Se ejecuta siempre en paralelo"
    ],
    "correctIndex": 1,
    "explanation": "El lifecycle compartido puede ser útil, pero exige evitar dependencias de orden y limpiar estado."
  },
  {
    "id": "adv-test-008",
    "category": "testing",
    "topic": "JUnit 5",
    "question": "¿Qué prueba assertAll?",
    "options": [
      "Detiene al primer fallo",
      "Ejecuta un grupo de assertions y reporta conjuntamente múltiples fallos",
      "Repite el test hasta pasar",
      "Convierte exceptions en éxito"
    ],
    "correctIndex": 1,
    "explanation": "Es útil para varias propiedades del mismo resultado; no debe mezclar escenarios independientes."
  },
  {
    "id": "adv-test-009",
    "category": "testing",
    "topic": "JUnit 5",
    "question": "Para verificar que una operación lanza exactamente IllegalArgumentException y no una subclase, ¿qué usar?",
    "options": [
      "assertThrows(Exception.class, ...)",
      "assertThrowsExactly(IllegalArgumentException.class, ...)",
      "assertDoesNotThrow",
      "fail únicamente"
    ],
    "correctIndex": 1,
    "explanation": "assertThrows acepta subtipos; assertThrowsExactly exige coincidencia exacta."
  },
  {
    "id": "adv-test-010",
    "category": "testing",
    "topic": "Tests parametrizados",
    "question": "¿Cuándo conviene @ParameterizedTest?",
    "options": [
      "Cuando varios casos comparten la misma regla y estructura, incluyendo límites y particiones",
      "Para ejecutar métodos privados",
      "Para sustituir todos los tests con un CSV enorme",
      "Solo con números"
    ],
    "correctIndex": 0,
    "explanation": "Reduce duplicación manteniendo cada caso visible; escenarios con comportamiento distinto merecen tests separados."
  },
  {
    "id": "adv-test-011",
    "category": "testing",
    "topic": "Propiedades",
    "question": "¿Qué diferencia a property-based testing de ejemplos parametrizados?",
    "options": [
      "Genera muchos casos y busca invariantes generales, reduciendo contraejemplos al fallar",
      "No usa assertions",
      "Solo sirve para UI",
      "Prueba implementación privada"
    ],
    "correctIndex": 0,
    "explanation": "Propiedades como round-trip o idempotencia exploran espacios que pocos ejemplos manuales no cubren."
  },
  {
    "id": "adv-test-012",
    "category": "testing",
    "topic": "Mutation testing",
    "question": "¿Qué revela un mutante sobreviviente?",
    "options": [
      "Que el código compila mejor",
      "Que una modificación artificial no fue detectada: puede faltar assertion, caso o relevancia observable",
      "Que hay necesariamente un bug en producción",
      "Que debe borrarse el test"
    ],
    "correctIndex": 1,
    "explanation": "Mutation testing evalúa sensibilidad de la suite, aunque mutantes equivalentes requieren criterio."
  },
  {
    "id": "adv-test-013",
    "category": "testing",
    "topic": "Cobertura",
    "question": "¿100% de cobertura de líneas garantiza corrección?",
    "options": [
      "Sí",
      "No; puede no afirmar resultados, omitir combinaciones, límites, concurrencia y propiedades",
      "Sí si hay mocks",
      "Solo para Java"
    ],
    "correctIndex": 1,
    "explanation": "Cobertura indica ejecución, no calidad del oráculo ni suficiencia del espacio de entrada."
  },
  {
    "id": "adv-test-014",
    "category": "testing",
    "topic": "Flaky tests",
    "question": "Un test falla ocasionalmente por usar Thread.sleep(100). ¿Qué mejora es preferible?",
    "options": [
      "Aumentar sleep a 30 segundos",
      "Esperar una condición observable con timeout acotado y controlar scheduler/reloj cuando sea posible",
      "Reintentar indefinidamente",
      "Ignorar el test"
    ],
    "correctIndex": 1,
    "explanation": "Dormir presupone timing del entorno; la sincronización por condición reduce lentitud y flakiness."
  },
  {
    "id": "adv-test-015",
    "category": "testing",
    "topic": "Tiempo",
    "question": "¿Cómo probar lógica que depende de Instant.now()?",
    "options": [
      "Cambiar el reloj del SO",
      "Inyectar java.time.Clock y usar Clock.fixed/offset en tests",
      "Dormir hasta la fecha objetivo",
      "Mockear todos los métodos static siempre"
    ],
    "correctIndex": 1,
    "explanation": "Clock convierte el tiempo en dependencia explícita y mantiene tests rápidos y deterministas."
  },
  {
    "id": "adv-test-016",
    "category": "testing",
    "topic": "Aleatoriedad",
    "question": "¿Cómo conservar reproducibilidad en un test aleatorio?",
    "options": [
      "Usar Math.random sin registrar nada",
      "Controlar/registrar seed y aislar la fuente Random; al fallar conservar el caso mínimo",
      "Ejecutarlo una sola vez",
      "Aceptar que no se reproduce"
    ],
    "correctIndex": 1,
    "explanation": "La aleatoriedad puede explorar más casos, pero un fallo debe poder repetirse y diagnosticarse."
  },
  {
    "id": "adv-test-017",
    "category": "testing",
    "topic": "Contratos",
    "question": "¿Qué valida un consumer-driven contract test?",
    "options": [
      "El rendimiento máximo",
      "Que las interacciones del proveedor satisfacen contratos que sus consumidores realmente usan",
      "La implementación interna del proveedor",
      "La red de producción en cada commit necesariamente"
    ],
    "correctIndex": 1,
    "explanation": "Reduce desalineación entre servicios sin sustituir todas las pruebas end-to-end."
  },
  {
    "id": "adv-test-018",
    "category": "testing",
    "topic": "Testcontainers",
    "question": "¿Qué ventaja ofrece Testcontainers para repositorios SQL?",
    "options": [
      "Convierte SQL en unit test puro",
      "Ejecuta pruebas contra un motor real reproducible, detectando dialecto, constraints y comportamiento transaccional",
      "Elimina Docker y esquema",
      "Garantiza datos de producción"
    ],
    "correctIndex": 1,
    "explanation": "Mejora fidelidad de integración; migraciones y datos de prueba deben seguir gestionándose."
  },
  {
    "id": "adv-test-019",
    "category": "testing",
    "topic": "Datos de prueba",
    "question": "¿Por qué compartir una BD mutable entre tests paralelos causa problemas?",
    "options": [
      "Los tests se vuelven más unitarios",
      "Aparecen interferencia y dependencia de orden; usar aislamiento por transacción, esquema/contenedor o datos únicos",
      "SQL no admite paralelismo",
      "Aumenta cobertura"
    ],
    "correctIndex": 1,
    "explanation": "Cada test debe controlar su estado inicial y no depender de residuos de otro."
  },
  {
    "id": "adv-test-020",
    "category": "testing",
    "topic": "Transacciones en tests",
    "question": "¿Qué bug puede ocultar un test Spring siempre envuelto en transacción con rollback?",
    "options": [
      "Errores de sintaxis Java",
      "Comportamiento que ocurre en commit, flush, callbacks o en otra transacción; el test nunca cruza esa frontera",
      "Assertions fallidas",
      "Mocks no configurados"
    ],
    "correctIndex": 1,
    "explanation": "Algunas restricciones y eventos se manifiestan al flush/commit; hay que probar fronteras reales cuando son parte del comportamiento."
  },
  {
    "id": "adv-test-021",
    "category": "testing",
    "topic": "Pirámide de pruebas",
    "question": "¿Qué interpretación correcta tiene la pirámide?",
    "options": [
      "Proporción rígida universal",
      "Mucho feedback rápido y aislado, menos pruebas amplias costosas; la forma se adapta al sistema y riesgo",
      "Prohibición de end-to-end",
      "Todos los tests deben mockear I/O"
    ],
    "correctIndex": 1,
    "explanation": "Es una heurística económica de feedback, no una cuota dogmática."
  },
  {
    "id": "adv-test-022",
    "category": "testing",
    "topic": "End-to-end",
    "question": "¿Por qué una suite basada principalmente en E2E suele ser costosa?",
    "options": [
      "No ejecuta código real",
      "Es lenta, frágil, difícil de diagnosticar y combina muchas causas; debe reservarse para recorridos críticos",
      "No permite assertions",
      "Solo funciona manualmente"
    ],
    "correctIndex": 1,
    "explanation": "E2E aporta confianza de ensamblaje, pero una base de tests más focalizados localiza fallos mejor."
  },
  {
    "id": "adv-test-023",
    "category": "testing",
    "topic": "Snapshot testing",
    "question": "¿Qué riesgo aparece al actualizar snapshots automáticamente sin inspección?",
    "options": [
      "La JVM se detiene",
      "Se puede aprobar una regresión como nuevo esperado; el snapshot requiere revisión semántica",
      "Disminuye tamaño del repo siempre",
      "El test se vuelve unitario"
    ],
    "correctIndex": 1,
    "explanation": "Un snapshot es un oráculo grande. Si el revisor no comprende el diff, su valor cae."
  },
  {
    "id": "adv-test-024",
    "category": "testing",
    "topic": "Concurrencia",
    "question": "¿Por qué repetir 1000 veces un test de carrera no demuestra ausencia de race conditions?",
    "options": [
      "Porque repetir nunca ejecuta threads",
      "La planificación no cubre todos los interleavings y un éxito estadístico no es prueba; usar diseño seguro, herramientas y estrés dirigido",
      "Porque 1000 es siempre insuficiente pero 1001 sí",
      "Porque synchronized impide tests"
    ],
    "correctIndex": 1,
    "explanation": "Tests de estrés pueden detectar, no demostrar ausencia. El razonamiento bajo el Java Memory Model sigue siendo esencial."
  },
  {
    "id": "adv-test-025",
    "category": "testing",
    "topic": "Idempotencia",
    "question": "¿Qué propiedad probar en un handler idempotente ante el mismo requestId?",
    "options": [
      "Que la segunda llamada duplica efectos",
      "Que múltiples entregas producen el mismo estado/efecto externo único y una respuesta compatible",
      "Que siempre lanza error",
      "Que requestId se ignora"
    ],
    "correctIndex": 1,
    "explanation": "Se deben incluir reintentos concurrentes y fallos parciales, no solo dos llamadas secuenciales felices."
  },
  {
    "id": "adv-test-026",
    "category": "testing",
    "topic": "Arquitectura de tests",
    "question": "¿Qué es un Humble Object?",
    "options": [
      "Un objeto sin métodos",
      "Separar lógica difícil de probar de una capa delgada dependiente de framework/UI, dejando esta última mínima",
      "Un mock de Object",
      "Una clase package-private únicamente"
    ],
    "correctIndex": 1,
    "explanation": "La lógica pura recibe pruebas rápidas; la integración delgada necesita pocas pruebas específicas."
  },
  {
    "id": "adv-test-027",
    "category": "testing",
    "topic": "Fixtures",
    "question": "¿Cuál es un síntoma de General Fixture smell?",
    "options": [
      "Cada test crea solo datos relevantes",
      "Un setup enorme crea datos que la mayoría de tests no usa, ocultando intención y acoplando escenarios",
      "Uso de builders",
      "Nombres Given-When-Then"
    ],
    "correctIndex": 1,
    "explanation": "Builders/mothers enfocados y defaults explícitos pueden reducir ruido sin compartir estado mutable."
  },
  {
    "id": "adv-test-028",
    "category": "testing",
    "topic": "CI/CD",
    "question": "¿Qué hacer con un test flaky en CI?",
    "options": [
      "Reintentar silenciosamente para siempre",
      "Tratarlo como defecto: medir, asignar dueño, diagnosticar y corregir; cuarentena temporal visible si bloquea, sin perder señal",
      "Eliminarlo inmediatamente sin registrar",
      "Marcar todos los fallos como warning"
    ],
    "correctIndex": 1,
    "explanation": "Los reintentos pueden aportar diagnóstico temporal, pero normalizarlos destruye confianza en la suite."
  },
  {
    "id": "adv-test-029",
    "category": "testing",
    "topic": "Performance",
    "question": "¿Qué hace confiable una prueba de rendimiento?",
    "options": [
      "Una medición con System.nanoTime sin warmup",
      "Entorno y carga controlados, warmup cuando aplica, percentiles, múltiples muestras y comparación con baseline",
      "Solo promedio de una ejecución",
      "Ejecutarla con debugger"
    ],
    "correctIndex": 1,
    "explanation": "JIT, GC, ruido y colas vuelven engañoso un único promedio; herramientas como JMH sirven para microbenchmarks Java."
  },
  {
    "id": "adv-test-030",
    "category": "testing",
    "topic": "Pruebas de seguridad",
    "question": "¿Qué enfoque integra mejor seguridad en tests?",
    "options": [
      "Un pentest al final como único control",
      "Tests de autorización por rol/objeto, análisis de dependencias/código, casos de abuso e integración, más evaluación especializada según riesgo",
      "Verificar solo contraseñas válidas",
      "Mockear todas las decisiones de seguridad"
    ],
    "correctIndex": 1,
    "explanation": "La seguridad necesita controles continuos y pruebas negativas; ninguna técnica aislada cubre todo."
  }
];
