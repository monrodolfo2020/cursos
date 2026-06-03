import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "./app/generated/prisma/client.ts";

const adapter = new PrismaLibSql({
  url: "libsql://cursos-db-monrodolfo2020.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODAyODQ2MTksImlkIjoiMDE5ZTgxMzctMWEwMS03MDQ2LWI0MTYtOGUyOTA5MDBkNDg4IiwicmlkIjoiMjVjYjg2NGItYmFhNi00ODVhLWFmZjItYTU1MmZlYTAzMGI4In0.kVlvb3D-9I3aOavdZ8moaM7UQGmwcsTGtNFvGqRu03GT6mG6X_ovn4PhPi5EFRcodVGXmFnQ5Bd2YMxEaIr_Bw",
});
const prisma = new PrismaClient({ adapter } as any);

const BASE = "/videos/curso-automatizacion";

const lessons = [
  // ── MÓDULO 0 — Bienvenida y Orientación ──────────────────────────────
  {
    order: 1,
    title: "¿En qué mundo industrial vivimos?",
    description: "Introducción al mundo de la automatización. Descubre qué es, por qué importa, las industrias donde se aplica y la ruta del curso.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-0-bienvenida/Video Módulo 0.html`,
  },
  {
    order: 2,
    title: "¿Qué es la automatización y qué no es?",
    description: "Desmitifica la automatización: sus límites reales, diferencias con la robótica y cuándo conviene automatizar un proceso.",
    durationSec: 240,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 2 - Qué es la automatización.html`,
  },
  {
    order: 3,
    title: "Los personajes del mundo industrial",
    description: "Conoce los roles clave: instrumentista, operador, ingeniero de proceso y de control. Entiende cómo colaboran en planta.",
    durationSec: 240,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 3 - Los personajes.html`,
  },
  {
    order: 4,
    title: "Ruta de aprendizaje del curso",
    description: "Mapa visual de los 4 módulos: fundamentos, instrumentación, sensores y control. Sabrás exactamente a dónde vas.",
    durationSec: 180,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 4 - Ruta de aprendizaje.html`,
  },
  {
    order: 5,
    title: "Herramientas del curso",
    description: "Software, simuladores y recursos que usarás a lo largo del curso: draw.io, Tinkercad, PDFs de normas y más.",
    durationSec: 180,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 5 - Herramientas.html`,
  },
  {
    order: 6,
    title: "Glosario base",
    description: "Los 20 términos que debes dominar antes de empezar: proceso, lazo, señal, transmisor, controlador, actuador y más.",
    durationSec: 240,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 6 - Glosario base.html`,
  },
  {
    order: 7,
    title: "Conoce una planta industrial real",
    description: "Tour visual por una planta real: identifica dónde viven los instrumentos, las tuberías de proceso y la sala de control.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-0-bienvenida/Clase 7 - Planta industrial real.html`,
  },
  // ── MÓDULO 1 — Fundamentos de Física y Electricidad ──────────────────
  {
    order: 8,
    title: "Unidades del SI aplicadas a la industria",
    description: "Presión en Pa y bar, temperatura en °C y K, caudal en m³/h y más. Las unidades que verás todos los días en planta.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.1 - Unidades del SI.html`,
  },
  {
    order: 9,
    title: "Magnitudes físicas industriales",
    description: "Temperatura, presión, nivel y caudal: las cuatro variables que la instrumentación mide y controla en todo proceso.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.2 - Magnitudes fisicas.html`,
  },
  {
    order: 10,
    title: "Ley de Ohm y circuitos básicos",
    description: "V = IR en contexto industrial: lazos de corriente 4-20 mA, caídas de tensión en cables y protección de instrumentos.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.3 - Ley de Ohm.html`,
  },
  {
    order: 11,
    title: "Corriente continua vs alterna",
    description: "Por qué los instrumentos usan DC 24 V, cuándo aparece el AC y cómo distinguirlos en el tablero de control.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.4 - AC vs DC.html`,
  },
  {
    order: 12,
    title: "Potencia eléctrica y consumo",
    description: "Calcula la potencia de tus instrumentos, entiende la carga del PLC y evita sobrecargar fuentes de alimentación.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.5 - Potencia y consumo.html`,
  },
  {
    order: 13,
    title: "Señales: voltaje, corriente, resistencia",
    description: "Señales de proceso en la industria: 0-5 V, 1-5 V, 4-20 mA y señales RTD. Cuándo usar cada tipo y por qué.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.6 - Senales electricas.html`,
  },
  {
    order: 14,
    title: "Introducción a los semiconductores",
    description: "Transistores, optoacopladores y circuitos integrados que forman el corazón de los transmisores y PLCs modernos.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.7 - Semiconductores.html`,
  },
  {
    order: 15,
    title: "Laboratorio virtual de circuitos",
    description: "Práctica interactiva: construye lazos 4-20 mA en simulador, mide con multímetro virtual y diagnostica fallas comunes.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-1-fundamentos/Clase 1.8 - Laboratorio virtual.html`,
  },
  // ── MÓDULO 2 — Introducción a la Instrumentación Industrial ──────────
  {
    order: 16,
    title: "¿Qué es la instrumentación?",
    description: "Definición técnica y práctica: medir para controlar. Diferencia entre instrumento primario, transmisor y controlador.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.1 - Que es la instrumentacion.html`,
  },
  {
    order: 17,
    title: "PV, SP y CV: el lazo de control",
    description: "Las tres variables que gobiernan todo proceso: Variable de Proceso, Setpoint y Variable de Control. Visualización animada.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.2 - PV SP CV.html`,
  },
  {
    order: 18,
    title: "Clasificación de instrumentos",
    description: "Instrumentos por función (medición, control, actuación) y por variable (temperatura, presión, nivel, caudal).",
    durationSec: 300,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.3 - Clasificacion de instrumentos.html`,
  },
  {
    order: 19,
    title: "Señales estándar (4-20 mA, HART)",
    description: "Por qué la industria eligió 4-20 mA: detección de falla, inmunidad al ruido y distancias largas. HART superpuesto.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.4 - Senales estandar.html`,
  },
  {
    order: 20,
    title: "Rangos, spans y calibración",
    description: "LRV, URV, span y cero. Cómo calcular la salida 4-20 mA para cualquier rango y detectar un instrumento descalibrado.",
    durationSec: 420,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.5 - Rangos spans y calibracion.html`,
  },
  {
    order: 21,
    title: "Documentación industrial",
    description: "Los documentos que todo instrumentista lee: datasheet, manual, hoja de especificación y loop sheet.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.6 - Documentacion industrial.html`,
  },
  {
    order: 22,
    title: "Simbología ISA-5.1",
    description: "Lee P&IDs como un profesional: burbujas de instrumentación, letras de función y líneas de señal según ISA-5.1.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.7 - Simbologia ISA-5.1.html`,
  },
  {
    order: 23,
    title: "Lectura de un P&ID real",
    description: "Analiza un diagrama de proceso e instrumentación real paso a paso: identifica cada instrumento y su función.",
    durationSec: 540,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.8 - Lectura de un PID real.html`,
  },
  {
    order: 24,
    title: "Campo vs sala de control",
    description: "Qué vive en campo (intemperie, polvo, vibración) vs qué vive en sala de control (DCS, HMI, PLCs). Diferencias críticas.",
    durationSec: 300,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.9 - Campo vs sala de control.html`,
  },
  {
    order: 25,
    title: "Práctica: P&ID en draw.io",
    description: "Dibuja tu primer P&ID completo usando la simbología ISA-5.1 en draw.io. Lazo de temperatura con controlador PID.",
    durationSec: 600,
    videoPath: `${BASE}/modulo-2-instrumentacion/Clase 2.10 - Practica PID en drawio.html`,
  },
  // ── MÓDULO 3 — Sensores y Transmisores ───────────────────────────────
  {
    order: 26,
    title: "Termopares (J, K, T)",
    description: "Principio Seebeck, tipos J y K, rangos de temperatura, compensación de junta fría y conexión al transmisor.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.1 - Termopares.html`,
  },
  {
    order: 27,
    title: "RTDs y PT100",
    description: "Resistencia vs temperatura en Pt100: configuraciones 2, 3 y 4 hilos, compensación de cable y precisión industrial.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.2 - RTDs y PT100.html`,
  },
  {
    order: 28,
    title: "Termistores e infrarrojo",
    description: "NTC y PTC para rangos cortos de alta precisión. Pirómetros IR para medición sin contacto en hornos y líneas en movimiento.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.3 - Termistores e IR.html`,
  },
  {
    order: 29,
    title: "Tipos de presión",
    description: "Presión absoluta, manométrica, diferencial y vacío. Conversiones entre unidades y cuándo usar cada referencia.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.4 - Tipos de presion.html`,
  },
  {
    order: 30,
    title: "Sensores de presión",
    description: "Piezoeléctrico, capacitivo y piezoresistivo: principios de operación, rangos y selección para cada aplicación.",
    durationSec: 420,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.5 - Sensores de presion.html`,
  },
  {
    order: 31,
    title: "Transmisor de presión diferencial",
    description: "El instrumento más versátil de la planta: mide presión diferencial, nivel por columna hidrostática y caudal con placa orificio.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.6 - Transmisor DP.html`,
  },
  {
    order: 32,
    title: "Nivel por presión hidrostática",
    description: "Calcula nivel a partir de la presión del fluido en el fondo del tanque. Efecto de la densidad y compensación de temperatura.",
    durationSec: 420,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.7 - Nivel hidrostatico.html`,
  },
  {
    order: 33,
    title: "Nivel: ultrasónico, radar y flotador",
    description: "Tecnologías de medición de nivel sin contacto y mecánicas: cuándo elegir cada una según el fluido y las condiciones del tanque.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.8 - Nivel ultrasonico radar flotador.html`,
  },
  {
    order: 34,
    title: "Sensores capacitivos de nivel",
    description: "Medición por capacitancia: para sólidos, granulados y líquidos corrosivos donde el radar no funciona bien.",
    durationSec: 360,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.9 - Nivel capacitivo.html`,
  },
  {
    order: 35,
    title: "Placa orificio y tubo Venturi",
    description: "Medición de caudal por presión diferencial: ecuación de Bernoulli, beta ratio, coeficiente de descarga y cálculo de flujo.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.10 - Placa orificio y Venturi.html`,
  },
  {
    order: 36,
    title: "Caudalímetros modernos",
    description: "Magnéticos, de vórtice, Coriolis y ultrasónicos: principios, ventajas, limitaciones y criterios de selección.",
    durationSec: 540,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.11 - Caudalimetros.html`,
  },
  {
    order: 37,
    title: "Práctica: selección de instrumentos",
    description: "Ejercicio final del módulo: selecciona el instrumento correcto para 8 casos reales de temperatura, presión, nivel y caudal.",
    durationSec: 600,
    videoPath: `${BASE}/modulo-3-sensores/Clase 3.12 - Practica seleccion.html`,
  },
  // ── MÓDULO 4 — Actuadores y Elementos Finales de Control ─────────────
  {
    order: 38,
    title: "Válvulas de control",
    description: "Regula vs bloquea: las 3 partes de una válvula de control, tipos de cuerpo (globo, mariposa, bola) y condición de falla FC/FO/FL.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.1 - Valvulas de control.html`,
  },
  {
    order: 39,
    title: "Actuadores y posicionadores",
    description: "Diafragma neumático ATO/ATC, actuadores de pistón y el lazo de posición cerrado con posicionador electro-neumático.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.2 - Actuadores y posicionadores.html`,
  },
  {
    order: 40,
    title: "Motores eléctricos industriales",
    description: "Campo giratorio animado, deslizamiento, par de arranque y corriente de arranque comparada en motores de inducción trifásicos.",
    durationSec: 420,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.3 - Motores electricos.html`,
  },
  {
    order: 41,
    title: "Variadores de frecuencia (VFD)",
    description: "Arquitectura rectificador–bus DC–inversor, control V/f y la ley del cubo: cómo el VFD reduce el consumo energético.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.4 - Variadores de frecuencia.html`,
  },
  {
    order: 42,
    title: "Bombas, compresores y sopladores",
    description: "Curva de operación, punto de trabajo, NPSH y cavitación. Familias por diferencial de presión y criterios de selección.",
    durationSec: 480,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.5 - Bombas compresores sopladores.html`,
  },
  {
    order: 43,
    title: "Relés, contactores y arrancadores",
    description: "El circuito de sello de marcha animado paso a paso: bobina, contactos auxiliares y arrancadores estrella-triángulo.",
    durationSec: 420,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.6 - Reles contactores arrancadores.html`,
  },
  {
    order: 44,
    title: "Práctica: dimensionamiento de válvula",
    description: "Calcula el Cv y selecciona la válvula correcta para FCV-201: caudal, densidad, caída de presión y verificación de cavitación.",
    durationSec: 600,
    videoPath: `${BASE}/modulo-4-actuadores/Clase 4.7 - Practica dimensionamiento valvula.html`,
  },
];

const totalSec = lessons.reduce((s, l) => s + l.durationSec, 0);
const totalMinutes = Math.round(totalSec / 60);

async function main() {
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  await prisma.course.create({
    data: {
      slug: "instrumentacion-industrial",
      title: "Instrumentación y Automatización Industrial",
      description:
        "Domina la instrumentación industrial de cero a profesional. Cinco módulos progresivos: fundamentos de electricidad y física, lectura de P&IDs, señales estándar, sensores clave de temperatura, presión, nivel y caudal, y actuadores y elementos finales de control — con animaciones interactivas.",
      instructor: "Instrumex",
      level: "Principiante",
      category: "Ingeniería Industrial",
      totalMinutes,
      lessonCount: lessons.length,
      lessons: { create: lessons },
    },
  });

  console.log(`✅ Seed completado: ${lessons.length} lecciones, ${totalMinutes} minutos`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
