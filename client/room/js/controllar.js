var canPress = true;
var p1Jump = true;
var p2Jump = true;

// Event listener for keydown events
window.addEventListener("keydown", (event) => {
  // Check if it's player 1's turn
  if (canPress === true && EP) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        p1.lastkey = "d";
        canAttack_P = false;
        face_P(0);
        break;
      case "a":
        keys.a.pressed = true;
        p1.lastkey = "a";
        canAttack_P = false;
        face_P(1);
        break;
      case "w":
        // Check if player 1 can jump and hasn't jumped yet
        if (player.need.canJump && p1Jump) {
          keys.w.pressed = true;
          p1.velocity.y = -15;
          p1Jump = false;
        }
        break;
      case "s":
        // Attack 1 for player 1
        if (canAttack_P) p1.attack1();
        break;
      case "e":
        // Check if player 1 has two attacks and can perform the second attack
        if (player.need.twoAttack && canAttack_P) p1.attack2();
        break;
    }
  } else if (canPress === true && !EP) {
    // Player 2's turn
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        p2.lastkey = "d";
        canAttack_P = false;
        face_E(0);
        break;
      case "a":
        keys.a.pressed = true;
        p2.lastkey = "a";
        canAttack_E = false;
        face_E(1);
        break;
      case "w":
        // Check if player 2 can jump and hasn't jumped yet
        if (enemy.need.canJump && p2Jump) {
          keys.w.pressed = true;
          p2.velocity.y = -15;
          p2Jump = false;
        }
        break;
      case "s":
        // Attack 1 for player 2
        if (canAttack_E) p2.attack1();
        break;
      case "e":
        // Check if player 2 has two attacks and can perform the second attack
        if (enemy.need.twoAttack && canAttack_E) p2.attack2();
        break;
    }
  }
});

// Event listener for keyup events
window.addEventListener("keyup", (event) => {
  // Common keyup actions for both players
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      canAttack_P = true;
      break;
    case "a":
      keys.a.pressed = false;
      canAttack_P = true;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
});
