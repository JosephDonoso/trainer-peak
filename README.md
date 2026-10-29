# Trainer Peak

Aplicación web progresiva para planificar rutinas de fuerza e hipertrofia, registrar entrenamientos y seguir la sobrecarga progresiva. Funciona sin conexión después de la primera carga y guarda los datos en el dispositivo, sin cuentas ni backend.

**[Abrir Trainer Peak](https://josephdonoso.github.io/trainer-peak/)**

## Funcionalidades

- **Planificación de rutinas:** generación según equipamiento, días disponibles y preferencias, con divisiones full body, superior/inferior y push/pull/legs. Incluye semanas A/B, hasta dos músculos prioritarios y edición manual.
- **Biblioteca de ejercicios:** 876 ejercicios disponibles sin conexión, con favoritos, exclusiones y ejercicios personalizados. El generador utiliza una selección prioritaria de 30 movimientos y los ejercicios adicionales habilitados por el usuario.
- **Registro de sesiones:** series con carga, repeticiones y esfuerzo RPE/RIR; valores precargados editables, confirmación individual, registro retrospectivo y recuperación de sesiones en curso.
- **Descansos:** temporizador al confirmar cada serie, con duración ajustable según el ejercicio.
- **Progresión:** objetivos de repeticiones y carga, con un ciclo opcional de cuatro semanas y semana de descarga.
- **Seguimiento:** historial editable, récords por ejercicio, 1RM estimado y probado diferenciados, y volumen por grupo muscular.
- **Datos portables:** exportación e importación de respaldos JSON.
- **Instalación como PWA:** acceso desde la pantalla de inicio y uso sin conexión, sin dependencias remotas durante el entrenamiento.

## Modelo de entrenamiento

Las reglas predeterminadas son editables y organizan la planificación alrededor del volumen, el esfuerzo y la progresión:

| Parámetro | Valor predeterminado |
| --- | --- |
| Volumen semanal por músculo | 8–10 o 12–16 series computables, según la modalidad |
| Cómputo de series | Directas: 1; indirectas relevantes: 0,5; calentamiento: 0 |
| Repeticiones | Inicio en 6–10, con progresión hasta 12 |
| Esfuerzo de trabajo | RPE 8–9; RPE 10 para sesiones de prueba |
| Incremento de carga | Objetivo del 5%, ajustado al equipamiento, cuando todas las series prescritas alcanzan 12 repeticiones con RPE ≤ 9 |
| Descarga | Reducción orientativa del 10% de carga, RPE 6–7 y mismo número de series |
| Descansos | 180, 120 o 90 segundos según el ejercicio |

El generador propone rutinas que pueden revisarse y modificarse. Las reglas constituyen decisiones de producto apoyadas en literatura de entrenamiento; el programa completo no es un protocolo validado como conjunto. La evidencia y los criterios utilizados se documentan en [FUENTES.md](FUENTES.md).

## Almacenamiento y funcionamiento sin conexión

Los entrenamientos, las preferencias y las personalizaciones se almacenan en **IndexedDB**. El service worker conserva los archivos de la aplicación y el catálogo para utilizarlos sin conexión tras su descarga inicial.

No hay inicio de sesión, sincronización entre dispositivos ni envío del historial a GitHub. Cada instalación mantiene sus propios datos. Los respaldos JSON permiten transferirlos o recuperarlos; borrar el almacenamiento del navegador puede eliminarlos.

Las actualizaciones de la aplicación se publican en GitHub Pages y utilizan una versión de caché calculada a partir del contenido. La actualización de archivos no borra la base de datos ni fuerza una recarga durante una sesión.

## Desarrollo local

Requiere **Node.js 22 o posterior**. No hay dependencias que instalar.

```sh
git clone https://github.com/JosephDonoso/trainer-peak.git
cd trainer-peak
npm start
```

El servidor local sirve la aplicación en `http://localhost:8765`.

### Pruebas y compilación

```sh
npm test
npm run build
node --test tests/pages.test.mjs
```

La compilación genera `dist/` con los archivos estáticos necesarios para publicar la PWA. Las pruebas cubren reglas de entrenamiento, validación de datos y comportamiento de publicación y caché bajo una subruta.

## Arquitectura

Implementada con HTML, CSS y JavaScript mediante módulos ES, sin framework ni dependencias de ejecución.

| Archivo o directorio | Responsabilidad |
| --- | --- |
| `app.js` | Interfaz y flujos de la aplicación |
| `core.js` | Generación de rutinas, progresión y cálculos |
| `storage.js` | Persistencia local en IndexedDB |
| `catalog.json` | Catálogo de ejercicios incorporado |
| `sw.js` | Caché y funcionamiento sin conexión |
| `manifest.webmanifest` | Metadatos de instalación de la PWA |
| `scripts/build.mjs` | Preparación de archivos públicos y versión de caché |
| `tests/` | Pruebas automatizadas |
| `.github/workflows/pages.yml` | Integración y despliegue en GitHub Pages |

## Despliegue

GitHub Actions ejecuta las pruebas, genera el artefacto estático y lo publica en GitHub Pages con cada cambio en `main`. El flujo también admite ejecución manual. Los archivos utilizan rutas relativas para funcionar bajo `/trainer-peak/`.

## Catálogo y licencia

El catálogo procede de [Free Exercise DB](https://github.com/yuhonas/free-exercise-db) y se distribuye bajo **Unlicense**, incluida en [LICENSE-exercises.txt](LICENSE-exercises.txt). Se incorpora el contenido textual; no se incluyen imágenes remotas. Los movimientos prioritarios tienen nombres adaptados al español, mientras que las instrucciones originales permanecen en inglés.

La licencia del catálogo no se extiende automáticamente al código de la aplicación, que todavía no tiene una licencia de distribución definida.

## Limitaciones

- El generador puede señalar déficits de cobertura cuando el equipamiento o la distribución elegida impiden alcanzar los objetivos.
- Los avisos de descanso dependen de las restricciones del navegador y del sistema operativo cuando la aplicación está cerrada o la pantalla está bloqueada.
- El 1RM estimado utiliza la fórmula de Epley para series de 1–10 repeticiones; no se calcula para ejercicios de peso corporal o asistidos.
- El almacenamiento local depende del navegador. La exportación de respaldos es el mecanismo de conservación y transferencia de datos.
