import * as THREE from 'three';

const TEST_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const PIECES = [
  {
    id: 'mascara',
    nombre: 'Máscara Funeraria',
    procedencia: 'Malagana, Valle del Cauca · 200 a.C. – 200 d.C.',
    descripcion: 'Máscara de oro martillado con rasgos antropomorfos y tocado ceremonial. Utilizada en rituales funerarios de la élite Malagana para cubrir el rostro del difunto y facilitar su tránsito al mundo espiritual.',
    metadata: 'Material: Oro 22K · Dimensiones: 18 × 14 cm · Técnica: Martillado y repujado · Peso: 320 g',
    color: 0xd4af37, roughness: 0.22, metalness: 0.95,
    imagenes: [
      'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1422209/pexels-photo-1422209.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2435078/pexels-photo-2435078.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    video: TEST_VIDEO,
    restY: 1.62   // floats above platform
  },
  {
    id: 'collar',
    nombre: 'Collar de Cuentas Zoomorfas',
    procedencia: 'Región Calima-Malagana · 300 a.C. – 300 d.C.',
    descripcion: 'Collar de cuentas de oro y cuarzo con colgantes en forma de animales sagrados. Símbolo de estatus social y conexión espiritual con el mundo natural.',
    metadata: 'Material: Oro tumbaga y cuarzo · Longitud: 45 cm · Cuentas: 48 · Técnica: Fundición',
    color: 0xe8c030, roughness: 0.18, metalness: 0.92,
    imagenes: [
      'https://images.pexels.com/photos/33780/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5462561/pexels-photo-5462561.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    video: null,
    restY: 1.82   // floats - pendant needs clearance from platform top (1.19)
  },
  {
    id: 'poporo',
    nombre: 'Poporo Ceremonial',
    procedencia: 'Malagana, Palmira · 100 a.C. – 200 d.C.',
    descripcion: 'Recipiente para cal usado en el ritual del mambeo de coca. Decorado con figuras zoomorfas en bajo relieve. El poporo era símbolo de identidad cultural y rito de paso a la vida adulta masculina.',
    metadata: 'Material: Oro · Altura: 12 cm · Diámetro: 8 cm · Técnica: Cera perdida',
    color: 0xc8a020, roughness: 0.30, metalness: 0.90,
    imagenes: [
      'https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    video: null,
    restY: 1.62   // floats above platform
  },
  {
    id: 'vasija',
    nombre: 'Vasija Antropomorfa',
    procedencia: 'Cementerio Malagana · 200 a.C. – 100 d.C.',
    descripcion: 'Vasija de cerámica con representación humana esquemática. Usada como ofrenda funeraria para contener chicha sagrada durante los rituales de entierro.',
    metadata: 'Material: Cerámica · Altura: 22 cm · Diámetro: 15 cm · Técnica: Modelado a mano',
    color: 0x9b6b3c, roughness: 0.88, metalness: 0.04,
    imagenes: [
      'https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2435078/pexels-photo-2435078.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1422209/pexels-photo-1422209.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    video: null,
    restY: 1.62   // floats above platform
  }
];

export function getPieceById(id) {
  return PIECES.find(function(p) { return p.id === id; }) || null;
}

// ── Procedural 3D artifact builders ──────────────────────────────────
function makeMat(piece) {
  return new THREE.MeshStandardMaterial({
    color: piece.color,
    roughness: piece.roughness,
    metalness: piece.metalness
  });
}

function buildMask(piece) {
  var g = new THREE.Group();
  var m = makeMat(piece);
  var dark = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 1 });

  // Oval face disc
  var face = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.48, 0.09, 40), m);
  face.rotation.x = Math.PI / 2;
  g.add(face);

  // Front raised plate
  var front = new THREE.Mesh(new THREE.CylinderGeometry(0.50, 0.46, 0.07, 40), m);
  front.rotation.x = Math.PI / 2;
  front.position.z = 0.03;
  g.add(front);

  // Eyes
  [-0.19, 0.19].forEach(function(ex) {
    var eyeRim = new THREE.Mesh(new THREE.TorusGeometry(0.088, 0.020, 8, 24), m);
    eyeRim.scale.set(1, 0.45, 1);
    eyeRim.rotation.x = Math.PI / 2;
    eyeRim.position.set(ex, 0.08, 0.054);
    g.add(eyeRim);
    var eyeHole = new THREE.Mesh(new THREE.CircleGeometry(0.068, 18), dark);
    eyeHole.position.set(ex, 0.08, 0.058);
    g.add(eyeHole);
  });

  // Nose
  var nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.09), m);
  nose.position.set(0, -0.06, 0.06);
  g.add(nose);

  // Mouth slot
  var mouth = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.030, 0.05), dark);
  mouth.position.set(0, -0.28, 0.056);
  g.add(mouth);

  // Cheeks (decorative bumps)
  [-0.36, 0.36].forEach(function(ex) {
    var c = new THREE.Mesh(new THREE.SphereGeometry(0.072, 10, 8), m);
    c.scale.set(1, 0.55, 0.3);
    c.position.set(ex, -0.10, 0.04);
    g.add(c);
  });

  // Crown rod
  var rod = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.050, 0.40, 8), m);
  rod.position.y = 0.60;
  g.add(rod);
  var orb = new THREE.Mesh(new THREE.SphereGeometry(0.088, 12, 8), m);
  orb.position.y = 0.82;
  g.add(orb);

  // Crown wings
  [-0.29, 0.29].forEach(function(ex, i) {
    var wing = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.36, 0.04), m);
    wing.position.set(ex, 0.80, 0);
    wing.rotation.z = i === 0 ? 0.26 : -0.26;
    g.add(wing);
  });

  // Ear discs
  [-0.56, 0.56].forEach(function(ex) {
    var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.088, 0.038, 16), m);
    disc.rotation.x = Math.PI / 2;
    disc.position.set(ex, 0, 0.01);
    g.add(disc);
    var dangle = new THREE.Mesh(new THREE.SphereGeometry(0.050, 10, 8), m);
    dangle.position.set(ex, -0.16, 0);
    g.add(dangle);
  });

  return g;
}

function buildCollar(piece) {
  var g = new THREE.Group();
  var m = makeMat(piece);
  var quartz = new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.35, metalness: 0.05 });

  // Main ring
  g.add(new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.050, 12, 60), m));

  // Bead rows
  [[0.33, 14, false], [0.44, 18, true], [0.55, 22, false]].forEach(function(row) {
    var r = row[0], n = row[1], isQ = row[2];
    var bm = isQ ? quartz : new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.15, metalness: 0.95 });
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2;
      var bead = new THREE.Mesh(new THREE.SphereGeometry(0.036 + (isQ ? 0.006 : 0), 10, 8), bm);
      bead.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
      g.add(bead);
    }
  });

  // Jaguar pendant
  var pm = new THREE.MeshStandardMaterial({ color: piece.color, roughness: 0.18, metalness: 0.94 });
  var body = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), pm);
  body.scale.set(0.8, 1.5, 0.55);
  body.position.set(0, -0.76, 0);
  g.add(body);
  var head = new THREE.Mesh(new THREE.SphereGeometry(0.112, 12, 9), pm);
  head.position.set(0, -0.54, 0.04);
  g.add(head);
  var dark = new THREE.MeshStandardMaterial({ color: 0x060402, roughness: 1 });
  [-0.088, 0.088].forEach(function(ex) {
    var ear = new THREE.Mesh(new THREE.ConeGeometry(0.050, 0.096, 8), pm);
    ear.position.set(ex, -0.45, 0.04);
    g.add(ear);
    var eye = new THREE.Mesh(new THREE.SphereGeometry(0.022, 8, 6), dark);
    eye.position.set(ex, -0.52, 0.11);
    g.add(eye);
  });

  return g;
}

function buildPoporo(piece) {
  var g = new THREE.Group();
  var m = makeMat(piece);
  var band = new THREE.MeshStandardMaterial({ color: 0x7a5a10, roughness: 0.50, metalness: 0.65 });

  var pts = [
    [0, -0.58], [0.12, -0.52], [0.28, -0.38], [0.38, -0.18],
    [0.40, 0.02], [0.38, 0.20], [0.30, 0.36], [0.20, 0.46],
    [0.10, 0.52], [0.08, 0.58], [0.10, 0.64], [0.12, 0.72],
    [0.10, 0.78], [0.05, 0.82], [0.02, 0.84]
  ].map(function(v) { return new THREE.Vector2(v[0], v[1]); });
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 40), m));

  // Decorative bands
  [0.0, -0.22, 0.24].forEach(function(y) {
    var r = y === 0.0 ? 0.39 : (y < 0 ? 0.38 : 0.29);
    var b = new THREE.Mesh(new THREE.TorusGeometry(r, 0.022, 8, 40), band);
    b.position.y = y;
    g.add(b);
  });

  // Zoomorphic nubs
  [0, 90, 180, 270].forEach(function(deg) {
    var a = deg * Math.PI / 180;
    var nub = new THREE.Mesh(new THREE.SphereGeometry(0.050, 10, 8), m);
    nub.position.set(Math.cos(a) * 0.38, 0.0, Math.sin(a) * 0.38);
    g.add(nub);
    var hd = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 6), m);
    hd.position.set(Math.cos(a) * 0.42, 0.05, Math.sin(a) * 0.42);
    g.add(hd);
  });

  // Stick (palillo)
  var stick = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.016, 0.65, 8), band);
  stick.position.set(0.05, 1.14, 0.05);
  stick.rotation.z = 0.18;
  g.add(stick);

  return g;
}

function buildVasija(piece) {
  var g = new THREE.Group();
  var cm = new THREE.MeshStandardMaterial({ color: 0xa06840, roughness: 0.88, metalness: 0.02 });
  var dark = new THREE.MeshStandardMaterial({ color: 0x5a3218, roughness: 0.95 });
  var acc = new THREE.MeshStandardMaterial({ color: 0xc88840, roughness: 0.80, metalness: 0.04 });
  var dm = new THREE.MeshStandardMaterial({ color: 0x1a0800, roughness: 1 });

  var pts = [
    [0, -0.62], [0.14, -0.56], [0.28, -0.42], [0.40, -0.24],
    [0.44, -0.04], [0.42, 0.16], [0.36, 0.34], [0.26, 0.48],
    [0.18, 0.56], [0.14, 0.62], [0.16, 0.68], [0.20, 0.72],
    [0.20, 0.78], [0.16, 0.82], [0.06, 0.84]
  ].map(function(v) { return new THREE.Vector2(v[0], v[1]); });
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 40), cm));

  // Face
  var fd = new THREE.Mesh(new THREE.CircleGeometry(0.17, 20), dark);
  fd.position.set(0.43, 0.08, 0);
  fd.rotation.y = Math.PI / 2;
  g.add(fd);

  [-0.065, 0.065].forEach(function(ey) {
    var eye = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), dm);
    eye.position.set(0.46, 0.14 + ey, ey * 1.2);
    g.add(eye);
    var er = new THREE.Mesh(new THREE.TorusGeometry(0.032, 0.008, 6, 14), acc);
    er.position.set(0.46, 0.14 + ey, ey * 1.2);
    er.rotation.y = Math.PI / 2;
    g.add(er);
  });

  var nose = new THREE.Mesh(new THREE.SphereGeometry(0.040, 8, 6), acc);
  nose.scale.set(0.6, 0.6, 0.4);
  nose.position.set(0.465, 0.06, 0);
  g.add(nose);

  // Handles
  [-0.55, 0.55].forEach(function(ez) {
    var c = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.38, 0.0, ez < 0 ? -0.18 : 0.18),
      new THREE.Vector3(0.50, 0.12, ez < 0 ? -0.32 : 0.32),
      new THREE.Vector3(0.38, 0.24, ez < 0 ? -0.18 : 0.18)
    );
    g.add(new THREE.Mesh(new THREE.TubeGeometry(c, 12, 0.028, 8, false), cm));
  });

  // Incised bands
  [{ y: 0.0, r: 0.435 }, { y: -0.28, r: 0.40 }, { y: 0.30, r: 0.34 }].forEach(function(bd) {
    var b = new THREE.Mesh(new THREE.TorusGeometry(bd.r, 0.014, 6, 36), dark);
    b.position.y = bd.y;
    g.add(b);
  });

  return g;
}

var BUILDERS = {
  mascara: buildMask,
  collar:  buildCollar,
  poporo:  buildPoporo,
  vasija:  buildVasija
};

export function buildArtifact(piece, scale) {
  scale = scale || 1;
  var fn = BUILDERS[piece.id];
  var mesh;
  if (fn) {
    mesh = fn(piece);
  } else {
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 24, 16),
      new THREE.MeshStandardMaterial({ color: piece.color, roughness: piece.roughness, metalness: piece.metalness })
    );
  }
  mesh.scale.setScalar(scale);
  return mesh;
}
