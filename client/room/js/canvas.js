// Canvas setup
const canvas = document.querySelector("canvas");
const C = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

// Input flags
var canPress = true;
var canAttack_P = true;
var canAttack_E = true;
var playerJump = true;
var enemyJump = true;
var player_onGround = true;
var enemy_onGround = true;

// Gravity
var gravity = 0.5;

const background = new sprite({
  position: {
    x: background_2.position.x,
    y: background_2.position.y,
  },
  imageSrc: background_2.need.imgSrc,
  width: background_2.need.width,
  height: background_2.need.height,
  scale: background_2.scale,
});

const background1 = new sprite({
  position: {
    x: background_2.position.x + background_2.need.width,
    y: background_2.position.y,
  },
  imageSrc: background_2.need.imgSrc,
  width: background_2.need.width,
  height: background_2.need.height,
  scale: background_2.scale,
});

const background0 = new sprite({
  position: {
    x: background_2.position.x - background_2.need.width,
    y: background_2.position.y,
  },
  imageSrc: background_2.need.imgSrc,
  width: background_2.need.width,
  height: background_2.need.height,
  scale: background_2.scale,
});

// Shop sprite
if (background_2.need.Shop) {
  var shop_put = new sprite({
    position: {
      x: 600,
      y: 129,
    },
    imageSrc: "../../img/img/shop.png",
    scale: 2.75,
    framemax: 6,
  });
}

// Fighter instances
var p1;
var p2;

// Start the game
function start() {
  p1 = new Fighter({
    position: {
      x: 20,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    imageSrc: player.sprites.idle.imgSrc,
    framemax: player.sprites.idle.framemax,
    scale: player.scale,
    offset: {
      x: player.offset.x,
      y: player.offset.y,
    },
    health: 300,
    no: 300,
    damage: 4,
    sprites: {
      idle: {
        imageSrc: player.sprites.idle.imgSrc,
        framemax: player.sprites.idle.framemax,
      },
      run: {
        imageSrc: player.sprites.run.imgSrc,
        framemax: player.sprites.run.framemax,
      },
      jump: {
        imageSrc: player.sprites.jump.imgSrc,
        framemax: player.sprites.jump.framemax,
      },
      fall: {
        imageSrc: player.sprites.fall.imgSrc,
        framemax: player.sprites.fall.framemax,
      },
      attack2: {
        imageSrc: player.sprites.attack2.imgSrc,
        framemax: player.sprites.attack2.framemax,
      },
      attack1: {
        imageSrc: player.sprites.attack1.imgSrc,
        framemax: player.sprites.attack1.framemax,
      },
      takehit: {
        imageSrc: player.sprites.hit.imgSrc,
        framemax: player.sprites.hit.framemax,
      },
      death: {
        imageSrc: player.sprites.death.imgSrc,
        framemax: player.sprites.death.framemax,
      },
    },
    attackbox: {
      offset: {
        x: player.attackbox.offset.x,
        y: 50,
      },
      width: player.attackbox.width,
      height: 50,
    },
  });
  p2 = new Fighter({
    position: {
      x: 600,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    color: "blue",
    imageSrc: enemy.sprites.idle.imgSrc,
    framemax: enemy.sprites.idle.framemax,

    scale: enemy.scale,
    offset: {
      x: enemy.offset.x,
      y: enemy.offset.y,
    },
    health: 300,
    no: 300,
    damage: 4,
    sprites: {
      idle: {
        imageSrc: enemy.sprites.idle.imgSrc,
        framemax: enemy.sprites.idle.framemax,
      },
      run: {
        imageSrc: enemy.sprites.run.imgSrc,
        framemax: enemy.sprites.run.framemax,
      },

      jump: {
        imageSrc: enemy.sprites.jump.imgSrc,
        framemax: enemy.sprites.jump.framemax,
      },
      fall: {
        imageSrc: enemy.sprites.fall.imgSrc,
        framemax: enemy.sprites.fall.framemax,
      },
      attack2: {
        imageSrc: enemy.sprites.attack2.imgSrc,
        framemax: enemy.sprites.attack2.framemax,
      },
      attack1: {
        imageSrc: enemy.sprites.attack1.imgSrc,
        framemax: enemy.sprites.attack1.framemax,
      },
      takehit: {
        imageSrc: enemy.sprites.hit.imgSrc,
        framemax: enemy.sprites.hit.framemax,
      },
      death: {
        imageSrc: enemy.sprites.death.imgSrc,
        framemax: enemy.sprites.death.framemax,
      },
    },
    attackbox: {
      offset: {
        x: enemy.attackbox.offset.x,
        y: 50,
      },
      width: enemy.attackbox.width,
      height: 50,
    },
  });
  animate();
}

// Key states
const keys = {
  a: { pressed: false },
  e: { pressed: false },
  w: { pressed: false },
  d: { pressed: false },
  s: { pressed: false },
};

// Function to send player positions to the server
function send() {
  socket.emit("positionUpdate", {
    p1X: p1.position.x,
    p2X: p2.position.x,
    p1Y: p1.position.y,
    p2Y: p2.position.y,
    b1: background1.position.x,
    b0: background0.position.x,
    b: background.position.x,
  });
}

// Event listener for position updates from the server
socket.on("Update", (e) => {
  // Update positions for players and backgrounds
  p1.position.x = e.allPosition.p1X;
  p2.position.x = e.allPosition.p2X;
  p1.position.y = e.allPosition.p1Y;
  p2.position.y = e.allPosition.p2Y;
  background0.position.x = e.allPosition.b0;
  background.position.x = e.allPosition.b;
  background1.position.x = e.allPosition.b1;

  // Update backgrounds and shop (if needed)
  background0.update();
  background.update();
  background1.update();
  if (background_2.need.Shop) {
    shop_put.update();
  }

  // Update players
  p1.update();
  p2.update();

  // Log updated positions
  console.log(e.allPosition);
});

// Function to handle player movement and animations
function animate() {
  window.requestAnimationFrame(animate);
  C.fillStyle = "black";
  C.fillRect(0, 0, canvas.width, canvas.height);

  // Update backgrounds and shop (if needed)
  background0.update();
  background.update();
  background1.update();
  if (background_2.need.Shop) {
    shop_put.update();
  }

  // Update players
  p1.update();
  p2.update();

  // Reset player velocities
  p1.velocity.x = 0;
  p2.velocity.x = 0;

  // Handle player movement
  switch (p1.lastkey) {
    case "a":
      // Handle left movement and scrolling
      handlePlayerMovement(p1, keys.a, "run", 40, "d", 5, -5);
      break;
    case "d":
      // Handle right movement and scrolling
      handlePlayerMovement(p1, keys.d, "run", 900, "a", -5, 5);
      break;
    default:
      // Default to idle sprite
      p1.switchsprite("idle");
  }

  // Handle player jump
  handlePlayerJump(p1, player);

  // Handle enemy movement
  switch (p2.lastkey) {
    case "a":
      // Handle left movement and scrolling for the enemy
      handlePlayerMovement(p2, keys.a, "run", 40, "d", 5, -5);
      break;
    case "d":
      // Handle right movement and scrolling for the enemy
      handlePlayerMovement(p2, keys.d, "run", 900, "a", -5, 5);
      break;
    default:
      // Default to idle sprite for the enemy
      p2.switchsprite("idle");
  }

  // Handle enemy jump
  handlePlayerJump(p2, enemy);

  // Handle player- enemy collision and attack
  handlePlayerEnemyCollision(p1, p2);

  // Check for missed attacks
  checkMissedAttack(p1);

  // Check for game end
  checkGameEnd(p1, p2);

  // Handle double jump
  handleDoubleJump(p1, 330, player_onGround);
  handleDoubleJump(p2, 330, enemy_onGround);
}

// Function to handle player movement
function handlePlayerMovement(
  player,
  key,
  runSprite,
  boundary,
  oppositeKey,
  scrollAmount,
  playerVelocity
) {
  if (key.pressed && player.position.x > boundary) {
    player.velocity.x = playerVelocity;
    player.switchsprite(runSprite);
    send();
  } else if (
    key.pressed &&
    background0.position.x <= 0 &&
    player.position.x <= 900
  ) {
    // Handle scrolling
    if (shop_put) {
      shop_put.position.x += scrollAmount;
    }
    background.position.x += scrollAmount;
    background1.position.x += scrollAmount;
    background0.position.x += scrollAmount;
    player.position.x += scrollAmount;
    send();
  } else {
    player.switchsprite("idle");
  }
}

// Function to handle player jump
function handlePlayerJump(player, playerConfig) {
  if (playerConfig.need.canJump) {
    if (player.velocity.y < 0) {
      player.switchsprite("jump");
    } else if (player.velocity.y > 0) {
      player.switchsprite("fall");
    }
  }
}

// Function to handle player-enemy collision and attack
function handlePlayerEnemyCollision(player, enemy) {
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isattacking &&
    player.framecurrent === 3
  ) {
    enemy.takehit();
    player.isattacking = false;
    gsap.to("#en-heal", { width: (100 * enemy.health) / enemy.no + "%" });
  }
}

// Function to check missed attacks
function checkMissedAttack(player) {
  if (player.isattacking && player.framecurrent === 3) {
    player.isattacking = false;
  }
}

// Function to check game end
function checkGameEnd(player1, player2) {
  if (player2.health <= 0 || player1.health <= 0) {
    determineWinner({ p1: player1, p2: player2, timeid });
    canPress = false;
  }
  if (player1.health <= 0) {
    player1.switchsprite("death");
  }
  if (player2.health <= 0) {
    player2.switchsprite("death");
  }
}

// Function to handle double jump
function handleDoubleJump(player, groundLevel, onGroundFlag) {
  if (player.position.y === groundLevel) {
    onGroundFlag = true;
  }

  if (!playerJump && player.velocity.y === 0 && onGroundFlag) {
    playerJump = true;
    onGroundFlag = false;
  }
}
