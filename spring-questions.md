# Banco de certificación: Spring Framework y Spring Boot

100 preguntas de opción múltiple basadas en [`spring-guide.md`](spring-guide.md). Salvo que se indique **“selecciona dos”**, solo existe una respuesta correcta. Los reactivos combinan teoría, configuración y lectura de código; las soluciones explican el mecanismo subyacente, no únicamente el nombre de una anotación.

Se asumen Java 17+, Spring Framework 7 y Spring Boot 4 cuando una pregunta depende de generación. En proyectos Boot 3/Framework 6 deben comprobarse paquetes y APIs específicas.

## Uso y calificación

- Simulación completa: 120 minutos; por bloque: 25 preguntas en 30 minutos.
- 1 punto por respuesta y sin penalización por error.
- 80–89 indica dominio operativo; 90–100, dominio avanzado.
- Clasifica cada fallo como contenedor, proxy, protocolo, datos/transacción u operación: así el repaso se dirige al modelo mental y no a memorizar anotaciones.

## Bloque I — Contenedor, beans y Spring Boot (1–25)

### 1. ¿Qué relación describe correctamente Spring Framework y Spring Boot?

- A. Boot reemplaza el contenedor de Framework por otro incompatible.
- B. Boot usa Framework y añade convenciones, auto-configuración, starters y operación.
- C. Framework solo sirve para testing y Boot para Java.
- D. Son productos sin relación.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Spring Boot construye sobre IoC, MVC, transacciones y demás capacidades de Spring Framework. Reduce configuración inicial y agrega integración operativa, pero no elimina los mecanismos del Framework. Referencia: §1.

</details>

### 2. ¿Qué expresa Inversion of Control en Spring?

- A. Cada clase crea internamente todas sus implementaciones con `new`.
- B. La base de datos controla el classloader.
- C. El contenedor participa en crear y ensamblar el grafo según metadatos.
- D. Todo método se ejecuta en otro hilo.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Con DI, los objetos declaran dependencias y el contenedor controla ensamblaje/ciclo. El dominio todavía puede crear objetos normales; no toda construcción se delega necesariamente a Spring. Referencia: §2.1.

</details>

### 3. En Spring, un bean es:

- A. Cualquier objeto creado en la JVM.
- B. Únicamente una entidad JPA.
- C. Un objeto instanciado, ensamblado y administrado por el contenedor.
- D. Un archivo YAML.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un `new Product()` normal no se vuelve bean por existir. Las definiciones del contexto permiten inyección, lifecycle, postprocesamiento y posibles proxies. Referencia: §2.2.

</details>

### 4. ¿Qué aporta normalmente `ApplicationContext` sobre las capacidades básicas de `BeanFactory`?

- A. Un navegador web.
- B. Un compilador Java distinto.
- C. SQL automático para cualquier clase.
- D. Eventos, recursos, entorno, internacionalización y registro integrado de postprocesadores.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `ApplicationContext` es el contenedor usado habitualmente y amplía la fábrica básica. No implica que toda aplicación sea web ni que exista persistencia. Referencia: §2.3.

</details>

### 5. ¿Por qué se prefiere inyección por constructor para dependencias obligatorias?

- A. Oculta el número de dependencias.
- B. Permite objetos válidos, campos `final`, dependencias visibles y pruebas sin contenedor.
- C. Hace opcional cualquier colaborador.
- D. Evita escribir interfaces siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** El constructor expresa el contrato de creación y expone si una clase depende de demasiado. La inyección no obliga a usar interfaces si no aportan una frontera. Referencia: §2.4.

</details>

### 6. Una clase Spring tiene un único constructor. ¿Necesita `@Autowired` en ese constructor?

- A. Sí, siempre.
- B. Solo con `prototype`.
- C. Solo si los parámetros son interfaces.
- D. No; Spring lo utiliza implícitamente.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Desde generaciones modernas, un único constructor se considera candidato sin anotar. En múltiples constructores puede requerirse desambiguación. Referencia: §2.4.

</details>

### 7. ¿Qué estereotipo comunica una clase de lógica de aplicación?

- A. `@Service`.
- B. `@Entity` necesariamente.
- C. `@Bean` sobre la clase.
- D. `@Profile` sin componente.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `@Service` especializa `@Component` y expresa rol. `@Repository` es persistencia y puede participar en traducción de excepciones; `@Controller`/`@RestController` son adaptadores web. Referencia: §3.1.

</details>

### 8. `CatalogApplication` está en `com.example.catalog.api`, mientras repositorios están en `com.example.catalog.data`. No se descubren. ¿Cuál causa probable?

- A. Maven oculta todos los subpaquetes.
- B. El escaneo parte del paquete de la aplicación y descendientes, no de su hermano.
- C. Los repositorios deben vivir en `java.lang`.
- D. Spring solo escanea clases finales.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Colocar la clase principal en el paquete raíz `com.example.catalog` incluye `api` y `data`, o se configura escaneo explícito. Un escaneo demasiado amplio también debe evitarse. Referencia: §3.1.

</details>

### 9. ¿Cuándo es especialmente apropiado un método `@Bean`?

- A. Para crear cada entidad de negocio individual.
- B. Para registrar una clase de tercero cuya fuente no puede anotarse.
- C. Para marcar una variable local.
- D. Para reemplazar el constructor Java.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La configuración Java controla construcción de clientes, clocks o librerías externas. Los parámetros del método se resuelven como dependencias. Referencia: §3.2.

</details>

### 10. ¿Qué diferencia semántica aporta `@Configuration` frente a una clase cualquiera con métodos?

- A. Convierte todos sus métodos en endpoints HTTP.
- B. Declara una fuente de definiciones de beans y habilita procesamiento específico.
- C. La vuelve una entidad JPA.
- D. Impide que tenga constructor.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Spring procesa métodos `@Bean`; en modo completo puede interceptar llamadas entre ellos para respetar semántica del contenedor. Preferir parámetros explícitos reduce dependencia de esa interceptación. Referencia: §3.2.

</details>

### 11. Existen `EmailSender` y `SmsSender` para `NotificationSender`. El servicio necesita email. ¿Qué opción es explícita?

- A. `@Qualifier("emailSender") NotificationSender sender`.
- B. Confiar en el orden alfabético.
- C. Inyectar `Object`.
- D. Eliminar una implementación.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `@Qualifier` añade significado al punto de inyección. Sin selección, varios candidatos del mismo tipo provocan ambigüedad. Referencia: §4.1.

</details>

### 12. ¿Qué hace `@Primary`?

- A. Aumenta prioridad de hilo.
- B. Marca el candidato predeterminado cuando hay varios beans compatibles.
- C. Le asigna clave primaria SQL.
- D. Vuelve singleton global a la clase.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Es útil cuando existe una implementación realmente predeterminada. Un qualifier en el punto de inyección puede expresar una variante concreta. Referencia: §4.1.

</details>

### 13. ¿Qué recibe un constructor con `List<NotificationSender> senders`?

- A. Todas las clases del classpath aunque no sean beans.
- B. Solo el `@Primary`.
- C. Una lista siempre vacía.
- D. Todos los beans compatibles, con un orden que puede controlarse.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Spring puede inyectar colecciones/mapas de candidatos, útil para estrategias. La selección de negocio no debería depender accidentalmente de nombres/orden no documentados. Referencia: §4.2.

</details>

### 14. ¿Qué ofrece `ObjectProvider<T>`?

- A. Persistencia automática de `T`.
- B. Serialización JSON.
- C. Resolución opcional, diferida o múltiple de beans.
- D. Ejecución reactiva obligatoria.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Puede ser útil para dependencias realmente opcionales o prototypes bajo demanda. Usarlo para ocultar una dependencia obligatoria traslada errores al runtime. Referencia: §4.3 y §5.3.

</details>

### 15. ¿Cuál desventaja tiene inyección de campo?

- A. Obliga a usar XML.
- B. No funciona en ninguna versión de Spring.
- C. Oculta dependencias, dificulta construcción directa y evita campos `final` correctamente inicializados.
- D. Hace pública la dependencia.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Aunque el contenedor puede inyectarla, el objeto no declara su contrato de creación y las unitarias requieren reflexión/contexto. Constructor es la opción predeterminada. Referencia: §4.4.

</details>

### 16. `OrderService → PaymentService → OrderService` forma un ciclo. ¿Qué respuesta es preferible?

- A. Añadir `@Lazy` sin analizar.
- B. Activar todos los perfiles.
- C. Revisar responsabilidades y extraer/invertir la colaboración.
- D. Hacer ambos campos estáticos.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Un ciclo suele indicar límites incompletos. `@Lazy` puede retrasar el error, pero no corrige el modelo ni simplifica pruebas. Referencia: §4.5.

</details>

### 17. ¿En qué orden conceptual ocurre la inicialización de un bean?

- A. Proxy → compilar fuente → crear JDK.
- B. `@PreDestroy` → constructor → inyección.
- C. Instancia → dependencias → postprocesamiento/init → posible proxy → uso.
- D. Base de datos → Maven → bean.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El orden real incluye callbacks de postprocesadores antes/después. Al cerrar el contexto se invocan callbacks de destrucción en beans elegibles. Referencia: §5.1.

</details>

### 18. ¿Qué significa scope `singleton` de Spring?

- A. Exactamente una instancia en todas las JVM del mundo.
- B. Una instancia por definición de bean dentro de un `ApplicationContext`.
- C. Una instancia por petición HTTP.
- D. Una instancia por hilo.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** No es el patrón global de JVM. Dos contextos pueden tener instancias distintas y distintos beans pueden usar la misma clase. Referencia: §5.2.

</details>

### 19. Un singleton inyecta directamente un bean `prototype`. ¿Cuándo se crea normalmente ese prototype?

- A. Uno nuevo en cada llamada de método automáticamente.
- B. Nunca.
- C. Al resolver la dependencia del singleton; esa referencia queda reutilizada.
- D. Uno por thread local.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Para obtener uno por uso se necesita `ObjectProvider`, una factory o proxy de scope apropiado. Cambiar scope no cambia mágicamente el punto de resolución. Referencia: §5.3.

</details>

### 20. ¿Por qué un campo `currentUser` mutable en un `@Service` singleton es peligroso?

- A. Varias peticiones pueden leer/escribir la misma instancia concurrentemente.
- B. Spring clona el campo por petición.
- C. Java no permite strings en beans.
- D. Solo afecta a pruebas.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Los servicios singleton deben ser sin estado por petición o sincronizar estado compartido legítimo. Variables locales y parámetros son la opción normal. Referencia: §5.3.

</details>

### 21. `@SpringBootApplication` combina conceptualmente:

- A. Configuración Boot, auto-configuración y component scanning.
- B. JPA, Kafka y Security obligatoriamente.
- C. `@Entity`, `@Transactional` y `@Test`.
- D. Solo un método `main`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Es una anotación compuesta que marca configuración, habilita auto-config y escanea desde su paquete. Las tecnologías se activan al añadir dependencias/configuración, no por la anotación sola. Referencia: §6.3.

</details>

### 22. ¿Qué es un starter de Spring Boot?

- A. Un generador obligatorio de código de negocio.
- B. Un servidor externo descargado manualmente.
- C. Un descriptor curado de dependencias para una capacidad.
- D. Una anotación para entidades.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Por ejemplo `spring-boot-starter-webmvc` reúne piezas compatibles para MVC/Tomcat. El BOM/parent administra versiones; el starter no crea endpoints por sí solo. Referencia: §6.1–6.2.

</details>

### 23. La auto-configuración decide registrar un bean observando principalmente:

- A. Orden de commits Git.
- B. Nombre del desarrollador.
- C. Número de líneas de código.
- D. Classpath, propiedades y beans ya existentes.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Condiciones como `@ConditionalOnClass`, `@ConditionalOnProperty` y `@ConditionalOnMissingBean` expresan estas decisiones. Referencia: §6.4.

</details>

### 24. ¿Qué significa que una auto-configuración haga *back off*?

- A. No registra su bean predeterminado cuando el usuario ya proporcionó uno compatible.
- B. Desactiva Maven.
- C. Reinicia la aplicación.
- D. Elimina todos los beans del usuario.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Permite sobreescribir comportamiento por composición explícita sin copiar toda la auto-configuración. Debe verificarse la condición exacta del caso. Referencia: §6.4.

</details>

### 25. Una auto-configuración esperada no se aplicó. ¿Qué primer diagnóstico es útil?

- A. Borrar todos los starters.
- B. Añadir exclusiones aleatorias.
- C. Activar `--debug` y revisar el condition evaluation report.
- D. Cambiar cada bean a prototype.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El reporte indica condiciones positivas/negativas: clase ausente, propiedad, bean presente, etc. Permite corregir causa en vez de adivinar. Referencia: §6.4.

</details>

## Bloque II — Configuración, arquitectura y Spring MVC (26–50)

### 26. Un valor está en `application.yaml`, pero también se pasa `--server.port=9090`. ¿Cuál suele prevalecer?

- A. Siempre el YAML empaquetado.
- B. Ninguno; Boot falla por duplicado.
- C. El valor menor numéricamente.
- D. El argumento de línea de comandos.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Boot define una precedencia de PropertySources para permitir overrides externos; los argumentos están por encima de config data normal. Comprender el orden evita “valores misteriosos”. Referencia: §7.1.

</details>

### 27. ¿Qué ventaja ofrece `@ConfigurationProperties` sobre muchos `@Value` dispersos?

- A. Elimina necesidad de configuración externa.
- B. Convierte todas las propiedades en secretos.
- C. Binding tipado, agrupación, conversión, validación y metadatos.
- D. Solo acepta strings.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Puede enlazar `Duration`, URI, enums o estructuras y fallar al arrancar si son inválidas. Un objeto cohesivo también es más fácil de probar. Referencia: §7.2.

</details>

### 28. ¿Para qué sigue siendo razonable `@Value("${catalog.banner:Catalog}")`?

- A. Un valor aislado con default sencillo.
- B. Una configuración jerárquica grande con validación compleja.
- C. Persistir entidades.
- D. Reemplazar `@Transactional`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `@Value` es útil para casos puntuales. Cuando varios valores forman un concepto, `@ConfigurationProperties` reduce strings dispersos y mejora validación. Referencia: §7.2.

</details>

### 29. ¿Qué uso correcto tiene `@Profile("dev")`?

- A. Cambiar reglas de negocio para cada usuario.
- B. Registrar una implementación específica solo cuando el perfil `dev` está activo.
- C. Elegir cada feature flag dinámica.
- D. Proteger secretos dentro del JAR.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los perfiles expresan grupos ambientales de beans/configuración. Opciones de negocio finas suelen ser propiedades o feature flags, no una explosión de perfiles. Referencia: §7.3.

</details>

### 30. ¿Qué resuelve `spring.config.import=optional:configtree:/run/secrets/`?

- A. Cifrar cualquier archivo automáticamente.
- B. Publicar secretos en Actuator.
- C. Importar archivos montados como propiedades, útil para secretos/config de plataforma.
- D. Compilar YAML a bytecode.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El nombre del archivo puede formar la clave y el contenido el valor. Spring no cifra por el mero import: permisos, plataforma y exposición siguen siendo responsabilidad operativa. Referencia: §7.4.

</details>

### 31. ¿Qué dependencia respeta una arquitectura orientada hacia el dominio?

- A. La entidad HTTP construye el ApplicationContext.
- B. El dominio importa el controller y `HttpServletRequest`.
- C. El servicio de aplicación depende de un puerto `ProductRepository`; el adaptador JPA implementa el puerto.
- D. El repositorio depende del endpoint REST.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Las reglas estables conocen contratos, no detalles externos. Los adaptadores web/datos dependen hacia adentro y el ensamblaje Spring conecta. Referencia: §8.

</details>

### 32. ¿Por qué no conviene devolver una entidad JPA directamente desde un controller?

- A. Expone estructura interna, relaciones lazy y campos fuera del contrato.
- B. Porque Java no serializa objetos.
- C. Porque `@RestController` solo devuelve strings.
- D. Porque JPA prohíbe getters.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Un DTO HTTP desacopla evolución y evita activar carga accidental durante serialización. Entidad, dominio y contrato externo pueden coincidir en ejemplos pequeños, pero tienen razones de cambio diferentes. Referencia: §8.1.

</details>

### 33. Una invariant “el precio no puede ser negativo” pertenece principalmente a:

- A. Un filtro Servlet únicamente.
- B. El objeto de dominio/caso que controla el precio.
- C. El archivo `pom.xml`.
- D. Actuator health.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La validación HTTP puede rechazar forma inválida antes, pero la regla debe protegerse donde existe el concepto, también si el caso se invoca por mensajería o batch. Referencia: §8.2 y §10.1.

</details>

### 34. ¿Cuál es el papel principal de `DispatcherServlet`?

- A. Proveedor JPA.
- B. Broker de Kafka.
- C. Compilador de Java.
- D. Front controller que delega mapeo, adaptación, conversión y manejo de respuesta/excepción.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Centraliza el flujo MVC y usa estrategias como HandlerMapping/HandlerAdapter y resolvers. El método controller no recibe directamente el socket. Referencia: §9.

</details>

### 35. ¿Qué uso corresponde a `@PathVariable` frente a `@RequestParam`?

- A. Bean frente a entidad.
- B. Body JSON frente a header.
- C. Identidad en la ruta frente a filtros/opciones de consulta.
- D. Transacción frente a cache.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `/products/{id}` identifica un recurso; `?page=2&sort=name` modula la colección. La decisión final sigue diseño HTTP, no solo sintaxis de anotación. Referencia: §9.1.

</details>

### 36. ¿Qué transforma el JSON de un `@RequestBody` en un DTO?

- A. `PasswordEncoder`.
- B. Un `HttpMessageConverter` seleccionado por contenido, normalmente con Jackson en esa configuración.
- C. Un `PlatformTransactionManager`.
- D. El GC.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La negociación y media type eligen conversor. Un fallo de parse/binding ocurre antes de entrar al método si el cuerpo no puede convertirse. Referencia: §9.1–9.2.

</details>

### 37. ¿Qué mecanismo actúa antes de Spring MVC y es adecuado para correlación o seguridad transversal HTTP?

- A. `BeanPostProcessor` por petición.
- B. `ItemProcessor`.
- C. `JpaRepository`.
- D. Servlet Filter.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Los filtros envuelven la cadena servlet. Un interceptor conoce handlers MVC; un aspect intercepta llamadas a beans. Elegir el nivel evita huecos o duplicación. Referencia: §9.3.

</details>

### 38. `@Valid @RequestBody CreateProductRequest` comprueba bien:

- A. Restricciones de forma declaradas, como `@NotBlank` y `@Positive`.
- B. Unicidad concurrente definitiva en la base sin constraint.
- C. Disponibilidad de un servicio remoto.
- D. Autorización de usuario automáticamente.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Bean Validation valida el objeto recibido. Reglas que dependen de estado deben vivir en aplicación/dominio y reforzarse con constraints/transacciones cuando hay concurrencia. Referencia: §10.1.

</details>

### 39. ¿Qué habilita `@Validated` en un `@Service`?

- A. Validación de constraints en parámetros/retornos de métodos interceptados.
- B. Serialización JSON.
- C. Scanning JPA.
- D. Creación de topics Kafka.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Es method validation y suele aplicarse mediante infraestructura/proxy. No sustituye invariantes internas ni validación de entrada HTTP. Referencia: §10.1.

</details>

### 40. Una creación exitosa devuelve `201 Created`. ¿Qué header mejora el contrato?

- A. Ningún header puede usarse con 201.
- B. `WWW-Authenticate` sin autenticación.
- C. `Location` con URI del nuevo recurso.
- D. `Content-Encoding: SQL`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** `ResponseEntity.created(location)` expresa status y Location; el body puede contener representación. Referencia: §10.1–10.2.

</details>

### 41. Un usuario autenticado intenta una operación para la que no tiene permiso. ¿Qué estado corresponde normalmente?

- A. `404 Created`.
- B. `401 Unauthorized`.
- C. `403 Forbidden`.
- D. `200 OK` con `success=false` siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** 401 indica que falta/fracasa autenticación; 403 que el principal autenticado no está autorizado. Puede existir política de ocultar recursos, pero debe ser deliberada. Referencia: §10.2 y §15.

</details>

### 42. ¿Qué aporta `ProblemDetail`?

- A. Un stack trace público obligatorio.
- B. Un reemplazo de logs.
- C. Una entidad JPA para todos los errores.
- D. Un modelo estructurado de errores HTTP alineado con RFC 9457.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Puede incluir status, title, detail, type, instance y propiedades. El contenido público debe ser estable y seguro; detalles técnicos se registran aparte. Referencia: §10.3.

</details>

### 43. ¿Qué alcance tiene `@RestControllerAdvice`?

- A. Únicamente repositorios.
- B. Manejo transversal de excepciones/binding para controllers seleccionados.
- C. Todo método Java de la JVM.
- D. Migraciones de esquema.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Combina advice de controllers y body de respuesta. Permite traducir excepciones de aplicación a contratos HTTP sin contaminar servicios con status codes. Referencia: §10.3.

</details>

### 44. ¿Qué headers participan principalmente en negociación de contenido?

- A. Ninguno; siempre es JSON.
- B. `Accept` para respuesta y `Content-Type` para representación enviada.
- C. `Location` y `ETag` exclusivamente.
- D. Solo `Host`.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** MVC selecciona handler/converter compatibles. Boot suele configurar JSON, pero el protocolo no debe asumirlo sin media types. Referencia: §9.2.

</details>

### 45. Para evitar duplicar un pago ante reintentos de POST, ¿qué patrón es pertinente?

- A. Una clave de idempotencia persistida y asociada al resultado.
- B. Deshabilitar toda validación.
- C. Cambiar el método a GET con efectos.
- D. Confiar en que la red nunca repite.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El servidor reconoce reintentos de la misma operación y devuelve/continúa el resultado compatible. Spring no ofrece una anotación universal que resuelva la persistencia y concurrencia del patrón. Referencia: §10.4.

</details>

### 46. ¿Qué propiedad HTTP debe respetar un endpoint GET?

- A. Crear siempre un recurso.
- B. Ser seguro: no producir un cambio de negocio solicitado por la lectura.
- C. Exigir body de escritura.
- D. No poder cachearse nunca.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Métricas técnicas pueden cambiar, pero un GET no debe usarse para “cancelar” o “pagar”. Seguridad e idempotencia del protocolo permiten clientes, caches y reintentos razonables. Referencia: §10.4.

</details>

### 47. Una colección puede tener millones de productos. ¿Qué contrato conviene en GET de búsqueda?

- A. Paginación/límite y orden determinista.
- B. Devolver todo siempre.
- C. Crear un bean por fila singleton.
- D. Usar `Thread.sleep` para controlar carga.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El límite protege memoria/latencia y el orden estable evita duplicados/saltos al navegar. Offset o cursor se eligen según datos y consistencia. Referencia: §9–10 y acceso a datos.

</details>

### 48. Serializar una relación JPA lazy después de cerrar la transacción puede provocar:

- A. Una nueva base de datos.
- B. Conversión automática a DTO óptimo.
- C. Compilación fallida siempre.
- D. Carga inesperada o `LazyInitializationException`, además de N+1.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Los DTOs y consultas específicas hacen explícitos los datos requeridos. Mantener sesión abierta hasta la vista puede ocultar consultas y no resuelve el contrato externo. Referencia: §8.1 y §11.4.

</details>

### 49. `@RestController` equivale conceptualmente a:

- A. `@Service` + `@Async`.
- B. `@Repository` + `@Transactional`.
- C. `@Controller` + semántica `@ResponseBody` para los handlers.
- D. `@Configuration` + `@Bean`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El valor devuelto se escribe mediante converters en la respuesta, en vez de interpretarse normalmente como nombre de vista. Referencia: §9.

</details>

### 50. ¿Cuándo resulta útil `ResponseEntity<T>`?

- A. Cuando el método necesita controlar status, headers y body.
- B. Para ejecutar una transacción JPA.
- C. Para crear un mock.
- D. Para declarar un bean singleton.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Puede devolver 201+Location, 204 sin body u otros contratos. No es obligatorio cuando defaults de status/body ya expresan lo necesario. Referencia: §9–10.

</details>

## Bloque III — Datos, transacciones, AOP e integración (51–75)

### 51. ¿Qué diferencia básica existe entre `JdbcTemplate` y JPA?

- A. JdbcTemplate deja SQL/mapeo explícitos; JPA añade contexto de persistencia, entidades y dirty checking.
- B. JdbcTemplate no usa base de datos.
- C. JPA solo funciona con MongoDB.
- D. Ambos generan exactamente el mismo SQL siempre.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** JDBC ofrece control visible y menos modelo implícito; JPA modela unidad de trabajo y asociaciones. La elección depende de consultas y dominio, no de una jerarquía universal de “mejor”. Referencia: §11.1–11.2.

</details>

### 52. Una entidad JPA está `managed` y cambia un campo dentro de transacción. ¿Qué puede ocurrir al commit?

- A. El objeto queda inmutable.
- B. Nada puede persistirse sin serializar JSON.
- C. Dirty checking detecta el cambio y sincroniza un UPDATE sin llamar `save` otra vez necesariamente.
- D. Se convierte en bean prototype.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El contexto mantiene snapshot/seguimiento y hace flush según reglas. `save` no equivale siempre a SQL inmediato y el commit puede sincronizar cambios pendientes. Referencia: §11.2.

</details>

### 53. ¿Qué estado JPA tiene una instancia nueva aún no asociada al contexto?

- A. Managed.
- B. Transient.
- C. Removed.
- D. Committed.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Al persistir puede volverse managed; al salir/cerrar puede quedar detached; `remove` marca eliminación. Estos estados explican dirty checking y lazy loading. Referencia: §11.2.

</details>

### 54. ¿Cuándo un nombre de query derivada de Spring Data deja de ser buena opción?

- A. Cuando acumula muchas condiciones/joins y oculta una consulta compleja.
- B. Cuando expresa una condición sencilla y legible.
- C. Cuando devuelve `Page`.
- D. Cuando el repositorio es una interfaz.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Usa `@Query`, Specification, proyección o repositorio personalizado según el caso. La abstracción no debe volver ilegible el contrato ni ocultar rendimiento crítico. Referencia: §11.3.

</details>

### 55. Una consulta obtiene 100 órdenes y al acceder a sus líneas lanza 100 consultas adicionales. ¿Qué problema es?

- A. CSRF.
- B. Deadlock Java obligatorio.
- C. Bean cycle.
- D. N+1.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Una consulta inicial más N cargas por asociación. Soluciones incluyen fetch join, EntityGraph, DTO/proyección o consulta específica; volver todo EAGER no es solución universal. Referencia: §11.4.

</details>

### 56. ¿Qué demuestra una constraint `UNIQUE(email)` que una validación previa `existsByEmail` no garantiza sola?

- A. Que el controller es singleton.
- B. Arbitraje correcto ante inserciones concurrentes en la base.
- C. Que no se necesita transacción.
- D. Que el email existe en Internet.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Dos solicitudes pueden pasar el check antes de insertar. La base protege la invariancia concurrente; la aplicación traduce la violación a un error de dominio/HTTP. Referencia: §10.1 y §11.

</details>

### 57. ¿Por qué no se recomienda `ddl-auto=create` como estrategia de producción?

- A. Porque impide unit tests.
- B. Porque JPA nunca crea tablas.
- C. Puede recrear/perder esquema y no ofrece evolución versionada revisable.
- D. Porque obliga a usar Kafka.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Herramientas de migración como Flyway/Liquibase registran cambios, orden y compatibilidad. Generación automática sirve en aprendizaje o contextos desechables controlados. Referencia: §11.5.

</details>

### 58. ¿Dónde se coloca normalmente `@Transactional`?

- A. En el límite público del caso de uso que forma una unidad de negocio.
- B. En cada getter de entidad.
- C. En el DTO HTTP.
- D. En `pom.xml`.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** El servicio de aplicación coordina repositorios bajo una unidad. Poner transacciones demasiado abajo puede fragmentar atomicidad; demasiado amplias retienen recursos durante I/O remoto. Referencia: §12.1.

</details>

### 59. ¿Qué excepciones provocan rollback por defecto en la demarcación declarativa típica?

- A. Ninguna.
- B. Toda checked exception siempre.
- C. `RuntimeException` y `Error`.
- D. Solo `SQLException` checked.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Las checked no provocan rollback por defecto; se configura `rollbackFor` si el contrato lo requiere. Capturar y ocultar una runtime puede permitir commit. Referencia: §12.2.

</details>

### 60. Un método `@Transactional` público llama a otro método `@Transactional` del mismo objeto mediante `this`. ¿Qué problema aparece?

- A. Se inicia obligatoriamente una nueva transacción.
- B. La llamada interna no cruza el proxy, por lo que la segunda configuración puede no aplicarse.
- C. Ambos métodos se vuelven privados.
- D. Spring crea siempre un segundo contexto.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La interceptación proxy ocurre cuando un llamador externo usa la referencia proxy. Coloca el límite correcto, extrae otro bean o usa `TransactionTemplate` si necesita control explícito. Referencia: §12.6 y §13.1.

</details>

### 61. ¿Qué hace propagación `REQUIRED`?

- A. Siempre suspende y crea otra.
- B. Usa la transacción existente o crea una si no hay.
- C. Prohíbe cualquier transacción.
- D. Exige una preexistente y falla si no hay.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Es la propagación predeterminada. `MANDATORY` exige existente; `REQUIRES_NEW` crea independiente suspendiendo la actual. Referencia: §12.3.

</details>

### 62. ¿Qué riesgo tiene abusar de `REQUIRES_NEW` dentro de ciclos concurrentes?

- A. Puede requerir conexiones adicionales y agotar el pool.
- B. Convierte SQL en MongoDB.
- C. Evita todo rollback.
- D. Hace singleton a cada entidad.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La transacción exterior puede retener una conexión mientras la interior pide otra. Además, la independencia de commit quizá contradiga el negocio. Referencia: §12.3.

</details>

### 63. `@Transactional(readOnly=true)` significa:

- A. Que no se abre transacción.
- B. Que la base rechaza físicamente cualquier UPDATE en todos los motores.
- C. Una declaración/pista que puede optimizar, no una barrera universal contra toda escritura.
- D. Que el método se ejecuta sin proxy.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** El efecto depende de manager, provider, driver y motor. Comunica intención y puede ajustar flush/conexión, pero la integridad debe depender de permisos/contratos reales. Referencia: §12.5.

</details>

### 64. ¿Por qué no debe mantenerse una transacción DB abierta durante una llamada HTTP lenta?

- A. Porque `@Transactional` deshabilita red.
- B. Porque HTTP no puede llamarse desde Java.
- C. Porque toda llamada remota se revierte con la base automáticamente.
- D. Retiene conexión/locks y amplía contención y tiempo de fallo.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Separa consulta/decisión e integra mediante patrones de resiliencia/consistencia. Una transacción local no incluye el servicio remoto y aumenta costo si espera I/O. Referencia: §12.6.

</details>

### 65. ¿Qué patrón ayuda a publicar un evento durable coherente con un cambio de base local?

- A. `@Async` sin persistencia.
- B. Llamar broker después de commit sin registrar intención.
- C. Guardar el evento solo en memoria estática.
- D. Transactional outbox.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** El cambio y registro outbox se confirman en una transacción; otro proceso publica y marca. Requiere idempotencia porque puede haber entrega repetida. Referencia: §12.6 y §19.2.

</details>

### 66. ¿Qué mecanismo usa principalmente Spring AOP?

- A. Reescribir todas las tablas SQL.
- B. Un broker externo obligatorio.
- C. Herencia múltiple de clases Java.
- D. Proxies que interceptan llamadas a métodos de beans.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Puede usar proxies JDK basados en interfaz o proxies de clase. Esto explica auto-invocación, restricciones de métodos final/private e identidad del bean expuesto. Referencia: §13.

</details>

### 67. ¿Por qué un método `final` limita un proxy basado en clase?

- A. No puede sobrescribirse para interceptar la llamada.
- B. No puede contener bytecode.
- C. No puede recibir parámetros.
- D. Se vuelve estático.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** CGLIB/subclass proxy requiere override. Un proxy JDK intercepta a través de interfaces, pero la llamada debe hacerse mediante el proxy y un método del contrato. Referencia: §13.

</details>

### 68. ¿Cuál es un uso apropiado de AOP personalizado?

- A. Medición uniforme de métodos anotados.
- B. Ocultar reglas centrales de cálculo que nadie puede localizar.
- C. Crear entidades fuera del dominio.
- D. Reemplazar todo control de flujo.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Concerns transversales como métricas/auditoría técnica encajan si pointcuts son acotados. La lógica de negocio invisible dificulta lectura y pruebas. Referencia: §13.2.

</details>

### 69. ¿Qué starter Boot 4 corresponde al cliente HTTP bloqueante moderno?

- A. `spring-boot-starter-mockito`.
- B. `spring-boot-starter-webclient` únicamente.
- C. `spring-boot-starter-jpa-client`.
- D. `spring-boot-starter-restclient`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Incluye soporte para `RestClient`/clientes HTTP bloqueantes. `webclient` corresponde al cliente reactivo. La versión exacta debe verificarse en el BOM. Referencia: §14.1.

</details>

### 70. Al integrar un API remoto, ¿qué configuración es indispensable aunque el cliente compile?

- A. Solo aumentar heap.
- B. Omitir status HTTP.
- C. Marcar todos los métodos `synchronized`.
- D. Timeouts y política explícita de errores/reintentos.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Sin límites una dependencia puede consumir hilos/conexiones indefinidamente. Los reintentos solo aplican a fallos transitorios y operaciones seguras/idempotentes, con backoff y límite. Referencia: §14.1.

</details>

### 71. ¿Cómo se ejecuta por defecto un `@EventListener` de evento de aplicación simple?

- A. Siempre después del commit en otro proceso.
- B. Siempre en Kafka.
- C. Solo al reiniciar.
- D. Normalmente de forma síncrona en el hilo publicador.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Es comunicación dentro del contexto/proceso. `@Async` cambia ejecución local; `@TransactionalEventListener` coordina fase transaccional, pero ninguno crea durabilidad externa por sí solo. Referencia: §14.2.

</details>

### 72. ¿Qué problema debe resolver una caché además de añadir `@Cacheable`?

- A. TTL/capacidad, claves, invalidez, stampede y comportamiento ante fallo.
- B. Solo nombre del método.
- C. La compilación del JDK.
- D. El formato de Git commits.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Una caché introduce consistencia temporal y memoria. `@Cacheable` aplica vía proxy y no convierte la caché en fuente durable. Referencia: §14.3.

</details>

### 73. Una aplicación tiene tres réplicas y un método `@Scheduled` por hora. ¿Qué puede ocurrir?

- A. Las tres pueden ejecutarlo si no existe coordinación distribuida.
- B. Spring elige automáticamente un líder global.
- C. Solo Maven lo ejecuta.
- D. El método nunca se ejecuta en producción.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Scheduling es local al proceso. Para ejecución única se necesita plataforma de jobs, lock/leader o un diseño idempotente según requisito. Referencia: §14.4.

</details>

### 74. ¿Qué debe configurarse al usar `@Async` en producción?

- A. Solo el nombre del método.
- B. Executor, capacidad/cola, rechazo, contexto y manejo de excepciones.
- C. Una entidad JPA por thread.
- D. Un perfil por tarea.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** La asincronía no elimina capacidad finita. Además aplica limitación de proxy/auto-invocación y las tareas críticas necesitan persistencia/supervisión. Referencia: §14.4.

</details>

### 75. Un consumidor Kafka procesa el mismo mensaje dos veces. ¿Qué propiedad debe tener idealmente?

- A. Estado solo en memoria sin clave.
- B. Idempotencia o deduplicación consistente.
- C. Dependencia del orden global de todos los topics.
- D. Fallar siempre en el segundo intento.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Sistemas de mensajería pueden entregar al menos una vez. Usa identificadores, operaciones condicionales o inbox/deduplicación; los offsets por sí solos no corrigen efectos parciales. Referencia: §19.2.

</details>

## Bloque IV — Security, testing, operación y ecosistema (76–100)

### 76. ¿Dónde actúa principalmente Spring Security en una aplicación servlet?

- A. Durante compilación Maven exclusivamente.
- B. En una `SecurityFilterChain` antes de `DispatcherServlet`.
- C. Después de enviar la respuesta.
- D. Solo dentro de repositorios JPA.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Los filtros cargan/establecen autenticación, manejan excepciones y autorización web antes del controller. La seguridad de método añade otra capa mediante proxies. Referencia: §15.

</details>

### 77. ¿Qué diferencia existe entre autenticación y autorización?

- A. GET frente a POST.
- B. Crear bean frente a destruirlo.
- C. Identificar al principal frente a decidir qué puede hacer.
- D. Hash frente a cifrado únicamente.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Autenticación produce una identidad/credenciales verificadas; autorización evalúa permisos sobre una acción/recurso. Un usuario autenticado puede recibir 403. Referencia: §15.

</details>

### 78. ¿Por qué no debe almacenarse una contraseña con cifrado reversible?

- A. El servidor no necesita recuperar el original; debe verificar con hash adaptativo, salt y costo.
- B. Porque Spring no acepta strings.
- C. Porque JWT cifra contraseñas automáticamente.
- D. Porque toda base aplica hashing por default.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** `PasswordEncoder` compara hash y permite evolución de algoritmo. Una fuga de clave de cifrado reversible revelaría todas las contraseñas. Referencia: §15.2.

</details>

### 79. ¿Cuándo sigue siendo relevante CSRF?

- A. Nunca si se usa Spring.
- B. Cuando el navegador envía credenciales automáticamente, como cookies de sesión.
- C. Solo en aplicaciones CLI.
- D. Solo para consultas SQL.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Un sitio atacante puede inducir solicitudes con cookies del usuario. Una API stateless con bearer token no enviado automáticamente tiene otro modelo; deshabilitar CSRF debe seguir ese análisis, no una receta. Referencia: §15.3.

</details>

### 80. ¿Qué resuelve CORS?

- A. Una política del navegador sobre solicitudes entre orígenes.
- B. Autenticar usuarios por sí solo.
- C. Cifrar tráfico en lugar de TLS.
- D. Evitar SQL injection automáticamente.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** CORS no protege clientes no navegador ni sustituye autorización. Define orígenes, métodos, headers y credenciales mínimas. Referencia: §15.3.

</details>

### 81. ¿Qué habilita `@EnableMethodSecurity`?

- A. Anotaciones como `@PreAuthorize` en métodos interceptados.
- B. HTTPS automático sin certificado.
- C. Migraciones Flyway.
- D. JUnit Platform.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** La autorización se aplica al cruzar el proxy del bean. Reglas complejas pueden delegarse en un componente de autorización probado. Referencia: §15.4.

</details>

### 82. ¿Qué principio debe guiar reglas de acceso?

- A. Permitir todo y confiar en el frontend.
- B. Guardar tokens completos en logs.
- C. Denegar por defecto y otorgar mínimo privilegio.
- D. Dar rol admin a toda cuenta autenticada.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** La seguridad del cliente no impide llamadas directas al servidor. Roles/scopes y reglas por recurso deben evaluarse en backend y auditarse sin exponer secretos. Referencia: §15.5.

</details>

### 83. ¿Qué prueba debe preferirse para una regla pura en `ProductService` con dependencias de constructor?

- A. Un servidor real y base para cada condición.
- B. Una unitaria sin arrancar Spring.
- C. `@SpringBootTest` obligatoriamente.
- D. Una prueba manual únicamente.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Construir servicio y dobles/objetos reales ofrece feedback rápido. El contexto se reserva para wiring, configuración e infraestructura Spring. Referencia: §16.

</details>

### 84. ¿Qué carga `@WebMvcTest(ProductController.class)`?

- A. Un navegador remoto.
- B. Todos los repositorios y brokers reales.
- C. Ningún componente MVC.
- D. Un slice MVC limitado: controller e infraestructura web seleccionada, no toda la aplicación.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Auto-configura MockMvc y beans web relevantes. Colaboradores del controller se proporcionan/importan explícitamente, por ejemplo con `@MockitoBean` en Spring moderno. Referencia: §16.2.

</details>

### 85. ¿Qué comprueba MockMvc?

- A. El socket/TLS real completo.
- B. El pipeline Spring MVC sin iniciar un servidor HTTP real.
- C. Solo métodos privados.
- D. La base PostgreSQL automáticamente.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Ejecuta mapping, binding, validation, converters, advice y filtros configurados mediante infraestructura mock servlet. Para protocolo/red real se inicia servidor con puerto aleatorio. Referencia: §16.2.

</details>

### 86. ¿Qué diferencia generacional debe cuidarse al reemplazar un bean por mock en tests Spring?

- A. Todos usan `@Mock` de JUnit.
- B. `@BeanMock` es parte de Java.
- C. No existe ninguna anotación.
- D. Framework moderno ofrece `@MockitoBean`; proyectos Boot anteriores usaban `@MockBean`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Consulta la documentación de la versión real. `@MockitoBean` modifica el ApplicationContext; `@Mock` de Mockito por sí solo no reemplaza un bean del contexto. Referencia: §16.2.

</details>

### 87. ¿Qué slice corresponde a repositorios JPA?

- A. `@JsonTest` únicamente.
- B. `@WebMvcTest`.
- C. `@RestClientTest`.
- D. `@DataJpaTest`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Configura infraestructura JPA enfocada y transacciones de test según Boot. Para comportamiento específico de PostgreSQL conviene usar ese motor real controlado. Referencia: §16.3.

</details>

### 88. ¿Qué detecta una prueba `@SpringBootTest` de contexto completo que una unitaria no?

- A. Ausencia absoluta de vulnerabilidades.
- B. Wiring, condiciones, configuración y creación real de beans.
- C. Disponibilidad de producción futura.
- D. Corrección matemática automática de todas las reglas.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Un `contextLoads` detecta configuración rota, pero necesita escenarios adicionales para comportamiento. Es más lento y no reemplaza pruebas unitarias. Referencia: §16.4.

</details>

### 89. ¿Qué hace `@SpringBootTest(webEnvironment = RANDOM_PORT)`?

- A. Deshabilita el contexto.
- B. Usa solo MockMvc sin servidor.
- C. Inicia un servidor real en un puerto disponible para probar HTTP del proceso.
- D. Publica a producción.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Permite cliente HTTP contra red local y stack del servidor. Dependencias externas aún deben controlarse y la prueba cuesta más que un slice. Referencia: §16.4.

</details>

### 90. ¿Por qué demasiadas combinaciones distintas de properties/mocks ralentizan Spring Test?

- A. Java recompila el JDK por cada test.
- B. Cada propiedad crea una base física obligatoria.
- C. Mockito descarga Internet.
- D. Generan claves de contexto diferentes y reducen reutilización del cache.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Spring cachea contextos equivalentes. Configuraciones divergentes y `@DirtiesContext` multiplican arranques; estandariza slices y altera solo lo necesario. Referencia: §16.5.

</details>

### 91. ¿Qué dependencia habilita Actuator?

- A. `java.management.actuator`.
- B. `spring-boot-starter-junit`.
- C. `spring-data-health`.
- D. `spring-boot-starter-actuator`.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Aporta endpoints/capacidades de monitorización según exposición y seguridad configuradas. No todos se publican automáticamente por HTTP. Referencia: §17.

</details>

### 92. ¿Qué endpoints requieren especial protección por posible información sensible?

- A. Únicamente endpoints POST de negocio.
- B. Ninguno; Actuator siempre es público.
- C. `env`, `heapdump`, `threaddump`, `beans` y similares.
- D. Solo `/favicon.ico`.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** Pueden revelar configuración, memoria, clases o secretos. Expón el mínimo, separa puerto/red y autentica/autoriza según riesgo. Referencia: §17.

</details>

### 93. ¿Qué diferencia existe entre liveness y readiness?

- A. Ambas deben depender de todos los remotos siempre.
- B. Son sinónimos exactos.
- C. Readiness solo mide disco y liveness SQL.
- D. Liveness indica si reiniciar; readiness si la instancia debe recibir tráfico.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Hacer liveness depender de una caída externa puede provocar reinicios masivos. Readiness retira tráfico temporalmente, pero también debe evitar fallos en cascada. Referencia: §17.2.

</details>

### 94. ¿Qué tres señales forman el núcleo de observabilidad descrito?

- A. Beans, scopes y profiles.
- B. Maven, Gradle y Ant.
- C. GET, POST y DELETE.
- D. Logs, métricas y traces.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Logs explican eventos, métricas tendencias/cantidad y traces el recorrido distribuido. Correlación y cardinalidad controlada son fundamentales. Referencia: §17.1.

</details>

### 95. ¿Por qué no debe usarse un ID de usuario como tag de métrica sin límite?

- A. Porque cifra el ID.
- B. Porque las métricas no aceptan texto nunca.
- C. Porque impide logs.
- D. Crea cardinalidad alta y costo/memoria excesivos en el backend.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** Las dimensiones deben tener conjuntos acotados. IDs individuales pertenecen a logs/traces controlados, no a series temporales ilimitadas. Referencia: §17.1.

</details>

### 96. ¿Qué condición favorece WebFlux?

- A. Cálculo CPU-bound que requiere más núcleos mágicamente.
- B. JDBC bloqueante envuelto en `Mono.just` sobre event loop.
- C. Cadena no bloqueante de extremo a extremo, streaming y backpressure.
- D. CRUD pequeño donde el equipo solo domina MVC y no hay necesidad.

<details><summary>Ver respuesta</summary>

**Respuesta: C.** WebFlux aporta modelo reactivo si clientes/drivers y procesamiento respetan no bloqueo. MVC, incluso con virtual threads, suele ser más simple para APIs bloqueantes. Referencia: §18.

</details>

### 97. ¿Qué representa `Mono<T>`?

- A. Un thread dedicado obligatorio.
- B. Una lista mutable ilimitada.
- C. Una transacción JPA.
- D. Cero o un elemento asincrónico/reactivo.

<details><summary>Ver respuesta</summary>

**Respuesta: D.** `Flux<T>` representa cero a muchos. Son publishers perezosos; no significan por sí solos que la operación interna sea no bloqueante. Referencia: §18.

</details>

### 98. ¿Qué problema específico resuelve Spring Batch mejor que un simple `@Scheduled` largo?

- A. Jobs finitos reiniciables, metadatos, steps, chunks, skip/retry y escalado.
- B. Autenticación OAuth.
- C. Rendering MVC.
- D. Component scanning.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Batch modela ejecuciones y progreso durable. El scheduler puede disparar un job, pero no aporta por sí solo reinicio y trazabilidad de procesamiento masivo. Referencia: §19.3.

</details>

### 99. ¿Qué objetivo tiene Spring Modulith?

- A. Reemplazar JPMS y Maven siempre.
- B. Ayudar a estructurar/verificar módulos de dominio dentro de una aplicación Boot modular.
- C. Dividir automáticamente todo en microservicios desplegados.
- D. Crear modelos de IA.

<details><summary>Ver respuesta</summary>

**Respuesta: B.** Permite monolito modular, documentación, tests de módulos y eventos. Las fronteras pueden probarse antes de asumir el costo de distribución. Referencia: §19.6.

</details>

### 100. ¿Qué precaución es correcta al adoptar Spring Cloud?

- A. Importar un release train compatible con la versión de Boot y no duplicar capacidades de la plataforma sin necesidad.
- B. Elegir la última versión independiente de cada módulo al azar.
- C. Asumir que un circuit breaker elimina fallos.
- D. Convertir toda aplicación en microservicios primero.

<details><summary>Ver respuesta</summary>

**Respuesta: A.** Spring Cloud coordina proyectos mediante BOM/matriz. Kubernetes u otra plataforma ya puede aportar discovery/config; circuit breakers requieren timeouts, límites y observabilidad y no reemplazan buen diseño. Referencia: §19.7.

</details>


