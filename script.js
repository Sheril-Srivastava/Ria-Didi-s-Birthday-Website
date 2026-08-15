"use strict";


/* =====================================================
   BASIC ELEMENTS
===================================================== */

const gate = document.getElementById("gate");
const gateForm = document.getElementById("gateForm");
const passwordInput = document.getElementById("passwordInput");
const gateMessage = document.getElementById("gateMessage");

const site = document.getElementById("site");

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

const toast = document.getElementById("toast");

const pigPopup = document.getElementById("pigPopup");

const CORRECT_PASSWORD = "143345";

music.volume = 0.55;


/* =====================================================
   PASSWORD
===================================================== */

gateForm.addEventListener("submit", function(event) {

  event.preventDefault();

  if (passwordInput.value === CORRECT_PASSWORD) {

    gateMessage.textContent =
      "Welcome to Ria's celebration! 🐷💗";

    document.body.classList.remove("locked");

    site.classList.add("unlocked");

    site.setAttribute("aria-hidden", "false");


    /*
      Music is attempted after the user has clicked
      the unlock button.
    */

    music.play()
      .then(() => {

        musicLabel.textContent = "Mute";

      })
      .catch(() => {

        musicLabel.textContent = "Play";

      });


    gsap.timeline()

      .to(".gate-card", {
        y: -20,
        scale: 1.03,
        opacity: 0,
        duration: .65,
        ease: "power3.inOut"
      })

      .to(gate, {
        opacity: 0,
        duration: .55,
        onComplete: () => {

          gate.style.display = "none";

          introAnimation();

          /*
             A small welcome celebration.
          */

          setTimeout(() => {
            showPig();
          }, 1200);

        }
      }, "-=.25");


  } else {

    gateMessage.textContent =
      "Wrong code Pink Suar 😭 Try again!";

    gsap.fromTo(
      ".gate-card",
      { x: 0 },
      {
        keyframes: [
          { x: -10 },
          { x: 10 },
          { x: -7 },
          { x: 7 },
          { x: 0 }
        ],
        duration: .45
      }
    );

    passwordInput.select();

  }

});


/* =====================================================
   MUSIC
===================================================== */

musicToggle.addEventListener("click", function() {

  if (music.paused) {

    music.play()
      .then(() => {

        musicLabel.textContent = "Mute";

      })
      .catch(() => {

        showToast("Song file nahi mili 🎵");

      });

  } else {

    music.pause();

    musicLabel.textContent = "Play";

  }

});


/* =====================================================
   INTRO
===================================================== */

function introAnimation() {

  gsap.from(".topbar", {
    y: -30,
    opacity: 0,
    duration: .8,
    ease: "power3.out"
  });

  gsap.from(".hero .eyebrow", {
    y: 20,
    opacity: 0,
    duration: .7,
    delay: .1
  });

  gsap.from(".hero h1", {
    y: 50,
    opacity: 0,
    scale: .95,
    duration: 1.1,
    delay: .2,
    ease: "power4.out"
  });

  gsap.from(".pink-suar-title", {
    y: 25,
    opacity: 0,
    duration: .8,
    delay: .55
  });

  gsap.from(".hero-content > p", {
    y: 20,
    opacity: 0,
    duration: .8,
    delay: .7
  });

}


/* =====================================================
   GO TO CAKE
===================================================== */

function goToCake() {

  document
    .getElementById("cake")
    .scrollIntoView({
      behavior: "smooth"
    });

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

  toast.textContent = message;

  gsap.killTweensOf(toast);

  gsap.timeline()

    .to(toast, {
      opacity: 1,
      y: 0,
      duration: .35
    })

    .to(toast, {
      opacity: 0,
      y: 20,
      duration: .4,
      delay: 2
    });

}


/* =====================================================
   PINK SUAR POP-OUTS
===================================================== */

function showPig() {

  const maxX =
    Math.max(
      20,
      window.innerWidth - 130
    );

  const maxY =
    Math.max(
      100,
      window.innerHeight - 180
    );

  const x =
    20 + Math.random() * (maxX - 20);

  const y =
    80 + Math.random() * (maxY - 80);


  pigPopup.style.left = x + "px";
  pigPopup.style.top = y + "px";

  pigPopup.style.display = "block";

  gsap.killTweensOf(pigPopup);

  gsap.fromTo(
    pigPopup,
    {
      scale: 0,
      rotation: -30,
      opacity: 0
    },
    {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: .55,
      ease: "back.out(2)"
    }
  );

  gsap.to(
    pigPopup,
    {
      scale: .7,
      rotation: 20,
      opacity: 0,
      duration: .45,
      delay: 1.8,
      onComplete: () => {
        pigPopup.style.display = "none";
      }
    }
  );

}


/*
   Random pigs appear throughout the website.
*/

setInterval(() => {

  if (
    !document.body.classList.contains("locked") &&
    Math.random() > .25
  ) {

    showPig();

  }

}, 7000);


/* =====================================================
   CONFETTI
===================================================== */

const confettiCanvas =
  document.getElementById("confettiCanvas");

const ctx =
  confettiCanvas.getContext("2d");

let confettiPieces = [];

let confettiAnimation = null;


const confettiColors = [
  "#ff6f91",
  "#ffb4c5",
  "#ffdca3",
  "#fff4dd",
  "#cfa5ff",
  "#8de5d5",
  "#ffffff"
];


function resizeConfetti() {

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  confettiCanvas.width =
    window.innerWidth * dpr;

  confettiCanvas.height =
    window.innerHeight * dpr;

  confettiCanvas.style.width =
    window.innerWidth + "px";

  confettiCanvas.style.height =
    window.innerHeight + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

}


resizeConfetti();

window.addEventListener(
  "resize",
  resizeConfetti
);


function launchConfetti(amount = 280) {

  resizeConfetti();


  for (let i = 0; i < amount; i++) {

    const fromCenter =
      Math.random() < .65;

    confettiPieces.push({

      x:
        fromCenter
          ? window.innerWidth / 2 +
            (Math.random() - .5) * 260
          : Math.random() * window.innerWidth,

      y:
        window.innerHeight *
        (.45 + Math.random() * .2),

      vx:
        (Math.random() - .5) *
        (fromCenter ? 18 : 7),

      vy:
        -8 -
        Math.random() * 15,

      gravity:
        .18 +
        Math.random() * .14,

      drag: .986,

      rotation:
        Math.random() * Math.PI,

      rotationSpeed:
        (Math.random() - .5) * .4,

      width:
        5 + Math.random() * 8,

      height:
        3 + Math.random() * 7,

      color:
        confettiColors[
          Math.floor(
            Math.random() *
            confettiColors.length
          )
        ],

      life:
        200 +
        Math.random() * 120

    });

  }


  if (!confettiAnimation) {

    animateConfetti();

  }

}


function animateConfetti() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );


  confettiPieces.forEach(piece => {

    piece.vx *= piece.drag;

    piece.vy += piece.gravity;

    piece.x += piece.vx;

    piece.y += piece.vy;

    piece.rotation +=
      piece.rotationSpeed;

    piece.life--;


    ctx.save();

    ctx.translate(
      piece.x,
      piece.y
    );

    ctx.rotate(
      piece.rotation
    );

    ctx.fillStyle =
      piece.color;

    ctx.globalAlpha =
      Math.min(
        1,
        piece.life / 35
      );

    ctx.fillRect(
      -piece.width / 2,
      -piece.height / 2,
      piece.width,
      piece.height
    );

    ctx.restore();

  });


  confettiPieces =
    confettiPieces.filter(piece =>
      piece.life > 0 &&
      piece.y <
        window.innerHeight + 80
    );


  if (confettiPieces.length) {

    confettiAnimation =
      requestAnimationFrame(
        animateConfetti
      );

  } else {

    confettiAnimation = null;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

  }

}


/* =====================================================
   THREE.JS CAKE
===================================================== */

const canvas =
  document.getElementById("cakeCanvas");

const shell =
  canvas.parentElement;


const scene =
  new THREE.Scene();


const camera =
  new THREE.PerspectiveCamera(
    38,
    1,
    .1,
    100
  );

camera.position.set(
  0,
  3.5,
  9
);

camera.lookAt(
  0,
  1.3,
  0
);


const renderer =
  new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });


renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.15;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;


/* ================= LIGHTS ================= */

scene.add(
  new THREE.HemisphereLight(
    0xffe5dc,
    0x291744,
    2.2
  )
);


const keyLight =
  new THREE.DirectionalLight(
    0xffdcc6,
    4
  );

keyLight.position.set(
  4,
  7,
  5
);

keyLight.castShadow = true;

keyLight.shadow.mapSize.set(
  1024,
  1024
);

scene.add(keyLight);


const fillLight =
  new THREE.PointLight(
    0xd49cff,
    22,
    12
  );

fillLight.position.set(
  -4,
  3,
  3
);

scene.add(fillLight);


/* ================= CAKE ROOT ================= */

const cakeRoot =
  new THREE.Group();

cakeRoot.position.y =
  -.65;

scene.add(cakeRoot);


/* ================= MATERIALS ================= */

const matCake =
  new THREE.MeshStandardMaterial({
    color: 0xf2a9bd,
    roughness: .55
  });


const matCakeLight =
  new THREE.MeshStandardMaterial({
    color: 0xffc9d8,
    roughness: .5
  });


const matCream =
  new THREE.MeshStandardMaterial({
    color: 0xfff3db,
    roughness: .65
  });


const matGold =
  new THREE.MeshStandardMaterial({
    color: 0xe9b86c,
    roughness: .28,
    metalness: .62
  });


/* ================= CYLINDER HELPER ================= */

function cylinder(
  radius,
  height,
  material,
  y,
  group,
  thetaStart = 0,
  thetaLength = Math.PI * 2
) {

  const geometry =
    new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      64,
      1,
      false,
      thetaStart,
      thetaLength
    );


  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.position.y = y;

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  group.add(mesh);

  return mesh;

}


/* ================= PLATE ================= */

cylinder(
  2.7,
  .13,
  matGold,
  .07,
  cakeRoot
);


cylinder(
  2.45,
  .08,
  matCream,
  .16,
  cakeRoot
);


/* ================= WHOLE CAKE ================= */

const wholeCake =
  new THREE.Group();

cakeRoot.add(wholeCake);


cylinder(
  2.05,
  1.12,
  matCake,
  .76,
  wholeCake
);


cylinder(
  2.12,
  .17,
  matCream,
  1.31,
  wholeCake
);


cylinder(
  1.55,
  .9,
  matCakeLight,
  1.72,
  wholeCake
);


cylinder(
  1.62,
  .16,
  matCream,
  2.15,
  wholeCake
);


/* ================= FROSTING PEARLS ================= */

for (let i = 0; i < 20; i++) {

  const angle =
    (i / 20) *
    Math.PI *
    2;


  const pearl =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .09,
        14,
        10
      ),
      i % 2
        ? matGold
        : matCream
    );


  pearl.position.set(
    Math.sin(angle) * 1.47,
    2.23,
    Math.cos(angle) * 1.47
  );


  wholeCake.add(pearl);

}


/* =====================================================
   CUT CAKE
===================================================== */

const cutCake =
  new THREE.Group();

cutCake.visible = false;

cakeRoot.add(cutCake);


const cutAngle = .76;


const remainingGroup =
  new THREE.Group();


const wedgeGroup =
  new THREE.Group();


cutCake.add(
  remainingGroup,
  wedgeGroup
);


/* Remaining cake */

cylinder(
  2.05,
  1.12,
  matCake,
  .76,
  remainingGroup,
  cutAngle,
  Math.PI * 2 - cutAngle
);


cylinder(
  2.12,
  .17,
  matCream,
  1.31,
  remainingGroup,
  cutAngle,
  Math.PI * 2 - cutAngle
);


cylinder(
  1.55,
  .9,
  matCakeLight,
  1.72,
  remainingGroup,
  cutAngle,
  Math.PI * 2 - cutAngle
);


cylinder(
  1.62,
  .16,
  matCream,
  2.15,
  remainingGroup,
  cutAngle,
  Math.PI * 2 - cutAngle
);


/* Cake slice */

cylinder(
  2.05,
  1.12,
  matCake,
  .76,
  wedgeGroup,
  0,
  cutAngle
);


cylinder(
  2.12,
  .17,
  matCream,
  1.31,
  wedgeGroup,
  0,
  cutAngle
);


cylinder(
  1.55,
  .9,
  matCakeLight,
  1.72,
  wedgeGroup,
  0,
  cutAngle
);


cylinder(
  1.62,
  .16,
  matCream,
  2.15,
  wedgeGroup,
  0,
  cutAngle
);


/* =====================================================
   CANDLE
===================================================== */

const candleGroup =
  new THREE.Group();

candleGroup.position.y =
  2.2;

cakeRoot.add(candleGroup);


const candle =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      .12,
      .12,
      1.1,
      24
    ),
    new THREE.MeshStandardMaterial({
      color: 0xf5c9df,
      roughness: .42
    })
  );


candle.position.y =
  .58;

candle.castShadow = true;

candleGroup.add(candle);


/* Candle stripes */

for (let i = 0; i < 5; i++) {

  const stripe =
    new THREE.Mesh(
      new THREE.TorusGeometry(
        .121,
        .022,
        8,
        24
      ),
      matGold
    );


  stripe.rotation.x =
    Math.PI / 2;

  stripe.position.y =
    .22 + i * .19;

  candleGroup.add(stripe);

}


/* Wick */

const wick =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      .018,
      .018,
      .19,
      8
    ),
    new THREE.MeshBasicMaterial({
      color: 0x2a1525
    })
  );


wick.position.y =
  1.2;

candleGroup.add(wick);


/* =====================================================
   FLAME
===================================================== */

const flameGroup =
  new THREE.Group();

flameGroup.position.y =
  1.47;

candleGroup.add(flameGroup);


const flameOuter =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      .18,
      20,
      16
    ),
    new THREE.MeshBasicMaterial({
      color: 0xff9d42,
      transparent: true,
      opacity: .64,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );


flameOuter.scale.set(
  .82,
  1.75,
  .82
);

flameGroup.add(flameOuter);


const flameInner =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      .105,
      18,
      14
    ),
    new THREE.MeshBasicMaterial({
      color: 0xffffca,
      transparent: true,
      opacity: .95,
      blending: THREE.AdditiveBlending
    })
  );


flameInner.scale.set(
  .75,
  1.65,
  .75
);

flameInner.position.y =
  -.03;

flameGroup.add(flameInner);


/* Candle light */

const candleLight =
  new THREE.PointLight(
    0xff9b54,
    13,
    5,
    2
  );

candleLight.position.y =
  .08;

flameGroup.add(candleLight);


/* Flame particles */

const flameParticles = [];


for (let i = 0; i < 16; i++) {

  const particle =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        .025,
        8,
        6
      ),
      new THREE.MeshBasicMaterial({
        color: 0xffc36a,
        transparent: true,
        opacity: .8
      })
    );


  particle.position.set(
    (Math.random() - .5) * .22,
    Math.random() * .35,
    (Math.random() - .5) * .18
  );


  particle.userData.speed =
    .006 +
    Math.random() * .012;

  particle.visible = false;

  flameGroup.add(particle);

  flameParticles.push(particle);

}


/* =====================================================
   CAKE TOPPER
===================================================== */

const topperRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      .55,
      .025,
      10,
      50
    ),
    matGold
  );


topperRing.position.set(
  0,
  3.02,
  -.13
);

cakeRoot.add(topperRing);


/* =====================================================
   KNIFE
===================================================== */

const knife =
  new THREE.Group();

knife.visible = false;

scene.add(knife);


const blade =
  new THREE.Mesh(
    new THREE.BoxGeometry(
      2.1,
      .07,
      .47
    ),
    new THREE.MeshStandardMaterial({
      color: 0xe8edf2,
      metalness: .9,
      roughness: .17
    })
  );


blade.position.x =
  -.65;

knife.add(blade);


const handle =
  new THREE.Mesh(
    new THREE.BoxGeometry(
      1.05,
      .22,
      .38
    ),
    new THREE.MeshStandardMaterial({
      color: 0x6d2946,
      roughness: .34
    })
  );


handle.position.x =
  .92;

knife.add(handle);

knife.rotation.z =
  -.65;

knife.rotation.y =
  -.18;


/* =====================================================
   FLOOR
===================================================== */

const floor =
  new THREE.Mesh(
    new THREE.CircleGeometry(
      4,
      64
    ),
    new THREE.MeshStandardMaterial({
      color: 0x321b43,
      transparent: true,
      opacity: .34,
      roughness: 1
    })
  );


floor.rotation.x =
  -Math.PI / 2;

floor.position.y =
  -.62;

floor.receiveShadow = true;

scene.add(floor);


/* =====================================================
   BALLOONS
===================================================== */

const balloonData = [];


const balloonColors = [
  0xff90af,
  0xffd28f,
  0xc99cff,
  0x8be1d4,
  0xfff1cf,
  0xe36f9b
];


function spawnBalloons(count = 35) {

  for (let i = 0; i < count; i++) {

    const group =
      new THREE.Group();


    const color =
      balloonColors[
        Math.floor(
          Math.random() *
          balloonColors.length
        )
      ];


    const balloon =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          .27 + Math.random() * .14,
          18,
          14
        ),
        new THREE.MeshStandardMaterial({
          color: color,
          roughness: .25,
          metalness: .05,
          transparent: true,
          opacity: .9
        })
      );


    balloon.scale.y =
      1.22;

    group.add(balloon);


    const knot =
      new THREE.Mesh(
        new THREE.ConeGeometry(
          .06,
          .14,
          8
        ),
        new THREE.MeshStandardMaterial({
          color: color,
          roughness: .45
        })
      );


    knot.rotation.x =
      Math.PI;

    knot.position.y =
      -.39;

    group.add(knot);


    const stringGeometry =
      new THREE.BufferGeometry()
        .setFromPoints([
          new THREE.Vector3(
            0,
            -.45,
            0
          ),
          new THREE.Vector3(
            .05,
            -1.1,
            0
          ),
          new THREE.Vector3(
            -.02,
            -1.65,
            0
          )
        ]);


    const string =
      new THREE.Line(
        stringGeometry,
        new THREE.LineBasicMaterial({
          color: 0xffe8df,
          transparent: true,
          opacity: .55
        })
      );


    group.add(string);


    group.position.set(
      (Math.random() - .5) * 9,
      -5 - Math.random() * 7,
      -2.5 + Math.random() * 5
    );


    group.scale.setScalar(
      .65 +
      Math.random() * .75
    );


    scene.add(group);


    balloonData.push({

      group: group,

      speed:
        .018 +
        Math.random() * .035,

      drift:
        (Math.random() - .5) * .008,

      phase:
        Math.random() *
        Math.PI *
        2,

      life:
        500 +
        Math.random() * 220

    });

  }

}


/* =====================================================
   CAKE ROTATION
===================================================== */

let targetRotation = 0;

let currentRotation = 0;

let dragging = false;

let pointerStartX = 0;

let rotationStart = 0;


canvas.addEventListener(
  "pointerdown",
  event => {

    dragging = true;

    pointerStartX =
      event.clientX;

    rotationStart =
      targetRotation;

    canvas.setPointerCapture(
      event.pointerId
    );

  }
);


canvas.addEventListener(
  "pointermove",
  event => {

    if (!dragging) return;

    targetRotation =
      rotationStart +
      (
        event.clientX -
        pointerStartX
      ) * .012;

  }
);


canvas.addEventListener(
  "pointerup",
  () => {
    dragging = false;
  }
);


canvas.addEventListener(
  "pointercancel",
  () => {
    dragging = false;
  }
);


/* =====================================================
   RESIZE
===================================================== */

function resizeRenderer() {

  const width =
    shell.clientWidth;

  const height =
    shell.clientHeight;


  renderer.setSize(
    width,
    height,
    false
  );


  camera.aspect =
    width / height;


  if (width < 650) {

    camera.position.set(
      0,
      3.5,
      10.7
    );

  } else {

    camera.position.set(
      0,
      3.5,
      8.8
    );

  }


  camera.updateProjectionMatrix();

}


window.addEventListener(
  "resize",
  resizeRenderer
);

resizeRenderer();


/* =====================================================
   CAKE RENDER LOOP
===================================================== */

const clock =
  new THREE.Clock();


let candleLit = true;

let cakeCut = false;


function renderCake() {

  requestAnimationFrame(
    renderCake
  );


  const time =
    clock.getElapsedTime();


  if (!dragging) {

    targetRotation += .0013;

  }


  currentRotation +=
    (
      targetRotation -
      currentRotation
    ) * .07;


  cakeRoot.rotation.y =
    currentRotation;


  /* Candle flicker */

  if (candleLit) {

    const flicker =
      1 +
      Math.sin(time * 17) * .07 +
      Math.sin(time * 29) * .035;


    flameGroup.scale.set(
      flicker,
      1 +
        Math.sin(time * 13) * .06,
      flicker
    );


    flameGroup.rotation.z =
      Math.sin(time * 8) * .06;


    candleLight.intensity =
      11 +
      Math.sin(time * 19) * 2.3;

  }


  /* Flame particles */

  flameParticles.forEach(
    (particle, index) => {

      if (!particle.visible) return;


      particle.position.y +=
        particle.userData.speed;


      particle.position.x +=
        Math.sin(
          time * 4 + index
        ) * .0015;


      particle.material.opacity -=
        .008;


      if (
        particle.material.opacity <= 0
      ) {

        particle.visible = false;

      }

    }
  );


  /* Balloons */

  for (
    let i = balloonData.length - 1;
    i >= 0;
    i--
  ) {

    const data =
      balloonData[i];


    data.group.position.y +=
      data.speed;


    data.group.position.x +=
      Math.sin(
        time * 1.2 +
        data.phase
      ) * .004 +
      data.drift;


    data.group.rotation.z =
      Math.sin(
        time * 1.7 +
        data.phase
      ) * .08;


    data.life--;


    if (
      data.group.position.y > 7 ||
      data.life <= 0
    ) {

      scene.remove(
        data.group
      );

      balloonData.splice(
        i,
        1
      );

    }

  }


  renderer.render(
    scene,
    camera
  );

}


renderCake();


/* =====================================================
   BLOW CANDLE
===================================================== */

document
  .getElementById("blowButton")
  .addEventListener(
    "click",
    function() {

      if (!candleLit) return;


      candleLit = false;

      this.disabled = true;

      this.textContent =
        "✨ Wish Made!";


      /* little flame particles */

      flameParticles.forEach(
        particle => {

          particle.visible = true;

          particle.material.opacity =
            .85;

          particle.position.set(
            (Math.random() - .5) * .16,
            Math.random() * .18,
            (Math.random() - .5) * .12
          );

        }
      );


      gsap.to(
        flameGroup.scale,
        {
          x: .05,
          y: .05,
          z: .05,

          duration: .65,

          ease: "power3.in",

          onComplete: () => {

            flameGroup.visible =
              false;

          }
        }
      );


      gsap.to(
        candleLight,
        {
          intensity: 0,
          duration: .6
        }
      );


      launchConfetti(320);

      spawnBalloons(35);

      showPig();

      showToast(
        "Wish made! ✨ Happy Birthday Pink Suar! 🐷💗"
      );

    }
  );


/* =====================================================
   CUT CAKE
===================================================== */

document
  .getElementById("cutButton")
  .addEventListener(
    "click",
    function() {

      if (cakeCut) return;


      cakeCut = true;

      this.disabled = true;

      this.textContent =
        "🍰 First Slice Cut!";


      knife.visible = true;


      knife.position.set(
        3.6,
        4.1,
        1.7
      );


      gsap.timeline({

        onComplete: () => {

          wholeCake.visible =
            false;

          cutCake.visible =
            true;


          gsap.fromTo(
            wedgeGroup.position,
            {
              x: 0,
              z: 0
            },
            {
              x:
                Math.sin(
                  cutAngle / 2
                ) * 1.35,

              z:
                Math.cos(
                  cutAngle / 2
                ) * 1.35,

              duration: 1,

              ease: "back.out(1.4)"
            }
          );


          gsap.to(
            knife.position,
            {
              x: 4.8,
              y: 1.2,

              duration: .75,

              ease: "power2.in",

              onComplete: () => {

                knife.visible =
                  false;

              }
            }
          );

        }

      })

      .to(
        knife.position,
        {
          x: .55,
          y: 2.3,
          z: .25,

          duration: .8,

          ease: "power3.out"
        }
      )

      .to(
        knife.rotation,
        {
          z: -1.28,

          duration: .45,

          ease: "power2.inOut"
        }
      )

      .to(
        knife.position,
        {
          y: .35,

          duration: .65,

          ease: "power2.in"
        }
      );


      launchConfetti(250);

      spawnBalloons(30);

      showPig();

      showToast(
        "First slice is for the Pink Suar! 🍰🐷"
      );

    }
  );


/* =====================================================
   FINAL SURPRISE
===================================================== */

document
  .getElementById("finalButton")
  .addEventListener(
    "click",
    function() {

      launchConfetti(450);

      spawnBalloons(45);

      showPig();

      setTimeout(
        showPig,
        700
      );

      setTimeout(
        showPig,
        1400
      );

      setTimeout(
        showPig,
        2100
      );


      showToast(
        "OINK OINK! Gunnu I love you yaar! 🐷💗"
      );

    }
  );