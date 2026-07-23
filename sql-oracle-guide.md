# Guía completa de SQL en Oracle Database — de principiante a experto

Guía teórico-práctica de SQL usando **Oracle Database** como motor de referencia. Cubre desde la arquitectura básica de Oracle, todos los tipos de datos y sus formatos, hasta los cinco subconjuntos del lenguaje SQL (DDL, DML, DQL, DCL, TCL) y conceptos avanzados (índices, vistas, secuencias, PL/SQL, diccionario de datos).

Todos los ejemplos usan un mismo esquema de práctica (departamentos, empleados, puestos, proyectos) para que puedas ejecutarlos tal cual en la base de datos local que se levanta con los scripts de la carpeta [`sql-oracle-scripts/`](sql-oracle-scripts/README.md).

> **Cómo usar esta guía:** lee la teoría aquí, y ejecuta los scripts numerados de la carpeta de scripts en tu propia base de datos Oracle en Docker mientras avanzas. La sección 12 tiene 3 ejercicios prácticos con solución.

---

## Índice

1. [Introducción a Oracle Database y SQL](#1-introducción-a-oracle-database-y-sql)
2. [Arquitectura básica de Oracle](#2-arquitectura-básica-de-oracle)
3. [El esquema de práctica usado en toda la guía](#3-el-esquema-de-práctica-usado-en-toda-la-guía)
4. [Tipos de datos en Oracle](#4-tipos-de-datos-en-oracle)
5. [Formatos de datos: fechas, números y `TO_CHAR`/`TO_DATE`/`TO_NUMBER`](#5-formatos-de-datos-fechas-números-y-to_charto_dateto_number)
6. [DDL — Data Definition Language](#6-ddl--data-definition-language)
7. [DML — Data Manipulation Language](#7-dml--data-manipulation-language)
8. [DQL — Data Query Language](#8-dql--data-query-language)
9. [DCL — Data Control Language](#9-dcl--data-control-language)
10. [TCL — Transaction Control Language](#10-tcl--transaction-control-language)
11. [Conceptos avanzados de Oracle](#11-conceptos-avanzados-de-oracle)
12. [Ejercicios prácticos](#12-ejercicios-prácticos)
13. [Cheat-sheet de referencia rápida](#13-cheat-sheet-de-referencia-rápida)

---

## 1. Introducción a Oracle Database y SQL

**SQL** (*Structured Query Language*) es el lenguaje estándar para definir, manipular y consultar datos en un sistema de bases de datos relacional (RDBMS). **Oracle Database** es uno de los RDBMS comerciales más usados en entornos empresariales, y añade extensiones propias sobre el estándar SQL (funciones, tipos de datos, pseudo-columnas, sintaxis jerárquica, PL/SQL como lenguaje procedural embebido).

SQL se divide tradicionalmente en 5 sublenguajes, según qué tipo de operación permiten:

| Sublenguaje | Nombre completo | Para qué sirve | Comandos principales |
|---|---|---|---|
| **DDL** | Data Definition Language | Definir y modificar la **estructura** de los objetos (tablas, vistas, índices, usuarios) | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME`, `COMMENT` |
| **DML** | Data Manipulation Language | Insertar, modificar y borrar **datos** dentro de las estructuras | `INSERT`, `UPDATE`, `DELETE`, `MERGE` |
| **DQL** | Data Query Language | Consultar/leer datos | `SELECT` |
| **DCL** | Data Control Language | Gestionar permisos y seguridad | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | Controlar transacciones (agrupar cambios como una unidad atómica) | `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `SET TRANSACTION` |

**Dato clave que confunde a muchos principiantes:** en Oracle, `CREATE TABLE` y otros comandos **DDL hacen COMMIT automático** (implícito), tanto de sí mismos como de cualquier transacción DML pendiente antes de ejecutarse. Esto es distinto a otros motores y lo retomamos en la sección de TCL.

### ¿Por qué Oracle y no "SQL genérico"?

Aunque el núcleo de SQL (`SELECT`, `WHERE`, joins, etc.) es muy parecido entre motores (PostgreSQL, MySQL, SQL Server, Oracle), Oracle tiene particularidades importantes que se enseñan mejor de forma explícita:

- Tipos de datos propios: `VARCHAR2`, `NUMBER`, `CLOB`, `DATE` con hora incluida siempre, etc.
- No existe `LIMIT` (se usa `ROWNUM`, `FETCH FIRST` o `ROW_NUMBER()`).
- No existe `AUTO_INCREMENT`: se usan **secuencias** (`SEQUENCE`) o columnas `IDENTITY` (desde Oracle 12c).
- Sintaxis jerárquica propia (`CONNECT BY`).
- El operador de conjuntos `MINUS` (en vez de `EXCEPT` de otros motores).
- Cada tabla vive dentro de un **schema** que es, a su vez, un **usuario** de la base de datos — un concepto distinto al de PostgreSQL/MySQL.

---

## 2. Arquitectura básica de Oracle

Antes de escribir una sola línea de SQL, conviene entender 4 conceptos que son la base de todo lo demás:

### 2.1 Instancia vs. Base de datos

- **Base de datos (database)**: el conjunto físico de archivos en disco (datafiles, control files, redo logs) donde viven los datos.
- **Instancia (instance)**: los procesos en memoria (SGA, PGA, procesos en background) que permiten acceder a esa base de datos.

En la práctica del día a día como desarrollador, rara vez tocas esto directamente — pero explica por qué en Oracle te conectas a un **servicio** (identificado por un *SID* o un *Service Name*), no solo a "un puerto y una base", como en otros motores.

### 2.2 Tablespaces

Un **tablespace** es una unidad lógica de almacenamiento: agrupa los archivos físicos donde realmente se guardan los datos de tus tablas e índices. Cada tabla que creas se asigna (explícita o implícitamente) a un tablespace.

Los más comunes que verás:

| Tablespace | Para qué es |
|---|---|
| `SYSTEM` | metadatos internos de Oracle (diccionario de datos) — nunca crear objetos propios aquí |
| `SYSAUX` | auxiliar del sistema |
| `USERS` | tablespace por defecto para datos de usuarios/aplicaciones |
| `TEMP` | operaciones temporales (ordenamientos, joins grandes) |
| `UNDO` | información para deshacer transacciones no confirmadas |

### 2.3 Usuario = Schema

En Oracle, **cada usuario de base de datos es, a la vez, un schema**. Cuando el usuario `RRHH` crea una tabla `EMPLEADOS`, el nombre completo del objeto es `RRHH.EMPLEADOS`. Esto es diferente de PostgreSQL, donde un usuario puede tener acceso a muchos schemas independientes de su nombre.

Esto implica que en Oracle, "crear un nuevo proyecto/aplicación" casi siempre empieza por **crear un usuario dedicado** para ese proyecto (ver sección 6.7).

### 2.4 Pluggable Databases (PDB) — Oracle moderno (12c+)

Desde Oracle 12c existe la arquitectura **multitenant**: una base de datos "contenedora" (`CDB`) puede alojar varias bases de datos "conectables" (`PDB`), cada una aislada como si fuera independiente. Las imágenes de Docker modernas (como la que usamos en los scripts) ya vienen con un `CDB` y un `PDB` por defecto (típicamente llamado `FREEPDB1` o `XEPDB1`). Al conectarte, normalmente lo haces contra el **PDB**, no contra el CDB raíz.

---

## 3. El esquema de práctica usado en toda la guía

Para que cada ejemplo sea ejecutable y consistente, toda la guía usa el mismo mini-esquema de Recursos Humanos (`RRHH`), con 4 tablas que cubren relaciones 1:N, N:M y auto-referencia:

```
PUESTOS (catálogo de puestos)
   id_puesto PK
   titulo_puesto
   salario_minimo
   salario_maximo

DEPARTAMENTOS
   id_departamento PK
   nombre_departamento
   ubicacion

EMPLEADOS
   id_empleado PK
   nombres, apellidos, email (UNIQUE)
   telefono
   fecha_contratacion
   salario
   id_puesto        FK -> PUESTOS
   id_departamento  FK -> DEPARTAMENTOS
   id_jefe          FK -> EMPLEADOS (auto-referencia: el jefe también es un empleado)

PROYECTOS
   id_proyecto PK
   nombre_proyecto
   fecha_inicio, fecha_fin
   presupuesto
   id_departamento  FK -> DEPARTAMENTOS

EMPLEADO_PROYECTO (tabla intermedia N:M)
   id_empleado  FK -> EMPLEADOS      \
   id_proyecto  FK -> PROYECTOS       > PK compuesta
   rol
   horas_asignadas
```

Relaciones:

- `DEPARTAMENTOS` 1 --- N `EMPLEADOS` (un departamento tiene muchos empleados)
- `PUESTOS` 1 --- N `EMPLEADOS`
- `EMPLEADOS` 1 --- N `EMPLEADOS` (auto-referencia: jefe → subordinados)
- `DEPARTAMENTOS` 1 --- N `PROYECTOS`
- `EMPLEADOS` N --- M `PROYECTOS` (a través de `EMPLEADO_PROYECTO`)

El script [`02_ddl_tablas.sql`](sql-oracle-scripts/02_ddl_tablas.sql) crea este esquema completo con datos de ejemplo.

---

## 4. Tipos de datos en Oracle

Oracle agrupa sus tipos de datos nativos en 5 familias: **numéricos, carácter, fecha/hora, binarios/LOB** y **otros** (ROWID, tipos de colección, JSON desde 21c).

### 4.1 Tipos numéricos

| Tipo | Descripción | Ejemplo de declaración |
|---|---|---|
| `NUMBER(p, s)` | Numérico de precisión variable. `p` = precisión total (1–38 dígitos), `s` = escala (decimales). Es **el tipo numérico universal de Oracle** — se usa para enteros, decimales, dinero, todo. | `NUMBER(10,2)` → hasta 10 dígitos, 2 decimales |
| `NUMBER` (sin precisión) | Número de precisión y escala variable (máxima precisión disponible) | `salario NUMBER` |
| `INTEGER` / `INT` | Alias de `NUMBER(38)` sin decimales — existen por compatibilidad con el estándar SQL | `edad INTEGER` |
| `FLOAT(p)` | Punto flotante de precisión binaria, alias basado en `NUMBER` | `FLOAT(10)` |
| `BINARY_FLOAT` | Punto flotante IEEE 754 de 32 bits — más rápido que `NUMBER` para cálculos científicos | `BINARY_FLOAT` |
| `BINARY_DOUBLE` | Punto flotante IEEE 754 de 64 bits | `BINARY_DOUBLE` |

**Variantes de `NUMBER(p,s)` — casos que confunden al inicio:**

```sql
NUMBER(5)      -- entero de hasta 5 dígitos: -99999 a 99999
NUMBER(5,2)    -- hasta 5 dígitos TOTALES, 2 de ellos decimales: -999.99 a 999.99
NUMBER(5,-2)   -- escala negativa: redondea a centenas. 123456 se guarda como 123500
NUMBER         -- sin límite práctico de precisión/escala (hasta 38 dígitos)
```

**Ejemplo 1 — declarar columnas numéricas típicas:**
```sql
CREATE TABLE demo_numeros (
    id            NUMBER(6)       PRIMARY KEY,   -- identificador entero
    salario       NUMBER(8,2),                    -- dinero: 8 dígitos, 2 decimales
    porcentaje    NUMBER(5,4),                    -- 0.1234 (4 decimales exactos)
    poblacion     NUMBER(12,-3),                  -- redondeado a miles
    factor_cient  BINARY_DOUBLE
);
```

**Ejemplo 2 — qué pasa si te pasas de precisión:**
```sql
INSERT INTO demo_numeros (id, salario) VALUES (1, 123456.789);
-- ERROR: ORA-01438: value larger than specified precision allowed for this column
-- salario es NUMBER(8,2): máximo 999999.99 (6 enteros + 2 decimales)
```

**Ejemplo 3 — redondeo automático en la escala:**
```sql
INSERT INTO demo_numeros (id, porcentaje) VALUES (2, 0.12345);
SELECT porcentaje FROM demo_numeros WHERE id = 2;
-- Devuelve 0.1235 -> Oracle redondea al insertar, no trunca
```

**Ejemplo 4 — escala negativa redondeando a la centena/millar:**
```sql
INSERT INTO demo_numeros (id, poblacion) VALUES (3, 1234567);
SELECT poblacion FROM demo_numeros WHERE id = 3;
-- Devuelve 1235000 -> NUMBER(12,-3) redondea a miles
```

### 4.2 Tipos de carácter (texto)

| Tipo | Descripción | Límite |
|---|---|---|
| `VARCHAR2(n)` | Texto de longitud **variable**. Es el tipo de texto que debes usar por defecto en el 95% de los casos. | hasta 4000 bytes (o 32767 con `MAX_STRING_SIZE=EXTENDED`) |
| `CHAR(n)` | Texto de longitud **fija**: si el valor es más corto, Oracle rellena con espacios a la derecha. | hasta 2000 bytes |
| `NVARCHAR2(n)` | Igual que `VARCHAR2` pero almacenado en el juego de caracteres nacional (Unicode), para soporte multi-idioma garantizado | hasta 4000 bytes |
| `NCHAR(n)` | Igual que `CHAR` pero en juego de caracteres nacional | hasta 2000 bytes |
| `CLOB` | *Character Large Object* — texto de gran tamaño (documentos, JSON, XML como texto) | hasta 4 GB (según configuración) |
| `NCLOB` | Igual que `CLOB` pero en Unicode nacional | hasta 4 GB |
| `LONG` | Predecesor obsoleto de `CLOB` — **evitar en código nuevo**, solo aparece en sistemas legados | hasta 2 GB |

**Variantes — `VARCHAR2` vs `CHAR`:**

```sql
CREATE TABLE demo_texto (
    codigo   CHAR(5),        -- siempre ocupa 5 caracteres, rellenado con espacios
    nombre   VARCHAR2(50),   -- ocupa solo lo que realmente se escribe
    bio      CLOB            -- para texto largo, sin límite práctico
);
```

**Ejemplo 1 — diferencia práctica entre `CHAR` y `VARCHAR2`:**
```sql
INSERT INTO demo_texto (codigo, nombre) VALUES ('AB', 'Ana');
SELECT LENGTH(codigo) AS largo_char, LENGTH(nombre) AS largo_varchar2
FROM demo_texto;
-- largo_char = 5 (rellenado con 3 espacios), largo_varchar2 = 3
```

**Ejemplo 2 — comparaciones con `CHAR` pueden sorprender:**
```sql
SELECT * FROM demo_texto WHERE codigo = 'AB';
-- SÍ encuentra la fila, Oracle compara con "blank-padding" al usar CHAR
```

**Ejemplo 3 — por qué preferir `VARCHAR2` casi siempre:**
```sql
-- Con CHAR(5) desperdicias espacio en códigos cortos y puede confundir
-- comparaciones al concatenar con otros lenguajes/ORMs que sí distinguen espacios.
-- Regla práctica: usa CHAR solo para códigos de longitud verdaderamente fija (ISO country code 'MX', 'US').
```

**Ejemplo 4 — `CLOB` para texto largo:**
```sql
CREATE TABLE demo_documentos (
    id NUMBER PRIMARY KEY,
    contenido CLOB
);
INSERT INTO demo_documentos VALUES (1, RPAD('Texto muy largo... ', 4001, 'x'));
SELECT DBMS_LOB.GETLENGTH(contenido) FROM demo_documentos WHERE id = 1;
```

### 4.3 Tipos de fecha y hora

| Tipo | Descripción |
|---|---|
| `DATE` | Fecha **y hora** (día, mes, año, hora, minuto, segundo) — a diferencia de otros motores, `DATE` en Oracle **siempre incluye tiempo**, con precisión de segundos. |
| `TIMESTAMP(p)` | Igual que `DATE` pero con precisión de fracciones de segundo (`p` = 0 a 9 dígitos decimales, por defecto 6) |
| `TIMESTAMP WITH TIME ZONE` | Igual que `TIMESTAMP`, pero almacena además el offset de zona horaria | 
| `TIMESTAMP WITH LOCAL TIME ZONE` | Almacena en la zona horaria de la base de datos y **normaliza** a la zona horaria de la sesión al leer |
| `INTERVAL YEAR TO MONTH` | Un intervalo de tiempo expresado en años y meses (para diferencias de fecha, no fechas absolutas) |
| `INTERVAL DAY TO SECOND` | Un intervalo expresado en días, horas, minutos y segundos |

**Ejemplo 1 — `DATE` siempre lleva hora, aunque no la escribas:**
```sql
INSERT INTO demo_fechas (id, creado) VALUES (1, DATE '2026-07-14');
-- Internamente se guarda como 2026-07-14 00:00:00
SELECT TO_CHAR(creado, 'YYYY-MM-DD HH24:MI:SS') FROM demo_fechas WHERE id = 1;
```

**Ejemplo 2 — `SYSDATE` vs `SYSTIMESTAMP`:**
```sql
SELECT SYSDATE, SYSTIMESTAMP FROM dual;
-- SYSDATE      -> 14/07/26 (fecha+hora, precisión de segundo)
-- SYSTIMESTAMP -> 14-JUL-26 03.15.42.123456 PM -05:00 (con fracciones de segundo y zona horaria)
```

**Ejemplo 3 — aritmética de fechas (Oracle permite sumar/restar días directamente):**
```sql
SELECT SYSDATE AS hoy,
       SYSDATE + 7 AS en_una_semana,
       SYSDATE - 30 AS hace_un_mes
FROM dual;
```

**Ejemplo 4 — `INTERVAL` para diferencias de tiempo con unidad explícita:**
```sql
SELECT fecha_contratacion,
       fecha_contratacion + INTERVAL '6' MONTH AS fin_periodo_prueba,
       SYSDATE - fecha_contratacion AS dias_en_la_empresa
FROM empleados
WHERE id_empleado = 100;
```

**Ejemplo 5 (extra, por ser un tema propenso a confusión) — `TIMESTAMP WITH TIME ZONE`:**
```sql
CREATE TABLE demo_tz (
    id NUMBER PRIMARY KEY,
    evento TIMESTAMP WITH TIME ZONE
);
INSERT INTO demo_tz VALUES (1, TIMESTAMP '2026-07-14 10:00:00 -05:00');
SELECT evento AT TIME ZONE 'UTC' FROM demo_tz WHERE id = 1;
-- Convierte el instante guardado a la zona horaria UTC para mostrarlo
```

### 4.4 Tipos binarios y LOB (Large Objects)

| Tipo | Descripción |
|---|---|
| `RAW(n)` | Datos binarios de longitud fija/variable pequeña (hasta 2000 bytes) — hashes, datos binarios cortos |
| `LONG RAW` | Predecesor obsoleto de `BLOB` — evitar en código nuevo |
| `BLOB` | *Binary Large Object* — imágenes, PDFs, archivos binarios grandes (hasta 4 GB) |
| `BFILE` | Referencia (puntero) a un archivo binario almacenado **fuera** de la base de datos, en el sistema de archivos del servidor |

**Ejemplo 1 — columna `BLOB` para almacenar un archivo:**
```sql
CREATE TABLE demo_archivos (
    id NUMBER PRIMARY KEY,
    nombre_archivo VARCHAR2(200),
    contenido BLOB
);
```

**Ejemplo 2 — insertar un `RAW` a partir de un hash:**
```sql
CREATE TABLE demo_hash (
    id NUMBER PRIMARY KEY,
    hash_password RAW(32)
);
INSERT INTO demo_hash VALUES (1, STANDARD_HASH('mi_password', 'SHA256'));
```

**Ejemplo 3 — `BFILE` referenciando un archivo externo:**
```sql
CREATE DIRECTORY dir_archivos AS '/opt/oracle/archivos';
CREATE TABLE demo_bfile (
    id NUMBER PRIMARY KEY,
    documento BFILE
);
INSERT INTO demo_bfile VALUES (1, BFILENAME('DIR_ARCHIVOS', 'manual.pdf'));
```

**Ejemplo 4 — por qué `BLOB` y no `RAW` para archivos grandes:**
```sql
-- RAW tiene un límite práctico de 2000 bytes en tabla (32767 en PL/SQL);
-- cualquier archivo real (imagen, PDF) necesita BLOB, que soporta hasta 4GB.
```

### 4.5 Otros tipos importantes

| Tipo | Descripción |
|---|---|
| `ROWID` | Identificador físico único e interno de cada fila en la base de datos (su "dirección" física) |
| `UROWID` | ROWID universal, válido también para tablas index-organized o fuentes no-Oracle |
| `BOOLEAN` | **Solo existe en PL/SQL**, no como tipo de columna de tabla en SQL puro (hasta versiones recientes). Para booleanos en tablas se usa convencionalmente `NUMBER(1)` (0/1) o `CHAR(1)` ('S'/'N', 'Y'/'N') |
| `JSON` | Tipo nativo de JSON (Oracle 21c+); en versiones anteriores se usa `CLOB`/`BLOB` con `IS JSON CHECK` |

**Ejemplo 1 — simular `BOOLEAN` con `NUMBER(1)` y un `CHECK`:**
```sql
CREATE TABLE demo_bool (
    id NUMBER PRIMARY KEY,
    activo NUMBER(1) DEFAULT 1 CHECK (activo IN (0,1))
);
```

**Ejemplo 2 — usar `ROWID` para acceso directo ultra-rápido:**
```sql
SELECT ROWID, empleados.* FROM empleados WHERE id_empleado = 100;
-- El ROWID devuelto se puede usar en un WHERE ROWID = '...' posterior para
-- acceso directo O(1) a esa fila física exacta (usado internamente por índices)
```

**Ejemplo 3 — columna `JSON` nativa (Oracle 21c+):**
```sql
CREATE TABLE demo_json (
    id NUMBER PRIMARY KEY,
    datos JSON
);
INSERT INTO demo_json VALUES (1, '{"nombre":"Ana","edad":30}');
SELECT datos.nombre FROM demo_json;
```

**Ejemplo 4 — validar JSON en versiones sin tipo nativo:**
```sql
CREATE TABLE demo_json_legacy (
    id NUMBER PRIMARY KEY,
    datos CLOB CHECK (datos IS JSON)
);
```

---

## 5. Formatos de datos: fechas, números y `TO_CHAR`/`TO_DATE`/`TO_NUMBER`

Oracle guarda fechas y números en un formato **binario interno**, no como texto. Los "formatos" (`'YYYY-MM-DD'`, `'999,999.99'`, etc.) solo importan al **convertir** entre ese formato interno y el texto que ve un humano (`TO_CHAR`) o al **interpretar** un texto como fecha/número (`TO_DATE`, `TO_NUMBER`).

### 5.1 Modelos de formato de fecha (`date format models`)

| Elemento | Significado | Ejemplo |
|---|---|---|
| `YYYY` | año con 4 dígitos | 2026 |
| `YY` | año con 2 dígitos (ambiguo entre siglos) | 26 |
| `RRRR` / `RR` | año "inteligente": interpreta siglos de forma más segura que `YY` | 26 → 2026 |
| `MM` | mes numérico (01–12) | 07 |
| `MON` | mes abreviado (según idioma de la sesión) | JUL |
| `MONTH` | mes completo | JULY |
| `DD` | día del mes (01–31) | 14 |
| `DY` | día de la semana abreviado | TUE |
| `DAY` | día de la semana completo | TUESDAY |
| `HH24` | hora en formato 24h (00–23) | 15 |
| `HH` / `HH12` | hora en formato 12h (01–12) | 03 |
| `MI` | minutos (00–59) | 30 |
| `SS` | segundos (00–59) | 45 |
| `AM`/`PM` | indicador de mañana/tarde | PM |
| `FF` | fracciones de segundo (para `TIMESTAMP`) | 123456 |
| `TZH:TZM` | offset de zona horaria (hora:minuto) | -05:00 |

**Ejemplo 1 — formatos comunes de salida:**
```sql
SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD') AS iso,
       TO_CHAR(SYSDATE, 'DD/MM/YYYY') AS latino,
       TO_CHAR(SYSDATE, 'DD "de" MONTH "de" YYYY') AS largo,
       TO_CHAR(SYSDATE, 'DY, DD MON YYYY HH24:MI:SS') AS con_hora
FROM dual;
```

**Ejemplo 2 — `TO_DATE` interpretando texto según formato explícito:**
```sql
SELECT TO_DATE('14/07/2026', 'DD/MM/YYYY') AS fecha_ok FROM dual;

-- El error #1 de todo principiante: asumir un formato por defecto
SELECT TO_DATE('2026-07-14') FROM dual;  -- riesgoso: depende de NLS_DATE_FORMAT de la sesión
```

**Ejemplo 3 — `RR` vs `YY` con siglos ambiguos:**
```sql
SELECT TO_DATE('15/03/70', 'DD/MM/RR') AS con_rr,   -- interpreta 1970 (regla de "pivote" en 50)
       TO_DATE('15/03/70', 'DD/MM/YY') AS con_yy     -- interpreta el siglo actual: 2070
FROM dual;
```

**Ejemplo 4 — cambiar el formato de fecha por defecto de la sesión (útil para no repetir `TO_CHAR` en cada consulta durante una sesión de trabajo):**
```sql
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS';
SELECT SYSDATE FROM dual;  -- ahora se imprime directo en ese formato
```

### 5.2 Modelos de formato numérico

| Elemento | Significado | Ejemplo (`9999.99` aplicado a `1234.5`) |
|---|---|---|
| `9` | dígito, no rellena con ceros a la izquierda | ` 1234.50` |
| `0` | dígito, rellena con ceros | `01234.50` |
| `.` | separador decimal | |
| `,` | separador de miles | `9,999.99` → `1,234.50` |
| `$` | signo de moneda | `$1234.50` |
| `L` | símbolo de moneda local según `NLS_TERRITORY` | |
| `S` | signo explícito (+/-) | `+1234.50` |
| `MI` | signo negativo al final, si aplica | `1234.50-` |
| `PR` | negativos entre `< >` (formato contable) | `<1234.50>` |
| `EEEE` | notación científica | `1.2345E+03` |
| `FM` | *fill mode*: quita espacios/ceros de relleno sobrantes | |

**Ejemplo 1 — formatos de moneda y miles:**
```sql
SELECT TO_CHAR(1234567.5, '999,999,999.99') AS con_comas,
       TO_CHAR(1234567.5, 'L999,999,999.99') AS con_moneda_local,
       TO_CHAR(1234567.5, '$999,999,999.99') AS con_dolar
FROM dual;
```

**Ejemplo 2 — signos y formato contable:**
```sql
SELECT TO_CHAR(-1234.5, '9999.99S')  AS con_signo,   -- "1234.50-"
       TO_CHAR(-1234.5, '9999.99MI') AS signo_final, -- "1234.50-"
       TO_CHAR(-1234.5, '9999.99PR') AS formato_contable -- "<1234.50>"
FROM dual;
```

**Ejemplo 3 — `FM` para quitar espacios de relleno:**
```sql
SELECT TO_CHAR(7, '9999')     AS sin_fm,   -- "   7" (con espacios de relleno)
       TO_CHAR(7, 'FM9999')   AS con_fm    -- "7"
FROM dual;
```

**Ejemplo 4 — `TO_NUMBER` interpretando texto con formato:**
```sql
SELECT TO_NUMBER('1.234,56', '9G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''') AS numero
FROM dual;
-- Interpreta el texto en formato "europeo" (coma decimal, punto de miles)
-- y lo convierte al NUMBER interno de Oracle: 1234.56
```

### 5.3 Buenas prácticas con formatos

1. **Nunca compares fechas como texto.** `WHERE fecha = '2026-07-14'` depende del `NLS_DATE_FORMAT` de la sesión y puede fallar silenciosamente en otro entorno. Usa siempre `TO_DATE(...)` o literales `DATE '2026-07-14'`.
2. **Evita depender del formato implícito de sesión** (`NLS_DATE_FORMAT`, `NLS_NUMERIC_CHARACTERS`) en código de aplicación — siempre sé explícito con `TO_CHAR`/`TO_DATE`/`TO_NUMBER` y su máscara de formato.
3. Usa **literales ANSI** (`DATE '2026-07-14'`, `TIMESTAMP '2026-07-14 10:00:00'`) cuando el valor es una constante en tu script — son independientes del NLS de la sesión.

---

## 6. DDL — Data Definition Language

DDL define la **estructura** de los objetos de la base de datos. Cada comando DDL en Oracle hace **COMMIT automático** antes y después de ejecutarse — no se puede revertir con `ROLLBACK`.

### 6.1 `CREATE TABLE`

**Ejemplo 1 — tabla básica con tipos y restricciones inline:**
```sql
CREATE TABLE puestos (
    id_puesto      NUMBER(4)       PRIMARY KEY,
    titulo_puesto  VARCHAR2(50)    NOT NULL,
    salario_minimo NUMBER(8,2),
    salario_maximo NUMBER(8,2)
);
```

**Ejemplo 2 — restricciones nombradas explícitamente (recomendado en proyectos reales):**
```sql
CREATE TABLE departamentos (
    id_departamento     NUMBER(4)     CONSTRAINT pk_departamentos PRIMARY KEY,
    nombre_departamento VARCHAR2(60)  CONSTRAINT nn_nombre_depto NOT NULL,
    ubicacion           VARCHAR2(100)
);
```

**Ejemplo 3 — `CREATE TABLE ... AS SELECT` (CTAS): crear una tabla a partir de una consulta:**
```sql
CREATE TABLE empleados_backup AS
SELECT * FROM empleados WHERE 1 = 0;   -- WHERE 1=0: copia solo la estructura, sin filas

CREATE TABLE empleados_ti AS
SELECT * FROM empleados WHERE id_departamento = 60;  -- copia estructura + datos filtrados
```

**Ejemplo 4 — tabla temporal global (`GLOBAL TEMPORARY TABLE`):**
```sql
CREATE GLOBAL TEMPORARY TABLE tmp_reporte (
    id_empleado NUMBER,
    total_horas NUMBER
) ON COMMIT DELETE ROWS;   -- los datos se borran automáticamente al hacer COMMIT
-- Variante: ON COMMIT PRESERVE ROWS mantiene los datos hasta el fin de la sesión
```

### 6.2 `ALTER TABLE`

**Ejemplo 1 — agregar una columna:**
```sql
ALTER TABLE empleados ADD (telefono_emergencia VARCHAR2(20));
```

**Ejemplo 2 — modificar el tipo/tamaño de una columna:**
```sql
ALTER TABLE empleados MODIFY (telefono VARCHAR2(30));
```

**Ejemplo 3 — eliminar una columna:**
```sql
ALTER TABLE empleados DROP COLUMN telefono_emergencia;
```

**Ejemplo 4 — renombrar una columna o la tabla completa:**
```sql
ALTER TABLE empleados RENAME COLUMN telefono TO telefono_contacto;
ALTER TABLE empleados RENAME TO staff;   -- renombra la tabla completa
ALTER TABLE staff RENAME TO empleados;   -- la regresamos a su nombre original
```

**Ejemplo 5 (variante importante) — agregar/quitar restricciones después de crear la tabla:**
```sql
ALTER TABLE empleados ADD CONSTRAINT ck_salario_positivo CHECK (salario > 0);
ALTER TABLE empleados DROP CONSTRAINT ck_salario_positivo;
ALTER TABLE empleados MODIFY (email VARCHAR2(100) NOT NULL);
```

### 6.3 `DROP TABLE` y `TRUNCATE TABLE`

| Comando | Borra datos | Borra estructura | Se puede revertir | Dispara triggers |
|---|---|---|---|---|
| `DELETE FROM tabla` (DML) | sí (fila por fila) | no | sí, con `ROLLBACK` (hasta el `COMMIT`) | sí |
| `TRUNCATE TABLE` (DDL) | sí (todas, de golpe) | no | **no** | no |
| `DROP TABLE` (DDL) | sí | **sí** | no (o solo vía `FLASHBACK`, ver abajo) | no |

**Ejemplo 1 — `TRUNCATE`, mucho más rápido que `DELETE` sin `WHERE` para vaciar una tabla:**
```sql
TRUNCATE TABLE tmp_reporte;
```

**Ejemplo 2 — `DROP TABLE` normal (va a la "papelera de reciclaje" de Oracle):**
```sql
DROP TABLE empleados_backup;
```

**Ejemplo 3 — recuperar una tabla borrada con `FLASHBACK` (mientras siga en la papelera):**
```sql
FLASHBACK TABLE empleados_backup TO BEFORE DROP;
```

**Ejemplo 4 — `DROP TABLE ... PURGE` para borrar definitivamente, sin pasar por la papelera:**
```sql
DROP TABLE empleados_backup PURGE;
```

### 6.4 Restricciones (constraints) — teoría a fondo

Las restricciones garantizan la **integridad** de los datos: qué combinaciones de valores son válidas.

| Restricción | Qué garantiza |
|---|---|
| `NOT NULL` | la columna no puede quedar vacía |
| `UNIQUE` | no puede haber dos filas con el mismo valor en esa columna (o combinación de columnas) |
| `PRIMARY KEY` | identificador único de cada fila: combina `NOT NULL` + `UNIQUE` |
| `FOREIGN KEY` | el valor debe existir como clave primaria/única en otra tabla (integridad referencial) |
| `CHECK` | el valor debe cumplir una condición lógica arbitraria |
| `DEFAULT` | valor asignado automáticamente si no se especifica uno al insertar (técnicamente no es una restricción de integridad, pero se declara junto a ellas) |

**Ejemplo 1 — `PRIMARY KEY` simple vs. compuesta:**
```sql
-- Simple (una columna)
CREATE TABLE proyectos (
    id_proyecto NUMBER(6) PRIMARY KEY,
    nombre_proyecto VARCHAR2(100)
);

-- Compuesta (varias columnas juntas identifican la fila) — típico en tablas intermedias N:M
CREATE TABLE empleado_proyecto (
    id_empleado NUMBER(6),
    id_proyecto NUMBER(6),
    rol         VARCHAR2(40),
    horas_asignadas NUMBER(5),
    CONSTRAINT pk_empleado_proyecto PRIMARY KEY (id_empleado, id_proyecto)
);
```

**Ejemplo 2 — `FOREIGN KEY` con distintas políticas de borrado (`ON DELETE`):**
```sql
CREATE TABLE empleados (
    id_empleado  NUMBER(6) PRIMARY KEY,
    nombres      VARCHAR2(50) NOT NULL,
    id_departamento NUMBER(4),
    CONSTRAINT fk_emp_departamento
        FOREIGN KEY (id_departamento) REFERENCES departamentos (id_departamento)
        ON DELETE SET NULL   -- si se borra el departamento, el empleado queda sin departamento
);

-- Variante: ON DELETE CASCADE -- si se borra el padre, se borran también los hijos
-- Variante: sin ON DELETE     -- comportamiento por defecto: RESTRICT (no deja borrar el padre si tiene hijos)
```

**Ejemplo 3 — `CHECK` con condiciones simples y compuestas:**
```sql
ALTER TABLE empleados ADD CONSTRAINT ck_salario CHECK (salario BETWEEN 0 AND 1000000);
ALTER TABLE puestos ADD CONSTRAINT ck_rango_salarial
    CHECK (salario_maximo >= salario_minimo);
```

**Ejemplo 4 — `UNIQUE` de una columna y `UNIQUE` compuesta:**
```sql
ALTER TABLE empleados ADD CONSTRAINT uq_email UNIQUE (email);

-- Unique compuesta: la combinación no se puede repetir, aunque cada columna sí individualmente
ALTER TABLE empleado_proyecto ADD CONSTRAINT uq_empleado_rol UNIQUE (id_empleado, rol);
```

**Ejemplo 5 (extra, restricción auto-referenciada — clave para jerarquías) — `id_jefe` apunta a la misma tabla:**
```sql
ALTER TABLE empleados ADD CONSTRAINT fk_emp_jefe
    FOREIGN KEY (id_jefe) REFERENCES empleados (id_empleado);
```

### 6.5 `INDEX`, `VIEW`, `SEQUENCE`, `SYNONYM` (introducción — detalle en sección 11)

```sql
CREATE INDEX idx_empleados_depto ON empleados (id_departamento);
CREATE VIEW vw_empleados_activos AS SELECT * FROM empleados WHERE salario > 0;
CREATE SEQUENCE seq_empleados START WITH 1000 INCREMENT BY 1;
CREATE SYNONYM emp FOR empleados;
```

### 6.6 `COMMENT` — documentar objetos dentro de la propia base de datos

**Ejemplo 1:**
```sql
COMMENT ON TABLE empleados IS 'Catálogo de empleados de la organización';
```

**Ejemplo 2:**
```sql
COMMENT ON COLUMN empleados.salario IS 'Salario mensual bruto en USD';
```

**Ejemplo 3 — consultar los comentarios guardados:**
```sql
SELECT table_name, comments FROM user_tab_comments WHERE table_name = 'EMPLEADOS';
SELECT column_name, comments FROM user_col_comments WHERE table_name = 'EMPLEADOS';
```

**Ejemplo 4 — borrar un comentario (se hace poniendo un string vacío):**
```sql
COMMENT ON TABLE empleados IS '';
```

### 6.7 Crear un usuario (schema) — el punto de partida de cualquier proyecto en Oracle

**Ejemplo 1 — usuario básico con tablespace y cuota:**
```sql
CREATE USER rrhh IDENTIFIED BY "Password123#"
    DEFAULT TABLESPACE users
    TEMPORARY TABLESPACE temp
    QUOTA UNLIMITED ON users;

GRANT CREATE SESSION, RESOURCE TO rrhh;
```

**Ejemplo 2 — usuario con perfil de recursos personalizado (control de intentos de login, expiración de password, etc.):**
```sql
CREATE PROFILE perfil_app LIMIT
    FAILED_LOGIN_ATTEMPTS 5
    PASSWORD_LIFE_TIME 90;

CREATE USER app_user IDENTIFIED BY "OtraClaveSegura1#"
    PROFILE perfil_app
    DEFAULT TABLESPACE users;
```

**Ejemplo 3 — cambiar contraseña o bloquear/desbloquear un usuario:**
```sql
ALTER USER rrhh IDENTIFIED BY "NuevaClave456#";
ALTER USER rrhh ACCOUNT LOCK;
ALTER USER rrhh ACCOUNT UNLOCK;
```

**Ejemplo 4 — borrar un usuario (y opcionalmente todos sus objetos):**
```sql
DROP USER app_user CASCADE;  -- CASCADE borra también todos los objetos que le pertenecen
```

> Ver el script [`01_conexion_y_usuario.sql`](sql-oracle-scripts/01_conexion_y_usuario.sql) para el flujo completo: conectarse como `SYSTEM`, crear el usuario `RRHH`, otorgarle privilegios y conectarse ya como ese usuario.

---

## 7. DML — Data Manipulation Language

DML manipula **datos** dentro de estructuras ya existentes. A diferencia de DDL, los cambios de DML **no se confirman automáticamente** — quedan pendientes de `COMMIT` (ver sección 10).

### 7.1 `INSERT`

**Ejemplo 1 — inserción explícita de todas las columnas:**
```sql
INSERT INTO departamentos (id_departamento, nombre_departamento, ubicacion)
VALUES (10, 'Tecnología', 'Ciudad de México');
```

**Ejemplo 2 — inserción parcial (las columnas omitidas usan su `DEFAULT` o quedan `NULL`):**
```sql
INSERT INTO empleados (id_empleado, nombres, apellidos, email, fecha_contratacion, id_departamento)
VALUES (100, 'Ana', 'García', 'ana.garcia@empresa.com', SYSDATE, 10);
```

**Ejemplo 3 — `INSERT ... SELECT` (insertar el resultado de una consulta):**
```sql
INSERT INTO empleados_backup
SELECT * FROM empleados WHERE id_departamento = 10;
```

**Ejemplo 4 — `INSERT ALL` (insertar en varias tablas en una sola sentencia):**
```sql
INSERT ALL
    INTO empleados_backup VALUES (id_empleado, nombres, apellidos, email, telefono, fecha_contratacion, salario, id_puesto, id_departamento, id_jefe)
    INTO empleados_ti VALUES (id_empleado, nombres, apellidos, email, telefono, fecha_contratacion, salario, id_puesto, id_departamento, id_jefe)
SELECT * FROM empleados WHERE id_departamento = 10;
```

**Ejemplo 5 (variante frecuente) — usar una secuencia al insertar (ver también 11.3):**
```sql
INSERT INTO empleados (id_empleado, nombres, apellidos, email, fecha_contratacion, id_departamento)
VALUES (seq_empleados.NEXTVAL, 'Luis', 'Pérez', 'luis.perez@empresa.com', SYSDATE, 10);
```

### 7.2 `UPDATE`

**Ejemplo 1 — actualización simple con `WHERE`:**
```sql
UPDATE empleados SET salario = salario * 1.10 WHERE id_departamento = 10;
```

**Ejemplo 2 — actualizar varias columnas a la vez:**
```sql
UPDATE empleados
SET salario = 55000, id_puesto = 4
WHERE id_empleado = 100;
```

**Ejemplo 3 — `UPDATE` con subconsulta correlacionada:**
```sql
UPDATE empleados e
SET salario = (SELECT salario_maximo FROM puestos p WHERE p.id_puesto = e.id_puesto)
WHERE salario > (SELECT salario_maximo FROM puestos p WHERE p.id_puesto = e.id_puesto);
```

**Ejemplo 4 — **¡cuidado!** `UPDATE` sin `WHERE` afecta TODAS las filas:**
```sql
-- Esto sube el salario de TODA la tabla, no solo de un departamento:
UPDATE empleados SET salario = salario * 1.05;
-- Siempre revisa con un SELECT usando el mismo WHERE antes de correr un UPDATE masivo.
```

### 7.3 `DELETE`

**Ejemplo 1 — borrar filas específicas:**
```sql
DELETE FROM empleado_proyecto WHERE id_proyecto = 300;
```

**Ejemplo 2 — borrar con subconsulta:**
```sql
DELETE FROM empleados
WHERE id_departamento IN (SELECT id_departamento FROM departamentos WHERE ubicacion = 'Sucursal Cerrada');
```

**Ejemplo 3 — `DELETE` respetando el orden por integridad referencial (hijos antes que padres):**
```sql
DELETE FROM empleado_proyecto WHERE id_empleado = 105;  -- primero la tabla hija
DELETE FROM empleados WHERE id_empleado = 105;           -- luego el padre
```

**Ejemplo 4 — diferencia de rendimiento: `DELETE` vs `TRUNCATE` para vaciar una tabla completa:**
```sql
DELETE FROM tmp_reporte;      -- registra cada fila en el log de redo/undo (más lento, reversible)
-- vs.
TRUNCATE TABLE tmp_reporte;   -- operación DDL, libera espacio inmediatamente, no reversible
```

### 7.4 `MERGE` — "UPSERT" (insertar si no existe, actualizar si ya existe)

`MERGE` es una de las herramientas más potentes de Oracle para sincronizar una tabla destino contra una tabla origen (por ejemplo, en cargas de datos o ETL).

**Ejemplo 1 — sincronizar salarios desde una tabla de "cambios pendientes":**
```sql
MERGE INTO empleados e
USING cambios_salario c
ON (e.id_empleado = c.id_empleado)
WHEN MATCHED THEN
    UPDATE SET e.salario = c.nuevo_salario
WHEN NOT MATCHED THEN
    INSERT (id_empleado, nombres, apellidos, email, fecha_contratacion, salario, id_departamento)
    VALUES (c.id_empleado, c.nombres, c.apellidos, c.email, SYSDATE, c.nuevo_salario, c.id_departamento);
```

**Ejemplo 2 — `MERGE` con condición extra en `WHEN MATCHED` y borrado (`DELETE`) integrado:**
```sql
MERGE INTO empleados e
USING cambios_salario c ON (e.id_empleado = c.id_empleado)
WHEN MATCHED THEN
    UPDATE SET e.salario = c.nuevo_salario
    WHERE c.nuevo_salario > 0
    DELETE WHERE c.nuevo_salario = -1   -- convención: -1 indica "dar de baja"
WHEN NOT MATCHED THEN
    INSERT (id_empleado, salario) VALUES (c.id_empleado, c.nuevo_salario);
```

**Ejemplo 3 — `MERGE` solo para insertar registros nuevos (evitar duplicados, sin actualizar existentes):**
```sql
MERGE INTO departamentos d
USING (SELECT 70 AS id_departamento, 'Legal' AS nombre_departamento FROM dual) nuevo
ON (d.id_departamento = nuevo.id_departamento)
WHEN NOT MATCHED THEN
    INSERT (id_departamento, nombre_departamento) VALUES (nuevo.id_departamento, nuevo.nombre_departamento);
```

**Ejemplo 4 — `MERGE` desde el resultado de un `JOIN` como origen:**
```sql
MERGE INTO empleado_proyecto ep
USING (
    SELECT e.id_empleado, pr.id_proyecto, 'Colaborador' AS rol
    FROM empleados e
    JOIN proyectos pr ON pr.id_departamento = e.id_departamento
    WHERE pr.id_proyecto = 301
) origen
ON (ep.id_empleado = origen.id_empleado AND ep.id_proyecto = origen.id_proyecto)
WHEN NOT MATCHED THEN
    INSERT (id_empleado, id_proyecto, rol, horas_asignadas)
    VALUES (origen.id_empleado, origen.id_proyecto, origen.rol, 0);
```

---

## 8. DQL — Data Query Language

`SELECT` es, en la práctica, el comando que más se usa día a día. Esta sección cubre su sintaxis completa y variantes.

### 8.1 Estructura general de `SELECT`

```sql
SELECT [DISTINCT] columnas
FROM tabla
[WHERE condición]
[GROUP BY columnas]
[HAVING condición_sobre_grupos]
[ORDER BY columnas [ASC|DESC]]
[FETCH FIRST n ROWS ONLY];
```

**Orden lógico de evaluación (importante para entender por qué algunas cosas "no funcionan" donde uno esperaría):**
`FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `FETCH`.
Por eso no puedes usar un alias definido en `SELECT` dentro de `WHERE` (el `WHERE` se evalúa antes de que exista ese alias), pero sí puedes usarlo en `ORDER BY`.

**Ejemplo 1 — `SELECT` básico con filtro y orden:**
```sql
SELECT nombres, apellidos, salario
FROM empleados
WHERE salario > 40000
ORDER BY salario DESC;
```

**Ejemplo 2 — `DISTINCT` para valores únicos:**
```sql
SELECT DISTINCT id_departamento FROM empleados;
```

**Ejemplo 3 — alias de columna y de tabla:**
```sql
SELECT e.nombres || ' ' || e.apellidos AS nombre_completo, e.salario AS sueldo_mensual
FROM empleados e;
```

**Ejemplo 4 — `FETCH FIRST` (equivalente moderno de `LIMIT`, Oracle 12c+):**
```sql
SELECT nombres, salario FROM empleados
ORDER BY salario DESC
FETCH FIRST 5 ROWS ONLY;

-- Variante con "empezar desde": paginación
SELECT nombres, salario FROM empleados
ORDER BY salario DESC
OFFSET 5 ROWS FETCH NEXT 5 ROWS ONLY;
```

**Ejemplo 5 (variante clásica, previa a 12c) — `ROWNUM` para limitar filas:**
```sql
SELECT * FROM (
    SELECT nombres, salario FROM empleados ORDER BY salario DESC
)
WHERE ROWNUM <= 5;
-- ROWNUM se asigna ANTES del ORDER BY si se usa directo en el WHERE externo,
-- por eso siempre se envuelve en una subconsulta ya ordenada.
```

### 8.2 Operadores de filtrado en `WHERE`

**Ejemplo 1 — comparación, rangos y listas:**
```sql
SELECT * FROM empleados WHERE salario BETWEEN 30000 AND 60000;
SELECT * FROM empleados WHERE id_departamento IN (10, 20, 30);
SELECT * FROM empleados WHERE id_departamento NOT IN (10, 20);
```

**Ejemplo 2 — patrones de texto con `LIKE`:**
```sql
SELECT * FROM empleados WHERE apellidos LIKE 'Gar%';    -- empieza con "Gar"
SELECT * FROM empleados WHERE email LIKE '%@empresa.com'; -- termina con ese dominio
SELECT * FROM empleados WHERE nombres LIKE '_na';         -- "_" = exactamente un carácter -> "Ana", "Ina"
```

**Ejemplo 3 — nulos (`NULL` nunca se compara con `=`):**
```sql
SELECT * FROM empleados WHERE id_jefe IS NULL;      -- correcto
SELECT * FROM empleados WHERE id_jefe IS NOT NULL;  -- correcto
-- SELECT * FROM empleados WHERE id_jefe = NULL;    -- INCORRECTO: nunca devuelve filas
```

**Ejemplo 4 — combinación de condiciones con `AND`/`OR` y paréntesis (precedencia explícita):**
```sql
SELECT * FROM empleados
WHERE (id_departamento = 10 OR id_departamento = 20)
  AND salario > 40000;
```

### 8.3 Funciones de agregación y `GROUP BY` / `HAVING`

**Ejemplo 1 — funciones de agregación básicas:**
```sql
SELECT COUNT(*) AS total_empleados,
       SUM(salario) AS nomina_total,
       AVG(salario) AS salario_promedio,
       MAX(salario) AS salario_maximo,
       MIN(salario) AS salario_minimo
FROM empleados;
```

**Ejemplo 2 — agrupar por una columna:**
```sql
SELECT id_departamento, COUNT(*) AS num_empleados, AVG(salario) AS promedio
FROM empleados
GROUP BY id_departamento;
```

**Ejemplo 3 — `HAVING` filtra **grupos**, `WHERE` filtra **filas** (antes de agrupar):**
```sql
SELECT id_departamento, AVG(salario) AS promedio
FROM empleados
WHERE fecha_contratacion > DATE '2020-01-01'   -- filtra filas individuales primero
GROUP BY id_departamento
HAVING AVG(salario) > 45000;                    -- filtra los grupos ya calculados
```

**Ejemplo 4 — `GROUP BY` con varias columnas y `ROLLUP` (subtotales automáticos):**
```sql
SELECT id_departamento, id_puesto, COUNT(*) AS total, SUM(salario) AS suma
FROM empleados
GROUP BY ROLLUP(id_departamento, id_puesto);
-- Genera subtotales por departamento y un gran total general, además del detalle
```

### 8.4 `JOIN` — combinar tablas

| Tipo de JOIN | Qué devuelve |
|---|---|
| `INNER JOIN` | solo filas que coinciden en ambas tablas |
| `LEFT [OUTER] JOIN` | todas las filas de la izquierda + las coincidencias de la derecha (NULL si no hay match) |
| `RIGHT [OUTER] JOIN` | todas las filas de la derecha + coincidencias de la izquierda |
| `FULL [OUTER] JOIN` | todas las filas de ambas tablas, coincidan o no |
| `CROSS JOIN` | producto cartesiano: todas las combinaciones posibles |
| Self join | una tabla unida consigo misma (típico para jerarquías) |

**Ejemplo 1 — `INNER JOIN` (la más común):**
```sql
SELECT e.nombres, e.apellidos, d.nombre_departamento
FROM empleados e
INNER JOIN departamentos d ON e.id_departamento = d.id_departamento;
```

**Ejemplo 2 — `LEFT JOIN` para incluir empleados sin departamento asignado:**
```sql
SELECT e.nombres, d.nombre_departamento
FROM empleados e
LEFT JOIN departamentos d ON e.id_departamento = d.id_departamento;
-- Si id_departamento es NULL, nombre_departamento sale como NULL, pero el empleado sí aparece
```

**Ejemplo 3 — `JOIN` múltiple con tres tablas:**
```sql
SELECT e.nombres, d.nombre_departamento, p.titulo_puesto
FROM empleados e
JOIN departamentos d ON e.id_departamento = d.id_departamento
JOIN puestos p ON e.id_puesto = p.id_puesto;
```

**Ejemplo 4 — self join para mostrar empleado y su jefe:**
```sql
SELECT emp.nombres AS empleado, jefe.nombres AS jefe
FROM empleados emp
LEFT JOIN empleados jefe ON emp.id_jefe = jefe.id_empleado;
```

**Ejemplo 5 (variante) — join con tabla intermedia N:M:**
```sql
SELECT e.nombres, pr.nombre_proyecto, ep.rol
FROM empleados e
JOIN empleado_proyecto ep ON e.id_empleado = ep.id_empleado
JOIN proyectos pr ON ep.id_proyecto = pr.id_proyecto;
```

**Ejemplo 6 (extra, sintaxis antigua vs moderna — bueno reconocerla en código legado):**
```sql
-- Sintaxis moderna (ANSI, recomendada):
SELECT e.nombres, d.nombre_departamento
FROM empleados e JOIN departamentos d ON e.id_departamento = d.id_departamento;

-- Sintaxis antigua "Oracle" (join implícito en el WHERE) — evitar en código nuevo:
SELECT e.nombres, d.nombre_departamento
FROM empleados e, departamentos d
WHERE e.id_departamento = d.id_departamento;
```

### 8.5 Semi-joins y anti-joins: `EXISTS`, `NOT EXISTS`, `IN`, `NOT IN`

**Ejemplo 1 — `EXISTS` (empleados que SÍ tienen al menos un proyecto asignado):**
```sql
SELECT e.nombres
FROM empleados e
WHERE EXISTS (SELECT 1 FROM empleado_proyecto ep WHERE ep.id_empleado = e.id_empleado);
```

**Ejemplo 2 — `NOT EXISTS` (empleados que NO tienen ningún proyecto asignado):**
```sql
SELECT e.nombres
FROM empleados e
WHERE NOT EXISTS (SELECT 1 FROM empleado_proyecto ep WHERE ep.id_empleado = e.id_empleado);
```

**Ejemplo 3 — `IN` con subconsulta (equivalente a `EXISTS` en muchos casos, pero cuidado con `NULL`):**
```sql
SELECT nombres FROM empleados
WHERE id_departamento IN (SELECT id_departamento FROM departamentos WHERE ubicacion LIKE '%México%');
```

**Ejemplo 4 — la trampa clásica de `NOT IN` con `NULL`:**
```sql
-- Si la subconsulta devuelve al menos un NULL, NOT IN NO devuelve NINGUNA fila (comportamiento de NULL en SQL)
SELECT nombres FROM empleados
WHERE id_jefe NOT IN (SELECT id_jefe FROM empleados WHERE id_jefe IS NOT NULL); -- correcto: excluir NULLs explícitamente
-- Regla práctica: prefiere NOT EXISTS sobre NOT IN cuando la columna de la subconsulta puede tener NULLs
```

### 8.6 Subconsultas (subqueries)

**Ejemplo 1 — subconsulta escalar en el `SELECT`:**
```sql
SELECT nombres, salario,
       (SELECT AVG(salario) FROM empleados) AS promedio_general
FROM empleados;
```

**Ejemplo 2 — subconsulta en `WHERE` (no correlacionada):**
```sql
SELECT nombres, salario FROM empleados
WHERE salario > (SELECT AVG(salario) FROM empleados);
```

**Ejemplo 3 — subconsulta correlacionada (se re-ejecuta por cada fila externa):**
```sql
SELECT e.nombres, e.salario
FROM empleados e
WHERE e.salario > (
    SELECT AVG(e2.salario) FROM empleados e2 WHERE e2.id_departamento = e.id_departamento
);
-- "Empleados que ganan más que el promedio de SU PROPIO departamento"
```

**Ejemplo 4 — subconsulta en `FROM` (tabla derivada / inline view):**
```sql
SELECT depto.nombre_departamento, resumen.total_empleados
FROM departamentos depto
JOIN (
    SELECT id_departamento, COUNT(*) AS total_empleados
    FROM empleados
    GROUP BY id_departamento
) resumen ON depto.id_departamento = resumen.id_departamento;
```

### 8.7 Common Table Expressions (`WITH`) — CTE

**Ejemplo 1 — CTE simple para dar nombre a una subconsulta reutilizable:**
```sql
WITH resumen_departamento AS (
    SELECT id_departamento, COUNT(*) AS total, AVG(salario) AS promedio
    FROM empleados
    GROUP BY id_departamento
)
SELECT d.nombre_departamento, r.total, r.promedio
FROM resumen_departamento r
JOIN departamentos d ON d.id_departamento = r.id_departamento;
```

**Ejemplo 2 — varios CTE encadenados:**
```sql
WITH salarios_altos AS (
    SELECT * FROM empleados WHERE salario > 50000
),
por_departamento AS (
    SELECT id_departamento, COUNT(*) AS total FROM salarios_altos GROUP BY id_departamento
)
SELECT * FROM por_departamento;
```

**Ejemplo 3 — CTE recursivo (jerarquías, alternativa moderna a `CONNECT BY`):**
```sql
WITH jerarquia (id_empleado, nombres, id_jefe, nivel) AS (
    SELECT id_empleado, nombres, id_jefe, 0
    FROM empleados WHERE id_jefe IS NULL          -- caso base: el/los "top" de la jerarquía
    UNION ALL
    SELECT e.id_empleado, e.nombres, e.id_jefe, j.nivel + 1
    FROM empleados e
    JOIN jerarquia j ON e.id_jefe = j.id_empleado  -- paso recursivo
)
SELECT * FROM jerarquia ORDER BY nivel;
```

**Ejemplo 4 — CTE usado para simplificar una consulta con ventanas (ver 8.9):**
```sql
WITH ranking AS (
    SELECT nombres, salario, id_departamento,
           RANK() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS puesto
    FROM empleados
)
SELECT * FROM ranking WHERE puesto = 1;  -- el empleado mejor pagado de cada departamento
```

### 8.8 Consultas jerárquicas nativas de Oracle: `CONNECT BY`

**Ejemplo 1 — jerarquía descendente desde la raíz (`START WITH`):**
```sql
SELECT LPAD(' ', 2 * (LEVEL - 1)) || nombres AS organigrama, LEVEL
FROM empleados
START WITH id_jefe IS NULL
CONNECT BY PRIOR id_empleado = id_jefe;
```

**Ejemplo 2 — subir en vez de bajar (`CONNECT BY PRIOR` invertido): del empleado hacia sus jefes:**
```sql
SELECT nombres, LEVEL
FROM empleados
START WITH id_empleado = 105
CONNECT BY id_empleado = PRIOR id_jefe;
```

**Ejemplo 3 — obtener la ruta completa como texto con `SYS_CONNECT_BY_PATH`:**
```sql
SELECT id_empleado, SYS_CONNECT_BY_PATH(nombres, ' > ') AS ruta_jerarquica
FROM empleados
START WITH id_jefe IS NULL
CONNECT BY PRIOR id_empleado = id_jefe;
```

**Ejemplo 4 — filtrar una jerarquía sin cortar ramas completas (`CONNECT_BY_ROOT`):**
```sql
SELECT nombres, CONNECT_BY_ROOT nombres AS raiz_de_la_rama, LEVEL
FROM empleados
CONNECT BY PRIOR id_empleado = id_jefe;
```

### 8.9 Funciones analíticas / de ventana (window functions)

Estas funciones calculan un valor **por fila**, pero considerando un conjunto ("ventana") de filas relacionadas — sin colapsar el resultado como haría `GROUP BY`.

**Ejemplo 1 — `ROW_NUMBER`, `RANK`, `DENSE_RANK`:**
```sql
SELECT nombres, salario, id_departamento,
       ROW_NUMBER() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS fila,
       RANK()       OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS rango,
       DENSE_RANK() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS rango_denso
FROM empleados;
-- Diferencia clave: si hay empate, RANK deja "huecos" en la numeración siguiente, DENSE_RANK no.
```

**Ejemplo 2 — totales acumulados (`running total`) con `SUM() OVER`:**
```sql
SELECT nombres, fecha_contratacion, salario,
       SUM(salario) OVER (ORDER BY fecha_contratacion) AS nomina_acumulada
FROM empleados;
```

**Ejemplo 3 — comparar cada fila con la anterior/siguiente: `LAG` y `LEAD`:**
```sql
SELECT nombres, salario,
       LAG(salario)  OVER (ORDER BY fecha_contratacion) AS salario_contratado_antes,
       LEAD(salario) OVER (ORDER BY fecha_contratacion) AS salario_contratado_despues
FROM empleados;
```

**Ejemplo 4 — porcentaje del total con `RATIO_TO_REPORT`:**
```sql
SELECT id_departamento, nombres, salario,
       ROUND(RATIO_TO_REPORT(salario) OVER (PARTITION BY id_departamento) * 100, 2) AS pct_del_departamento
FROM empleados;
```

**Ejemplo 5 (extra) — promedio móvil con marco explícito (`ROWS BETWEEN`):**
```sql
SELECT nombres, fecha_contratacion, salario,
       AVG(salario) OVER (ORDER BY fecha_contratacion ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS promedio_movil_3
FROM empleados;
```

### 8.10 Operadores de conjuntos: `UNION`, `UNION ALL`, `INTERSECT`, `MINUS`

| Operador | Qué hace |
|---|---|
| `UNION` | combina dos resultados y **elimina duplicados** |
| `UNION ALL` | combina dos resultados **sin** eliminar duplicados (más rápido) |
| `INTERSECT` | solo las filas presentes en **ambos** resultados |
| `MINUS` | filas del primer resultado que **no** están en el segundo (Oracle usa `MINUS`, no `EXCEPT`) |

**Ejemplo 1 — `UNION` vs `UNION ALL`:**
```sql
SELECT id_departamento FROM empleados
UNION
SELECT id_departamento FROM proyectos;    -- sin duplicados

SELECT id_departamento FROM empleados
UNION ALL
SELECT id_departamento FROM proyectos;    -- con duplicados, más rápido
```

**Ejemplo 2 — `INTERSECT`: departamentos que tienen tanto empleados como proyectos:**
```sql
SELECT id_departamento FROM empleados
INTERSECT
SELECT id_departamento FROM proyectos;
```

**Ejemplo 3 — `MINUS`: departamentos con empleados pero sin ningún proyecto:**
```sql
SELECT id_departamento FROM empleados
MINUS
SELECT id_departamento FROM proyectos;
```

**Ejemplo 4 — regla de oro de los operadores de conjuntos: mismo número de columnas y tipos compatibles:**
```sql
SELECT nombres, salario FROM empleados
UNION ALL
SELECT nombre_departamento, NULL FROM departamentos;
-- Funciona porque ambas consultas devuelven 2 columnas con tipos compatibles (VARCHAR2, NUMBER)
```

### 8.11 Funciones escalares más usadas

**Ejemplo 1 — texto:**
```sql
SELECT UPPER(nombres), LOWER(apellidos), INITCAP(nombres),
       SUBSTR(nombres, 1, 3), LENGTH(nombres), TRIM('  hola  '),
       REPLACE(email, '@empresa.com', '@nuevaempresa.com')
FROM empleados;
```

**Ejemplo 2 — numéricas:**
```sql
SELECT ROUND(salario, -3), TRUNC(salario, -3), MOD(salario, 1000), ABS(-15), CEIL(4.1), FLOOR(4.9)
FROM empleados;
```

**Ejemplo 3 — manejo de `NULL`:**
```sql
SELECT nombres,
       NVL(telefono, 'Sin teléfono') AS telefono_o_default,
       NVL2(telefono, 'Tiene teléfono', 'No tiene') AS estado_contacto,
       COALESCE(telefono, email, 'Sin datos de contacto') AS primer_dato_disponible
FROM empleados;
```

**Ejemplo 4 — condicionales: `CASE` y `DECODE`:**
```sql
SELECT nombres, salario,
       CASE
           WHEN salario >= 60000 THEN 'Alto'
           WHEN salario >= 30000 THEN 'Medio'
           ELSE 'Bajo'
       END AS categoria_salarial,
       DECODE(id_departamento, 10, 'Tecnología', 20, 'Ventas', 'Otro') AS depto_legible
FROM empleados;
```

---

## 9. DCL — Data Control Language

DCL controla **quién puede hacer qué** dentro de la base de datos.

### 9.1 Privilegios de sistema vs. privilegios de objeto

| Tipo | Ejemplos | Qué controlan |
|---|---|---|
| **Privilegios de sistema** | `CREATE SESSION`, `CREATE TABLE`, `CREATE USER` | acciones a nivel de la base de datos completa |
| **Privilegios de objeto** | `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE` sobre un objeto concreto | acciones sobre una tabla/vista/procedimiento específico |

**Ejemplo 1 — otorgar privilegios de sistema básicos a un usuario nuevo:**
```sql
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE TO rrhh;
```

**Ejemplo 2 — otorgar privilegios de objeto específicos sobre una tabla:**
```sql
GRANT SELECT, INSERT, UPDATE ON rrhh.empleados TO analista_junior;
GRANT SELECT ON rrhh.empleados TO PUBLIC;   -- PUBLIC = todos los usuarios de la base
```

**Ejemplo 3 — `GRANT ... WITH GRANT OPTION` (el que recibe el privilegio puede, a su vez, otorgarlo a otros):**
```sql
GRANT SELECT ON rrhh.empleados TO lider_equipo WITH GRANT OPTION;
```

**Ejemplo 4 — revocar privilegios:**
```sql
REVOKE INSERT, UPDATE ON rrhh.empleados FROM analista_junior;
REVOKE SELECT ON rrhh.empleados FROM PUBLIC;
```

### 9.2 Roles — agrupar privilegios para asignarlos en bloque

**Ejemplo 1 — crear un rol y asignarle privilegios:**
```sql
CREATE ROLE rol_analista;
GRANT SELECT ON rrhh.empleados TO rol_analista;
GRANT SELECT ON rrhh.departamentos TO rol_analista;
```

**Ejemplo 2 — asignar el rol a uno o varios usuarios:**
```sql
GRANT rol_analista TO analista_junior, analista_senior;
```

**Ejemplo 3 — roles predefinidos de Oracle más comunes:**
```sql
GRANT CONNECT TO rrhh;   -- privilegios básicos para conectarse
GRANT RESOURCE TO rrhh;  -- privilegios para crear objetos propios (tablas, secuencias, etc.)
GRANT DBA TO admin_user; -- privilegios totales de administrador -- ¡usar con muchísimo cuidado!
```

**Ejemplo 4 — revocar un rol completo:**
```sql
REVOKE rol_analista FROM analista_junior;
```

### 9.3 Consultar privilegios existentes (diccionario de datos)

**Ejemplo 1:**
```sql
SELECT * FROM user_tab_privs;      -- privilegios de objeto otorgados AL usuario actual
```

**Ejemplo 2:**
```sql
SELECT * FROM user_sys_privs;      -- privilegios de sistema del usuario actual
```

**Ejemplo 3:**
```sql
SELECT * FROM role_tab_privs WHERE role = 'ROL_ANALISTA';
```

**Ejemplo 4:**
```sql
SELECT grantee, privilege, table_name FROM dba_tab_privs WHERE table_name = 'EMPLEADOS';
-- (requiere privilegios de DBA para ver dba_* en vez de user_*/all_*)
```

---

## 10. TCL — Transaction Control Language

Una **transacción** es un conjunto de una o más sentencias DML que se ejecutan como una **unidad atómica**: o se aplican todas, o ninguna.

### 10.1 `COMMIT` y `ROLLBACK`

**Ejemplo 1 — confirmar cambios de forma explícita:**
```sql
UPDATE empleados SET salario = salario * 1.1 WHERE id_departamento = 10;
COMMIT;   -- los cambios quedan permanentes; ya no se pueden deshacer con ROLLBACK
```

**Ejemplo 2 — deshacer cambios no confirmados:**
```sql
DELETE FROM empleados WHERE id_departamento = 10;
ROLLBACK;   -- ¡se salvan! los empleados vuelven a existir, porque no habíamos hecho COMMIT
```

**Ejemplo 3 — un DDL hace `COMMIT` implícito de todo lo pendiente antes de ejecutarse:**
```sql
UPDATE empleados SET salario = 99999 WHERE id_empleado = 100;
CREATE TABLE tabla_cualquiera (x NUMBER);  -- esto confirma el UPDATE anterior automáticamente
ROLLBACK;  -- ya no sirve de nada para el UPDATE: ya quedó comprometido por el CREATE TABLE
```

**Ejemplo 4 — el `COMMIT`/`ROLLBACK` afecta a toda la sesión, no solo a la última sentencia:**
```sql
INSERT INTO departamentos VALUES (80, 'Marketing', 'Guadalajara');
UPDATE empleados SET id_departamento = 80 WHERE id_empleado = 101;
ROLLBACK;  -- deshace AMBAS operaciones (el INSERT y el UPDATE), no solo la última
```

### 10.2 `SAVEPOINT` — puntos de control intermedios dentro de una transacción

**Ejemplo 1 — deshacer solo una parte de la transacción:**
```sql
UPDATE empleados SET salario = salario * 1.1 WHERE id_departamento = 10;
SAVEPOINT despues_de_aumento;

DELETE FROM empleados WHERE id_departamento = 10 AND salario > 100000;
ROLLBACK TO SAVEPOINT despues_de_aumento;  -- deshace solo el DELETE, conserva el UPDATE

COMMIT;
```

**Ejemplo 2 — varios `SAVEPOINT` encadenados:**
```sql
INSERT INTO departamentos VALUES (90, 'I+D', 'Monterrey');
SAVEPOINT sp1;

INSERT INTO empleados (id_empleado, nombres, apellidos, email, fecha_contratacion, id_departamento)
VALUES (200, 'Carlos', 'Ruiz', 'carlos.ruiz@empresa.com', SYSDATE, 90);
SAVEPOINT sp2;

DELETE FROM departamentos WHERE id_departamento = 90;  -- esto fallaría por FK si hay empleados

ROLLBACK TO SAVEPOINT sp1;  -- descarta el INSERT de empleado, conserva el departamento
COMMIT;
```

**Ejemplo 3 — `SAVEPOINT` con el mismo nombre reutilizado (mueve el punto de control):**
```sql
UPDATE empleados SET salario = 40000 WHERE id_empleado = 100;
SAVEPOINT punto_control;

UPDATE empleados SET salario = 45000 WHERE id_empleado = 101;
SAVEPOINT punto_control;   -- "punto_control" ahora apunta aquí, no al UPDATE anterior

ROLLBACK TO SAVEPOINT punto_control;  -- solo deshace lo que venga después de este segundo SAVEPOINT
```

**Ejemplo 4 — `RELEASE SAVEPOINT` para liberar un punto de control que ya no se necesita:**
```sql
SAVEPOINT temporal;
-- ... cambios ...
RELEASE SAVEPOINT temporal;  -- ya no se puede hacer ROLLBACK TO temporal después de esto
```

### 10.3 `SET TRANSACTION` — configurar el comportamiento de la transacción

**Ejemplo 1 — transacción de **solo lectura** (garantiza una foto consistente mientras dura):**
```sql
SET TRANSACTION READ ONLY;
SELECT COUNT(*) FROM empleados;  -- esta y las siguientes consultas ven el mismo snapshot
SELECT SUM(salario) FROM empleados;
COMMIT;  -- termina la transacción de solo lectura
```

**Ejemplo 2 — nombrar una transacción (útil para monitoreo/auditoría):**
```sql
SET TRANSACTION NAME 'ajuste_salarial_julio_2026';
UPDATE empleados SET salario = salario * 1.05 WHERE id_departamento = 10;
COMMIT;
```

**Ejemplo 3 — nivel de aislamiento `SERIALIZABLE` (más estricto que el default `READ COMMITTED`):**
```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- Esta transacción fallará si otra transacción concurrente modifica las mismas filas
-- que esta transacción también intenta modificar, en vez de simplemente esperarlas.
```

**Ejemplo 4 — `AUTOCOMMIT` en herramientas cliente (SQL*Plus/SQL Developer) — no es TCL puro, pero afecta directamente cómo se comportan COMMIT/ROLLBACK:**
```sql
-- En SQL*Plus:
SET AUTOCOMMIT ON;   -- cada sentencia DML hace COMMIT automático (¡cuidado!)
SET AUTOCOMMIT OFF;  -- comportamiento por defecto y recomendado: tú decides cuándo confirmar
```

---

## 11. Conceptos avanzados de Oracle

### 11.1 Índices — acelerar consultas

Un índice es una estructura auxiliar (generalmente un árbol B-tree) que permite localizar filas sin recorrer la tabla completa (*full table scan*).

**Ejemplo 1 — índice simple sobre una columna de búsqueda frecuente:**
```sql
CREATE INDEX idx_empleados_email ON empleados (email);
```

**Ejemplo 2 — índice compuesto (varias columnas, el orden importa):**
```sql
CREATE INDEX idx_empleados_depto_salario ON empleados (id_departamento, salario);
-- Útil para: WHERE id_departamento = 10 AND salario > 40000
-- Menos útil si solo filtras por salario sin id_departamento
```

**Ejemplo 3 — índice único (equivalente implícito al crear una restricción `UNIQUE`/`PRIMARY KEY`):**
```sql
CREATE UNIQUE INDEX idx_uq_email ON empleados (email);
```

**Ejemplo 4 — índice basado en función (para búsquedas case-insensitive, por ejemplo):**
```sql
CREATE INDEX idx_empleados_email_lower ON empleados (LOWER(email));
-- Permite que WHERE LOWER(email) = 'ana.garcia@empresa.com' use el índice
```

**Cuándo NO indexar:** columnas con muy pocos valores distintos (ej. una columna `sexo` con 'M'/'F'), tablas muy pequeñas, o columnas que casi nunca se filtran — el índice ocupa espacio y ralentiza los `INSERT`/`UPDATE`/`DELETE`.

### 11.2 Vistas (`VIEW`)

Una vista es una consulta guardada que se comporta como una tabla virtual.

**Ejemplo 1 — vista simple:**
```sql
CREATE VIEW vw_empleados_tecnologia AS
SELECT id_empleado, nombres, apellidos, salario
FROM empleados
WHERE id_departamento = 10;
```

**Ejemplo 2 — vista que combina varias tablas (para simplificar consultas repetidas):**
```sql
CREATE VIEW vw_empleados_completo AS
SELECT e.id_empleado, e.nombres, e.apellidos, d.nombre_departamento, p.titulo_puesto
FROM empleados e
JOIN departamentos d ON e.id_departamento = d.id_departamento
JOIN puestos p ON e.id_puesto = p.id_puesto;
```

**Ejemplo 3 — vista `WITH READ ONLY` (evita que alguien intente modificar datos "a través" de la vista):**
```sql
CREATE VIEW vw_reporte_nomina AS
SELECT id_departamento, SUM(salario) AS nomina_total
FROM empleados
GROUP BY id_departamento
WITH READ ONLY;
```

**Ejemplo 4 — vista materializada (guarda físicamente el resultado, útil para reportes pesados):**
```sql
CREATE MATERIALIZED VIEW mv_nomina_departamento
BUILD IMMEDIATE
REFRESH COMPLETE ON DEMAND
AS
SELECT id_departamento, COUNT(*) AS total_empleados, SUM(salario) AS nomina_total
FROM empleados
GROUP BY id_departamento;

-- Refrescar manualmente cuando cambien los datos base:
BEGIN
    DBMS_MVIEW.REFRESH('MV_NOMINA_DEPARTAMENTO');
END;
/
```

### 11.3 Secuencias (`SEQUENCE`) e `IDENTITY`

Oracle no tiene `AUTO_INCREMENT`; el equivalente clásico es una **secuencia** independiente de la tabla.

**Ejemplo 1 — crear y usar una secuencia manualmente:**
```sql
CREATE SEQUENCE seq_proyectos START WITH 100 INCREMENT BY 1 NOCACHE;

INSERT INTO proyectos (id_proyecto, nombre_proyecto, id_departamento)
VALUES (seq_proyectos.NEXTVAL, 'Migración a la nube', 10);

SELECT seq_proyectos.CURRVAL FROM dual;  -- último valor generado en ESTA sesión
```

**Ejemplo 2 — secuencia con ciclo y caché para alto rendimiento:**
```sql
CREATE SEQUENCE seq_tickets
    START WITH 1
    INCREMENT BY 1
    MAXVALUE 999999
    CYCLE       -- al llegar al máximo, vuelve a empezar desde el mínimo
    CACHE 20;   -- pre-genera 20 valores en memoria para reducir overhead
```

**Ejemplo 3 — columna `GENERATED ALWAYS AS IDENTITY` (Oracle 12c+, la forma moderna recomendada):**
```sql
CREATE TABLE tickets (
    id_ticket NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1),
    descripcion VARCHAR2(200)
);
INSERT INTO tickets (descripcion) VALUES ('Revisar acceso VPN');  -- id_ticket se genera solo
```

**Ejemplo 4 — `GENERATED BY DEFAULT AS IDENTITY` (permite insertar un valor manual si hace falta, a diferencia de `ALWAYS`):**
```sql
CREATE TABLE tickets_v2 (
    id_ticket NUMBER GENERATED BY DEFAULT AS IDENTITY,
    descripcion VARCHAR2(200)
);
INSERT INTO tickets_v2 (descripcion) VALUES ('Caso automático');       -- usa la secuencia interna
INSERT INTO tickets_v2 (id_ticket, descripcion) VALUES (9999, 'Caso migrado de otro sistema'); -- valor manual permitido
```

### 11.4 Sinónimos (`SYNONYM`)

**Ejemplo 1 — sinónimo privado (alias corto para un objeto propio):**
```sql
CREATE SYNONYM emp FOR empleados;
SELECT * FROM emp;  -- equivalente a SELECT * FROM empleados
```

**Ejemplo 2 — sinónimo hacia el objeto de otro schema:**
```sql
CREATE SYNONYM depto FOR rrhh.departamentos;
```

**Ejemplo 3 — sinónimo público (visible para todos los usuarios de la base):**
```sql
CREATE PUBLIC SYNONYM empleados_global FOR rrhh.empleados;
```

**Ejemplo 4 — borrar un sinónimo:**
```sql
DROP SYNONYM emp;
DROP PUBLIC SYNONYM empleados_global;
```

### 11.5 PL/SQL básico — procedimientos, funciones, triggers y paquetes

PL/SQL es el lenguaje **procedural** propio de Oracle, que extiende SQL con variables, control de flujo (`IF`, `LOOP`) y estructuras reutilizables.

**Ejemplo 1 — bloque anónimo (la unidad más básica de PL/SQL):**
```sql
BEGIN
    DBMS_OUTPUT.PUT_LINE('Empleados totales: ' || (SELECT COUNT(*) FROM empleados));
END;
/
```

**Ejemplo 2 — procedimiento almacenado con parámetros:**
```sql
CREATE OR REPLACE PROCEDURE aumentar_salario (
    p_id_departamento IN NUMBER,
    p_porcentaje      IN NUMBER
) IS
BEGIN
    UPDATE empleados
    SET salario = salario * (1 + p_porcentaje / 100)
    WHERE id_departamento = p_id_departamento;

    COMMIT;
END;
/

-- Ejecutarlo:
BEGIN
    aumentar_salario(10, 5);  -- +5% al departamento 10
END;
/
```

**Ejemplo 3 — función que devuelve un valor:**
```sql
CREATE OR REPLACE FUNCTION nomina_total_departamento (p_id_departamento IN NUMBER)
RETURN NUMBER IS
    v_total NUMBER;
BEGIN
    SELECT NVL(SUM(salario), 0) INTO v_total
    FROM empleados
    WHERE id_departamento = p_id_departamento;

    RETURN v_total;
END;
/

SELECT nomina_total_departamento(10) FROM dual;
```

**Ejemplo 4 — trigger que audita cambios de salario automáticamente:**
```sql
CREATE TABLE auditoria_salarios (
    id_empleado NUMBER,
    salario_anterior NUMBER,
    salario_nuevo NUMBER,
    fecha_cambio DATE DEFAULT SYSDATE
);

CREATE OR REPLACE TRIGGER trg_auditoria_salario
AFTER UPDATE OF salario ON empleados
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_salarios (id_empleado, salario_anterior, salario_nuevo)
    VALUES (:OLD.id_empleado, :OLD.salario, :NEW.salario);
END;
/
```

**Ejemplo 5 (extra) — paquete (`PACKAGE`): agrupa procedimientos y funciones relacionadas:**
```sql
CREATE OR REPLACE PACKAGE pkg_rrhh AS
    PROCEDURE aumentar_salario(p_id_departamento NUMBER, p_porcentaje NUMBER);
    FUNCTION nomina_total(p_id_departamento NUMBER) RETURN NUMBER;
END pkg_rrhh;
/

CREATE OR REPLACE PACKAGE BODY pkg_rrhh AS
    PROCEDURE aumentar_salario(p_id_departamento NUMBER, p_porcentaje NUMBER) IS
    BEGIN
        UPDATE empleados SET salario = salario * (1 + p_porcentaje/100)
        WHERE id_departamento = p_id_departamento;
        COMMIT;
    END;

    FUNCTION nomina_total(p_id_departamento NUMBER) RETURN NUMBER IS
        v_total NUMBER;
    BEGIN
        SELECT NVL(SUM(salario),0) INTO v_total FROM empleados WHERE id_departamento = p_id_departamento;
        RETURN v_total;
    END;
END pkg_rrhh;
/
```

### 11.6 El diccionario de datos — "metadatos de todo"

Oracle expone su propio catálogo interno mediante vistas del diccionario de datos, con 3 prefijos según el alcance:

| Prefijo | Alcance |
|---|---|
| `USER_*` | objetos que **te pertenecen** (tu propio schema) |
| `ALL_*` | objetos a los que tienes **acceso** (propios + con privilegios otorgados) |
| `DBA_*` | **todos** los objetos de la base (requiere privilegios de administrador) |

**Ejemplo 1 — listar las tablas de mi propio schema:**
```sql
SELECT table_name FROM user_tables;
```

**Ejemplo 2 — ver las columnas de una tabla específica con su tipo:**
```sql
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'EMPLEADOS';
```

**Ejemplo 3 — ver todas las restricciones de una tabla:**
```sql
SELECT constraint_name, constraint_type, search_condition
FROM user_constraints
WHERE table_name = 'EMPLEADOS';
-- constraint_type: P=Primary Key, R=Foreign Key (References), U=Unique, C=Check
```

**Ejemplo 4 — ver qué columnas participan en cada restricción:**
```sql
SELECT constraint_name, column_name
FROM user_cons_columns
WHERE table_name = 'EMPLEADOS'
ORDER BY constraint_name, position;
```

---

## 12. Ejercicios prácticos

Cada ejercicio tiene enunciado y solución. Intenta resolverlos tú primero contra el esquema creado por [`02_ddl_tablas.sql`](sql-oracle-scripts/02_ddl_tablas.sql) antes de ver la solución. Las soluciones completas también están en [`12_ejercicios_practicos.sql`](sql-oracle-scripts/12_ejercicios_practicos.sql).

### Ejercicio 1 (nivel básico — DDL + DML + DQL)

**Enunciado:** crea una tabla `CAPACITACIONES` con: `id_capacitacion` (PK), `nombre_curso` (obligatorio), `horas` (`NUMBER`, debe ser mayor a 0), `id_empleado` (FK a `EMPLEADOS`). Inserta 3 capacitaciones para empleados existentes. Luego escribe una consulta que muestre el nombre del empleado junto con el total de horas de capacitación que ha tomado, ordenado de mayor a menor.

<details>
<summary>Ver solución</summary>

```sql
CREATE TABLE capacitaciones (
    id_capacitacion NUMBER(6) PRIMARY KEY,
    nombre_curso    VARCHAR2(100) NOT NULL,
    horas           NUMBER(4) CHECK (horas > 0),
    id_empleado     NUMBER(6),
    CONSTRAINT fk_capacitacion_empleado FOREIGN KEY (id_empleado) REFERENCES empleados (id_empleado)
);

INSERT INTO capacitaciones VALUES (1, 'SQL Avanzado', 20, 100);
INSERT INTO capacitaciones VALUES (2, 'PL/SQL Intermedio', 15, 100);
INSERT INTO capacitaciones VALUES (3, 'Liderazgo de Equipos', 10, 101);
COMMIT;

SELECT e.nombres || ' ' || e.apellidos AS empleado, SUM(c.horas) AS total_horas
FROM capacitaciones c
JOIN empleados e ON e.id_empleado = c.id_empleado
GROUP BY e.nombres || ' ' || e.apellidos
ORDER BY total_horas DESC;
```
</details>

### Ejercicio 2 (nivel intermedio — JOIN + funciones analíticas + subconsultas)

**Enunciado:** obtén, para cada departamento, el empleado con el salario más alto (nombre completo, salario, y el nombre del departamento), usando una función de ventana. Después, escribe la misma consulta usando una subconsulta correlacionada en vez de función de ventana, y compara los resultados.

<details>
<summary>Ver solución</summary>

```sql
-- Con función de ventana
SELECT * FROM (
    SELECT d.nombre_departamento,
           e.nombres || ' ' || e.apellidos AS empleado,
           e.salario,
           RANK() OVER (PARTITION BY e.id_departamento ORDER BY e.salario DESC) AS puesto
    FROM empleados e
    JOIN departamentos d ON d.id_departamento = e.id_departamento
)
WHERE puesto = 1;

-- Con subconsulta correlacionada (resultado equivalente)
SELECT d.nombre_departamento, e.nombres || ' ' || e.apellidos AS empleado, e.salario
FROM empleados e
JOIN departamentos d ON d.id_departamento = e.id_departamento
WHERE e.salario = (
    SELECT MAX(e2.salario) FROM empleados e2 WHERE e2.id_departamento = e.id_departamento
);
-- Diferencia importante: la versión con subconsulta puede devolver MÁS de una fila
-- por departamento si hay empate en el salario máximo; RANK() los marca a todos con puesto = 1 también,
-- así que en caso de empate ambas consultas coinciden — pero si quisieras solo "una fila garantizada"
-- necesitarías ROW_NUMBER() en vez de RANK().
```
</details>

### Ejercicio 3 (nivel avanzado — transacciones + PL/SQL + integridad referencial)

**Enunciado:** un empleado (`id_empleado = 101`) cambia de departamento del 10 al 20, y además debe finalizar todas sus asignaciones de proyectos del departamento anterior (borrarlas de `EMPLEADO_PROYECTO` para proyectos que pertenezcan al departamento 10). Todo esto debe ocurrir dentro de una única transacción: si cualquier paso falla, no debe aplicarse ningún cambio. Implementa esto como un procedimiento PL/SQL con manejo de excepciones, y pruébalo.

<details>
<summary>Ver solución</summary>

```sql
CREATE OR REPLACE PROCEDURE cambiar_departamento (
    p_id_empleado         IN NUMBER,
    p_id_departamento_nuevo IN NUMBER,
    p_id_departamento_viejo IN NUMBER
) IS
BEGIN
    DELETE FROM empleado_proyecto
    WHERE id_empleado = p_id_empleado
      AND id_proyecto IN (SELECT id_proyecto FROM proyectos WHERE id_departamento = p_id_departamento_viejo);

    UPDATE empleados
    SET id_departamento = p_id_departamento_nuevo
    WHERE id_empleado = p_id_empleado;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'No se encontró el empleado indicado');
    END IF;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;  -- vuelve a lanzar el error después de deshacer, para que quien llame se entere
END;
/

BEGIN
    cambiar_departamento(101, 20, 10);
END;
/

-- Verificación:
SELECT id_empleado, id_departamento FROM empleados WHERE id_empleado = 101;
SELECT * FROM empleado_proyecto WHERE id_empleado = 101;
```
</details>

---

## 13. Cheat-sheet de referencia rápida

### Tipos de datos

| Categoría | Tipos |
|---|---|
| Numéricos | `NUMBER(p,s)`, `INTEGER`, `FLOAT`, `BINARY_FLOAT`, `BINARY_DOUBLE` |
| Texto | `VARCHAR2(n)`, `CHAR(n)`, `NVARCHAR2(n)`, `NCHAR(n)`, `CLOB`, `NCLOB` |
| Fecha/Hora | `DATE`, `TIMESTAMP`, `TIMESTAMP WITH TIME ZONE`, `INTERVAL YEAR TO MONTH`, `INTERVAL DAY TO SECOND` |
| Binarios | `RAW(n)`, `BLOB`, `BFILE` |
| Otros | `ROWID`, `UROWID`, `JSON` |

### Formatos más usados

```
Fechas:   'YYYY-MM-DD'   'DD/MM/YYYY'   'DD-MON-YYYY HH24:MI:SS'   'DY, DD MON YYYY'
Números:  '999,999.99'   'FM999,999.00'  '$999,999.99'   '9999.99PR'   '9999.99S'
```

### DDL

```sql
CREATE TABLE t (col TIPO CONSTRAINT nombre PRIMARY KEY, ...);
ALTER TABLE t ADD (col TIPO);
ALTER TABLE t MODIFY (col TIPO);
ALTER TABLE t DROP COLUMN col;
ALTER TABLE t RENAME COLUMN a TO b;
DROP TABLE t [PURGE];
TRUNCATE TABLE t;
CREATE USER u IDENTIFIED BY "pass"; GRANT CREATE SESSION, RESOURCE TO u;
```

### DML

```sql
INSERT INTO t (c1, c2) VALUES (v1, v2);
INSERT INTO t SELECT ... FROM otra;
UPDATE t SET c1 = v1 WHERE condición;
DELETE FROM t WHERE condición;
MERGE INTO destino USING origen ON (cond) WHEN MATCHED THEN UPDATE SET ... WHEN NOT MATCHED THEN INSERT ...;
```

### DQL

```sql
SELECT [DISTINCT] cols FROM t
[JOIN t2 ON cond]
[WHERE cond]
[GROUP BY cols] [HAVING cond]
[ORDER BY cols]
[FETCH FIRST n ROWS ONLY];

-- Joins: INNER, LEFT, RIGHT, FULL, CROSS
-- Conjuntos: UNION, UNION ALL, INTERSECT, MINUS
-- Ventanas: ROW_NUMBER()/RANK()/DENSE_RANK()/LAG()/LEAD() OVER (PARTITION BY ... ORDER BY ...)
-- Jerarquías: START WITH ... CONNECT BY PRIOR ...
-- CTE: WITH nombre AS (...) SELECT ...
```

### DCL

```sql
GRANT privilegio [, ...] ON objeto TO usuario_o_rol [WITH GRANT OPTION];
REVOKE privilegio [, ...] ON objeto FROM usuario_o_rol;
CREATE ROLE nombre_rol; GRANT nombre_rol TO usuario;
```

### TCL

```sql
COMMIT;
ROLLBACK [TO SAVEPOINT nombre];
SAVEPOINT nombre;
RELEASE SAVEPOINT nombre;
SET TRANSACTION READ ONLY | ISOLATION LEVEL SERIALIZABLE;
```

### Funciones más usadas en el día a día

```
Texto:    UPPER LOWER INITCAP SUBSTR LENGTH TRIM REPLACE || (concatenar)
Números:  ROUND TRUNC MOD ABS CEIL FLOOR
Fecha:    SYSDATE SYSTIMESTAMP ADD_MONTHS MONTHS_BETWEEN TRUNC(fecha)
Nulos:    NVL NVL2 COALESCE NULLIF
Cond.:    CASE WHEN ... THEN ... ELSE ... END      DECODE(expr, valor1, r1, ..., default)
Agregación: COUNT SUM AVG MAX MIN
Conversión: TO_CHAR TO_DATE TO_NUMBER CAST
```

### Diccionario de datos rápido

```sql
SELECT table_name FROM user_tables;
SELECT column_name, data_type FROM user_tab_columns WHERE table_name = 'X';
SELECT constraint_name, constraint_type FROM user_constraints WHERE table_name = 'X';
SELECT * FROM user_tab_privs;
```

---

**Siguiente paso:** ve a la carpeta [`sql-oracle-scripts/`](sql-oracle-scripts/README.md) para levantar Oracle en Docker, crear tu usuario y ejecutar todos estos scripts en orden, del 00 al 12.
