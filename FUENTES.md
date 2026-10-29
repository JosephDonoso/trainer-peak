# Catálogo y reglas de Entreno Local

Versión 1, 28 de octubre de 2026. Nombre provisional. Aplicación local sin backend, cuentas, analítica ni fuentes remotas. No se publica automáticamente.

## Banco de ejercicios

- Free Exercise DB: https://github.com/yuhonas/free-exercise-db
- JSON incorporado: https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json
- 876 ejercicios descargados el 28 de octubre de 2026. Licencia Unlicense, incluida en LICENSE-exercises.txt.
- Se incorpora el texto; las imágenes remotas no se requieren ni se incluyen.
- 30 movimientos prioritarios con nombre en español. Las instrucciones originales permanecen en inglés. La clasificación directa/indirecta prioritaria es una convención editable de esta aplicación, no una validación científica individual de cada ejercicio.
- Los restantes ejercicios están disponibles para consulta y edición; los músculos primarios proceden del catálogo. El aporte indirecto queda vacío hasta revisión. No se utilizan en el generador salvo que el usuario los habilite.

## Evidencia consultada

- ACSM 2026: https://pubmed.ncbi.nlm.nih.gov/41843416/
- IUSCA 2021: https://journal.iusca.org/index.php/Journal/article/view/81
- Volumen y frecuencia, Pelland et al.: https://pubmed.ncbi.nlm.nih.gov/41343037/
- Progresar repeticiones o cargas: https://pubmed.ncbi.nlm.nih.gov/36199287/
- Descansos: https://pubmed.ncbi.nlm.nih.gov/39205815/
- Descarga, consenso experto: https://pmc.ncbi.nlm.nih.gov/articles/PMC10511399/
- EMG y límites como predictor de hipertrofia: https://pubmed.ncbi.nlm.nih.gov/35006527/
- Split y full body: https://pubmed.ncbi.nlm.nih.gov/38595233/
- Incrementos de carga, referencia histórica ACSM 2009: https://pubmed.ncbi.nlm.nih.gov/19204579/

## Decisiones de producto aprobadas

- Menos tiempo: 8–10 series computables por músculo y semana. Más tiempo: 12–16. No son umbrales óptimos universales.
- Hasta dos prioridades. Se usa el extremo alto en prioritarios y el bajo en el resto, siempre dentro del rango. El usuario puede editar manualmente.
- Directo 1, indirecto relevante 0,5. Calentamiento no suma.
- Generación por equipo, días, preferencias, favoritos y exclusiones. Full body, superior/inferior, PPL; semanas A/B, orden editable, días y ejercicios personalizados.
- No hay un límite de minutos que recorte automáticamente las sesiones. Se señalan déficits si el equipo o la división impiden cubrir todos los músculos.
- Ciclo opcional: semana 1 referencia de 6–10 reps, semana 2 objetivo +1 hasta 12, semana 3 oportunidad de subir peso, semana 4 descarga. Cambio de semana manual.
- Series de trabajo a RPE 8–9 (RIR 1–2). RPE 10 para pruebas. Objetivos editables, esfuerzo desconocido permitido.
- Incremento objetivo 5%, ajustado al salto disponible; empate hacia abajo. Saltos >10% requieren decisión manual. Todas las series prescritas deben alcanzar 12 reps con RPE <=9. Una sesión parcial no habilita progresión automática.
- Descarga: mismas series, propuesta -10% de carga, RPE 6–7. El peso se puede ajustar manualmente al equipo. No se presentan reducciones por calendario como imprescindibles.
- Descansos de 180, 120 o 90 segundos según ejercicio. Editables. El temporizador usa una fecha final persistida; el sistema operativo puede suspender avisos mientras la app está cerrada.
- 1RM estimado con Epley para series de 1–10 reps. No se corrige por RIR ni se mezcla con 1RM probado. Sin estimación para ejercicios corporales o asistidos. En mancuernas se expresa por mano.
- Peso y PR por ejercicio. Volumen por músculo mediante series computables. Registros retrospectivos sin descansos inventados.

Estas reglas conforman un protocolo práctico, no un algoritmo validado como conjunto. No se clasifica por mayor EMG ni se prometen ejercicios universalmente menos lesivos. El rendimiento de una variante/máquina no debe mezclarse con otra: crear un ejercicio propio si cambia el equipo o la ejecución relevante.

## Persistencia

IndexedDB guarda todo en el origen del navegador. El service worker guarda el programa y el catálogo para uso sin conexión. La app solo solicita archivos de su mismo origen, nunca envía el historial. Exportación/importación JSON para transferir datos manualmente entre dispositivos. Importar reemplaza los datos, con confirmación. El navegador puede borrar almacenamiento; hacer copias es imprescindible para conservarlo a largo plazo.
