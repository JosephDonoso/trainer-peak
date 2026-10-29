# Trainer Peak

PWA de entrenamiento sin backend, cuentas ni sincronización. Rutinas y sesiones se guardan en IndexedDB del dispositivo. El catálogo de 876 ejercicios está incluido y funciona offline después de la primera carga.

Repositorio: https://github.com/JosephDonoso/trainer-peak

URL prevista de GitHub Pages: https://josephdonoso.github.io/trainer-peak/ (requiere activar Pages y completar el despliegue).

## Lo que tienes que hacer en tu cuenta

### 1. Crear el repositorio

1. Entra en https://github.com/new con tu cuenta.
2. Elige un nombre técnico provisional, por ejemplo `trainer-peak`. No necesitas resolver la marca para publicar una prueba.
3. Selecciona **Public** para usar Pages con GitHub Free. El código y el catálogo serán públicos; tus registros locales no están en estos archivos.
4. Marca **Add a README file** y crea el repositorio. No añadas una licencia al código de la app sin decidir cuál quieres utilizar; el catálogo conserva su propia licencia.

### 2. Subir el proyecto con GitHub Desktop

1. Instala GitHub Desktop desde https://desktop.github.com/ e inicia sesión en tu cuenta.
2. En GitHub Desktop: **File → Clone repository**, selecciona el repositorio que acabas de crear y una carpeta local.
3. Descomprime el paquete entregado. Copia **el contenido** de `entreno-pages` dentro de la carpeta clonada, reemplazando su README inicial.
4. Deben quedar `index.html`, `package.json` y `.github` directamente en la raíz del repositorio, no dentro de otra carpeta `entreno-pages`. Incluye `.github/workflows/pages.yml` y `.gitignore`; activa la visualización de archivos ocultos si no los ves.
5. En GitHub Desktop, revisa los cambios, escribe «Preparar PWA» y pulsa **Commit to main**. Después pulsa **Push origin**.

No copies tus respaldos JSON de entrenamientos dentro del repositorio. Los patrones de copia habituales están ignorados, pero conviene mantener todos los respaldos personales fuera de esta carpeta.

### 3. Activar la publicación

1. En la página del repositorio: **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**. No uses «Deploy from a branch» para este paquete.
3. Abre **Actions → Publicar PWA en GitHub Pages → Run workflow**, selecciona `main` y ejecuta. Esto también permite repetir la primera ejecución si falló porque Pages aún no estaba activado.
4. Espera a que los trabajos `build` y `deploy` queden verdes. Si GitHub pide habilitar Actions en el repositorio, habilítalo.
5. La dirección final aparecerá en el despliegue y en **Settings → Pages**. Normalmente tendrá la forma `https://josephdonoso.github.io/trainer-peak/`.

El flujo ya incluye pruebas, preparación de archivos estáticos, carga del artefacto y despliegue. Usa el token automático limitado de GitHub; no tienes que crear tokens personales ni añadir secrets. Tampoco requiere ejecutar npm en tu ordenador para publicar.

### 4. Instalar en Android

1. Abre la URL publicada en Chrome con conexión a internet.
2. En **Datos**, espera a que aparezca «Los archivos están preparados para abrir sin conexión».
3. Pulsa **Instalar app** o usa el menú de Chrome → **Añadir a pantalla de inicio / Instalar app**.
4. Abre una vez desde el nuevo icono mientras sigues conectado. Después activa modo avión y comprueba la apertura, el catálogo y el registro de una serie.
5. Si usabas la versión local, exporta allí un JSON e impórtalo en la versión publicada. Cambiar de localhost a GitHub crea un almacenamiento distinto.

Cada familiar instala la misma dirección y conserva su propia información. El sitio es público, pero los registros no se envían al repositorio ni se comparten entre teléfonos.

## Actualizaciones

- Modifica los archivos fuente de la raíz, confirma los cambios y haz Push a `main`. GitHub publicará automáticamente si las pruebas pasan.
- La compilación calcula una versión de caché basada en el contenido: no es necesario cambiar manualmente un número de versión.
- En la app, usa **Datos → Buscar actualizaciones** mientras tienes internet. Una vez descargada, cierra y vuelve a abrir la app; no se fuerza una recarga en medio de una sesión.
- El caché de archivos se actualiza sin borrar IndexedDB. Exporta de todos modos copias periódicas.
- Mantén estable el propietario, nombre del repositorio y dominio. Cambiar la dirección puede hacer que el navegador use otro almacenamiento. Exporta antes de migrar.
- El almacenamiento y los cachés están separados por ruta del proyecto. Esto evita colisiones accidentales con otras instalaciones de esta app en el mismo dominio; no proporciona aislamiento de seguridad entre sitios del mismo origen. Usa una cuenta/dominio de confianza para alojar tus aplicaciones.

## Desarrollo local

Necesitas Node.js 22 o posterior. No hay dependencias que instalar.

```sh
npm test
npm run build
node --test tests/pages.test.mjs
npm start
```

`npm start` abre el servidor de fuentes en localhost:8765; el artefacto publicado se genera en `dist/`. Para ver exactamente el build puedes servir `dist/` con un servidor estático. No abras index.html mediante file://.

## Estructura

- `app.js`, `core.js`, `storage.js`: interfaz, reglas y persistencia.
- `catalog.json`: banco de ejercicios incluido.
- `sw.js`, `manifest.webmanifest`: instalación y funcionamiento offline.
- `scripts/build.mjs`: genera `dist/` con una lista explícita de archivos públicos.
- `.github/workflows/pages.yml`: prueba y publica desde `main`.
- `tests/`: pruebas de reglas y de publicación bajo una subruta.
- `FUENTES.md`, `LICENSE-exercises.txt`: procedencia, evidencia y licencia del catálogo.

El programa de entrenamiento exacto es una decisión de producto fundamentada, no un protocolo validado como conjunto. Ver LEEME.md para funcionalidades y límites.

## Qué está verificado y qué falta

Verificado localmente: pruebas de las reglas, build, rutas de proyecto, archivos precargados, separación de cachés, respuestas offline simuladas y aislamiento del nombre de la base de datos. La versión anterior también se probó en navegador con el servidor apagado. No se ha creado un repositorio remoto ni ejecutado el workflow en tu cuenta; el despliegue real y la instalación física en Android siguen pendientes.

Referencias oficiales:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
