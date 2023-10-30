var playerNamee = document.querySelector("#player1_name");
var EnemyNamee = document.querySelector("#player2_name");
var btn = document.querySelector("#start");
var h = document.querySelector("h4");
var P_pre = document.querySelector("#player1");
var E_pre = document.querySelector("#player2");
var player = document.querySelectorAll(".P");
var enemy = document.querySelectorAll(".E");
var character = document.querySelector(".table");
var backgrounds = document.querySelector(".backgrounds");
var names = document.querySelector(".names");
var start = document.querySelector(".start");
var images = document.querySelectorAll(".images");
var next = document.getElementById("next");
var prev = document.getElementById("prev");

var background_use = background_2;

var playerid;
var enemyid;
var player_pre;
var enemy_pre;

var object_1;
var opp_1;
var object_2;
var opp_2;

var state;

if (localStorage.getItem("player1") === null) {
  opp_1 = wizard_1;
} else {
  object_1 = localStorage.getItem("player1");
  opp_1 = JSON.parse(object_1);
}
if (localStorage.getItem("player2") === null) {
  opp_2 = wizard_2;
} else {
  object_2 = localStorage.getItem("player2");
  opp_2 = JSON.parse(object_2);
}
const canvas = document.getElementById("canvas");
const C = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;
C.fillRect(0, 0, canvas.width, canvas.height);

var gravity = 0;

var background = new sprite({
  position: {
    x: background_use.position.x,
    y: background_use.position.y,
  },
  imageSrc: background_use.need.imgPre,
  width: background_use.need.width,
  height: background_use.need.height,
});

player_pre = new Fighter({
  position: {
    x: 20,
    y: 0,
  },
  imageSrc: opp_1.sprites.preview.imgSrc,
  framemax: opp_1.sprites.idle.framemax,
  scale: opp_1.scale,
  offset: {
    x: opp_1.offset.x,
    y: opp_1.offset.y,
  },
});
enemy_pre = new Fighter({
  position: {
    x: 500,
    y: 0,
  },
  imageSrc: opp_2.sprites.preview.imgSrc,
  framemax: opp_2.sprites.idle.framemax,
  scale: opp_2.scale,
  offset: {
    x: opp_2.offset.x,
    y: opp_2.offset.y,
  },
});
function refresh() {
  player_pre = new Fighter({
    position: {
      x: 100,
      y: 250,
    },
    imageSrc: opp_1.sprites.preview.imgSrc,
    framemax: opp_1.sprites.idle.framemax,
    scale: opp_1.scale,
    offset: {
      x: opp_1.offset.x,
      y: 220,
    },
  });
  enemy_pre = new Fighter({
    position: {
      x: 800,
      y: 250,
    },
    imageSrc: opp_2.sprites.preview.imgSrc,
    framemax: opp_2.sprites.idle.framemax,
    scale: opp_2.scale,
    offset: {
      x: 400,
      y: 220,
    },
  });
}
function animate() {
  window.requestAnimationFrame(animate);
  C.fillStyle = "rgba(184, 136, 4, 0.808)";
  C.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player_pre.update();
  enemy_pre.update();
}
animate();
setInterval(() => {
  refresh();
}, 1000);
function choose() {
  pop.style.animation = "choose 1s ease-out";
  setTimeout(() => {
    pop.style.animation = "unset";
  }, 2200);
}

window.onload = () => {
  localStorage.clear();
  window.screenY = 0;
  state = "char";
  character.style.display = "block";
  backgrounds.style.display = "none";
  names.style.display = "none";
  start.style.display = "none";
};

function go() {
  if (state === "char") {
    character.style.display = "none";
    backgrounds.style.display = "block";
    state = "back";
  } else if (state === "back") {
    backgrounds.style.display = "none";
    names.style.display = "block";
    start.style.display = "block";
    state = "name";
  }
}

function back() {
  if (state === "name") {
    backgrounds.style.display = "block";
    names.style.display = "none";
    start.style.display = "none";
    state = "back";
  } else if (state === "back") {
    character.style.display = "block";
    backgrounds.style.display = "none";
    state = "char";
  }
}

function choose1(element) {
  Array.from(player).forEach((child) => {
    Array.from(child.children).forEach((child) => {
      child.style.border = "unset";
    });
  });
  element.style.border = "5px solid #fff";
  playerid = element.id;
  if (playerid === "p1") {
    localStorage.setItem("player1", JSON.stringify(wizard_1));
  } else if (playerid === "p3") {
    localStorage.setItem("player1", JSON.stringify(warrior_1));
  } else if (playerid === "p5") {
    localStorage.setItem("player1", JSON.stringify(samurai_1));
  } else if (playerid === "p7") {
    localStorage.setItem("player1", JSON.stringify(king_1));
  } else if (playerid === "p13") {
    localStorage.setItem("player1", JSON.stringify(evil_1));
  } else if (playerid === "p15") {
    localStorage.setItem("player1", JSON.stringify(knight_1));
  } else if (playerid === "p9") {
    localStorage.setItem("player1", JSON.stringify(fire_wizard_1));
  } else if (playerid === "p17") {
    localStorage.setItem("player1", JSON.stringify(goblin_1));
  } else if (playerid === "p19") {
    localStorage.setItem("player1", JSON.stringify(skeleton_1));
  } else if (playerid === "p25") {
    localStorage.setItem("player1", JSON.stringify(el_crystal_1));
  } else if (playerid === "p27") {
    localStorage.setItem("player1", JSON.stringify(el_wind_1));
  }
  object_1 = localStorage.getItem("player1");
  opp_1 = JSON.parse(object_1);
  object_2 = localStorage.getItem("player2");
  opp_2 = JSON.parse(object_2);
}

function choose2(element) {
  Array.from(enemy).forEach((child) => {
    Array.from(child.children).forEach((child) => {
      child.style.border = "unset";
    });
  });
  element.style.border = "5px solid #fff";
  enemyid = element.id;
  if (enemyid === "p2") {
    localStorage.setItem("player2", JSON.stringify(wizard_2));
  } else if (enemyid === "p4") {
    localStorage.setItem("player2", JSON.stringify(warrior_2));
  } else if (enemyid === "p6") {
    localStorage.setItem("player2", JSON.stringify(samurai_2));
  } else if (enemyid === "p8") {
    localStorage.setItem("player2", JSON.stringify(king_2));
  } else if (enemyid === "p10") {
    localStorage.setItem("player2", JSON.stringify(fire_wizard_2));
  } else if (enemyid === "p14") {
    localStorage.setItem("player2", JSON.stringify(evil_2));
  } else if (enemyid === "p16") {
    localStorage.setItem("player2", JSON.stringify(knight_2));
  } else if (enemyid === "p18") {
    localStorage.setItem("player2", JSON.stringify(goblin_2));
  } else if (enemyid === "p20") {
    localStorage.setItem("player2", JSON.stringify(skeleton_2));
  } else if (enemyid === "p26") {
    localStorage.setItem("player2", JSON.stringify(el_crystal_2));
  } else if (enemyid === "p28") {
    localStorage.setItem("player2", JSON.stringify(el_wind_2));
  }
  object_1 = localStorage.getItem("player1");
  opp_1 = JSON.parse(object_1);
  object_2 = localStorage.getItem("player2");
  opp_2 = JSON.parse(object_2);
}

var choose3 = (element) => {
  Array.from(images).forEach((child) => {
    Array.from(child.children).forEach((child) => {
      child.style.border = "unset";
    });
  });
  element.style.border = "5px solid #fff";
  let background_id = element.id;
  if (background_id === "img1") {
    localStorage.setItem("background", JSON.stringify(background_1));
    background_use = background_1;
    background_use.need.imgSrc = "../img/img/background/background.jpg";
  } else if (background_id === "img2") {
    localStorage.setItem("background", JSON.stringify(background_2));
    background_use = background_2;
    background_use.need.imgSrc = "../img/img/background/background.png";
  } else if (background_id === "img3") {
    localStorage.setItem("background", JSON.stringify(background_3));
    background_use = background_3;
    background_use.need.imgSrc = "../img/img/background/Backgroundf.jpeg";
  } else if (background_id === "img4") {
    localStorage.setItem("background", JSON.stringify(background_6));
    background_use = background_6;
    background_use.need.imgSrc = "../img/img/background/lap.png";
  }else if (background_id === "img5") {
    localStorage.setItem("background", JSON.stringify(background_5));
    background_use = background_5;
    background_use.need.imgSrc = "../img/img/background/Image.png";
  }else if (background_id === "img6") {
    localStorage.setItem("background", JSON.stringify(background_4));
    background_use = background_4;
    background_use.need.imgSrc = "../img/img/background/bulkhead.png";
  }


  console.log(element.src);
};

btn.addEventListener("click", () => {
  if (
    localStorage.getItem("player1") !== null &&
    localStorage.getItem("player2") !== null &&
    localStorage.getItem("background") !== null
  ) {
    if (playerNamee.value !== "" && EnemyNamee.value !== "") {
      localStorage.setItem("p1_name", playerNamee.value);
      localStorage.setItem("p2_name", EnemyNamee.value);
      window.location.href = "./the main/index.html";
    } else {
      h.innerHTML = "⛔ Please enter your name !!!";

      h.style.opacity = 1;
    }
  } else {
    h.style.opacity = 1;

    h.innerHTML = "⛔ Please Enter EVERY thing!!!";
  }
});

console.log(player_pre, enemy_pre);
console.table(player_pre);
