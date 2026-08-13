# Preguntas de entrevistas técnicas

Preguntas reales de entrevistas técnicas, reformuladas para mayor claridad, organizadas por tema. Las respuestas se pueden repasar en las guías de este repositorio: [`README.md`](README.md) (Java y Maven), [`java-testing-guide.md`](java-testing-guide.md) (JUnit y Mockito), [`spring-guide.md`](spring-guide.md) (Spring), [`sql-guide.md`](sql-guide.md) / [`sql-oracle-guide.md`](sql-oracle-guide.md) y [`software-engineering-guide.md`](software-engineering-guide.md).

Para simulaciones extensas de opción múltiple consulta los bancos de 100 reactivos de [`Java y Maven`](java-maven-questions.md), [`JUnit y Mockito`](java-testing-questions.md) y [`Spring`](spring-questions.md).

## Programación Orientada a Objetos

¿Cuáles son los cuatro pilares de la Programación Orientada a Objetos (POO) y en qué consiste cada uno?

¿Qué es una clase? ¿Y qué diferencia hay entre una clase y un objeto?

¿Puede una clase heredar (extender) de varias clases a la vez en Java? Justifica tu respuesta y explica cómo se logra un efecto similar cuando hace falta.

¿Qué es una interfaz? ¿En qué se diferencia de una clase abstracta?

¿Qué diferencia hay entre sobrecarga (*overloading*) y sobrescritura (*overriding*) de métodos?

¿Qué es el polimorfismo? Da un ejemplo concreto de código.

¿Qué es la encapsulación? ¿Por qué no basta con declarar todos los campos como `private` y generar getters/setters automáticamente para cada uno?

¿Qué contrato deben cumplir juntos los métodos `equals()` y `hashCode()`? ¿Qué problema aparece si solo se sobrescribe uno de los dos?

¿Qué diferencia hay entre composición y herencia? ¿En qué situación preferirías una sobre la otra?

¿Qué es un método `static` y en qué se diferencia de un método de instancia?

## Java: tipos, colecciones y manejo de errores

¿Los `String` en Java son mutables o inmutables? Explica tu respuesta con un ejemplo.

¿Cuál es la diferencia entre `StringBuilder` y `StringBuffer`?

¿Cuál es la diferencia entre `==` y `.equals()` al comparar dos objetos?

¿Qué diferencia hay entre una excepción *checked* y una *unchecked*? Da un ejemplo de cada una.

¿Qué efecto tiene la palabra clave `final` aplicada a una variable, a un método y a una clase, respectivamente?

¿Qué es el autoboxing/unboxing? ¿Qué problema puede causar al comparar dos objetos `Integer` con `==` en vez de `.equals()`?

¿Qué es un bloque `try-with-resources` y qué problema resuelve frente a un `try`/`finally` tradicional?

¿Qué diferencia hay entre una interfaz funcional (usada con una lambda) y una clase anónima?

¿Cuál es la diferencia entre `HashMap`, `LinkedHashMap` y `TreeMap`?

## Estructuras de datos y algoritmos

¿Qué estructuras de datos conoces? Explica brevemente para qué usarías cada una.

¿Cuál es la diferencia entre una tabla hash (`HashMap`/`Hashtable`) y un árbol (por ejemplo, un árbol binario de búsqueda)? ¿En qué casos elegirías una sobre el otro?

¿Qué es más eficiente: insertar un elemento en un `ArrayList` o en un `LinkedList`? Explica de qué depende la respuesta (posición de inserción, patrón de acceso posterior).

¿Cómo resolverías el siguiente problema: dada una cadena de texto, invertirla? Explica tu algoritmo y su complejidad.

¿Qué diferencia hay entre una pila (*stack*) y una cola (*queue*)? Da un ejemplo real de uso de cada una.

¿Qué es la notación Big O y por qué es útil para comparar dos algoritmos que resuelven el mismo problema?

¿Cómo funciona una búsqueda binaria? ¿Qué condición debe cumplir la entrada para poder usarla?

¿Qué es una colisión en una tabla hash y con qué estrategias se resuelve?

¿Cómo determinarías si una lista enlazada tiene un ciclo, sin usar memoria adicional proporcional al tamaño de la lista?

¿Qué es la recursividad? ¿Qué ocurre si un algoritmo recursivo no define correctamente su caso base?

## Bases de datos y SQL

¿Qué tipos de `JOIN` conoces en SQL y en qué se diferencian?

¿Cuál es la diferencia entre una función y un procedimiento almacenado en SQL?

¿Cuál es la diferencia entre `GROUP BY` y `HAVING`?

¿Por qué una relación muchos a muchos no puede implementarse directamente con una columna de clave foránea en el modelo relacional? ¿Cómo se resuelve?

¿Qué son las formas normales en el diseño de bases de datos? Explica al menos hasta la Tercera Forma Normal (3FN).

¿Cuál es la diferencia entre `DELETE`, `TRUNCATE` y `DROP`?

¿Qué es una clave primaria y qué es una clave foránea? ¿Puede una tabla tener más de una clave candidata?

¿Qué significa que una transacción cumpla ACID?

¿Qué diferencia hay entre `UNION` y `UNION ALL`?

¿Qué es un índice en una base de datos? ¿En qué situación podría no convenir crear uno?
