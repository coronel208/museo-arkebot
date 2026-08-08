import * as THREE from 'three';

export const PIECES = [

  // ── VOLANTE DE HUSO 1 · Cultura Calima ───────────────────────────
  {
    id: 'volante-de-uso',
    nombre: 'Volante de Huso (Fusayola)',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Ilama (1600 a.C. – 100 d.C.)',
    descripcion: 'Fusayola o volante de huso prehispánico de la región Calima. Presenta morfología bicóncava con perforación central para montaje en varillas de huso destinadas al hilado. Decorada con incisiones de grecas escalonadas, punteado perimetral y líneas radiales, características estilísticas de las tradiciones alfareras tempranas del suroccidente colombiano. Estado de conservación excelente, con desgaste menor por uso en las superficies de fricción.',
    metadata: 'Material: Cerámica · Técnica: Pasta fina, engobe claro · Dimensiones: ⌀ 4.5 × 2.3 cm · Decoración: Incisión geométrica · Estado: Completo',
    color: 0x9b6b3c, roughness: 0.88, metalness: 0.04,
    imagenes: [
      'images/volante-de-uso-1.jpg',
      'images/volante-de-uso-2.jpg',
      'images/volante-de-uso-3.jpg',
      'images/volante-de-uso-4.jpg',
      'images/volante-de-uso-5.jpg',
      'images/volante-de-uso-6.jpg',
      'images/volante-de-uso-7.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-01.glb',
    restY: 1.19
  },

  // ── VOLANTE DE HUSO 2 · Tradición Muisca ─────────────────────────
  {
    id: 'volante-de-huso-2',
    nombre: 'Volante de Huso (Fusayola)',
    procedencia: 'Tradición Muisca, Cundinamarca · Período Herrera a Tardío (500 a.C. – 1600 d.C.)',
    descripcion: 'Fusayola o volante de huso de morfología discoidal simple fabricada en cerámica utilitaria. Presenta perforación central cilíndrica para el paso del eje del huso, con desgaste superficial generalizado y pátina de alteración edáfica. Artefacto común en contextos domésticos de los Andes colombianos asociados a la actividad textil prehispánica y colonial temprana. La pieza se encuentra completa a pesar del desgaste acumulado.',
    metadata: 'Material: Cerámica · Técnica: Pasta semi-gruesa, cocción oxidante · Dimensiones: ⌀ 4.4 × 2.4 cm · Estado: Completo',
    color: 0x8B3A1A, roughness: 0.90, metalness: 0.02,
    previewImg: 'images/volante-de-huso-2-2.jpg',
    imagenes: [
      'images/volante-de-huso-2-1.jpg',
      'images/volante-de-huso-2-2.jpg',
      'images/volante-de-huso-2-3.jpg',
      'images/volante-de-huso-2-4.jpg',
      'images/volante-de-huso-2-5.jpg',
      'images/volante-de-huso-2-6.jpg',
      'images/volante-de-huso-2-7.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-02.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA · Tradición Malagana ────────────────────────
  {
    id: 'cuenco-1',
    nombre: 'Cuenco Miniatura con Engobe Rojo',
    procedencia: 'Cultura Calima (Malagana), Valle del Cauca · Período Malagana (200 a.C. – 400 d.C.)',
    descripcion: 'Cuenco cerámico miniatura de morfología semiesférica vinculado tipológicamente a contextos funerarios del suroccidente colombiano, asociado con la tradición Malagana en el Valle del Cauca. Presenta cuerpo subglobular, base convexa y acabado con engobe rojo característico de la región. El estado de conservación muestra desgaste superficial moderado y pátinas de enterramiento compatibles con contextos de fosa. Uso ritual u ofrendante dentro de ajuares funerarios tempranos.',
    metadata: 'Material: Cerámica · Técnica: Pasta fina, cocción oxidante · Dimensiones: ⌀ 9.5 × 5.8 cm · Decoración: Engobe rojo monocromo · Estado: Completo',
    color: 0x8B2010, roughness: 0.85, metalness: 0.03,
    imagenes: [
      'images/cuenco-1-1.jpg',
      'images/cuenco-1-2.jpg',
      'images/cuenco-1-3.jpg',
      'images/cuenco-1-4.jpg',
      'images/cuenco-1-5.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-03.glb',
    restY: 1.19
  },

  // ── JARRÓN 1 · Cultura Calima Ilama ──────────────────────────────
  {
    id: 'jarron-1',
    nombre: 'Vasija Globular con Cuello Cilíndrico',
    procedencia: 'Cultura Calima Ilama, Valle del Cauca · Período Ilama (1500 a.C. – 100 a.C.)',
    descripcion: 'Vasija cerámica globular con cuello cilíndrico e incisiones horizontales finas. Presenta engobe rojo-naranja característico de la alfarería fina de la tradición Calima Ilama del suroccidente colombiano. El cuerpo globular y el tratamiento inciso en el cuello son indicadores morfotecnológicos del período Ilama. Estado de conservación general bueno con desgastes superficiales propios de tafonomía de entierro.',
    metadata: 'Material: Cerámica · Técnica: Pasta fina oxidante, desgrasante de cuarzo · Dimensiones: 18 × ⌀ 15 cm · Decoración: Incisión horizontal en cuello, engobe rojo-naranja · Estado: Completo',
    color: 0x7A2A0A, roughness: 0.87, metalness: 0.03,
    imagenes: [
      'images/jarron-1-1.jpg',
      'images/jarron-1-2.jpg',
      'images/jarron-1-3.jpg',
      'images/jarron-1-4.jpg',
      'images/jarron-1-5.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-04.glb',
    restY: 1.19
  },

  // ── CUENCO 2 · Copa en Pedestal · Valle del Cauca ────────────────
  {
    id: 'cuenco-2',
    nombre: 'Copa en Pedestal de Cerámica',
    procedencia: 'Valle del Cauca, Colombia · Período Indeterminado (posiblemente Malagana)',
    descripcion: 'Copa cerámica prehispánica en pedestal de paredes simples sin decoración incisa, atribuible al período Malagana de la región Calima. La pasta moderadamente burda y arenosa, con desgrasante de cuarzo y tiesto molido, es característica del complejo Malagana de la llanura aluvial del río Cauca. Presenta manchas tafonómicas por exposición al fuego o contacto con sedimentos reductores. La base muestra anotaciones de inventario museográfico.',
    metadata: 'Material: Cerámica · Técnica: Pasta burda oxidante, desgrasante de cuarzo · Dimensiones: ⌀ 15.8 × 11.7 cm · Decoración: Ausente · Estado: Completo',
    color: 0xA0603A, roughness: 0.88, metalness: 0.02,
    previewImg: 'images/cuenco-2-3.jpg',
    imagenes: [
      'images/cuenco-2-1.jpg',
      'images/cuenco-2-2.jpg',
      'images/cuenco-2-3.jpg',
      'images/cuenco-2-4.jpg',
      'images/cuenco-2-5.jpg',
      'images/cuenco-2-6.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-05.glb',
    restY: 1.19
  },

  // ── JARRÓN 3 · Vasija Globular con Asas Tubulares ────────────────
  {
    id: 'jarron-3',
    nombre: 'Vasija Globular con Asas Tubulares',
    procedencia: 'Posiblemente Calima Sonso, Valle del Cauca · Período Tardío (tentativo)',
    descripcion: 'Vasija cerámica globular pequeña con cuello corto y asas laterales tubulares perforadas, típica de contextos domésticos tardíos. Pasta mediana con desgrasante de cuarzo y arena fina, cocción oxidante con núcleo visible, alisado burdo y engobe rojo deslavado (Munsell 10R 4/6). Producción utilitaria, sin decoración plástica compleja. Estado con fisuras y fracturas menores en borde y cuerpo.',
    metadata: 'Material: Cerámica · Técnica: Pasta mediana, engobe rojo deslavado · Dimensiones: Alt. 9.6 × ⌀ 12.7 cm · Estado: Completo con fisuras · Registro ICANH',
    color: 0x8B2A10, roughness: 0.90, metalness: 0.02,
    imagenes: [
      'images/jarron-3-1.jpg',
      'images/jarron-3-2.jpg',
      'images/jarron-3-3.jpg',
      'images/jarron-3-4.jpg',
      'images/jarron-3-5.jpg',
      'images/jarron-3-6.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-06.glb',
    restY: 1.19
  },

  // ── CUENCO CARENADO · Calima Yotoco ──────────────────────────────
  {
    id: 'cuenco-carenado',
    nombre: 'Cuenco Carenado Utilitario de Cuello Evertido',
    procedencia: 'Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija subglobular con carenación marcada en el cuerpo y cuello cónico corto evertido. Pasta semi-fina con desgrasante de cuarzo y arena, cocción oxidante incompleta. Superficie alisada rústica con engobe Munsell 7.5YR 5/4 (brown). Manufactura utilitaria doméstica. Estado completo con leves desgastes en el borde.',
    metadata: 'Material: Cerámica · Técnica: Pasta semi-fina, cocción oxidante · Dimensiones: Alt. 16.9 × ⌀ 20.5 cm · Estado: Completo · Registro ICANH',
    color: 0x8B5520, roughness: 0.87, metalness: 0.02,
    imagenes: [
      'images/cuenco-carenado-1.jpeg',
      'images/cuenco-carenado-2.jpeg',
      'images/cuenco-carenado-3.jpeg',
      'images/cuenco-carenado-4.jpeg',
      'images/cuenco-carenado-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-07.glb',
    restY: 1.19
  },

  // ── COPA EN PEDESTAL · Calima Malagana ───────────────────────────
  {
    id: 'copa-1',
    nombre: 'Copa en Pedestal de Paredes Simples',
    procedencia: 'Cultura Calima (Malagana), Valle del Cauca · Período Malagana (200 a.C. – 400 d.C.)',
    descripcion: 'Copa cerámica en pedestal con cuerpo carenado y base cóncava. Pasta burda y arenosa con desgrasante de cuarzo, cocción oxidante y engobe rojo-naranja (Munsell 10R 4/6). Morfología utilitaria y ritual de ajuares funerarios Malagana. Estado completo con pátinas de entierro.',
    metadata: 'Material: Cerámica · Técnica: Pasta burda, engobe rojo-naranja · Dimensiones: Alt. 10.8 × ⌀ 19.8 cm · Estado: Completo · Registro ICANH',
    color: 0x9B3A18, roughness: 0.87, metalness: 0.03,
    imagenes: [
      'images/copa-1-1.jpg',
      'images/copa-1-2.jpg',
      'images/copa-1-3.jpg',
      'images/copa-1-4.jpg',
      'images/copa-1-5.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-08.glb',
    restY: 1.19
  },

  // ── FIGURA 1 · Alcarraza Antropomorfa · Calima Ilama ─────────────
  {
    id: 'figura-1',
    nombre: 'Alcarraza Antropomorfa Sentada con Tocado',
    procedencia: 'Cultura Calima Ilama, Valle del Cauca · Período Ilama (1600 a.C. – 100 d.C.)',
    descripcion: 'Alcarraza cerámica figurativa que representa una figura sentada con cuerpo globular, cabeza modelada con rasgos realistas y tocado incisado con líneas paralelas características del período Ilama. La iconografía presenta simbolismo chamánico vinculado a transformaciones rituales y ofrendas funerarias. Acabado alisado con engobe rojo-naranja (Munsell 10R 5/6) y reducciones locales en cocción. Estado de conservación completo con abrasión moderada y concreciones de tierra en intersticios.',
    metadata: 'Material: Cerámica · Técnica: Pasta fina oxidante, desgrasante de cuarzo y tiesto molido · Dimensiones: Alt. 33.5 × ⌀ 21.7 cm · Decoración: Incisiones paralelas en tocado, apliques modelados · Estado: Completo · Registro ICANH',
    color: 0x9B5030, roughness: 0.88, metalness: 0.03,
    imagenes: [
      'images/figura-1-1.jpg',
      'images/figura-1-2.jpg',
      'images/figura-1-3.jpg',
      'images/figura-1-4.jpg',
      'images/figura-1-5.jpg',
      'images/figura-1-6.jpg',
      'images/figura-1-7.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-09.glb',
    restY: 1.19
  },

  // ── CUENCO GLOBULAR CON ASAS · Calima Sonso ──────────────────────
  {
    id: 'cuenco-asas',
    nombre: 'Cuenco Globular con Asas Laterales',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Sonso',
    descripcion: 'Cuenco cerámico completo de morfología globular con dos asas opuestas, característico del período Sonso Calima. Pasta semigruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante. Acabado superficial alisado con engobe rojizo (Munsell 10R 5/6). Manufactura utilitaria doméstica. Estado de conservación con desgaste moderado por uso y trazas de intemperismo tafonómico.',
    metadata: 'Material: Cerámica · Técnica: Pasta semigruesa, engobe rojizo · Dimensiones: Alt. 8 × ⌀ 19.1 cm · Estado: Completo · Registro ICANH',
    color: 0x8B4020, roughness: 0.90, metalness: 0.02,
    imagenes: [
      'images/cuenco-asas-1.jpg',
      'images/cuenco-asas-2.jpg',
      'images/cuenco-asas-3.jpg',
      'images/cuenco-asas-4.jpg',
      'images/cuenco-asas-5.jpg',
      'images/cuenco-asas-6.jpg'
    ],
    video: null,
    modelUrl: 'models/pieza-10.glb',
    restY: 1.19
  },

  // ── VASIJA ANTROPOMORFA · Cultura Calima ─────────────────────────
  {
    id: 'vasija-antropomorfa',
    nombre: 'Vasija Antropomorfa Globular con Pedestal',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Ilama',
    descripcion: 'Vasija cerámica prehispánica adscrita al período Ilama de la cultura Calima. Copa globular con base anular y apliques modelados que representan un rostro antropomorfo con rasgos faciales en incisión fina — ojos, nariz y líneas que simulan tocado o cabello. Pasta fina oxidante con engobe rojo-naranja (Munsell 10R 5/8), característica de las representaciones chamánicas de esta tradición. Estado completo con desgaste superficial moderado.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Ilama · Dimensiones: Alt. 10.3 cm · ⌀ 17.2 cm · Técnica: Pasta fina, engobe rojo-naranja · Decoración: Incisión fina, rasgos faciales modelados · Estado: Completa',
    color: 0xa06030, roughness: 0.85, metalness: 0.02,
    imagenes: [
      'images/vasija-antropomorfa-1.jpeg',
      'images/vasija-antropomorfa-2.jpeg',
      'images/vasija-antropomorfa-3.jpeg',
      'images/vasija-antropomorfa-4.jpeg',
      'images/vasija-antropomorfa-5.jpeg',
      'images/vasija-antropomorfa-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-11.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASAS · Cultura Calima Ilama ──────────────
  {
    id: 'vasija-globular-asas',
    nombre: 'Vasija Cerámica Globular con Asas',
    procedencia: 'Cultura Calima Ilama, Valle del Cauca · Período Ilama (1500 a.C. – 100 a.C.)',
    descripcion: 'Vasija globular de cerámica prehispánica perteneciente a la cultura Calima Ilama. Presenta pasta semi-gruesa con desgrasante de cuarzo y arena visible, cocción en atmósfera oxidante con porosidad media. El cuerpo globular muestra asas laterales y decoración ausente o muy simple en la zona de hombro, característica utilitaria de esta tradición alfarera. Acabado alisado tosco con superficie porosa. Estado de conservación completo.',
    metadata: 'Material: Cerámica · Cultura: Calima Ilama · Período: Ilama (1500–100 a.C.) · Dimensiones: Alt. 15.3 cm · ⌀ 20 cm · Técnica: Pasta semi-gruesa, atmósfera oxidante · Estado: Completo',
    color: 0xa05030, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-asas-1.jpeg',
      'images/vasija-globular-asas-2.jpeg',
      'images/vasija-globular-asas-3.jpeg',
      'images/vasija-globular-asas-4.jpeg',
      'images/vasija-globular-asas-5.jpeg',
      'images/vasija-globular-asas-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-12.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA CARENADO · Cultura Calima Ilama ─────────────
  {
    id: 'cuenco-miniatura-carenado',
    nombre: 'Cuenco Miniatura Carenado con Aplique Digital',
    procedencia: 'Cultura Calima Ilama, Valle del Cauca · Período Ilama (1600 a.C. – 100 d.C.)',
    descripcion: 'Cuenco miniatura de cerámica prehispánica de la cultura Calima Ilama. Vasija u olla globular incompleta con bordes dentados y espinosos elaborados mediante aplique pastillado con impresiones digitales en la carenina. Pasta semigruesa con desgrasante de cuarzo y arena, cocción en atmósfera reductora con núcleo oscuro. El color grisáceo oscuro (Munsell 10YR 4/2) refleja la técnica reductora. Pieza miniatura de probable función ritual o votiva.',
    metadata: 'Material: Cerámica · Cultura: Calima Ilama · Período: Ilama (1600 a.C.–100 d.C.) · Dimensiones: Alt. 6.5 cm · ⌀ 7 cm · Técnica: Atmósfera reductora, bordes dentados · Estado: Incompleto',
    color: 0x5a4535, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/cuenco-miniatura-1.jpeg',
      'images/cuenco-miniatura-2.jpeg',
      'images/cuenco-miniatura-3.jpeg',
      'images/cuenco-miniatura-4.jpeg',
      'images/cuenco-miniatura-5.jpeg',
      'images/cuenco-miniatura-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-13.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON APLIQUE DIGITADO · Calima Sonso ──────────────
  {
    id: 'vasija-globular-sonso',
    nombre: 'Vasija Globular con Aplique Digitado',
    procedencia: 'Cultura Calima — período Sonso, Valle del Cauca · 1200 d.C. – 1600 d.C.',
    descripcion: 'Vasija cerámica globular con cuerpo esférico, cuello corto y borde evertido con labio redondeado. Presenta como elemento diagnóstico una banda de aplique con muescas o incisiones digitales en la base del cuello, rasgo típico de la alfarería utilitaria del período Sonso en el suroccidente colombiano. La pasta semigruesa refleja un cambio hacia la manufactura de enseres de uso cotidiano. La superficie muestra evidencias de exposición al fuego con áreas oscurecidas por hollín y pátinas de meteorización por depósito prolongado. Estado de conservación completo con integridad estructural notable.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Sonso (1200–1600 d.C.) · Dimensiones: Alt. 13.8 cm · Ancho 15.5 cm · ⌀ 16.2 cm · Técnica: Pasta semigruesa, desgrasante de cuarzo y tiesto molido, cocción reductora · Decoración: Banda aplique con incisiones digitales · Estado: Completo',
    color: 0x7a3a20, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-sonso-1.jpeg',
      'images/vasija-globular-sonso-2.jpeg',
      'images/vasija-globular-sonso-3.jpeg',
      'images/vasija-globular-sonso-4.jpeg',
      'images/vasija-globular-sonso-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-14.glb',
    restY: 1.19
  },

  // ── CUENCO GLOBULAR CERÁMICO · Calima Yotoco ─────────────────────────
  {
    id: 'cuenco-globular-yotoco',
    nombre: 'Cuenco Globular Cerámico',
    procedencia: 'Cultura Calima Yotoco / Tradición Local, Valle del Cauca · Período prehispánico',
    descripcion: 'Cuenco cerámico globular con perfil asociable al período tardío del suroccidente colombiano. Presenta cuerpo globular subesférico, cuello corto y borde evertido simple. La pasta muestra acabado tosco con desgrasante mineral visible y restos de engobe rojizo. Sin decoración plástica compleja, lo que refuerza su adscripción a utilería doméstica cotidiana. Presenta desgaste superficial por enterramiento y adherencias terrígenas propias de contextos de depósito prolongado.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: Prehispánico · Dimensiones: Alt. 8 cm · ⌀ 16.7 cm · Técnica: Pasta semigruesa, desgrasante de cuarzo y arena, cocción oxidante · Acabado: Engobe rojo parcial · Estado: Completo',
    color: 0x8b3010, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/cuenco-globular-yotoco-1.jpeg',
      'images/cuenco-globular-yotoco-2.jpeg',
      'images/cuenco-globular-yotoco-3.jpeg',
      'images/cuenco-globular-yotoco-4.jpeg',
      'images/cuenco-globular-yotoco-5.jpeg',
      'images/cuenco-globular-yotoco-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-15.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASAS LATERALES · Calima Yotoco ───────────────
  {
    id: 'vasija-asas-yotoco',
    nombre: 'Vasija Cerámica Globular con Asas Laterales',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija cerámica globular de cuerpo amplio con cuello corto, borde evertido y dos asas laterales de cinta dispuestas simétricamente, rasgos típicos de la alfarería utilitaria del período Yotoco. Pasta semigruesa con inclusiones visibles de desgrasante y huellas de cocción irregular que sugieren uso práctico cotidiano. Estado completo con importantes signos de desgaste tafonómico — erosión superficial y concreciones propias de contextos de entierro. Notable por sus grandes dimensiones respecto a otras piezas de la colección.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: Yotoco (100 a.C.–1300 d.C.) · Dimensiones: Alt. 35.6 cm · Ancho 31.3 cm · ⌀ 32.6 cm · Técnica: Pasta semigruesa, desgrasante de cuarzo y tiesto molido, cocción oxidante con áreas reductoras · Estado: Completo',
    color: 0x8b3010, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-asas-yotoco-1.jpeg',
      'images/vasija-asas-yotoco-2.jpeg',
      'images/vasija-asas-yotoco-3.jpeg',
      'images/vasija-asas-yotoco-4.jpeg',
      'images/vasija-asas-yotoco-5.jpeg',
      'images/vasija-asas-yotoco-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-16.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR MINIATURA · Calima Sonso ─────────────────────────
  {
    id: 'vasija-miniatura-sonso',
    nombre: 'Vasija Globular Miniatura',
    procedencia: 'Cultura Calima — período Sonso, Valle del Cauca · 1200 d.C. – 1600 d.C.',
    descripcion: 'Vasija cerámica globular miniatura de morfología carenada atribuible al período Sonso de la región Calima. Presenta cuerpo globular con carenación en el diámetro máximo, cuello corto y borde evertido. La manufactura menos depurada respecto a períodos anteriores incorpora formas utilitarias cotidianas. Superficie con alisado burdo, engobe rojo y posibles alteraciones térmicas. Morfología y acabados alineados con patrones cerámicos de asentamientos tardíos del Valle del Cauca.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Sonso (1200–1600 d.C.) · Dimensiones: Alt. 11.3 cm · Ancho 13.6 cm · ⌀ 13.6 cm · Técnica: Pasta semigruesa, cocción mixta con núcleo negro y zonas oxidantes · Decoración: Aplique modelado en zona del hombro · Estado: Completo',
    color: 0x7a3520, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/vasija-miniatura-sonso-1.jpeg',
      'images/vasija-miniatura-sonso-2.jpeg',
      'images/vasija-miniatura-sonso-3.jpeg',
      'images/vasija-miniatura-sonso-4.jpeg',
      'images/vasija-miniatura-sonso-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-17.glb',
    restY: 1.19
  },

  // ── COPA EN PEDESTAL · Calima Yotoco ─────────────────────────────────
  {
    id: 'copa-pedestal-yotoco',
    nombre: 'Copa en Pedestal de Paredes Simples',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Copa cerámica en pedestal de paredes simples asociable al período Malagana de la cultura Calima, destacando por su cuerpo globular y soporte cónico sin decoración incisa compleja. El análisis iconográfico sugiere uso ceremonial vinculado a ajuares funerarios de la llanura aluvial del río Cauca. Estado de conservación bueno con integridad estructural completa, aunque muestra desgaste superficial moderado y pérdida parcial del engobe rojo por procesos tafonómicos de enterramiento. Apliques nodulares simples en la zona ecuatorial superior.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: Yotoco (100 a.C.–1300 d.C.) · Dimensiones: Alt. 14.7 cm · ⌀ 19.5 cm · Técnica: Pasta fina a semigruesa, desgrasante de cuarzo y arena fina, cocción oxidante · Acabado: Engobe rojo · Estado: Completo',
    color: 0x9a3010, roughness: 0.88, metalness: 0.02,
    imagenes: [
      'images/copa-pedestal-yotoco-1.jpeg',
      'images/copa-pedestal-yotoco-2.jpeg',
      'images/copa-pedestal-yotoco-3.jpeg',
      'images/copa-pedestal-yotoco-4.jpeg',
      'images/copa-pedestal-yotoco-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-18.glb',
    restY: 1.19
  },

  // ── ALCARRAZA CERÁMICA GLOBULAR · Calima Ilama ───────────────────────
  {
    id: 'alcarraza-ilama',
    nombre: 'Alcarraza Cerámica Globular',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Ilama (1600 a.C. – 100 d.C.)',
    descripcion: 'Alcarraza monocroma de cuerpo globular y cuello largo evertido, morfológicamente consistente con la alfarería del período Ilama de la cultura Calima. La pasta fina y la morfología de cuerpo globular con cuello tubular son rasgos diagnósticos de este período. Estado de conservación notablemente íntegro, aunque presenta depósitos de manganeso y abrasión superficial por depósito prolongado. Acabado alisado monocromo, probable función utilitaria o ritual simple.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Ilama (1600 a.C.–100 d.C.) · Dimensiones: Alt. 12.2 cm · Ancho 10.3 cm · ⌀ 10.3 cm · Técnica: Pasta fina, desgrasante de cuarzo fino, cocción oxidante con núcleos reducidos · Acabado: Engobe Munsell 10YR 5/4 · Estado: Completo',
    color: 0x9a6832, roughness: 0.86, metalness: 0.02,
    imagenes: [
      'images/alcarraza-ilama-1.jpeg',
      'images/alcarraza-ilama-2.jpeg',
      'images/alcarraza-ilama-3.jpeg',
      'images/alcarraza-ilama-4.jpeg',
      'images/alcarraza-ilama-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-19.glb',
    restY: 1.19
  },

  // ── COPA EN PEDESTAL · Calima Malagana ───────────────────────────────
  {
    id: 'copa-pedestal-malagana',
    nombre: 'Copa en Pedestal de Cerámica',
    procedencia: 'Cultura Calima — período Malagana, Valle del Cauca · 200 a.C. – 400 d.C.',
    descripcion: 'Copa cerámica en pedestal de paredes simples sin decoración incisa, lo que concuerda con los marcadores diagnósticos del período Malagana en la llanura aluvial del Valle del Cauca. La ausencia de incisiones complejas diferencia claramente esta pieza de las copas del período Yotoco de la cordillera. Engobe de tonalidad rojiza con evidencias de desgaste superficial, erosión y ligeras concreciones tafonómicas acordes con contextos de entierro en fosa. Pieza completa en buen estado general de conservación estructural.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Malagana (200 a.C.–400 d.C.) · Dimensiones: Alt. 14 cm · ⌀ 17.8 cm · Técnica: Pasta fina a media, desgrasante de cuarzo y arena fina, cocción oxidante · Acabado: Engobe rojo-naranja Munsell 10R 4/6 · Estado: Completo',
    color: 0xa03010, roughness: 0.87, metalness: 0.02,
    imagenes: [
      'images/copa-pedestal-malagana-1.jpeg',
      'images/copa-pedestal-malagana-2.jpeg',
      'images/copa-pedestal-malagana-3.jpeg',
      'images/copa-pedestal-malagana-4.jpeg',
      'images/copa-pedestal-malagana-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-20.glb',
    restY: 1.19
  },

  // ── SALA 3 · PIEZAS 21–25 ────────────────────────────────────────

  // ── VASIJA CARENADA HELICOIDAL · Calima Yotoco ───────────────────
  {
    id: 'vasija-carenada-helicoidal',
    nombre: 'Vasija Cerámica Carenada con Reborde Helicoidal',
    procedencia: 'Calima — Período Yotoco, Valle del Cauca · 100 d.C. – 1200 d.C.',
    descripcion: 'Vasija globular carenada con cuello corto y doble asa vertical. Destaca por un inusual cordón helicoidal en relieve que recorre el cuerpo, apliques nodulares y carenación pronunciada. Pasta fina con desgrasante de cuarzo y cocción oxidante. Completa con daños menores en el borde.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 d.C.–1200 d.C. · Dimensiones: Alt. 19 cm · Ancho 17.1 cm · ⌀ 17.4 cm · Técnica: pasta fina, desgrasante cuarzo fino, cocción oxidante · Acabado: engobe rojo Munsell 10R 4/6 · Estado: Completo con daños menores en borde',
    color: 0xa03010, roughness: 0.86, metalness: 0.02,
    imagenes: [
      'images/vasija-carenada-helicoidal-1.jpeg',
      'images/vasija-carenada-helicoidal-2.jpeg',
      'images/vasija-carenada-helicoidal-3.jpeg',
      'images/vasija-carenada-helicoidal-4.jpeg',
      'images/vasija-carenada-helicoidal-5.jpeg',
      'images/vasija-carenada-helicoidal-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-21.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASAS · Calima Yotoco ─────────────────────
  {
    id: 'vasija-globular-yotoco-asas',
    nombre: 'Vasija Cerámica Globular con Asas',
    procedencia: 'Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija subglobular con cuello cónico corto, borde evertido y asas verticales para suspensión. Pasta semigruesa con cocción mixta y núcleo reductor. Apliques pastillados discretos en el cuerpo. Marcas de cepillado superficial. Estado completo.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 16.2 cm · ⌀ 18 cm · Técnica: pasta semigruesa, desgrasante cuarzo y arena, cocción mixta · Acabado: alisado tosco Munsell 10R 5/6 · Estado: Completo',
    color: 0x9b3a15, roughness: 0.90, metalness: 0.02,
    imagenes: [
      'images/vasija-globular-yotoco-asas-1.jpeg',
      'images/vasija-globular-yotoco-asas-2.jpeg',
      'images/vasija-globular-yotoco-asas-3.jpeg',
      'images/vasija-globular-yotoco-asas-4.jpeg',
      'images/vasija-globular-yotoco-asas-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-22.glb',
    restY: 1.15
  },

  // ── VOLANTE DE HUSO · Muisca ─────────────────────────────────────
  {
    id: 'volante-muisca-decorado',
    nombre: 'Volante de Huso Cerámico Decorado',
    procedencia: 'Tradición Muisca, Cundinamarca · Período Herrera a Tardío (400 a.C. – 1600 d.C.)',
    descripcion: 'Volante de huso (tortera) troncocónico con cuello tubular y decoración incisa y punteada: líneas diagonales paralelas, arcos de puntos y estrías horizontales en el cuello. Engobe rojo de buena factura. Completo. Herramienta de la industria textil del altiplano cundiboyacense.',
    metadata: 'Material: Cerámica · Cultura: Muisca · Período: Herrera a Tardío (400 a.C.–1600 d.C.) · Dimensiones: Alt. 1.2 cm · ⌀ 5.1 cm · Técnica: pasta fina, desgrasante cuarzo molido, cocción oxidante · Acabado: engobe rojo Munsell 2.5YR 5/6 · Decoración: incisión fina + punteado · Estado: Completo',
    color: 0xb04020, roughness: 0.84, metalness: 0.02,
    imagenes: [
      'images/volante-muisca-decorado-1.jpeg',
      'images/volante-muisca-decorado-2.jpeg',
      'images/volante-muisca-decorado-3.jpeg',
      'images/volante-muisca-decorado-4.jpeg',
      'images/volante-muisca-decorado-5.jpeg',
      'images/volante-muisca-decorado-6.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-23.glb',
    restY: 1.19
  },

  // ── CUENCO UTILITARIO · Calima Sonso ─────────────────────────────
  {
    id: 'cuenco-utilitario-sonso',
    nombre: 'Cuenco Cerámico Utilitario con Asas Tubulares',
    procedencia: 'Calima — período Sonso, Valle del Cauca · 1200 d.C. – 1600 d.C.',
    descripcion: 'Cuenco hemisférico de base convexa con un par de asas tubulares perforadas, rasgo típico de la alfarería doméstica del período Sonso. Pasta de textura burda con cocción irregular. Funcional sobre estética. Completo con desgaste tafonómico por uso y enterramiento.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 2.7 cm · ⌀ 12.5 cm · Técnica: pasta mediana, desgrasante cuarzo y arena, cocción reductora parcial · Acabado: alisado rústico Munsell 2.5YR 5/6 · Estado: Completo',
    color: 0x8b3515, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/cuenco-utilitario-sonso-1.jpeg',
      'images/cuenco-utilitario-sonso-2.jpeg',
      'images/cuenco-utilitario-sonso-3.jpeg',
      'images/cuenco-utilitario-sonso-4.jpeg',
      'images/cuenco-utilitario-sonso-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-24.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA · morfología Yotoco ─────────────────────────
  {
    id: 'cuenco-miniatura-pedestal',
    nombre: 'Cuenco Miniatura sobre Pedestal',
    procedencia: 'Valle del Cauca, Colombia · Período prehispánico (morfología Yotoco)',
    descripcion: 'Cuenco miniatura carenado de pasta fina con engobe rojo uniforme y morfología afín al estilo Yotoco. Ausencia de decoración incisa compleja. Función votiva o simbólica en ajuares funerarios. Estado completo con adherencias terrosas leves.',
    metadata: 'Material: Cerámica · Cultura: Calima (morfología Yotoco) · Período: prehispánico · Dimensiones: Alt. 2.2 cm · ⌀ 10.5 cm · Técnica: pasta fina, desgrasante cuarzo fino, cocción oxidante con ligera reducción · Acabado: engobe rojo Munsell 10R 4/6 · Estado: Completo',
    color: 0xa03010, roughness: 0.85, metalness: 0.02,
    imagenes: [
      'images/cuenco-miniatura-pedestal-1.jpeg',
      'images/cuenco-miniatura-pedestal-2.jpeg',
      'images/cuenco-miniatura-pedestal-3.jpeg',
      'images/cuenco-miniatura-pedestal-4.jpeg',
      'images/cuenco-miniatura-pedestal-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-25.glb',
    restY: 1.19
  },

  // ── SALA 3 · PIEZAS 26–30 ────────────────────────────────────────

  // ── OLLA GLOBULAR · Calima Ilama ─────────────────────────────────
  {
    id: 'olla-globular-ilama',
    nombre: 'Olla Cerámica Globular Pequeña',
    procedencia: 'Calima Ilama, Valle del Cauca · Período Ilama (1500 a.C. – 100 a.C.)',
    descripcion: 'Olla globular con cuello corto evertido y engobe rojo parcial. Pasta semigruesa con desgrasante de cuarzo y tiesto molido. Cocción oxidante con ligeras reducciones locales. Función utilitaria doméstica del período Ilama en la cordillera Occidental. Pieza completa.',
    metadata: 'Material: Cerámica · Cultura: Calima Ilama · Período: 1500 a.C.–100 a.C. · Dimensiones: Alt. 15.6 cm · ⌀ 18.8 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto molido, cocción oxidante · Acabado: alisado burdo / engobe rojo parcial Munsell 10R 5/6 · Estado: Completa',
    color: 0xa82010, roughness: 0.89, metalness: 0.01,
    imagenes: [
      'images/olla-globular-ilama-1.jpeg',
      'images/olla-globular-ilama-2.jpeg',
      'images/olla-globular-ilama-3.jpeg',
      'images/olla-globular-ilama-4.jpeg',
      'images/olla-globular-ilama-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-26.glb',
    restY: 1.15
  },

  // ── VASIJA MINIATURA · Calima Sonso ──────────────────────────────
  {
    id: 'vasija-miniatura-calima',
    nombre: 'Vasija Miniatura Globular Cerámica',
    procedencia: 'Posiblemente Calima Sonso, Valle del Cauca · Período Tardío (1200 d.C. – 1600 d.C.)',
    descripcion: 'Vasija miniatura globular con cuello corto y borde evertido. Pasta mediana con inclusiones de cuarzo y partículas micáceas. Acabado rústico sin decoración plástica compleja. Probable función doméstica o funeraria. Completa con fisura leve en el borde.',
    metadata: 'Material: Cerámica · Cultura: Posiblemente Calima Sonso · Período: Tardío 1200–1600 d.C. · Dimensiones: Alt. 8.1 cm · ⌀ 11.3 cm · Técnica: pasta mediana, desgrasante cuarzo y mica, cocción oxidante incompleta · Acabado: alisado rústico Munsell 5YR 5/4 · Estado: Completa con fisura leve',
    color: 0x8c3a18, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/vasija-miniatura-calima-1.jpeg',
      'images/vasija-miniatura-calima-2.jpeg',
      'images/vasija-miniatura-calima-3.jpeg',
      'images/vasija-miniatura-calima-4.jpeg',
      'images/vasija-miniatura-calima-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-27.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASA · Calima Yotoco ──────────────────────
  {
    id: 'vasija-globular-yotoco-28',
    nombre: 'Vasija Cerámica Globular con Asa',
    procedencia: 'Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija globular con cuello corto y asa vertical de cinta que conecta cuello y hombro. Pasta semifina con engobe rojo. Manchas de manganeso y meteorización típicas de contextos arqueológicos. Fragmento diagnóstico con fracturas antiguas en el borde superior.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 20.3 cm · ⌀ 21 cm · Técnica: pasta semifina, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Fragmento diagnóstico con fracturas en borde',
    color: 0xa03010, roughness: 0.87, metalness: 0.02,
    imagenes: [
      'images/vasija-globular-yotoco-28-1.jpeg',
      'images/vasija-globular-yotoco-28-2.jpeg',
      'images/vasija-globular-yotoco-28-3.jpeg',
      'images/vasija-globular-yotoco-28-4.jpeg',
      'images/vasija-globular-yotoco-28-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-28.glb',
    restY: 1.22
  },

  // ── VASIJA GLOBULAR CON ASA LATERAL · Indeterminada ──────────────
  {
    id: 'vasija-globular-indeterminada',
    nombre: 'Vasija Cerámica Globular con Asa Lateral',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Gran vasija globular con asa lateral y apéndices. Pasta mediana con desgrasante de cuarzo. Acabado tosco con superficie erosionada por tafonía prolongada. La morfología sugiere función utilitaria de almacenamiento o vertido. Completa con desgaste superficial significativo.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: No determinado · Dimensiones: Alt. 28.7 cm · ⌀ 27 cm · Técnica: pasta mediana a gruesa, desgrasante cuarzo y arena, cocción parcialmente oxidante · Acabado: alisado tosco Munsell 10R 5/4 · Estado: Completa con desgaste superficial',
    color: 0x7a3012, roughness: 0.93, metalness: 0.01,
    previewImg: 'images/vasija-globular-indeterminada-5.jpeg',
    imagenes: [
      'images/vasija-globular-indeterminada-1.jpeg',
      'images/vasija-globular-indeterminada-2.jpeg',
      'images/vasija-globular-indeterminada-3.jpeg',
      'images/vasija-globular-indeterminada-4.jpeg',
      'images/vasija-globular-indeterminada-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-29.glb',
    restY: 1.32
  },

  // ── VASIJA GLOBULAR UTILITARIA · Calima Sonso ────────────────────
  {
    id: 'vasija-globular-calima-30',
    nombre: 'Vasija Cerámica Globular Utilitaria',
    procedencia: 'Posiblemente Calima Sonso, Valle del Cauca · Período Tardío (1200 d.C. – 1600 d.C.)',
    descripcion: 'Vasija globular utilitaria con cuello corto y borde evertido. Pasta semigruesa con manchas de reducción en la cocción. Alisado rústico sin decoración plástica, característico de la alfarería doméstica tardía del suroccidente colombiano. Completa con fractura menor en el borde.',
    metadata: 'Material: Cerámica · Cultura: Posiblemente Calima Sonso · Período: Tardío 1200–1600 d.C. · Dimensiones: Alt. 12.7 cm · ⌀ 18.5 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante con manchas reductoras · Acabado: alisado rústico Munsell 10R 4/6 · Estado: Completa con fractura menor',
    color: 0x953515, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-calima-30-1.jpeg',
      'images/vasija-globular-calima-30-2.jpeg',
      'images/vasija-globular-calima-30-3.jpeg',
      'images/vasija-globular-calima-30-4.jpeg',
      'images/vasija-globular-calima-30-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-30.glb',
    restY: 1.05
  },

  // ── SALA 4 · PIEZAS 31–40 ────────────────────────────────────────

  // ── VASIJA GLOBULAR DOMÉSTICA · Calima Sonso ─────────────────────
  {
    id: 'vasija-uso-sonso-31',
    nombre: 'Vasija Globular de Uso Doméstico',
    procedencia: 'Cultura Calima Sonso, Valle del Cauca · Período Tardío (1200 d.C. – 1600 d.C.)',
    descripcion: 'Vasija globular de almacenamiento con cuello corto y borde evertido, atribuible tipológicamente al período Sonso del Valle del Cauca. Pasta semigruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante con núcleos reducidos. Acabado alisado tosco sin decoración plástica elaborada, característico de la alfarería utilitaria tardía del suroccidente colombiano. Estado completo con desgaste tafonómico superficial leve.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 16.0 × ⌀ 22.4 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado tosco Munsell 2.5YR 5/6 · Estado: Completo',
    color: 0xb84020, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/vasija-uso-sonso-31-1.jpeg',
      'images/vasija-uso-sonso-31-2.jpeg',
      'images/vasija-uso-sonso-31-3.jpeg',
      'images/vasija-uso-sonso-31-4.jpeg',
      'images/vasija-uso-sonso-31-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-31.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA CON ASA · Indeterminada ─────────────────────
  {
    id: 'cuenco-miniatura-asa-32',
    nombre: 'Cuenco Miniatura Cerámico con Asa Lateral',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Cuenco cerámico miniatura con cuerpo subglobular, base convexa y asa horizontal perforada. Pasta semigruesa con desgrasante visible y engobe rojo. Morfología compatible con tradiciones alfareras del Valle del Cauca. Pequeña mella en el borde. Estado de fragmento diagnóstico.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: Contemporáneo · Dimensiones: Alt. 10.2 × ⌀ 13.4 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Fragmento diagnóstico',
    color: 0x9a2a1a, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/cuenco-miniatura-asa-32-1.jpeg',
      'images/cuenco-miniatura-asa-32-2.jpeg',
      'images/cuenco-miniatura-asa-32-3.jpeg',
      'images/cuenco-miniatura-asa-32-4.jpeg',
      'images/cuenco-miniatura-asa-32-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-32.glb',
    restY: 1.19
  },

  // ── VASIJA CARENADA CON ASA · Calima Yotoco ──────────────────────
  {
    id: 'vasija-carenada-yotoco-33',
    nombre: 'Vasija Cerámica Carenada con Asa Horizontal',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · 100 a.C. – 1300 d.C.',
    descripcion: 'Vasija globular con marcada carenación en el ecuador del cuerpo y asa horizontal. Pasta fina y compacta con desgrasante de cuarzo fino, cocción oxidante. Engobe rojo característico del período Yotoco. Pátinas y depósitos de manganeso consistentes con entierro. Estado de fragmento diagnóstico con integridad estructural casi completa.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 21.0 × ⌀ 23.5 cm · Técnica: pasta fina compacta, desgrasante cuarzo fino, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Fragmento diagnóstico',
    color: 0x9a2a1a, roughness: 0.89, metalness: 0.02,
    imagenes: [
      'images/vasija-carenada-yotoco-33-1.jpeg',
      'images/vasija-carenada-yotoco-33-2.jpeg',
      'images/vasija-carenada-yotoco-33-3.jpeg',
      'images/vasija-carenada-yotoco-33-4.jpeg',
      'images/vasija-carenada-yotoco-33-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-33.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASAS LATERALES · Calima Yotoco ───────────
  {
    id: 'vasija-globular-yotoco-34',
    nombre: 'Vasija Cerámica Globular con Asas Laterales',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · 100 a.C. – 1300 d.C.',
    descripcion: 'Vasija subglobular de uso utilitario con cuello corto evertido y dos asas laterales simétricas. Pasta semigruesa con desgrasante mineral y cocción predominantemente oxidante con ligeras marcas reductoras. Acabado alisado tosco sin decoración elaborada. Completa con desgaste superficial propio del enterramiento.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 21.1 × ⌀ 18.1 cm · Técnica: pasta semigruesa, desgrasante cuarzo y arena, cocción oxidante · Acabado: alisado tosco Munsell 10R 5/8 · Estado: Completo',
    color: 0xc03820, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-yotoco-34-1.jpeg',
      'images/vasija-globular-yotoco-34-2.jpeg',
      'images/vasija-globular-yotoco-34-3.jpeg',
      'images/vasija-globular-yotoco-34-4.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-34.glb',
    restY: 1.19
  },

  // ── CUENCO HEMISFÉRICO · Calima Sonso ────────────────────────────
  {
    id: 'cuenco-hemisf-sonso-35',
    nombre: 'Cuenco Cerámico Hemisférico',
    procedencia: 'Cultura Calima Sonso, Valle del Cauca · Período Tardío (1200 d.C. – 1600 d.C.)',
    descripcion: 'Cuenco hemisférico de uso doméstico con cuerpo globular, base convexa y borde directo sin cuello. Pasta mediana con desgrasante de cuarzo, cocción predominantemente oxidante. Acabado alisado básico sin elementos decorativos plásticos ni pinturas, coherente con la funcionalidad utilitaria cotidiana. Completo con desgaste tafonómico moderado.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 8.8 × ⌀ 16.0 cm · Técnica: pasta mediana, desgrasante cuarzo, cocción oxidante · Acabado: alisado Munsell 2.5YR 5/6 · Estado: Completo',
    color: 0xb84020, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/cuenco-hemisf-sonso-35-1.jpeg',
      'images/cuenco-hemisf-sonso-35-2.jpeg',
      'images/cuenco-hemisf-sonso-35-3.jpeg',
      'images/cuenco-hemisf-sonso-35-4.jpeg',
      'images/cuenco-hemisf-sonso-35-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-35.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA · Tierradentro ──────────────────────────────
  {
    id: 'cuenco-miniatura-tierradentro-36',
    nombre: 'Cuenco Miniatura Cerámico',
    procedencia: 'Cultura Tierradentro, Cauca · 150 d.C. – 900 d.C.',
    descripcion: 'Cuenco miniatura completo con cuerpo subglobular, base convexa y acabado alisado rústico sin decoración incisa compleja. Pasta semigruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante con ligeras reducciones. Probable uso en actividades rituales o domésticas. Estado completo con desgaste moderado.',
    metadata: 'Material: Cerámica · Cultura: Tierradentro · Período: 150 d.C.–900 d.C. · Dimensiones: Alt. 5.8 × ⌀ 11.5 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado rústico Munsell 10R 5/6 · Estado: Completo',
    color: 0xb04020, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/cuenco-miniatura-tierradentro-36-1.jpeg',
      'images/cuenco-miniatura-tierradentro-36-2.jpeg',
      'images/cuenco-miniatura-tierradentro-36-3.jpeg',
      'images/cuenco-miniatura-tierradentro-36-4.jpeg',
      'images/cuenco-miniatura-tierradentro-36-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-36.glb',
    restY: 1.19
  },

  // ── COPA EN PEDESTAL · Calima Malagana (37) ──────────────────────
  {
    id: 'copa-pedestal-malagana-37',
    nombre: 'Copa Cerámica en Pedestal',
    procedencia: 'Cultura Calima Malagana, Valle del Cauca · 200 a.C. – 400 d.C.',
    descripcion: 'Copa en pedestal de paredes simples sin decoración incisa, marcador diagnóstico del período Malagana en el Valle Bajo del Cauca. Cuerpo globular sobre pedestal troncocónico con engobe rojo característico. Desgaste superficial moderado y fractura antigua en el borde sin intervenciones modernas. Se alinea con ajuares cerámicos de contextos funerarios de Palmira y El Bolo.',
    metadata: 'Material: Cerámica · Cultura: Calima Malagana · Período: 200 a.C.–400 d.C. · Dimensiones: Alt. 9.8 × ⌀ 16.3 cm · Técnica: pasta semi-fina, desgrasante cuarzo fino, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Fragmento diagnóstico',
    color: 0xa03010, roughness: 0.88, metalness: 0.02,
    imagenes: [
      'images/copa-pedestal-malagana-37-1.jpeg',
      'images/copa-pedestal-malagana-37-2.jpeg',
      'images/copa-pedestal-malagana-37-3.jpeg',
      'images/copa-pedestal-malagana-37-4.jpeg',
      'images/copa-pedestal-malagana-37-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-37.glb',
    restY: 1.19
  },

  // ── VASIJA TRÍPODE CON ASA · Calima ──────────────────────────────
  {
    id: 'vasija-tripode-calima-38',
    nombre: 'Vasija Cerámica Globular Trípode con Asa',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Prehispánico',
    descripcion: 'Vasija cerámica de uso doméstico con cuerpo globular, cuello corto evertido, asa lateral y soportes basales. Pasta gruesa con desgrasante mineral visible, cocción oxidante con núcleos oscuros. Acabado alisado tosco con concreciones de óxido y manchas por entierro en suelo arcilloso. Estado de fragmento diagnóstico con fracturas antiguas en el borde superior.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Prehispánico · Dimensiones: Alt. 13.7 × ⌀ 17.2 cm · Técnica: pasta gruesa, desgrasante mineral, cocción oxidante con núcleos oscuros · Acabado: alisado tosco Munsell 10R 5/6 · Estado: Fragmento diagnóstico',
    color: 0xb04020, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/vasija-tripode-calima-38-1.jpeg',
      'images/vasija-tripode-calima-38-2.jpeg',
      'images/vasija-tripode-calima-38-3.jpeg',
      'images/vasija-tripode-calima-38-4.jpeg',
      'images/vasija-tripode-calima-38-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-38.glb',
    restY: 1.19
  },

  // ── VASIJA CON APLIQUES NODULARES · Contemporánea ────────────────
  {
    id: 'vasija-apliques-sonso-39',
    nombre: 'Vasija Cerámica Globular con Apliques',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Vasija cerámica globular con apliques nodulares geométricos digitados en la zona del hombro. Pasta gruesa con desgrasante de cuarzo y tiesto molido, cocción reductora. Cuerpo globular con borde directo, labio redondeado y huellas de manufactura tradicional. Acabado alisado rústico. Estado de fragmento diagnóstico con desgastes tafonómicos superficiales.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: Contemporáneo · Dimensiones: Alt. 12.5 × ⌀ 22.9 cm · Técnica: pasta gruesa, desgrasante cuarzo y tiesto, cocción reductora · Acabado: alisado rústico Munsell 5YR 4/3 · Estado: Fragmento diagnóstico',
    color: 0x8a6040, roughness: 0.93, metalness: 0.01,
    imagenes: [
      'images/vasija-apliques-sonso-39-1.jpeg',
      'images/vasija-apliques-sonso-39-2.jpeg',
      'images/vasija-apliques-sonso-39-3.jpeg',
      'images/vasija-apliques-sonso-39-4.jpeg',
      'images/vasija-apliques-sonso-39-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-39.glb',
    restY: 1.19
  },

  // ── VASIJA CON INCISIONES GEOMÉTRICAS · Calima Sonso ─────────────
  {
    id: 'vasija-incisa-sonso-40',
    nombre: 'Vasija Globular con Incisiones Geométricas',
    procedencia: 'Cultura Calima Sonso, Valle del Cauca · Período Tardío (1200 d.C. – 1600 d.C.)',
    descripcion: 'Vasija globular con incisiones geométricas finas en bandas diagonales paralelas sobre el hombro, diagnóstico del período Sonso. Cuerpo globular con ligera carenación, cuello corto evertido. Pasta semigruesa con desgrasante de cuarzo y tiesto, cocción reductora con núcleo negro. Evidencia de exposición al fuego en la parte inferior, sugiriendo uso culinario. Estado completo con desgaste superficial.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 17.9 × ⌀ 26.6 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción reductora · Acabado: alisado rústico Munsell 10YR 5/4 · Estado: Completo con desgaste superficial',
    color: 0x9a7848, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/vasija-incisa-sonso-40-1.jpeg',
      'images/vasija-incisa-sonso-40-2.jpeg',
      'images/vasija-incisa-sonso-40-3.jpeg',
      'images/vasija-incisa-sonso-40-4.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-40.glb',
    restY: 1.19
  },

  // ── SALA 5 · PIEZAS 41–50 ────────────────────────────────────────

  // ── VASIJA CARENADA CON VERTEDERA · Calima Yotoco ────────────────
  {
    id: 'vasija-carenada-vertedera-41',
    nombre: 'Vasija Cerámica Carenada con Vertedera Lateral',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija subglobular carenada con cuello cónico y apéndice tubular lateral que funcionó como vertedera o asa-puente simplificada. Pasta fina y compacta con desgrasante de cuarzo fino, cocción oxidante con reducciones locales y engobe rojo bícromo. Análisis tipológico consistent con los patrones documentados en las estribaciones de la Cordillera Occidental del Valle del Cauca. Fractura prehispánica en borde superior; pátinas de meteorización auténticas.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 22.0 × ⌀ 18.9 cm · Técnica: pasta fina compacta, desgrasante cuarzo fino, cocción oxidante · Acabado: alisado / bruñido parcial / engobe rojo Munsell 10R 4/6 · Estado: Fragmento diagnóstico',
    color: 0xa03010, roughness: 0.87, metalness: 0.02,
    imagenes: [
      'images/vasija-carenada-vertedera-41-1.jpeg',
      'images/vasija-carenada-vertedera-41-2.jpeg',
      'images/vasija-carenada-vertedera-41-3.jpeg',
      'images/vasija-carenada-vertedera-41-4.jpeg',
      'images/vasija-carenada-vertedera-41-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-41.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA CON ASA PERFORADA · No arqueológica ─────────
  {
    id: 'cuenco-mini-asa-perf-42',
    nombre: 'Cuenco Miniatura Cerámico con Asa Lateral Perforada',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Cuenco miniatura completo de cuerpo hemisférico, base convexa y asa lateral perforada. Pasta semigruesa con desgrasante visible, cocción oxidante. Acabado alisado básico con rastros de quema en la concavidad interior, sugiriendo exposición al fuego o contacto con residuos orgánicos. Estado de conservación bueno con ligeras alteraciones tafonómicas superficiales.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: No prehispánico / Contemporáneo · Dimensiones: Alt. 3.7 × ⌀ 10.6 cm · Técnica: pasta semigruesa, desgrasante cuarzo y arena fina, cocción oxidante · Acabado: alisado tosco Munsell 2.5YR 5/6 · Estado: Completo',
    color: 0xb84020, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/cuenco-mini-asa-perf-42-1.jpeg',
      'images/cuenco-mini-asa-perf-42-2.jpeg',
      'images/cuenco-mini-asa-perf-42-3.jpeg',
      'images/cuenco-mini-asa-perf-42-4.jpeg',
      'images/cuenco-mini-asa-perf-42-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-42.glb',
    restY: 1.19
  },

  // ── CUENCO SUBGLOBULAR · Calima Sonso ────────────────────────────
  {
    id: 'cuenco-subglobular-sonso-43',
    nombre: 'Cuenco Subglobular Cerámico',
    procedencia: 'Cultura Calima — Período Sonso, Valle del Cauca · 1200 d.C. – 1600 d.C.',
    descripcion: 'Cuenco cerámico subglobular de manufactura prehispánica atribuible al período Sonso. Cuerpo globular con base convexa y borde directo sin cuello. Pasta media a gruesa con desgrasante de cuarzo y tiesto molido, cocción oxidante con ligeras reducciones locales. Acabado alisado sin motivos decorativos complejos, característico de la alfarería utilitaria tardía del Valle del Cauca. Estado completo, sin fracturas mayores.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 8.7 × ⌀ 17.5 cm · Técnica: pasta media a gruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado superficial Munsell 10R 5/6 · Estado: Completo',
    color: 0xb04020, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/cuenco-subglobular-sonso-43-1.jpeg',
      'images/cuenco-subglobular-sonso-43-2.jpeg',
      'images/cuenco-subglobular-sonso-43-3.jpeg',
      'images/cuenco-subglobular-sonso-43-4.jpeg',
      'images/cuenco-subglobular-sonso-43-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-43.glb',
    restY: 1.19
  },

  // ── VASIJA MINIATURA GLOBULAR · Contemporánea ────────────────────
  {
    id: 'vasija-mini-globular-44',
    nombre: 'Vasija Miniatura Globular',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Vasija cerámica miniatura de cuerpo globular con borde evertido, superficies alisadas con restos de engobe rojo y manchas tafonómicas. Pasta semi-fina a gruesa con desgrasante de cuarzo y tiesto, cocción oxidante con núcleo visible. Morfología completa en buen estado de conservación general, mostrando el formato utilitario reducido característico de tradiciones alfareras del suroccidente colombiano.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: Contemporáneo · Dimensiones: Alt. 11.0 × ⌀ 12.3 cm · Técnica: pasta semi-fina a gruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Completo',
    color: 0xa03010, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-mini-globular-44-1.jpeg',
      'images/vasija-mini-globular-44-2.jpeg',
      'images/vasija-mini-globular-44-3.jpeg',
      'images/vasija-mini-globular-44-4.jpeg',
      'images/vasija-mini-globular-44-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-44.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA · Calima, Prehispánico ──────────────────────
  {
    id: 'cuenco-mini-calima-45',
    nombre: 'Cuenco Miniatura Cerámico',
    procedencia: 'Cultura Calima, Valle del Cauca · Período Prehispánico',
    descripcion: 'Cuenco cerámico miniatura de morfología subglobular con base convexa, característica de los contextos prehispánicos del suroccidente colombiano asociados a tradiciones alfareras del área Calima. Pasta oxidada de color rojizo con desgrasante fino de cuarzo visible. Desgaste superficial moderado y fisuras estructurales propias del enterramiento prolongado. Integridad morfológica completa con filiación probable al período Yotoco o contextos domésticos asociados.',
    metadata: 'Material: Cerámica · Cultura: Calima · Período: Prehispánico · Dimensiones: Alt. 4.7 × ⌀ 10.4 cm · Técnica: pasta fina a semifina, desgrasante cuarzo molido fino, cocción oxidante · Acabado: alisado externo e interno Munsell 10R 5/8 · Estado: Completo con fisuras menores estabilizadas',
    color: 0xc04020, roughness: 0.89, metalness: 0.02,
    imagenes: [
      'images/cuenco-mini-calima-45-1.jpeg',
      'images/cuenco-mini-calima-45-2.jpeg',
      'images/cuenco-mini-calima-45-3.jpeg',
      'images/cuenco-mini-calima-45-4.jpeg',
      'images/cuenco-mini-calima-45-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-45.glb',
    restY: 1.19
  },

  // ── COPA PEDESTAL FRAGMENTARIA · Calima Yotoco ───────────────────
  {
    id: 'copa-pedestal-frag-yotoco-46',
    nombre: 'Copa Pedestal Fragmentaria',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Fragmento diagnóstico de copa con pedestal anular, típico del período Yotoco de la cultura Calima. Cuenco cóncavo abierto sobre pedestal troncocónico con líneas verticales modeladas en el tallo. Pasta cerámica fina a semi-fina con núcleo negro por cocción incompleta en atmósfera mixta. Fracturas antiguas en el borde y desgaste por meteorización edáfica. Tipología alineada con los patrones cerámicos de las estribaciones de la Cordillera Occidental del Valle del Cauca.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 15.2 × ⌀ 13.4 cm · Técnica: pasta fina a semi-fina, desgrasante cuarzo y arena fina, núcleo negro cocción mixta · Acabado: alisado / engobe rojo-naranja Munsell 10R 5/8 · Estado: Fragmento diagnóstico',
    color: 0xc04020, roughness: 0.88, metalness: 0.02,
    imagenes: [
      'images/copa-pedestal-frag-yotoco-46-1.jpeg',
      'images/copa-pedestal-frag-yotoco-46-2.jpeg',
      'images/copa-pedestal-frag-yotoco-46-3.jpeg',
      'images/copa-pedestal-frag-yotoco-46-4.jpeg',
      'images/copa-pedestal-frag-yotoco-46-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-46.glb',
    restY: 1.19
  },

  // ── VASIJA GLOBULAR CON ASAS HORIZONTALES · Calima Sonso ─────────
  {
    id: 'vasija-globular-asas-sonso-47',
    nombre: 'Vasija Globular con Asas Horizontales',
    procedencia: 'Cultura Calima — Período Sonso, Valle del Cauca · 1200 d.C. – 1600 d.C.',
    descripcion: 'Vasija cerámica globular de manufactura prehispánica tardía con cuerpo globular acentuado, base convexa y dos asas horizontales opuestas para facilitar el cargue o suspensión. Cuello corto con borde evertido, actualmente fragmentado en su sección superior. Pasta de textura media a gruesa con desgrasantes gruesos y cocción oxidante irregular. Desgaste superficial moderado por enterramiento y erosión tafonómica.',
    metadata: 'Material: Cerámica · Cultura: Calima Sonso · Período: 1200 d.C.–1600 d.C. · Dimensiones: Alt. 32.0 × ⌀ 27.7 cm · Técnica: pasta media a gruesa, desgrasante cuarzo y tiesto molido, cocción oxidante · Acabado: alisado tosco Munsell 10R 5/8 · Estado: Fragmento diagnóstico (falta borde superior)',
    color: 0xc04020, roughness: 0.92, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-asas-sonso-47-1.jpeg',
      'images/vasija-globular-asas-sonso-47-2.jpeg',
      'images/vasija-globular-asas-sonso-47-3.jpeg',
      'images/vasija-globular-asas-sonso-47-4.jpeg',
      'images/vasija-globular-asas-sonso-47-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-47.glb',
    restY: 1.32
  },

  // ── VASIJA GLOBULAR DE CUELLO CORTO · Calima Yotoco ──────────────
  {
    id: 'vasija-globular-cuello-yotoco-48',
    nombre: 'Vasija Globular de Cuello Corto',
    procedencia: 'Cultura Calima Yotoco, Valle del Cauca · Período Yotoco (100 a.C. – 1300 d.C.)',
    descripcion: 'Vasija cerámica globular utilitaria con cuerpo globular simétrico, base convexa y cuello corto evertido. Pasta mediana con desgrasante de cuarzo, cocción oxidante con núcleo parcialmente reducido. Manchas de hollín en el cuerpo exterior y depósitos minerales por entierro prolongado. Fractura antigua en el borde superior. Estado general bueno a pesar de las alteraciones tafonómicas.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco · Período: 100 a.C.–1300 d.C. · Dimensiones: Alt. 18.1 × ⌀ 22.3 cm · Técnica: pasta mediana, desgrasante cuarzo, cocción oxidante con núcleo reducido · Acabado: alisado tosco Munsell 10R 5/8 · Estado: Fragmento diagnóstico / fractura en borde',
    color: 0xc04020, roughness: 0.90, metalness: 0.01,
    imagenes: [
      'images/vasija-globular-cuello-yotoco-48-1.jpeg',
      'images/vasija-globular-cuello-yotoco-48-2.jpeg',
      'images/vasija-globular-cuello-yotoco-48-3.jpeg',
      'images/vasija-globular-cuello-yotoco-48-4.jpeg',
      'images/vasija-globular-cuello-yotoco-48-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-48.glb',
    restY: 1.19
  },

  // ── CUENCO MINIATURA GLOBULAR · Calima Yotoco ────────────────────
  {
    id: 'cuenco-mini-yotoco-49',
    nombre: 'Cuenco Miniatura de Cuerpo Globular',
    procedencia: 'Cultura Calima Yotoco / Tradición local, Valle del Cauca · Período prehispánico tardío',
    descripcion: 'Cuenco cerámico miniatura de morfología globular, típico de contextos cotidianos y domésticos del suroccidente colombiano con afiliación probable al período Sonso de la tradición Calima. Pasta oxidante de textura algo burda con desgrasantes minerales visibles, acabado alisado sencillo con tonalidades rojizas. Ligeras huellas de desgaste superficial y erosión por enterramiento. Fractura leve en el borde, integridad estructural básica conservada.',
    metadata: 'Material: Cerámica · Cultura: Calima Yotoco / Tradición local · Período: Prehispánico tardío · Dimensiones: Alt. 4.7 × ⌀ 8.4 cm · Técnica: pasta semigruesa, desgrasante cuarzo y tiesto, cocción oxidante · Acabado: alisado básico Munsell 10R 5/6 · Estado: Completo con fractura menor en borde',
    color: 0xb04020, roughness: 0.91, metalness: 0.01,
    imagenes: [
      'images/cuenco-mini-yotoco-49-1.jpeg',
      'images/cuenco-mini-yotoco-49-2.jpeg',
      'images/cuenco-mini-yotoco-49-3.jpeg',
      'images/cuenco-mini-yotoco-49-4.jpeg',
      'images/cuenco-mini-yotoco-49-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-49.glb',
    restY: 1.19
  },

  // ── COPA EN PEDESTAL DE PAREDES SIMPLES · Contemporánea ──────────
  {
    id: 'copa-pedestal-moderna-50',
    nombre: 'Copa en Pedestal de Paredes Simples',
    procedencia: 'Valle del Cauca, Colombia · Cultura y período indeterminados',
    descripcion: 'Copa cerámica sobre pedestal de paredes simples, sin decoración incisa en el cuerpo del cuenco, morfología característica del complejo Malagana en la llanura aluvial del Valle del Cauca. Engobe rojo con cocción oxidante y manchas de reducción secundaria. Estado de conservación excelente con integridad estructural completa. Leves desgastes tafonómicos superficiales y depósitos minerales propios de contexto de inhumación.',
    metadata: 'Material: Cerámica · Cultura: Indeterminada · Período: Contemporáneo / Moderno · Dimensiones: Alt. 8.1 × ⌀ 12.4 cm · Técnica: pasta fina compacta, desgrasante cuarzo moderado, cocción oxidante · Acabado: alisado / engobe rojo Munsell 10R 4/6 · Estado: Completo',
    color: 0xa03010, roughness: 0.88, metalness: 0.02,
    imagenes: [
      'images/copa-pedestal-moderna-50-1.jpeg',
      'images/copa-pedestal-moderna-50-2.jpeg',
      'images/copa-pedestal-moderna-50-3.jpeg',
      'images/copa-pedestal-moderna-50-4.jpeg',
      'images/copa-pedestal-moderna-50-5.jpeg'
    ],
    video: null,
    modelUrl: 'models/pieza-50.glb',
    restY: 1.19
  }

];

export function getPieceById(id) {
  return PIECES.find(function(p) { return p.id === id; }) || null;
}

// ── Procedural fallback (se muestra si el GLB aún no cargó) ──────────
function makeMat(piece) {
  return new THREE.MeshStandardMaterial({
    color: piece.color,
    roughness: piece.roughness,
    metalness: piece.metalness
  });
}

function buildVolante(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  var drk = new THREE.MeshStandardMaterial({ color: 0x4a2a10, roughness: 0.95 });
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.13, 18), mat));
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.18, 12), drk));
  [0.18, 0.28, 0.38].forEach(function(r) {
    var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.009, 5, 18), drk);
    ring.rotation.x = Math.PI / 2;
    g.add(ring);
  });
  for (var i = 0; i < 8; i++) {
    var a   = (i / 8) * Math.PI * 2;
    var dot = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 5), drk);
    dot.position.set(Math.cos(a) * 0.33, 0.07, Math.sin(a) * 0.33);
    g.add(dot);
  }
  return g;
}

function buildCuenco(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  var pts = [];
  for (var i = 0; i <= 14; i++) {
    var a = (i / 14) * Math.PI * 0.65;
    pts.push(new THREE.Vector2(Math.sin(a) * 0.48, -Math.cos(a) * 0.32 + 0.08));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 14), mat));
  return g;
}

function buildJarron(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  var pts = [
    new THREE.Vector2(0,    -0.55),
    new THREE.Vector2(0.08, -0.52),
    new THREE.Vector2(0.42, -0.30),
    new THREE.Vector2(0.48,  0.00),
    new THREE.Vector2(0.42,  0.28),
    new THREE.Vector2(0.22,  0.38),
    new THREE.Vector2(0.14,  0.44),
    new THREE.Vector2(0.13,  0.58),
    new THREE.Vector2(0.16,  0.62),
    new THREE.Vector2(0.16,  0.70)
  ];
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 14), mat));
  return g;
}

function buildCopa(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  // Bowl
  var bowlPts = [];
  for (var i = 0; i <= 12; i++) {
    var a = (i / 12) * Math.PI * 0.68;
    bowlPts.push(new THREE.Vector2(Math.sin(a) * 0.46, -Math.cos(a) * 0.34 + 0.22));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(bowlPts, 14), mat));
  // Pedestal stem
  var stemPts = [
    new THREE.Vector2(0.08, -0.32),
    new THREE.Vector2(0.10, -0.20),
    new THREE.Vector2(0.07, -0.10),
    new THREE.Vector2(0.07,  0.00)
  ];
  g.add(new THREE.Mesh(new THREE.LatheGeometry(stemPts, 10), mat));
  // Base disc
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.22, 0.055, 14), mat));
  return g;
}

function buildCuencoAsas(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  var pts = [];
  for (var i = 0; i <= 14; i++) {
    var a = (i / 14) * Math.PI * 0.88;
    pts.push(new THREE.Vector2(Math.sin(a) * 0.52, -Math.cos(a) * 0.44 + 0.04));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 14), mat));
  [-1, 1].forEach(function(side) {
    var h = new THREE.Mesh(new THREE.TorusGeometry(0.10, 0.032, 5, 10), mat);
    h.position.set(side * 0.56, 0.06, 0);
    h.rotation.y = Math.PI / 2;
    g.add(h);
  });
  return g;
}

function buildCarenado(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  // Lower body: wide globular base up to carena
  var lower = [];
  for (var i = 0; i <= 10; i++) {
    var a = (i / 10) * Math.PI * 0.58;
    lower.push(new THREE.Vector2(Math.sin(a) * 0.56, -Math.cos(a) * 0.38 - 0.04));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(lower, 14), mat));
  // Upper body: narrows toward neck
  var upper = [
    new THREE.Vector2(0.56,  0.18),
    new THREE.Vector2(0.48,  0.30),
    new THREE.Vector2(0.28,  0.38),
    new THREE.Vector2(0.18,  0.42),
    new THREE.Vector2(0.16,  0.46),
    new THREE.Vector2(0.20,  0.52)
  ];
  g.add(new THREE.Mesh(new THREE.LatheGeometry(upper, 14), mat));
  return g;
}

function buildFigura(piece) {
  var g   = new THREE.Group();
  var mat = makeMat(piece);
  var tPts = [];
  for (var i = 0; i <= 10; i++) {
    var a = (i / 10) * Math.PI * 0.85;
    tPts.push(new THREE.Vector2(Math.sin(a) * 0.32, -Math.cos(a) * 0.38 + 0.04));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(tPts, 14), mat));
  var head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 10), mat);
  head.position.y = 0.52;
  g.add(head);
  var tocado = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.30, 14), mat);
  tocado.position.y = 0.76;
  g.add(tocado);
  return g;
}

var BUILDERS = {
  'volante-de-uso':    buildVolante,
  'volante-de-huso-2': buildVolante,
  'cuenco-1':          buildCuenco,
  'jarron-1':          buildJarron,
  'jarron-3':          buildCuencoAsas,
  'cuenco-2':          buildCopa,
  'cuenco-carenado':   buildCarenado,
  'copa-1':            buildCopa,
  'cuenco-asas':       buildCuencoAsas,
  'figura-1':          buildFigura
};

export function buildArtifact(piece, scale) {
  scale = scale || 1;
  var fn = BUILDERS[piece.id];
  var mesh = fn
    ? fn(piece)
    : new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 14, 10),
        new THREE.MeshStandardMaterial({ color: piece.color, roughness: piece.roughness, metalness: piece.metalness })
      );
  mesh.scale.setScalar(scale);
  return mesh;
}
