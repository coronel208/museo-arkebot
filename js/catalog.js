/**
 * catalog.js  ·  Catálogo central de la colección del Museo Seminario
 * ─────────────────────────────────────────────────────────────────────
 * Este archivo es la ÚNICA fuente de verdad para los datos de las piezas.
 * Úsalo para agregar, editar o eliminar piezas de la colección.
 *
 * Campos por pieza:
 *   id         → identificador único (sin espacios, sin tildes)
 *   nombre     → nombre completo de la pieza
 *   descripcion → texto largo de descripción
 *   material   → material principal
 *   periodo    → época o fecha estimada
 *   donante    → nombre del padre de familia donante (opcional)
 *   modelUrl   → ruta al archivo .glb  (ej: 'models/pieza-001.glb')
 *                Usa null si aún no tienes el modelo listo.
 *   imagenes   → array de URLs de fotos
 *   video      → URL del video (null si no hay)
 *
 * ¿Cómo agregar una pieza nueva?
 *   1. Copia uno de los objetos de abajo
 *   2. Cambia el id (debe ser único)
 *   3. Llena los demás campos
 *   4. Agrega el archivo .glb en la carpeta /models/
 */

var MUSEUM_CATALOG = [

  // ── VOLANTE DE USO ────────────────────────────────────────────────
  {
    id: 'volante-de-uso',
    nombre: 'Volante de Huso (Fusayola)',
    descripcion: 'Fusayola o volante de huso prehispánico de la región Calima. Presenta morfología bicóncava con perforación central para montaje en varillas de huso destinadas al hilado. Decorada con incisiones de grecas escalonadas, punteado perimetral y líneas radiales, características estilísticas de las tradiciones alfareras tempranas del suroccidente colombiano. Estado de conservación excelente, con desgaste menor por uso en las superficies de fricción.',
    material: 'Cerámica',
    cultura: 'Cultura Calima · Valle del Cauca',
    periodo: 'Período Ilama (1600 a.C. – 100 d.C.)',
    tecnica: 'Pasta fina, engobe claro, incisión geométrica',
    dimensiones: '⌀ 4.5 × 2.3 cm',
    donante: '',
    modelUrl: 'models/pieza-01.glb',
    imagenes: [
      'images/volante-de-uso-1.jpg',
      'images/volante-de-uso-2.jpg',
      'images/volante-de-uso-3.jpg',
      'images/volante-de-uso-4.jpg',
      'images/volante-de-uso-5.jpg',
      'images/volante-de-uso-6.jpg',
      'images/volante-de-uso-7.jpg'
    ],
    video: null
  },

  // ── VOLANTE DE HUSO 2 · Tradición Muisca ─────────────────────────
  {
    id: 'volante-de-huso-2',
    nombre: 'Volante de Huso (Fusayola)',
    descripcion: 'Fusayola o volante de huso de morfología discoidal simple fabricada en cerámica utilitaria. Presenta perforación central cilíndrica para el paso del eje del huso, con desgaste superficial generalizado y pátina de alteración edáfica. Artefacto común en contextos domésticos de los Andes colombianos asociados a la actividad textil prehispánica y colonial temprana.',
    material: 'Cerámica',
    cultura: 'Tradición Muisca · Cundinamarca',
    periodo: 'Período Herrera a Tardío (500 a.C. – 1600 d.C.)',
    tecnica: 'Pasta semi-gruesa, cocción oxidante',
    dimensiones: '⌀ 4.4 × 2.4 cm',
    donante: '',
    modelUrl: 'models/pieza-02.glb',
    imagenes: [
      'images/volante-de-huso-2-1.jpg',
      'images/volante-de-huso-2-2.jpg',
      'images/volante-de-huso-2-3.jpg',
      'images/volante-de-huso-2-4.jpg',
      'images/volante-de-huso-2-5.jpg',
      'images/volante-de-huso-2-6.jpg',
      'images/volante-de-huso-2-7.jpg'
    ],
    video: null
  },

  // ── CUENCO MINIATURA · Tradición Malagana ────────────────────────
  {
    id: 'cuenco-1',
    nombre: 'Cuenco Miniatura con Engobe Rojo',
    descripcion: 'Cuenco cerámico miniatura de morfología semiesférica vinculado tipológicamente a contextos funerarios del suroccidente colombiano, asociado con la tradición Malagana en el Valle del Cauca. Presenta cuerpo subglobular, base convexa y acabado con engobe rojo característico de la región. Uso ritual u ofrendante dentro de ajuares funerarios tempranos.',
    material: 'Cerámica',
    cultura: 'Cultura Calima (Malagana) · Valle del Cauca',
    periodo: 'Período Malagana (200 a.C. – 400 d.C.)',
    tecnica: 'Pasta fina, cocción oxidante, engobe rojo monocromo',
    dimensiones: '⌀ 9.5 × 5.8 cm',
    donante: '',
    modelUrl: 'models/pieza-03.glb',
    imagenes: [
      'images/cuenco-1-1.jpg',
      'images/cuenco-1-2.jpg',
      'images/cuenco-1-3.jpg',
      'images/cuenco-1-4.jpg',
      'images/cuenco-1-5.jpg'
    ],
    video: null
  }

  // ── JARRÓN 1 · Cultura Calima Ilama ──────────────────────────────
  ,{
    id: 'jarron-1',
    nombre: 'Vasija Globular con Cuello Cilíndrico',
    descripcion: 'Vasija cerámica globular con cuello cilíndrico e incisiones horizontales finas. Presenta engobe rojo-naranja característico de la alfarería fina Calima Ilama. Morfología y técnica incisa en el cuello son indicadores del período Ilama del suroccidente colombiano.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Ilama · Valle del Cauca',
    periodo: 'Período Ilama (1500 a.C. – 100 a.C.)',
    tecnica: 'Pasta fina oxidante, desgrasante de cuarzo, incisión horizontal',
    dimensiones: '18 × ⌀ 15 cm',
    donante: '',
    modelUrl: 'models/pieza-04.glb',
    imagenes: [
      'images/jarron-1-1.jpg',
      'images/jarron-1-2.jpg',
      'images/jarron-1-3.jpg',
      'images/jarron-1-4.jpg',
      'images/jarron-1-5.jpg'
    ],
    video: null
  }

  // ── CUENCO 2 · Copa en Pedestal · Valle del Cauca ────────────────
  ,{
    id: 'cuenco-2',
    nombre: 'Copa en Pedestal de Cerámica',
    descripcion: 'Copa cerámica prehispánica en pedestal de paredes simples, atribuible al período Malagana de la región Calima. Pasta moderadamente burda con desgrasante de cuarzo y tiesto molido, característica del complejo Malagana de la llanura aluvial del río Cauca. Presenta manchas tafonómicas por exposición al fuego o sedimentos reductores.',
    material: 'Cerámica',
    cultura: 'Cultura Malagana · Valle del Cauca',
    periodo: 'Período Malagana (posiblemente 200 a.C. – 400 d.C.)',
    tecnica: 'Pasta burda, desgrasante de cuarzo y tiesto molido',
    dimensiones: 'Alt. aprox. 12 cm',
    donante: '',
    modelUrl: 'models/pieza-05.glb',
    imagenes: [
      'images/cuenco-2-1.jpg',
      'images/cuenco-2-2.jpg',
      'images/cuenco-2-3.jpg',
      'images/cuenco-2-4.jpg',
      'images/cuenco-2-5.jpg',
      'images/cuenco-2-6.jpg'
    ],
    video: null
  }

  // ── CUENCO GLOBULAR CON ASAS · Calima Sonso ──────────────────────
  ,{
    id: 'cuenco-asas',
    nombre: 'Cuenco Globular con Asas Laterales',
    descripcion: 'Cuenco cerámico completo de morfología globular con dos asas opuestas, característico de las fases tardías de la región Calima (período Sonso). Presenta pasta de textura semigruesa con inclusiones visibles de desgrasante de cuarzo y tiesto molido, cocción en atmósfera oxidante y acabado superficial alisado con restos de engobe rojizo (Munsell 10R 5/6). Manufactura utilitaria orientada a actividades domésticas cotidianas. Estado de conservación con desgaste moderado por uso y trazas de intemperismo tafonómico compatibles con depósitos superficiales o contextos excavados en matriz arcillosa.',
    material: 'Cerámica',
    cultura: 'Cultura Calima · Valle del Cauca',
    periodo: 'Período Sonso',
    tecnica: 'Pasta semigruesa, desgrasante de cuarzo y tiesto molido, atmósfera oxidante, engobe rojizo alisado',
    dimensiones: 'Alt. 8 cm · ⌀ 19.1 cm · Peso no registrado',
    donante: '',
    modelUrl: 'models/pieza-10.glb',
    imagenes: [
      'images/cuenco-asas-1.jpg',
      'images/cuenco-asas-2.jpg',
      'images/cuenco-asas-3.jpg',
      'images/cuenco-asas-4.jpg',
      'images/cuenco-asas-5.jpg',
      'images/cuenco-asas-6.jpg'
    ],
    video: null
  }

  // ── JARRÓN 3 · Vasija Globular con Asas Tubulares ────────────────
  ,{
    id: 'jarron-3',
    nombre: 'Vasija Globular con Asas Tubulares',
    descripcion: 'Vasija cerámica globular pequeña con cuello corto y asas laterales perforadas (tubulares), típica de contextos domésticos tardíos del suroccidente colombiano. Presenta pasta mediana con desgrasante de cuarzo y arena fina, cocción oxidante con núcleo visible y acabado alisado burdo con engobe rojo deslavado. La morfología utilitaria y la ausencia de decoración plástica compleja son indicadores de producción doméstica. Estado de conservación con fisuras y fracturas menores en el borde y cuerpo, con concreciones terrosas compatibles con contextos de enterramiento secundario.',
    material: 'Cerámica',
    cultura: 'Posiblemente Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (Sonso, tentativo)',
    tecnica: 'Pasta mediana, desgrasante de cuarzo y arena fina, cocción oxidante, engobe rojo deslavado',
    dimensiones: 'Alt. 9.6 cm · ⌀ 12.7 cm',
    donante: '',
    modelUrl: 'models/pieza-06.glb',
    imagenes: [
      'images/jarron-3-1.jpg',
      'images/jarron-3-2.jpg',
      'images/jarron-3-3.jpg',
      'images/jarron-3-4.jpg',
      'images/jarron-3-5.jpg',
      'images/jarron-3-6.jpg'
    ],
    video: null
  }

  // ── CUENCO CARENADO · Calima Yotoco ──────────────────────────────
  ,{
    id: 'cuenco-carenado',
    nombre: 'Cuenco Carenado Utilitario de Cuello Evertido',
    descripcion: 'Vasija cerámica de cuerpo subglobular con marcada carenación en el cuerpo y cuello cónico corto evertido, asociada a la producción alfarera utilitaria del período Yotoco en la región Calima. La morfología general presenta buen estado de conservación estructural, con superficie alisada rústica parcialmente desprovista de engobe y evidencias de desgaste tafonómico por meteorización. No se observan rastros de pintura ni incisiones complejas, concordando con la tendencia utilitaria de esta fase cronológica.',
    material: 'Cerámica',
    cultura: 'Calima Yotoco · Valle del Cauca',
    periodo: 'Período Yotoco (100 a.C. – 1300 d.C.)',
    tecnica: 'Pasta semi-fina, desgrasante de cuarzo y arena, cocción oxidante incompleta, alisado rústico',
    dimensiones: 'Alt. 16.9 cm · ⌀ 20.5 cm',
    donante: '',
    modelUrl: 'models/pieza-07.glb',
    imagenes: [],
    video: null
  }

  // ── COPA EN PEDESTAL · Calima Malagana ───────────────────────────
  ,{
    id: 'copa-1',
    nombre: 'Copa en Pedestal de Paredes Simples',
    descripcion: 'Copa cerámica en pedestal con cuerpo carenado y base cóncava, clasificada morfológicamente dentro del horizonte Malagana del Valle Bajo del Cauca. Presenta pasta más arenosa y burda característica de este complejo, diferenciándose de las copas finamente incisas del período Yotoco. Morfología utilitaria y ritual asociada a ajuares funerarios de la planicie aluvial. Estado de conservación óptimo con integridad completa, con pátinas y concreciones propias de contextos de entierro primario en fosa.',
    material: 'Cerámica',
    cultura: 'Cultura Calima (Malagana) · Valle del Cauca',
    periodo: 'Período Malagana (200 a.C. – 400 d.C.)',
    tecnica: 'Pasta burda y arenosa, desgrasante de cuarzo y partículas minerales, cocción oxidante, engobe rojo-naranja alisado',
    dimensiones: 'Alt. 10.8 cm · ⌀ 19.8 cm',
    donante: '',
    modelUrl: 'models/pieza-08.glb',
    imagenes: [
      'images/copa-1-1.jpg',
      'images/copa-1-2.jpg',
      'images/copa-1-3.jpg',
      'images/copa-1-4.jpg',
      'images/copa-1-5.jpg'
    ],
    video: null
  }

  // ── FIGURA 1 · Alcarraza Antropomorfa · Calima Ilama ─────────────
  ,{
    id: 'figura-1',
    nombre: 'Alcarraza Antropomorfa Sentada con Tocado',
    descripcion: 'Alcarraza cerámica figurativa que representa una figura sentada con cuerpo globular, cabeza modelada con rasgos realistas y tocado incisado con líneas paralelas características del período Ilama. La iconografía presenta simbolismo chamánico vinculado a transformaciones rituales y ofrendas funerarias. Acabado alisado con engobe rojo-naranja (Munsell 10R 5/6) y reducciones locales en cocción. Estado de conservación completo con abrasión moderada y concreciones de tierra en intersticios.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Ilama · Valle del Cauca',
    periodo: 'Período Ilama (1600 a.C. – 100 d.C.)',
    tecnica: 'Pasta fina oxidante, desgrasante de cuarzo y tiesto molido, atmósfera de cocción oxidante con reducciones locales',
    dimensiones: 'Alt. 33.5 cm · ⌀ 21.7 cm',
    donante: '',
    modelUrl: 'models/pieza-09.glb',
    imagenes: [
      'images/figura-1-1.jpg',
      'images/figura-1-2.jpg',
      'images/figura-1-3.jpg',
      'images/figura-1-4.jpg',
      'images/figura-1-5.jpg',
      'images/figura-1-6.jpg',
      'images/figura-1-7.jpg'
    ],
    video: null
  }

  ,{
    id: 'vasija-antropomorfa',
    nombre: 'Vasija Antropomorfa Globular con Pedestal',
    material: 'Cerámica',
    periodo: 'Período Ilama (Cultura Calima)',
    donante: '',
    descripcion: 'Vasija cerámica prehispánica adscrita al período Ilama de la cultura Calima. Copa globular con base anular y apliques modelados que representan un rostro antropomorfo con rasgos faciales en incisión fina. Pasta fina oxidante con engobe rojo-naranja, característica de las representaciones chamánicas de esta tradición. Estado completo con desgaste superficial moderado.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 10.3 cm · ⌀ 17.2 cm',
    donante: '',
    modelUrl: 'models/pieza-11.glb',
    imagenes: [
      'images/vasija-antropomorfa-1.jpeg',
      'images/vasija-antropomorfa-2.jpeg',
      'images/vasija-antropomorfa-3.jpeg',
      'images/vasija-antropomorfa-4.jpeg',
      'images/vasija-antropomorfa-5.jpeg',
      'images/vasija-antropomorfa-6.jpeg'
    ],
    video: null
  }

  ,{
    id: 'vasija-globular-asas',
    nombre: 'Vasija Cerámica Globular con Asas',
    material: 'Cerámica',
    periodo: 'Período Ilama · Cultura Calima Ilama (1500 a.C. – 100 a.C.)',
    donante: '',
    descripcion: 'Vasija globular de cerámica prehispánica con asas laterales. Pasta semi-gruesa con desgrasante de cuarzo y arena, cocción oxidante. Acabado alisado tosco. Estado de conservación completo.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 15.3 cm · ⌀ 20 cm',
    modelUrl: 'models/pieza-12.glb',
    imagenes: [
      'images/vasija-globular-asas-1.jpeg',
      'images/vasija-globular-asas-2.jpeg',
      'images/vasija-globular-asas-3.jpeg',
      'images/vasija-globular-asas-4.jpeg',
      'images/vasija-globular-asas-5.jpeg',
      'images/vasija-globular-asas-6.jpeg'
    ],
    video: null
  }
  ,{
    id: 'cuenco-miniatura-carenado',
    nombre: 'Cuenco Miniatura Carenado con Aplique Digital',
    material: 'Cerámica',
    periodo: 'Período Ilama · Cultura Calima Ilama (1600 a.C. – 100 d.C.)',
    donante: '',
    descripcion: 'Cuenco miniatura globular incompleto con bordes dentados y espinosos. Aplique pastillado con impresiones digitales en la carenina. Cocción reductora con núcleo oscuro. Probable función ritual o votiva.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 6.5 cm · ⌀ 7 cm',
    modelUrl: 'models/pieza-13.glb',
    imagenes: [
      'images/cuenco-miniatura-1.jpeg',
      'images/cuenco-miniatura-2.jpeg',
      'images/cuenco-miniatura-3.jpeg',
      'images/cuenco-miniatura-4.jpeg',
      'images/cuenco-miniatura-5.jpeg',
      'images/cuenco-miniatura-6.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-globular-sonso',
    nombre: 'Vasija Globular con Aplique Digitado',
    material: 'Cerámica',
    periodo: 'Período Sonso · Cultura Calima (1200 d.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Vasija globular de cuello corto y borde evertido. Presenta banda de aplique con incisiones digitales en la base del cuello, rasgo típico del período Sonso. Superficie con evidencias de exposición al fuego. Cocción reductora con zonas oxidadas.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 13.8 cm · Ancho 15.5 cm · ⌀ 16.2 cm',
    modelUrl: 'models/pieza-14.glb',
    imagenes: [
      'images/vasija-globular-sonso-1.jpeg',
      'images/vasija-globular-sonso-2.jpeg',
      'images/vasija-globular-sonso-3.jpeg',
      'images/vasija-globular-sonso-4.jpeg',
      'images/vasija-globular-sonso-5.jpeg'
    ],
    video: null
  },

  {
    id: 'cuenco-globular-yotoco',
    nombre: 'Cuenco Globular Cerámico',
    material: 'Cerámica',
    periodo: 'Período Prehispánico · Cultura Calima Yotoco / Tradición Local',
    donante: '',
    descripcion: 'Cuenco globular subesférico de cuello corto y borde evertido. Pasta tosca con engobe rojizo. Sin decoración plástica compleja. Adscripción a utilería doméstica cotidiana del Valle del Cauca tardío.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 8 cm · ⌀ 16.7 cm',
    modelUrl: 'models/pieza-15.glb',
    imagenes: [
      'images/cuenco-globular-yotoco-1.jpeg',
      'images/cuenco-globular-yotoco-2.jpeg',
      'images/cuenco-globular-yotoco-3.jpeg',
      'images/cuenco-globular-yotoco-4.jpeg',
      'images/cuenco-globular-yotoco-5.jpeg',
      'images/cuenco-globular-yotoco-6.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-asas-yotoco',
    nombre: 'Vasija Cerámica Globular con Asas Laterales',
    material: 'Cerámica',
    periodo: 'Período Yotoco · Cultura Calima Yotoco (100 a.C. – 1300 d.C.)',
    donante: '',
    descripcion: 'Vasija globular de gran tamaño con cuello corto, borde evertido y dos asas laterales de cinta simétricas. Pasta semigruesa con cocción oxidante irregular. Notable por sus dimensiones y desgaste tafonómico.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 35.6 cm · Ancho 31.3 cm · ⌀ 32.6 cm',
    modelUrl: 'models/pieza-16.glb',
    imagenes: [
      'images/vasija-asas-yotoco-1.jpeg',
      'images/vasija-asas-yotoco-2.jpeg',
      'images/vasija-asas-yotoco-3.jpeg',
      'images/vasija-asas-yotoco-4.jpeg',
      'images/vasija-asas-yotoco-5.jpeg',
      'images/vasija-asas-yotoco-6.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-miniatura-sonso',
    nombre: 'Vasija Globular Miniatura',
    material: 'Cerámica',
    periodo: 'Período Sonso · Cultura Calima (1200 d.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Vasija miniatura globular carenada de cuello corto y borde evertido. Aplique modelado en la zona del hombro. Pasta semigruesa con cocción mixta. Función doméstica o funeraria simplificada.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 11.3 cm · ⌀ 13.6 cm',
    modelUrl: 'models/pieza-17.glb',
    imagenes: [
      'images/vasija-miniatura-sonso-1.jpeg',
      'images/vasija-miniatura-sonso-2.jpeg',
      'images/vasija-miniatura-sonso-3.jpeg',
      'images/vasija-miniatura-sonso-4.jpeg',
      'images/vasija-miniatura-sonso-5.jpeg'
    ],
    video: null
  },

  {
    id: 'copa-pedestal-yotoco',
    nombre: 'Copa en Pedestal de Paredes Simples',
    material: 'Cerámica',
    periodo: 'Período Yotoco · Cultura Calima (100 a.C. – 1300 d.C.)',
    donante: '',
    descripcion: 'Copa en pedestal de cuerpo globular con soporte cónico. Apliques nodulares simples en zona ecuatorial. Engobe rojo. Probable uso ceremonial en ajuares funerarios de la llanura aluvial del río Cauca.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 14.7 cm · ⌀ 19.5 cm',
    modelUrl: 'models/pieza-18.glb',
    imagenes: [
      'images/copa-pedestal-yotoco-1.jpeg',
      'images/copa-pedestal-yotoco-2.jpeg',
      'images/copa-pedestal-yotoco-3.jpeg',
      'images/copa-pedestal-yotoco-4.jpeg',
      'images/copa-pedestal-yotoco-5.jpeg'
    ],
    video: null
  },

  {
    id: 'alcarraza-ilama',
    nombre: 'Alcarraza Cerámica Globular',
    material: 'Cerámica',
    periodo: 'Período Ilama · Cultura Calima (1600 a.C. – 100 d.C.)',
    donante: '',
    descripcion: 'Alcarraza monocroma de cuerpo globular y cuello largo evertido. Pasta fina con desgrasante de cuarzo fino. Acabado alisado monocromo. Probable función ritual o utilitaria simple del período Ilama.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 12.2 cm · Ancho 10.3 cm · ⌀ 10.3 cm',
    modelUrl: 'models/pieza-19.glb',
    imagenes: [
      'images/alcarraza-ilama-1.jpeg',
      'images/alcarraza-ilama-2.jpeg',
      'images/alcarraza-ilama-3.jpeg',
      'images/alcarraza-ilama-4.jpeg',
      'images/alcarraza-ilama-5.jpeg'
    ],
    video: null
  },

  {
    id: 'copa-pedestal-malagana',
    nombre: 'Copa en Pedestal de Cerámica',
    material: 'Cerámica',
    periodo: 'Período Malagana · Cultura Calima (200 a.C. – 400 d.C.)',
    donante: '',
    descripcion: 'Copa en pedestal sin decoración incisa, diagnóstica del período Malagana. Cuerpo globular sobre pedestal cónico. Engobe rojo-naranja con desgaste tafonómico por entierro en fosa. Completa y en buen estado estructural.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 14 cm · ⌀ 17.8 cm',
    modelUrl: 'models/pieza-20.glb',
    imagenes: [
      'images/copa-pedestal-malagana-1.jpeg',
      'images/copa-pedestal-malagana-2.jpeg',
      'images/copa-pedestal-malagana-3.jpeg',
      'images/copa-pedestal-malagana-4.jpeg',
      'images/copa-pedestal-malagana-5.jpeg'
    ],
    video: null
  },

  // ── SALA 3 · PIEZAS 21–25 ────────────────────────────────────────

  {
    id: 'vasija-carenada-helicoidal',
    nombre: 'Vasija Cerámica Carenada con Reborde Helicoidal',
    material: 'Cerámica',
    periodo: 'Período Yotoco · Cultura Calima (100 d.C. – 1200 d.C.)',
    donante: '',
    descripcion: 'Vasija globular carenada con cuello corto, doble asa vertical y un inusual cordón helicoidal en relieve que recorre el cuerpo. Engobe rojo diagnóstico del período Yotoco de la región Calima. Completa con daños menores en el borde.',
    procedencia: 'Calima — Período Yotoco, Valle del Cauca',
    dimensiones: 'Alt. 19 cm · Ancho 17.1 cm · ⌀ 17.4 cm',
    modelUrl: 'models/pieza-21.glb',
    imagenes: [
      'images/vasija-carenada-helicoidal-1.jpeg',
      'images/vasija-carenada-helicoidal-2.jpeg',
      'images/vasija-carenada-helicoidal-3.jpeg',
      'images/vasija-carenada-helicoidal-4.jpeg',
      'images/vasija-carenada-helicoidal-5.jpeg',
      'images/vasija-carenada-helicoidal-6.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-globular-yotoco-asas',
    nombre: 'Vasija Cerámica Globular con Asas',
    material: 'Cerámica',
    periodo: 'Período Yotoco · Cultura Calima (100 a.C. – 1300 d.C.)',
    donante: '',
    descripcion: 'Vasija subglobular con cuello cónico corto, borde evertido y asas verticales para suspensión. Pasta semigruesa con cocción mixta. Apliques pastillados discretos en el cuerpo. Estado completo.',
    procedencia: 'Calima Yotoco, Valle del Cauca',
    dimensiones: 'Alt. 16.2 cm · Ancho 18 cm · ⌀ 18 cm',
    modelUrl: 'models/pieza-22.glb',
    imagenes: [
      'images/vasija-globular-yotoco-asas-1.jpeg',
      'images/vasija-globular-yotoco-asas-2.jpeg',
      'images/vasija-globular-yotoco-asas-3.jpeg',
      'images/vasija-globular-yotoco-asas-4.jpeg',
      'images/vasija-globular-yotoco-asas-5.jpeg'
    ],
    video: null
  },

  {
    id: 'volante-muisca-decorado',
    nombre: 'Volante de Huso Cerámico Decorado',
    material: 'Cerámica',
    periodo: 'Cultura Muisca · Período Herrera a Tardío (400 a.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Volante de huso (tortera) troncocónico con cuello tubular y decoración incisa y punteada. Líneas diagonales, arcos y estrías horizontales en el cuello. Engobe rojo. Diagnóstico de la industria textil muisca del altiplano cundiboyacense.',
    procedencia: 'Tradición Muisca, Cundinamarca',
    dimensiones: 'Alt. 1.2 cm · ⌀ 5.1 cm',
    modelUrl: 'models/pieza-23.glb',
    imagenes: [
      'images/volante-muisca-decorado-1.jpeg',
      'images/volante-muisca-decorado-2.jpeg',
      'images/volante-muisca-decorado-3.jpeg',
      'images/volante-muisca-decorado-4.jpeg',
      'images/volante-muisca-decorado-5.jpeg',
      'images/volante-muisca-decorado-6.jpeg'
    ],
    video: null
  },

  {
    id: 'cuenco-utilitario-sonso',
    nombre: 'Cuenco Cerámico Utilitario con Asas Tubulares',
    material: 'Cerámica',
    periodo: 'Período Sonso · Cultura Calima (1200 d.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Cuenco hemisférico de base convexa con par de asas tubulares perforadas características de la alfarería doméstica del período Sonso. Pasta gruesa de cocción irregular y superficie rugosa. Completo.',
    procedencia: 'Calima — período Sonso, Valle del Cauca',
    dimensiones: 'Alt. 2.7 cm · ⌀ 12.5 cm',
    modelUrl: 'models/pieza-24.glb',
    imagenes: [
      'images/cuenco-utilitario-sonso-1.jpeg',
      'images/cuenco-utilitario-sonso-2.jpeg',
      'images/cuenco-utilitario-sonso-3.jpeg',
      'images/cuenco-utilitario-sonso-4.jpeg',
      'images/cuenco-utilitario-sonso-5.jpeg'
    ],
    video: null
  },

  {
    id: 'cuenco-miniatura-pedestal',
    nombre: 'Cuenco Miniatura sobre Pedestal',
    material: 'Cerámica',
    periodo: 'Período prehispánico (morfología Yotoco)',
    donante: '',
    descripcion: 'Cuenco miniatura carenado de morfología similar al estilo Yotoco, con pasta fina y engobe rojo uniforme. Función votiva o simbólica. Estado completo con mínimo desgaste tafonómico.',
    procedencia: 'Valle del Cauca, Colombia',
    dimensiones: 'Alt. 2.2 cm · ⌀ 10.5 cm',
    modelUrl: 'models/pieza-25.glb',
    imagenes: [
      'images/cuenco-miniatura-pedestal-1.jpeg',
      'images/cuenco-miniatura-pedestal-2.jpeg',
      'images/cuenco-miniatura-pedestal-3.jpeg',
      'images/cuenco-miniatura-pedestal-4.jpeg',
      'images/cuenco-miniatura-pedestal-5.jpeg'
    ],
    video: null
  },

  // ── SALA 3 · PIEZAS 26–30 ────────────────────────────────────────

  {
    id: 'olla-globular-ilama',
    nombre: 'Olla Cerámica Globular Pequeña',
    material: 'Cerámica',
    periodo: 'Período Ilama · Cultura Calima (1500 a.C. – 100 a.C.)',
    donante: '',
    descripcion: 'Olla globular con cuello corto evertido. Pasta semigruesa con desgrasante de cuarzo y tiesto molido. Engobe rojo parcial. Uso utilitario doméstico típico del período Ilama en la cordillera Occidental. Conservación completa.',
    procedencia: 'Calima Ilama, Valle del Cauca',
    dimensiones: 'Alt. 15.6 cm · Ancho 18.8 cm · ⌀ 18.8 cm',
    modelUrl: 'models/pieza-26.glb',
    imagenes: [
      'images/olla-globular-ilama-1.jpeg',
      'images/olla-globular-ilama-2.jpeg',
      'images/olla-globular-ilama-3.jpeg',
      'images/olla-globular-ilama-4.jpeg',
      'images/olla-globular-ilama-5.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-miniatura-calima',
    nombre: 'Vasija Miniatura Globular Cerámica',
    material: 'Cerámica',
    periodo: 'Período Tardío · Posiblemente Calima Sonso (1200 d.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Vasija miniatura globular de cuello corto y borde evertido. Pasta mediana con inclusiones de cuarzo y partículas micáceas. Acabado rústico sin decoración plástica compleja. Probable función doméstica o funeraria. Completa con fisura leve en el borde.',
    procedencia: 'Posiblemente Calima Sonso, Valle del Cauca',
    dimensiones: 'Alt. 8.1 cm · Ancho 11.3 cm · ⌀ 11.3 cm',
    modelUrl: 'models/pieza-27.glb',
    imagenes: [
      'images/vasija-miniatura-calima-1.jpeg',
      'images/vasija-miniatura-calima-2.jpeg',
      'images/vasija-miniatura-calima-3.jpeg',
      'images/vasija-miniatura-calima-4.jpeg',
      'images/vasija-miniatura-calima-5.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-globular-yotoco-28',
    nombre: 'Vasija Cerámica Globular con Asa',
    material: 'Cerámica',
    periodo: 'Período Yotoco · Cultura Calima (100 a.C. – 1300 d.C.)',
    donante: '',
    descripcion: 'Vasija globular con cuello corto y asa vertical de cinta que conecta cuello y hombro. Pasta semifina con engobe rojo. Fracturas antiguas en el borde superior. Diagnóstica de la alfarería utilitaria Yotoco del Valle del Cauca.',
    procedencia: 'Calima Yotoco, Valle del Cauca',
    dimensiones: 'Alt. 20.3 cm · Ancho 21 cm · ⌀ 21 cm',
    modelUrl: 'models/pieza-28.glb',
    imagenes: [
      'images/vasija-globular-yotoco-28-1.jpeg',
      'images/vasija-globular-yotoco-28-2.jpeg',
      'images/vasija-globular-yotoco-28-3.jpeg',
      'images/vasija-globular-yotoco-28-4.jpeg',
      'images/vasija-globular-yotoco-28-5.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-globular-indeterminada',
    nombre: 'Vasija Cerámica Globular con Asa Lateral',
    material: 'Cerámica',
    periodo: 'Período prehispánico (cultura indeterminada)',
    donante: '',
    descripcion: 'Vasija globular de gran tamaño con asa lateral y apéndices. Pasta mediana con desgrasante de cuarzo. Acabado tosco con superficie erosionada por tafonía. Función utilitaria de almacenamiento o vertido. Completa con desgaste significativo.',
    procedencia: 'Valle del Cauca, Colombia (cultura indeterminada)',
    dimensiones: 'Alt. 28.7 cm · Ancho 27 cm · ⌀ 27 cm',
    modelUrl: 'models/pieza-29.glb',
    imagenes: [
      'images/vasija-globular-indeterminada-1.jpeg',
      'images/vasija-globular-indeterminada-2.jpeg',
      'images/vasija-globular-indeterminada-3.jpeg',
      'images/vasija-globular-indeterminada-4.jpeg',
      'images/vasija-globular-indeterminada-5.jpeg'
    ],
    video: null
  },

  {
    id: 'vasija-globular-calima-30',
    nombre: 'Vasija Cerámica Globular Utilitaria',
    material: 'Cerámica',
    periodo: 'Período Tardío · Posiblemente Calima Sonso (1200 d.C. – 1600 d.C.)',
    donante: '',
    descripcion: 'Vasija globular utilitaria con cuello corto y borde evertido. Pasta semigruesa con manchas de reducción en la cocción. Alisado rústico sin decoración plástica, característico de la alfarería doméstica tardía del suroccidente colombiano. Completa con fractura menor en el borde.',
    procedencia: 'Posiblemente Calima Sonso, Valle del Cauca',
    dimensiones: 'Alt. 12.7 cm · Ancho 18.5 cm · ⌀ 18.5 cm',
    modelUrl: 'models/pieza-30.glb',
    imagenes: [
      'images/vasija-globular-calima-30-1.jpeg',
      'images/vasija-globular-calima-30-2.jpeg',
      'images/vasija-globular-calima-30-3.jpeg',
      'images/vasija-globular-calima-30-4.jpeg',
      'images/vasija-globular-calima-30-5.jpeg'
    ],
    video: null
  }

  // ── SALA 4 · PIEZAS 31–40 ────────────────────────────────────────

  ,{
    id: 'vasija-uso-sonso-31',
    nombre: 'Vasija Globular de Uso Doméstico',
    descripcion: 'Vasija globular de almacenamiento con cuello corto y borde evertido, atribuible al período Sonso del Valle del Cauca. Pasta semigruesa con desgrasante de cuarzo y tiesto molido. Acabado alisado tosco sin decoración plástica elaborada. Estado completo.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (1200 d.C. – 1600 d.C.)',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 16.0 × ⌀ 22.4 cm',
    donante: '',
    modelUrl: 'models/pieza-31.glb',
    imagenes: ['images/vasija-uso-sonso-31-1.jpeg','images/vasija-uso-sonso-31-2.jpeg','images/vasija-uso-sonso-31-3.jpeg','images/vasija-uso-sonso-31-4.jpeg','images/vasija-uso-sonso-31-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-miniatura-asa-32',
    nombre: 'Cuenco Miniatura Cerámico con Asa Lateral',
    descripcion: 'Cuenco cerámico miniatura con cuerpo subglobular, base convexa y asa horizontal perforada. Pasta semigruesa con desgrasante visible y engobe rojo. Estado de fragmento diagnóstico.',
    material: 'Cerámica',
    cultura: 'Cultura indeterminada · Valle del Cauca',
    periodo: 'Período indeterminado',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 10.2 × ⌀ 13.4 cm',
    donante: '',
    modelUrl: 'models/pieza-32.glb',
    imagenes: ['images/cuenco-miniatura-asa-32-1.jpeg','images/cuenco-miniatura-asa-32-2.jpeg','images/cuenco-miniatura-asa-32-3.jpeg','images/cuenco-miniatura-asa-32-4.jpeg','images/cuenco-miniatura-asa-32-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-carenada-yotoco-33',
    nombre: 'Vasija Cerámica Carenada con Asa Horizontal',
    descripcion: 'Vasija globular con marcada carenación en el ecuador del cuerpo y asa horizontal. Pasta fina y compacta con desgrasante de cuarzo fino, cocción oxidante. Engobe rojo característico del período Yotoco.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco · Valle del Cauca',
    periodo: '100 a.C. – 1300 d.C.',
    tecnica: 'Pasta fina compacta, desgrasante cuarzo fino, cocción oxidante',
    dimensiones: 'Alt. 21.0 × ⌀ 23.5 cm',
    donante: '',
    modelUrl: 'models/pieza-33.glb',
    imagenes: ['images/vasija-carenada-yotoco-33-1.jpeg','images/vasija-carenada-yotoco-33-2.jpeg','images/vasija-carenada-yotoco-33-3.jpeg','images/vasija-carenada-yotoco-33-4.jpeg','images/vasija-carenada-yotoco-33-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-globular-yotoco-34',
    nombre: 'Vasija Cerámica Globular con Asas Laterales',
    descripcion: 'Vasija subglobular de uso utilitario con cuello corto evertido y dos asas laterales simétricas. Pasta semigruesa, cocción predominantemente oxidante. Acabado alisado tosco. Completa con desgaste superficial.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco · Valle del Cauca',
    periodo: '100 a.C. – 1300 d.C.',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y arena, cocción oxidante',
    dimensiones: 'Alt. 21.1 × ⌀ 18.1 cm',
    donante: '',
    modelUrl: 'models/pieza-34.glb',
    imagenes: ['images/vasija-globular-yotoco-34-1.jpeg','images/vasija-globular-yotoco-34-2.jpeg','images/vasija-globular-yotoco-34-3.jpeg','images/vasija-globular-yotoco-34-4.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-hemisf-sonso-35',
    nombre: 'Cuenco Cerámico Hemisférico',
    descripcion: 'Cuenco hemisférico de uso doméstico con cuerpo globular, base convexa y borde directo. Pasta mediana con desgrasante de cuarzo, cocción oxidante. Acabado alisado básico sin decoración. Completo con desgaste tafonómico moderado.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (1200 d.C. – 1600 d.C.)',
    tecnica: 'Pasta mediana, desgrasante cuarzo, cocción oxidante',
    dimensiones: 'Alt. 8.8 × ⌀ 16.0 cm',
    donante: '',
    modelUrl: 'models/pieza-35.glb',
    imagenes: ['images/cuenco-hemisf-sonso-35-1.jpeg','images/cuenco-hemisf-sonso-35-2.jpeg','images/cuenco-hemisf-sonso-35-3.jpeg','images/cuenco-hemisf-sonso-35-4.jpeg','images/cuenco-hemisf-sonso-35-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-miniatura-tierradentro-36',
    nombre: 'Cuenco Miniatura Cerámico',
    descripcion: 'Cuenco miniatura completo con cuerpo subglobular, base convexa y acabado alisado rústico. Pasta semigruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante. Probable uso en actividades rituales o domésticas.',
    material: 'Cerámica',
    cultura: 'Cultura Tierradentro · Cauca',
    periodo: '150 d.C. – 900 d.C.',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 5.8 × ⌀ 11.5 cm',
    donante: '',
    modelUrl: 'models/pieza-36.glb',
    imagenes: ['images/cuenco-miniatura-tierradentro-36-1.jpeg','images/cuenco-miniatura-tierradentro-36-2.jpeg','images/cuenco-miniatura-tierradentro-36-3.jpeg','images/cuenco-miniatura-tierradentro-36-4.jpeg','images/cuenco-miniatura-tierradentro-36-5.jpeg'],
    video: null
  }
  ,{
    id: 'copa-pedestal-malagana-37',
    nombre: 'Copa Cerámica en Pedestal',
    descripcion: 'Copa en pedestal de paredes simples sin decoración incisa, marcador diagnóstico del período Malagana. Cuerpo globular sobre pedestal troncocónico con engobe rojo. Desgaste superficial moderado y fractura antigua en el borde.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Malagana · Valle del Cauca',
    periodo: '200 a.C. – 400 d.C.',
    tecnica: 'Pasta semi-fina, desgrasante cuarzo fino, cocción oxidante',
    dimensiones: 'Alt. 9.8 × ⌀ 16.3 cm',
    donante: '',
    modelUrl: 'models/pieza-37.glb',
    imagenes: ['images/copa-pedestal-malagana-37-1.jpeg','images/copa-pedestal-malagana-37-2.jpeg','images/copa-pedestal-malagana-37-3.jpeg','images/copa-pedestal-malagana-37-4.jpeg','images/copa-pedestal-malagana-37-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-tripode-calima-38',
    nombre: 'Vasija Cerámica Globular Trípode con Asa',
    descripcion: 'Vasija cerámica de uso doméstico con cuerpo globular, cuello corto evertido, asa lateral y soportes basales. Pasta gruesa con desgrasante mineral visible, cocción oxidante con núcleos oscuros.',
    material: 'Cerámica',
    cultura: 'Cultura Calima · Valle del Cauca',
    periodo: 'Período Prehispánico',
    tecnica: 'Pasta gruesa, desgrasante mineral, cocción oxidante con núcleos oscuros',
    dimensiones: 'Alt. 13.7 × ⌀ 17.2 cm',
    donante: '',
    modelUrl: 'models/pieza-38.glb',
    imagenes: ['images/vasija-tripode-calima-38-1.jpeg','images/vasija-tripode-calima-38-2.jpeg','images/vasija-tripode-calima-38-3.jpeg','images/vasija-tripode-calima-38-4.jpeg','images/vasija-tripode-calima-38-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-apliques-sonso-39',
    nombre: 'Vasija Cerámica Globular con Apliques',
    descripcion: 'Vasija cerámica globular con apliques nodulares geométricos digitados en el hombro. Pasta gruesa con desgrasante de cuarzo y tiesto molido, cocción reductora. Acabado alisado rústico.',
    material: 'Cerámica',
    cultura: 'Valle del Cauca · Cultura indeterminada',
    periodo: 'Período indeterminado',
    tecnica: 'Pasta gruesa, desgrasante cuarzo y tiesto, cocción reductora',
    dimensiones: 'Alt. 12.5 × ⌀ 22.9 cm',
    donante: '',
    modelUrl: 'models/pieza-39.glb',
    imagenes: ['images/vasija-apliques-sonso-39-1.jpeg','images/vasija-apliques-sonso-39-2.jpeg','images/vasija-apliques-sonso-39-3.jpeg','images/vasija-apliques-sonso-39-4.jpeg','images/vasija-apliques-sonso-39-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-incisa-sonso-40',
    nombre: 'Vasija Globular con Incisiones Geométricas',
    descripcion: 'Vasija globular con incisiones geométricas finas en bandas diagonales paralelas sobre el hombro, diagnóstico del período Sonso. Cocción reductora con núcleo negro. Evidencia de exposición al fuego, uso culinario probable.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (1200 d.C. – 1600 d.C.)',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y tiesto, cocción reductora',
    dimensiones: 'Alt. 17.9 × ⌀ 26.6 cm',
    donante: '',
    modelUrl: 'models/pieza-40.glb',
    imagenes: ['images/vasija-incisa-sonso-40-1.jpeg','images/vasija-incisa-sonso-40-2.jpeg','images/vasija-incisa-sonso-40-3.jpeg','images/vasija-incisa-sonso-40-4.jpeg'],
    video: null
  }

  // ── SALA 5 · PIEZAS 41–50 ────────────────────────────────────────

  ,{
    id: 'vasija-carenada-vertedera-41',
    nombre: 'Vasija Cerámica Carenada con Vertedera Lateral',
    descripcion: 'Vasija subglobular carenada con cuello cónico y apéndice tubular lateral que funcionó como vertedera. Pasta fina y compacta con desgrasante de cuarzo fino, cocción oxidante con reducciones locales y engobe rojo bícromo.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco · Valle del Cauca',
    periodo: 'Período Yotoco (100 a.C. – 1300 d.C.)',
    tecnica: 'Pasta fina compacta, desgrasante cuarzo fino, cocción oxidante',
    dimensiones: 'Alt. 22.0 × ⌀ 18.9 cm',
    donante: '',
    modelUrl: 'models/pieza-41.glb',
    imagenes: ['images/vasija-carenada-vertedera-41-1.jpeg','images/vasija-carenada-vertedera-41-2.jpeg','images/vasija-carenada-vertedera-41-3.jpeg','images/vasija-carenada-vertedera-41-4.jpeg','images/vasija-carenada-vertedera-41-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-mini-asa-perf-42',
    nombre: 'Cuenco Miniatura Cerámico con Asa Lateral Perforada',
    descripcion: 'Cuenco miniatura completo de cuerpo hemisférico, base convexa y asa lateral perforada. Pasta semigruesa, cocción oxidante. Acabado alisado básico con rastros de quema en la concavidad interior.',
    material: 'Cerámica',
    cultura: 'Valle del Cauca · Cultura indeterminada',
    periodo: 'Contemporáneo',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y arena fina, cocción oxidante',
    dimensiones: 'Alt. 3.7 × ⌀ 10.6 cm',
    donante: '',
    modelUrl: 'models/pieza-42.glb',
    imagenes: ['images/cuenco-mini-asa-perf-42-1.jpeg','images/cuenco-mini-asa-perf-42-2.jpeg','images/cuenco-mini-asa-perf-42-3.jpeg','images/cuenco-mini-asa-perf-42-4.jpeg','images/cuenco-mini-asa-perf-42-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-subglobular-sonso-43',
    nombre: 'Cuenco Subglobular Cerámico',
    descripcion: 'Cuenco cerámico subglobular atribuible al período Sonso. Cuerpo globular con base convexa y borde directo sin cuello. Pasta media a gruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante. Estado completo.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (1200 d.C. – 1600 d.C.)',
    tecnica: 'Pasta media a gruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 8.7 × ⌀ 17.5 cm',
    donante: '',
    modelUrl: 'models/pieza-43.glb',
    imagenes: ['images/cuenco-subglobular-sonso-43-1.jpeg','images/cuenco-subglobular-sonso-43-2.jpeg','images/cuenco-subglobular-sonso-43-3.jpeg','images/cuenco-subglobular-sonso-43-4.jpeg','images/cuenco-subglobular-sonso-43-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-mini-globular-44',
    nombre: 'Vasija Miniatura Globular',
    descripcion: 'Vasija cerámica miniatura de cuerpo globular con borde evertido, superficies alisadas con restos de engobe rojo. Pasta semi-fina a gruesa con desgrasante de cuarzo y tiesto, cocción oxidante con núcleo visible. Morfología completa en buen estado.',
    material: 'Cerámica',
    cultura: 'Valle del Cauca · Cultura indeterminada',
    periodo: 'Contemporáneo',
    tecnica: 'Pasta semi-fina a gruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 11.0 × ⌀ 12.3 cm',
    donante: '',
    modelUrl: 'models/pieza-44.glb',
    imagenes: ['images/vasija-mini-globular-44-1.jpeg','images/vasija-mini-globular-44-2.jpeg','images/vasija-mini-globular-44-3.jpeg','images/vasija-mini-globular-44-4.jpeg','images/vasija-mini-globular-44-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-mini-calima-45',
    nombre: 'Cuenco Miniatura Cerámico',
    descripcion: 'Cuenco cerámico miniatura de morfología subglobular con base convexa. Pasta oxidada de color rojizo con desgrasante fino de cuarzo. Desgaste superficial moderado y fisuras propias del enterramiento. Integridad morfológica completa.',
    material: 'Cerámica',
    cultura: 'Cultura Calima · Valle del Cauca',
    periodo: 'Período Prehispánico',
    tecnica: 'Pasta fina a semifina, desgrasante cuarzo molido fino, cocción oxidante',
    dimensiones: 'Alt. 4.7 × ⌀ 10.4 cm',
    donante: '',
    modelUrl: 'models/pieza-45.glb',
    imagenes: ['images/cuenco-mini-calima-45-1.jpeg','images/cuenco-mini-calima-45-2.jpeg','images/cuenco-mini-calima-45-3.jpeg','images/cuenco-mini-calima-45-4.jpeg','images/cuenco-mini-calima-45-5.jpeg'],
    video: null
  }
  ,{
    id: 'copa-pedestal-frag-yotoco-46',
    nombre: 'Copa Pedestal Fragmentaria',
    descripcion: 'Fragmento diagnóstico de copa con pedestal anular, típico del período Yotoco. Cuenco cóncavo abierto sobre pedestal troncocónico con líneas verticales en el tallo. Pasta fina a semi-fina con núcleo negro. Fracturas antiguas en el borde.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco · Valle del Cauca',
    periodo: 'Período Yotoco (100 a.C. – 1300 d.C.)',
    tecnica: 'Pasta fina a semi-fina, desgrasante cuarzo y arena fina, núcleo negro',
    dimensiones: 'Alt. 15.2 × ⌀ 13.4 cm',
    donante: '',
    modelUrl: 'models/pieza-46.glb',
    imagenes: ['images/copa-pedestal-frag-yotoco-46-1.jpeg','images/copa-pedestal-frag-yotoco-46-2.jpeg','images/copa-pedestal-frag-yotoco-46-3.jpeg','images/copa-pedestal-frag-yotoco-46-4.jpeg','images/copa-pedestal-frag-yotoco-46-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-globular-asas-sonso-47',
    nombre: 'Vasija Globular con Asas Horizontales',
    descripcion: 'Vasija cerámica globular con cuerpo globular acentuado, base convexa y dos asas horizontales opuestas. Cuello corto con borde evertido, actualmente fragmentado. Pasta de textura media a gruesa con cocción oxidante irregular.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Sonso · Valle del Cauca',
    periodo: 'Período Tardío (1200 d.C. – 1600 d.C.)',
    tecnica: 'Pasta media a gruesa, desgrasante cuarzo y tiesto molido, cocción oxidante',
    dimensiones: 'Alt. 32.0 × ⌀ 27.7 cm',
    donante: '',
    modelUrl: 'models/pieza-47.glb',
    imagenes: ['images/vasija-globular-asas-sonso-47-1.jpeg','images/vasija-globular-asas-sonso-47-2.jpeg','images/vasija-globular-asas-sonso-47-3.jpeg','images/vasija-globular-asas-sonso-47-4.jpeg','images/vasija-globular-asas-sonso-47-5.jpeg'],
    video: null
  }
  ,{
    id: 'vasija-globular-cuello-yotoco-48',
    nombre: 'Vasija Globular de Cuello Corto',
    descripcion: 'Vasija cerámica globular utilitaria con cuerpo globular simétrico, base convexa y cuello corto evertido. Pasta mediana con desgrasante de cuarzo, cocción oxidante con núcleo parcialmente reducido. Manchas de hollín y fractura antigua en el borde superior.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco · Valle del Cauca',
    periodo: 'Período Yotoco (100 a.C. – 1300 d.C.)',
    tecnica: 'Pasta mediana, desgrasante cuarzo, cocción oxidante con núcleo reducido',
    dimensiones: 'Alt. 18.1 × ⌀ 22.3 cm',
    donante: '',
    modelUrl: 'models/pieza-48.glb',
    imagenes: ['images/vasija-globular-cuello-yotoco-48-1.jpeg','images/vasija-globular-cuello-yotoco-48-2.jpeg','images/vasija-globular-cuello-yotoco-48-3.jpeg','images/vasija-globular-cuello-yotoco-48-4.jpeg','images/vasija-globular-cuello-yotoco-48-5.jpeg'],
    video: null
  }
  ,{
    id: 'cuenco-mini-yotoco-49',
    nombre: 'Cuenco Miniatura de Cuerpo Globular',
    descripcion: 'Cuenco cerámico miniatura de morfología globular con afiliación probable al período Sonso. Pasta oxidante de textura burda con desgrasantes minerales, acabado alisado sencillo con tonalidades rojizas.',
    material: 'Cerámica',
    cultura: 'Cultura Calima Yotoco / Tradición local · Valle del Cauca',
    periodo: 'Período Prehispánico tardío',
    tecnica: 'Pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante',
    dimensiones: 'Alt. 4.7 × ⌀ 8.4 cm',
    donante: '',
    modelUrl: 'models/pieza-49.glb',
    imagenes: ['images/cuenco-mini-yotoco-49-1.jpeg','images/cuenco-mini-yotoco-49-2.jpeg','images/cuenco-mini-yotoco-49-3.jpeg','images/cuenco-mini-yotoco-49-4.jpeg','images/cuenco-mini-yotoco-49-5.jpeg'],
    video: null
  }
  ,{
    id: 'copa-pedestal-moderna-50',
    nombre: 'Copa en Pedestal de Paredes Simples',
    descripcion: 'Copa cerámica sobre pedestal de paredes simples, morfología característica del complejo Malagana. Engobe rojo con cocción oxidante y manchas de reducción secundaria. Estado de conservación excelente con integridad estructural completa.',
    material: 'Cerámica',
    cultura: 'Valle del Cauca · Cultura indeterminada',
    periodo: 'Contemporáneo / Moderno',
    tecnica: 'Pasta fina compacta, desgrasante cuarzo moderado, cocción oxidante',
    dimensiones: 'Alt. 8.1 × ⌀ 12.4 cm',
    donante: '',
    modelUrl: 'models/pieza-50.glb',
    imagenes: ['images/copa-pedestal-moderna-50-1.jpeg','images/copa-pedestal-moderna-50-2.jpeg','images/copa-pedestal-moderna-50-3.jpeg','images/copa-pedestal-moderna-50-4.jpeg','images/copa-pedestal-moderna-50-5.jpeg'],
    video: null
  }

];

// ── Función auxiliar ─────────────────────────────────────────────────
function getCatalogPiece(id) {
  for (var i = 0; i < MUSEUM_CATALOG.length; i++) {
    if (MUSEUM_CATALOG[i].id === id) return MUSEUM_CATALOG[i];
  }
  return null;
}