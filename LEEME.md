# Trainer Peak — PWA

Aplicación funcional de entrenamiento, sin backend ni inicio de sesión. Datos exclusivamente locales en cada navegador/dispositivo. No se ha desplegado en internet.

## Abrir

En Windows, abre INICIAR.cmd y visita http://localhost:8765. Requiere Node.js. No necesita instalar dependencias. Para publicar, sigue README.md. Para Android, sigue INSTALAR-ANDROID.md: primera carga HTTPS desde GitHub Pages e instalación desde Chrome.

## Incluido

- Generador por equipamiento y días, modalidades de 8–10 y 12–16 series, hasta dos énfasis musculares, favoritos y exclusiones.
- Full body, superior/inferior, PPL; semanas A/B y días personalizados editables. Añadir, mover o quitar ejercicios y editar series, peso, repeticiones y descanso.
- Ciclo opcional de cuatro semanas con avance manual, progresión hasta 12 reps, incremento aproximado de 5% según material y descarga de -10% de carga sin reducir series.
- RPE y RIR, valores precargados editables, confirmación individual, registro retrospectivo, calentamientos y sesiones de prueba.
- Temporizador de descanso persistente y recuperación de sesiones en curso tras recargar.
- Historial editable, récords por carga/repeticiones, 1RM estimado y probado diferenciados, gráfico de estimaciones por ejercicio y volumen por músculo de los últimos siete días.
- Biblioteca de 876 ejercicios incluida en el paquete; 30 prioritarios adaptados al español. Instrucciones originales en inglés. Crear y editar ejercicios personales; excluir los originales. Las personalizaciones utilizadas en historial no se eliminan para conservar referencias.
- Exportación e importación JSON. Importación con validación y confirmación antes de sustituir datos.
- PWA instalable con archivos precargados para funcionamiento sin conexión. Sin dependencias remotas durante el uso.

## Uso inicial

1. En Rutina, configura equipo, días, modalidad, división y prioridades. Genera y revisa la propuesta.
2. Edita las cargas iniciales y los saltos de peso de cada ejercicio. La app no adivina tu fuerza inicial: muestra 0 kg hasta que la establezcas.
3. Empieza una sesión, ajusta los valores y confirma cada serie. Finaliza para incorporarla al historial.
4. Cambia la semana del ciclo manualmente cuando corresponda. Los ejercicios permanecen estables hasta que edites o regeneres la rutina.
5. Exporta copias periódicamente. Cada familiar utiliza sus propios datos; no hay sincronización.

## Límites explícitos

- El generador es una propuesta determinista, no una rutina óptima validada. Si faltan ejercicios compatibles o una división no cubre músculos, muestra déficits. La edición manual permite ajustarlos.
- La prioridad a favoritos depende de que sean compatibles y estén habilitados para el generador; las exclusiones prevalecen.
- Los saltos de carga >10% no se aplican automáticamente. Peso corporal y asistencia requieren ajuste manual. Un fallo de objetivo exige revisar el peso manualmente; no se deduce una nueva carga mediante un modelo de fuerza.
- La descarga -10% es orientativa y el usuario ajusta el peso físico disponible. La intensidad declarada debe corresponder a lo realizado.
- Los recordatorios de descanso no están garantizados con la pantalla bloqueada o la aplicación cerrada.
- Las estimaciones de RM no se calculan para más de diez repeticiones ni para asistencia/peso corporal. Las máquinas y variantes distintas deben tener registros separados.
- La guía de instalación Android está preparada; la instalación y la persistencia offline en un teléfono físico todavía requieren comprobación en ese dispositivo. Este paquete no es un APK.

## Verificación realizada

- 11 pruebas automáticas: integridad del catálogo, volúmenes y prioridades del generador, restricciones de equipo, incrementos, sesiones incompletas, descarga, RM, conteo directo/indirecto e importaciones inválidas.
- Revisión en navegador con ancho móvil: generar rutina, editar y confirmar series, temporizador, completar pendientes, guardar sesión, progreso y búsqueda del catálogo.
- Servidor apagado: recarga correcta, recuperación del historial y búsqueda del catálogo sin servidor.
- Exportación real de una sesión de prueba y validación de sus valores.
- La vista previa puede contener registros sintéticos de control de calidad. El paquete no incluye esos registros ni datos de usuario: una instalación nueva empieza vacía.

## Pruebas y estructura

Ejecuta `npm test` o `node --test tests/core.test.mjs` desde esta carpeta. `app.js` contiene la interfaz, `core.js` las reglas, `storage.js` IndexedDB y `sw.js` el caché offline. FUENTES.md documenta el catálogo, la evidencia y las decisiones de producto. Para actualizar, publica los cambios desde main: el build versiona el caché automáticamente. Conserva la misma dirección pública.
