var canPress = true;

window.addEventListener("keydown", (event) => {
  if (canPress === true) {
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