var canPress = true;
var p1Jump = true;
var p2Jump = true;
window.addEventListener("keydown", (event) => {
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
        if (player.need.canJump) {
          if (p1Jump) {
            keys.w.pressed = true;
            p1.velocity.y = -15;
            p1Jump = false;
          }
        }
        break;
      case "s":
        if (canAttack_P) p1.attack1();
        break;
      case "e":
        if (player.need.twoAttack) {
          if (canAttack_P) p1.attack2();
        }
        break;
    }
  } else if (canPress === true && !EP) {
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
        if (enemy.need.canJump) {
          if (p2Jump) {
            keys.w.pressed = true;
            p2.velocity.y = -15;
            p2Jump = false;
          }
        }
        break;
      case "s":
        if (canAttack_E) p2.attack1();
        break;
      case "e":
        if (enemy.need.twoAttack) {
          if (canAttack_E) p2.attack2();
        }
        break;
    }
  }
});
window.addEventListener("keyup", (event) => {
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
