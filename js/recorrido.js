/**
 * recorrido.js  ·  Three.js r158
 * Init SINCRÓNICO: los ES-modules se ejecutan con el DOM listo.
 * No se usa window.onload ni ningún wrapper async que bloquee la carga.
 */
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls }       from 'three/addons/controls/OrbitControls.js';
import { PIECES, getPieceById, buildArtifact } from './pieces-data.js';
import { GLTFLoader }  from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/* ── Draco loader ────────────────────────────────────────────────── */
var _draco = new DRACOLoader();
_draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
var _gltfLoader = (function() { var l = new GLTFLoader(); l.setDRACOLoader(_draco); return l; })();

// CDN prefix: serve assets from jsDelivr CDN instead of GitHub Pages origin
var _CDN = 'https://cdn.jsdelivr.net/gh/coronel208/museo.seminario@main/';
function _cdnUrl(url) { return (url && !/^https?:\/\//.test(url)) ? _CDN + url : url; }

/* ── Loading bar helpers ─────────────────────────────────────────── */
var lsEl     = document.getElementById('loading-screen');
var lsBar    = document.getElementById('ls-bar');
var lsStatus = document.getElementById('ls-status');

function prog(pct, msg) {
  lsBar.style.width    = pct + '%';
  lsStatus.textContent = msg;
}

var _autoStart = new URLSearchParams(location.search).has('fs');

function hideLs() {
  prog(100, '¡Listo!');
  setTimeout(function() {
    lsEl.style.transition = 'opacity 0.7s';
    lsEl.style.opacity    = '0';
    setTimeout(function() {
      lsEl.style.display = 'none';
      if (hasStarted) return;
      if (_autoStart) {
        // Browser always exits fullscreen+pointer-lock on page navigation.
        // Show a minimal one-click overlay to re-acquire them with a fresh gesture.
        var ov = document.createElement('div');
        ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(6,8,10,.82);display:flex;align-items:center;justify-content:center;z-index:500;font-family:Georgia,serif;';
        ov.innerHTML = '<div style="text-align:center;padding:2rem 3rem;border:1px solid rgba(212,175,55,.3);background:rgba(8,10,14,.92);border-radius:6px;max-width:340px;">'
          + '<div style="color:#d4af37;font-size:2rem;margin-bottom:.8rem;">&#9654;</div>'
          + '<div style="color:#e8dfc0;font-size:1rem;letter-spacing:.04em;margin-bottom:1.4rem;line-height:1.55;">La sala está lista.<br>Haz clic para continuar el recorrido.</div>'
          + '<button id="auto-start-btn" style="background:#d4af37;color:#000;border:none;padding:.7rem 2rem;border-radius:4px;font-size:.92rem;font-weight:700;cursor:pointer;letter-spacing:.04em;font-family:inherit;">Continuar</button>'
          + '</div>';
        document.body.appendChild(ov);
        ov.addEventListener('click', function() {
          ov.remove();
          startPrompt.style.display = 'none';  // hide any startPrompt the unlock event may have shown
          hasStarted = true;
          if (!isMobile) {
            safeLock(); // fullscreen entered in lock handler after confirmation
            // Fallback: if pointer lock wasn't acquired, show pause dialog so user can retry
            setTimeout(function() {
              if (!isLocked && hasStarted && !modalOpen) showPauseDialog();
            }, 1200);
          } else {
            hudEl.style.display = 'none';
          }
        }, { once: true });
      } else {
        startPrompt.style.display = 'flex';
      }
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

var isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
var renderer = new THREE.WebGLRenderer({ canvas: gl, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setSize(VW(), VH());
renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.0) : Math.min(window.devicePixelRatio, 1.5));
renderer.shadowMap.enabled = false;  // shadows off — ambient+point lights do the job cheaply
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

/* ── Sala identity & color theme ─────────────────────────────── */
var SALA_NUM = parseInt((location.pathname.match(/sala(\d+)/i) || ['','1'])[1]) || 1;
var _SALA_THEMES = {
  1: { clr:0x2563eb, hex:'#2563eb', bg:0x06080f, amb:0xe8eeff,
       floor:0x0c1a30, ceil:0xbdd0ee,
       wBase:'#3d5a80', wWainscot:'#0a1530',
       wB1:'rgba(70,130,210,', wB2:'rgba(120,180,240,', wMot:'rgba(80,145,220,',
       wAccL:'rgba(100,160,255,', wML:'rgba(60,120,200,', wML2:'rgba(100,160,230,' },
  2: { clr:0x16a34a, hex:'#16a34a', bg:0x030d06, amb:0xe0f2e9,
       floor:0x0a1f0e, ceil:0xc0e8d0,
       wBase:'#2d5a3d', wWainscot:'#061a0a',
       wB1:'rgba(50,160,80,', wB2:'rgba(80,200,120,', wMot:'rgba(60,180,90,',
       wAccL:'rgba(80,200,100,', wML:'rgba(40,130,70,', wML2:'rgba(80,180,110,' },
  3: { clr:0xb45309, hex:'#b45309', bg:0x100802, amb:0xffe8c0,
       floor:0x1a0c04, ceil:0xf0c870,
       wBase:'#7c4020', wWainscot:'#1c0a02',
       wB1:'rgba(200,110,30,', wB2:'rgba(240,150,50,', wMot:'rgba(220,130,40,',
       wAccL:'rgba(255,170,60,', wML:'rgba(180,90,20,', wML2:'rgba(220,130,50,' },
  4: { clr:0x7c3aed, hex:'#7c3aed', bg:0x060412, amb:0xede8ff,
       floor:0x0f0822, ceil:0xd4c8f5,
       wBase:'#3d2870', wWainscot:'#110830',
       wB1:'rgba(110,70,210,', wB2:'rgba(160,120,255,', wMot:'rgba(130,90,230,',
       wAccL:'rgba(160,120,255,', wML:'rgba(90,60,190,', wML2:'rgba(130,100,220,' },
  5: { clr:0x0e7490, hex:'#0e7490', bg:0x01090c, amb:0xc0edf5,
       floor:0x030f14, ceil:0xa8dce8,
       wBase:'#0a4a5c', wWainscot:'#021218',
       wB1:'rgba(14,116,144,', wB2:'rgba(30,180,210,', wMot:'rgba(20,150,180,',
       wAccL:'rgba(30,190,220,', wML:'rgba(10,90,112,', wML2:'rgba(20,140,170,' },
};
var _st = _SALA_THEMES[SALA_NUM] || _SALA_THEMES[1];
var SALA_CLR     = _st.clr;
var SALA_CLR_HEX = _st.hex;
var SALA_BG      = _st.bg;
var SALA_AMB     = _st.amb;

var scene = new THREE.Scene();
scene.background = new THREE.Color(SALA_BG);
scene.fog = new THREE.Fog(SALA_BG, 24, 55);

var camera = new THREE.PerspectiveCamera(70, VW() / VH(), 0.05, 120);
// Spawn near the far end (Z1=22), looking toward the arch and museum sign
camera.position.set(0, 1.75, 21.0);

/* ── Materials ───────────────────────────────────────────────────── */
// ── Wall materials ─────────────────────────────────────────────────
// Creates a museum-panel canvas texture.
// 'repX, repY' control tiling frequency for each wall type.
function makeWallMat(repX, repY) {
  var WCS = isMobile ? 256 : 512;
  var wc = document.createElement('canvas'); wc.width = WCS; wc.height = WCS;
  if (isMobile) { var ctx0 = wc.getContext('2d'); ctx0.scale(0.5, 0.5); }
  var ctx = wc.getContext('2d');

  // Base: sala-colored museum panel
  ctx.fillStyle = _st.wBase; ctx.fillRect(0, 0, 512, 512);

  // Wainscot (bottom rail)
  ctx.fillStyle = _st.wWainscot; ctx.fillRect(0, 426, 512, 86);
  ctx.fillStyle = 'rgba(0,0,0,0.30)'; ctx.fillRect(0, 426, 512, 3);
  ctx.fillStyle = _st.wAccL+'0.06)'; ctx.fillRect(0, 429, 512, 2);

  // Panel field (slightly recessed look)
  ctx.fillStyle = 'rgba(0,0,0,0.09)'; ctx.fillRect(16, 16, 480, 395);

  // ── Outer moulding border ──
  ctx.strokeStyle = _st.wB1+'0.90)'; ctx.lineWidth = 5;
  ctx.strokeRect(14, 14, 484, 397);
  ctx.strokeStyle = _st.wB2+'0.60)'; ctx.lineWidth = 2;
  ctx.strokeRect(22, 22, 468, 381);

  // ── Inner inset panel ──
  ctx.strokeStyle = _st.wB1+'0.75)'; ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, 440, 353);
  ctx.strokeStyle = _st.wB2+'0.45)'; ctx.lineWidth = 1.5;
  ctx.strokeRect(44, 44, 424, 337);

  // ── Center decorative motif ──
  var blu = _st.wMot;
  ctx.strokeStyle = blu+'0.60)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(256, 44); ctx.lineTo(256, 381); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(44, 212); ctx.lineTo(468, 212); ctx.stroke();

  // Four quadrant ornaments
  [[100,124],[412,124],[100,300],[412,300]].forEach(function(c) {
    var sizes = [30, 19, 9];
    var alphas = [0.70, 0.50, 0.30];
    sizes.forEach(function(s, i) {
      ctx.strokeStyle = blu + alphas[i] + ')'; ctx.lineWidth = i === 0 ? 2.5 : 1.5;
      ctx.strokeRect(c[0]-s, c[1]-s, s*2, s*2);
    });
    ctx.beginPath(); ctx.arc(c[0], c[1], 4.5, 0, Math.PI*2);
    ctx.fillStyle = blu + '0.70)'; ctx.fill();
  });

  // Center diamond ornament
  ctx.beginPath();
  ctx.moveTo(256, 160); ctx.lineTo(310, 212); ctx.lineTo(256, 264); ctx.lineTo(202, 212);
  ctx.closePath();
  ctx.strokeStyle = blu+'0.65)'; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = blu+'0.15)'; ctx.fill();

  // Small center dot
  ctx.beginPath(); ctx.arc(256, 212, 5.5, 0, Math.PI*2);
  ctx.fillStyle = blu+'0.75)'; ctx.fill();

  // Wainscot top moulding line
  ctx.strokeStyle = _st.wML+'0.80)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, 426); ctx.lineTo(512, 426); ctx.stroke();
  ctx.strokeStyle = _st.wML2+'0.45)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, 421); ctx.lineTo(512, 421); ctx.stroke();

  var tex = new THREE.CanvasTexture(wc);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repX, repY);
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.70, metalness: 0.02 });
}

// Lateral walls (46m long): 15 panels wide, 1 panel tall (no mid-stripe banding)
var sideWallM = makeWallMat(15, 1);
// End walls (10m wide): 5 panels wide, 1 panel tall
var wallM     = makeWallMat(5, 1);
// Tiled floor — checkerboard of two shades of the sala's floor color
var floorM = (function() {
  var WCS = isMobile ? 128 : 256, T = WCS / 4;
  var wc = document.createElement('canvas'); wc.width = WCS; wc.height = WCS;
  var ctx = wc.getContext('2d');
  var r = (_st.floor >> 16) & 0xff, g = (_st.floor >> 8) & 0xff, b = _st.floor & 0xff;
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      var light = (row + col) % 2 === 0;
      ctx.fillStyle = 'rgb(' + (r + (light ? 22 : 0)) + ',' + (g + (light ? 22 : 0)) + ',' + (b + (light ? 22 : 0)) + ')';
      ctx.fillRect(col * T, row * T, T, T);
    }
  }
  ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = isMobile ? 1 : 2;
  for (var i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(i*T, 0); ctx.lineTo(i*T, WCS); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i*T); ctx.lineTo(WCS, i*T); ctx.stroke();
  }
  var tex = new THREE.CanvasTexture(wc);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(5, 23);
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.18 });
})();

// Coffered ceiling — subtle grid
var ceilM = (function() {
  var WCS = isMobile ? 128 : 256, T = WCS / 4;
  var wc = document.createElement('canvas'); wc.width = WCS; wc.height = WCS;
  var ctx = wc.getContext('2d');
  var r = (_st.ceil >> 16) & 0xff, g = (_st.ceil >> 8) & 0xff, b = _st.ceil & 0xff;
  ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'; ctx.fillRect(0, 0, WCS, WCS);
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = isMobile ? 2 : 4;
  for (var i = 1; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(i*T, 0); ctx.lineTo(i*T, WCS); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i*T); ctx.lineTo(WCS, i*T); ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
  for (var j = 1; j < 4; j++) {
    ctx.beginPath(); ctx.moveTo(j*T-2, 0); ctx.lineTo(j*T-2, WCS); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, j*T-2); ctx.lineTo(WCS, j*T-2); ctx.stroke();
  }
  var tex = new THREE.CanvasTexture(wc);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(5, 23);
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.80 });
})();
var woodM   = new THREE.MeshStandardMaterial({ color: 0x5a3010, roughness: 0.82 });
var goldM   = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.22, metalness: 0.88 });
var marbleM = new THREE.MeshStandardMaterial({ color: 0xddd4c8, roughness: 0.38, metalness: 0.08 });
var glassM  = new THREE.MeshStandardMaterial({ color: 0xc0d8f0, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
var carpetM = new THREE.MeshStandardMaterial({ color: 0x1e0e04, roughness: 0.95 });

function box(geo, mat, x, y, z) {
  var m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  // No shadows — disabled for performance
  scene.add(m);
  return m;
}

// Geometry batching — merges same-material meshes into one draw call
var _batch = {};
function batchBox(geo, mat, wx, wy, wz, ry) {
  var key = mat.uuid;
  if (!_batch[key]) _batch[key] = { mat: mat, geos: [] };
  var g = geo.clone();
  if (ry) {
    g.applyMatrix4(new THREE.Matrix4().compose(
      new THREE.Vector3(wx, wy, wz),
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry),
      new THREE.Vector3(1, 1, 1)
    ));
  } else {
    g.translate(wx, wy, wz);
  }
  _batch[key].geos.push(g);
}
function _flushBatch() {
  for (var _bk in _batch) {
    var _bb = _batch[_bk];
    if (!_bb.geos.length) continue;
    var _mg = mergeGeometries(_bb.geos, false);
    if (_mg) { var _bm = new THREE.Mesh(_mg, _bb.mat); _bm.frustumCulled = false; scene.add(_bm); }
    _bb.geos.forEach(function(_bg) { _bg.dispose(); });
  }
  _batch = {};
}

/* ── Corridor  Z0=-24 … Z1=22 ────────────────────────────────────── */
prog(28, 'Construyendo corredor…');

var HW = 10, HH = 8, Z0 = -24, Z1 = 22;
var MZ = (Z0 + Z1) / 2, HL = Z1 - Z0, WT = 0.3;

batchBox(new THREE.BoxGeometry(HW, WT, HL), floorM,  0, -WT/2, MZ);
batchBox(new THREE.BoxGeometry(HW, WT, HL), ceilM,   0, HH + WT/2, MZ);
batchBox(new THREE.BoxGeometry(WT, HH, HL), sideWallM, -HW/2, HH/2, MZ);
batchBox(new THREE.BoxGeometry(WT, HH, HL), sideWallM,  HW/2, HH/2, MZ);
batchBox(new THREE.BoxGeometry(HW, HH, WT), wallM,   0, HH/2, Z0);
// Z1 (exit) wall built in back-door block below

// Gold baseboards & crown moulding
[-HW/2 + 0.08, HW/2 - 0.08].forEach(function(bx) {
  batchBox(new THREE.BoxGeometry(0.05, 0.28, HL), goldM, bx, 0.14, MZ);
  batchBox(new THREE.BoxGeometry(0.05, 0.16, HL), goldM, bx, HH - 0.09, MZ);
});

// Carpet
batchBox(new THREE.BoxGeometry(2.5, 0.01, HL), carpetM, 0, 0.005, MZ);
batchBox(new THREE.BoxGeometry(2.65, 0.015, HL), goldM, 0, 0.002, MZ);

/* ── Lighting ────────────────────────────────────────────────────── */
prog(38, 'Encendiendo luces…');

// Brighter ambient on mobile (no follow-spotlight to compensate)
scene.add(new THREE.AmbientLight(SALA_AMB, isMobile ? 4.5 : 2.8));

// Directional fill from above
var topDir = new THREE.DirectionalLight(0xfff8ec, 0.8);
topDir.position.set(0, 12, MZ);
scene.add(topDir);

var lFill = new THREE.DirectionalLight(0xf0ead8, 0.35);
lFill.position.set(-8, 3, MZ); scene.add(lFill);
var rFill = new THREE.DirectionalLight(0xf0ead8, 0.35);
rFill.position.set(8, 3, MZ); scene.add(rFill);

// Ceiling lamp fixtures — emissive only, no PointLights
var _lampShM = new THREE.MeshStandardMaterial({ color: 0xb0c8ff, roughness: 0.4, emissive: 0x90b0ff, emissiveIntensity: 4.0 });
[Z0+8, Z0+17, Z0+27, Z0+37, Z0+44].forEach(function(lz) {
  batchBox(new THREE.BoxGeometry(0.50, 0.08, 0.50), goldM, 0, HH - 0.05, lz);
  batchBox(new THREE.CylinderGeometry(0.016, 0.016, 0.50, 8), goldM, 0, HH - 0.32, lz);
  batchBox(new THREE.CylinderGeometry(0.07, 0.23, 0.22, 12), _lampShM, 0, HH - 0.72, lz);
});

// Recessed wall lights — emissive only, no PointLights
var _wallRecessM = new THREE.MeshStandardMaterial({ color: 0x06080f, roughness: 1 });
var _wallPanelM  = new THREE.MeshStandardMaterial({ color: 0x80aaff, emissive: SALA_CLR, emissiveIntensity: 5.0, roughness: 0.8 });
[-HW/2 + 0.12, HW/2 - 0.12].forEach(function(sx) {
  var side = sx < 0 ? 1 : -1;
  [Z0+11, Z0+23, Z0+35, Z0+45].forEach(function(sz) {
    batchBox(new THREE.BoxGeometry(0.06, 0.18, 0.22), _wallRecessM, sx, 2.6, sz);
    batchBox(new THREE.BoxGeometry(0.01, 0.13, 0.17), _wallPanelM, sx + side * 0.034, 2.6, sz);
  });
});

// Sala color accent lights — two subtle blue fills near ceiling
var _accentL = new THREE.PointLight(SALA_CLR, isMobile ? 0 : 0.6, 20);
_accentL.position.set(-HW/2+1, HH-0.8, MZ); scene.add(_accentL);
var _accentR = new THREE.PointLight(SALA_CLR, isMobile ? 0 : 0.6, 20);
_accentR.position.set(HW/2-1, HH-0.8, MZ); scene.add(_accentR);

prog(48, 'Montando vitrinas…');

prog(58, 'Colocando piezas…');

/* ── Display cases (vitrinas) ────────────────────────────────────── */
prog(70, 'Instalando vitrinas…');

// Vitrinas por sala: pared izquierda (x=-3) y derecha (x=3), filas en z=16,8,0,-8,-16
var _LAYOUTS = {
  1: [
    { piece: getPieceById('copa-1'),            x: -3.0, z:  16 },
    { piece: getPieceById('jarron-3'),          x:  3.0, z:  16 },
    { piece: getPieceById('cuenco-carenado'),   x: -3.0, z:  8  },
    { piece: getPieceById('figura-1'),          x:  3.0, z:  8  },
    { piece: getPieceById('volante-de-uso'),    x: -3.0, z:  0  },
    { piece: getPieceById('volante-de-huso-2'), x:  3.0, z:  0  },
    { piece: getPieceById('cuenco-1'),          x: -3.0, z: -8  },
    { piece: getPieceById('jarron-1'),          x:  3.0, z: -8  },
    { piece: getPieceById('cuenco-2'),          x: -3.0, z: -16 },
    { piece: getPieceById('cuenco-asas'),       x:  3.0, z: -16 }
  ],
  2: [
    { piece: getPieceById('vasija-antropomorfa'),    x: -3.0, z: 16 },
    { piece: getPieceById('vasija-globular-asas'),   x:  3.0, z: 16 },
    { piece: getPieceById('cuenco-miniatura-carenado'), x: -3.0, z:  8 },
    { piece: getPieceById('vasija-globular-sonso'),    x:  3.0, z:  8 },
    { piece: getPieceById('cuenco-globular-yotoco'),   x: -3.0, z:  0 },
    { piece: getPieceById('vasija-asas-yotoco'),       x:  3.0, z:  0 },
    { piece: getPieceById('vasija-miniatura-sonso'),   x: -3.0, z: -8 },
    { piece: getPieceById('copa-pedestal-yotoco'),     x:  3.0, z: -8 },
    { piece: getPieceById('alcarraza-ilama'),          x: -3.0, z:-16 },
    { piece: getPieceById('copa-pedestal-malagana'),   x:  3.0, z:-16 }
  ],
  3: [
    { piece: getPieceById('vasija-carenada-helicoidal'),    x: -3.0, z: 16 },
    { piece: getPieceById('vasija-globular-yotoco-asas'),   x:  3.0, z: 16 },
    { piece: getPieceById('volante-muisca-decorado'),       x: -3.0, z:  8 },
    { piece: getPieceById('cuenco-utilitario-sonso'),       x:  3.0, z:  8 },
    { piece: getPieceById('cuenco-miniatura-pedestal'),     x: -3.0, z:  0 },
    { piece: getPieceById('olla-globular-ilama'),           x:  3.0, z:  0 },
    { piece: getPieceById('vasija-miniatura-calima'),       x: -3.0, z: -8 },
    { piece: getPieceById('vasija-globular-yotoco-28'),     x:  3.0, z: -8 },
    { piece: getPieceById('vasija-globular-indeterminada'), x: -3.0, z:-16 },
    { piece: getPieceById('vasija-globular-calima-30'),     x:  3.0, z:-16 }
  ],
  4: [
    { piece: getPieceById('vasija-uso-sonso-31'),              x: -3.0, z:  16 },
    { piece: getPieceById('cuenco-miniatura-asa-32'),          x:  3.0, z:  16 },
    { piece: getPieceById('vasija-carenada-yotoco-33'),        x: -3.0, z:   8 },
    { piece: getPieceById('vasija-globular-yotoco-34'),        x:  3.0, z:   8 },
    { piece: getPieceById('cuenco-hemisf-sonso-35'),           x: -3.0, z:   0 },
    { piece: getPieceById('cuenco-miniatura-tierradentro-36'), x:  3.0, z:   0 },
    { piece: getPieceById('copa-pedestal-malagana-37'),        x: -3.0, z:  -8 },
    { piece: getPieceById('vasija-tripode-calima-38'),         x:  3.0, z:  -8 },
    { piece: getPieceById('vasija-apliques-sonso-39'),         x: -3.0, z: -16 },
    { piece: getPieceById('vasija-incisa-sonso-40'),           x:  3.0, z: -16 }
  ],
  5: [
    { piece: getPieceById('vasija-carenada-vertedera-41'),     x: -3.0, z:  16 },
    { piece: getPieceById('cuenco-mini-asa-perf-42'),          x:  3.0, z:  16 },
    { piece: getPieceById('cuenco-subglobular-sonso-43'),      x: -3.0, z:   8 },
    { piece: getPieceById('vasija-mini-globular-44'),          x:  3.0, z:   8 },
    { piece: getPieceById('cuenco-mini-calima-45'),            x: -3.0, z:   0 },
    { piece: getPieceById('copa-pedestal-frag-yotoco-46'),     x:  3.0, z:   0 },
    { piece: getPieceById('vasija-globular-asas-sonso-47'),    x: -3.0, z:  -8 },
    { piece: getPieceById('vasija-globular-cuello-yotoco-48'), x:  3.0, z:  -8 },
    { piece: getPieceById('cuenco-mini-yotoco-49'),            x: -3.0, z: -16 },
    { piece: getPieceById('copa-pedestal-moderna-50'),         x:  3.0, z: -16 }
  ]
};
var LAYOUT = _LAYOUTS[SALA_NUM] || _LAYOUTS[1];

var interactables = [];
var glbPending = LAYOUT.filter(function(c) { return c.piece && c.piece.modelUrl; }).length;
function glbDone() { if (--glbPending <= 0) hideLs(); }

// Follow-spotlight only on desktop (SpotLight is expensive on mobile GPUs)
var _followSpot = null;
if (!isMobile) {
  _followSpot = new THREE.SpotLight(0xfff8e8, 4.0, 8, Math.PI / 5.5, 0.5, 1.5);
  _followSpot.target = new THREE.Object3D();
  scene.add(_followSpot); scene.add(_followSpot.target);
}

LAYOUT.forEach(function(cfg) {
  var piece = cfg.piece, x = cfg.x, z = cfg.z;

  var lblRotY = x > 0 ? -Math.PI / 2 : Math.PI / 2;
  var faceSign = x > 0 ? -1 : 1;

  // Static geometry → batch (all world-space positions)
  batchBox(new THREE.CylinderGeometry(0.88, 0.98, 0.52, 14), marbleM, x, 0.26, z);
  batchBox(new THREE.CylinderGeometry(0.94, 0.96, 0.055, 14), goldM, x, 0.56, z);
  batchBox(new THREE.CylinderGeometry(0.30, 0.34, 0.56, 12), woodM, x, 0.86, z);
  batchBox(new THREE.CylinderGeometry(0.36, 0.38, 0.055, 12), goldM, x, 1.17, z);
  batchBox(new THREE.CylinderGeometry(0.55, 0.60, 0.055, 14), marbleM, x, 1.15, z);
  batchBox(new THREE.CylinderGeometry(0.60, 0.61, 0.022, 14), goldM, x, 1.18, z);
  [1.11, 2.43].forEach(function(ringY) {
    batchBox(new THREE.BoxGeometry(1.32, 0.055, 1.32), goldM, x, ringY, z);
  });
  [[-0.60,-0.60],[0.60,-0.60],[-0.60,0.60],[0.60,0.60]].forEach(function(p) {
    batchBox(new THREE.BoxGeometry(0.055, 1.30, 0.055), goldM, x + p[0], 1.76, z + p[1]);
  });
  batchBox(new THREE.CylinderGeometry(0.12, 0.64, 0.09, 12), goldM, x, 2.51, z);
  batchBox(new THREE.BoxGeometry(1.90, 0.54, 0.05), goldM, x, 3.15, z, lblRotY);
  batchBox(new THREE.BoxGeometry(0.05, 0.36, 0.05), goldM, x, 2.70, z);

  // Glass case — raycasting target, individual mesh
  var glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1.24, 1.30, 1.24), glassM);
  glassMesh.position.set(x, 1.76, z);
  glassMesh.userData.pieceId = piece.id;
  scene.add(glassMesh);

  // Artifact group: placeholder only on desktop; mobile loads on proximity
  var artifact = new THREE.Group();
  artifact.position.set(x, piece.restY !== undefined ? piece.restY : 1.19, z);
  artifact.userData.pieceId = piece.id;
  if (!isMobile) artifact.add(buildArtifact(piece, 0.62));
  scene.add(artifact);
  cfg._artifact = artifact;

  // ── Label plate ABOVE the case ──
  var lc = document.createElement('canvas');
  lc.width = isMobile ? 320 : 640; lc.height = isMobile ? 100 : 200;
  if (isMobile) { var _lctx0 = lc.getContext('2d'); _lctx0.scale(0.5, 0.5); }
  var lctx = lc.getContext('2d');
  var lgr = lctx.createLinearGradient(0, 0, 0, 200);
  lgr.addColorStop(0, '#2e1a06'); lgr.addColorStop(1, '#1a0e02');
  lctx.fillStyle = lgr; lctx.fillRect(0, 0, 640, 200);
  lctx.strokeStyle = '#f0c840'; lctx.lineWidth = 5; lctx.strokeRect(4, 4, 632, 192);
  lctx.strokeStyle = 'rgba(240,200,64,0.5)'; lctx.lineWidth = 2; lctx.strokeRect(14, 14, 612, 172);
  lctx.textAlign = 'center';
  var tf = 46;
  lctx.font = 'Bold ' + tf + 'px Georgia,serif';
  while (lctx.measureText(piece.nombre).width > 590 && tf > 26) { tf -= 2; lctx.font = 'Bold ' + tf + 'px Georgia,serif'; }
  lctx.shadowColor = 'rgba(255,220,80,0.95)'; lctx.shadowBlur = 16;
  lctx.fillStyle = '#ffffff';
  var locY = 138, dateY = 172;
  if (lctx.measureText(piece.nombre).width > 590) {
    var ws = piece.nombre.split(' '), h = Math.ceil(ws.length / 2);
    tf = 34; lctx.font = 'Bold ' + tf + 'px Georgia,serif';
    lctx.fillText(ws.slice(0, h).join(' '), 320, 60);
    lctx.fillText(ws.slice(h).join(' '), 320, 60 + tf + 6);
    locY = 148; dateY = 178;
  } else {
    lctx.fillText(piece.nombre, 320, 82);
  }
  lctx.shadowColor = 'rgba(240,200,64,0.6)'; lctx.shadowBlur = 8;
  lctx.fillStyle = '#f0e080'; lctx.font = 'Bold 23px Georgia';
  lctx.fillText(piece.procedencia.split('·')[0].trim(), 320, locY);
  lctx.shadowBlur = 0;
  var dp = piece.procedencia.split('·')[1];
  if (dp) { lctx.fillStyle='rgba(240,200,80,0.75)'; lctx.font='20px Georgia'; lctx.fillText('· '+dp.trim()+' ·', 320, dateY); }

  var lblTex = new THREE.CanvasTexture(lc);

  // Text plane — unique material per piece, can't batch
  var lblPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.80, 0.46),
    new THREE.MeshStandardMaterial({
      map: lblTex, roughness: 0.2,
      emissive: new THREE.Color(0x402000), emissiveIntensity: 1.2,
      side: THREE.FrontSide
    })
  );
  lblPlane.position.set(x + faceSign * 0.026, 3.15, z);
  lblPlane.rotation.y = lblRotY;
  scene.add(lblPlane);

  // Hover ring — animated, individual mesh
  var hlRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.88, 0.030, 6, 24),
    new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0 })
  );
  hlRing.rotation.x = Math.PI / 2;
  hlRing.position.set(x, 1.12, z);
  scene.add(hlRing);

  interactables.push({ glassMesh: glassMesh, hlRing: hlRing, artifact: artifact, pieceId: piece.id });
});

// ── Mobile proximity loader: load/dispose GLBs by distance ──────────
var _mobActiveLoads = 0;
var _isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
var MAX_MOB_CONCURRENT = _isIOS ? 1 : 2;
var LOAD_DIST = 8.5, UNLOAD_DIST = 14;

function _disposeGltfObj(obj) {
  obj.traverse(function(child) {
    if (!child.isMesh) return;
    if (child.geometry) child.geometry.dispose();
    var mat = child.material;
    if (!mat) return;
    ['map','normalMap','roughnessMap','metalnessMap','emissiveMap','aoMap','envMap'].forEach(function(k) {
      if (mat[k]) { mat[k].dispose(); }
    });
    mat.dispose();
  });
}

function _mobProximityCheck() {
  // Pass 1: dispose far models to free memory
  for (var _pi = 0; _pi < LAYOUT.length; _pi++) {
    var _pc = LAYOUT[_pi];
    if (!_pc._mobLoaded || _pc._artifact.children.length === 0) continue;
    var _dx = camera.position.x - _pc.x, _dz = camera.position.z - _pc.z;
    if (Math.sqrt(_dx*_dx + _dz*_dz) > UNLOAD_DIST) {
      var _m = _pc._artifact.children[0];
      _pc._artifact.remove(_m);
      _disposeGltfObj(_m);
      _pc._mobLoaded = false;
      _mobileDirty = true;
    }
  }
  // Pass 2: load nearby models
  for (var _pi = 0; _pi < LAYOUT.length; _pi++) {
    if (_mobActiveLoads >= MAX_MOB_CONCURRENT) break;
    var _pc = LAYOUT[_pi];
    if (_pc._mobLoaded || _pc._mobLoading || !_pc.piece || !_pc.piece.modelUrl) continue;
    var _dx = camera.position.x - _pc.x, _dz = camera.position.z - _pc.z;
    if (Math.sqrt(_dx*_dx + _dz*_dz) < LOAD_DIST) {
      _pc._mobLoading = true; _mobActiveLoads++;
      (function(_cfg) {
        _gltfLoader.load(_cdnUrl(_cfg.piece.modelUrl), function(gltf) {
          var m = gltf.scene;
          var bbox = new THREE.Box3().setFromObject(m);
          var sz = bbox.getSize(new THREE.Vector3());
          var sc = 0.85 / (Math.max(sz.x, sz.y, sz.z) || 1);
          m.scale.setScalar(sc);
          var ctr = bbox.getCenter(new THREE.Vector3());
          m.position.set(-ctr.x * sc, -bbox.min.y * sc, -ctr.z * sc);
          while (_cfg._artifact.children.length) { var old = _cfg._artifact.children[0]; _cfg._artifact.remove(old); _disposeGltfObj(old); }
          _cfg._artifact.add(m);
          _mobileDirty = true;
          _cfg._mobLoaded = true; _cfg._mobLoading = false; _mobActiveLoads--;
        }, undefined, function() { _cfg._mobLoaded = true; _cfg._mobLoading = false; _mobActiveLoads--; });
      })(_pc);
    }
  }
}

// ── Carga de modelos GLB ──────────────────────────────────────────────
(function() {
  var sorted = LAYOUT.slice().sort(function(a, b) { return b.z - a.z; });

  function _loadGlb(cfg, cb) {
    if (!cfg.piece || !cfg.piece.modelUrl) { glbDone(); cb(); return; }
    var art = cfg._artifact;
    _gltfLoader.load(_cdnUrl(cfg.piece.modelUrl), function(gltf) {
      var m = gltf.scene;
      var bbox = new THREE.Box3().setFromObject(m);
      var sz   = bbox.getSize(new THREE.Vector3());
      var sc   = 0.85 / (Math.max(sz.x, sz.y, sz.z) || 1);
      m.scale.setScalar(sc);
      var ctr  = bbox.getCenter(new THREE.Vector3());
      m.position.set(-ctr.x * sc, -bbox.min.y * sc, -ctr.z * sc);
      while (art.children.length) art.remove(art.children[0]);
      art.add(m);
      glbDone(); cb();
    }, undefined, function() { glbDone(); cb(); });
  }

  if (isMobile) {
    // Show placeholders immediately; real models load as player approaches
    LAYOUT.forEach(function(cfg) { cfg._mobLoaded = false; cfg._mobLoading = false; });
    var _mpc = glbPending;
    for (var _gi = 0; _gi < _mpc; _gi++) glbDone();
    return;
  }

  // Desktop: load in pairs (front→back)
  var pairs = [];
  for (var i = 0; i < sorted.length; i += 2) pairs.push(sorted.slice(i, i + 2));
  function loadPair(idx) {
    if (idx >= pairs.length) return;
    var pair = pairs[idx];
    var rem = pair.length;
    function done() { if (--rem <= 0) loadPair(idx + 1); }
    pair.forEach(function(cfg) { _loadGlb(cfg, done); });
  }
  loadPair(0);
})();

prog(78, 'Instalando puerta trasera…');
var murals = [];

/* ── Back door at Z1 wall — same design as sala-central ─────────── */
var backDoorMesh = null;
(function() {
  var DOOR_W = 2.4, DOOR_H = 3.6, COL_W = 0.4;
  var SIDE_W = (HW - DOOR_W) / 2;  // 3.1 each side

  // Wall with door opening (replaces solid Z1 wall removed above)
  batchBox(new THREE.BoxGeometry(SIDE_W, HH, WT), wallM, -(DOOR_W/2+SIDE_W/2), HH/2, Z1);
  batchBox(new THREE.BoxGeometry(SIDE_W, HH, WT), wallM,  (DOOR_W/2+SIDE_W/2), HH/2, Z1);
  batchBox(new THREE.BoxGeometry(DOOR_W, HH-DOOR_H, WT), wallM, 0, DOOR_H+(HH-DOOR_H)/2, Z1);

  // Gold columns (same as sala-central)
  var colH = DOOR_H + 0.08;
  batchBox(new THREE.BoxGeometry(COL_W, colH, WT+0.05), goldM, -(DOOR_W/2+COL_W/2), colH/2, Z1-0.01);
  batchBox(new THREE.BoxGeometry(COL_W, colH, WT+0.05), goldM,  (DOOR_W/2+COL_W/2), colH/2, Z1-0.01);
  // Gold lintel
  batchBox(new THREE.BoxGeometry(DOOR_W+COL_W*2+0.12, 0.12, WT+0.06), goldM, 0, DOOR_H+0.06, Z1-0.01);

  // Door canvas texture — exact copy of sala-central getDoorTex
  var cvs = document.createElement('canvas'); cvs.width=512; cvs.height=1024;
  var ctx = cvs.getContext('2d');
  var g = ctx.createLinearGradient(0,0,512,0);
  g.addColorStop(0,'#1c1008'); g.addColorStop(0.5,'#251508'); g.addColorStop(1,'#1c1008');
  ctx.fillStyle=g; ctx.fillRect(0,0,512,1024);
  for(var v=0;v<40;v++){
    ctx.beginPath();
    ctx.strokeStyle='rgba(180,120,55,'+(Math.random()*0.07+0.02)+')';
    ctx.lineWidth=Math.random()*2.5+0.5;
    var sy=Math.random()*1024;
    ctx.moveTo(0,sy);
    for(var s=0;s<10;s++){sy+=Math.random()*55-18; ctx.lineTo(s*52+Math.random()*30,sy);}
    ctx.stroke();
  }
  [[28,28,220,450],[264,28,220,450],[28,508,220,480],[264,508,220,480]].forEach(function(p){
    var x=p[0],y=p[1],w=p[2],h=p[3];
    ctx.fillStyle='rgba(0,0,0,0.40)'; ctx.fillRect(x+4,y+4,w,h);
    var pg=ctx.createLinearGradient(x,y,x+w,y+h);
    pg.addColorStop(0,'#2e1a08'); pg.addColorStop(1,'#1c0e04');
    ctx.fillStyle=pg; ctx.fillRect(x,y,w,h);
    ctx.strokeStyle='rgba(212,175,55,0.55)'; ctx.lineWidth=2.5; ctx.strokeRect(x,y,w,h);
    ctx.strokeStyle='rgba(212,175,55,0.20)'; ctx.lineWidth=1; ctx.strokeRect(x+10,y+10,w-20,h-20);
    [[x+6,y+6],[x+w-6,y+6],[x+6,y+h-6],[x+w-6,y+h-6]].forEach(function(c){
      ctx.beginPath(); ctx.arc(c[0],c[1],3,0,Math.PI*2);
      ctx.fillStyle='rgba(212,175,55,0.40)'; ctx.fill();
    });
  });
  ctx.beginPath(); ctx.arc(468,520,19,0,Math.PI*2);
  var kg=ctx.createRadialGradient(462,514,3,468,520,19);
  kg.addColorStop(0,'#fef080'); kg.addColorStop(0.45,'#d4af37'); kg.addColorStop(1,'#7a5a0a');
  ctx.fillStyle=kg; ctx.fill();
  ctx.strokeStyle='rgba(212,175,55,0.75)'; ctx.lineWidth=2; ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,0.6)';
  ctx.beginPath(); ctx.arc(468,548,6,0,Math.PI*2); ctx.fill();
  ctx.fillRect(464,554,8,14);
  ctx.strokeStyle='rgba(212,175,55,0.65)'; ctx.lineWidth=10; ctx.strokeRect(5,5,502,1014);
  ctx.strokeStyle='rgba(212,175,55,0.22)'; ctx.lineWidth=3; ctx.strokeRect(20,20,472,984);

  // Door panel — raycasting target, DoubleSide so player can click from corridor side
  var doorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(DOOR_W-0.10, DOOR_H-0.08),
    new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(cvs),
      roughness: 0.62, metalness: 0.04,
      emissive: new THREE.Color(0x0a0604), emissiveIntensity: 0.5,
      side: THREE.DoubleSide
    })
  );
  doorMesh.position.set(0, DOOR_H/2, Z1-WT/2-0.02);
  scene.add(doorMesh);
  backDoorMesh = doorMesh;
})();

/* ── Collision ───────────────────────────────────────────────────── */
var PR = 0.44;
var obstacles = [
  { x0: -HW/2-0.5, x1: -HW/2+WT, z0: Z0-1, z1: Z1+1 },
  { x0:  HW/2-WT,  x1:  HW/2+0.5, z0: Z0-1, z1: Z1+1 },
  { x0: -HW/2, x1: HW/2, z0: Z0-0.5, z1: Z0+WT },
  { x0: -HW/2, x1: HW/2, z0: Z1-WT,  z1: Z1+0.5 },
  // Arch pillars
  { x0: -5.10, x1: -4.50, z0: 10.65, z1: 11.35 },
  { x0:  4.50, x1:  5.10, z0: 10.65, z1: 11.35 },
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

// Exit-room confirmation dialog (created dynamically, shared across all salas)
var _exitDlg = document.createElement('div');
_exitDlg.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:900;align-items:center;justify-content:center;backdrop-filter:blur(6px);';
_exitDlg.innerHTML = '<div style="background:#13151a;border:1.5px solid rgba(212,175,55,.45);border-radius:14px;padding:2.5rem 3rem;text-align:center;box-shadow:0 0 50px rgba(212,175,55,.22);max-width:400px;width:90%;"><div style="font-size:2rem;margin-bottom:.8rem;">🚪</div><h3 style="font-family:Georgia,serif;color:#d4af37;font-size:1.4rem;margin-bottom:.6rem;">¿Salir de esta sala?</h3><p style="color:#a99e8c;font-size:.88rem;margin-bottom:1.8rem;line-height:1.6;">¿Deseas volver a la Sala Central?</p><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;"><button id="exit-stay" style="background:transparent;color:#a99e8c;border:1px solid #444;padding:.7rem 1.8rem;border-radius:4px;font-size:.9rem;cursor:pointer;font-family:inherit;">Quedarse</button><button id="exit-go" style="background:#d4af37;color:#000;border:none;padding:.75rem 2.2rem;border-radius:4px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:inherit;">Volver a Central</button></div></div>';
document.body.appendChild(_exitDlg);
function _showExitDlg() { _exitDlg.style.display = 'flex'; }
document.getElementById('exit-stay').addEventListener('click', function() {
  _exitDlg.style.display = 'none';
  if (!isMobile) { if (!document.fullscreenElement) _enterFs(); else safeLock(); }
});
document.getElementById('exit-go').addEventListener('click', function() {
  window.location.href = 'sala-central.html?fs=1';
});

// Guard: never show the pause dialog if it's already visible
function showPauseDialog() {
  if (!pauseDialog || pauseDialog.style.display === 'flex') return;
  startPrompt.style.display = 'none';  // always hide startPrompt when pause dialog appears
  pauseDialog.style.display = 'flex';
}

plc.addEventListener('lock', function() {
  isLocked = true;
  hasStarted = true;
  startPrompt.style.display = 'none';
  if (pauseDialog) pauseDialog.style.display = 'none';
  hudEl.style.display       = 'block';
  crosshairEl.style.display = 'block';
  // Apply sala color to UI hints
  hintEl.style.borderColor  = SALA_CLR_HEX;
  hintEl.style.color        = SALA_CLR_HEX;
  hintEl.style.background   = 'rgba(37,99,235,0.13)';
});

plc.addEventListener('unlock', function() {
  isLocked = false;
  hudEl.style.display       = 'none';
  crosshairEl.style.display = 'none';
  hintEl.style.display      = 'none';
  if (!modalOpen && !justClosed) {
    if (hasStarted) {
      showPauseDialog();
    } else if (!_autoStart) {
      // Only show startPrompt when there is no _autoStart overlay pending
      startPrompt.style.display = 'flex';
    }
  }
  justClosed = false;
});

// Show correct controls in start-prompt
if (isMobile) {
  var spDesktop = document.getElementById('sp-desktop');
  var spMobile  = document.getElementById('sp-mobile');
  if (spDesktop) spDesktop.style.display = 'none';
  if (spMobile)  spMobile.style.display  = 'block';
}

// Helper: request fullscreen + hide navbar (iOS fallback — fullscreen API unsupported on iOS Safari)
function _enterFs() {
  var el = document.documentElement;
  var fsReq = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
  if (fsReq && !document.fullscreenElement) fsReq.call(el).catch(function(){});
  var nav = document.getElementById('top-nav');
  if (nav) nav.style.display = 'none';
  document.body.style.overflow = 'hidden';
  // iOS: scroll to dismiss address bar, then size canvas to full available height
  window.scrollTo(0, 1);
  setTimeout(function() {
    var h = window.innerHeight;
    gl.style.top = '0';
    gl.style.height = h + 'px';
    renderer.setSize(VW(), h);
    camera.aspect = VW() / h;
    camera.updateProjectionMatrix();
  }, 80);
}

// Mobile interact button — always visible on right side after start
var _mobInteractBtn = null;
if (isMobile) {
  _mobInteractBtn = document.createElement('button');
  _mobInteractBtn.style.cssText = 'display:none;position:fixed;bottom:calc(28% + env(safe-area-inset-bottom,0px));right:max(18px,env(safe-area-inset-right,0px));'
    + 'width:64px;height:64px;border-radius:50%;'
    + 'background:rgba(0,0,0,0.60);border:2.5px solid rgba(212,175,55,0.40);color:rgba(212,175,55,0.40);'
    + 'font-size:1.4rem;z-index:60;cursor:pointer;touch-action:manipulation;'
    + '-webkit-tap-highlight-color:transparent;backdrop-filter:blur(4px);'
    + 'align-items:center;justify-content:center;transition:border-color .2s,color .2s,box-shadow .2s;';
  _mobInteractBtn.innerHTML = '<i class="fas fa-hand-pointer"></i>';
  document.body.appendChild(_mobInteractBtn);
  _mobInteractBtn.addEventListener('click', function(e) {
    e.preventDefault(); e.stopPropagation();
    if (!hasStarted || modalOpen) return;
    if (lastBackDoor) { _showExitDlg(); return; }
    if (lastHovered)  { openPieceModal(lastHovered.pieceId); return; }
    if (lastMural)    { openMalaganaModal(); }
  });
}

document.getElementById('btn-start').addEventListener('click', function() {
  hasStarted = true; startPrompt.style.display = 'none';
  if (!isMobile) {
    if (!document.fullscreenElement) _enterFs();
    else safeLock();
  } else {
    _enterFs();
    hudEl.style.display = 'none';
    crosshairEl.style.display = 'block';
    if (_mobInteractBtn) _mobInteractBtn.style.display = 'flex';
  }
});
document.addEventListener('fullscreenchange', function() {
  if (document.fullscreenElement && hasStarted && !isLocked) safeLock();
});
// Clicking the canvas when not locked re-acquires pointer lock (any state)
gl.addEventListener('click', function() { if (!isLocked && !modalOpen) { safeLock(); } });

// Auto-pause: when tab becomes visible again and user is in the recorrido
document.addEventListener('visibilitychange', function() {
  if (document.hidden) return;
  setTimeout(function() {
    if (hasStarted && !modalOpen && !isLocked) showPauseDialog();
  }, 300);
});

var btnContinue = document.getElementById('pd-continue');
var btnAbandon  = document.getElementById('pd-abandon');
if (btnContinue) btnContinue.addEventListener('click', function() {
  if (pauseDialog) pauseDialog.style.display = 'none';
  if (!document.fullscreenElement) _enterFs();
  else safeLock();
});

// Stuck detector: auto-show pause dialog if pointer lock lost unexpectedly
setInterval(function() {
  if (hasStarted && !isLocked && !modalOpen && (!pauseDialog || pauseDialog.style.display !== 'flex')) {
    showPauseDialog();
  }
}, 2500);
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
document.addEventListener('pointerlockchange', function() {
  if (!document.pointerLockElement) { kb.w = kb.s = kb.a = kb.d = false; }
});

/* ── Requirements countdown (5 s, desktop only) ─────────────────── */
(function(){
  if (isMobile) return;
  var btn = document.getElementById('btn-start');
  var prompt = document.getElementById('start-prompt');
  if (!btn || !prompt) return;
  // Requirements notice
  var req = document.createElement('div');
  req.style.cssText = 'max-width:360px;width:90%;background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.28);border-radius:10px;padding:.9rem 1.2rem;text-align:left;margin:.2rem auto 0;';
  req.innerHTML = '<div style="color:#d4af37;font-size:.74rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:.5rem;"><i class="fas fa-exclamation-triangle"></i>&nbsp; Requisitos recomendados</div>'
    + '<ul style="color:#a99e8c;font-size:.78rem;line-height:1.85;padding-left:1.1rem;margin:0;">'
    + '<li>WiFi o datos móviles estables</li>'
    + '<li>Dispositivo fabricado desde 2019</li>'
    + '<li>Navegador actualizado (Chrome, Safari)</li>'
    + '<li>En celular: modo horizontal recomendado</li>'
    + '</ul>';
  prompt.insertBefore(req, btn);
  btn.disabled = true;
  btn.style.opacity = '0.5';
  btn.style.cursor = 'not-allowed';
  var sec = 5;
  var origHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-clock"></i>&nbsp; Espera ' + sec + 's&hellip;';
  var t = setInterval(function(){
    sec--;
    if (sec <= 0) {
      clearInterval(t);
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.cursor = '';
      btn.innerHTML = origHTML;
    } else {
      btn.innerHTML = '<i class="fas fa-clock"></i>&nbsp; Espera ' + sec + 's&hellip;';
    }
  }, 1000);
})();

/* ── Mobile Joystick + Touch-look (multi-touch) ──────────────────── */
var mb = { w: false, s: false, a: false, d: false };
var joystickZone = document.getElementById('joystick-zone');
var joyThumb     = document.getElementById('joy-thumb');
var joyActive    = false;
var joyCx = 0, joyCy = 0;
var joyTouchId   = -1;
var JOY_MAX      = 38;

var tLook       = null;
var lookTouchId = -1;
var tapStart    = null;

function isInJoystick(x, y) {
  if (!joystickZone) return false;
  var r = joystickZone.getBoundingClientRect();
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

function joyEnd() {
  joyActive  = false;
  joyTouchId = -1;
  mb.w = mb.s = mb.a = mb.d = false;
  if (joyThumb) joyThumb.style.transform = 'translate(-50%, -50%)';
}

if (joystickZone && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
  joystickZone.addEventListener('touchstart', function(e) {
    e.preventDefault();
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (joyTouchId === -1) {
        var ct = e.changedTouches[i];
        joyTouchId = ct.identifier;
        joyActive  = true;
        var r = joystickZone.getBoundingClientRect();
        joyCx = r.left + r.width  * 0.5;
        joyCy = r.top  + r.height * 0.5;
        break;
      }
    }
  }, { passive: false });

  joystickZone.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (!joyActive || joyTouchId === -1) return;
    var t = null;
    for (var i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === joyTouchId) { t = e.touches[i]; break; }
    }
    if (!t) return;
    var dx   = t.clientX - joyCx;
    var dy   = t.clientY - joyCy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 0 && joyThumb) {
      var cx = Math.min(dist, JOY_MAX) / dist;
      joyThumb.style.transform = 'translate(calc(-50% + ' + (dx*cx).toFixed(1) + 'px), calc(-50% + ' + (dy*cx).toFixed(1) + 'px))';
    }
    if (dist < 8) { mb.w = mb.s = mb.a = mb.d = false; return; }
    var angle = Math.atan2(-dy, dx) * 180 / Math.PI;
    mb.w = (angle > 45  && angle <= 135);
    mb.s = (angle < -45 && angle >= -135);
    mb.a = (angle > 135 || angle < -135);
    mb.d = (angle >= -45 && angle <= 45);
  }, { passive: false });

  joystickZone.addEventListener('touchend', function(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joyTouchId) { joyEnd(); break; }
    }
  }, { passive: true });
  joystickZone.addEventListener('touchcancel', joyEnd, { passive: true });
}

// Canvas: look drag + tap to interact
gl.addEventListener('touchstart', function(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    var ct = e.changedTouches[i];
    if (!isInJoystick(ct.clientX, ct.clientY) && lookTouchId === -1) {
      lookTouchId = ct.identifier;
      tLook       = { x: ct.clientX, y: ct.clientY };
      tapStart    = { x: ct.clientX, y: ct.clientY, time: Date.now() };
      break;
    }
  }
}, { passive: true });

gl.addEventListener('touchmove', function(e) {
  if (lookTouchId === -1) return;
  var t = null;
  for (var i = 0; i < e.touches.length; i++) {
    if (e.touches[i].identifier === lookTouchId) { t = e.touches[i]; break; }
  }
  if (!t || !tLook) return;
  var dx = t.clientX - tLook.x;
  var dy = t.clientY - tLook.y;
  camera.rotation.order = 'YXZ';
  camera.rotation.y -= dx * 0.003;
  camera.rotation.x = Math.max(-Math.PI/2.1, Math.min(Math.PI/2.1, camera.rotation.x - dy * 0.003));
  _mobileDirty = true;
  tLook = { x: t.clientX, y: t.clientY };
}, { passive: true });

gl.addEventListener('touchend', function(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    var ct = e.changedTouches[i];
    if (ct.identifier === lookTouchId) {
      // Tap detection: short press, minimal movement
      if (tapStart && hasStarted && !modalOpen) {
        var moved = Math.sqrt(Math.pow(ct.clientX - tapStart.x, 2) + Math.pow(ct.clientY - tapStart.y, 2));
        var dur   = Date.now() - tapStart.time;
        if (moved < 14 && dur < 320) {
          var rect = gl.getBoundingClientRect();
          var ndc  = new THREE.Vector2(
            ((ct.clientX - rect.left) / rect.width)  * 2 - 1,
            -((ct.clientY - rect.top)  / rect.height) * 2 + 1
          );
          raycaster.setFromCamera(ndc, camera);
          var meshes = interactables.map(function(x) { return x.glassMesh; });
          var hits   = raycaster.intersectObjects(meshes, false);
          if (hits.length > 0 && hits[0].distance < 9) {
            for (var j = 0; j < interactables.length; j++) {
              if (interactables[j].glassMesh === hits[0].object) {
                openPieceModal(interactables[j].pieceId); break;
              }
            }
          } else {
            if (backDoorMesh) {
              var _dh = raycaster.intersectObject(backDoorMesh, false);
              if (_dh.length > 0 && _dh[0].distance < 9) { _showExitDlg(); }
            }
            var muralMeshes = murals.map(function(m) { return m.mesh; });
            var mHits = raycaster.intersectObjects(muralMeshes, false);
            if (mHits.length > 0 && mHits[0].distance < 9) openMalaganaModal();
          }
        }
      }
      tLook       = null;
      lookTouchId = -1;
      tapStart    = null;
      break;
    }
  }
});

/* ── Raycaster ───────────────────────────────────────────────────── */
var raycaster   = new THREE.Raycaster();
var CENTER      = new THREE.Vector2(0, 0);
var lastHovered  = null;
var lastMural    = null;
var lastBackDoor = false;

function checkHover() {
  raycaster.setFromCamera(CENTER, camera);
  // Check vitrinas
  var meshes = interactables.map(function(i) { return i.glassMesh; });
  var hits = raycaster.intersectObjects(meshes, false);
  if (hits.length > 0 && hits[0].distance < 6.5) {
    var found = null;
    for (var i = 0; i < interactables.length; i++) {
      if (interactables[i].glassMesh === hits[0].object) { found = interactables[i]; break; }
    }
    if (found !== lastHovered) { if (lastHovered) lastHovered.hlRing.material.opacity = 0; lastHovered = found; }
    if (lastHovered) lastHovered.hlRing.material.opacity = 0.9;
    hintEl.style.display = 'block';
    hintEl.textContent   = isMobile ? '👆 Toca para inspeccionar' : '👆 Clic para inspeccionar';
    if (_mobInteractBtn) { _mobInteractBtn.style.borderColor = SALA_CLR_HEX; _mobInteractBtn.style.color = SALA_CLR_HEX; _mobInteractBtn.style.boxShadow = '0 0 12px ' + SALA_CLR_HEX + '55'; _mobileDirty = true; }
    lastMural = null; lastBackDoor = false;
  } else {
    if (lastHovered) { lastHovered.hlRing.material.opacity = 0; lastHovered = null; }
    lastMural = null;
    // Check back door
    if (backDoorMesh) {
      var doorHits = raycaster.intersectObject(backDoorMesh, false);
      if (doorHits.length > 0 && doorHits[0].distance < 8.0) {
        lastBackDoor = true;
        hintEl.style.display = 'block';
        hintEl.textContent   = isMobile ? '🚪 Toca para volver a la Sala Central' : '🚪 Clic para volver a la Sala Central';
        if (_mobInteractBtn) { _mobInteractBtn.innerHTML = '<i class="fas fa-door-open"></i>'; _mobInteractBtn.style.borderColor = SALA_CLR_HEX; _mobInteractBtn.style.color = SALA_CLR_HEX; _mobInteractBtn.style.boxShadow = '0 0 12px ' + SALA_CLR_HEX + '55'; _mobileDirty = true; }
        return;
      }
    }
    lastBackDoor = false;
    hintEl.style.display = 'none';
    if (_mobInteractBtn) { _mobInteractBtn.innerHTML = '<i class="fas fa-hand-pointer"></i>'; _mobInteractBtn.style.borderColor = 'rgba(212,175,55,0.40)'; _mobInteractBtn.style.color = 'rgba(212,175,55,0.40)'; _mobInteractBtn.style.boxShadow = 'none'; }
  }
}

gl.addEventListener('click', function() {
  if (!isLocked || modalOpen) return;
  if (lastBackDoor) { _showExitDlg(); return; }
  if (lastHovered)  { openPieceModal(lastHovered.pieceId); return; }
  if (lastMural)    { openMalaganaModal(); }
});

/* ── Piece modal ─────────────────────────────────────────────────── */
var mRdr, mSc, mCam, mCtrl, mMesh, mAnimId;
var currentPiece = null, mSlideIdx = 0, mCurrentView = '3d';

var pieceModal  = document.getElementById('piece-modal');
var pmCanvas    = document.getElementById('pm-canvas');
var pmSlideWrap = document.getElementById('pm-slide-wrap');
var pmSlideImg  = document.getElementById('pm-slide-img');
var pmSlidePrev = document.getElementById('pm-slide-prev');
var pmSlideNext = document.getElementById('pm-slide-next');
var pmSlideDots = document.getElementById('pm-slide-dots');
var pmQrWrap    = document.getElementById('pm-qr-wrap');
var btnM3d      = document.getElementById('pm-btn-3d');
var btnMImg     = document.getElementById('pm-btn-img');
var btnMQr      = document.getElementById('pm-btn-qr');

// Modal loading overlay
(function() {
  var s = document.createElement('style');
  s.textContent = '@keyframes glb-sw{0%{left:-45%}100%{left:100%}}';
  document.head.appendChild(s);
})();
var _pmLoadOv = null;
function showPmLoad() {
  if (!_pmLoadOv) {
    _pmLoadOv = document.createElement('div');
    _pmLoadOv.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem;background:#0d0f14;z-index:5;';
    _pmLoadOv.innerHTML = '<span style="color:#a99e8c;font-size:.78rem;letter-spacing:.05em;">Cargando modelo 3D…</span>'
      + '<div style="width:160px;height:2px;background:rgba(212,175,55,.15);border-radius:2px;overflow:hidden;position:relative">'
      + '<div style="position:absolute;height:100%;width:45%;background:linear-gradient(90deg,#c8a832,#f0d060);border-radius:2px;animation:glb-sw 1.3s linear infinite"></div></div>';
    pmCanvas.parentElement.appendChild(_pmLoadOv);
  }
  _pmLoadOv.style.display = 'flex';
}
function hidePmLoad() { if (_pmLoadOv) _pmLoadOv.style.display = 'none'; }

// Init modal 3D renderer — same bright lighting as collection
mSc  = new THREE.Scene(); mSc.background = new THREE.Color(0x0d0f14);
mCam = new THREE.PerspectiveCamera(42, 1, 0.05, 80); mCam.position.set(0, 0.5, 3);
mRdr = new THREE.WebGLRenderer({ canvas: pmCanvas, antialias: !isMobile, powerPreference: 'high-performance' });
mRdr.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 2));
mRdr.toneMapping = THREE.ACESFilmicToneMapping; mRdr.toneMappingExposure = 1.8;
// Very bright flat lighting — same as collection modal
mSc.add(new THREE.AmbientLight(0xffffff, 3.0));
var mkl = new THREE.DirectionalLight(0xffffff, 1.4); mkl.position.set(3,5,3); mSc.add(mkl);
var mfl = new THREE.DirectionalLight(0xffffff, 1.2); mfl.position.set(-3,2,-2); mSc.add(mfl);
var mbl = new THREE.DirectionalLight(0xfff8e0, 0.8); mbl.position.set(0,-3,2); mSc.add(mbl);
var mrl = new THREE.PointLight(0xd4af37, 0.6, 14); mrl.position.set(0,4,-3); mSc.add(mrl);
mCtrl = new OrbitControls(mCam, pmCanvas);
mCtrl.enableDamping = true; mCtrl.autoRotate = true; mCtrl.autoRotateSpeed = 1.4;
mCtrl.minDistance = 0.8; mCtrl.maxDistance = 6; mCtrl.target.set(0, 0.1, 0);

function resizeMRdr() {
  var el = pmCanvas.parentElement || pmCanvas;
  var w = el.clientWidth, h = el.clientHeight;
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
  var n   = currentPiece.imagenes.length;
  mSlideIdx = ((i % n) + n) % n;
  var url = currentPiece.imagenes[mSlideIdx];
  var img = new Image();
  img.onload = function() {
    pmSlideImg.style.opacity = '0';
    setTimeout(function() { pmSlideImg.src = url; pmSlideImg.style.opacity = '1'; }, 60);
  };
  img.src = url;
  if (img.complete) img.onload();
  buildMDots();
}
pmSlidePrev.addEventListener('click', function() { goMSlide(mSlideIdx - 1); });
pmSlideNext.addEventListener('click', function() { goMSlide(mSlideIdx + 1); });

function setMView(v) {
  mCurrentView = v;
  pmCanvas.style.display    = 'none';
  pmSlideWrap.style.display = 'none';
  pmQrWrap.style.display    = 'none';
  [btnM3d, btnMImg, btnMQr].forEach(function(b) { b.classList.remove('on'); });
  cancelAnimationFrame(mAnimId);
  if (v === '3d')  { pmCanvas.style.display    = 'block'; btnM3d.classList.add('on');  animM(); }
  if (v === 'img') {
    hidePmLoad();
    pmSlideWrap.style.display = 'block'; btnMImg.classList.add('on');
    if (currentPiece && currentPiece.imagenes.length) {
      pmSlideImg.src = currentPiece.imagenes[mSlideIdx]; pmSlideImg.style.opacity = '1';
    }
  }
  if (v === 'qr') {
    hidePmLoad();
    pmQrWrap.style.display = 'flex';
    btnMQr.classList.add('on');
    var _qrBase = location.href.replace(/[^/]*(\?.*)?$/, '');
    var qrUrl = _qrBase + 'ar.html?id=' + currentPiece.id;
    pmQrWrap.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;height:100%;padding:1rem;">'
      + '<div id="pm-qr-container" style="background:#fff;padding:12px;border-radius:8px;box-shadow:0 0 24px rgba(212,175,55,.35);"></div>'
      + '<span style="color:#a99e8c;font-size:.82rem;text-align:center;max-width:220px;">' + currentPiece.nombre + '</span>'
      + '</div>';
    if (window.QRCode) {
      new window.QRCode(document.getElementById('pm-qr-container'), { text: qrUrl, width: 180, height: 180, colorDark: '#000', colorLight: '#fff', correctLevel: window.QRCode.CorrectLevel.M });
    }
  }
}

btnM3d.addEventListener('click',  function() { setMView('3d');  });
btnMImg.addEventListener('click', function() { setMView('img'); });
btnMQr.addEventListener('click',  function() { setMView('qr'); });

// ── Ampliar overlay (piece modal) — created dynamically ──────────────
var pmAmpOverlay = (function() {
  var el = document.createElement('div');
  el.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.96);align-items:center;justify-content:center;';
  var xb = document.createElement('button');
  xb.innerHTML = '&times;';
  xb.style.cssText = 'position:absolute;top:18px;right:22px;background:rgba(212,175,55,.15);border:1.5px solid rgba(212,175,55,.5);color:#d4af37;font-size:2rem;width:44px;height:44px;border-radius:50%;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;line-height:1;';
  var ct = document.createElement('div');
  ct.style.cssText = 'width:95%;height:95%;display:flex;align-items:center;justify-content:center;';
  el.appendChild(xb); el.appendChild(ct); document.body.appendChild(el);
  xb.addEventListener('click', function() {
    el.style.display = 'none'; ct.innerHTML = '';
    cancelAnimationFrame(el._raf);
    if (el._rdr) { el._rdr.dispose(); el._rdr = null; }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && el.style.display === 'flex' && !modalOpen) xb.click();
  });
  return { el: el, ct: ct };
})();

var pmBtnAmpliar = document.getElementById('pm-btn-ampliar');
if (pmBtnAmpliar) {
  pmBtnAmpliar.addEventListener('click', function() {
    if (!currentPiece) return;
    var ov = pmAmpOverlay.el, ct = pmAmpOverlay.ct;
    ct.innerHTML = ''; cancelAnimationFrame(ov._raf); if (ov._rdr) { ov._rdr.dispose(); ov._rdr = null; }

    if (mCurrentView === 'img') {
      var img = document.createElement('img');
      img.src = currentPiece.imagenes[mSlideIdx] || currentPiece.imagenes[0];
      img.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;border-radius:4px;';
      ct.appendChild(img);
    } else if (mCurrentView === 'qr') {
      var _qrBase2 = location.href.replace(/[^/]*(\?.*)?$/, '');
      var qrUrl2 = _qrBase2 + 'ar.html?id=' + currentPiece.id;
      var qrDiv = document.createElement('div');
      qrDiv.style.cssText = 'background:#fff;padding:16px;border-radius:10px;box-shadow:0 0 30px rgba(212,175,55,.4);';
      ct.appendChild(qrDiv);
      if (window.QRCode) {
        new window.QRCode(qrDiv, { text: qrUrl2, width: 250, height: 250, colorDark: '#000', colorLight: '#fff', correctLevel: window.QRCode.CorrectLevel.M });
      }
    } else {
      var oc = document.createElement('canvas');
      var W = Math.round(window.innerWidth * 0.92), H = Math.round(window.innerHeight * 0.90);
      oc.width = W; oc.height = H; oc.style.cssText = 'width:' + W + 'px;height:' + H + 'px;display:block;border-radius:6px;';
      ct.appendChild(oc);
      var or2 = new THREE.WebGLRenderer({ canvas: oc, antialias: true });
      or2.setSize(W, H); or2.setPixelRatio(Math.min(devicePixelRatio, 2));
      or2.toneMapping = THREE.ACESFilmicToneMapping; or2.toneMappingExposure = 1.8;
      ov._rdr = or2;
      var oc2 = new THREE.PerspectiveCamera(38, W / H, 0.05, 80); oc2.position.set(0, 0.5, 2.8);
      var oCtrl = new OrbitControls(oc2, oc);
      oCtrl.enableDamping = true; oCtrl.autoRotate = true; oCtrl.autoRotateSpeed = 1.2;
      oCtrl.minDistance = 0.6; oCtrl.maxDistance = 6; oCtrl.target.set(0, 0.1, 0);
      function af() { ov._raf = requestAnimationFrame(af); oCtrl.update(); or2.render(mSc, oc2); }
      af();
    }
    ov.style.display = 'flex';
  });
}

function openPieceModal(pieceId) {
  var piece = getPieceById(pieceId);
  if (!piece) return;
  modalOpen = true;      // set BEFORE unlock so unlock handler sees it
  plc.unlock();
  currentPiece = piece;

  document.getElementById('pm-title').textContent = piece.nombre;
  document.getElementById('pm-prov').innerHTML    = '<i class="fas fa-map-pin"></i> ' + piece.procedencia;
  document.getElementById('pm-desc').textContent  = piece.descripcion;
  document.getElementById('pm-meta').innerHTML = piece.metadata
    .split('·').map(function(t) {
      var parts = t.trim().split(':');
      var label = parts[0] ? parts[0].trim() : '';
      var value = parts[1] ? parts[1].trim() : t.trim();
      return '<span class="mt-tag"><span class="mt-label">' + label + '</span><span class="mt-value">' + value + '</span></span>';
    }).join('');

  piece.imagenes.forEach(function(url) { new Image().src = url; });
  mSlideIdx = 0;
  pmSlideImg.src = piece.imagenes[0]; pmSlideImg.style.opacity = '1';
  buildMDots();

  if (mMesh) mSc.remove(mMesh);
  mMesh = new THREE.Group();
  mSc.add(mMesh);
  if (piece.modelUrl) {
    showPmLoad();
    _gltfLoader.load(_cdnUrl(piece.modelUrl), function(gltf) {
      hidePmLoad();
      var m = gltf.scene;
      var bbox = new THREE.Box3().setFromObject(m);
      var sz   = bbox.getSize(new THREE.Vector3());
      var maxD = Math.max(sz.x, sz.y, sz.z) || 1;
      var sc   = 1.4 / maxD;
      m.scale.setScalar(sc);
      var ctr  = bbox.getCenter(new THREE.Vector3());
      m.position.set(-ctr.x * sc, -ctr.y * sc, -ctr.z * sc);
      mMesh.add(m);
    }, undefined, function() { hidePmLoad(); });
  } else {
    hidePmLoad();
    mMesh.add(buildArtifact(piece, 1.05));
  }

  mCam.position.set(0, 0, 3);
  mCtrl.target.set(0, 0, 0);
  mCtrl.update();

  pieceModal.classList.add('open');
  setTimeout(function() { resizeMRdr(); setMView(isMobile ? 'img' : '3d'); }, 60);
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
  pmQrWrap.innerHTML = '';
}

document.getElementById('pm-close').addEventListener('click', function() {
  closePieceModalBase();
  safeLock();
});

// ESC key = browser refuses immediate relock → show pause dialog
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOpen) {
    closePieceModalBase();
    showPauseDialog();
  }
});

/* ── Main game loop ──────────────────────────────────────────────── */
var clock = new THREE.Clock();
var _fwd   = new THREE.Vector3();
var _right = new THREE.Vector3();
var _up    = new THREE.Vector3(0, 1, 0);
var _lastFrame   = 0;
var _tickCount   = 0;
var _mobileDirty = true; // force first render
var TARGET_INTERVAL = isMobile ? 33 : 0; // ~30fps on mobile, uncapped on desktop

/* ── Malagana modal ─────────────────────────────────────────────── */
var malaganaModal = document.getElementById('malagana-modal');
function openMalaganaModal() {
  if (!malaganaModal) return;
  modalOpen = true;
  justClosed = true;
  plc.unlock();
  malaganaModal.classList.add('open');
}
function closeMalaganaModal() {
  if (!malaganaModal) return;
  var vid = malaganaModal.querySelector('video');
  if (vid) { vid.pause(); vid.currentTime = 0; }
  malaganaModal.classList.remove('open');
  justClosed = true;
  modalOpen  = false;
  setTimeout(function() { safeLock(); }, 80);
}
if (malaganaModal) {
  var mlClose = malaganaModal.querySelector('#ml-close');
  if (mlClose) mlClose.addEventListener('click', closeMalaganaModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && malaganaModal.classList.contains('open')) closeMalaganaModal();
  });
}

function tick(now) {
  requestAnimationFrame(tick);
  // Modal open: main scene invisible — skip all render work
  if (modalOpen) return;
  if (TARGET_INTERVAL > 0) {
    if (now - _lastFrame < TARGET_INTERVAL) return;
    _lastFrame = now;
  }
  _tickCount++;
  var dt    = Math.min(clock.getDelta(), 0.1);
  var SPEED = 5.2;
  var anyMove = kb.w || kb.s || kb.a || kb.d || mb.w || mb.s || mb.a || mb.d;

  if (anyMove) {
    camera.getWorldDirection(_fwd);
    _fwd.y = 0; _fwd.normalize();
    _right.crossVectors(_fwd, _up).normalize();
    var dx = 0, dz = 0;
    if (kb.w||mb.w){ dx+=_fwd.x; dz+=_fwd.z; }
    if (kb.s||mb.s){ dx-=_fwd.x; dz-=_fwd.z; }
    if (kb.d||mb.d){ dx+=_right.x; dz+=_right.z; }
    if (kb.a||mb.a){ dx-=_right.x; dz-=_right.z; }
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

  if (_followSpot) {
    _followSpot.position.set(camera.position.x, camera.position.y + 2.0, camera.position.z);
    _followSpot.target.position.set(camera.position.x, 1.2, camera.position.z);
    _followSpot.target.updateMatrixWorld();
  }

  if (isLocked || (isMobile && hasStarted && !modalOpen)) checkHover();
  if (isMobile && hasStarted && _tickCount % 20 === 0) _mobProximityCheck();

  // On mobile: skip artifact rotation and skip render when nothing is happening
  if (!isMobile) {
    interactables.forEach(function(item) { item.artifact.rotation.y += 0.010; });
    renderer.render(scene, camera);
  } else if (anyMove || _mobileDirty) {
    _mobileDirty = false;
    renderer.render(scene, camera);
  }
}

try { _flushBatch(); } catch(e) { console.warn('batch flush error', e); }
if (glbPending <= 0) hideLs();
// Safety: if GLBs hang (Draco decoder timeout, network, etc.), force-hide after 12s
setTimeout(function(){ if(lsEl && lsEl.style.display !== 'none') hideLs(); }, 12000);
requestAnimationFrame(tick);
