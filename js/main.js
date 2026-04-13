import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PIECES, getPieceById, buildArtifact } from './pieces-data.js';

/* ── Build card grid ─────────────────────────────────────────────── */
var grid = document.getElementById('pieces-grid');

PIECES.forEach(function(piece) {
  var card = document.createElement('div');
  card.className = 'card';
  card.innerHTML =
    '<div class="card-3d" id="c3d-' + piece.id + '"></div>' +
    '<div class="card-content"><h3>' + piece.nombre + '</h3><p>' + piece.procedencia + '</p></div>';
  card.addEventListener('click', function() { openModal(piece.id); });
  grid.appendChild(card);
  spawnPreview(piece);
});

function spawnPreview(piece) {
  var cont = document.getElementById('c3d-' + piece.id);
  if (!cont) return;
  var W = cont.clientWidth || 300;
  var H = 220;

  var rdr = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  rdr.setSize(W, H);
  rdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  rdr.toneMapping = THREE.ACESFilmicToneMapping;
  rdr.toneMappingExposure = 1.2;
  cont.appendChild(rdr.domElement);

  var sc = new THREE.Scene();
  sc.background = new THREE.Color(0x181a1e);
  var cam = new THREE.PerspectiveCamera(38, W / H, 0.05, 100);
  cam.position.set(0, 0.4, 2.6);

  sc.add(new THREE.AmbientLight(0x404050, 1.2));
  var dl = new THREE.DirectionalLight(0xfff4dd, 2.4);
  dl.position.set(2, 4, 2); sc.add(dl);
  var fl = new THREE.PointLight(0x446688, 0.6, 10);
  fl.position.set(-2, 1, -1); sc.add(fl);

  var mesh = buildArtifact(piece, 0.92);
  mesh.position.y = -0.05;
  sc.add(mesh);

  var rafId;
  function loop() {
    rafId = requestAnimationFrame(loop);
    mesh.rotation.y += 0.008;
    rdr.render(sc, cam);
  }

  var obs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) { loop(); } else { cancelAnimationFrame(rafId); }
  }, { threshold: 0.1 });
  obs.observe(cont);
}

/* ── Modal setup ─────────────────────────────────────────────────── */
var modal     = document.getElementById('piece-modal');
var closeBtn  = document.querySelector('.close');
var mCanvas   = document.getElementById('modal-canvas');
var slideWrap = document.getElementById('slide-wrap');
var slideImg  = document.getElementById('slide-img');
var slidePrev = document.getElementById('slide-prev');
var slideNext = document.getElementById('slide-next');
var slideDots = document.getElementById('slide-dots');
var vidWrap   = document.getElementById('vid-wrap');
var btn3d     = document.getElementById('view-3d');
var btnImg    = document.getElementById('view-images');
var btnVid    = document.getElementById('view-video');

var currentPiece = null;
var slideIndex   = 0;
var mRdr, mSc, mCam, mCtrl, mMesh, mAnimId;

/* ── Three.js modal renderer ─────────────────────────────────────── */
mSc  = new THREE.Scene();
mSc.background = new THREE.Color(0x0d0f14);
mCam = new THREE.PerspectiveCamera(42, 1, 0.05, 100);
mCam.position.set(0, 0.5, 3);

mRdr = new THREE.WebGLRenderer({ canvas: mCanvas, antialias: true });
mRdr.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mRdr.toneMapping = THREE.ACESFilmicToneMapping;
mRdr.toneMappingExposure = 1.8;

// Very bright, flat lighting — no dark shadows on artifacts
mSc.add(new THREE.AmbientLight(0xffffff, 3.0));
var kl = new THREE.DirectionalLight(0xffffff, 1.4); kl.position.set(3, 5, 3); mSc.add(kl);
var fl = new THREE.DirectionalLight(0xffffff, 1.2); fl.position.set(-3, 2, -2); mSc.add(fl);
var bl = new THREE.DirectionalLight(0xfff8e0, 0.8); bl.position.set(0, -3, 2); mSc.add(bl);  // bottom fill
var rl = new THREE.PointLight(0xd4af37, 1.2, 14);  rl.position.set(0, 4, -3);  mSc.add(rl);

var ped = new THREE.Mesh(
  new THREE.CylinderGeometry(0.42, 0.48, 0.09, 32),
  new THREE.MeshStandardMaterial({ color: 0x1e1810, roughness: 0.7 })
);
ped.position.y = -0.5;
mSc.add(ped);

mCtrl = new OrbitControls(mCam, mCanvas);
mCtrl.enableDamping   = true;
mCtrl.autoRotate      = true;
mCtrl.autoRotateSpeed = 1.4;
mCtrl.minDistance     = 0.8;
mCtrl.maxDistance     = 6;
mCtrl.target.set(0, 0.1, 0);

function resizeMRdr() {
  var w = mCanvas.clientWidth, h = mCanvas.clientHeight;
  if (!w || !h) return;
  mRdr.setSize(w, h, false);
  mCam.aspect = w / h;
  mCam.updateProjectionMatrix();
}

function animM() {
  mAnimId = requestAnimationFrame(animM);
  mCtrl.update();
  resizeMRdr();
  mRdr.render(mSc, mCam);
}

/* ── Slideshow ───────────────────────────────────────────────────── */
function buildDots() {
  slideDots.innerHTML = '';
  currentPiece.imagenes.forEach(function(_, i) {
    var d = document.createElement('span');
    d.className = 'sdot' + (i === slideIndex ? ' active' : '');
    d.dataset.i = i;
    d.addEventListener('click', function() { goSlide(parseInt(this.dataset.i)); });
    slideDots.appendChild(d);
  });
}

function goSlide(i) {
  var n = currentPiece.imagenes.length;
  slideIndex = ((i % n) + n) % n;
  slideImg.style.opacity = '0';
  setTimeout(function() {
    slideImg.src = currentPiece.imagenes[slideIndex];
    slideImg.style.opacity = '1';
  }, 170);
  buildDots();
}

slidePrev.addEventListener('click', function() { goSlide(slideIndex - 1); });
slideNext.addEventListener('click', function() { goSlide(slideIndex + 1); });

/* ── View switcher ───────────────────────────────────────────────── */
function setView(v) {
  /* hide all panels */
  mCanvas.style.display   = 'none';
  slideWrap.style.display = 'none';
  vidWrap.style.display   = 'none';
  /* deactivate all buttons */
  [btn3d, btnImg, btnVid].forEach(function(b) { b.classList.remove('active'); });
  /* cancel 3d loop */
  cancelAnimationFrame(mAnimId);

  if (v === '3d') {
    mCanvas.style.display = 'block';
    btn3d.classList.add('active');
    animM();
  } else if (v === 'img') {
    slideWrap.style.display = 'block';
    btnImg.classList.add('active');
  } else if (v === 'vid') {
    vidWrap.style.display = 'flex';
    btnVid.classList.add('active');
    if (currentPiece.video) {
      vidWrap.innerHTML = '<video src="' + currentPiece.video + '" controls autoplay style="width:100%;height:100%;object-fit:contain;"></video>';
    } else {
      vidWrap.innerHTML = '<div class="no-media"><i class="fas fa-video-slash"></i><span>Video no disponible</span></div>';
    }
  }
}

btn3d.addEventListener('click',  function() { setView('3d');  });
btnImg.addEventListener('click', function() { setView('img'); });
btnVid.addEventListener('click', function() { setView('vid'); });

/* ── Open / close modal ──────────────────────────────────────────── */
function openModal(pieceId) {
  currentPiece = getPieceById(pieceId);
  if (!currentPiece) return;

  document.getElementById('modal-title').textContent       = currentPiece.nombre;
  document.getElementById('modal-provenance').innerHTML    = '<i class="fas fa-map-pin"></i> ' + currentPiece.procedencia;
  document.getElementById('modal-description').textContent = currentPiece.descripcion;
  document.getElementById('modal-metadata').innerHTML      = currentPiece.metadata
    .split('·').map(function(t) { return '<span class="mt">' + t.trim() + '</span>'; }).join('');

  /* setup slideshow */
  slideIndex = 0;
  slideImg.src = currentPiece.imagenes[0];
  slideImg.style.opacity = '1';
  buildDots();

  /* setup 3d */
  if (mMesh) mSc.remove(mMesh);
  mMesh = buildArtifact(currentPiece, 1.05);
  mSc.add(mMesh);

  modal.style.display = 'flex';
  setTimeout(function() { resizeMRdr(); setView('3d'); }, 40);
}

function closeModal() {
  modal.style.display = 'none';
  cancelAnimationFrame(mAnimId);
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });
window.addEventListener('resize', resizeMRdr);

// ── Ampliar overlay (for collection) ─────────────────────────────────
// We show a full-screen overlay with either the image, video, or 3D canvas
var colFsOverlay = (function() {
  var el = document.createElement('div');
  el.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.97);align-items:center;justify-content:center;';
  var closeB = document.createElement('button');
  closeB.innerHTML = '&times;';
  closeB.style.cssText = 'position:absolute;top:16px;right:22px;background:none;border:none;color:#d4af37;font-size:2rem;cursor:pointer;z-index:10;';
  var content = document.createElement('div');
  content.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:20px;';
  el.appendChild(closeB); el.appendChild(content);
  document.body.appendChild(el);
  closeB.addEventListener('click', function() { el.style.display='none'; content.innerHTML=''; cancelAnimationFrame(el._fsAnim); if(el._fsRdr){el._fsRdr.dispose();el._fsRdr=null;} });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'&&el.style.display==='flex') closeB.click(); });
  return { el: el, content: content };
})();

var btnZoom = document.getElementById('btn-zoom');
if (btnZoom) {
  btnZoom.addEventListener('click', function() {
    if (!currentPiece) return;
    var ov = colFsOverlay.el, ct = colFsOverlay.content;
    ct.innerHTML = ''; cancelAnimationFrame(ov._fsAnim); if(ov._fsRdr){ov._fsRdr.dispose();ov._fsRdr=null;}

    // Detect current view from active button
    var activeBtn = document.querySelector('.media-controls button.active');
    var activeView = activeBtn ? activeBtn.id : 'view-3d';

    if (activeView === 'view-images') {
      var img = document.createElement('img');
      img.src = currentPiece.imagenes[slideIndex] || currentPiece.imagenes[0];
      img.style.cssText = 'max-width:95vw;max-height:95vh;object-fit:contain;border-radius:4px;';
      ct.appendChild(img);
    } else if (activeView === 'view-video') {
      if (currentPiece.video) {
        var vid = document.createElement('video');
        vid.src = currentPiece.video; vid.controls = true; vid.autoplay = true; vid.muted = true;
        vid.style.cssText = 'max-width:95vw;max-height:95vh;';
        ct.appendChild(vid);
      } else { ct.innerHTML='<p style="color:#a99e8c;font-size:1rem;">Video no disponible</p>'; }
    } else {
      // 3D fullscreen canvas
      var ovC = document.createElement('canvas');
      var W2 = Math.round(window.innerWidth*0.96), H2 = Math.round(window.innerHeight*0.96);
      ovC.width=W2; ovC.height=H2; ovC.style.cssText='width:'+W2+'px;height:'+H2+'px;display:block;border-radius:8px;';
      ct.appendChild(ovC);
      var ovRdr = new THREE.WebGLRenderer({canvas:ovC,antialias:true});
      ovRdr.setSize(W2,H2); ovRdr.setPixelRatio(Math.min(devicePixelRatio,2));
      ovRdr.toneMapping=THREE.ACESFilmicToneMapping; ovRdr.toneMappingExposure=1.8;
      ov._fsRdr = ovRdr;
      var ovCam = new THREE.PerspectiveCamera(38,W2/H2,0.05,80); ovCam.position.set(0,0.5,2.8);
      var ovCtrl = new (window.OrbitControlsRef || OrbitControls)(ovCam,ovC);
      ovCtrl.enableDamping=true; ovCtrl.autoRotate=true; ovCtrl.autoRotateSpeed=1.2;
      ovCtrl.minDistance=0.6; ovCtrl.maxDistance=6; ovCtrl.target.set(0,0.1,0);
      function ovAnim(){ ov._fsAnim=requestAnimationFrame(ovAnim); ovCtrl.update(); ovRdr.render(mSc,ovCam); }
      ovAnim();
    }
    ov.style.display = 'flex';
  });
}
