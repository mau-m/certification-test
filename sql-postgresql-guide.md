# Guía completa de SQL en PostgreSQL — de cero a experto

Guía teórico-práctica para aprender **PostgreSQL** desde cero y llegar a diseñar, programar, asegurar, optimizar y operar soluciones avanzadas. Cubre arquitectura, `psql`, tipos de datos, DDL, DML, consultas, permisos, transacciones, MVCC, índices, rendimiento, JSONB, arrays, rangos, búsqueda de texto, particionamiento, PL/pgSQL, mantenimiento, seguridad, patrones tipo Redis/Elasticsearch y embeddings con pgvector.

Los ejemplos usan un único esquema de práctica de Recursos Humanos (`rrhh`) para que puedas copiar, ejecutar y relacionar cada concepto. La sintaxis principal funciona en **PostgreSQL 15–18**; cuando una función depende de una versión concreta, se indica de forma explícita. A agosto de 2026, PostgreSQL 18 es la versión mayor estable actual y PostgreSQL 19 todavía está en beta.

> **Cómo estudiar:** sigue las etapas en orden y no avances solo por haber leído. Ejecuta los ejemplos, modifica al menos uno y supera el punto de control de la etapa. La sección 3 es un laboratorio preconstruido: al principio solo debes ejecutarlo; sus construcciones se explican gradualmente en las secciones 4–14. Prueba cambios descartables dentro de `BEGIN; ... ROLLBACK;`.

### Ruta incremental: de cero a experto

La guía está diseñada en capas. Cada etapa presupone la anterior y termina con una evidencia observable, no con una lista de conceptos memorizados.

| Etapa | Secciones | Qué aprendes | Evidencia para avanzar |
|---|---:|---|---|
| 0. Preparación | 1–3 | arquitectura mínima, conexión, `psql` y laboratorio | puedes conectarte y la consulta de verificación devuelve 4 departamentos, 6 puestos, 7 empleados, 4 proyectos y 8 asignaciones |
| 1. Fundamentos | 4–5 | sintaxis, `NULL`, conversiones y tipos | puedes elegir tipos y predecir el resultado de comparaciones con `NULL` |
| 2. SQL esencial | 6–8.9 | tablas, restricciones, DML, filtros, grupos y joins | puedes modelar una relación 1:N y responder una pregunta con un join y un agregado |
| 3. SQL avanzado | 8.10–8.14 | `LATERAL`, subconsultas, CTE, recursión y ventanas | puedes obtener el top N por grupo y recorrer una jerarquía |
| 4. Concurrencia y seguridad | 9–10 | MVCC, aislamiento, locks, roles y RLS | reproduces un bloqueo con dos sesiones y demuestras que un rol no ve filas ajenas |
| 5. Rendimiento y servidor | 11–14 | índices, planes, vistas, PL/pgSQL y extensiones | comparas un plan antes/después y justificas el índice con mediciones |
| 6. Operación | 15–16 | vacuum, observabilidad, backup, aplicaciones y migraciones | restauras un `pg_dump` en otra base y verificas los conteos |
| 7. Especialización | 17–18 | migración Oracle, caché/colas, búsqueda y embeddings | construyes uno de los laboratorios especializados y explicas cuándo usar otro sistema |
| 8. Consolidación | 19–21 | ejercicios, consulta rápida y proyecto final | completas los ejercicios sin copiar y presentas un proyecto operable |

Reglas para conservar la progresión:

1. **Ejecuta en orden.** Los objetos persistentes creados en una sección pueden reutilizarse después.
2. **Distingue preparación de comprensión.** El esquema de la sección 3 contiene una muestra de funciones futuras para evitar reconstruirlo continuamente; cada una vuelve a aparecer con explicación antes de exigirse en un ejercicio.
3. **No optimices todavía.** Hasta la sección 11 busca primero corrección, claridad e integridad. Luego mide.
4. **Usa dos bases si experimentas mucho.** Conserva `rrhh_db` como laboratorio estable y crea otra base para pruebas destructivas.
5. **Registra evidencia.** Guarda consultas, resultados, planes y errores corregidos en un cuaderno o repositorio.

#### Diagnóstico inicial

Si nunca has usado una terminal o SQL, empieza en la sección 1. Si ya puedes crear tablas y escribir joins, comienza en la etapa 3, pero ejecuta primero el laboratorio de la sección 3. Si administras PostgreSQL, usa los puntos de control de las etapas 4–6 para detectar huecos antes de saltar a especialización.

---

## Índice

1. [PostgreSQL, SQL y su arquitectura](#1-postgresql-sql-y-su-arquitectura)
2. [Instalación, conexión y uso de `psql`](#2-instalación-conexión-y-uso-de-psql)
3. [Esquema de práctica](#3-esquema-de-práctica)
4. [Sintaxis, identificadores, `NULL` y conversiones](#4-sintaxis-identificadores-null-y-conversiones)
5. [Tipos de datos de PostgreSQL](#5-tipos-de-datos-de-postgresql)
6. [DDL — definición de estructuras](#6-ddl--definición-de-estructuras)
7. [DML — manipulación de datos](#7-dml--manipulación-de-datos)
8. [DQL — consultas con `SELECT`](#8-dql--consultas-con-select)
9. [Transacciones, MVCC, aislamiento y bloqueos](#9-transacciones-mvcc-aislamiento-y-bloqueos)
10. [DCL — roles, privilegios y seguridad por fila](#10-dcl--roles-privilegios-y-seguridad-por-fila)
11. [Índices, `EXPLAIN` y rendimiento](#11-índices-explain-y-rendimiento)
12. [Vistas y vistas materializadas](#12-vistas-y-vistas-materializadas)
13. [Funciones, procedimientos, bloques y triggers con PL/pgSQL](#13-funciones-procedimientos-bloques-y-triggers-con-plpgsql)
14. [Capacidades avanzadas propias de PostgreSQL](#14-capacidades-avanzadas-propias-de-postgresql)
15. [Catálogos, mantenimiento, respaldo y observabilidad](#15-catálogos-mantenimiento-respaldo-y-observabilidad)
16. [Uso desde aplicaciones y buenas prácticas](#16-uso-desde-aplicaciones-y-buenas-prácticas)
17. [Diferencias importantes entre PostgreSQL y Oracle](#17-diferencias-importantes-entre-postgresql-y-oracle)
18. [PostgreSQL como caché, buscador y base vectorial](#18-postgresql-como-caché-buscador-y-base-vectorial)
19. [Ejercicios prácticos con solución](#19-ejercicios-prácticos-con-solución)
20. [Cheat-sheet de referencia rápida](#20-cheat-sheet-de-referencia-rápida)
21. [Ruta de aprendizaje y fuentes oficiales](#21-ruta-de-aprendizaje-y-fuentes-oficiales)

---

## 1. PostgreSQL, SQL y su arquitectura

### 1.1 ¿Qué es PostgreSQL?

PostgreSQL es un sistema gestor de bases de datos **objeto-relacional**, libre y de código abierto. Implementa gran parte del estándar SQL y añade tipos, operadores, índices y extensiones propios. Destaca por:

- transacciones ACID y concurrencia mediante MVCC;
- tipos enriquecidos como `jsonb`, arrays, rangos, `uuid`, `inet` y tipos definidos por el usuario;
- funciones, procedimientos y triggers en varios lenguajes;
- índices B-tree, Hash, GIN, GiST, SP-GiST y BRIN;
- extensibilidad mediante extensiones como `pg_trgm`, `citext`, PostGIS o `pg_stat_statements`;
- replicación física y lógica, particionamiento y consultas paralelas.

SQL suele agruparse así:

| Grupo | Propósito | Comandos frecuentes |
|---|---|---|
| DDL | Definir estructuras | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `COMMENT` |
| DML | Cambiar filas | `INSERT`, `UPDATE`, `DELETE`, `MERGE` |
| DQL | Consultar filas | `SELECT`, `VALUES`, `TABLE` |
| DCL | Administrar acceso | `GRANT`, `REVOKE`, `CREATE ROLE` |
| TCL | Controlar transacciones | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

La clasificación es pedagógica: la documentación de PostgreSQL organiza los comandos por comportamiento, no exige estas cinco etiquetas.

### 1.2 Servidor, clúster, base de datos, esquema y tabla

Estos nombres no son intercambiables:

```text
Instancia/servidor PostgreSQL
└── clúster (directorio de datos administrado por un proceso postmaster)
    ├── base de datos postgres
    ├── base de datos rrhh_db
    │   ├── esquema public
    │   └── esquema rrhh
    │       ├── tabla empleados
    │       └── vista vw_empleados_detalle
    └── base de datos otra_app
```

- Un **clúster PostgreSQL** es una colección de bases de datos administradas por una misma instancia. No significa necesariamente un clúster distribuido.
- Una **base de datos** es una frontera de conexión. Una consulta normal no hace `JOIN` directo entre dos bases de datos distintas.
- Un **esquema** es un espacio de nombres dentro de una base de datos.
- Un **rol** representa una identidad o grupo de privilegios. Si tiene `LOGIN`, puede iniciar sesión.
- Una **tabla** pertenece a un esquema, no directamente a un usuario.

```sql
-- Nombre calificado: esquema.objeto
SELECT * FROM rrhh.empleados;

-- Base y esquema actuales
SELECT current_database(), current_schema(), current_user;
```

### 1.3 Procesos y memoria: modelo mental mínimo

Un servidor PostgreSQL tradicional usa un proceso principal y, por regla general, un proceso backend por conexión, además de procesos auxiliares:

- `checkpointer` y `background writer`: colaboran en escribir páginas modificadas;
- `walwriter`: escribe el WAL (*Write-Ahead Log*);
- `autovacuum launcher/workers`: recuperan tuplas muertas y actualizan estadísticas;
- procesos de replicación, archivado y ejecución paralela cuando se configuran.

Las páginas de tablas e índices pasan por `shared_buffers`. Los cambios durables se registran primero en WAL. El WAL permite recuperación ante fallos y replicación física.

```sql
-- Información de la conexión y versión
SELECT version();
SELECT inet_server_addr(), inet_server_port(), pg_backend_pid();

-- Ver backends activos (requiere permisos suficientes para ver todos los detalles)
SELECT pid, usename, datname, state, wait_event_type, query
FROM pg_stat_activity
WHERE datname = current_database();
```

### 1.4 MVCC en una frase

**MVCC** (*Multi-Version Concurrency Control*) conserva versiones de las filas para que lectores y escritores interfieran menos. Un `UPDATE` normalmente crea una nueva versión; la anterior queda disponible para transacciones cuyo snapshot todavía pueda verla. `VACUUM` limpia versiones que ya no son visibles para nadie.

```sql
BEGIN;
SELECT txid_current();
UPDATE rrhh.empleados SET salario = salario + 100 WHERE id_empleado = 101;
ROLLBACK;
```

### 1.5 Particularidades frente a “SQL genérico”

- Los identificadores sin comillas se normalizan a **minúsculas**.
- `LIMIT`, `OFFSET` y `FETCH` permiten paginación.
- `RETURNING` devuelve filas modificadas sin otra consulta.
- `INSERT ... ON CONFLICT` implementa UPSERT de forma concisa.
- `DISTINCT ON`, `LATERAL`, `FILTER`, `ILIKE` y `COPY` son herramientas muy útiles.
- DDL es transaccional en la mayoría de los casos: un `CREATE TABLE` puede revertirse.
- Un rol no equivale a un esquema.
- `timestamptz` guarda un instante; la zona de sesión determina cómo se muestra.

---

## 2. Instalación, conexión y uso de `psql`

### 2.1 Levantar PostgreSQL con Docker

Para practicar sin alterar una instalación local:

```bash
docker run --name postgres-guia \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin_segura \
  -e POSTGRES_DB=rrhh_db \
  -p 5432:5432 \
  -d postgres:18
```

Conectarse dentro del contenedor:

```bash
docker exec -it postgres-guia psql -U admin -d rrhh_db
```

Detener e iniciar de nuevo:

```bash
docker stop postgres-guia
docker start postgres-guia
```

> La contraseña es solo para práctica local. En producción usa secretos, TLS y una política de autenticación apropiada.

### 2.2 Cadena de conexión

```bash
# Parámetros separados
psql -h localhost -p 5432 -U admin -d rrhh_db

# URI; evita escribir contraseñas en la línea de comandos o el historial
psql 'postgresql://admin@localhost:5432/rrhh_db?sslmode=prefer'
```

Variables comunes:

```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=admin
export PGDATABASE=rrhh_db
psql
```

Para automatización, usa un gestor de secretos o un archivo `.pgpass` con permisos `0600`; no subas credenciales al repositorio.

### 2.3 Comandos esenciales de `psql`

Los metacomandos empiezan con `\` y **no** terminan en `;`.

| Comando | Acción |
|---|---|
| `\l` | listar bases de datos |
| `\c rrhh_db` | cambiar de base de datos |
| `\dn` | listar esquemas |
| `\dt rrhh.*` | listar tablas del esquema |
| `\d rrhh.empleados` | describir una relación |
| `\d+ rrhh.empleados` | descripción extendida |
| `\du` | listar roles |
| `\df rrhh.*` | listar funciones |
| `\dv rrhh.*` | listar vistas |
| `\di rrhh.*` | listar índices |
| `\x auto` | alternar salida expandida automáticamente |
| `\timing on` | mostrar duración de cada sentencia |
| `\i archivo.sql` | ejecutar un archivo |
| `\copy ...` | importar/exportar desde el equipo cliente |
| `\?` / `\h SELECT` | ayuda de `psql` / ayuda SQL |
| `\q` | salir |

```sql
\conninfo
\pset null '∅'
\timing on
SELECT current_database(), current_user, current_setting('TimeZone');
```

### 2.4 Crear una base y una identidad de práctica

Ejecuta como administrador:

```sql
CREATE ROLE estudiante LOGIN PASSWORD 'cambia_esta_clave';
CREATE DATABASE rrhh_db OWNER estudiante ENCODING 'UTF8';
```

Conecta a la nueva base y crea el esquema:

```sql
\c rrhh_db estudiante
CREATE SCHEMA rrhh AUTHORIZATION estudiante;
ALTER ROLE estudiante IN DATABASE rrhh_db SET search_path = rrhh, public;
```

La opción `search_path` controla dónde busca PostgreSQL un objeto sin esquema explícito:

```sql
SHOW search_path;
SELECT current_schemas(true);
SET search_path TO rrhh, public;
```

En aplicaciones sensibles es preferible usar nombres calificados (`rrhh.empleados`) y un `search_path` controlado.

---

## 3. Esquema de práctica

Esta sección es el **bootstrap del laboratorio**, no un examen de DDL. Encontrarás tipos y cláusulas que todavía no conoces (`IDENTITY`, `jsonb`, arrays, rangos, columnas generadas y claves foráneas). Ejecútalo completo y verifica el resultado; no necesitas entenderlo línea por línea todavía.

Los conceptos se desbloquean después en este orden:

| Construcción del laboratorio | Se explica en |
|---|---:|
| tipos, literales y conversiones | 4–5 |
| `IDENTITY`, tablas, constraints y foreign keys | 6 |
| inserciones, cambios y `RETURNING` | 7 |
| consultas, joins, CTE y ventanas | 8 |
| JSONB, arrays y rangos en profundidad | 14 |

### 3.1 Modelo

```text
puestos 1 ─────── N empleados N ─────── 1 departamentos
                         │                       │
                         │ jefe/subordinado      └── 1 ── N proyectos
                         │
                         N
                         │
                  empleado_proyecto
                         │
                         N
                         │
                     proyectos
```

Se incluyen una relación N:M, una autorrelación, JSONB, arrays, columnas generadas e intervalos de fechas.

### 3.2 Crear tablas

Ejecuta todo el bloque en orden:

```sql
CREATE SCHEMA IF NOT EXISTS rrhh;
SET search_path TO rrhh, public;

CREATE TABLE departamentos (
    id_departamento integer GENERATED ALWAYS AS IDENTITY,
    nombre           varchar(80) NOT NULL,
    ubicacion        varchar(120),
    presupuesto      numeric(14,2) NOT NULL DEFAULT 0,
    activo           boolean NOT NULL DEFAULT true,
    CONSTRAINT pk_departamentos PRIMARY KEY (id_departamento),
    CONSTRAINT uq_departamentos_nombre UNIQUE (nombre),
    CONSTRAINT ck_departamentos_presupuesto CHECK (presupuesto >= 0)
);

CREATE TABLE puestos (
    id_puesto      integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo         varchar(80) NOT NULL UNIQUE,
    salario_minimo numeric(12,2) NOT NULL,
    salario_maximo numeric(12,2) NOT NULL,
    CONSTRAINT ck_puestos_salarios
        CHECK (salario_minimo >= 0 AND salario_maximo >= salario_minimo)
);

CREATE TABLE empleados (
    id_empleado       bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombres           varchar(60) NOT NULL,
    apellidos         varchar(80) NOT NULL,
    email             varchar(254) NOT NULL UNIQUE,
    telefono          varchar(25),
    fecha_contratacion date NOT NULL DEFAULT current_date,
    salario           numeric(12,2) NOT NULL CHECK (salario > 0),
    id_puesto         integer NOT NULL REFERENCES puestos(id_puesto),
    id_departamento   integer REFERENCES departamentos(id_departamento)
        ON UPDATE CASCADE ON DELETE SET NULL,
    id_jefe           bigint REFERENCES empleados(id_empleado)
        ON DELETE SET NULL,
    habilidades       text[] NOT NULL DEFAULT '{}',
    preferencias      jsonb NOT NULL DEFAULT '{}'::jsonb,
    nombre_completo   text GENERATED ALWAYS AS (nombres || ' ' || apellidos) STORED,
    creado_en         timestamptz NOT NULL DEFAULT current_timestamp,
    actualizado_en    timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TABLE proyectos (
    id_proyecto     bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre          varchar(120) NOT NULL,
    periodo         daterange NOT NULL,
    presupuesto     numeric(14,2) NOT NULL CHECK (presupuesto >= 0),
    estado          varchar(20) NOT NULL DEFAULT 'planeado',
    id_departamento integer NOT NULL REFERENCES departamentos(id_departamento),
    etiquetas       text[] NOT NULL DEFAULT '{}',
    metadatos       jsonb NOT NULL DEFAULT '{}'::jsonb,
    CONSTRAINT ck_proyectos_estado
        CHECK (estado IN ('planeado', 'activo', 'pausado', 'finalizado')),
    CONSTRAINT ck_proyectos_periodo CHECK (NOT isempty(periodo))
);

CREATE TABLE empleado_proyecto (
    id_empleado     bigint REFERENCES empleados(id_empleado) ON DELETE CASCADE,
    id_proyecto     bigint REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
    rol             varchar(60) NOT NULL,
    horas_asignadas numeric(6,2) NOT NULL DEFAULT 0 CHECK (horas_asignadas >= 0),
    asignado_en     timestamptz NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id_empleado, id_proyecto)
);

COMMENT ON TABLE empleados IS 'Personal activo e histórico de la organización';
COMMENT ON COLUMN empleados.preferencias IS 'Preferencias no sensibles en formato JSONB';
```

### 3.3 Insertar datos coherentes

`OVERRIDING SYSTEM VALUE` permite fijar IDs en columnas `GENERATED ALWAYS` durante la carga controlada:

```sql
INSERT INTO departamentos
    (id_departamento, nombre, ubicacion, presupuesto)
OVERRIDING SYSTEM VALUE
VALUES
    (10, 'Tecnología', 'Ciudad de México', 2500000),
    (20, 'Ventas',     'Guadalajara',      1800000),
    (30, 'Finanzas',   'Monterrey',        1200000),
    (40, 'Personas',   'Remoto',            900000);

INSERT INTO puestos
    (id_puesto, titulo, salario_minimo, salario_maximo)
OVERRIDING SYSTEM VALUE
VALUES
    (1, 'Dirección',            80000, 150000),
    (2, 'Desarrollo de software',35000,  85000),
    (3, 'Análisis de datos',     32000,  75000),
    (4, 'Ejecutivo de ventas',   25000,  70000),
    (5, 'Contabilidad',          28000,  65000),
    (6, 'Recursos humanos',      28000,  65000);

INSERT INTO empleados
    (id_empleado, nombres, apellidos, email, fecha_contratacion, salario,
     id_puesto, id_departamento, habilidades, preferencias)
OVERRIDING SYSTEM VALUE
VALUES
    (100, 'Elena',  'Torres',   'elena.torres@empresa.test',  DATE '2018-02-12', 98000, 1, 10,
     ARRAY['liderazgo','arquitectura'], '{"idioma":"es","remoto":true}'),
    (101, 'Ana',    'García',   'ana.garcia@empresa.test',    DATE '2021-05-10', 62000, 2, 10,
     ARRAY['postgresql','java'], '{"tema":"oscuro","idioma":"es"}'),
    (102, 'Luis',   'Pérez',    'luis.perez@empresa.test',    DATE '2022-09-01', 54000, 2, 10,
     ARRAY['python','docker'],   '{"tema":"claro","remoto":true}'),
    (103, 'Marta',  'Sánchez',  'marta.sanchez@empresa.test', DATE '2020-01-20', 58000, 4, 20,
     ARRAY['negociación','crm'], '{"idioma":"es"}'),
    (104, 'Carlos', 'Ruiz',     'carlos.ruiz@empresa.test',   DATE '2023-03-15', 41000, 5, 30,
     ARRAY['excel','finanzas'],  '{}'),
    (105, 'Sofía',  'López',    'sofia.lopez@empresa.test',   DATE '2024-06-03', 39000, 6, 40,
     ARRAY['reclutamiento'],     '{"remoto":true}'),
    (106, 'Diego',  'Martínez', 'diego.martinez@empresa.test',DATE '2025-02-17', 62000, 3, 10,
     ARRAY['sql','estadística'], '{"idioma":"en"}');

UPDATE empleados
SET id_jefe = CASE
    WHEN id_empleado IN (101, 102, 106) THEN 100
    ELSE NULL
END;

INSERT INTO proyectos
    (id_proyecto, nombre, periodo, presupuesto, estado, id_departamento, etiquetas, metadatos)
OVERRIDING SYSTEM VALUE
VALUES
    (1000, 'Migración PostgreSQL', daterange(DATE '2025-01-01', DATE '2025-10-01', '[)'),
     700000, 'activo', 10, ARRAY['datos','infraestructura'], '{"prioridad":1}'),
    (1001, 'Portal de clientes', daterange(DATE '2025-04-01', DATE '2026-01-01', '[)'),
     450000, 'activo', 10, ARRAY['web','clientes'], '{"prioridad":2}'),
    (1002, 'Expansión occidente', daterange(DATE '2025-02-01', DATE '2025-12-01', '[)'),
     600000, 'planeado', 20, ARRAY['ventas'], '{"prioridad":2}'),
    (1003, 'Cierre anual', daterange(DATE '2025-10-01', DATE '2026-02-01', '[)'),
     180000, 'planeado', 30, ARRAY['finanzas'], '{"prioridad":3}');

INSERT INTO empleado_proyecto (id_empleado, id_proyecto, rol, horas_asignadas)
VALUES
    (100, 1000, 'Patrocinadora',  40),
    (101, 1000, 'Líder técnico', 320),
    (102, 1000, 'Desarrollo',    280),
    (106, 1000, 'Análisis',      220),
    (101, 1001, 'Arquitectura',  160),
    (102, 1001, 'Desarrollo',    300),
    (103, 1002, 'Responsable',   260),
    (104, 1003, 'Contabilidad',  180);

-- Sincroniza las secuencias después de cargar IDs manuales.
SELECT setval(pg_get_serial_sequence('rrhh.departamentos', 'id_departamento'),
              (SELECT max(id_departamento) FROM departamentos));
SELECT setval(pg_get_serial_sequence('rrhh.puestos', 'id_puesto'),
              (SELECT max(id_puesto) FROM puestos));
SELECT setval(pg_get_serial_sequence('rrhh.empleados', 'id_empleado'),
              (SELECT max(id_empleado) FROM empleados));
SELECT setval(pg_get_serial_sequence('rrhh.proyectos', 'id_proyecto'),
              (SELECT max(id_proyecto) FROM proyectos));
```

### 3.4 Verificación

```sql
SELECT 'departamentos' AS tabla, count(*) FROM departamentos
UNION ALL SELECT 'puestos', count(*) FROM puestos
UNION ALL SELECT 'empleados', count(*) FROM empleados
UNION ALL SELECT 'proyectos', count(*) FROM proyectos
UNION ALL SELECT 'asignaciones', count(*) FROM empleado_proyecto;
```

Resultado esperado:

```text
departamentos  4
puestos        6
empleados      7
proyectos      4
asignaciones   8
```

**Punto de control de la etapa 0:** ejecuta `\dt rrhh.*`, describe `rrhh.empleados` con `\d rrhh.empleados` y explica con tus palabras la diferencia entre base de datos, esquema y tabla. Si los conteos no coinciden, corrige el laboratorio antes de avanzar.

---

## 4. Sintaxis, identificadores, `NULL` y conversiones

### 4.1 Sentencias, comentarios y literales

```sql
-- Comentario de una línea
SELECT 'Hola PostgreSQL' AS mensaje; /* comentario de bloque */

SELECT 42 AS entero,
       12.50 AS decimal,
       true AS booleano,
       DATE '2026-08-12' AS fecha,
       TIMESTAMPTZ '2026-08-12 10:00:00-06' AS instante;
```

Las cadenas usan comillas simples. Las comillas dobles delimitan **identificadores**, no texto.

```sql
SELECT 'Ana' AS nombre;       -- texto
SELECT "nombres" FROM empleados; -- identificador; aquí las comillas son innecesarias
```

Los bloques *dollar-quoted* evitan escapar comillas dentro de funciones o texto largo:

```sql
SELECT $$Texto con 'comillas simples' sin escapar$$;
SELECT $json${"clave":"valor"}$json$::jsonb;
```

### 4.2 Identificadores y mayúsculas

```sql
CREATE TABLE ejemplo_normal (MiColumna integer);
-- PostgreSQL realmente crea ejemplo_normal.micolumna.

CREATE TABLE "EjemploIncómodo" ("MiColumna" integer);
SELECT "MiColumna" FROM "EjemploIncómodo"; -- obliga a repetir mayúsculas y comillas
```

Regla práctica: usa `snake_case`, minúsculas y nombres sin comillas.

### 4.3 `NULL` y lógica de tres valores

`NULL` significa “valor desconocido/ausente”, no cero ni cadena vacía. Una comparación con `NULL` suele producir `UNKNOWN`, no `TRUE`.

```sql
SELECT * FROM empleados WHERE telefono IS NULL;
SELECT * FROM empleados WHERE telefono IS NOT NULL;

-- Incorrecto: telefono = NULL nunca es TRUE.
SELECT * FROM empleados WHERE telefono = NULL;
```

Operadores y funciones útiles:

```sql
SELECT nombres,
       COALESCE(telefono, 'Sin teléfono') AS contacto,
       NULLIF(salario, 0) AS salario_no_cero
FROM empleados;

-- Comparación que trata dos NULL como iguales.
SELECT NULL IS NOT DISTINCT FROM NULL AS resultado; -- true
SELECT 10 IS DISTINCT FROM NULL AS resultado;       -- true
```

La trampa de `NOT IN`:

```sql
-- Si la subconsulta devuelve un NULL, el predicado puede no devolver ninguna fila.
SELECT e.*
FROM empleados e
WHERE NOT EXISTS (
    SELECT 1 FROM empleado_proyecto ep WHERE ep.id_empleado = e.id_empleado
);
```

Prefiere `NOT EXISTS` cuando la lista comparada puede contener nulos.

### 4.4 Operadores y precedencia

```sql
SELECT *
FROM empleados
WHERE (id_departamento = 10 OR id_departamento = 20)
  AND salario >= 50000;

SELECT 2 + 3 * 4 AS catorce,
       (2 + 3) * 4 AS veinte,
       'Postgre' || 'SQL' AS concatenado;
```

Usa paréntesis cuando mezcles `AND` y `OR`; facilita la revisión y evita depender de memoria sobre precedencia.

### 4.5 Conversión de tipos

PostgreSQL ofrece sintaxis estándar `CAST` y el atajo `::`:

```sql
SELECT CAST('42' AS integer),
       '42'::integer,
       42::numeric(10,2),
       current_date::text;
```

Conversión y formato no son lo mismo:

```sql
SELECT to_date('31/12/2026', 'DD/MM/YYYY');
SELECT to_timestamp('2026-12-31 23:15', 'YYYY-MM-DD HH24:MI');
SELECT to_char(current_timestamp, 'YYYY-MM-DD HH24:MI:SS TZ');
SELECT to_char(1234567.89, 'FM999G999G999D00');
SELECT to_number('1.234,56', '9G999D99'); -- depende de configuración regional para G/D
```

Para constantes de fecha usa literales tipados; para parámetros de una aplicación, deja que el driver envíe el tipo correcto.

---

## 5. Tipos de datos de PostgreSQL

Elegir el tipo correcto expresa reglas, ahorra conversiones y permite operadores e índices especializados.

### 5.1 Enteros, exactos y punto flotante

| Tipo | Tamaño/uso | Ejemplo |
|---|---|---|
| `smallint` | entero de 2 bytes | contadores pequeños |
| `integer` | entero de 4 bytes | IDs y cantidades comunes |
| `bigint` | entero de 8 bytes | IDs de alto volumen |
| `numeric(p,s)` / `decimal` | precisión exacta | dinero y cálculos contables |
| `real` | flotante de 4 bytes | aproximaciones |
| `double precision` | flotante de 8 bytes | cálculos científicos |

```sql
CREATE TABLE demo_numeros (
    cantidad integer CHECK (cantidad >= 0),
    importe  numeric(12,2),
    medicion double precision
);

INSERT INTO demo_numeros VALUES (3, 1250.45, 0.1);
SELECT importe * cantidad AS total FROM demo_numeros;
```

`numeric(5,2)` admite cinco dígitos totales, dos decimales: hasta `999.99`. `numeric` sin precisión admite números muy grandes, con más costo que enteros o flotantes.

```sql
SELECT 10 / 4 AS division_entera,       -- 2
       10::numeric / 4 AS division_real; -- 2.5
```

Evita `money` para modelos portables: su visualización depende de `lc_monetary` y tiene menos flexibilidad que `numeric`.

### 5.2 Identidades y secuencias

La forma estándar moderna es `IDENTITY`:

```sql
CREATE TABLE demo_identity (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    detalle text NOT NULL
);

INSERT INTO demo_identity (detalle) VALUES ('Generado') RETURNING id;
```

- `GENERATED ALWAYS`: PostgreSQL controla el valor; un valor manual requiere `OVERRIDING SYSTEM VALUE`.
- `GENERATED BY DEFAULT`: permite reemplazarlo con un valor explícito.
- `serial`/`bigserial` son atajos históricos que crean una secuencia; siguen funcionando, pero `IDENTITY` expresa mejor la intención y la dependencia.

Secuencia independiente:

```sql
CREATE SEQUENCE folio_factura START 10000 INCREMENT 1 CACHE 20;
SELECT nextval('folio_factura');
SELECT currval('folio_factura'); -- exige haber llamado nextval en esta sesión
```

Las secuencias **no son transaccionales**: un `ROLLBACK` no reutiliza necesariamente el número consumido. Los huecos son normales; no las uses para numeración legal sin diseñar ese requisito aparte.

### 5.3 Texto

| Tipo | Comportamiento |
|---|---|
| `text` | longitud variable sin límite declarado |
| `varchar(n)` | longitud variable con límite de caracteres |
| `varchar` | equivalente práctico a `text` |
| `char(n)` | rellena con espacios; rara vez conviene |

```sql
CREATE TABLE demo_texto (
    codigo char(2),
    titulo varchar(100),
    contenido text
);

SELECT length('áéí'), octet_length('áéí');
-- length cuenta caracteres; octet_length cuenta bytes en la codificación.
```

No hay ventaja de rendimiento general al usar `varchar(255)` en vez de `text`. Declara límite cuando sea una regla del dominio, no por costumbre heredada.

```sql
SELECT upper(nombres), lower(apellidos), initcap(nombre_completo),
       left(nombres, 2), substring(apellidos FROM 1 FOR 3),
       trim('  texto  '), replace(email, '@empresa.test', '@nueva.test'),
       format('%s gana %s', nombre_completo, salario)
FROM empleados;
```

### 5.4 Booleanos

```sql
CREATE TABLE demo_booleano (
    publicado boolean DEFAULT false
);

INSERT INTO demo_booleano VALUES (true), (false), (NULL);
SELECT * FROM demo_booleano WHERE publicado;         -- true
SELECT * FROM demo_booleano WHERE NOT publicado;     -- false
SELECT * FROM demo_booleano WHERE publicado IS NULL; -- desconocido
```

En entrada PostgreSQL acepta variantes como `true/false`, `yes/no`, `on/off` y `1/0`; en scripts claros prefiere `true` y `false`.

### 5.5 Fecha, hora, zona e intervalos

| Tipo | Qué representa |
|---|---|
| `date` | fecha de calendario |
| `time` | hora sin fecha ni zona |
| `timestamp` | fecha y hora civil, sin zona |
| `timestamptz` | un instante, normalizado internamente y mostrado en la zona de sesión |
| `interval` | duración en meses, días y microsegundos |

```sql
SHOW TimeZone;
SET TIME ZONE 'America/Mexico_City';

SELECT current_date,
       current_time,
       current_timestamp,
       statement_timestamp(),
       clock_timestamp();
```

`current_timestamp` permanece estable dentro de la transacción; `clock_timestamp()` refleja el reloj real en cada llamada.

```sql
SELECT DATE '2026-01-31' + 7 AS una_semana_despues,
       TIMESTAMPTZ '2026-08-12 10:00 America/Mexico_City' AT TIME ZONE 'UTC',
       age(current_date, DATE '2021-05-10'),
       current_timestamp + INTERVAL '2 hours 30 minutes';

SELECT date_trunc('month', creado_en) AS mes,
       extract(year FROM fecha_contratacion) AS anio
FROM empleados;
```

Usa `timestamptz` para eventos reales (creación, pago, inicio de sesión) y `timestamp` para datos civiles sin instante universal (por ejemplo, “todos los días a las 09:00” si la zona se gestiona aparte).

### 5.6 `uuid`

```sql
CREATE TABLE sesiones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    creado_en timestamptz NOT NULL DEFAULT current_timestamp
);

INSERT INTO sesiones DEFAULT VALUES RETURNING *;
```

`gen_random_uuid()` genera UUID v4 en versiones actuales. PostgreSQL 18 también incorpora `uuidv7()` para UUID ordenables por tiempo; úsalo solo si tu versión lo ofrece:

```sql
SELECT uuidv7(); -- PostgreSQL 18+
```

### 5.7 Binarios

`bytea` guarda bytes dentro de la base:

```sql
CREATE TABLE archivos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre text NOT NULL,
    contenido bytea NOT NULL,
    hash_sha256 text
);

INSERT INTO archivos (nombre, contenido)
VALUES ('saludo.txt', convert_to('hola', 'UTF8'));

SELECT nombre, octet_length(contenido), encode(contenido, 'hex') FROM archivos;
```

Para objetos muy grandes también existe la interfaz de *large objects*, pero suele ser más sencillo almacenar archivos en un servicio de objetos y guardar en PostgreSQL metadatos, hash y ubicación.

### 5.8 `json` y `jsonb`

- `json` conserva el texto de entrada y valida que sea JSON.
- `jsonb` almacena una representación binaria procesada, elimina claves duplicadas y permite indexación GIN. Es la elección habitual para consultar contenido.

```sql
SELECT preferencias->'tema' AS valor_json,
       preferencias->>'tema' AS valor_texto
FROM empleados;

SELECT nombre_completo
FROM empleados
WHERE preferencias @> '{"remoto": true}'::jsonb;

UPDATE empleados
SET preferencias = jsonb_set(
        preferencias,
        '{notificaciones}',
        coalesce(preferencias->'notificaciones', '{}'::jsonb)
            || '{"email":true}'::jsonb,
        true
    )
WHERE id_empleado = 101;
```

JSONB no sustituye automáticamente un buen modelo relacional. Usa columnas y claves foráneas para atributos estables que necesiten integridad, joins o restricciones; usa JSONB para atributos flexibles.

### 5.9 Arrays

```sql
SELECT nombre_completo
FROM empleados
WHERE 'postgresql' = ANY(habilidades);

SELECT nombre_completo
FROM empleados
WHERE habilidades @> ARRAY['sql'];

SELECT e.nombre_completo, h.habilidad
FROM empleados e
CROSS JOIN LATERAL unnest(e.habilidades) AS h(habilidad);

UPDATE empleados
SET habilidades = array_append(habilidades, 'linux')
WHERE id_empleado = 102;
```

Los arrays son buenos para listas pequeñas tratadas como un solo atributo. Si cada elemento necesita atributos, relaciones o integridad referencial, crea una tabla hija.

### 5.10 Tipos enumerados y dominios

Enum:

```sql
CREATE TYPE prioridad_proyecto AS ENUM ('baja', 'media', 'alta', 'critica');

CREATE TABLE tareas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo text NOT NULL,
    prioridad prioridad_proyecto NOT NULL DEFAULT 'media'
);

INSERT INTO tareas (titulo, prioridad) VALUES ('Restaurar respaldo', 'critica');
```

Los enum son ordenados y seguros por tipo, pero cambiar o retirar valores requiere planeación. Una tabla catálogo es más flexible cuando los valores tienen atributos o cambian frecuentemente.

Dominio reutilizable:

```sql
CREATE DOMAIN email_corporativo AS text
CHECK (VALUE ~* '^[A-Z0-9._%+-]+@empresa\.test$');

CREATE TABLE contactos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email email_corporativo NOT NULL
);
```

### 5.11 Rangos y multirangos

PostgreSQL incluye `int4range`, `int8range`, `numrange`, `daterange`, `tsrange` y `tstzrange`.

```sql
SELECT daterange(DATE '2026-01-01', DATE '2026-02-01', '[)')
       @> DATE '2026-01-31' AS contiene;

SELECT nombre
FROM proyectos
WHERE periodo && daterange(DATE '2025-09-01', DATE '2025-11-01', '[)');
```

`[)` significa límite inferior incluido y superior excluido. Este convenio facilita rangos consecutivos sin solapamiento.

```sql
SELECT int4range(1, 5, '[)') * int4range(3, 8, '[)') AS interseccion;
-- [3,5)
```

### 5.12 Red, búsqueda de texto, XML y tipos compuestos

```sql
SELECT '192.168.1.15/24'::inet << '192.168.0.0/16'::cidr AS pertenece;
SELECT '08:00:2b:01:02:03'::macaddr;

SELECT to_tsvector('spanish', 'PostgreSQL ofrece búsqueda de texto')
       @@ plainto_tsquery('spanish', 'búsqueda texto') AS coincide;

SELECT xmlparse(document '<persona><nombre>Ana</nombre></persona>');

CREATE TYPE direccion AS (
    calle text,
    ciudad text,
    codigo_postal text
);
SELECT ROW('Reforma 100', 'CDMX', '06600')::direccion;
```

Los tipos geométricos (`point`, `polygon`, etc.) existen en el núcleo; para GIS real normalmente se usa la extensión PostGIS.

**Punto de control de la etapa 1:** diseña las columnas de un producto con precio, disponibilidad, fecha de publicación, etiquetas y atributos flexibles. Justifica por qué cada columna usa `numeric`, `boolean`, `timestamptz`, array o JSONB; después demuestra la diferencia entre `= NULL`, `IS NULL` e `IS NOT DISTINCT FROM NULL`.

---
## 6. DDL — definición de estructuras

DDL cambia objetos: esquemas, tablas, columnas, restricciones, índices, secuencias y vistas. A diferencia de Oracle, gran parte del DDL de PostgreSQL es **transaccional**.

```sql
BEGIN;
CREATE TABLE prueba_reversible (id integer);
ROLLBACK;
-- La tabla ya no existe.
```

Hay excepciones: `CREATE DATABASE`, `DROP DATABASE`, ciertas operaciones concurrentes y algunos comandos administrativos no pueden ejecutarse dentro de un bloque de transacción.

### 6.1 `CREATE SCHEMA` y `CREATE TABLE`

```sql
CREATE SCHEMA inventario AUTHORIZATION estudiante;

CREATE TABLE inventario.productos (
    id_producto bigint GENERATED ALWAYS AS IDENTITY,
    sku         text NOT NULL,
    nombre      text NOT NULL,
    precio      numeric(12,2) NOT NULL DEFAULT 0,
    existencia  integer NOT NULL DEFAULT 0,
    activo      boolean NOT NULL DEFAULT true,
    creado_en   timestamptz NOT NULL DEFAULT current_timestamp,
    CONSTRAINT pk_productos PRIMARY KEY (id_producto),
    CONSTRAINT uq_productos_sku UNIQUE (sku),
    CONSTRAINT ck_productos_precio CHECK (precio >= 0),
    CONSTRAINT ck_productos_existencia CHECK (existencia >= 0)
);
```

Crear desde una consulta:

```sql
CREATE TABLE rrhh.empleados_tecnologia AS
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
WHERE id_departamento = 10;

-- WITH NO DATA copia la forma del resultado sin copiar filas.
CREATE TABLE rrhh.resumen_vacio AS
SELECT id_departamento, count(*) AS total
FROM rrhh.empleados
GROUP BY id_departamento
WITH NO DATA;
```

`CREATE TABLE ... AS` no copia automáticamente todas las restricciones, índices o defaults de la tabla original.

Copiar estructura con `LIKE`:

```sql
CREATE TABLE rrhh.empleados_archivo
(LIKE rrhh.empleados INCLUDING DEFAULTS INCLUDING CONSTRAINTS);
```

Aquí no se copiaron `IDENTITY` ni la expresión generada: las columnas correspondientes quedan como columnas normales, lo que permite archivar sus valores. `INCLUDING ALL` incluye todas las opciones disponibles, pero los índices nuevos son copias independientes y una secuencia usada por un default puede seguir compartida. Revisa el resultado con `\d+`.

### 6.2 Restricciones

| Restricción | Regla |
|---|---|
| `NOT NULL` | exige un valor no nulo |
| `CHECK` | exige que una expresión no sea falsa |
| `UNIQUE` | evita combinaciones duplicadas |
| `PRIMARY KEY` | identifica la fila: `UNIQUE` + `NOT NULL` |
| `FOREIGN KEY` | exige una clave correspondiente en otra tabla |
| `EXCLUDE` | impide conflictos definidos por operadores |

Clave primaria compuesta:

```sql
CREATE TABLE rrhh.certificacion_empleado (
    id_empleado bigint REFERENCES rrhh.empleados ON DELETE CASCADE,
    codigo text,
    obtenida_el date NOT NULL,
    PRIMARY KEY (id_empleado, codigo)
);
```

Unicidad y nulos:

```sql
CREATE TABLE demo_unico (
    codigo text UNIQUE, -- admite varios NULL por defecto
    alias  text UNIQUE NULLS NOT DISTINCT -- solo admite un NULL (PostgreSQL 15+)
);
```

Un `CHECK` acepta `TRUE` o `NULL`; si la columna debe existir, añade `NOT NULL`.

```sql
CREATE TABLE demo_check (
    inicio date NOT NULL,
    fin date,
    CHECK (fin IS NULL OR fin >= inicio)
);
```

Acciones de clave foránea:

```sql
CREATE TABLE rrhh.documentos_empleado (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empleado bigint NOT NULL,
    nombre text NOT NULL,
    CONSTRAINT fk_documento_empleado
        FOREIGN KEY (id_empleado)
        REFERENCES rrhh.empleados(id_empleado)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
```

- `NO ACTION` es el comportamiento predeterminado; puede diferirse si la restricción es diferible.
- `RESTRICT` impide la acción inmediatamente.
- `CASCADE` propaga actualización o borrado.
- `SET NULL` / `SET DEFAULT` reemplaza la referencia.

Restricciones diferibles:

```sql
ALTER TABLE rrhh.empleados
    DROP CONSTRAINT empleados_id_jefe_fkey,
    ADD CONSTRAINT fk_empleados_jefe
    FOREIGN KEY (id_jefe) REFERENCES rrhh.empleados(id_empleado)
    DEFERRABLE INITIALLY IMMEDIATE;

BEGIN;
SET CONSTRAINTS fk_empleados_jefe DEFERRED;
-- La FK se comprobará al COMMIT, útil para cambios relacionados en distinto orden.
COMMIT;
```

### 6.3 `ALTER TABLE`

```sql
ALTER TABLE rrhh.empleados ADD COLUMN biografia text;
ALTER TABLE rrhh.empleados ALTER COLUMN biografia SET DEFAULT 'Sin biografía';
ALTER TABLE rrhh.empleados ALTER COLUMN biografia DROP DEFAULT;
ALTER TABLE rrhh.empleados RENAME COLUMN biografia TO resumen_profesional;

ALTER TABLE rrhh.empleados
    ADD CONSTRAINT ck_email_no_vacio CHECK (length(trim(email)) > 0) NOT VALID;

-- Valida filas existentes después, con un bloqueo menos invasivo que crearla ya validada.
ALTER TABLE rrhh.empleados VALIDATE CONSTRAINT ck_email_no_vacio;
```

Cambiar tipo con transformación explícita:

```sql
CREATE TABLE demo_conversion (valor text);
INSERT INTO demo_conversion VALUES ('10'), ('20');

ALTER TABLE demo_conversion
ALTER COLUMN valor TYPE integer USING valor::integer;
```

Agregar `NOT NULL` con seguridad:

```sql
UPDATE rrhh.empleados
SET resumen_profesional = 'Pendiente'
WHERE resumen_profesional IS NULL;

ALTER TABLE rrhh.empleados
ALTER COLUMN resumen_profesional SET NOT NULL;
```

En tablas grandes, un cambio de tipo o un default volátil puede reescribir la tabla y bloquear. Mide en un entorno realista y planifica migraciones en pasos.

### 6.4 Columnas generadas

```sql
CREATE TABLE lineas_factura (
    cantidad integer NOT NULL CHECK (cantidad > 0),
    precio_unitario numeric(12,2) NOT NULL,
    subtotal numeric(14,2)
        GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);

INSERT INTO lineas_factura (cantidad, precio_unitario)
VALUES (3, 125.50)
RETURNING *;
```

No se inserta ni actualiza directamente una columna generada. Su expresión solo puede usar datos de la fila y funciones permitidas como inmutables. PostgreSQL 18 también admite columnas generadas `VIRTUAL`; `STORED` mantiene compatibilidad con versiones anteriores.

### 6.5 Tablas temporales y no registradas

```sql
CREATE TEMP TABLE tmp_nomina (
    id_departamento integer,
    total numeric
) ON COMMIT DROP;

INSERT INTO tmp_nomina
SELECT id_departamento, sum(salario)
FROM rrhh.empleados
GROUP BY id_departamento;
```

Opciones temporales:

- `ON COMMIT PRESERVE ROWS`: conserva filas hasta terminar la sesión (predeterminado).
- `ON COMMIT DELETE ROWS`: vacía al confirmar.
- `ON COMMIT DROP`: elimina la tabla al confirmar.

Una tabla `UNLOGGED` evita WAL para sus datos y puede acelerar cargas, pero no es segura ante fallos y no se replica físicamente a standbys:

```sql
CREATE UNLOGGED TABLE staging_importacion (
    codigo text,
    datos jsonb
);
```

### 6.6 Particionamiento declarativo

Una tabla particionada distribuye filas en particiones por `RANGE`, `LIST` o `HASH`.

```sql
CREATE TABLE auditoria_eventos (
    id bigint GENERATED BY DEFAULT AS IDENTITY,
    ocurrido_en timestamptz NOT NULL,
    tipo text NOT NULL,
    datos jsonb NOT NULL
) PARTITION BY RANGE (ocurrido_en);

CREATE TABLE auditoria_eventos_2026_01
PARTITION OF auditoria_eventos
FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE auditoria_eventos_default
PARTITION OF auditoria_eventos DEFAULT;

INSERT INTO auditoria_eventos (ocurrido_en, tipo, datos)
VALUES ('2026-01-15 10:00-06', 'login', '{"usuario":101}');
```

El optimizador puede aplicar *partition pruning* y leer solo particiones relevantes:

```sql
EXPLAIN
SELECT * FROM auditoria_eventos
WHERE ocurrido_en >= '2026-01-10'
  AND ocurrido_en <  '2026-01-11';
```

Particionar no reemplaza indexar ni mejora todo por sí mismo. Conviene para tablas grandes con poda clara, mantenimiento por segmentos o retención por fechas.

### 6.7 `TRUNCATE`, `DROP` y dependencias

```sql
TRUNCATE TABLE rrhh.empleados_archivo;
TRUNCATE TABLE lineas_factura RESTART IDENTITY;

DROP TABLE IF EXISTS rrhh.resumen_vacio;
DROP SCHEMA IF EXISTS inventario CASCADE;
```

| Operación | Efecto | Transaccional en PostgreSQL |
|---|---|---|
| `DELETE` | borra filas seleccionadas, dispara triggers por fila | sí |
| `TRUNCATE` | vacía rápido, toma bloqueo fuerte, puede reiniciar identidades | sí |
| `DROP` | elimina objeto y, con `CASCADE`, dependientes | sí en casos normales |

Usa `CASCADE` solo tras revisar dependencias:

```sql
SELECT pg_describe_object(classid, objid, objsubid) AS dependiente,
       deptype
FROM pg_depend
WHERE refobjid = 'rrhh.empleados'::regclass;
```

### 6.8 Comentarios, renombrado y propiedad

```sql
COMMENT ON TABLE rrhh.proyectos IS 'Portafolio de proyectos internos';
COMMENT ON COLUMN rrhh.proyectos.periodo IS 'Rango [inicio, fin)';

ALTER TABLE rrhh.certificacion_empleado RENAME TO empleado_certificacion;
ALTER TABLE rrhh.empleado_certificacion OWNER TO estudiante;
```

Consultar comentarios:

```sql
SELECT obj_description('rrhh.proyectos'::regclass, 'pg_class');
SELECT col_description('rrhh.proyectos'::regclass, 2);
```

---

## 7. DML — manipulación de datos

### 7.1 `INSERT`

Una fila:

```sql
INSERT INTO rrhh.departamentos (nombre, ubicacion, presupuesto)
VALUES ('Legal', 'Ciudad de México', 750000);
```

Varias filas:

```sql
INSERT INTO rrhh.tareas (titulo, prioridad)
VALUES ('Revisar índices', 'alta'),
       ('Actualizar estadísticas', 'media'),
       ('Probar restauración', 'critica');
```

Desde una consulta:

```sql
INSERT INTO rrhh.empleados_archivo
SELECT * FROM rrhh.empleados
WHERE id_departamento = 10;
```

Valores predeterminados:

```sql
INSERT INTO sesiones DEFAULT VALUES RETURNING *;

INSERT INTO rrhh.departamentos (nombre, ubicacion, presupuesto, activo)
VALUES ('Innovación', DEFAULT, DEFAULT, DEFAULT);
```

### 7.2 `RETURNING`

Evita una segunda consulta y no tiene condición de carrera para recuperar el resultado de la misma sentencia:

```sql
INSERT INTO rrhh.departamentos (nombre, presupuesto)
VALUES ('Operaciones', 1000000)
RETURNING id_departamento, nombre, activo;

UPDATE rrhh.empleados
SET salario = salario * 1.03,
    actualizado_en = current_timestamp
WHERE id_departamento = 10
RETURNING id_empleado, nombre_completo, salario;

DELETE FROM rrhh.tareas
WHERE prioridad = 'baja'
RETURNING *;
```

Desde PostgreSQL 18, `RETURNING` también puede referirse explícitamente a imágenes `old` y `new`; para compatibilidad con 15–17 usa triggers, un CTE modificador o devuelve el valor final normal.

### 7.3 `UPDATE`

```sql
UPDATE rrhh.empleados
SET salario = salario + 2500,
    actualizado_en = current_timestamp
WHERE id_empleado = 104;
```

Actualizar usando otra tabla con `FROM`:

```sql
CREATE TEMP TABLE ajustes_salario (
    id_empleado bigint PRIMARY KEY,
    porcentaje numeric(5,2) NOT NULL
);
INSERT INTO ajustes_salario VALUES (101, 5), (102, 3);

UPDATE rrhh.empleados AS e
SET salario = round(e.salario * (1 + a.porcentaje / 100), 2),
    actualizado_en = current_timestamp
FROM ajustes_salario AS a
WHERE a.id_empleado = e.id_empleado
RETURNING e.id_empleado, e.salario;
```

El `FROM` debe producir como máximo una fila origen por fila destino. Si produce varias, cuál se usa no está definido de forma útil para la aplicación.

Actualizar con subconsulta:

```sql
UPDATE rrhh.empleados AS e
SET salario = p.salario_maximo
FROM rrhh.puestos AS p
WHERE p.id_puesto = e.id_puesto
  AND e.salario > p.salario_maximo;
```

Siempre valida el `WHERE` con un `SELECT` antes de una actualización masiva:

```sql
SELECT id_empleado, salario
FROM rrhh.empleados
WHERE id_departamento = 10;
```

### 7.4 `DELETE` y `USING`

```sql
DELETE FROM rrhh.empleado_proyecto
WHERE id_empleado = 105;
```

Usar otras tablas en el filtro:

```sql
DELETE FROM rrhh.empleado_proyecto AS ep
USING rrhh.proyectos AS p
WHERE p.id_proyecto = ep.id_proyecto
  AND p.estado = 'finalizado'
RETURNING ep.*;
```

Conservar solo los N más recientes exige identificar las filas de forma determinista:

```sql
WITH conservar AS (
    SELECT id_proyecto
    FROM rrhh.proyectos
    ORDER BY upper(periodo) DESC NULLS LAST, id_proyecto DESC
    LIMIT 100
)
DELETE FROM rrhh.proyectos p
WHERE NOT EXISTS (
    SELECT 1 FROM conservar c WHERE c.id_proyecto = p.id_proyecto
);
```

### 7.5 UPSERT con `ON CONFLICT`

Ignorar duplicados:

```sql
INSERT INTO rrhh.departamentos (nombre, ubicacion)
VALUES ('Tecnología', 'Remoto')
ON CONFLICT (nombre) DO NOTHING;
```

Insertar o actualizar:

```sql
INSERT INTO rrhh.departamentos AS d (nombre, ubicacion, presupuesto)
VALUES ('Tecnología', 'Híbrido', 2750000)
ON CONFLICT (nombre) DO UPDATE
SET ubicacion   = EXCLUDED.ubicacion,
    presupuesto = EXCLUDED.presupuesto
WHERE d.ubicacion IS DISTINCT FROM EXCLUDED.ubicacion
   OR d.presupuesto IS DISTINCT FROM EXCLUDED.presupuesto
RETURNING d.*;
```

`EXCLUDED` representa la fila que se intentó insertar. El conflicto debe resolverse mediante una restricción o índice único apropiado.

Nombrar la restricción:

```sql
INSERT INTO rrhh.empleado_proyecto
    (id_empleado, id_proyecto, rol, horas_asignadas)
VALUES (101, 1000, 'Líder técnico', 360)
ON CONFLICT ON CONSTRAINT empleado_proyecto_pkey DO UPDATE
SET rol = EXCLUDED.rol,
    horas_asignadas = EXCLUDED.horas_asignadas;
```

### 7.6 `MERGE`

`MERGE` (PostgreSQL 15+) expresa sincronizaciones con varias ramas:

```sql
CREATE TEMP TABLE carga_departamentos (
    nombre text PRIMARY KEY,
    ubicacion text,
    presupuesto numeric(14,2),
    eliminar boolean DEFAULT false
);

INSERT INTO carga_departamentos VALUES
    ('Tecnología', 'Híbrido', 2800000, false),
    ('Calidad', 'Remoto', 650000, false);

MERGE INTO rrhh.departamentos AS d
USING carga_departamentos AS c
ON d.nombre = c.nombre
WHEN MATCHED AND c.eliminar THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET ubicacion = c.ubicacion,
               presupuesto = c.presupuesto
WHEN NOT MATCHED AND NOT c.eliminar THEN
    INSERT (nombre, ubicacion, presupuesto)
    VALUES (c.nombre, c.ubicacion, c.presupuesto);
```

`ON CONFLICT` es ideal para un conflicto único durante `INSERT`; `MERGE` es más expresivo para reconciliar fuentes y destinos con varias acciones. Revisa la documentación de tu versión: `MERGE ... RETURNING` está disponible en versiones modernas, pero no en PostgreSQL 15–16.

### 7.7 CTE que modifican datos

Una sentencia `WITH` puede encadenar cambios y pasar sus filas con `RETURNING`:

```sql
WITH movidos AS (
    DELETE FROM rrhh.empleado_proyecto
    WHERE id_proyecto = 1003
    RETURNING *
)
SELECT count(*) AS asignaciones_eliminadas,
       sum(horas_asignadas) AS horas_liberadas
FROM movidos;
```

Mover filas a un archivo en una sola sentencia:

```sql
CREATE TABLE IF NOT EXISTS rrhh.proyectos_archivados AS
SELECT * FROM rrhh.proyectos WITH NO DATA;

WITH retirados AS (
    DELETE FROM rrhh.proyectos
    WHERE estado = 'finalizado'
    RETURNING *
)
INSERT INTO rrhh.proyectos_archivados
SELECT * FROM retirados;
```

Todos los subcomandos comparten el mismo snapshot. No intentes modificar la misma fila dos veces dentro de la sentencia: el resultado no es predecible.

### 7.8 `COPY` y `\copy`

Importación desde el equipo cliente con `psql`:

```sql
\copy rrhh.staging_empleados(nombres, apellidos, email) FROM './empleados.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8')
```

Exportar una consulta:

```sql
\copy (SELECT id_empleado, nombre_completo, salario FROM rrhh.empleados ORDER BY id_empleado) TO './empleados_export.csv' WITH (FORMAT csv, HEADER true)
```

`COPY` lee o escribe archivos desde la perspectiva del **servidor** y exige privilegios; `\copy` usa el cliente `psql`. Para cargas grandes, suele funcionar bien: cargar a *staging*, validar, transformar y hacer `ANALYZE` después.

---

## 8. DQL — consultas con `SELECT`

### 8.1 Forma y orden lógico

```sql
SELECT [DISTINCT] expresiones
FROM fuentes
[JOIN ...]
[WHERE condicion_fila]
[GROUP BY claves]
[HAVING condicion_grupo]
[WINDOW definiciones]
[ORDER BY expresiones]
[LIMIT cantidad OFFSET desplazamiento];
```

Modelo mental aproximado del orden lógico:

```text
WITH → FROM/JOIN → WHERE → GROUP BY → HAVING
→ SELECT → DISTINCT → operaciones de conjunto → ORDER BY → LIMIT/OFFSET
```

Por eso un alias de `SELECT` normalmente no existe todavía en `WHERE`, pero sí puede usarse en `ORDER BY`.

```sql
SELECT nombre_completo, salario * 12 AS salario_anual
FROM rrhh.empleados
WHERE salario * 12 > 600000
ORDER BY salario_anual DESC;
```

### 8.2 Proyección, alias y `DISTINCT`

```sql
SELECT e.id_empleado,
       e.nombre_completo AS empleado,
       e.salario
FROM rrhh.empleados AS e;

SELECT DISTINCT id_departamento
FROM rrhh.empleados
ORDER BY id_departamento NULLS LAST;
```

`DISTINCT ON` conserva la primera fila de cada grupo según `ORDER BY`, una extensión muy útil de PostgreSQL:

```sql
SELECT DISTINCT ON (id_departamento)
       id_departamento, nombre_completo, salario
FROM rrhh.empleados
WHERE id_departamento IS NOT NULL
ORDER BY id_departamento, salario DESC, id_empleado;
```

El inicio del `ORDER BY` debe corresponder con las expresiones de `DISTINCT ON`. Añade desempates para que el resultado sea determinista.

### 8.3 Filtrado

Comparaciones, rangos y listas:

```sql
SELECT * FROM rrhh.empleados WHERE salario BETWEEN 40000 AND 65000;
SELECT * FROM rrhh.empleados WHERE id_departamento IN (10, 20, 30);
SELECT * FROM rrhh.empleados WHERE fecha_contratacion >= DATE '2023-01-01';
```

Patrones:

```sql
SELECT * FROM rrhh.empleados WHERE apellidos LIKE 'Gar%';
SELECT * FROM rrhh.empleados WHERE apellidos ILIKE 'gar%'; -- sin distinguir mayúsculas
SELECT * FROM rrhh.empleados WHERE email SIMILAR TO '%@(empresa|nueva)\.test';
SELECT * FROM rrhh.empleados WHERE email ~* '^[a-z]+\.[a-z]+@'; -- regex POSIX
```

`LIKE` usa `%` para cualquier secuencia y `_` para un carácter. `ILIKE` es una extensión de PostgreSQL sensible a la configuración regional.

Cuantificadores:

```sql
SELECT * FROM rrhh.empleados WHERE salario > ALL (ARRAY[30000, 40000, 50000]);
SELECT * FROM rrhh.empleados WHERE id_departamento = ANY (ARRAY[10, 20]);
```

### 8.4 Orden, límite y paginación

```sql
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
ORDER BY salario DESC NULLS LAST, id_empleado DESC
LIMIT 5 OFFSET 0;

-- Sintaxis estándar equivalente
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
ORDER BY salario DESC, id_empleado DESC
OFFSET 0 ROWS FETCH FIRST 5 ROWS ONLY;
```

Sin `ORDER BY`, “las primeras cinco” no están definidas. Un `OFFSET` grande obliga a recorrer y descartar muchas filas. Para paginación profunda, usa *keyset pagination*:

```sql
-- Continuar después del último par visto: salario=54000, id=102.
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
WHERE (salario, id_empleado) < (54000, 102)
ORDER BY salario DESC, id_empleado DESC
LIMIT 20;
```

### 8.5 Expresiones condicionales y nulos

```sql
SELECT nombre_completo,
       CASE
           WHEN salario >= 80000 THEN 'alto'
           WHEN salario >= 50000 THEN 'medio'
           ELSE 'inicial'
       END AS banda,
       COALESCE(telefono, email, 'Sin contacto') AS contacto,
       greatest(salario, 50000) AS piso_simulado,
       least(salario, 90000) AS techo_simulado
FROM rrhh.empleados;
```

`GREATEST` y `LEAST` en PostgreSQL ignoran argumentos nulos si existe algún valor no nulo; no asumas el mismo comportamiento en todos los motores.

### 8.6 Funciones escalares frecuentes

Texto:

```sql
SELECT concat_ws(' ', nombres, apellidos) AS nombre,
       length(nombres), position('@' IN email), split_part(email, '@', 2),
       regexp_replace(telefono, '[^0-9]', '', 'g') AS solo_digitos
FROM rrhh.empleados;
```

Números:

```sql
SELECT salario,
       round(salario / 12, 2), trunc(salario, -3),
       ceil(salario / 1000), floor(salario / 1000),
       mod(id_empleado, 2), abs(-salario)
FROM rrhh.empleados;
```

Fechas:

```sql
SELECT nombre_completo,
       fecha_contratacion,
       age(current_date, fecha_contratacion) AS antiguedad,
       extract(year FROM fecha_contratacion) AS anio,
       date_trunc('month', fecha_contratacion::timestamp) AS mes
FROM rrhh.empleados;
```

Generar series:

```sql
SELECT dia::date
FROM generate_series(
    DATE '2026-08-01',
    DATE '2026-08-07',
    INTERVAL '1 day'
) AS g(dia);
```

### 8.7 Agregación, `GROUP BY`, `HAVING` y `FILTER`

```sql
SELECT count(*) AS empleados,
       count(telefono) AS con_telefono,
       sum(salario) AS nomina,
       avg(salario)::numeric(12,2) AS promedio,
       min(salario), max(salario)
FROM rrhh.empleados;
```

`count(*)` cuenta filas; `count(columna)` ignora nulos.

```sql
SELECT id_departamento,
       count(*) AS personas,
       round(avg(salario), 2) AS promedio
FROM rrhh.empleados
WHERE fecha_contratacion >= DATE '2020-01-01'
GROUP BY id_departamento
HAVING avg(salario) >= 50000
ORDER BY promedio DESC;
```

Agregados condicionales con `FILTER`:

```sql
SELECT id_departamento,
       count(*) AS total,
       count(*) FILTER (WHERE salario >= 60000) AS salarios_altos,
       avg(salario) FILTER (WHERE fecha_contratacion >= DATE '2023-01-01') AS promedio_reciente
FROM rrhh.empleados
GROUP BY id_departamento;
```

Agrupar valores en colecciones:

```sql
SELECT id_departamento,
       string_agg(nombre_completo, ', ' ORDER BY nombre_completo) AS personas,
       array_agg(id_empleado ORDER BY id_empleado) AS ids,
       jsonb_agg(jsonb_build_object('id', id_empleado, 'nombre', nombre_completo)
                 ORDER BY id_empleado) AS personas_json
FROM rrhh.empleados
GROUP BY id_departamento;
```

### 8.8 `ROLLUP`, `CUBE` y `GROUPING SETS`

```sql
SELECT id_departamento, id_puesto, count(*) AS total
FROM rrhh.empleados
GROUP BY ROLLUP (id_departamento, id_puesto)
ORDER BY id_departamento NULLS LAST, id_puesto NULLS LAST;
```

`ROLLUP(a,b)` produce `(a,b)`, subtotal `(a)` y total general. `CUBE(a,b)` añade también subtotal `(b)`.

```sql
SELECT id_departamento, id_puesto,
       count(*) AS total,
       grouping(id_departamento) AS es_total_departamento,
       grouping(id_puesto) AS es_total_puesto
FROM rrhh.empleados
GROUP BY GROUPING SETS ((id_departamento), (id_puesto), ());
```

`GROUPING()` permite distinguir un `NULL` real del `NULL` que representa un subtotal.

### 8.9 Joins

| Join | Resultado |
|---|---|
| `INNER JOIN` | coincidencias de ambos lados |
| `LEFT JOIN` | todas las filas izquierdas y coincidencias derechas |
| `RIGHT JOIN` | todas las derechas y coincidencias izquierdas |
| `FULL JOIN` | filas de ambos lados, coincidan o no |
| `CROSS JOIN` | producto cartesiano |

Inner join:

```sql
SELECT e.nombre_completo, d.nombre AS departamento, p.titulo AS puesto
FROM rrhh.empleados e
JOIN rrhh.departamentos d USING (id_departamento)
JOIN rrhh.puestos p USING (id_puesto);
```

`USING (columna)` combina columnas del mismo nombre; `ON` es más flexible.

Left join manteniendo departamentos vacíos:

```sql
SELECT d.nombre, count(e.id_empleado) AS empleados
FROM rrhh.departamentos d
LEFT JOIN rrhh.empleados e ON e.id_departamento = d.id_departamento
GROUP BY d.id_departamento, d.nombre
ORDER BY d.nombre;
```

Un filtro en `WHERE` puede convertir accidentalmente un `LEFT JOIN` en un resultado equivalente a inner join:

```sql
-- Conserva departamentos sin empleados porque la condición está en ON.
SELECT d.nombre, e.nombre_completo
FROM rrhh.departamentos d
LEFT JOIN rrhh.empleados e
  ON e.id_departamento = d.id_departamento
 AND e.salario >= 60000;
```

Self join:

```sql
SELECT e.nombre_completo AS empleado,
       j.nombre_completo AS jefe
FROM rrhh.empleados e
LEFT JOIN rrhh.empleados j ON j.id_empleado = e.id_jefe;
```

Many-to-many:

```sql
SELECT e.nombre_completo, p.nombre AS proyecto, ep.rol, ep.horas_asignadas
FROM rrhh.empleados e
JOIN rrhh.empleado_proyecto ep USING (id_empleado)
JOIN rrhh.proyectos p USING (id_proyecto)
ORDER BY p.nombre, e.nombre_completo;
```

Cross join controlado:

```sql
SELECT d.nombre, mes::date
FROM rrhh.departamentos d
CROSS JOIN generate_series(DATE '2026-01-01', DATE '2026-03-01', INTERVAL '1 month') AS g(mes);
```

### 8.10 `LATERAL`

`LATERAL` permite que una subconsulta del `FROM` use columnas de fuentes anteriores.

```sql
SELECT d.nombre AS departamento,
       top.nombre_completo,
       top.salario
FROM rrhh.departamentos d
LEFT JOIN LATERAL (
    SELECT e.nombre_completo, e.salario
    FROM rrhh.empleados e
    WHERE e.id_departamento = d.id_departamento
    ORDER BY e.salario DESC, e.id_empleado
    LIMIT 2
) AS top ON true
ORDER BY d.nombre, top.salario DESC;
```

Sirve para “los N mejores por padre”, funciones que devuelven conjuntos y expansión de JSON/arrays.

### 8.11 Subconsultas, `EXISTS` y comparaciones

Subconsulta escalar:

```sql
SELECT nombre_completo, salario,
       (SELECT avg(salario) FROM rrhh.empleados) AS promedio_global
FROM rrhh.empleados;
```

Correlacionada:

```sql
SELECT e.nombre_completo, e.salario
FROM rrhh.empleados e
WHERE e.salario > (
    SELECT avg(e2.salario)
    FROM rrhh.empleados e2
    WHERE e2.id_departamento = e.id_departamento
);
```

Semi-join con `EXISTS`:

```sql
SELECT e.nombre_completo
FROM rrhh.empleados e
WHERE EXISTS (
    SELECT 1
    FROM rrhh.empleado_proyecto ep
    WHERE ep.id_empleado = e.id_empleado
);
```

Anti-join con `NOT EXISTS`:

```sql
SELECT e.nombre_completo
FROM rrhh.empleados e
WHERE NOT EXISTS (
    SELECT 1
    FROM rrhh.empleado_proyecto ep
    WHERE ep.id_empleado = e.id_empleado
);
```

### 8.12 CTE y CTE recursivos

CTE legible y reutilizable:

```sql
WITH resumen AS (
    SELECT id_departamento, count(*) AS personas, avg(salario) AS promedio
    FROM rrhh.empleados
    GROUP BY id_departamento
)
SELECT d.nombre, r.personas, round(r.promedio, 2)
FROM resumen r
JOIN rrhh.departamentos d USING (id_departamento)
ORDER BY r.promedio DESC;
```

PostgreSQL puede integrar (*inline*) un CTE no recursivo y sin efectos. Se puede controlar:

```sql
WITH candidatos AS NOT MATERIALIZED (
    SELECT * FROM rrhh.empleados WHERE salario > 50000
)
SELECT * FROM candidatos WHERE id_departamento = 10;
```

Jerarquía recursiva:

```sql
WITH RECURSIVE organigrama AS (
    SELECT id_empleado, nombre_completo, id_jefe, 0 AS nivel,
           ARRAY[id_empleado] AS ruta
    FROM rrhh.empleados
    WHERE id_jefe IS NULL

    UNION ALL

    SELECT e.id_empleado, e.nombre_completo, e.id_jefe, o.nivel + 1,
           o.ruta || e.id_empleado
    FROM rrhh.empleados e
    JOIN organigrama o ON e.id_jefe = o.id_empleado
    WHERE NOT e.id_empleado = ANY(o.ruta) -- protección ante ciclos
)
SELECT repeat('  ', nivel) || nombre_completo AS arbol, ruta
FROM organigrama
ORDER BY ruta;
```

### 8.13 Operadores de conjuntos

```sql
-- Elimina duplicados.
SELECT id_departamento FROM rrhh.empleados
UNION
SELECT id_departamento FROM rrhh.proyectos;

-- Conserva duplicados y suele ser más rápido.
SELECT id_departamento FROM rrhh.empleados
UNION ALL
SELECT id_departamento FROM rrhh.proyectos;

-- Intersección.
SELECT id_departamento FROM rrhh.empleados
INTERSECT
SELECT id_departamento FROM rrhh.proyectos;

-- Diferencia; equivalente conceptual de MINUS en Oracle.
SELECT id_departamento FROM rrhh.empleados
EXCEPT
SELECT id_departamento FROM rrhh.proyectos;
```

Cada rama debe producir el mismo número de columnas y tipos compatibles. `ORDER BY` se aplica al resultado final salvo que cada rama esté envuelta en una subconsulta.

### 8.14 Funciones de ventana

Las ventanas calculan sobre filas relacionadas sin colapsarlas como `GROUP BY`.

Ranking:

```sql
SELECT id_departamento, nombre_completo, salario,
       row_number() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS fila,
       rank()       OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS rango,
       dense_rank() OVER (PARTITION BY id_departamento ORDER BY salario DESC) AS rango_denso
FROM rrhh.empleados;
```

- `row_number`: siempre 1, 2, 3, aun con empates.
- `rank`: los empates comparten rango y dejan huecos.
- `dense_rank`: comparte rango sin dejar huecos.

Acumulados y marcos:

```sql
SELECT fecha_contratacion, nombre_completo, salario,
       sum(salario) OVER (
           ORDER BY fecha_contratacion, id_empleado
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS nomina_acumulada,
       avg(salario) OVER (
           ORDER BY fecha_contratacion, id_empleado
           ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS promedio_movil_3
FROM rrhh.empleados;
```

Anterior/siguiente:

```sql
SELECT nombre_completo, fecha_contratacion, salario,
       lag(salario)  OVER w AS salario_anterior,
       lead(salario) OVER w AS salario_siguiente,
       salario - lag(salario) OVER w AS diferencia
FROM rrhh.empleados
WINDOW w AS (ORDER BY fecha_contratacion, id_empleado);
```

Primer y último valor: el marco predeterminado puede sorprender con `last_value`; especifícalo.

```sql
SELECT nombre_completo, id_departamento, salario,
       first_value(salario) OVER w AS mayor_salario,
       last_value(salario)  OVER w AS menor_salario
FROM rrhh.empleados
WINDOW w AS (
    PARTITION BY id_departamento
    ORDER BY salario DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
);
```

Porcentaje del total:

```sql
SELECT nombre_completo, id_departamento, salario,
       round(100 * salario / sum(salario) OVER (PARTITION BY id_departamento), 2)
           AS porcentaje_nomina_departamento
FROM rrhh.empleados;
```

Filtrar una ventana requiere un nivel exterior porque `WHERE` se evalúa antes:

```sql
WITH ranking AS (
    SELECT e.*,
           row_number() OVER (
               PARTITION BY id_departamento
               ORDER BY salario DESC, id_empleado
           ) AS posicion
    FROM rrhh.empleados e
)
SELECT id_departamento, nombre_completo, salario
FROM ranking
WHERE posicion <= 2;
```

**Puntos de control de las etapas 2 y 3:** sin copiar un ejemplo, crea una tabla hija de `proyectos`, inserta datos con `RETURNING` y consulta horas por departamento con `JOIN`, `GROUP BY` y `HAVING`. Después resuelve “los dos salarios mayores por departamento” con una ventana y dibuja el organigrama con un CTE recursivo. Usa un desempate determinista.

---

## 9. Transacciones, MVCC, aislamiento y bloqueos

### 9.1 ACID y límites de una transacción

Una transacción debe ofrecer:

- **Atomicidad:** todas sus operaciones se confirman o ninguna.
- **Consistencia:** lleva la base de un estado válido a otro; las reglas también dependen del diseño y la aplicación.
- **Aislamiento:** las ejecuciones concurrentes no deben producir anomalías fuera del nivel elegido.
- **Durabilidad:** después del `COMMIT`, los cambios sobreviven a un fallo bajo la configuración durable normal.

```sql
BEGIN;

UPDATE rrhh.empleados
SET salario = salario - 1000
WHERE id_empleado = 101;

UPDATE rrhh.empleados
SET salario = salario + 1000
WHERE id_empleado = 102;

COMMIT;
```

Si una sentencia falla dentro de una transacción, esta queda abortada hasta hacer `ROLLBACK` o volver a un savepoint.

```sql
BEGIN;
SELECT 1 / 0; -- error
SELECT 1;     -- ERROR: current transaction is aborted
ROLLBACK;
```

### 9.2 `COMMIT`, `ROLLBACK` y autocommit

```sql
BEGIN;
UPDATE rrhh.proyectos SET estado = 'pausado' WHERE id_proyecto = 1000;
ROLLBACK; -- deshace el cambio

BEGIN;
UPDATE rrhh.proyectos SET estado = 'activo' WHERE id_proyecto = 1000;
COMMIT;   -- lo hace visible y durable
```

Fuera de `BEGIN`, cada sentencia se ejecuta como su propia transacción (*autocommit* del cliente). `psql` permite controlarlo, pero es mejor escribir límites explícitos en operaciones relacionadas:

```sql
\set AUTOCOMMIT off
-- ... sentencias ...
COMMIT;
\set AUTOCOMMIT on
```

No mantengas transacciones abiertas mientras esperas interacción humana o llamadas de red: conservan snapshots, conexiones y posiblemente bloqueos.

### 9.3 Savepoints

```sql
BEGIN;

UPDATE rrhh.empleados SET salario = salario * 1.02 WHERE id_departamento = 10;
SAVEPOINT aumento_aplicado;

DELETE FROM rrhh.empleado_proyecto WHERE id_proyecto = 1000;
-- Decidimos conservar el aumento pero no el borrado.
ROLLBACK TO SAVEPOINT aumento_aplicado;

RELEASE SAVEPOINT aumento_aplicado;
COMMIT;
```

Los savepoints son la base de subtransacciones y recuperación controlada de errores en muchos drivers.

### 9.4 Cómo se ve MVCC

Abre dos sesiones.

**Sesión A:**

```sql
BEGIN;
UPDATE rrhh.empleados SET salario = salario + 500 WHERE id_empleado = 101;
-- No confirmar todavía.
```

**Sesión B:**

```sql
SELECT salario FROM rrhh.empleados WHERE id_empleado = 101;
-- Ve la versión confirmada anterior; no queda bloqueada por una lectura normal.

UPDATE rrhh.empleados SET salario = salario + 200 WHERE id_empleado = 101;
-- Espera porque ambas sesiones quieren modificar la misma fila.
```

Cuando A hace `COMMIT` o `ROLLBACK`, B continúa y vuelve a evaluar la fila según corresponda. MVCC reduce bloqueos entre lectura y escritura, pero los escritores concurrentes sobre la misma fila sí coordinan mediante locks.

Columnas internas útiles solo para diagnóstico:

```sql
SELECT xmin, xmax, ctid, id_empleado, salario
FROM rrhh.empleados
WHERE id_empleado = 101;
```

`ctid` identifica la versión física actual y puede cambiar tras `UPDATE` o mantenimiento; nunca lo uses como clave de negocio.

### 9.5 Niveles de aislamiento

| Nivel solicitado | Comportamiento en PostgreSQL |
|---|---|
| `READ UNCOMMITTED` | se comporta como `READ COMMITTED` |
| `READ COMMITTED` | snapshot nuevo al inicio de cada sentencia; predeterminado |
| `REPEATABLE READ` | snapshot estable para toda la transacción; puede abortar ante conflictos |
| `SERIALIZABLE` | detecta anomalías y aborta alguna transacción para simular ejecución serial |

```sql
BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY;
SELECT count(*) FROM rrhh.empleados;
SELECT sum(salario) FROM rrhh.empleados;
COMMIT;
```

Serializable:

```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
-- Leer reglas, decidir y escribir como una unidad.
UPDATE rrhh.departamentos
SET presupuesto = presupuesto - 100000
WHERE id_departamento = 10
  AND presupuesto >= 100000;
COMMIT;
```

La aplicación debe poder reintentar la **transacción completa** ante SQLSTATE `40001` (`serialization_failure`) y, normalmente, `40P01` (`deadlock_detected`). No reintentes solo la última sentencia sobre decisiones calculadas con un snapshot anterior.

### 9.6 Bloqueos de fila

Bloquear filas que se van a procesar:

```sql
BEGIN;
SELECT id_proyecto, estado
FROM rrhh.proyectos
WHERE id_proyecto = 1000
FOR UPDATE;

UPDATE rrhh.proyectos SET estado = 'pausado' WHERE id_proyecto = 1000;
COMMIT;
```

Variantes:

- `FOR UPDATE`: bloqueo de fila fuerte para cambios o borrados.
- `FOR NO KEY UPDATE`: permite algunos locks compatibles que no cambian claves.
- `FOR SHARE` y `FOR KEY SHARE`: bloqueos compartidos con distinta fuerza.
- `NOWAIT`: falla en vez de esperar.
- `SKIP LOCKED`: omite filas ya bloqueadas.

Patrón de cola con varios workers:

```sql
WITH siguiente AS (
    SELECT id_proyecto
    FROM rrhh.proyectos
    WHERE estado = 'planeado'
    ORDER BY id_proyecto
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
UPDATE rrhh.proyectos p
SET estado = 'activo'
FROM siguiente s
WHERE p.id_proyecto = s.id_proyecto
RETURNING p.*;
```

`SKIP LOCKED` produce una vista intencionalmente inconsistente y es apropiado para colas, no para reportes generales.

### 9.7 Bloqueos de tabla y observación

```sql
BEGIN;
LOCK TABLE rrhh.empleados IN SHARE MODE;
-- operación coordinada
COMMIT;
```

Los modos van desde `ACCESS SHARE` hasta `ACCESS EXCLUSIVE`. `SELECT` normal toma `ACCESS SHARE`; muchos DDL requieren `ACCESS EXCLUSIVE`.

Ver sesiones bloqueadas y bloqueadoras:

```sql
SELECT blocked.pid AS pid_bloqueado,
       blocking.pid AS pid_bloqueador,
       blocked.query AS consulta_bloqueada,
       blocking.query AS consulta_bloqueadora
FROM pg_stat_activity blocked
CROSS JOIN LATERAL unnest(pg_blocking_pids(blocked.pid)) AS b(pid)
JOIN pg_stat_activity blocking ON blocking.pid = b.pid;
```

### 9.8 Deadlocks

Se produce un deadlock si A espera algo retenido por B y B espera algo retenido por A. PostgreSQL detecta el ciclo y aborta una transacción.

Prevención práctica:

- bloquea recursos en un orden global consistente;
- mantén transacciones breves;
- indexa las búsquedas y claves foráneas necesarias;
- procesa lotes acotados;
- captura `40P01` y reintenta la unidad completa.

```sql
-- Orden determinista antes de bloquear varias filas.
SELECT id_empleado
FROM rrhh.empleados
WHERE id_empleado IN (101, 102)
ORDER BY id_empleado
FOR UPDATE;
```

### 9.9 Bloqueos consultivos

Los *advisory locks* coordinan recursos definidos por la aplicación; PostgreSQL no impone qué representan.

```sql
-- Dura hasta acabar la transacción.
BEGIN;
SELECT pg_advisory_xact_lock(42, 1001);
-- sección crítica de negocio
COMMIT;

-- Intento sin espera.
SELECT pg_try_advisory_lock(9001);
SELECT pg_advisory_unlock(9001);
```

No sustituyen restricciones `UNIQUE`, foreign keys o locks de fila; son útiles para trabajos programados o exclusión mutua con una convención clara.

---

## 10. DCL — roles, privilegios y seguridad por fila

### 10.1 Roles de login y roles de grupo

PostgreSQL usa un único concepto: **rol**. Puede iniciar sesión si tiene `LOGIN`; un rol sin login suele agrupar permisos.

```sql
CREATE ROLE app_lectura NOLOGIN;
CREATE ROLE app_escritura NOLOGIN;
CREATE ROLE ana LOGIN PASSWORD 'cambia_esta_clave';

GRANT app_lectura TO ana;
GRANT app_escritura TO ana;
```

Cambiar el rol efectivo:

```sql
SET ROLE app_lectura;
SELECT current_user, session_user;
RESET ROLE;
```

Opciones sensibles:

```sql
ALTER ROLE ana CONNECTION LIMIT 5;
ALTER ROLE ana VALID UNTIL '2027-01-01';
ALTER ROLE ana SET statement_timeout = '30s';
```

Evita otorgar `SUPERUSER`, `CREATEROLE`, `CREATEDB`, `REPLICATION` o `BYPASSRLS` a cuentas de aplicación.

### 10.2 Privilegios de base, esquema, tabla y secuencia

```sql
GRANT CONNECT ON DATABASE rrhh_db TO app_lectura;
GRANT USAGE ON SCHEMA rrhh TO app_lectura;
GRANT SELECT ON ALL TABLES IN SCHEMA rrhh TO app_lectura;

GRANT USAGE ON SCHEMA rrhh TO app_escritura;
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA rrhh TO app_escritura;
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA rrhh TO app_escritura;
```

Permisos de columnas:

```sql
GRANT SELECT (id_empleado, nombres, apellidos, email)
ON rrhh.empleados TO app_lectura;

GRANT UPDATE (telefono, preferencias)
ON rrhh.empleados TO app_escritura;
```

Revocar:

```sql
REVOKE DELETE ON rrhh.empleados FROM app_escritura;
REVOKE app_escritura FROM ana;
```

`WITH GRANT OPTION` permite retransmitir un privilegio de objeto; `WITH ADMIN OPTION` permite administrar membresía de rol. Otórgalos con cautela.

### 10.3 Privilegios predeterminados

`GRANT ... ON ALL TABLES` solo cubre objetos existentes. Configura futuros objetos para el rol **que los creará**:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE estudiante IN SCHEMA rrhh
GRANT SELECT ON TABLES TO app_lectura;

ALTER DEFAULT PRIVILEGES FOR ROLE estudiante IN SCHEMA rrhh
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_escritura;

ALTER DEFAULT PRIVILEGES FOR ROLE estudiante IN SCHEMA rrhh
GRANT USAGE, SELECT ON SEQUENCES TO app_escritura;
```

Si otro rol ejecuta las migraciones, sus default privileges se configuran por separado.

### 10.4 Propiedad no equivale a privilegios

El propietario puede alterar o eliminar el objeto y normalmente conceder permisos. Cambiar propiedad:

```sql
CREATE ROLE rrhh_owner NOLOGIN;
ALTER SCHEMA rrhh OWNER TO rrhh_owner;
ALTER TABLE rrhh.empleados OWNER TO rrhh_owner;
```

Patrón habitual:

- rol propietario sin `LOGIN`;
- rol de migración que puede asumir al propietario;
- roles de runtime con permisos mínimos y sin propiedad.

### 10.5 `PUBLIC`, esquema `public` y `search_path`

`PUBLIC` representa a todos los roles. En instalaciones actualizadas desde versiones antiguas, revisa quién puede crear en el esquema `public`.

```sql
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON DATABASE rrhh_db FROM PUBLIC;
GRANT CONNECT ON DATABASE rrhh_db TO app_lectura, app_escritura;
```

No agregues a `search_path` esquemas donde usuarios no confiables puedan crear objetos; una función o operador malicioso podría ocultar otro esperado.

```sql
ALTER ROLE ana IN DATABASE rrhh_db SET search_path = pg_catalog, rrhh;
SHOW search_path;
```

### 10.6 Seguridad por fila (RLS)

RLS añade políticas que filtran filas por rol o contexto.

```sql
CREATE TABLE rrhh.notas_privadas (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    propietario name NOT NULL DEFAULT current_user,
    contenido text NOT NULL
);

ALTER TABLE rrhh.notas_privadas ENABLE ROW LEVEL SECURITY;

CREATE POLICY notas_propias
ON rrhh.notas_privadas
USING (propietario = current_user)
WITH CHECK (propietario = current_user);

GRANT SELECT, INSERT, UPDATE, DELETE
ON rrhh.notas_privadas TO app_escritura;
GRANT USAGE, SELECT
ON SEQUENCE rrhh.notas_privadas_id_seq TO app_escritura;
```

- `USING` decide qué filas se pueden ver, modificar o borrar.
- `WITH CHECK` decide qué filas nuevas o resultantes se aceptan.
- Sin política aplicable, RLS usa denegación por defecto.

El propietario normalmente omite RLS; para probarlo o imponérselo:

```sql
ALTER TABLE rrhh.notas_privadas FORCE ROW LEVEL SECURITY;
```

Superusuarios y roles `BYPASSRLS` la omiten. Prueba políticas con el rol real de aplicación y considera fugas mediante funciones, errores y canales laterales en modelos de alta seguridad.

Contexto de aplicación por transacción:

```sql
BEGIN;
SELECT set_config('app.id_empleado', '101', true);
SELECT current_setting('app.id_empleado', true);
-- Las políticas pueden comparar contra current_setting(...).
COMMIT;
```

No confíes en una variable que el mismo rol sin privilegios pueda falsificar para autorizar datos sensibles. Un proxy, una función controlada o roles separados deben establecer el contexto con un modelo de amenazas explícito.

### 10.7 Inspeccionar permisos

```sql
SELECT has_table_privilege('ana', 'rrhh.empleados', 'SELECT');
SELECT has_schema_privilege('ana', 'rrhh', 'USAGE');

SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'rrhh' AND table_name = 'empleados';

SELECT * FROM pg_policies WHERE schemaname = 'rrhh';
```

En `psql`, `\dp rrhh.*` muestra ACL y `\du` atributos/membresías.

**Punto de control de la etapa 4:** abre dos sesiones, bloquea el mismo empleado y observa `pg_blocking_pids`. Luego crea un rol de solo lectura, demuestra que no puede actualizar salarios y aplica una política RLS de laboratorio que produzca resultados distintos para dos identidades.

---

## 11. Índices, `EXPLAIN` y rendimiento

### 11.1 Qué hace un índice

Un índice es una estructura adicional que acelera ciertas búsquedas, joins u órdenes. Tiene costos:

- ocupa disco y memoria caché;
- cada escritura debe mantenerlo;
- necesita vacuum y puede sufrir bloat;
- no garantiza que el optimizador lo elija.

```sql
CREATE INDEX idx_empleados_departamento
ON rrhh.empleados (id_departamento);
```

Las PK y restricciones `UNIQUE` crean índices únicos. Una foreign key **no crea automáticamente un índice en la tabla hija**; suele convenir indexarla si se consulta por ella o se actualiza/borra el padre.

### 11.2 Métodos de índice

| Método | Casos típicos |
|---|---|
| B-tree | igualdad, rango, orden, prefijos |
| Hash | igualdad; B-tree suele ser más versátil |
| GIN | elementos dentro de JSONB, arrays, `tsvector`, trigramas |
| GiST | rangos, geometría, proximidad, exclusión |
| SP-GiST | datos particionables como prefijos, puntos o tries |
| BRIN | tablas enormes con correlación física, por ejemplo tiempo creciente |

B-tree:

```sql
CREATE INDEX idx_empleados_salario ON rrhh.empleados (salario DESC);
SELECT * FROM rrhh.empleados WHERE salario BETWEEN 50000 AND 70000;
```

GIN para JSONB y arrays:

```sql
CREATE INDEX idx_empleados_preferencias_gin
ON rrhh.empleados USING gin (preferencias);

CREATE INDEX idx_empleados_habilidades_gin
ON rrhh.empleados USING gin (habilidades);

SELECT * FROM rrhh.empleados
WHERE preferencias @> '{"remoto":true}'::jsonb;
```

GiST para rangos:

```sql
CREATE INDEX idx_proyectos_periodo_gist
ON rrhh.proyectos USING gist (periodo);

SELECT * FROM rrhh.proyectos
WHERE periodo && daterange('2025-08-01', '2025-09-01', '[)');
```

BRIN para una tabla grande físicamente ordenada por tiempo:

```sql
CREATE INDEX idx_auditoria_ocurrido_brin
ON auditoria_eventos USING brin (ocurrido_en)
WITH (pages_per_range = 64);
```

BRIN es muy pequeño, pero devuelve rangos de páginas que después se verifican; no sustituye a B-tree para búsquedas muy selectivas en datos sin correlación.

### 11.3 Índices multicolumna

```sql
CREATE INDEX idx_empleados_depto_salario
ON rrhh.empleados (id_departamento, salario DESC);
```

Encaja especialmente con:

```sql
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
WHERE id_departamento = 10
ORDER BY salario DESC
LIMIT 5;
```

En B-tree, las columnas iniciales suelen determinar cuánto puede acotarse el índice. Diseña el orden a partir de consultas reales, no de una regla universal de “más selectiva primero”.

### 11.4 Índices de expresión

```sql
CREATE UNIQUE INDEX uq_empleados_email_lower
ON rrhh.empleados (lower(email));

SELECT * FROM rrhh.empleados
WHERE lower(email) = lower('ANA.GARCIA@EMPRESA.TEST');
```

La expresión de la consulta debe ser compatible con la indexada. Las funciones del índice deben cumplir requisitos de inmutabilidad.

### 11.5 Índices parciales

Indexan solo filas que cumplen un predicado:

```sql
CREATE INDEX idx_proyectos_activos_depto
ON rrhh.proyectos (id_departamento, id_proyecto)
WHERE estado = 'activo';

SELECT * FROM rrhh.proyectos
WHERE estado = 'activo' AND id_departamento = 10;
```

Unicidad condicional:

```sql
CREATE UNIQUE INDEX uq_un_proyecto_activo_por_nombre
ON rrhh.proyectos (lower(nombre))
WHERE estado IN ('planeado', 'activo', 'pausado');
```

El optimizador debe poder demostrar que el `WHERE` de la consulta implica el predicado del índice. Predicados demasiado dinámicos o parámetros genéricos pueden impedirlo.

### 11.6 Índices de cobertura e index-only scans

```sql
CREATE INDEX idx_empleados_depto_cover
ON rrhh.empleados (id_departamento)
INCLUDE (nombre_completo, salario);
```

`INCLUDE` agrega columnas no clave para que algunas consultas se respondan desde el índice. Un *index-only scan* también depende del mapa de visibilidad; tras muchas escrituras puede necesitar visitar la tabla hasta que `VACUUM` avance.

### 11.7 Crear y eliminar concurrentemente

```sql
CREATE INDEX CONCURRENTLY idx_empleados_contratacion
ON rrhh.empleados (fecha_contratacion);

DROP INDEX CONCURRENTLY rrhh.idx_empleados_contratacion;
```

`CONCURRENTLY` reduce el bloqueo de escrituras, tarda más, hace trabajo adicional y no puede ejecutarse dentro de una transacción explícita. Si falla puede dejar un índice inválido; comprueba `pg_index.indisvalid` y decide si reconstruirlo o eliminarlo.

```sql
SELECT c.relname, i.indisvalid, i.indisready
FROM pg_index i
JOIN pg_class c ON c.oid = i.indexrelid
WHERE i.indrelid = 'rrhh.empleados'::regclass;
```

### 11.8 Leer `EXPLAIN`

Plan estimado, sin ejecutar:

```sql
EXPLAIN
SELECT * FROM rrhh.empleados
WHERE id_departamento = 10 AND salario > 50000;
```

Plan real:

```sql
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT d.nombre, count(*)
FROM rrhh.empleados e
JOIN rrhh.departamentos d USING (id_departamento)
WHERE e.salario > 50000
GROUP BY d.id_departamento, d.nombre;
```

> `EXPLAIN ANALYZE` ejecuta la consulta. Para un `UPDATE` o `DELETE`, envuélvelo en `BEGIN; ... ROLLBACK;` si no quieres conservar el cambio.

Nodos frecuentes:

- `Seq Scan`: recorre la tabla; puede ser óptimo para tablas pequeñas o muchas filas.
- `Index Scan`: navega índice y visita heap.
- `Index Only Scan`: intenta resolver desde el índice.
- `Bitmap Index/Heap Scan`: combina coincidencias y visita páginas en grupos.
- `Nested Loop`: eficiente con pocas filas exteriores y búsqueda interior indexada.
- `Hash Join`: bueno para igualdad y conjuntos mayores.
- `Merge Join`: combina entradas ordenadas.
- `Sort`, `HashAggregate`, `GroupAggregate`: orden y agregación.

Compara `rows=` estimadas con `actual rows=`. Diferencias grandes suelen señalar estadísticas insuficientes, columnas correlacionadas o predicados difíciles de estimar.

### 11.9 Estadísticas

```sql
ANALYZE rrhh.empleados;

SELECT attname, n_distinct, null_frac, most_common_vals
FROM pg_stats
WHERE schemaname = 'rrhh' AND tablename = 'empleados';
```

Aumentar detalle para una columna sesgada:

```sql
ALTER TABLE rrhh.empleados
ALTER COLUMN id_departamento SET STATISTICS 500;
ANALYZE rrhh.empleados;
```

Estadísticas extendidas para columnas relacionadas:

```sql
CREATE STATISTICS st_empleados_depto_puesto (dependencies, ndistinct)
ON id_departamento, id_puesto
FROM rrhh.empleados;
ANALYZE rrhh.empleados;
```

### 11.10 Patrones que perjudican rendimiento

Función sobre columna sin índice de expresión:

```sql
-- Puede impedir usar un índice normal de creado_en.
WHERE date(creado_en) = DATE '2026-08-12'

-- Rango indexable y correcto para todo el día.
WHERE creado_en >= TIMESTAMPTZ '2026-08-12 00:00 America/Mexico_City'
  AND creado_en <  TIMESTAMPTZ '2026-08-13 00:00 America/Mexico_City'
```

Conversión implícita, `%` inicial y selección excesiva también pueden costar:

```sql
-- Prefiere parámetros del tipo real de la columna.
WHERE id_empleado = $1::bigint

-- Un B-tree normal no resuelve generalmente una búsqueda contiene.
WHERE nombre_completo ILIKE '%garcía%'

-- Devuelve solo columnas necesarias, especialmente por red.
SELECT id_empleado, nombre_completo FROM rrhh.empleados;
```

Para búsquedas `%texto%`, `pg_trgm` con GIN/GiST puede ayudar (sección 14).

### 11.11 Optimizar con método, no con intuición

1. Captura consulta, parámetros, duración y frecuencia.
2. Ejecuta `EXPLAIN (ANALYZE, BUFFERS)` en datos representativos.
3. Comprueba estimaciones, I/O, sorts, loops y filas descartadas.
4. Revisa modelo, consulta y estadísticas antes de añadir índices al azar.
5. Cambia una cosa, vuelve a medir y vigila el costo en escrituras.

Parámetros como `work_mem`, `shared_buffers`, `effective_cache_size` y costos del planner afectan decisiones, pero no deben copiarse de una receta universal.

```sql
SHOW work_mem;
SET LOCAL work_mem = '64MB'; -- solo esta transacción; úsalo con cuidado por operación/nodo
```

---

## 12. Vistas y vistas materializadas

### 12.1 Vistas normales

Una vista guarda una consulta, no sus resultados.

```sql
CREATE OR REPLACE VIEW rrhh.vw_empleados_detalle AS
SELECT e.id_empleado,
       e.nombre_completo,
       e.email,
       e.salario,
       d.nombre AS departamento,
       p.titulo AS puesto
FROM rrhh.empleados e
LEFT JOIN rrhh.departamentos d USING (id_departamento)
JOIN rrhh.puestos p USING (id_puesto);

SELECT * FROM rrhh.vw_empleados_detalle
WHERE departamento = 'Tecnología';
```

Usos:

- encapsular joins o reglas de lectura repetidas;
- presentar una interfaz estable;
- limitar columnas junto con privilegios;
- facilitar reportes.

Una vista no garantiza mejor rendimiento por sí misma; el planner expande su definición.

### 12.2 Vistas actualizables y `WITH CHECK OPTION`

Las vistas simples pueden ser actualizables automáticamente:

```sql
CREATE VIEW rrhh.vw_proyectos_activos AS
SELECT id_proyecto, nombre, periodo, presupuesto, estado, id_departamento,
       etiquetas, metadatos
FROM rrhh.proyectos
WHERE estado = 'activo'
WITH LOCAL CHECK OPTION;

UPDATE rrhh.vw_proyectos_activos
SET presupuesto = presupuesto + 10000
WHERE id_proyecto = 1000;
```

`CHECK OPTION` evita insertar o actualizar a una fila que deje de ser visible a través de la vista. Las vistas con agregados, `DISTINCT`, conjuntos o ciertos joins no son automáticamente actualizables; pueden usar triggers `INSTEAD OF` si realmente hace falta.

### 12.3 `security_barrier` y `security_invoker`

```sql
CREATE VIEW rrhh.vw_directorio
WITH (security_barrier = true, security_invoker = true) AS
SELECT id_empleado, nombre_completo, email
FROM rrhh.empleados;
```

- `security_barrier` limita reordenamientos que podrían filtrar información mediante funciones con efectos.
- `security_invoker` hace que el acceso a relaciones subyacentes se compruebe con el usuario que consulta (versiones recientes).

Una vista no es una barrera de seguridad completa por defecto. Diseña permisos, RLS y propiedad conjuntamente.

### 12.4 Vistas materializadas

Guardan físicamente el resultado:

```sql
CREATE MATERIALIZED VIEW rrhh.mv_nomina_departamento AS
SELECT d.id_departamento,
       d.nombre,
       count(e.id_empleado) AS empleados,
       coalesce(sum(e.salario), 0) AS nomina
FROM rrhh.departamentos d
LEFT JOIN rrhh.empleados e USING (id_departamento)
GROUP BY d.id_departamento, d.nombre;

CREATE UNIQUE INDEX uq_mv_nomina_departamento
ON rrhh.mv_nomina_departamento (id_departamento);
```

Refrescar:

```sql
REFRESH MATERIALIZED VIEW rrhh.mv_nomina_departamento;

REFRESH MATERIALIZED VIEW CONCURRENTLY rrhh.mv_nomina_departamento;
```

El refresco concurrente permite lecturas durante el proceso, exige un índice `UNIQUE` adecuado y no puede usarse si la vista nunca se ha poblado. El refresco es completo en el núcleo; el mantenimiento incremental requiere otro diseño o herramientas adicionales.

Crear vacía y poblar después:

```sql
CREATE MATERIALIZED VIEW rrhh.mv_proyecto_horas AS
SELECT id_proyecto, sum(horas_asignadas) AS horas
FROM rrhh.empleado_proyecto
GROUP BY id_proyecto
WITH NO DATA;

REFRESH MATERIALIZED VIEW rrhh.mv_proyecto_horas;
```

---

## 13. Funciones, procedimientos, bloques y triggers con PL/pgSQL

### 13.1 Funciones SQL

Para una expresión o consulta simple, `LANGUAGE sql` suele ser suficiente:

```sql
CREATE OR REPLACE FUNCTION rrhh.nomina_departamento(p_id integer)
RETURNS numeric
LANGUAGE sql
STABLE
PARALLEL SAFE
AS $$
    SELECT coalesce(sum(salario), 0)
    FROM rrhh.empleados
    WHERE id_departamento = p_id
$$;

SELECT rrhh.nomina_departamento(10);
```

Volatilidad:

- `IMMUTABLE`: mismos argumentos, mismo resultado siempre; no depende de tablas ni reloj.
- `STABLE`: estable dentro de una sentencia; puede leer la base.
- `VOLATILE`: puede cambiar o tener efectos; predeterminado.

Declárala honestamente: una clasificación incorrecta puede producir planes o resultados erróneos.

Función que devuelve tabla:

```sql
CREATE OR REPLACE FUNCTION rrhh.top_salarios(p_depto integer, p_limite integer DEFAULT 3)
RETURNS TABLE (id_empleado bigint, empleado text, salario numeric)
LANGUAGE sql
STABLE
AS $$
    SELECT e.id_empleado, e.nombre_completo, e.salario
    FROM rrhh.empleados e
    WHERE e.id_departamento = p_depto
    ORDER BY e.salario DESC, e.id_empleado
    LIMIT p_limite
$$;

SELECT * FROM rrhh.top_salarios(p_depto => 10, p_limite => 2);
```

### 13.2 Funciones PL/pgSQL

PL/pgSQL añade variables, condiciones, ciclos y manejo de errores:

```sql
CREATE OR REPLACE FUNCTION rrhh.clasificar_salario(p_salario numeric)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
STRICT
AS $$
BEGIN
    IF p_salario >= 80000 THEN
        RETURN 'alto';
    ELSIF p_salario >= 50000 THEN
        RETURN 'medio';
    ELSE
        RETURN 'inicial';
    END IF;
END;
$$;

SELECT nombre_completo, rrhh.clasificar_salario(salario)
FROM rrhh.empleados;
```

`STRICT` hace que la función devuelva `NULL` sin ejecutarse si algún argumento es nulo.

Variables y diagnóstico:

```sql
CREATE OR REPLACE FUNCTION rrhh.aumentar_salarios(
    p_departamento integer,
    p_porcentaje numeric
) RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
    v_filas integer;
BEGIN
    IF p_porcentaje NOT BETWEEN 0 AND 20 THEN
        RAISE EXCEPTION 'Porcentaje fuera de rango: %', p_porcentaje
            USING ERRCODE = '22023';
    END IF;

    UPDATE rrhh.empleados
    SET salario = round(salario * (1 + p_porcentaje / 100), 2),
        actualizado_en = current_timestamp
    WHERE id_departamento = p_departamento;

    GET DIAGNOSTICS v_filas = ROW_COUNT;
    RETURN v_filas;
END;
$$;

SELECT rrhh.aumentar_salarios(10, 3);
```

No hagas `COMMIT` dentro de una función: participa en la transacción que la llamó.

### 13.3 Ciclos y consultas por conjunto

Ejemplo didáctico de ciclo:

```sql
CREATE OR REPLACE FUNCTION rrhh.emails_departamento(p_id integer)
RETURNS text[]
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    r record;
    v_emails text[] := '{}';
BEGIN
    FOR r IN
        SELECT email FROM rrhh.empleados
        WHERE id_departamento = p_id ORDER BY id_empleado
    LOOP
        v_emails := array_append(v_emails, r.email);
    END LOOP;
    RETURN v_emails;
END;
$$;
```

En producción, la versión declarativa suele ser más simple y rápida:

```sql
SELECT array_agg(email ORDER BY id_empleado)
FROM rrhh.empleados
WHERE id_departamento = 10;
```

Prefiere operaciones por conjuntos; usa ciclos cuando el problema realmente requiere estado secuencial.

### 13.4 Procedimientos y `CALL`

Un procedimiento se invoca con `CALL` y puede controlar transacciones solo bajo condiciones específicas (por ejemplo, `CALL` de nivel superior, no dentro de una transacción iniciada por el cliente):

```sql
CREATE OR REPLACE PROCEDURE rrhh.marcar_proyectos_vencidos()
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE rrhh.proyectos
    SET estado = 'finalizado'
    WHERE upper(periodo) <= current_date
      AND estado <> 'finalizado';
END;
$$;

CALL rrhh.marcar_proyectos_vencidos();
```

Una función devuelve un valor y puede usarse en expresiones; un procedimiento modela una operación llamada explícitamente. Para atomicidad controlada por la aplicación, deja normalmente `COMMIT`/`ROLLBACK` al cliente.

### 13.5 Bloques anónimos `DO`

```sql
DO $$
DECLARE
    v_total integer;
BEGIN
    SELECT count(*) INTO v_total FROM rrhh.empleados;
    RAISE NOTICE 'Empleados registrados: %', v_total;
END;
$$ LANGUAGE plpgsql;
```

`DO` es útil para migraciones o administración puntual. No devuelve filas directamente al cliente.

### 13.6 Triggers de actualización

Función trigger para sello de tiempo:

```sql
CREATE OR REPLACE FUNCTION rrhh.establecer_actualizado_en()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.actualizado_en := current_timestamp;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_empleados_actualizado
BEFORE UPDATE ON rrhh.empleados
FOR EACH ROW
EXECUTE FUNCTION rrhh.establecer_actualizado_en();
```

En un trigger por fila:

- `OLD` es la fila anterior (`UPDATE`, `DELETE`);
- `NEW` es la nueva (`INSERT`, `UPDATE`);
- `TG_OP`, `TG_TABLE_SCHEMA` y `TG_TABLE_NAME` describen el evento.

### 13.7 Trigger de auditoría

```sql
CREATE TABLE rrhh.auditoria_salarios (
    id_auditoria bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empleado bigint NOT NULL,
    salario_anterior numeric(12,2),
    salario_nuevo numeric(12,2),
    cambiado_por name NOT NULL DEFAULT current_user,
    cambiado_en timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE OR REPLACE FUNCTION rrhh.auditar_salario()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.salario IS DISTINCT FROM OLD.salario THEN
        INSERT INTO rrhh.auditoria_salarios
            (id_empleado, salario_anterior, salario_nuevo)
        VALUES
            (NEW.id_empleado, OLD.salario, NEW.salario);
    END IF;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_auditar_salario
AFTER UPDATE OF salario ON rrhh.empleados
FOR EACH ROW
EXECUTE FUNCTION rrhh.auditar_salario();
```

Los triggers ocultan trabajo detrás de una sentencia. Úsalos para reglas cercanas a los datos, documenta efectos y vigila recursión/costo. No reemplazan automáticamente una bitácora de auditoría inmutable y segura.

### 13.8 Manejo de excepciones

```sql
CREATE OR REPLACE FUNCTION rrhh.asignar_proyecto(
    p_empleado bigint,
    p_proyecto bigint,
    p_rol text
) RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO rrhh.empleado_proyecto
        (id_empleado, id_proyecto, rol)
    VALUES (p_empleado, p_proyecto, p_rol);
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'El empleado % ya está asignado al proyecto %',
            p_empleado, p_proyecto
            USING ERRCODE = '23505';
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Empleado o proyecto inexistente'
            USING ERRCODE = '23503';
END;
$$;
```

Un bloque `EXCEPTION` crea una subtransacción y tiene costo. No uses excepciones como flujo normal si `ON CONFLICT` expresa mejor el caso. Captura condiciones específicas; `WHEN OTHERS` puede esconder errores inesperados.

### 13.9 SQL dinámico seguro

```sql
CREATE OR REPLACE FUNCTION rrhh.contar_tabla(p_esquema text, p_tabla text)
RETURNS bigint
LANGUAGE plpgsql
AS $$
DECLARE
    v_total bigint;
BEGIN
    EXECUTE format('SELECT count(*) FROM %I.%I', p_esquema, p_tabla)
    INTO v_total;
    RETURN v_total;
END;
$$;
```

- `%I` escapa identificadores.
- `%L` escapa literales.
- `EXECUTE ... USING` pasa valores como parámetros y es preferible a concatenarlos.

```sql
EXECUTE format('UPDATE %I.%I SET estado = $1 WHERE id_proyecto = $2',
               p_esquema, p_tabla)
USING 'activo', p_id;
```

### 13.10 `SECURITY DEFINER`

Por defecto una función es `SECURITY INVOKER`: usa privilegios del llamador. `SECURITY DEFINER` usa los del propietario y requiere endurecimiento:

```sql
CREATE OR REPLACE FUNCTION rrhh.total_empleados_publico()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, rrhh, pg_temp
AS $$
    SELECT count(*) FROM rrhh.empleados
$$;

REVOKE ALL ON FUNCTION rrhh.total_empleados_publico() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION rrhh.total_empleados_publico() TO app_lectura;
```

Califica objetos, fija un `search_path` seguro, controla el propietario, revoca `EXECUTE` público y valida todas las entradas. Una función definer mal diseñada es una vía de escalamiento de privilegios.

---

## 14. Capacidades avanzadas propias de PostgreSQL

### 14.1 JSONB en profundidad

Construir documentos:

```sql
SELECT jsonb_build_object(
    'id', e.id_empleado,
    'nombre', e.nombre_completo,
    'habilidades', to_jsonb(e.habilidades),
    'departamento', d.nombre
)
FROM rrhh.empleados e
LEFT JOIN rrhh.departamentos d USING (id_departamento)
WHERE e.id_empleado = 101;
```

Operadores principales:

```sql
SELECT
    preferencias ->  'notificaciones'          AS objeto_json,
    preferencias ->> 'idioma'                  AS texto,
    preferencias #>  '{notificaciones,email}'  AS ruta_json,
    preferencias #>> '{notificaciones,email}'  AS ruta_texto,
    preferencias ?   'remoto'                  AS tiene_clave,
    preferencias @>  '{"remoto":true}'::jsonb AS contiene
FROM rrhh.empleados;
```

Modificar sin reemplazar todo el documento:

```sql
UPDATE rrhh.empleados
SET preferencias = jsonb_set(
        preferencias,
        '{notificaciones}',
        coalesce(preferencias->'notificaciones', '{}'::jsonb)
            || '{"sms":false}'::jsonb,
        true
    )
WHERE id_empleado = 101;

UPDATE rrhh.empleados
SET preferencias = preferencias || '{"zona":"America/Mexico_City"}'::jsonb
WHERE id_empleado = 101;

UPDATE rrhh.empleados
SET preferencias = preferencias - 'tema'
WHERE id_empleado = 101;
```

Expandir a filas:

```sql
SELECT e.id_empleado, kv.key, kv.value
FROM rrhh.empleados e
CROSS JOIN LATERAL jsonb_each(e.preferencias) AS kv(key, value);
```

SQL/JSON path:

```sql
SELECT nombre_completo
FROM rrhh.empleados
WHERE preferencias @? '$.notificaciones.email ? (@ == true)';

SELECT jsonb_path_query_array(
    '{"cursos":[{"nombre":"SQL","horas":20},{"nombre":"Git","horas":8}]}'::jsonb,
    '$.cursos[*] ? (@.horas >= 10).nombre'
);
```

Índices GIN:

```sql
-- Flexible: soporta operadores de claves y contención comunes.
CREATE INDEX idx_preferencias_jsonb_ops
ON rrhh.empleados USING gin (preferencias);

-- Más pequeño/específico para @> y jsonpath; no soporta todos los operadores de claves.
CREATE INDEX idx_preferencias_jsonb_path
ON rrhh.empleados USING gin (preferencias jsonb_path_ops);
```

No crees ambos sin medir. Si una ruta concreta domina las consultas, un índice de expresión puede ser mejor:

```sql
CREATE INDEX idx_empleados_idioma
ON rrhh.empleados ((preferencias->>'idioma'));
```

### 14.2 Arrays en profundidad

```sql
SELECT ARRAY[1,2,3] || ARRAY[4,5] AS concatenado,
       ARRAY[1,2,3] && ARRAY[3,9] AS se_solapan,
       ARRAY[1,2,3] @> ARRAY[2,3] AS contiene,
       array_position(ARRAY['sql','java'], 'java') AS posicion;
```

Conservar orden y posición al expandir:

```sql
SELECT e.nombre_completo, h.habilidad, h.posicion
FROM rrhh.empleados e
CROSS JOIN LATERAL
     unnest(e.habilidades) WITH ORDINALITY AS h(habilidad, posicion)
ORDER BY e.id_empleado, h.posicion;
```

Agregar de nuevo:

```sql
SELECT id_departamento,
       array_agg(DISTINCT habilidad ORDER BY habilidad) AS habilidades
FROM rrhh.empleados e
CROSS JOIN LATERAL unnest(e.habilidades) AS h(habilidad)
GROUP BY id_departamento;
```

GIN acelera operadores como `@>`, `<@`, `&&` y `=` sobre arrays. No acelera necesariamente cualquier uso de `ANY` con la misma forma.

### 14.3 Rangos, reservas y restricciones de exclusión

Una restricción de exclusión puede impedir periodos solapados. Para combinar igualdad sobre `bigint` con solapamiento de rango se usa `btree_gist`:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE rrhh.reservas_empleado (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empleado bigint NOT NULL REFERENCES rrhh.empleados,
    periodo tstzrange NOT NULL,
    asunto text NOT NULL,
    EXCLUDE USING gist (
        id_empleado WITH =,
        periodo WITH &&
    )
);

INSERT INTO rrhh.reservas_empleado (id_empleado, periodo, asunto)
VALUES (
    101,
    tstzrange('2026-08-12 09:00-06', '2026-08-12 10:00-06', '[)'),
    'Revisión'
);

-- Fallará: mismo empleado y periodo solapado.
INSERT INTO rrhh.reservas_empleado (id_empleado, periodo, asunto)
VALUES (
    101,
    tstzrange('2026-08-12 09:30-06', '2026-08-12 10:30-06', '[)'),
    'Otra reunión'
);
```

Hacerla diferible permite reorganizar reservas dentro de una transacción:

```sql
ALTER TABLE rrhh.reservas_empleado
DROP CONSTRAINT reservas_empleado_id_empleado_periodo_excl,
ADD CONSTRAINT ex_reserva_solapada
EXCLUDE USING gist (id_empleado WITH =, periodo WITH &&)
DEFERRABLE INITIALLY IMMEDIATE;
```

### 14.4 Búsqueda de texto completo

`LIKE '%palabra%'` no entiende lexemas, idioma o relevancia. Full-text transforma documentos a `tsvector` y consultas a `tsquery`.

```sql
SELECT to_tsvector('spanish', 'Bases de datos y administración de la base')
       @@ plainto_tsquery('spanish', 'administrar datos');
```

Tabla indexada:

```sql
CREATE TABLE rrhh.documentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo text NOT NULL,
    contenido text NOT NULL,
    busqueda tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('spanish', coalesce(titulo, '')), 'A') ||
        setweight(to_tsvector('spanish', coalesce(contenido, '')), 'B')
    ) STORED
);

CREATE INDEX idx_documentos_busqueda
ON rrhh.documentos USING gin (busqueda);

INSERT INTO rrhh.documentos (titulo, contenido)
VALUES
    ('Índices PostgreSQL', 'Introducción a B-tree, GIN, GiST y BRIN'),
    ('Transacciones', 'Aislamiento, MVCC y control de concurrencia');
```

Buscar, puntuar y resaltar:

```sql
WITH q AS (
    SELECT websearch_to_tsquery('spanish', 'índices PostgreSQL') AS consulta
)
SELECT d.titulo,
       ts_rank_cd(d.busqueda, q.consulta) AS relevancia,
       ts_headline('spanish', d.contenido, q.consulta) AS fragmento
FROM rrhh.documentos d
CROSS JOIN q
WHERE d.busqueda @@ q.consulta
ORDER BY relevancia DESC;
```

Constructores:

- `plainto_tsquery`: texto normal unido de manera segura.
- `phraseto_tsquery`: proximidad/frase.
- `websearch_to_tsquery`: sintaxis amigable tipo buscador.
- `to_tsquery`: sintaxis explícita de operadores; valida entrada cuidadosamente.

### 14.5 Trigramas y texto sin distinción de mayúsculas

`pg_trgm` acelera similitud y búsquedas con comodín:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_empleados_nombre_trgm
ON rrhh.empleados USING gin (nombre_completo gin_trgm_ops);

SELECT nombre_completo,
       similarity(nombre_completo, 'Ana Garsia') AS similitud
FROM rrhh.empleados
WHERE nombre_completo % 'Ana Garsia'
ORDER BY similitud DESC;

SELECT * FROM rrhh.empleados
WHERE nombre_completo ILIKE '%garcía%';
```

La extensión `citext` ofrece texto con comparaciones no sensibles a mayúsculas:

```sql
CREATE EXTENSION IF NOT EXISTS citext;
CREATE TABLE cuentas (
    usuario citext PRIMARY KEY
);
INSERT INTO cuentas VALUES ('Ana');
INSERT INTO cuentas VALUES ('ana'); -- duplicado
```

Antes de elegir `citext` o `lower(...)`, revisa requisitos Unicode, collation y reglas lingüísticas.

### 14.6 Extensiones

```sql
SELECT name, default_version, installed_version, comment
FROM pg_available_extensions
ORDER BY name;

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT extname, extversion FROM pg_extension;
ALTER EXTENSION pg_trgm UPDATE;
```

Una extensión ejecuta código y crea objetos con los privilegios del instalador. Instala solo paquetes confiables, fija versiones en despliegues y lee instrucciones de actualización.

Ejemplos populares:

| Extensión | Uso |
|---|---|
| `pg_stat_statements` | estadísticas agregadas de consultas |
| `pg_trgm` | similitud y comodines de texto |
| `citext` | texto no sensible a mayúsculas |
| `btree_gist` / `btree_gin` | operadores adicionales para GiST/GIN |
| `postgres_fdw` | acceder a otro PostgreSQL |
| PostGIS | datos geoespaciales |

### 14.7 Mantenimiento de particiones

Añadir una partición con una tabla preparada:

```sql
CREATE TABLE auditoria_eventos_2026_02
(LIKE auditoria_eventos INCLUDING DEFAULTS INCLUDING CONSTRAINTS);

ALTER TABLE auditoria_eventos_2026_02
ADD CONSTRAINT ck_febrero
CHECK (ocurrido_en >= TIMESTAMPTZ '2026-02-01'
   AND ocurrido_en <  TIMESTAMPTZ '2026-03-01');

ALTER TABLE auditoria_eventos
ATTACH PARTITION auditoria_eventos_2026_02
FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

Separar para archivar:

```sql
ALTER TABLE auditoria_eventos
DETACH PARTITION auditoria_eventos_2026_01;
-- Ahora es una tabla independiente que puede exportarse y luego eliminarse.
```

Otros esquemas:

```sql
CREATE TABLE clientes_por_region (
    id bigint,
    region text NOT NULL,
    nombre text NOT NULL
) PARTITION BY LIST (region);

CREATE TABLE clientes_norte PARTITION OF clientes_por_region
FOR VALUES IN ('norte', 'noroeste');

CREATE TABLE eventos_hash (id bigint, datos jsonb)
PARTITION BY HASH (id);
CREATE TABLE eventos_hash_0 PARTITION OF eventos_hash
FOR VALUES WITH (MODULUS 4, REMAINDER 0);
```

Crea todas las particiones hash necesarias (`REMAINDER 0..3`) antes de insertar cualquier ID.

### 14.8 Foreign Data Wrappers

`postgres_fdw` presenta tablas de otra base PostgreSQL como tablas foráneas:

```sql
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

CREATE SERVER reportes_remotos
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host 'db-reportes.internal', dbname 'reportes', port '5432');

CREATE USER MAPPING FOR app_lectura
SERVER reportes_remotos
OPTIONS (user 'lector_remoto', password 'usar_un_secreto_real');

CREATE SCHEMA reportes_ext;
IMPORT FOREIGN SCHEMA public
LIMIT TO (ventas_mensuales)
FROM SERVER reportes_remotos INTO reportes_ext;

SELECT * FROM reportes_ext.ventas_mensuales;
```

No incrustes contraseñas reales en migraciones. Evalúa *pushdown*, latencia, transacciones distribuidas y fallos parciales; una tabla foránea no convierte dos servidores en una única base con todas las garantías locales.

### 14.9 `LISTEN` / `NOTIFY`

Sesión que escucha:

```sql
LISTEN cambios_proyecto;
```

Otra sesión:

```sql
SELECT pg_notify(
    'cambios_proyecto',
    json_build_object('id_proyecto', 1000, 'estado', 'activo')::text
);
```

La notificación se entrega después del `COMMIT`. Es una señal ligera, no una cola durable: el payload es limitado y un consumidor desconectado pierde eventos. Para trabajo confiable, guarda el evento en una tabla/outbox y usa la notificación solo para despertar consumidores.

### 14.10 Replicación lógica: visión general

En el publicador:

```sql
CREATE PUBLICATION publicacion_rrhh
FOR TABLE rrhh.departamentos, rrhh.empleados;
```

En el suscriptor:

```sql
CREATE SUBSCRIPTION suscripcion_rrhh
CONNECTION 'host=origen.internal dbname=rrhh_db user=replicador password=secreto'
PUBLICATION publicacion_rrhh;
```

La replicación lógica transmite cambios de tablas seleccionadas. Requiere identidad de réplica adecuada para `UPDATE`/`DELETE`, esquema compatible, permisos y configuración de WAL. No replica automáticamente DDL ni secuencias como un flujo de cambios de tabla.

```sql
ALTER TABLE rrhh.empleados REPLICA IDENTITY USING INDEX empleados_pkey;
SELECT * FROM pg_publication_tables;
```

La replicación física, en cambio, reproduce WAL del clúster a nivel de bloques y suele emplearse para alta disponibilidad y réplicas de lectura.

**Punto de control de la etapa 5:** carga suficientes filas de prueba para que un índice pueda ser útil, captura `EXPLAIN (ANALYZE, BUFFERS)` antes y después, y explica cambios en nodo, filas estimadas/reales y buffers. Crea además una función SQL pequeña y una búsqueda full-text con GIN.

---

## 15. Catálogos, mantenimiento, respaldo y observabilidad

### 15.1 `information_schema` y `pg_catalog`

`information_schema` es estándar y portable; `pg_catalog` expone más detalles de PostgreSQL.

```sql
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema = 'rrhh'
ORDER BY table_name;

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'rrhh' AND table_name = 'empleados'
ORDER BY ordinal_position;
```

Tamaños:

```sql
SELECT pg_size_pretty(pg_database_size(current_database())) AS base;

SELECT relname,
       pg_size_pretty(pg_total_relation_size(relid)) AS total,
       pg_size_pretty(pg_relation_size(relid)) AS tabla,
       pg_size_pretty(pg_indexes_size(relid)) AS indices
FROM pg_catalog.pg_statio_user_tables
WHERE schemaname = 'rrhh'
ORDER BY pg_total_relation_size(relid) DESC;
```

Restricciones e índices:

```sql
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'rrhh.empleados'::regclass;

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'rrhh' AND tablename = 'empleados';
```

### 15.2 `VACUUM`, autovacuum y `ANALYZE`

```sql
VACUUM (ANALYZE, VERBOSE) rrhh.empleados;
ANALYZE rrhh.proyectos;
```

- `VACUUM` marca espacio de versiones muertas como reutilizable, mantiene el mapa de visibilidad y previene problemas de wraparound.
- `ANALYZE` toma muestras para estadísticas del planner.
- Autovacuum automatiza ambos; no es un servicio opcional que deba desactivarse normalmente.

Estado por tabla:

```sql
SELECT relname, n_live_tup, n_dead_tup,
       last_autovacuum, last_autoanalyze,
       autovacuum_count, autoanalyze_count
FROM pg_stat_user_tables
WHERE schemaname = 'rrhh'
ORDER BY n_dead_tup DESC;
```

Ajuste por tabla de alto volumen:

```sql
ALTER TABLE rrhh.auditoria_salarios SET (
    autovacuum_vacuum_scale_factor = 0.05,
    autovacuum_analyze_scale_factor = 0.02
);
```

Los valores correctos dependen del volumen y tasa de cambios. Monitorea, no copies porcentajes sin medir.

`VACUUM FULL` reescribe la tabla, recupera espacio al sistema operativo y toma un bloqueo exclusivo:

```sql
VACUUM FULL rrhh.empleados; -- planificar ventana; rara vez es mantenimiento rutinario
```

### 15.3 Reindexar y ordenar físicamente

```sql
REINDEX INDEX CONCURRENTLY rrhh.idx_empleados_depto_salario;
REINDEX TABLE CONCURRENTLY rrhh.empleados;
```

`CLUSTER` reordena físicamente una tabla una vez según un índice:

```sql
CLUSTER rrhh.empleados USING idx_empleados_depto_salario;
ANALYZE rrhh.empleados;
```

El orden no se conserva con futuras escrituras y `CLUSTER` normal requiere un bloqueo fuerte. Para mantenimiento en línea y diagnóstico de bloat existen herramientas/extensiones, pero deben evaluarse por separado.

### 15.4 Sesiones y consultas activas

```sql
SELECT pid, usename, application_name, client_addr,
       state, xact_start, query_start, wait_event_type, wait_event,
       left(query, 120) AS consulta
FROM pg_stat_activity
WHERE datname = current_database()
ORDER BY query_start NULLS LAST;
```

Transacciones viejas:

```sql
SELECT pid, usename, now() - xact_start AS duracion, state, query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY xact_start;
```

Cancelar consulta vs. terminar sesión:

```sql
SELECT pg_cancel_backend(12345);    -- cancela la consulta actual
SELECT pg_terminate_backend(12345); -- termina la conexión y revierte su transacción
```

Verifica primero PID, usuario y consulta. No termines backends al azar; puede interrumpir trabajo crítico.

### 15.5 `pg_stat_statements`

Debe cargarse según la configuración del servidor y crearse como extensión:

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT calls,
       round(total_exec_time::numeric, 2) AS tiempo_total_ms,
       round(mean_exec_time::numeric, 2) AS promedio_ms,
       rows,
       left(query, 160) AS consulta
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;
```

Prioriza tanto consultas lentas como consultas moderadas ejecutadas millones de veces. Las estadísticas son agregadas y normalizadas; combínalas con logs, métricas y planes.

### 15.6 Configuración y timeouts

```sql
SHOW server_version;
SHOW shared_buffers;
SHOW work_mem;
SHOW max_connections;
SHOW statement_timeout;

SELECT name, setting, unit, context, source
FROM pg_settings
WHERE name IN (
    'shared_buffers', 'work_mem', 'maintenance_work_mem',
    'effective_cache_size', 'max_connections'
);
```

Alcances:

```sql
SET statement_timeout = '10s';          -- sesión
SET LOCAL lock_timeout = '2s';          -- transacción
ALTER ROLE ana SET statement_timeout = '30s';
ALTER DATABASE rrhh_db SET idle_in_transaction_session_timeout = '60s';
```

Timeouts útiles:

- `statement_timeout`: duración total de sentencia.
- `lock_timeout`: espera por un lock.
- `idle_in_transaction_session_timeout`: sesión inactiva dentro de una transacción.
- `transaction_timeout`: duración de transacción en versiones recientes.

`ALTER SYSTEM` escribe configuración global y exige administración; algunos parámetros requieren recarga y otros reinicio. Gestiona configuración como código en vez de hacer cambios improvisados.

```sql
SELECT pg_reload_conf();
SELECT name, pending_restart FROM pg_settings WHERE pending_restart;
```

### 15.7 Respaldo lógico

Comandos de shell:

```bash
# Formato custom: comprimido, seleccionable y restaurable en paralelo.
pg_dump -h localhost -U admin -d rrhh_db -Fc -f rrhh.dump

# Inspeccionar contenido.
pg_restore -l rrhh.dump

# Restaurar en una base ya creada.
createdb -h localhost -U admin rrhh_restaurada
pg_restore -h localhost -U admin -d rrhh_restaurada --clean --if-exists rrhh.dump

# Solo un esquema en SQL legible.
pg_dump -h localhost -U admin -d rrhh_db -n rrhh --format=plain -f rrhh.sql
psql -h localhost -U admin -d rrhh_restaurada -f rrhh.sql
```

Roles y tablespaces globales se respaldan aparte:

```bash
pg_dumpall -h localhost -U admin --globals-only -f globals.sql
```

Prueba restauraciones periódicamente. Un archivo de respaldo no verificado no demuestra recuperabilidad.

### 15.8 Respaldo físico y PITR

Base backup para un clúster/standby:

```bash
pg_basebackup -h primario.internal -U replicador \
  -D /ruta/segura/basebackup -Fp -Xs -P
```

Para recuperación a un punto en el tiempo (PITR) se necesita:

1. un respaldo base consistente;
2. archivo continuo de WAL (`archive_mode`, `archive_command` o tooling equivalente);
3. una política de retención que conserve todo WAL necesario;
4. configuración de recuperación y un objetivo (`recovery_target_time`, LSN, nombre, etc.);
5. simulacros de restauración y medición de RPO/RTO.

No copies un directorio de datos de un servidor activo con herramientas de archivos sin un procedimiento de backup consistente.

### 15.9 Replicación y recuperación: comprobaciones

En primario:

```sql
SELECT application_name, client_addr, state, sync_state,
       sent_lsn, write_lsn, flush_lsn, replay_lsn
FROM pg_stat_replication;
```

En réplica:

```sql
SELECT pg_is_in_recovery(),
       pg_last_wal_receive_lsn(),
       pg_last_wal_replay_lsn(),
       now() - pg_last_xact_replay_timestamp() AS retraso_aprox;
```

El retraso temporal puede ser `NULL` o engañoso si no hay transacciones recientes; usa varias métricas y LSN.

### 15.10 Conexiones y pooling

Cada conexión consume recursos. Miles de conexiones de aplicación no equivalen a miles de consultas paralelas eficientes.

```sql
SELECT datname, usename, state, count(*)
FROM pg_stat_activity
GROUP BY datname, usename, state
ORDER BY count(*) DESC;
```

Usa el pool del driver o un proxy como PgBouncer. Con *transaction pooling*, no dependas de estado de sesión persistente (`SET` no local, tablas temporales, prepared statements nombrados o advisory locks de sesión) sin entender el modo del pool.

---

## 16. Uso desde aplicaciones y buenas prácticas

### 16.1 Consultas parametrizadas

Nunca construyas SQL concatenando entrada del usuario:

```sql
-- Conceptual: el driver envía SQL y parámetros por separado.
SELECT id_empleado, nombre_completo
FROM rrhh.empleados
WHERE email = $1 AND id_departamento = $2;
```

Incorrecto en pseudocódigo:

```text
"SELECT * FROM empleados WHERE email = '" + emailUsuario + "'"
```

Los parámetros protegen **valores**, no nombres de tabla/columna. Para identificadores dinámicos usa una lista permitida y funciones de escape del driver, o encapsula con `format('%I', ...)` en código servidor controlado.

### 16.2 Límites transaccionales

Una operación de negocio define la transacción:

```text
BEGIN
  validar saldo/estado con una consulta apropiada
  aplicar cambios relacionados
  escribir outbox/auditoría necesaria
COMMIT
```

No hagas cada sentencia en una transacción distinta si juntas forman una sola regla. Tampoco envuelvas una petición entera con llamadas externas lentas. Las restricciones de base siguen siendo la defensa final ante carreras.

### 16.3 Control optimista

Agrega una versión cuando quieras detectar ediciones perdidas sin mantener un lock durante la edición humana:

```sql
ALTER TABLE rrhh.proyectos
ADD COLUMN version integer NOT NULL DEFAULT 1;

UPDATE rrhh.proyectos
SET presupuesto = 800000,
    version = version + 1
WHERE id_proyecto = 1000
  AND version = 1
RETURNING version;
```

Si no devuelve filas, otra transacción cambió el registro: recarga, combina o informa conflicto.

### 16.4 Manejo por SQLSTATE

No dependas del texto localizado del error. Usa SQLSTATE:

| SQLSTATE | Significado frecuente |
|---|---|
| `23505` | violación unique |
| `23503` | violación foreign key |
| `23514` | violación check |
| `40001` | fallo de serialización; reintentar transacción |
| `40P01` | deadlock; reintentar transacción |
| `55P03` | lock no disponible |
| `57014` | consulta cancelada/timeout |

El reintento debe tener límite, *backoff* con jitter e idempotencia cuando existan efectos externos.

### 16.5 Preparación, lotes y N+1

Evita una consulta por cada fila padre:

```sql
-- N+1: consultar departamentos y luego una consulta por cada departamento.
-- Solución en una operación:
SELECT d.id_departamento, d.nombre,
       jsonb_agg(
           jsonb_build_object('id', e.id_empleado, 'nombre', e.nombre_completo)
           ORDER BY e.id_empleado
       ) FILTER (WHERE e.id_empleado IS NOT NULL) AS empleados
FROM rrhh.departamentos d
LEFT JOIN rrhh.empleados e USING (id_departamento)
GROUP BY d.id_departamento, d.nombre;
```

Para escrituras en lote usa multi-`VALUES`, arrays con `unnest`, tablas temporales o `COPY`, según volumen:

```sql
INSERT INTO rrhh.tareas (titulo, prioridad)
SELECT *
FROM unnest(
    ARRAY['Tarea A','Tarea B']::text[],
    ARRAY['alta','media']::rrhh.prioridad_proyecto[]
) AS x(titulo, prioridad);
```

### 16.6 Fechas, zona y codificación

- Envía `timestamptz` como valores tipados, no cadenas ambiguas.
- Mantén una política clara: UTC para transporte/observabilidad y zona explícita para presentar.
- Guarda la zona IANA (`America/Mexico_City`) cuando una regla futura dependa de horario local; un offset `-06` no captura cambios históricos/futuros.
- Usa UTF-8 y prueba normalización/collation si la igualdad lingüística importa.

```sql
SHOW server_encoding;
SHOW client_encoding;
SHOW TimeZone;

SELECT TIMESTAMPTZ '2026-08-12 10:00 America/Mexico_City'
       AT TIME ZONE 'UTC';
```

### 16.7 Migraciones seguras

Antes:

- prueba sobre una copia con volumen representativo;
- conoce locks y si habrá reescritura;
- define compatibilidad entre versión vieja/nueva de aplicación;
- establece `lock_timeout` y `statement_timeout` razonables;
- prepara reversión o una migración hacia adelante.

Patrón expandir/contraer:

```sql
-- 1. Expandir: columna nullable, sin romper aplicación anterior.
ALTER TABLE rrhh.empleados ADD COLUMN codigo_externo text;

-- 2. Desplegar código que escribe ambos formatos y rellenar por lotes.
UPDATE rrhh.empleados
SET codigo_externo = 'EMP-' || id_empleado
WHERE codigo_externo IS NULL;

-- 3. Validar y endurecer.
ALTER TABLE rrhh.empleados
ADD CONSTRAINT ck_codigo_externo_nn CHECK (codigo_externo IS NOT NULL) NOT VALID;
ALTER TABLE rrhh.empleados VALIDATE CONSTRAINT ck_codigo_externo_nn;
ALTER TABLE rrhh.empleados ALTER COLUMN codigo_externo SET NOT NULL;
ALTER TABLE rrhh.empleados DROP CONSTRAINT ck_codigo_externo_nn;

-- 4. Contraer en un despliegue posterior cuando nadie use el formato viejo.
```

### 16.8 Reglas de modelado

- Declara PK, FK, `NOT NULL`, `UNIQUE` y `CHECK` en la base.
- Usa tipos semánticos; no guardes fecha, número o booleano como texto.
- No uses IDs consecutivos como mecanismo de seguridad.
- Evita borrado lógico indiscriminado: añade políticas, índices parciales y retención si realmente se requiere.
- Nombra y documenta reglas importantes.
- Normaliza primero; desnormaliza solo con una razón medida y estrategia de consistencia.
- No almacenes contraseñas: almacena hashes creados con un algoritmo específico para contraseñas y parámetros actuales, normalmente desde una biblioteca revisada.

### 16.9 Checklist para una consulta

```text
[ ] ¿Devuelve exactamente las filas y columnas necesarias?
[ ] ¿NULL, zona horaria y empates están definidos?
[ ] ¿El ORDER BY hace determinista LIMIT/paginación?
[ ] ¿Los parámetros tienen el tipo correcto?
[ ] ¿Las restricciones protegen carreras?
[ ] ¿EXPLAIN ANALYZE se revisó con datos reales?
[ ] ¿El índice propuesto beneficia el patrón y justifica su costo?
[ ] ¿Timeout, permisos y observabilidad están definidos?
```

**Punto de control de la etapa 6:** genera un respaldo en formato custom, restaúralo en una base nueva y compara conteos. Identifica una transacción larga, una tabla con tuplas muertas y las consultas con mayor tiempo acumulado; no avances hasta poder explicar qué harías y qué no harías automáticamente.

---

## 17. Diferencias importantes entre PostgreSQL y Oracle

| Tema | PostgreSQL | Oracle |
|---|---|---|
| Rol y esquema | independientes; una base contiene varios esquemas | usuario y esquema están estrechamente ligados |
| Identificadores sin comillas | se pliegan a minúsculas | se pliegan a mayúsculas |
| Cadena vacía | `''` es distinta de `NULL` | normalmente se trata como `NULL` |
| Entero autogenerado | `IDENTITY`, secuencia; `serial` histórico | `IDENTITY` o secuencia |
| Texto común | `text`, `varchar` | `varchar2`, `clob` |
| Fecha | `date` no incluye hora | `date` incluye hora |
| Instante con zona | `timestamptz` guarda instante y muestra según sesión | tipos `TIMESTAMP WITH ... TIME ZONE` con semántica propia |
| Booleano en tabla | `boolean` nativo | depende de versión/contexto; históricamente no en SQL de tabla |
| Limitar filas | `LIMIT/OFFSET`, `FETCH` | `FETCH`, `ROWNUM` legado |
| Diferencia de conjuntos | `EXCEPT` | `MINUS` |
| Tabla de una fila | `SELECT 1` sin `FROM` | tradicionalmente `FROM dual` |
| Concatenar | `||`, `concat` | `||`, `concat` |
| Nulo alternativo | `coalesce` | `coalesce`, `nvl` |
| UPSERT | `ON CONFLICT`; también `MERGE` | `MERGE` |
| Devolver DML | `RETURNING` | `RETURNING INTO` |
| Procedural | PL/pgSQL y otros lenguajes | PL/SQL |
| Paquetes | no hay equivalente directo en núcleo; esquemas/extensiones | `PACKAGE` / `PACKAGE BODY` |
| DDL en transacción | normalmente reversible | produce commits implícitos en muchos casos |
| Vista materializada | `REFRESH MATERIALIZED VIEW` | infraestructura y opciones de refresh propias |
| Jerarquías | `WITH RECURSIVE` | `CONNECT BY` y CTE recursivo según versión |
| JSON | `json`/`jsonb`, GIN y SQL/JSON | tipos/funciones JSON propias según versión |

Conversiones comunes:

```sql
-- Oracle: SELECT SYSDATE FROM dual;
SELECT current_timestamp;

-- Oracle: NVL(telefono, 'N/D')
SELECT coalesce(telefono, 'N/D') FROM rrhh.empleados;

-- Oracle: MINUS
SELECT id_departamento FROM rrhh.empleados
EXCEPT
SELECT id_departamento FROM rrhh.proyectos;

-- Oracle: seq_empleados.NEXTVAL
SELECT nextval('rrhh.empleados_id_empleado_seq');

-- Oracle: DECODE(...) suele migrarse a CASE.
SELECT CASE id_departamento WHEN 10 THEN 'Tecnología' ELSE 'Otro' END
FROM rrhh.empleados;
```

No migres con reemplazos de texto únicamente. Revisa semántica de cadena vacía, fechas, zonas, secuencias, excepciones, transacciones, paquetes, hints, índices y privilegios.

---

## 18. PostgreSQL como caché, buscador y base vectorial

Esta sección requiere haber completado al menos las etapas 1–5. No enseña “trucos para convertir PostgreSQL” literalmente en Redis o Elasticsearch: enseña a resolver varios de sus casos de uso dentro de PostgreSQL, medir el resultado y reconocer el punto en que un sistema especializado es la mejor decisión.

### 18.1 Una base extensible no es tres productos idénticos

PostgreSQL puede combinar datos relacionales, documentos JSONB, búsqueda léxica, colas transaccionales y vectores bajo la misma transacción. Esa convergencia reduce sincronización, infraestructura y duplicación para muchas aplicaciones. No elimina las diferencias fundamentales:

| Necesidad | PostgreSQL | Sistema especializado suele ganar cuando… |
|---|---|---|
| clave/valor y caché | PK B-tree, JSONB, UPSERT, TTL modelado | necesitas latencias extremadamente bajas, expiración/evicción nativa y millones de operaciones simples por segundo |
| contadores, sets y ranking | SQL atómico, tablas únicas, agregados | las estructuras se actualizan a altísima frecuencia y sus operaciones nativas dominan la carga |
| cola de trabajo | tabla durable + `FOR UPDATE SKIP LOCKED` | necesitas protocolo de streaming, retención, grupos y escalado independiente muy sofisticados |
| pub/sub | `LISTEN`/`NOTIFY` | necesitas historial, replay, entrega garantizada o gran fan-out |
| búsqueda de texto | `tsvector`, GIN, `pg_trgm`, SQL y joins | necesitas búsqueda distribuida masiva, analizadores muy avanzados, ecosistema de observabilidad o agregaciones especializadas |
| embeddings | extensión pgvector, filtros SQL y transacciones | el corpus/throughput vectorial exige una arquitectura distribuida especializada o funciones administradas concretas |

La pregunta correcta no es “¿puede PostgreSQL hacerlo?”, sino:

```text
¿Cumple SLO de latencia, throughput, recall y disponibilidad
con un costo operativo y una complejidad aceptables?
```

Empieza por PostgreSQL cuando los datos ya son transaccionales y el volumen cabe cómodamente en tu arquitectura. Separa un servicio cuando las mediciones o los requisitos operativos lo justifiquen.

---

### 18.2 PostgreSQL como almacén tipo Redis

Redis no es solo un mapa clave/valor: ofrece strings, hashes, listas, sets, sorted sets, streams, expiración, evicción y más. PostgreSQL puede modelar varios patrones, pero mediante tablas y transacciones.

#### 18.2.1 Clave/valor con UPSERT y TTL

```sql
CREATE SCHEMA IF NOT EXISTS patrones;

CREATE TABLE patrones.cache_kv (
    clave text PRIMARY KEY,
    valor jsonb NOT NULL,
    expira_en timestamptz,
    actualizado_en timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE INDEX idx_cache_kv_expiracion
ON patrones.cache_kv (expira_en)
WHERE expira_en IS NOT NULL;
```

Equivalente conceptual a `SET clave valor EX 300`:

```sql
INSERT INTO patrones.cache_kv AS c (clave, valor, expira_en)
VALUES (
    'empleado:101',
    '{"nombre":"Ana García","departamento":10}',
    current_timestamp + INTERVAL '5 minutes'
)
ON CONFLICT (clave) DO UPDATE
SET valor = EXCLUDED.valor,
    expira_en = EXCLUDED.expira_en,
    actualizado_en = current_timestamp;
```

Equivalente conceptual a `GET`, aplicando expiración **lógica**:

```sql
SELECT valor
FROM patrones.cache_kv
WHERE clave = 'empleado:101'
  AND (expira_en IS NULL OR expira_en > clock_timestamp());
```

Equivalentes a “crear solo si no existe” y “actualizar solo si existe”:

```sql
-- SET NX: no reemplaza una clave existente, aunque esté vencida físicamente.
INSERT INTO patrones.cache_kv (clave, valor, expira_en)
VALUES ('config:tema', '{"modo":"oscuro"}', NULL)
ON CONFLICT (clave) DO NOTHING
RETURNING *;

-- NX lógico: permite reemplazar atómicamente una fila físicamente presente pero vencida.
INSERT INTO patrones.cache_kv AS c (clave, valor, expira_en)
VALUES ('config:temporal', '{"modo":"oscuro"}', current_timestamp + INTERVAL '1 hour')
ON CONFLICT (clave) DO UPDATE
SET valor = EXCLUDED.valor,
    expira_en = EXCLUDED.expira_en,
    actualizado_en = current_timestamp
WHERE c.expira_en IS NOT NULL
  AND c.expira_en <= clock_timestamp()
RETURNING *;

-- SET XX: solo cambia una fila existente y devuelve la nueva versión.
UPDATE patrones.cache_kv
SET valor = '{"modo":"claro"}', actualizado_en = current_timestamp
WHERE clave = 'config:tema'
RETURNING *;

-- DEL
DELETE FROM patrones.cache_kv
WHERE clave = 'config:tema'
RETURNING valor;

-- GETEX conceptual: lee una clave viva y extiende su TTL de forma atómica.
UPDATE patrones.cache_kv
SET expira_en = current_timestamp + INTERVAL '30 minutes',
    actualizado_en = current_timestamp
WHERE clave = 'empleado:101'
  AND (expira_en IS NULL OR expira_en > clock_timestamp())
RETURNING valor, expira_en;
```

PostgreSQL no elimina por TTL automáticamente. La lectura debe ignorar vencidos y un proceso periódico debe limpiar en lotes:

```sql
WITH lote AS MATERIALIZED (
    SELECT clave
    FROM patrones.cache_kv
    WHERE expira_en <= clock_timestamp()
    ORDER BY expira_en
    FOR UPDATE SKIP LOCKED
    LIMIT 1000
)
DELETE FROM patrones.cache_kv c
USING lote l
WHERE c.clave = l.clave
RETURNING c.clave;
```

Ejecuta el lote desde el scheduler de la aplicación o una extensión de planificación aprobada. No uses `WHERE expira_en < now()` como predicado de un índice parcial: los predicados de índice necesitan expresiones inmutables y el reloj cambia.

#### 18.2.2 ¿Tabla normal o `UNLOGGED` para caché?

Una caché reconstruible puede usar tabla no registrada:

```sql
CREATE UNLOGGED TABLE patrones.cache_efimera (
    clave text PRIMARY KEY,
    valor bytea NOT NULL,
    expira_en timestamptz
);
```

Ventaja: evita WAL de sus datos. Costos: se trunca después de un cierre no limpio, no se replica a standbys y sigue generando mantenimiento, locks y presión de conexiones. Para sesiones, tokens o información que no puedas reconstruir, usa una tabla normal y diseña durabilidad explícitamente.

PostgreSQL tampoco ofrece una política `maxmemory`/LRU equivalente. Debes definir límites y eliminación por edad, prioridad o tamaño:

```sql
WITH sobrantes AS (
    SELECT clave
    FROM patrones.cache_kv
    ORDER BY actualizado_en DESC, clave
    OFFSET 100000
)
DELETE FROM patrones.cache_kv c
USING sobrantes s
WHERE c.clave = s.clave;
```

No ejecutes esa estrategia sobre una tabla grande sin analizar su costo. Suele ser mejor borrar lotes acotados y particionar por tiempo si la retención domina.

#### 18.2.3 Contadores atómicos

```sql
CREATE TABLE patrones.contadores (
    clave text PRIMARY KEY,
    valor bigint NOT NULL DEFAULT 0,
    actualizado_en timestamptz NOT NULL DEFAULT current_timestamp
);

INSERT INTO patrones.contadores AS c (clave, valor)
VALUES ('visitas:2026-08-12', 1)
ON CONFLICT (clave) DO UPDATE
SET valor = c.valor + EXCLUDED.valor,
    actualizado_en = current_timestamp
RETURNING valor;
```

La sentencia es atómica. Una sola fila muy caliente puede convertirse en punto de contención porque los escritores serializan sobre ella. Para tasas altas considera contadores fragmentados:

```sql
CREATE TABLE patrones.contadores_fragmentados (
    clave text,
    fragmento smallint,
    valor bigint NOT NULL DEFAULT 0,
    PRIMARY KEY (clave, fragmento)
);

-- La aplicación elige un fragmento estable o aleatorio entre 0 y 31.
INSERT INTO patrones.contadores_fragmentados AS c (clave, fragmento, valor)
VALUES ('visitas:hoy', 7, 1)
ON CONFLICT (clave, fragmento) DO UPDATE
SET valor = c.valor + 1;

SELECT sum(valor) FROM patrones.contadores_fragmentados
WHERE clave = 'visitas:hoy';
```

Se reduce contención a cambio de que la lectura deba sumar fragmentos.

#### 18.2.4 Sets y sorted sets

```sql
CREATE TABLE patrones.conjuntos (
    conjunto text,
    miembro text,
    puntuacion double precision,
    agregado_en timestamptz NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (conjunto, miembro)
);

-- SADD / ZADD conceptual
INSERT INTO patrones.conjuntos (conjunto, miembro, puntuacion)
VALUES
    ('usuarios:activos', 'ana', NULL),
    ('usuarios:activos', 'luis', NULL),
    ('usuarios:admins',  'ana', NULL),
    ('ranking:ventas',   'marta', 98.5),
    ('ranking:ventas',   'ana',   75.0)
ON CONFLICT (conjunto, miembro) DO UPDATE
SET puntuacion = EXCLUDED.puntuacion;
```

Pertenencia, intersección y ranking:

```sql
-- SISMEMBER
SELECT EXISTS (
    SELECT 1 FROM patrones.conjuntos
    WHERE conjunto = 'usuarios:admins' AND miembro = 'ana'
);

-- SINTER de dos conjuntos
SELECT miembro
FROM patrones.conjuntos
WHERE conjunto IN ('usuarios:activos', 'usuarios:admins')
GROUP BY miembro
HAVING count(DISTINCT conjunto) = 2;

-- ZRANGE por puntuación descendente
SELECT miembro, puntuacion,
       dense_rank() OVER (ORDER BY puntuacion DESC) AS posicion
FROM patrones.conjuntos
WHERE conjunto = 'ranking:ventas'
ORDER BY puntuacion DESC, miembro
LIMIT 10;
```

Índice para rangos del ranking:

```sql
CREATE INDEX idx_conjuntos_ranking
ON patrones.conjuntos (conjunto, puntuacion DESC, miembro)
WHERE puntuacion IS NOT NULL;
```

SQL permite joins y reglas ricas; Redis evita el costo relacional y ofrece operaciones nativas muy optimizadas. La elección depende de la tasa y del patrón dominante.

#### 18.2.5 Sesiones con expiración

```sql
CREATE TABLE patrones.sesiones_app (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    id_usuario bigint NOT NULL,
    datos jsonb NOT NULL DEFAULT '{}'::jsonb,
    expira_en timestamptz NOT NULL,
    revocada boolean NOT NULL DEFAULT false,
    creada_en timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE INDEX idx_sesiones_usuario
ON patrones.sesiones_app (id_usuario, expira_en DESC);

SELECT id, datos
FROM patrones.sesiones_app
WHERE id = $1::uuid
  AND NOT revocada
  AND expira_en > current_timestamp;
```

Una sesión suele ser información de seguridad, no una caché inocua. Decide si perderla en un fallo es aceptable, aplica hashing a secretos que no deban almacenarse en claro, limita privilegios y limpia vencidos por lotes.

#### 18.2.6 Cola durable con `SKIP LOCKED`

```sql
CREATE TABLE patrones.trabajos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cola text NOT NULL DEFAULT 'default',
    payload jsonb NOT NULL,
    estado text NOT NULL DEFAULT 'pendiente'
        CHECK (estado IN ('pendiente','procesando','completado','fallido')),
    prioridad integer NOT NULL DEFAULT 0,
    disponible_en timestamptz NOT NULL DEFAULT current_timestamp,
    intentos integer NOT NULL DEFAULT 0,
    max_intentos integer NOT NULL DEFAULT 5,
    tomado_por text,
    token_arrendamiento uuid,
    tomado_en timestamptz,
    ultimo_error text,
    creado_en timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE INDEX idx_trabajos_disponibles
ON patrones.trabajos (cola, prioridad DESC, disponible_en, id)
WHERE estado = 'pendiente';
```

Publicar trabajo dentro de la misma transacción que cambia datos de negocio evita el *dual write*:

```sql
BEGIN;
UPDATE rrhh.proyectos SET estado = 'activo' WHERE id_proyecto = 1002;
INSERT INTO patrones.trabajos (cola, payload)
VALUES ('notificaciones', '{"tipo":"proyecto_activado","id":1002}');
COMMIT;
```

Reclamar uno de forma atómica entre varios workers:

```sql
WITH candidato AS MATERIALIZED (
    SELECT id
    FROM patrones.trabajos
    WHERE cola = 'notificaciones'
      AND estado = 'pendiente'
      AND disponible_en <= current_timestamp
      AND intentos < max_intentos
    ORDER BY prioridad DESC, disponible_en, id
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
UPDATE patrones.trabajos j
SET estado = 'procesando',
    intentos = intentos + 1,
    tomado_por = 'worker-01',
    token_arrendamiento = gen_random_uuid(),
    tomado_en = current_timestamp
FROM candidato c
WHERE j.id = c.id
RETURNING j.*;
```

Confirmar solo si el worker conserva el arrendamiento:

```sql
UPDATE patrones.trabajos
SET estado = 'completado'
WHERE id = $1
  AND token_arrendamiento = $2::uuid
  AND estado = 'procesando'
RETURNING id;
```

Reprogramar un trabajo abandonado:

```sql
UPDATE patrones.trabajos
SET estado = CASE WHEN intentos >= max_intentos THEN 'fallido' ELSE 'pendiente' END,
    disponible_en = current_timestamp + INTERVAL '30 seconds',
    tomado_por = NULL,
    token_arrendamiento = NULL,
    tomado_en = NULL,
    ultimo_error = 'arrendamiento vencido'
WHERE estado = 'procesando'
  AND tomado_en < current_timestamp - INTERVAL '5 minutes';
```

`SKIP LOCKED` es apropiado para una cola porque omitir temporalmente filas ocupadas es intencional. No proporciona por sí solo prioridades estrictas, entrega exactamente una vez o idempotencia. Diseña:

- reintentos con *backoff* y máximo;
- idempotency keys/constraints para efectos externos;
- arrendamiento y recuperación de workers caídos;
- tabla de errores o *dead-letter queue*;
- retención y particionamiento;
- métricas de profundidad, edad e intentos.

#### 18.2.7 Pub/sub e invalidación

```sql
-- Conexión persistente del consumidor
LISTEN invalidar_cache;

-- Productor: se entrega después del COMMIT
SELECT pg_notify(
    'invalidar_cache',
    jsonb_build_object('tipo', 'empleado', 'id', 101)::text
);
```

`LISTEN`/`NOTIFY` se parece a pub/sub efímero: solo reciben clientes conectados, el payload es pequeño (menos de 8000 bytes con la configuración normal), no hay replay ni acknowledgements y notificaciones idénticas dentro de una transacción pueden plegarse. Envía un ID, guarda el evento durable en una tabla *outbox* y usa `NOTIFY` solo como señal de despertar cuando no puedas perderlo.

#### 18.2.8 Cuándo elegir Redis

Elige Redis o evalúalo seriamente si necesitas:

- expiración y evicción nativas bajo presión de memoria;
- estructuras/operaciones Redis como interfaz central;
- latencia de memoria y throughput de comandos simples que PostgreSQL no cumple;
- Redis Streams, tipos probabilísticos u otras funciones especializadas;
- separar la presión de la caché del OLTP principal.

PostgreSQL suele ser suficiente si el conjunto es moderado, necesitas transacciones/joins con la fuente de verdad y quieres evitar consistencia eventual entre dos almacenes. Mide percentiles p95/p99, contención, WAL, bloat, conexiones y recuperación; no compares solo promedios en una laptop.

---

### 18.3 PostgreSQL como motor de búsqueda tipo Elasticsearch

PostgreSQL ofrece búsqueda full-text lingüística con `tsvector`/`tsquery`, similitud y tolerancia a errores con `pg_trgm`, filtros estructurados con SQL/JSONB, agregaciones y búsqueda vectorial. La sección 14 presentó cada pieza; aquí se combinan como un motor de búsqueda de aplicación.

#### 18.3.1 Índice de documentos

```sql
CREATE SCHEMA IF NOT EXISTS busqueda;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE busqueda.documentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id bigint NOT NULL,
    titulo text NOT NULL,
    contenido text NOT NULL,
    categoria text NOT NULL,
    etiquetas text[] NOT NULL DEFAULT '{}',
    atributos jsonb NOT NULL DEFAULT '{}'::jsonb,
    publicado_en timestamptz NOT NULL DEFAULT current_timestamp,
    busqueda tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('spanish', coalesce(titulo, '')), 'A') ||
        setweight(to_tsvector('spanish', coalesce(contenido, '')), 'B')
    ) STORED
);

CREATE INDEX idx_documentos_fts
ON busqueda.documentos USING gin (busqueda);

CREATE INDEX idx_documentos_titulo_trgm
ON busqueda.documentos USING gin (lower(titulo) gin_trgm_ops);

CREATE INDEX idx_documentos_atributos
ON busqueda.documentos USING gin (atributos jsonb_path_ops);

CREATE INDEX idx_documentos_etiquetas
ON busqueda.documentos USING gin (etiquetas);

CREATE INDEX idx_documentos_filtros
ON busqueda.documentos (tenant_id, categoria, publicado_en DESC);
```

Carga mínima:

```sql
INSERT INTO busqueda.documentos
    (tenant_id, titulo, contenido, categoria, etiquetas, atributos)
VALUES
    (1, 'Índices en PostgreSQL',
     'Cómo elegir entre B-tree, GIN, GiST y BRIN y analizar el plan.',
     'base-datos', ARRAY['postgresql','rendimiento'], '{"nivel":"intermedio"}'),
    (1, 'Transacciones y MVCC',
     'Aislamiento, bloqueos, snapshots y control de concurrencia.',
     'base-datos', ARRAY['postgresql','transacciones'], '{"nivel":"avanzado"}'),
    (1, 'Introducción a Java',
     'Tipos, objetos, colecciones y excepciones del lenguaje Java.',
     'programacion', ARRAY['java'], '{"nivel":"inicial"}');
```

La configuración `'spanish'` tokeniza, normaliza lexemas y elimina *stop words* según sus diccionarios. Para corpus multilingüe, separa por idioma/configuración, usa una columna mantenida por trigger o diseña particiones/índices apropiados. No apliques una configuración española a todos los idiomas.

#### 18.3.2 Consulta, ranking y resaltado

```sql
WITH q AS (
    SELECT websearch_to_tsquery('spanish', 'índices PostgreSQL -Java') AS consulta
)
SELECT d.id,
       d.titulo,
       ts_rank_cd(d.busqueda, q.consulta, 32) AS relevancia,
       ts_headline(
           'spanish', d.contenido, q.consulta,
           'StartSel=<mark>, StopSel=</mark>, MaxWords=30, MinWords=12'
       ) AS fragmento
FROM busqueda.documentos d
CROSS JOIN q
WHERE d.tenant_id = 1
  AND d.busqueda @@ q.consulta
ORDER BY relevancia DESC, d.publicado_en DESC, d.id
LIMIT 20;
```

`websearch_to_tsquery` acepta texto amigable, frases entre comillas, `OR` y exclusión con `-` sin lanzar errores de sintaxis por puntuación común. `ts_rank`/`ts_rank_cd` son puntos de partida, no equivalentes exactos al BM25 de Elasticsearch. Puedes combinar relevancia con frescura o popularidad, pero normaliza escalas y evalúa resultados con un conjunto de consultas etiquetadas.

Nunca insertes `ts_headline` directamente en HTML confiando en sus marcadores: el documento original todavía debe escaparse contra XSS.

#### 18.3.3 Frases, prefijos y búsquedas exactas

```sql
-- Palabras normalizadas unidas como frase.
SELECT phraseto_tsquery('spanish', 'control de concurrencia');

-- Prefijo de lexema; to_tsquery exige sintaxis válida.
SELECT to_tsquery('spanish', 'transacc:*');

-- Filtro exacto estructurado, equivalente conceptual a un campo keyword.
SELECT *
FROM busqueda.documentos
WHERE tenant_id = 1
  AND categoria = 'base-datos'
  AND atributos @> '{"nivel":"avanzado"}'::jsonb;
```

En Elasticsearch un mismo valor suele mapearse como `text` para búsqueda analizada y `keyword` para filtros/orden. En PostgreSQL conserva el texto analizado en `busqueda` y la categoría/atributo exacto en columnas o JSONB con índices separados.

#### 18.3.4 Autocompletado y tolerancia a errores

```sql
-- Prefijo/autocompletado sencillo.
SELECT id, titulo
FROM busqueda.documentos
WHERE tenant_id = 1
  AND lower(titulo) LIKE lower('postgre') || '%'
ORDER BY titulo
LIMIT 10;

-- Error ortográfico aproximado.
SELECT id, titulo,
       similarity(titulo, 'Indises en PostgreSQL') AS similitud
FROM busqueda.documentos
WHERE lower(titulo) % lower('Indises en PostgreSQL')
ORDER BY similitud DESC, id
LIMIT 10;
```

El umbral del operador `%` es configurable por sesión:

```sql
BEGIN;
SET LOCAL pg_trgm.similarity_threshold = 0.25;
SELECT titulo FROM busqueda.documentos
WHERE lower(titulo) % lower('postgress indices');
COMMIT;
```

Un umbral menor recupera más candidatos pero añade falsos positivos y costo. Evalúa precisión y recall con errores reales de usuarios.

#### 18.3.5 Facetas y agregaciones

```sql
WITH q AS (
    SELECT websearch_to_tsquery('spanish', 'postgresql') AS consulta
), coincidencias AS MATERIALIZED (
    SELECT d.categoria, d.etiquetas, d.atributos
    FROM busqueda.documentos d
    CROSS JOIN q
    WHERE d.tenant_id = 1
      AND d.busqueda @@ q.consulta
)
SELECT categoria, count(*) AS documentos
FROM coincidencias
GROUP BY categoria
ORDER BY documentos DESC, categoria;
```

Facetas de arrays:

```sql
WITH coincidencias AS (
    SELECT etiquetas
    FROM busqueda.documentos
    WHERE tenant_id = 1
      AND busqueda @@ websearch_to_tsquery('spanish', 'postgresql')
)
SELECT etiqueta, count(*) AS documentos
FROM coincidencias
CROSS JOIN LATERAL unnest(etiquetas) AS e(etiqueta)
GROUP BY etiqueta
ORDER BY documentos DESC, etiqueta;
```

PostgreSQL calcula agregaciones exactas bajo su snapshot. En corpus enormes, facetas complejas y alta concurrencia pueden necesitar vistas materializadas, tablas de resumen o un motor analítico/de búsqueda separado.

#### 18.3.6 Consistencia, seguridad y operación

Ventajas de mantener búsqueda en PostgreSQL:

- una escritura actualiza datos e índice en la misma transacción;
- no existe un pipeline de sincronización hacia un segundo almacén;
- joins, RLS, constraints y recuperación PITR se reutilizan;
- filtros relacionales y relevancia viven en una consulta.

Cuidados:

- aplica siempre `tenant_id`/RLS antes de devolver candidatos;
- mide tamaño y tiempo de actualización de índices GIN/trigram;
- mantén autovacuum y estadísticas saludables;
- separa réplicas de lectura si la búsqueda compite con OLTP, aceptando su retraso;
- registra consultas sin guardar texto sensible innecesario;
- prueba diccionarios, acentos, sinónimos y ranking con lenguaje real.

#### 18.3.7 Cuándo elegir Elasticsearch

Elasticsearch es un motor distribuido de búsqueda y analítica con shards, réplicas, múltiples analizadores, APIs y ecosistema de ingestión/visualización. Evalúalo cuando necesitas:

- distribuir corpus y carga de búsqueda independientemente del OLTP;
- analizadores, sinónimos, highlighting, scoring o agregaciones que superan el alcance práctico de PostgreSQL;
- búsqueda/analítica de logs y observabilidad a gran escala;
- Kibana y el ecosistema Elastic;
- aislar fallos y recursos de búsqueda de las transacciones primarias.

El costo es operar y sincronizar otro sistema. Usa un patrón outbox/CDC, IDs idempotentes, monitoreo de lag y una estrategia de reconstrucción del índice; no hagas dos escrituras independientes desde la aplicación esperando atomicidad.

---

### 18.4 PostgreSQL como base de embeddings con pgvector

Un **embedding** es un vector numérico que representa características semánticas de texto, imagen u otro contenido. Elementos similares quedan cercanos según una métrica. PostgreSQL no genera embeddings por sí solo en el núcleo; normalmente una aplicación o servicio de modelos los calcula. La extensión **pgvector** los almacena, compara e indexa dentro de PostgreSQL.

#### 18.4.1 Flujo mental antes del SQL

```text
Documento
  → limpiar y dividir en fragmentos
  → calcular embedding con un modelo concreto
  → guardar texto + metadatos + modelo + vector

Pregunta
  → calcular embedding con el MISMO modelo
  → aplicar permisos/filtros
  → recuperar vecinos cercanos
  → opcional: combinar con full-text y reordenar
  → usar resultados con citas en búsqueda semántica o RAG
```

La dimensión, tokenización y geometría dependen del modelo. No mezcles vectores de modelos diferentes en una misma comparación aunque tengan igual dimensión.

#### 18.4.2 Instalar pgvector

`CREATE EXTENSION vector` solo funciona si los archivos de pgvector están instalados en el servidor. La imagen `postgres:18` de la sección 2 no los incluye. Para un laboratorio nuevo con una versión fijada:

```bash
docker run --name postgres-vector \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin_segura \
  -e POSTGRES_DB=vector_db \
  -p 5433:5432 \
  -d pgvector/pgvector:0.8.6-pg18

docker exec -it postgres-vector psql -U admin -d vector_db
```

En una instalación administrada, usa el paquete/proveedor compatible con tu versión y aprueba la extensión como cualquier dependencia ejecutable. Después, una vez por base:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
SELECT extname, extversion FROM pg_extension WHERE extname = 'vector';
```

No reemplaces el contenedor del laboratorio original si quieres conservar sus datos; este usa otro nombre y puerto precisamente para practicar sin destruirlos.

#### 18.4.3 Tabla vectorial didáctica

Usaremos tres dimensiones solo para poder leer los números. Un modelo real normalmente produce muchas más.

```sql
CREATE SCHEMA IF NOT EXISTS ia;

CREATE TABLE ia.fragmentos (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id bigint NOT NULL,
    documento_id bigint NOT NULL,
    posicion integer NOT NULL CHECK (posicion >= 0),
    contenido text NOT NULL,
    metadatos jsonb NOT NULL DEFAULT '{}'::jsonb,
    modelo_embedding text NOT NULL,
    version_contenido text NOT NULL,
    embedding vector(3) NOT NULL,
    busqueda tsvector GENERATED ALWAYS AS (
        to_tsvector('spanish', coalesce(contenido, ''))
    ) STORED,
    creado_en timestamptz NOT NULL DEFAULT current_timestamp,
    UNIQUE (tenant_id, documento_id, posicion, modelo_embedding, version_contenido)
);

CREATE INDEX idx_fragmentos_tenant_documento
ON ia.fragmentos (tenant_id, documento_id);

CREATE INDEX idx_fragmentos_fts
ON ia.fragmentos USING gin (busqueda);
```

Datos ilustrativos, no producidos por un modelo real:

```sql
INSERT INTO ia.fragmentos
    (tenant_id, documento_id, posicion, contenido, metadatos,
     modelo_embedding, version_contenido, embedding)
VALUES
    (1, 10, 0, 'PostgreSQL usa MVCC para controlar concurrencia.',
     '{"tema":"postgresql"}', 'didactico-3d', 'sha:a1', '[0.90,0.10,0.05]'),
    (1, 11, 0, 'Los índices B-tree aceleran igualdad, rangos y orden.',
     '{"tema":"postgresql"}', 'didactico-3d', 'sha:b1', '[0.82,0.18,0.08]'),
    (1, 12, 0, 'Las colecciones de Java almacenan grupos de objetos.',
     '{"tema":"java"}', 'didactico-3d', 'sha:c1', '[0.05,0.12,0.93]');
```

Guardar `modelo_embedding` y `version_contenido` permite detectar reindexaciones pendientes, hacer UPSERT idempotente y reconstruir vectores cuando cambia el contenido o el modelo.

#### 18.4.4 Distancias y búsqueda exacta

| Operador | Métrica | Interpretación |
|---|---|---|
| `<->` | distancia L2/Euclidiana | menor es más cercano |
| `<#>` | producto interno negativo | menor es mejor; multiplica por `-1` para mostrar producto interno |
| `<=>` | distancia coseno | menor es más cercano; similitud = `1 - distancia` |
| `<+>` | distancia L1/Manhattan | menor es más cercano |
| `<~>` | Hamming para vectores binarios | bits diferentes |
| `<%>` | Jaccard para vectores binarios | distancia entre conjuntos de bits |

Búsqueda exacta por coseno:

```sql
SELECT id,
       contenido,
       embedding <=> '[0.88,0.12,0.04]'::vector AS distancia_coseno,
       1 - (embedding <=> '[0.88,0.12,0.04]'::vector) AS similitud_coseno
FROM ia.fragmentos
WHERE tenant_id = 1
  AND modelo_embedding = 'didactico-3d'
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 5;
```

El `ORDER BY` usa directamente la distancia en orden ascendente. Esta forma es necesaria para que un índice ANN pueda utilizarse después; ordenar por `1 - distancia DESC` puede impedirlo.

Buscar elementos parecidos a una fila existente:

```sql
SELECT f.id, f.contenido,
       f.embedding <=> origen.embedding AS distancia
FROM ia.fragmentos f
CROSS JOIN (
    SELECT embedding FROM ia.fragmentos WHERE id = 1
) AS origen
WHERE f.id <> 1
  AND f.tenant_id = 1
ORDER BY f.embedding <=> origen.embedding
LIMIT 5;
```

Sin índice aproximado, pgvector hace búsqueda exacta y obtiene recall perfecto, con costo creciente al recorrer vectores.

#### 18.4.5 HNSW e IVFFlat

| Índice | Ventajas | Costos/cuándo usar |
|---|---|---|
| HNSW | buen equilibrio velocidad/recall; no necesita entrenamiento; puede crearse vacío | construcción e inserción más costosas y mayor memoria |
| IVFFlat | construcción más rápida y menor memoria | necesita datos para entrenar listas; tuning de `lists`/`probes`; normalmente menor desempeño velocidad/recall |

HNSW para distancia coseno:

```sql
CREATE INDEX idx_fragmentos_embedding_hnsw
ON ia.fragmentos USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);
```

`m` controla conexiones del grafo y `ef_construction` la lista de candidatos durante construcción. Empieza con defaults; aumentar valores consume más memoria/tiempo y debe justificarse con recall.

Calidad/velocidad por consulta:

```sql
BEGIN;
SET LOCAL hnsw.ef_search = 100;
SET LOCAL hnsw.iterative_scan = strict_order; -- pgvector 0.8+

SELECT id, contenido
FROM ia.fragmentos
WHERE tenant_id = 1
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 5;
COMMIT;
```

Un `ef_search` mayor suele aumentar recall y costo. Con filtros, ANN obtiene candidatos y luego filtra; puede devolver menos filas. Las búsquedas iterativas de pgvector 0.8+ amplían el scan hasta hallar suficientes candidatos o alcanzar límites.

IVFFlat alternativo —no crees ambos en producción sin una prueba que lo justifique—:

```sql
-- Laboratorio reversible: al final vuelve a quedar HNSW.
BEGIN;
DROP INDEX IF EXISTS ia.idx_fragmentos_embedding_hnsw;

-- Crear después de cargar una cantidad representativa de datos.
CREATE INDEX idx_fragmentos_embedding_ivfflat
ON ia.fragmentos USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 1); -- solo para las tres filas del laboratorio

SET LOCAL ivfflat.probes = 1;
SELECT id, contenido
FROM ia.fragmentos
WHERE tenant_id = 1
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 5;
ROLLBACK;
```

El `ROLLBACK` elimina el IVFFlat de prueba y recupera el HNSW que se eliminó dentro de la misma transacción. Tres filas no justifican ningún ANN: el planner preferirá un scan exacto. En datos reales, pgvector propone como punto de partida `filas / 1000` listas hasta un millón de filas y `sqrt(filas)` por encima, con `probes ≈ sqrt(listas)`; no son valores mágicos, valida recall y latencia. En pgvector actual, los índices HNSW/IVFFlat sobre `vector` admiten hasta 2000 dimensiones; `halfvec` permite indexar hasta 4000 y reduce tamaño/precisión. Verifica límites de la versión instalada y la dimensión de tu modelo.

#### 18.4.6 Filtros, multitenancy y recall

```sql
SELECT id, contenido
FROM ia.fragmentos
WHERE tenant_id = 1
  AND metadatos @> '{"tema":"postgresql"}'::jsonb
ORDER BY embedding <=> $1::vector(3)
LIMIT 10;
```

Índices auxiliares:

```sql
CREATE INDEX idx_fragmentos_metadatos
ON ia.fragmentos USING gin (metadatos jsonb_path_ops);

CREATE INDEX idx_fragmentos_tenant_modelo
ON ia.fragmentos (tenant_id, modelo_embedding);
```

Con índices aproximados, los filtros se aplican a los candidatos recuperados y pueden reducir el número final. Opciones:

- activar scans iterativos;
- aumentar `hnsw.ef_search` o `ivfflat.probes`;
- usar búsqueda exacta si el filtro deja pocas filas;
- usar índice HNSW parcial para unas pocas categorías estables;
- particionar por tenant/modelo cuando el aislamiento y volumen lo justifiquen.

```sql
CREATE INDEX idx_fragmentos_tenant_1_hnsw
ON ia.fragmentos USING hnsw (embedding vector_cosine_ops)
WHERE tenant_id = 1;
```

No crees un índice por cada tenant si habrá miles: el catálogo y mantenimiento se vuelven inmanejables. Considera particiones por grupos, tablas separadas o sharding. RLS debe aplicarse también a las consultas vectoriales; nunca recuperes globalmente y filtres permisos solo en la aplicación.

#### 18.4.7 Pipeline de embeddings idempotente

La aplicación debería tratar generación como un trabajo reproducible:

```text
1. Leer documento autorizado.
2. Normalizar y dividir con una estrategia versionada.
3. Calcular hash del fragmento.
4. Si (documento, posición, modelo, hash) ya existe, no recalcular.
5. Enviar lotes al proveedor/modelo con timeout y reintentos.
6. Validar dimensión, valores finitos y modelo esperado.
7. UPSERT del texto, metadatos y vector.
8. Marcar/eliminar fragmentos obsoletos en la misma transición controlada.
9. Medir fallos, costo, lag y cobertura de embeddings.
```

UPSERT parametrizado:

```sql
INSERT INTO ia.fragmentos AS f
    (tenant_id, documento_id, posicion, contenido, metadatos,
     modelo_embedding, version_contenido, embedding)
VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8::vector(3))
ON CONFLICT (
    tenant_id, documento_id, posicion, modelo_embedding, version_contenido
) DO UPDATE
SET contenido = EXCLUDED.contenido,
    metadatos = EXCLUDED.metadatos,
    embedding = EXCLUDED.embedding
WHERE (f.contenido, f.metadatos, f.embedding)
      IS DISTINCT FROM
      (EXCLUDED.contenido, EXCLUDED.metadatos, EXCLUDED.embedding)
RETURNING id;
```

Usa el adaptador pgvector de tu driver para pasar vectores, no concatenes arrays provenientes del usuario. Mantén claves/API del proveedor fuera de PostgreSQL y del repositorio salvo que un diseño de seguridad explícito indique otra cosa.

#### 18.4.8 Búsqueda híbrida: léxica + semántica

Full-text encuentra términos precisos; embeddings capturan cercanía semántica. **Reciprocal Rank Fusion (RRF)** combina rangos sin intentar comparar directamente escalas incompatibles:

```sql
WITH parametros AS (
    SELECT websearch_to_tsquery('spanish', $1) AS consulta_texto,
           $2::vector(3) AS consulta_vector,
           $3::bigint AS tenant
), lexical AS (
    SELECT f.id,
           row_number() OVER (
               ORDER BY ts_rank_cd(f.busqueda, p.consulta_texto) DESC, f.id
           ) AS rango_lexico
    FROM ia.fragmentos f
    CROSS JOIN parametros p
    WHERE f.tenant_id = p.tenant
      AND f.busqueda @@ p.consulta_texto
    ORDER BY ts_rank_cd(f.busqueda, p.consulta_texto) DESC, f.id
    LIMIT 50
), semantica_candidatos AS MATERIALIZED (
    SELECT f.id,
           f.embedding <=> p.consulta_vector AS distancia
    FROM ia.fragmentos f
    CROSS JOIN parametros p
    WHERE f.tenant_id = p.tenant
      AND f.modelo_embedding = 'didactico-3d'
    -- Deja la distancia como único ORDER BY para habilitar el índice ANN.
    ORDER BY f.embedding <=> p.consulta_vector
    LIMIT 50
), semantica AS (
    SELECT id,
           row_number() OVER (ORDER BY distancia, id) AS rango_semantico
    FROM semantica_candidatos
), fusion AS (
    SELECT coalesce(l.id, s.id) AS id,
           coalesce(1.0 / (60 + l.rango_lexico), 0) +
           coalesce(1.0 / (60 + s.rango_semantico), 0) AS puntuacion_rrf
    FROM lexical l
    FULL JOIN semantica s USING (id)
)
SELECT f.id, f.contenido, fusion.puntuacion_rrf
FROM fusion
JOIN ia.fragmentos f USING (id)
ORDER BY fusion.puntuacion_rrf DESC, f.id
LIMIT 10;
```

El `60` es una constante común de suavizado, no una verdad universal. Evalúa `k`, tamaños de candidatos y pesos con un conjunto de relevancia. Para mayor calidad puede reordenarse un conjunto pequeño con un *cross-encoder*, aceptando latencia y costo extra.

#### 18.4.9 RAG con citas y límites de seguridad

Un pipeline RAG básico:

```text
pregunta → embedding → recuperación híbrida autorizada → top fragmentos
→ prompt con IDs/fuentes → generación → respuesta con citas
```

Buenas prácticas:

- filtra tenant, ACL, vigencia e idioma **antes/durante** la recuperación;
- conserva `documento_id`, posición, URL/fuente y versión para citar;
- trata el contenido recuperado como datos no confiables: puede contener prompt injection;
- limita número y tamaño de fragmentos según el contexto del modelo;
- no asumas que similitud significa verdad;
- evalúa recuperación (recall@k, MRR/nDCG), fidelidad de respuesta, latencia y costo por separado;
- registra qué versiones de documento/modelo produjeron una respuesta sin almacenar información sensible innecesaria.

#### 18.4.10 Operación y evaluación de pgvector

El rendimiento ANN no se valida solo con `EXPLAIN`. Compara resultados aproximados contra un baseline exacto:

```sql
BEGIN;
SET LOCAL enable_indexscan = off;
-- Ejecuta el conjunto de consultas y guarda vecinos exactos.
SELECT id
FROM ia.fragmentos
WHERE tenant_id = 1
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 10;
ROLLBACK;
```

Después habilita el índice, repite y calcula `recall@10 = relevantes_recuperados / 10`. Mide también p50/p95/p99, throughput y costo de inserción.

```sql
SELECT pg_size_pretty(pg_relation_size('ia.idx_fragmentos_embedding_hnsw'));

SELECT phase,
       round(100.0 * blocks_done / nullif(blocks_total, 0), 1) AS porcentaje
FROM pg_stat_progress_create_index;

EXPLAIN (ANALYZE, BUFFERS)
SELECT id FROM ia.fragmentos
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 10;
```

Aspectos operativos:

- carga masiva con `COPY` y crea índices después cuando sea posible;
- crea índices de producción con `CONCURRENTLY` si no puedes bloquear escrituras;
- vigila memoria y duración de construcción de HNSW;
- vacuum de HNSW puede ser costoso; mide y sigue recomendaciones de tu versión;
- replica y respalda los vectores como el resto de datos WAL-logged;
- planifica una reindexación completa cuando cambie el modelo;
- no fuerces `enable_seqscan = off` como solución permanente: en tablas pequeñas el scan es correcto.

#### 18.4.11 Cuándo elegir una base vectorial dedicada

PostgreSQL + pgvector es especialmente atractivo cuando:

- los metadatos relacionales y permisos son parte esencial de cada búsqueda;
- necesitas atomicidad entre contenido y vector;
- el corpus y QPS caben en la escala que puedes operar y medir;
- quieres full-text, vectores y SQL en un único sistema;
- tu equipo ya domina backup, HA y observabilidad de PostgreSQL.

Evalúa un servicio vectorial especializado si necesitas sharding/rebalanceo vectorial transparente a una escala que tu PostgreSQL no cumple, ingestion y búsquedas masivas independientes del OLTP, características específicas del proveedor o aislamiento operacional estricto. Haz una prueba con datos, filtros y consultas reales; los benchmarks sin filtros y con vectores aleatorios rara vez representan RAG de producción.

---

### 18.5 Laboratorio integrador de especialización

Construye una mini base de conocimiento:

1. usa `busqueda.documentos` como fuente transaccional;
2. crea un trabajo en `patrones.trabajos` cuando cambia un documento;
3. un worker divide el documento, genera embeddings y hace UPSERT en `ia.fragmentos`;
4. ejecuta recuperación léxica, semántica e híbrida;
5. envía `NOTIFY` solo para invalidar caché después del commit;
6. guarda respuestas populares temporalmente en `patrones.cache_kv`;
7. añade permisos por `tenant_id` y demuestra que no hay fuga entre tenants;
8. mide plan, recall@k, p95 y crecimiento de índices;
9. simula caída de worker y recupera el arrendamiento;
10. respalda, restaura y verifica documentos, trabajos y vectores.

**Punto de control de la etapa 7:** explica, usando resultados del laboratorio, qué responsabilidad asignaste a cada tabla, qué garantía de entrega tiene la cola, cómo expira la caché, qué índice resuelve cada búsqueda y bajo qué umbral migrarías cada carga a Redis, Elasticsearch o una base vectorial dedicada.

---

## 19. Ejercicios prácticos con solución

Restablece el esquema de la sección 3 si cambiaste los datos. Intenta cada ejercicio sin abrir la solución y verifica con consultas propias. Cuando sea posible:

```sql
BEGIN;
-- solución a probar
ROLLBACK;
```

### Ejercicio 1 — DDL, restricciones y agregación

**Enunciado:** crea una tabla `capacitaciones` con ID autogenerado, nombre de curso, horas positivas, fecha e ID de empleado. Un empleado no puede registrar dos veces el mismo curso en la misma fecha. Inserta tres filas y muestra **todos** los empleados con sus horas totales, incluidos quienes tienen cero.

<details>
<summary>Ver solución</summary>

```sql
CREATE TABLE rrhh.capacitaciones (
    id_capacitacion bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_empleado bigint NOT NULL
        REFERENCES rrhh.empleados(id_empleado) ON DELETE CASCADE,
    curso text NOT NULL CHECK (length(trim(curso)) > 0),
    horas numeric(5,2) NOT NULL CHECK (horas > 0),
    impartida_el date NOT NULL,
    UNIQUE (id_empleado, curso, impartida_el)
);

INSERT INTO rrhh.capacitaciones
    (id_empleado, curso, horas, impartida_el)
VALUES
    (101, 'PostgreSQL avanzado', 20, DATE '2026-07-10'),
    (101, 'Índices y rendimiento', 12, DATE '2026-07-20'),
    (102, 'Docker', 8, DATE '2026-07-15');

SELECT e.id_empleado,
       e.nombre_completo,
       coalesce(sum(c.horas), 0) AS horas_totales
FROM rrhh.empleados e
LEFT JOIN rrhh.capacitaciones c USING (id_empleado)
GROUP BY e.id_empleado, e.nombre_completo
ORDER BY horas_totales DESC, e.id_empleado;
```

`count(*)` después del `LEFT JOIN` contaría una fila incluso sin capacitación. Para contar cursos usa `count(c.id_capacitacion)`.

</details>

### Ejercicio 2 — top por grupo de tres formas

**Enunciado:** muestra el empleado mejor pagado de cada departamento. Resuelve con `DISTINCT ON`, función de ventana y subconsulta correlacionada. Define qué sucede si hay empate.

<details>
<summary>Ver solución</summary>

```sql
-- Una sola fila determinista por departamento.
SELECT DISTINCT ON (e.id_departamento)
       d.nombre AS departamento, e.nombre_completo, e.salario
FROM rrhh.empleados e
JOIN rrhh.departamentos d USING (id_departamento)
ORDER BY e.id_departamento, e.salario DESC, e.id_empleado;

-- Una sola fila determinista por departamento.
WITH clasificados AS (
    SELECT e.*,
           row_number() OVER (
               PARTITION BY id_departamento
               ORDER BY salario DESC, id_empleado
           ) AS posicion
    FROM rrhh.empleados e
)
SELECT d.nombre, c.nombre_completo, c.salario
FROM clasificados c
JOIN rrhh.departamentos d USING (id_departamento)
WHERE c.posicion = 1;

-- Devuelve a todos los empatados en el máximo.
SELECT d.nombre, e.nombre_completo, e.salario
FROM rrhh.empleados e
JOIN rrhh.departamentos d USING (id_departamento)
WHERE e.salario = (
    SELECT max(e2.salario)
    FROM rrhh.empleados e2
    WHERE e2.id_departamento = e.id_departamento
);
```

También se puede usar `rank() = 1` para conservar empates. “El mejor” no define una sola fila si no se especifica desempate.

</details>

### Ejercicio 3 — JSONB y arrays

**Enunciado:** agrega a las preferencias del empleado 102 una estructura `notificaciones.email = true` sin perder las claves existentes. Consulta empleados remotos que sepan `postgresql` o `docker`. Propón índices.

<details>
<summary>Ver solución</summary>

```sql
UPDATE rrhh.empleados
SET preferencias = jsonb_set(
        preferencias,
        '{notificaciones}',
        coalesce(preferencias->'notificaciones', '{}'::jsonb)
            || '{"email":true}'::jsonb,
        true
    )
WHERE id_empleado = 102
RETURNING preferencias;

SELECT id_empleado, nombre_completo
FROM rrhh.empleados
WHERE preferencias @> '{"remoto":true}'::jsonb
  AND habilidades && ARRAY['postgresql','docker'];

CREATE INDEX IF NOT EXISTS idx_empleados_preferencias_ej
ON rrhh.empleados USING gin (preferencias);

CREATE INDEX IF NOT EXISTS idx_empleados_habilidades_ej
ON rrhh.empleados USING gin (habilidades);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id_empleado, nombre_completo
FROM rrhh.empleados
WHERE preferencias @> '{"remoto":true}'::jsonb
  AND habilidades && ARRAY['postgresql','docker'];
```

En siete filas el planner probablemente prefiera `Seq Scan`: no significa que el índice esté mal. Mide con volumen y distribución representativos.

</details>

### Ejercicio 4 — cola concurrente

**Enunciado:** crea una tabla `trabajos` y una sentencia atómica que reserve un trabajo pendiente para cada worker sin que dos workers tomen el mismo.

<details>
<summary>Ver solución</summary>

```sql
CREATE TABLE rrhh.trabajos (
    id_trabajo bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    payload jsonb NOT NULL,
    estado text NOT NULL DEFAULT 'pendiente'
        CHECK (estado IN ('pendiente','procesando','completado','fallido')),
    disponible_en timestamptz NOT NULL DEFAULT current_timestamp,
    intentos integer NOT NULL DEFAULT 0,
    tomado_por text,
    tomado_en timestamptz
);

CREATE INDEX idx_trabajos_pendientes
ON rrhh.trabajos (disponible_en, id_trabajo)
WHERE estado = 'pendiente';

INSERT INTO rrhh.trabajos (payload)
VALUES ('{"tipo":"email","destino":"ana@example.test"}'),
       ('{"tipo":"reporte","mes":"2026-07"}');

BEGIN;
WITH candidato AS (
    SELECT id_trabajo
    FROM rrhh.trabajos
    WHERE estado = 'pendiente'
      AND disponible_en <= current_timestamp
    ORDER BY disponible_en, id_trabajo
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
UPDATE rrhh.trabajos j
SET estado = 'procesando',
    intentos = intentos + 1,
    tomado_por = 'worker-01',
    tomado_en = current_timestamp
FROM candidato c
WHERE j.id_trabajo = c.id_trabajo
RETURNING j.*;
COMMIT;
```

El procesamiento externo requiere además estrategia de lease/timeout, reintentos, idempotencia y recuperación de workers caídos.

</details>

### Ejercicio 5 — transacción de cambio de departamento

**Enunciado:** crea una función que mueva un empleado a otro departamento y elimine sus asignaciones a proyectos del departamento anterior. Debe fallar si no existe el empleado o el nuevo departamento, y toda la operación debe ser atómica.

<details>
<summary>Ver solución</summary>

```sql
CREATE OR REPLACE FUNCTION rrhh.cambiar_departamento(
    p_empleado bigint,
    p_departamento_nuevo integer
) RETURNS TABLE (asignaciones_retiradas integer, empleado_actualizado bigint)
LANGUAGE plpgsql
AS $$
DECLARE
    v_departamento_anterior integer;
    v_retiradas integer;
BEGIN
    -- Obtiene el estado actual y evita cambios concurrentes en la misma fila.
    SELECT id_departamento
    INTO STRICT v_departamento_anterior
    FROM rrhh.empleados
    WHERE id_empleado = p_empleado
    FOR UPDATE;

    PERFORM 1
    FROM rrhh.departamentos
    WHERE id_departamento = p_departamento_nuevo
      AND activo;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Departamento nuevo inexistente o inactivo: %',
            p_departamento_nuevo USING ERRCODE = '23503';
    END IF;

    IF v_departamento_anterior IS NOT DISTINCT FROM p_departamento_nuevo THEN
        RETURN QUERY SELECT 0, p_empleado;
        RETURN;
    END IF;

    DELETE FROM rrhh.empleado_proyecto ep
    USING rrhh.proyectos p
    WHERE ep.id_proyecto = p.id_proyecto
      AND ep.id_empleado = p_empleado
      AND p.id_departamento = v_departamento_anterior;

    GET DIAGNOSTICS v_retiradas = ROW_COUNT;

    UPDATE rrhh.empleados
    SET id_departamento = p_departamento_nuevo
    WHERE id_empleado = p_empleado;

    RETURN QUERY SELECT v_retiradas, p_empleado;
EXCEPTION
    WHEN no_data_found THEN
        RAISE EXCEPTION 'Empleado inexistente: %', p_empleado
            USING ERRCODE = 'P0002';
END;
$$;

BEGIN;
SELECT * FROM rrhh.cambiar_departamento(103, 10);
-- verificaciones
SELECT id_empleado, id_departamento FROM rrhh.empleados WHERE id_empleado = 103;
SELECT * FROM rrhh.empleado_proyecto WHERE id_empleado = 103;
ROLLBACK; -- o COMMIT para conservarlo
```

La función no confirma por sí misma: si cualquier paso falla, su sentencia se revierte; el cliente controla la transacción completa.

</details>

### Ejercicio 6 — búsqueda de texto y relevancia

**Enunciado:** usando `rrhh.documentos`, busca la expresión estilo web `postgresql -oracle`, muestra título, relevancia y fragmento resaltado. Verifica que se proponga el índice correcto.

<details>
<summary>Ver solución</summary>

```sql
WITH consulta AS (
    SELECT websearch_to_tsquery('spanish', 'postgresql -oracle') AS q
)
SELECT d.id,
       d.titulo,
       ts_rank_cd(d.busqueda, c.q) AS relevancia,
       ts_headline(
           'spanish',
           d.contenido,
           c.q,
           'StartSel=<mark>, StopSel=</mark>, MaxWords=25, MinWords=10'
       ) AS fragmento
FROM rrhh.documentos d
CROSS JOIN consulta c
WHERE d.busqueda @@ c.q
ORDER BY relevancia DESC, d.id;

-- Ya definido en la sección 14:
CREATE INDEX IF NOT EXISTS idx_documentos_busqueda
ON rrhh.documentos USING gin (busqueda);
```

Escapa/sanitiza el HTML de `ts_headline` en la capa de presentación; sus marcadores no vuelven confiable el texto almacenado.

</details>

### Ejercicio 7 — diagnóstico de una consulta

**Enunciado:** la aplicación ejecuta con frecuencia:

```sql
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
WHERE id_departamento = $1
  AND fecha_contratacion >= $2
ORDER BY salario DESC, id_empleado
LIMIT 20;
```

Propón un índice, explica el orden y di cómo verificarlo.

<details>
<summary>Ver solución</summary>

```sql
CREATE INDEX CONCURRENTLY idx_emp_depto_salario_fecha
ON rrhh.empleados (
    id_departamento,
    salario DESC,
    id_empleado,
    fecha_contratacion
)
INCLUDE (nombre_completo);
```

El prefijo de igualdad `id_departamento` permite acotar por departamento y las siguientes claves satisfacen el orden/límite. `fecha_contratacion` queda después del orden: se filtra en el índice pero puede revisar más entradas antes de reunir 20. Otra opción:

```sql
CREATE INDEX CONCURRENTLY idx_emp_depto_fecha_salario
ON rrhh.empleados (
    id_departamento,
    fecha_contratacion,
    salario DESC,
    id_empleado
)
INCLUDE (nombre_completo);
```

Esta acota mejor la fecha, pero después de un rango por fecha normalmente no entrega todo ya ordenado por salario. No existe una respuesta universal: depende de selectividad, distribución y frecuencia.

Verificación:

```sql
ANALYZE rrhh.empleados;
EXPLAIN (ANALYZE, BUFFERS)
SELECT id_empleado, nombre_completo, salario
FROM rrhh.empleados
WHERE id_departamento = 10
  AND fecha_contratacion >= DATE '2023-01-01'
ORDER BY salario DESC, id_empleado
LIMIT 20;
```

Prueba ambas alternativas en una copia realista y conserva solo la que justifique su costo.

</details>

### Ejercicio 8 — caché tipo Redis con TTL

**Enunciado:** sobre `patrones.cache_kv`, escribe una operación que guarde un resultado durante 10 minutos, una lectura que nunca devuelva vencidos y una limpieza concurrente de máximo 100 filas. Explica por qué un índice parcial con `WHERE expira_en < now()` no es válido.

<details>
<summary>Ver solución</summary>

```sql
-- Escritura/upsert.
INSERT INTO patrones.cache_kv AS c (clave, valor, expira_en)
VALUES (
    'reporte:nomina:10',
    '{"departamento":10,"total":174000}',
    current_timestamp + INTERVAL '10 minutes'
)
ON CONFLICT (clave) DO UPDATE
SET valor = EXCLUDED.valor,
    expira_en = EXCLUDED.expira_en,
    actualizado_en = current_timestamp;

-- Lectura con expiración lógica.
SELECT valor
FROM patrones.cache_kv
WHERE clave = 'reporte:nomina:10'
  AND (expira_en IS NULL OR expira_en > clock_timestamp());

-- Limpieza que varios workers pueden ejecutar sin reclamar la misma fila.
WITH vencidas AS MATERIALIZED (
    SELECT clave
    FROM patrones.cache_kv
    WHERE expira_en <= clock_timestamp()
    ORDER BY expira_en, clave
    FOR UPDATE SKIP LOCKED
    LIMIT 100
)
DELETE FROM patrones.cache_kv c
USING vencidas v
WHERE c.clave = v.clave
RETURNING c.clave;
```

Un predicado de índice debe permanecer verdadero para una fila sin que el índice se reconstruya. `now()` cambia con el tiempo y no es inmutable. Por eso se indexan valores no nulos de `expira_en` y el instante actual se aplica en la consulta.

</details>

### Ejercicio 9 — buscador con filtros y facetas

**Enunciado:** busca `postgresql rendimiento` en los documentos del tenant 1, limita a nivel `intermedio`, devuelve relevancia y genera una faceta por categoría usando exactamente el mismo conjunto filtrado.

<details>
<summary>Ver solución</summary>

```sql
WITH parametros AS (
    SELECT websearch_to_tsquery('spanish', 'postgresql rendimiento') AS q
), coincidencias AS MATERIALIZED (
    SELECT d.id, d.titulo, d.categoria, d.publicado_en,
           ts_rank_cd(d.busqueda, p.q) AS relevancia
    FROM busqueda.documentos d
    CROSS JOIN parametros p
    WHERE d.tenant_id = 1
      AND d.atributos @> '{"nivel":"intermedio"}'::jsonb
      AND d.busqueda @@ p.q
)
SELECT id, titulo, relevancia
FROM coincidencias
ORDER BY relevancia DESC, publicado_en DESC, id;

WITH parametros AS (
    SELECT websearch_to_tsquery('spanish', 'postgresql rendimiento') AS q
), coincidencias AS MATERIALIZED (
    SELECT d.categoria
    FROM busqueda.documentos d
    CROSS JOIN parametros p
    WHERE d.tenant_id = 1
      AND d.atributos @> '{"nivel":"intermedio"}'::jsonb
      AND d.busqueda @@ p.q
)
SELECT categoria, count(*) AS documentos
FROM coincidencias
GROUP BY categoria
ORDER BY documentos DESC, categoria;
```

En una API real conviene encapsular la definición base para que resultados y facetas no diverjan al agregar filtros.

</details>

### Ejercicio 10 — embeddings y búsqueda híbrida

**Enunciado:** en la base con pgvector, recupera cinco fragmentos semánticos del tenant 1 para un vector de consulta, explica por qué el filtro debe ir dentro de la consulta y describe cómo compararías HNSW con la búsqueda exacta. Añade después una rama full-text y fusión RRF.

<details>
<summary>Ver solución</summary>

```sql
-- Semántica autorizada y filtrada.
BEGIN;
SET LOCAL hnsw.ef_search = 100;
SET LOCAL hnsw.iterative_scan = strict_order;

SELECT id, documento_id, contenido,
       embedding <=> '[0.88,0.12,0.04]'::vector AS distancia
FROM ia.fragmentos
WHERE tenant_id = 1
  AND modelo_embedding = 'didactico-3d'
ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
LIMIT 5;
COMMIT;
```

El tenant se filtra en la base para impedir fugas y reducir candidatos. Para medir recall, guarda el top 5 exacto con `SET LOCAL enable_indexscan = off`, ejecuta después HNSW con distintos `ef_search` y calcula qué proporción de esos IDs aparece, junto con p95/p99.

Fusión abreviada:

```sql
WITH lexical AS (
    SELECT id,
           row_number() OVER (
               ORDER BY ts_rank_cd(busqueda, p.q) DESC, id
           ) AS r
    FROM ia.fragmentos
    CROSS JOIN (
        SELECT websearch_to_tsquery('spanish', 'concurrencia postgres') AS q
    ) AS p
    WHERE tenant_id = 1 AND busqueda @@ p.q
    ORDER BY ts_rank_cd(busqueda, p.q) DESC, id
    LIMIT 20
), semantica_candidatos AS MATERIALIZED (
    SELECT id,
           embedding <=> '[0.88,0.12,0.04]'::vector AS distancia
    FROM ia.fragmentos
    WHERE tenant_id = 1 AND modelo_embedding = 'didactico-3d'
    ORDER BY embedding <=> '[0.88,0.12,0.04]'::vector
    LIMIT 20
), semantica AS (
    SELECT id, row_number() OVER (ORDER BY distancia, id) AS r
    FROM semantica_candidatos
)
SELECT f.id, f.contenido,
       coalesce(1.0 / (60 + l.r), 0) +
       coalesce(1.0 / (60 + s.r), 0) AS rrf
FROM lexical l
FULL JOIN semantica s USING (id)
JOIN ia.fragmentos f ON f.id = coalesce(l.id, s.id)
ORDER BY rrf DESC, f.id
LIMIT 5;
```

</details>

---

## 20. Cheat-sheet de referencia rápida

### Conexión y `psql`

```bash
psql -h HOST -p 5432 -U USUARIO -d BASE
psql 'postgresql://USUARIO@HOST:5432/BASE?sslmode=require'
```

```text
\l                bases              \dn              esquemas
\dt rrhh.*        tablas             \d+ rrhh.tabla   estructura
\di rrhh.*        índices            \df rrhh.*       funciones
\du               roles              \dp rrhh.*       permisos
\x auto           salida expandida   \timing on       duración
\i archivo.sql    ejecutar archivo    \copy            CSV cliente
\h COMANDO        ayuda SQL           \q               salir
```

### Tipos

```text
Enteros:       smallint integer bigint
Exactos:       numeric(p,s) decimal
Flotantes:     real double precision
Texto:         text varchar(n) char(n) citext(extensión)
Booleano:      boolean
Fecha/hora:    date time timestamp timestamptz interval
Estructurados: json jsonb arrays composite enum domain
Especiales:    uuid bytea inet cidr macaddr xml
Rangos:        int4range int8range numrange daterange tsrange tstzrange
Búsqueda:      tsvector tsquery
```

### DDL

```sql
CREATE SCHEMA app;

CREATE TABLE app.ejemplo (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo text NOT NULL UNIQUE,
    padre_id bigint REFERENCES app.ejemplo(id) ON DELETE SET NULL,
    monto numeric(12,2) NOT NULL CHECK (monto >= 0),
    datos jsonb NOT NULL DEFAULT '{}'::jsonb,
    creado_en timestamptz NOT NULL DEFAULT current_timestamp
);

ALTER TABLE app.ejemplo ADD COLUMN activo boolean DEFAULT true;
ALTER TABLE app.ejemplo ALTER COLUMN activo SET NOT NULL;
ALTER TABLE app.ejemplo DROP COLUMN activo;
TRUNCATE app.ejemplo RESTART IDENTITY;
DROP TABLE IF EXISTS app.ejemplo;
```

### DML

```sql
INSERT INTO t (a, b) VALUES ($1, $2) RETURNING id;
INSERT INTO t (clave, valor) VALUES ($1, $2)
ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor
RETURNING *;

UPDATE t SET valor = $1 WHERE id = $2 RETURNING *;
UPDATE t AS destino SET valor = origen.valor
FROM origen WHERE origen.id = destino.id;

DELETE FROM t WHERE id = $1 RETURNING *;
DELETE FROM t AS destino USING origen WHERE destino.id = origen.id;

MERGE INTO destino d USING origen o ON d.id = o.id
WHEN MATCHED THEN UPDATE SET valor = o.valor
WHEN NOT MATCHED THEN INSERT (id, valor) VALUES (o.id, o.valor);
```

### `SELECT`

```sql
SELECT [DISTINCT] expresiones
FROM tabla t
[JOIN otra o ON ...]
[WHERE condicion]
[GROUP BY claves]
[HAVING condicion_de_grupo]
[ORDER BY expresiones]
[LIMIT n OFFSET m];
```

```sql
-- Agregación condicional
count(*) FILTER (WHERE condicion)

-- CTE
WITH nombre AS (SELECT ...) SELECT ... FROM nombre;

-- Recursión
WITH RECURSIVE arbol AS (
    SELECT ...                 -- base
    UNION ALL
    SELECT ... FROM arbol ...  -- paso
) SELECT * FROM arbol;

-- Ventana
row_number() OVER (PARTITION BY grupo ORDER BY valor DESC)
sum(valor) OVER (
    ORDER BY fecha ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- Top 1 por grupo PostgreSQL
SELECT DISTINCT ON (grupo) *
FROM t ORDER BY grupo, valor DESC, id;
```

### Operadores útiles

```text
Nulos:       IS NULL, IS NOT NULL, IS [NOT] DISTINCT FROM, coalesce
Patrones:    LIKE, ILIKE, ~, ~*, !~, !~*
Conjuntos:   UNION, UNION ALL, INTERSECT, EXCEPT
Arrays:      @> contiene, <@ contenido, && solapa, = ANY(array)
JSONB:       -> JSON, ->> texto, #> ruta, @> contiene, ?, @?, @@
Rangos:      @> contiene, && solapa, -|- adyacente, * intersección
Texto full:  tsvector @@ tsquery
```

### Transacciones y locks

```sql
BEGIN [ISOLATION LEVEL READ COMMITTED | REPEATABLE READ | SERIALIZABLE];
SAVEPOINT sp;
ROLLBACK TO SAVEPOINT sp;
RELEASE SAVEPOINT sp;
COMMIT; -- o ROLLBACK

SELECT ... FOR UPDATE [NOWAIT | SKIP LOCKED];
SET LOCAL lock_timeout = '2s';
SET LOCAL statement_timeout = '30s';
```

### Roles y permisos

```sql
CREATE ROLE lector NOLOGIN;
CREATE ROLE usuario LOGIN PASSWORD 'secreto';
GRANT lector TO usuario;

GRANT CONNECT ON DATABASE base TO lector;
GRANT USAGE ON SCHEMA app TO lector;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO lector;

ALTER DEFAULT PRIVILEGES FOR ROLE propietario IN SCHEMA app
GRANT SELECT ON TABLES TO lector;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
```

### Índices y planes

```sql
CREATE INDEX idx_simple ON t (columna);
CREATE INDEX idx_compuesto ON t (a, b DESC);
CREATE INDEX idx_expresion ON t (lower(email));
CREATE INDEX idx_parcial ON t (fecha) WHERE activo;
CREATE INDEX idx_cover ON t (a) INCLUDE (b, c);
CREATE INDEX idx_json ON t USING gin (datos);
CREATE INDEX idx_rango ON t USING gist (periodo);
CREATE INDEX idx_tiempo_brin ON t USING brin (creado_en);
CREATE INDEX CONCURRENTLY idx_online ON t (a);

ANALYZE t;
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
```

### PL/pgSQL

```sql
CREATE OR REPLACE FUNCTION app.f(p_id bigint)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
    v_resultado text;
BEGIN
    SELECT valor INTO STRICT v_resultado FROM app.t WHERE id = p_id;
    RETURN v_resultado;
EXCEPTION
    WHEN no_data_found THEN
        RETURN NULL;
END;
$$;
```

### JSONB

```sql
SELECT datos->>'nombre' FROM t;
SELECT * FROM t WHERE datos @> '{"activo":true}'::jsonb;
UPDATE t SET datos = jsonb_set(datos, '{ruta,clave}', '42', true);
SELECT key, value FROM t CROSS JOIN LATERAL jsonb_each(datos);
```

### Patrones tipo Redis

```sql
-- SET/UPSERT con TTL modelado
INSERT INTO cache AS c (clave, valor, expira_en)
VALUES ($1, $2::jsonb, current_timestamp + $3::interval)
ON CONFLICT (clave) DO UPDATE
SET valor = EXCLUDED.valor, expira_en = EXCLUDED.expira_en;

-- GET que ignora vencidos
SELECT valor FROM cache
WHERE clave = $1 AND (expira_en IS NULL OR expira_en > clock_timestamp());

-- INCR atómico
INSERT INTO contadores AS c VALUES ($1, 1)
ON CONFLICT (clave) DO UPDATE SET valor = c.valor + 1
RETURNING valor;

-- Cola multi-worker
SELECT id FROM trabajos
WHERE estado = 'pendiente'
ORDER BY prioridad DESC, id
FOR UPDATE SKIP LOCKED LIMIT 1;

LISTEN canal;
SELECT pg_notify('canal', '{"id":123}');
```

TTL, limpieza, reintentos e idempotencia son responsabilidades explícitas; PostgreSQL no implementa evicción LRU nativa.

### Búsqueda tipo Elasticsearch

```sql
CREATE INDEX idx_fts ON documentos USING gin (busqueda);
CREATE INDEX idx_trgm ON documentos USING gin (lower(titulo) gin_trgm_ops);

SELECT id, ts_rank_cd(busqueda, q) AS relevancia
FROM documentos
CROSS JOIN websearch_to_tsquery('spanish', $1) AS p(q)
WHERE tenant_id = $2 AND busqueda @@ q
ORDER BY relevancia DESC, id
LIMIT 20;

SELECT titulo, similarity(titulo, $1) AS similitud
FROM documentos
WHERE lower(titulo) % lower($1)
ORDER BY similitud DESC;
```

### Embeddings con pgvector

```sql
CREATE EXTENSION vector;
CREATE TABLE fragmentos (id bigint PRIMARY KEY, embedding vector(1536));

-- Búsqueda exacta o ANN si existe un índice compatible.
SELECT id, 1 - (embedding <=> $1::vector(1536)) AS similitud_coseno
FROM fragmentos
ORDER BY embedding <=> $1::vector(1536)
LIMIT 10;

CREATE INDEX idx_embedding_hnsw
ON fragmentos USING hnsw (embedding vector_cosine_ops);

BEGIN;
SET LOCAL hnsw.ef_search = 100;
SELECT id FROM fragmentos ORDER BY embedding <=> $1::vector(1536) LIMIT 10;
COMMIT;
```

Usa la dimensión real del modelo; no mezcles modelos y mide recall contra búsqueda exacta.

### Mantenimiento y diagnóstico

```sql
VACUUM (ANALYZE) esquema.tabla;
REINDEX INDEX CONCURRENTLY esquema.indice;

SELECT * FROM pg_stat_activity;
SELECT * FROM pg_stat_user_tables;
SELECT * FROM pg_stat_user_indexes;
SELECT pg_size_pretty(pg_total_relation_size('esquema.tabla'));
SELECT pg_blocking_pids(pid) FROM pg_stat_activity;
```

```bash
pg_dump -d base -Fc -f base.dump
pg_restore -d base_restaurada --clean --if-exists base.dump
pg_dumpall --globals-only -f globals.sql
```

---

## 21. Ruta de aprendizaje y fuentes oficiales

### 21.1 Ruta sugerida

```text
Semana 1: arquitectura, psql, tipos, NULL, DDL y restricciones
Semana 2: DML, joins, agregados, subconsultas y CTE
Semana 3: ventanas, JSONB, arrays, rangos y full-text
Semana 4: transacciones, MVCC, locks, roles y RLS
Semana 5: índices, EXPLAIN, estadísticas, vacuum y monitoreo
Semana 6: PL/pgSQL, triggers, particiones, backup y aplicaciones
Semana 7: caché, colas, full-text, trigramas, embeddings y búsqueda híbrida
Semana 8: ejercicios sin solución, restauración y proyecto final medido
```

Proyecto final recomendado:

1. modela una aplicación pequeña con 8–12 tablas;
2. implementa restricciones, datos semilla y roles separados;
3. crea 15 consultas de dificultad progresiva;
4. simula concurrencia en dos sesiones;
5. carga suficientes datos para comparar planes;
6. añade solo índices respaldados por medición;
7. automatiza `pg_dump` y demuestra una restauración;
8. implementa una especialización: cola/caché, búsqueda o RAG;
9. define SLO y compara al menos una alternativa especializada;
10. documenta decisiones, mediciones, límites y riesgos.

### 21.2 Documentación oficial

Esta guía se contrastó con la documentación oficial de PostgreSQL 18 y la política de versiones vigente el **12 de agosto de 2026**:

- [Documentación actual de PostgreSQL](https://www.postgresql.org/docs/current/)
- [Tutorial oficial](https://www.postgresql.org/docs/current/tutorial.html)
- [Lenguaje SQL](https://www.postgresql.org/docs/current/sql.html)
- [Definición de datos](https://www.postgresql.org/docs/current/ddl.html)
- [Manipulación de datos](https://www.postgresql.org/docs/current/dml.html)
- [Consultas](https://www.postgresql.org/docs/current/queries.html)
- [Tipos de datos](https://www.postgresql.org/docs/current/datatype.html)
- [Funciones y operadores](https://www.postgresql.org/docs/current/functions.html)
- [Índices](https://www.postgresql.org/docs/current/indexes.html)
- [Búsqueda de texto completo](https://www.postgresql.org/docs/current/textsearch.html)
- [Control de concurrencia](https://www.postgresql.org/docs/current/mvcc.html)
- [Consejos de rendimiento y `EXPLAIN`](https://www.postgresql.org/docs/current/performance-tips.html)
- [PL/pgSQL](https://www.postgresql.org/docs/current/plpgsql.html)
- [`psql`](https://www.postgresql.org/docs/current/app-psql.html)
- [Rutinas de mantenimiento](https://www.postgresql.org/docs/current/maintenance.html)
- [Respaldo y restauración](https://www.postgresql.org/docs/current/backup.html)
- [Alta disponibilidad, balanceo y replicación](https://www.postgresql.org/docs/current/high-availability.html)
- [Política de versiones soportadas](https://www.postgresql.org/support/versioning/)
- [`LISTEN`/`NOTIFY`](https://www.postgresql.org/docs/current/sql-notify.html)
- [`pg_trgm`](https://www.postgresql.org/docs/current/pgtrgm.html)
- [pgvector — documentación y código oficial](https://github.com/pgvector/pgvector)
- [Redis — tipos de datos](https://redis.io/docs/latest/develop/data-types/)
- [Redis — Pub/Sub y garantías de entrega](https://redis.io/docs/latest/develop/pubsub/)
- [Elasticsearch — visión general oficial](https://www.elastic.co/guide/en/elastic-stack/current/overview.html)

La documentación `current` avanza cuando aparece una nueva versión mayor. Para una instalación concreta, cambia `/current/` por su número, por ejemplo `/18/`, y verifica `SHOW server_version;`.

---

**Siguiente paso:** crea la base de práctica, supera los puntos de control en orden y resuelve la sección 19 sin copiar las soluciones. Conserva tus consultas junto con su `EXPLAIN (ANALYZE, BUFFERS)`. Aprender PostgreSQL consiste tanto en escribir SQL correcto como en observar qué ocurre con concurrencia, estadísticas, permisos y datos reales.
