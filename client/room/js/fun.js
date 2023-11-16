// Get DOM elements
var E_name = document.getElementById("Ename");
var P_name = document.getElementById("Pname");
var pop = document.querySelector("#endGame");

// Check language preference from local storage
var isAR = localStorage.getItem("arabic");

// Set player names in the HTML
P_name.innerHTML = name;
E_name.innerHTML = oppName;

// Function to check for rectangular collision between two sprites
function rectangularCollision({ rectangle1, rectangle2 }) {
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

// Function to determine the winner and display result
function determineWinner({ p1, p2, timeid }) {
  // Stop timer
  clearTimeout(timeid);

  // Display game result
  setTimeout(() => {
    pop.style.display = "flex";
  }, 1000);

  // Check winner based on health
  if (!isAR) {
    // English
    if (p1.health === p2.health) {
      document.querySelector("#result").innerHTML = "TIE";
    } else if (p1.health > p2.health) {
      document.querySelector("#result").innerHTML = PlayerName + " WIN";
    } else if (p1.health < p2.health) {
      document.querySelector("#result").innerHTML = EnemyName + " WIN";
    }
  } else {
    // Arabic
    if (p1.health === p2.health) {
      document.querySelector("#result").innerHTML = "تعادل";
    } else if (p1.health > p2.health) {
      document.querySelector("#result").innerHTML = PlayerName + " فاز";
    } else if (p1.health < p2.health) {
      document.querySelector("#result").innerHTML = EnemyName + " فاز";
    }
  }

  // Display result
  document.querySelector("#result").style.display = "flex";

  // Check for collision
  rectangularCollision;
}

// Function to close the form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// Timer variables
let time = 91;
let timeid;

// Function to decrease the timer
function decrease() {
  if (time > 0) {
    timeid = setTimeout(decrease, 1000);
    time--;
    document.querySelector("#timer").innerHTML = time;
  }
  if (time === 0) {
    determineWinner({ p1, p2, timeid });
    canPress = false;
  }
}

// Function to play again
function playAgain() {
  window.location.href = "index.html";
}

// Function to change character
function change() {
  window.location.href = "../choose.html";
}

// Change text based on language preference
if (isAR) {
  document.querySelector("#playagain").innerHTML = "العب مجددا";
  document.querySelector("#change").innerHTML = "تغير الشخصيه";
}
