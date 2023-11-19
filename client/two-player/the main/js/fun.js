var E_name = document.getElementById("Ename");
var P_name = document.getElementById("Pname");

var pop = document.querySelector("#endGame");

var object_1 = localStorage.getItem("player1");
var opp_1 = JSON.parse(object_1);
var object_2 = localStorage.getItem("player2");
var opp_2 = JSON.parse(object_2);

var background_get = localStorage.getItem("background");
var background_use = JSON.parse(background_get);

var isAR = localStorage.getItem("arabic");

P_name.innerText = localStorage.getItem("p1_name").toUpperCase();
E_name.innerText = localStorage.getItem("p2_name").toUpperCase();

PlayerName = localStorage.getItem("p1_name").toUpperCase();
EnemyName = localStorage.getItem("p2_name").toUpperCase();

function retangularcollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackbox.position.x + rectangle1.attackbox.width >=
      rectangle2.position.x &&
    rectangle1.attackbox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackbox.position.y + rectangle1.attackbox.height >=
      rectangle2.position.y &&
    rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timeid }) {
  clearTimeout(timeid);
  setTimeout(() => {
    pop.style.display = "flex";
  }, 1000);
  if (!isAR) {
    if (player.health === enemy.health) {
      document.querySelector("#result").innerText = "TIE";
      document.querySelector("#result").style.display = "flex";
    } else if (player.health > enemy.health) {
      document.querySelector("#result").innerText = PlayerName + " WIN";
      document.querySelector("#result").style.display = "flex";
    } else if (player.health < enemy.health) {
      document.querySelector("#result").innerText = EnemyName + " WIN";
      document.querySelector("#result").style.display = "flex";
    }
  } else {
    if (player.health === enemy.health) {
      document.querySelector("#result").innerText = "تعادل";
      document.querySelector("#result").style.display = "flex";
    } else if (player.health > enemy.health) {
      document.querySelector("#result").innerText = PlayerName + " فاز";
      document.querySelector("#result").style.display = "flex";
    } else if (player.health < enemy.health) {
      document.querySelector("#result").innerText = EnemyName + " فاز";
      document.querySelector("#result").style.display = "flex";
    }
  }

  retangularcollision;
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
let time = 91;
let timeid;
function decrease() {
  if (time > 0) {
    timeid = setTimeout(decrease, 1000);
    time--;
    document.querySelector("#timer").innerText = time;
  }
  if (time === 0) {
    determineWinner({ player, enemy, timeid });
    canPress = false;
  }
}

function playAgain() {
  window.location.href = "index.html";
}
function change() {
  window.location.href = "../choose.html";
}

if (isAR) {
  document.querySelector("#playagain").innerText = "العب مجددا";
  document.querySelector("#change").innerText = "تغير الشخصيه";
}
