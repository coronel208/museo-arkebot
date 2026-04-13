/**
 * recorrido.js  ·  Three.js r158
 * Init SINCRÓNICO: los ES-modules se ejecutan con el DOM listo.
 * No se usa window.onload ni ningún wrapper async que bloquee la carga.
 */
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls }       from 'three/addons/controls/OrbitControls.js';
import { PIECES, getPieceById, buildArtifact } from './pieces-data.js';

/* ── Loading bar helpers ─────────────────────────────────────────── */
var lsEl     = document.getElementById('loading-screen');
var lsBar    = document.getElementById('ls-bar');
var lsStatus = document.getElementById('ls-status');

function prog(pct, msg) {
  lsBar.style.width    = pct + '%';
  lsStatus.textContent = msg;
}

function hideLs() {
  prog(100, '¡Listo!');
  setTimeout(function() {
    lsEl.style.transition = 'opacity 0.7s';
    lsEl.style.opacity    = '0';
    setTimeout(function() {
      lsEl.style.display = 'none';
      document.getElementById('start-prompt').style.display = 'flex';
    }, 750);
  }, 400);
}

/* ── Viewport size ───────────────────────────────────────────────── */
var NAV = 52;
function VW() { return window.innerWidth; }
function VH() { return window.innerHeight - NAV; }

/* ── Renderer ────────────────────────────────────────────────────── */
prog(8, 'Iniciando motor 3D…');

var gl = document.getElementById('gl-canvas');
gl.width  = VW();
gl.height = VH();
gl.style.width  = VW() + 'px';
gl.style.height = VH() + 'px';

var renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: true });
renderer.setSize(VW(), VH());
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

window.addEventListener('resize', function() {
  gl.width  = VW(); gl.height = VH();
  gl.style.width = VW() + 'px'; gl.style.height = VH() + 'px';
  renderer.setSize(VW(), VH());
  camera.aspect = VW() / VH();
  camera.updateProjectionMatrix();
});

/* ── Scene & camera ──────────────────────────────────────────────── */
prog(16, 'Preparando escena…');

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1015);
scene.fog = new THREE.Fog(0x0e1015, 24, 55);

var camera = new THREE.PerspectiveCamera(70, VW() / VH(), 0.05, 120);
camera.position.set(0, 1.75, 20.5);  // spawn far back → arch/sign fully visible on start

/* ── Materials ───────────────────────────────────────────────────── */
// ── Wall materials ─────────────────────────────────────────────────
// Creates a museum-panel canvas texture.
// 'repX, repY' control tiling frequency for each wall type.
function makeWallMat(repX, repY) {
  var wc = document.createElement('canvas'); wc.width = 512; wc.height = 512;
  var ctx = wc.getContext('2d');

  // Base: warm museum tan
  ctx.fillStyle = '#C4A87A'; ctx.fillRect(0, 0, 512, 512);

  // Inner panel fill (slightly darker)
  ctx.fillStyle = '#B89A6C'; ctx.fillRect(28, 28, 456, 456);

  // Wainscot strip (bottom 18%)
  ctx.fillStyle = '#6a4822'; ctx.fillRect(0, 420, 512, 92);
  ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 420, 512, 4);

  // Three-line gold border frame around panel
  var lines = [{inset:8,w:5,a:0.80},{inset:18,w:2.5,a:0.55},{inset:27,w:1.5,a:0.35}];
  lines.forEach(function(l) {
    ctx.strokeStyle='rgba(200,158,50,'+l.a+')'; ctx.lineWidth=l.w;
    ctx.strokeRect(l.inset, l.inset, 512-l.inset*2, 420-l.inset*2);
  });

  // Center diamond ornament
  ctx.beginPath();
  ctx.moveTo(256, 150); ctx.lineTo(306, 210); ctx.lineTo(256, 270); ctx.lineTo(206, 210);
  ctx.closePath();
  ctx.strokeStyle='rgba(200,158,50,0.45)'; ctx.lineWidth=2; ctx.stroke();
  ctx.fillStyle='rgba(200,158,50,0.18)'; ctx.fill();

  // Four corner ornaments (small nested squares)
  [[55,55],[457,55],[55,365],[457,365]].forEach(function(c) {
    [18,11,5].forEach(function(s,i) {
      ctx.strokeStyle='rgba(200,158,50,'+(0.65-i*0.2)+')';
      ctx.lineWidth=2-i*0.4;
      ctx.strokeRect(c[0]-s, c[1]-s, s*2, s*2);
    });
  });

  // Horizontal accent line at mid-panel
  ctx.strokeStyle='rgba(200,158,50,0.25)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(50,210); ctx.lineTo(462,210); ctx.stroke();

  var tex = new THREE.CanvasTexture(wc);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repX, repY);
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.72, metalness: 0.02 });
}

// Lateral walls (46m long): 15 panels wide, 2 panels tall → each panel ≈ 3m×4m
var sideWallM = makeWallMat(15, 2);
// End walls (10m wide): 5 panels wide, 2 panels tall → each panel = 2m×4m
var wallM     = makeWallMat(5, 2);
var floorM  = new THREE.MeshStandardMaterial({ color: 0x252018, roughness: 0.55, metalness: 0.10 });
var ceilM   = new THREE.MeshStandardMaterial({ color: 0xE8E4DC, roughness: 0.75 });
var woodM   = new THREE.MeshStandardMaterial({ color: 0x5a3010, roughness: 0.82 });
var goldM   = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.22, metalness: 0.88 });
var marbleM = new THREE.MeshStandardMaterial({ color: 0xddd4c8, roughness: 0.38, metalness: 0.08 });
var glassM  = new THREE.MeshStandardMaterial({ color: 0xc0d8f0, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
var carpetM = new THREE.MeshStandardMaterial({ color: 0x1e0e04, roughness: 0.95 });

function box(geo, mat, x, y, z) {
  var m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.receiveShadow = m.castShadow = true;
  scene.add(m);
  return m;
}

/* ── Corridor  Z0=-24 … Z1=22 ────────────────────────────────────── */
prog(28, 'Construyendo corredor…');

var HW = 10, HH = 8, Z0 = -24, Z1 = 22;
var MZ = (Z0 + Z1) / 2, HL = Z1 - Z0, WT = 0.3;

box(new THREE.BoxGeometry(HW, WT, HL), floorM,  0, -WT/2, MZ);
box(new THREE.BoxGeometry(HW, WT, HL), ceilM,   0, HH + WT/2, MZ);
box(new THREE.BoxGeometry(WT, HH, HL), sideWallM, -HW/2, HH/2, MZ);  // left lateral
box(new THREE.BoxGeometry(WT, HH, HL), sideWallM,  HW/2, HH/2, MZ);  // right lateral
box(new THREE.BoxGeometry(HW, HH, WT), wallM,   0, HH/2, Z0);         // entrance end wall
box(new THREE.BoxGeometry(HW, HH, WT), wallM,   0, HH/2, Z1);         // exit end wall

// Gold baseboards & crown moulding
[-HW/2 + 0.08, HW/2 - 0.08].forEach(function(x) {
  box(new THREE.BoxGeometry(0.05, 0.28, HL), goldM, x, 0.14, MZ);
  box(new THREE.BoxGeometry(0.05, 0.16, HL), goldM, x, HH - 0.09, MZ);
});

// Carpet
box(new THREE.BoxGeometry(2.5, 0.01, HL), carpetM, 0, 0.005, MZ);
box(new THREE.BoxGeometry(2.65, 0.015, HL), goldM, 0, 0.002, MZ);

/* ── Lighting ────────────────────────────────────────────────────── */
prog(38, 'Encendiendo luces…');

// Very bright ambient so walls look white
scene.add(new THREE.AmbientLight(0xfff8f0, 2.8));

// Directional fill from above
var topDir = new THREE.DirectionalLight(0xfff8ec, 0.8);
topDir.position.set(0, 12, MZ);
scene.add(topDir);

var lFill = new THREE.DirectionalLight(0xf0ead8, 0.35);
lFill.position.set(-8, 3, MZ); scene.add(lFill);
var rFill = new THREE.DirectionalLight(0xf0ead8, 0.35);
rFill.position.set(8, 3, MZ); scene.add(rFill);

// Ceiling lamp fixtures (6 along corridor)
[Z0+7, Z0+16, Z0+25, Z0+34, Z0+41, Z0+47].forEach(function(lz) {
  box(new THREE.BoxGeometry(0.50, 0.08, 0.50), goldM, 0, HH - 0.05, lz);
  box(new THREE.CylinderGeometry(0.016, 0.016, 0.50, 8), goldM, 0, HH - 0.32, lz);
  var shM = new THREE.MeshStandardMaterial({ color: 0xfff8e8, roughness: 0.4, emissive: 0xfff4cc, emissiveIntensity: 0.5 });
  box(new THREE.CylinderGeometry(0.07, 0.23, 0.22, 16), shM, 0, HH - 0.72, lz);
  var pt = new THREE.PointLight(0xfff4cc, 2.2, 20, 1.5);
  pt.position.set(0, HH - 0.94, lz);
  pt.castShadow = true;
  pt.shadow.mapSize.set(256, 256);
  scene.add(pt);
});

// Recessed wall lights (embedded fixtures, no visible bulb)
[-HW/2 + 0.12, HW/2 - 0.12].forEach(function(sx) {
  var side = sx < 0 ? 1 : -1;  // direction pointing toward corridor center
  [Z0+11, Z0+23, Z0+35, Z0+45].forEach(function(sz) {
    // Dark recessed housing box (embedded into wall)
    var recessM = new THREE.MeshStandardMaterial({ color: 0x0c0a06, roughness: 1 });
    var housing = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.22), recessM);
    housing.position.set(sx, 2.6, sz);
    scene.add(housing);
    // Emissive inner panel (the glow face)
    var panelM = new THREE.MeshStandardMaterial({
      color: 0xfff8e0, emissive: 0xfff4cc, emissiveIntensity: 2.0, roughness: 0.8
    });
    var panel = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.13, 0.17), panelM);
    panel.position.set(sx + side * 0.034, 2.6, sz);
    scene.add(panel);
    // PointLight from fixture
    var wl = new THREE.PointLight(0xfff4cc, 1.0, 9, 2.0);
    wl.position.set(sx + side * 0.35, 2.6, sz);
    scene.add(wl);
  });
});

/* ── Entrance arch (welcome zone z≈15) ──────────────────────────── */
prog(48, 'Construyendo arco de entrada…');

(function() {
  var archZ = 17;
  var pillarM = new THREE.MeshStandardMaterial({ color: 0xE8E0D5, roughness: 0.6 });

  [-4.8, 4.8].forEach(function(x) {
    box(new THREE.BoxGeometry(0.55, HH + 0.1, 0.55), pillarM, x, HH/2, archZ);
    box(new THREE.BoxGeometry(0.75, 0.18, 0.75), goldM, x, HH - 0.05, archZ);
    box(new THREE.BoxGeometry(0.75, 0.18, 0.75), goldM, x, 0.09, archZ);
    [1.2, 2.5, 3.8].forEach(function(y) {
      box(new THREE.BoxGeometry(0.60, 0.055, 0.60), goldM, x, y, archZ);
    });
  });
  box(new THREE.BoxGeometry(10.0, 0.38, 0.55), goldM, 0, HH - 0.19, archZ);

  // NO archTube (removed)

  // Sign attached near ceiling
  var signY = HH - 1.05;
  box(new THREE.BoxGeometry(9.2, 2.3, 0.16), woodM, 0, signY, archZ + 0.12);
  box(new THREE.BoxGeometry(9.5, 2.6, 0.10), goldM, 0, signY, archZ + 0.05);

  // "BIENVENIDOS" canvas
  var cnv = document.createElement('canvas');
  cnv.width = 1024; cnv.height = 256;
  var ctx = cnv.getContext('2d');
  var bg = ctx.createLinearGradient(0, 0, 0, 256);
  bg.addColorStop(0, '#3c2010'); bg.addColorStop(1, '#1c0e04');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1024, 256);
  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 5;
  ctx.strokeRect(8, 8, 1008, 240);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f0c840'; ctx.font = 'Bold 78px Georgia,serif';
  ctx.fillText('BIENVENIDOS', 512, 112);
  ctx.fillStyle = '#c8a050'; ctx.font = '36px Georgia,serif';
  ctx.fillText('al Museo Seminario Diocesano', 512, 166);
  ctx.fillStyle = '#907030'; ctx.font = '26px Georgia';
  ctx.fillText('Colección Malagana · Palmira, Colombia', 512, 210);

  var wPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(8.8, 2.1),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(cnv), roughness: 0.3 })
  );
  wPlane.position.set(0, signY, archZ + 0.21);
  scene.add(wPlane);

  // Back face — solid wood, visible from behind (must be behind the gold frame's back at archZ+0.00)
  var wBack = new THREE.Mesh(
    new THREE.PlaneGeometry(8.8, 2.1),
    new THREE.MeshStandardMaterial({ color: 0x4a2c0e, roughness: 0.85 })
  );
  wBack.position.set(0, signY, archZ - 0.02);
  wBack.rotation.y = Math.PI;
  scene.add(wBack);

  // Logo below sign board
  new THREE.TextureLoader().load('assets/logo.jpg', function(t) {
    var lp = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2),
      new THREE.MeshStandardMaterial({ map: t, transparent: true }));
    lp.position.set(0, signY - 1.7, archZ + 0.3);
    scene.add(lp);
  }, undefined, function() {
    var ec = document.createElement('canvas'); ec.width = ec.height = 200;
    var ect = ec.getContext('2d');
    ect.fillStyle = '#d4af37'; ect.beginPath(); ect.arc(100,100,96,0,Math.PI*2); ect.fill();
    ect.fillStyle = '#3a2010'; ect.beginPath(); ect.arc(100,100,82,0,Math.PI*2); ect.fill();
    ect.fillStyle = '#d4af37'; ect.font = 'Bold 40px Georgia'; ect.textAlign = 'center'; ect.textBaseline = 'middle';
    ect.fillText('MS', 100, 100);
    var ep = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(ec), transparent: true }));
    ep.position.set(0, signY - 1.7, archZ + 0.3);
    scene.add(ep);
  });

  var sp = new THREE.SpotLight(0xfff4dd, 3.5, 14, Math.PI/5.5, 0.4);
  sp.position.set(0, HH - 0.1, archZ + 2.5);
  sp.target.position.set(0, 3.0, archZ + 0.3);
  scene.add(sp); scene.add(sp.target);
})();

/* ── Museum sign (far wall Z0) ───────────────────────────────────── */
prog(58, 'Montando letrero del museo…');

(function() {
  box(new THREE.BoxGeometry(9.4, 3.0, 0.20), woodM, 0, 3.5, Z0 + 0.12);
  box(new THREE.BoxGeometry(9.7, 3.3, 0.12), goldM, 0, 3.5, Z0 + 0.06);

  [-4.3, 4.3].forEach(function(x) {
    box(new THREE.CylinderGeometry(0.16, 0.20, 3.4, 16), marbleM, x, 3.5, Z0 + 0.18);
    box(new THREE.SphereGeometry(0.20, 12, 10), goldM, x, 5.25, Z0 + 0.18);
    box(new THREE.CylinderGeometry(0.22, 0.20, 0.12, 16), goldM, x, 1.9, Z0 + 0.18);
  });

  var cnv = document.createElement('canvas');
  cnv.width = 1536; cnv.height = 512;
  var ctx = cnv.getContext('2d');
  var bg = ctx.createLinearGradient(0, 0, 0, 512);
  bg.addColorStop(0, '#2e1808'); bg.addColorStop(0.5, '#1a0c04'); bg.addColorStop(1, '#2e1808');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 1536, 512);

  // Subtle grid pattern
  ctx.strokeStyle = 'rgba(212,175,55,0.12)'; ctx.lineWidth = 1;
  for (var gx = 0; gx < 1536; gx += 48) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,512); ctx.stroke(); }
  for (var gy = 0; gy < 512; gy += 48)  { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(1536,gy); ctx.stroke(); }

  ctx.strokeStyle = '#d4af37'; ctx.lineWidth = 6; ctx.strokeRect(12, 12, 1512, 488);
  ctx.strokeStyle = 'rgba(212,175,55,0.5)'; ctx.lineWidth = 2; ctx.strokeRect(24, 24, 1488, 464);

  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(212,175,55,0.6)'; ctx.shadowBlur = 22;
  ctx.fillStyle = '#f0c840'; ctx.font = 'Bold 92px Georgia,serif';
  ctx.fillText('MUSEO SEMINARIO', 768, 142);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#e8d0a0'; ctx.font = '52px Georgia,serif';
  ctx.fillText('Diocesano de Cristo Sacerdote', 768, 224);

  ctx.strokeStyle = 'rgba(212,175,55,0.55)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(100, 252); ctx.lineTo(1436, 252); ctx.stroke();

  ctx.fillStyle = '#c8a040'; ctx.font = '34px Georgia,serif';
  ctx.fillText('Colección Arqueológica Malagana', 768, 308);
  ctx.fillStyle = '#a07828'; ctx.font = '28px Georgia';
  ctx.fillText('Palmira, Valle del Cauca  ·  200 a.C. – 400 d.C.', 768, 355);

  var sPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(8.8, 2.85),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(cnv), roughness: 0.3 })
  );
  sPlane.position.set(0, 3.5, Z0 + 0.24);
  scene.add(sPlane);

  // Logo on sign
  new THREE.TextureLoader().load('assets/logo.jpg', function(t) {
    var lp = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshStandardMaterial({ map: t, transparent: true }));
    lp.position.set(0, 1.4, Z0 + 0.24);
    scene.add(lp);
  }, undefined, function() {
    var ec = document.createElement('canvas'); ec.width = ec.height = 256;
    var ect = ec.getContext('2d');
    ect.fillStyle = '#d4af37'; ect.beginPath(); ect.arc(128,128,120,0,Math.PI*2); ect.fill();
    ect.fillStyle = '#3a2010'; ect.beginPath(); ect.arc(128,128,106,0,Math.PI*2); ect.fill();
    ect.fillStyle = '#d4af37'; ect.font = 'Bold 48px Georgia'; ect.textAlign = 'center'; ect.textBaseline = 'middle';
    ect.fillText('MS', 128, 128);
    var ep = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(ec), transparent: true }));
    ep.position.set(0, 1.4, Z0 + 0.24);
    scene.add(ep);
  });

  var sp = new THREE.SpotLight(0xfff4dd, 5.0, 16, Math.PI/5, 0.42);
  sp.position.set(0, HH - 0.2, Z0 + 5);
  sp.target.position.set(0, 3.3, Z0 + 0.2);
  scene.add(sp); scene.add(sp.target);

  var al = new THREE.PointLight(0xffd070, 1.0, 10);
  al.position.set(0, 5.4, Z0 + 1);
  scene.add(al);
})();

/* ── Display cases (vitrinas) ────────────────────────────────────── */
prog(70, 'Instalando vitrinas…');

var LAYOUT = [
  { piece: PIECES[0], x: -3.2, z: -10 },
  { piece: PIECES[1], x:  3.2, z: -10 },
  { piece: PIECES[2], x: -3.2, z:   4 },
  { piece: PIECES[3], x:  3.2, z:   4 }
];

var interactables = [];

LAYOUT.forEach(function(cfg) {
  var piece = cfg.piece, x = cfg.x, z = cfg.z;
  var grp = new THREE.Group();
  grp.position.set(x, 0, z);

  // Marble base
  var base = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.98, 0.52, 32), marbleM);
  base.position.y = 0.26; base.castShadow = base.receiveShadow = true; grp.add(base);

  // Gold rim on pedestal
  var pRim = new THREE.Mesh(new THREE.CylinderGeometry(0.94, 0.96, 0.055, 32), goldM);
  pRim.position.y = 0.56; grp.add(pRim);

  // Wooden column
  var col = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.34, 0.56, 16), woodM);
  col.position.y = 0.86; col.castShadow = true; grp.add(col);

  // Transition ring
  var colTop = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.38, 0.055, 16), goldM);
  colTop.position.y = 1.17; grp.add(colTop);

  // Interior platform (piece rests here)
  var plat = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.60, 0.055, 24), marbleM);
  plat.position.y = 1.15; grp.add(plat);
  var platRim = new THREE.Mesh(new THREE.CylinderGeometry(0.60, 0.61, 0.022, 24), goldM);
  platRim.position.y = 1.18; grp.add(platRim);

  // Glass case (raycasting target)
  var glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1.24, 1.30, 1.24), glassM);
  glassMesh.position.y = 1.76; glassMesh.userData.pieceId = piece.id; grp.add(glassMesh);

  // Bottom and top rings of case
  [1.11, 2.43].forEach(function(y) {
    var ring = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.055, 1.32), goldM);
    ring.position.y = y; grp.add(ring);
  });

  // Corner posts
  [[-0.60,-0.60],[0.60,-0.60],[-0.60,0.60],[0.60,0.60]].forEach(function(p) {
    var post = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.30, 0.055), goldM);
    post.position.set(p[0], 1.76, p[1]); grp.add(post);
  });

  // Cap
  var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.64, 0.09, 16), goldM);
  cap.position.y = 2.51; grp.add(cap);

  // Artifact on platform
  var artifact = buildArtifact(piece, 0.62);
  artifact.position.set(0, piece.restY, 0);
  artifact.userData.pieceId = piece.id;
  grp.add(artifact);

  // ── Label plate ABOVE the case ──
  var lc = document.createElement('canvas');
  lc.width = 640; lc.height = 200;
  var lctx = lc.getContext('2d');
  // Rich dark background
  var lgr = lctx.createLinearGradient(0, 0, 0, 200);
  lgr.addColorStop(0, '#2e1a06'); lgr.addColorStop(1, '#1a0e02');
  lctx.fillStyle = lgr; lctx.fillRect(0, 0, 640, 200);
  // Bright gold double border
  lctx.strokeStyle = '#f0c840'; lctx.lineWidth = 5; lctx.strokeRect(4, 4, 632, 192);
  lctx.strokeStyle = 'rgba(240,200,64,0.5)'; lctx.lineWidth = 2; lctx.strokeRect(14, 14, 612, 172);
  lctx.textAlign = 'center';
  // Main title — bright white with gold shadow for legibility
  lctx.shadowColor = 'rgba(255,220,80,0.95)'; lctx.shadowBlur = 16;
  lctx.fillStyle = '#ffffff'; lctx.font = 'Bold 52px Georgia,serif';
  lctx.fillText(piece.nombre, 320, 86);
  // Location line
  lctx.shadowColor = 'rgba(240,200,64,0.6)'; lctx.shadowBlur = 8;
  lctx.fillStyle = '#f0e080'; lctx.font = 'Bold 27px Georgia';
  lctx.fillText(piece.procedencia.split('·')[0].trim(), 320, 132);
  lctx.shadowBlur = 0;
  // Date
  var dp = piece.procedencia.split('·')[1];
  if (dp) { lctx.fillStyle='rgba(240,200,80,0.75)'; lctx.font='22px Georgia'; lctx.fillText('· '+dp.trim()+' ·', 320, 168); }

  var lblTex = new THREE.CanvasTexture(lc);
  // CORRECTED rotation: right side (x>0) normal must face -X (toward corridor center)
  //   → rotation.y = -π/2  (normal rotates from +Z to -X)
  // left side (x<0) normal must face +X → rotation.y = +π/2
  var lblRotY = x > 0 ? -Math.PI / 2 : Math.PI / 2;
  // Tiny face-direction offset so plane sits proud of frame's front face
  var faceSign = x > 0 ? -1 : 1;

  // Frame — at y=3.15, stalk reaches only to y=2.89 (no overlap)
  var lblFrame = new THREE.Mesh(new THREE.BoxGeometry(1.90, 0.54, 0.05), goldM);
  lblFrame.position.set(0, 3.15, 0);
  lblFrame.rotation.y = lblRotY;
  grp.add(lblFrame);

  // Text plane — very bright emissive
  var lblPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.80, 0.46),
    new THREE.MeshStandardMaterial({
      map: lblTex, roughness: 0.2,
      emissive: new THREE.Color(0x402000), emissiveIntensity: 1.2,
      side: THREE.FrontSide
    })
  );
  lblPlane.position.set(faceSign * 0.026, 3.15, 0);
  lblPlane.rotation.y = lblRotY;
  grp.add(lblPlane);

  // Stalk — from cap top (y≈2.52) to label bottom (3.15-0.27=2.88)
  // Stalk center: (2.52+2.88)/2=2.70, height: 2.88-2.52=0.36
  var stalk = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 0.05), goldM);
  stalk.position.set(0, 2.70, 0);
  grp.add(stalk);

  // Hover ring
  var hlRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.88, 0.030, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0 })
  );
  hlRing.rotation.x = Math.PI / 2; hlRing.position.y = 1.12; grp.add(hlRing);

  // Spotlight for vitrina
  var sv = new THREE.SpotLight(0xfff8e8, 2.8, 8, Math.PI/7, 0.4, 1.5);
  sv.position.set(0, 4.4, 0);
  sv.target.position.set(0, 1.5, 0);
  grp.add(sv); grp.add(sv.target);

  // Accent light
  var av = new THREE.PointLight(0xffd060, 0.7, 4.5, 2.2);
  av.position.set(0, 2.8, 0); grp.add(av);

  scene.add(grp);
  interactables.push({ glassMesh: glassMesh, hlRing: hlRing, artifact: artifact, pieceId: piece.id });
});

/* ── Collision ───────────────────────────────────────────────────── */
var PR = 0.44;
var obstacles = [
  { x0: -HW/2-0.5, x1: -HW/2+WT, z0: Z0-1, z1: Z1+1 },
  { x0:  HW/2-WT,  x1:  HW/2+0.5, z0: Z0-1, z1: Z1+1 },
  { x0: -HW/2, x1: HW/2, z0: Z0-0.5, z1: Z0+WT },
  { x0: -HW/2, x1: HW/2, z0: Z1-WT,  z1: Z1+0.5 },
  // Arch pillars
  { x0: -5.10, x1: -4.50, z0: 14.65, z1: 15.35 },
  { x0:  4.50, x1:  5.10, z0: 14.65, z1: 15.35 }
];
LAYOUT.forEach(function(cfg) {
  obstacles.push({ x0: cfg.x-0.78, x1: cfg.x+0.78, z0: cfg.z-0.78, z1: cfg.z+0.78 });
});

function canMove(nx, nz) {
  for (var i = 0; i < obstacles.length; i++) {
    var o = obstacles[i];
    var cx = Math.max(o.x0, Math.min(nx, o.x1));
    var cz = Math.max(o.z0, Math.min(nz, o.z1));
    var dx = nx - cx, dz = nz - cz;
    if (dx*dx + dz*dz < PR*PR) return false;
  }
  return true;
}

/* ── Pointer Lock ────────────────────────────────────────────────── */
prog(84, 'Preparando controles…');

var plc = new PointerLockControls(camera, gl);
var isLocked = false, modalOpen = false, justClosed = false, hasStarted = false;

var startPrompt = document.getElementById('start-prompt');
var pauseDialog = document.getElementById('pause-dialog');
var hudEl       = document.getElementById('hud');
var crosshairEl = document.getElementById('crosshair');
var hintEl      = document.getElementById('hint-label');

plc.addEventListener('lock', function() {
  isLocked = true;
  hasStarted = true;
  startPrompt.style.display = 'none';
  if (pauseDialog) pauseDialog.style.display = 'none';
  hudEl.style.display       = 'block';
  crosshairEl.style.display = 'block';
});

plc.addEventListener('unlock', function() {
  isLocked = false;
  hudEl.style.display       = 'none';
  crosshairEl.style.display = 'none';
  hintEl.style.display      = 'none';
  if (!modalOpen && !justClosed) {
    if (hasStarted) {
      // Show pause dialog instead of start prompt
      if (pauseDialog) pauseDialog.style.display = 'flex';
    } else {
      startPrompt.style.display = 'flex';
    }
  }
  justClosed = false;
});

document.getElementById('btn-start').addEventListener('click', function() {
  // Request fullscreen on first start (user interaction = browser allows it)
  var el = document.documentElement;
  if (!document.fullscreenElement && el.requestFullscreen) {
    el.requestFullscreen().catch(function() {});
  }
  safeLock();
});
gl.addEventListener('click', function() { if (!isLocked && !modalOpen && !hasStarted) safeLock(); });

var btnContinue = document.getElementById('pd-continue');
var btnAbandon  = document.getElementById('pd-abandon');
if (btnContinue) btnContinue.addEventListener('click', function() {
  if (pauseDialog) pauseDialog.style.display = 'none';
  safeLock();
});
if (btnAbandon) btnAbandon.addEventListener('click', function() {
  window.location.href = 'index.html';
});

/* ── Keyboard ────────────────────────────────────────────────────── */
var kb = { w: false, s: false, a: false, d: false };
document.addEventListener('keydown', function(e) {
  if (e.code==='KeyW'||e.code==='ArrowUp')    kb.w = true;
  if (e.code==='KeyS'||e.code==='ArrowDown')  kb.s = true;
  if (e.code==='KeyA'||e.code==='ArrowLeft')  kb.a = true;
  if (e.code==='KeyD'||e.code==='ArrowRight') kb.d = true;
});
document.addEventListener('keyup', function(e) {
  if (e.code==='KeyW'||e.code==='ArrowUp')    kb.w = false;
  if (e.code==='KeyS'||e.code==='ArrowDown')  kb.s = false;
  if (e.code==='KeyA'||e.code==='ArrowLeft')  kb.a = false;
  if (e.code==='KeyD'||e.code==='ArrowRight') kb.d = false;
});

/* ── Mobile D-Pad ────────────────────────────────────────────────── */
var mb = { w: false, s: false, a: false, d: false };
function bindBtn(id, key) {
  var el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('touchstart', function(e){ e.preventDefault(); mb[key]=true;  }, { passive: false });
  el.addEventListener('touchend',   function(e){ e.preventDefault(); mb[key]=false; }, { passive: false });
  el.addEventListener('touchcancel',function(){ mb[key]=false; });
  el.addEventListener('mousedown',  function(){ mb[key]=true;  });
  el.addEventListener('mouseup',    function(){ mb[key]=false; });
  el.addEventListener('mouseleave', function(){ mb[key]=false; });
}
bindBtn('dp-up','w'); bindBtn('dp-down','s');
bindBtn('dp-left','a'); bindBtn('dp-right','d');

// Touch-look (drag screen to look around on mobile)
var tLook = null;
gl.addEventListener('touchstart', function(e) {
  if (e.target.classList.contains('dp-btn')) return;
  if (e.touches.length === 1) tLook = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
gl.addEventListener('touchmove', function(e) {
  if (!tLook || e.target.classList.contains('dp-btn')) return;
  var dx = e.touches[0].clientX - tLook.x;
  var dy = e.touches[0].clientY - tLook.y;
  camera.rotation.order = 'YXZ';
  camera.rotation.y -= dx * 0.0028;
  camera.rotation.x = Math.max(-Math.PI/2.1, Math.min(Math.PI/2.1, camera.rotation.x - dy * 0.0028));
  tLook = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: true });
gl.addEventListener('touchend', function() { tLook = null; });

/* ── Raycaster ───────────────────────────────────────────────────── */
var raycaster   = new THREE.Raycaster();
var CENTER      = new THREE.Vector2(0, 0);
var lastHovered = null;

function checkHover() {
  raycaster.setFromCamera(CENTER, camera);
  var meshes = interactables.map(function(i) { return i.glassMesh; });
  var hits   = raycaster.intersectObjects(meshes, false);
  if (hits.length > 0 && hits[0].distance < 6.0) {
    var found = null;
    for (var i = 0; i < interactables.length; i++) {
      if (interactables[i].glassMesh === hits[0].object) { found = interactables[i]; break; }
    }
    if (found !== lastHovered) {
      if (lastHovered) lastHovered.hlRing.material.opacity = 0;
      lastHovered = found;
    }
    if (lastHovered) lastHovered.hlRing.material.opacity = 0.9;
    hintEl.style.display = 'block';
  } else {
    if (lastHovered) { lastHovered.hlRing.material.opacity = 0; lastHovered = null; }
    hintEl.style.display = 'none';
  }
}

gl.addEventListener('click', function() {
  if (!isLocked || modalOpen) return;
  if (lastHovered) openPieceModal(lastHovered.pieceId);
});

/* ── Piece modal ─────────────────────────────────────────────────── */
var mRdr, mSc, mCam, mCtrl, mMesh, mAnimId;
var currentPiece = null, mSlideIdx = 0, mCurrentView = '3d';
var fsOverlay, fsContent, fsCloseBtn, fsRdr, fsCam, fsCtrl, fsAnimId;

// Initialize overlay refs after DOM is ready (module executes with DOM loaded)
fsOverlay  = document.getElementById('fs-overlay');
fsContent  = document.getElementById('fs-content');
fsCloseBtn = document.getElementById('fs-close');

var pieceModal  = document.getElementById('piece-modal');
var pmCanvas    = document.getElementById('pm-canvas');
var pmSlideWrap = document.getElementById('pm-slide-wrap');
var pmSlideImg  = document.getElementById('pm-slide-img');
var pmSlidePrev = document.getElementById('pm-slide-prev');
var pmSlideNext = document.getElementById('pm-slide-next');
var pmSlideDots = document.getElementById('pm-slide-dots');
var pmVidWrap   = document.getElementById('pm-vid-wrap');
var btnM3d      = document.getElementById('pm-btn-3d');
var btnMImg     = document.getElementById('pm-btn-img');
var btnMVid     = document.getElementById('pm-btn-vid');

// Init modal 3D renderer
mSc  = new THREE.Scene(); mSc.background = new THREE.Color(0x0c0e13);
mCam = new THREE.PerspectiveCamera(42, 1, 0.05, 80); mCam.position.set(0, 0.5, 2.8);
mRdr = new THREE.WebGLRenderer({ canvas: pmCanvas, antialias: true });
mRdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mRdr.toneMapping = THREE.ACESFilmicToneMapping; mRdr.toneMappingExposure = 1.3;
mSc.add(new THREE.AmbientLight(0x202840, 1.0));
var mkl = new THREE.DirectionalLight(0xfff4dd, 2.8); mkl.position.set(3,5,3); mSc.add(mkl);
var mfl = new THREE.DirectionalLight(0x4466aa, 0.7); mfl.position.set(-3,2,-2); mSc.add(mfl);
var mrl = new THREE.PointLight(0xd4af37, 1.2, 14); mrl.position.set(0,4,-3); mSc.add(mrl);
var mPed = new THREE.Mesh(new THREE.CylinderGeometry(0.40,0.46,0.08,32), new THREE.MeshStandardMaterial({color:0x1c1610,roughness:0.7}));
mPed.position.y = -0.5; mSc.add(mPed);
mCtrl = new OrbitControls(mCam, pmCanvas);
mCtrl.enableDamping = true; mCtrl.autoRotate = true; mCtrl.autoRotateSpeed = 1.4;
mCtrl.minDistance = 0.8; mCtrl.maxDistance = 6; mCtrl.target.set(0, 0.1, 0);

function resizeMRdr() {
  var w = pmCanvas.clientWidth, h = pmCanvas.clientHeight;
  if (!w || !h) return;
  mRdr.setSize(w, h, false); mCam.aspect = w/h; mCam.updateProjectionMatrix();
}
function animM() { mAnimId = requestAnimationFrame(animM); mCtrl.update(); resizeMRdr(); mRdr.render(mSc, mCam); }

// Slideshow
function buildMDots() {
  pmSlideDots.innerHTML = '';
  currentPiece.imagenes.forEach(function(_, i) {
    var d = document.createElement('span');
    d.className = 'pm-dot' + (i === mSlideIdx ? ' active' : '');
    d.dataset.i = i;
    d.addEventListener('click', function() { goMSlide(parseInt(this.dataset.i)); });
    pmSlideDots.appendChild(d);
  });
}
function goMSlide(i) {
  var n = currentPiece.imagenes.length;
  mSlideIdx = ((i % n) + n) % n;
  pmSlideImg.style.opacity = '0';
  setTimeout(function() { pmSlideImg.src = currentPiece.imagenes[mSlideIdx]; pmSlideImg.style.opacity = '1'; }, 170);
  buildMDots();
}
pmSlidePrev.addEventListener('click', function() { goMSlide(mSlideIdx - 1); });
pmSlideNext.addEventListener('click', function() { goMSlide(mSlideIdx + 1); });

function setMView(v) {
  mCurrentView = v;
  pmCanvas.style.display    = 'none';
  pmSlideWrap.style.display = 'none';
  pmVidWrap.style.display   = 'none';
  [btnM3d, btnMImg, btnMVid].forEach(function(b) { b.classList.remove('on'); });
  cancelAnimationFrame(mAnimId);
  if (v === '3d')  { pmCanvas.style.display    = 'block'; btnM3d.classList.add('on');  animM(); }
  if (v === 'img') { pmSlideWrap.style.display = 'block'; btnMImg.classList.add('on'); }
  if (v === 'vid') {
    pmVidWrap.style.display = 'flex';
    btnMVid.classList.add('on');
    if (currentPiece.video) {
      pmVidWrap.innerHTML = '<video src="' + currentPiece.video + '" controls autoplay style="width:100%;height:100%"></video>';
    } else {
      pmVidWrap.innerHTML = '<div class="no-media"><i class="fas fa-video-slash"></i><span>Video no disponible</span></div>';
    }
  }
}

btnM3d.addEventListener('click',  function() { setMView('3d');  });
btnMImg.addEventListener('click', function() { setMView('img'); });
btnMVid.addEventListener('click', function() { setMView('vid'); });

// ── Ampliar (fullscreen overlay) ─────────────────────────────────────

document.getElementById('pm-btn-ampliar').addEventListener('click', function() {
  if (!currentPiece) return;
  fsContent.innerHTML = '';
  cancelAnimationFrame(fsAnimId);
  if (mCurrentView === 'img') {
    // Show current image at max size
    var img = document.createElement('img');
    img.src = currentPiece.imagenes[mSlideIdx] || currentPiece.imagenes[0];
    img.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;display:block;';
    fsContent.appendChild(img);
    fsOverlay.style.display = 'flex';
  } else if (mCurrentView === 'vid') {
    if (currentPiece.video) {
      var vid = document.createElement('video');
      vid.src = currentPiece.video; vid.controls = true; vid.autoplay = true; vid.muted = true;
      vid.style.cssText = 'max-width:95vw;max-height:95vh;';
      fsContent.appendChild(vid);
      fsOverlay.style.display = 'flex';
    }
  } else {
    // 3D — create full-window renderer reusing same scene (mSc)
    var ovCanvas = document.createElement('canvas');
    var ovW = Math.round(window.innerWidth * 0.96);
    var ovH = Math.round(window.innerHeight * 0.96);
    ovCanvas.width = ovW; ovCanvas.height = ovH;
    ovCanvas.style.cssText = 'width:'+ovW+'px;height:'+ovH+'px;display:block;border-radius:8px;';
    fsContent.appendChild(ovCanvas);

    fsRdr = new THREE.WebGLRenderer({ canvas: ovCanvas, antialias: true });
    fsRdr.setSize(ovW, ovH); fsRdr.setPixelRatio(Math.min(devicePixelRatio, 2));
    fsRdr.toneMapping = THREE.ACESFilmicToneMapping; fsRdr.toneMappingExposure = 1.8;

    fsCam = new THREE.PerspectiveCamera(38, ovW / ovH, 0.05, 80);
    fsCam.position.set(0, 0.5, 2.8);
    fsCtrl = new OrbitControls(fsCam, ovCanvas);
    fsCtrl.enableDamping = true; fsCtrl.autoRotate = true; fsCtrl.autoRotateSpeed = 1.2;
    fsCtrl.minDistance = 0.6; fsCtrl.maxDistance = 6; fsCtrl.target.set(0, 0.1, 0);

    function fsAnim() {
      fsAnimId = requestAnimationFrame(fsAnim);
      fsCtrl.update(); fsRdr.render(mSc, fsCam);
    }
    fsAnim();
    fsOverlay.style.display = 'flex';
  }
});

fsCloseBtn.addEventListener('click', function() {
  fsOverlay.style.display = 'none';
  fsContent.innerHTML = '';
  cancelAnimationFrame(fsAnimId);
  if (fsRdr) { fsRdr.dispose(); fsRdr = null; }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && fsOverlay.style.display === 'flex' && !modalOpen) {
    fsCloseBtn.click();
  }
});

function openPieceModal(pieceId) {
  var piece = getPieceById(pieceId);
  if (!piece) return;
  modalOpen = true;      // set BEFORE unlock so unlock handler sees it
  plc.unlock();
  currentPiece = piece;

  document.getElementById('pm-title').textContent = piece.nombre;
  document.getElementById('pm-prov').innerHTML    = '<i class="fas fa-map-pin"></i> ' + piece.procedencia;
  document.getElementById('pm-desc').textContent  = piece.descripcion;
  document.getElementById('pm-meta').innerHTML    = piece.metadata
    .split('·').map(function(t) { return '<span class="mt-tag">' + t.trim() + '</span>'; }).join('');

  mSlideIdx = 0;
  pmSlideImg.src = piece.imagenes[0]; pmSlideImg.style.opacity = '1';
  buildMDots();

  if (mMesh) mSc.remove(mMesh);
  mMesh = buildArtifact(piece, 1.05); mSc.add(mMesh);

  pieceModal.classList.add('open');
  setTimeout(function() { resizeMRdr(); setMView('3d'); }, 30);
}

// ── Debounced lock helper (prevents double-lock issues) ─────────────
var lockTimer = null;
function safeLock() {
  if (isLocked) return;
  if (lockTimer) { clearTimeout(lockTimer); lockTimer = null; }
  try { plc.lock(); } catch(e) {}
  lockTimer = setTimeout(function() { lockTimer = null; }, 800);
}

function closePieceModalBase() {
  pieceModal.classList.remove('open');
  justClosed = true;
  modalOpen  = false;
  cancelAnimationFrame(mAnimId);
  pmVidWrap.innerHTML = '';
}

// X button click = USER INTERACTION → can re-lock pointer directly
document.getElementById('pm-close').addEventListener('click', function() {
  closePieceModalBase();
  safeLock();
});

// ESC key = browser refuses immediate relock → show pause dialog
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOpen) {
    closePieceModalBase();
    if (pauseDialog) pauseDialog.style.display = 'flex';
  }
});

/* ── Main game loop ──────────────────────────────────────────────── */
var clock = new THREE.Clock();

function tick() {
  requestAnimationFrame(tick);
  var dt    = Math.min(clock.getDelta(), 0.1);
  var SPEED = 5.2;
  var anyMove = kb.w || kb.s || kb.a || kb.d || mb.w || mb.s || mb.a || mb.d;

  if (anyMove) {
    var fwd = new THREE.Vector3(); camera.getWorldDirection(fwd);
    fwd.y = 0; fwd.normalize();
    var right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0,1,0)).normalize();
    var dx = 0, dz = 0;
    if (kb.w||mb.w){ dx+=fwd.x; dz+=fwd.z; }
    if (kb.s||mb.s){ dx-=fwd.x; dz-=fwd.z; }
    if (kb.d||mb.d){ dx+=right.x; dz+=right.z; }
    if (kb.a||mb.a){ dx-=right.x; dz-=right.z; }
    var len = Math.sqrt(dx*dx + dz*dz);
    if (len > 0) {
      var step = SPEED * dt / len;
      var nx = camera.position.x + dx * step;
      var nz = camera.position.z + dz * step;
      if (canMove(nx, nz)) {
        camera.position.x = nx; camera.position.z = nz;
      } else {
        if (canMove(nx, camera.position.z)) camera.position.x = nx;
        if (canMove(camera.position.x, nz)) camera.position.z = nz;
      }
      camera.position.y = 1.75;
    }
  }

  if (isLocked) checkHover();

  interactables.forEach(function(item) {
    item.artifact.rotation.y += 0.005;
  });

  renderer.render(scene, camera);
}

hideLs();
tick();
