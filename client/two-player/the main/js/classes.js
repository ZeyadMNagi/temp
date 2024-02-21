// Define a sprite class for game objects
class sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framemax = 1,
    offset = { x: 0, y: 0 },
  }) {
    // Initialize sprite properties
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framemax = framemax;
    this.framecurrent = 1;
    this.framelapsed = 0;
    this.framehold = 5;
    this.offset = offset;
  }

  // Draw the sprite on the canvas
  draw() {
    C.drawImage(
      this.image,
      this.framecurrent * (this.image.width / this.framemax),
      0,
      this.image.width / this.framemax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framemax) * this.scale,
      this.image.height * this.scale
    );

    // Draw health bar if it's an enemy sprite
    if (this.enemy) {
      C.fillStyle = "red";
      C.fillRect(this.position.x, this.position.y - 40, this.no, 10);

      C.fillStyle = "green";
      C.fillRect(this.position.x, this.position.y - 40, this.health, 10);
    }
  }

  // Animate the sprite frames
  animateframe() {
    this.framelapsed++;

    if (this.framelapsed % this.framehold === 0) {
      if (this.framecurrent < this.framemax - 1) {
        this.framecurrent++;
      } else {
        this.framecurrent = 0;
      }
    }
  }

  // Update the sprite
  update() {
    this.draw();
    this.animateframe();
  }
}

// Define a Fighter class that extends the Sprite class
class Fighter extends sprite {
  constructor({
    position,
    velocity = { x: 0, y: 0 },
    color = "red",
    imageSrc,
    scale = 1,
    framemax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackbox = { offset: {}, width: undefined, height: undefined },
    enemy,
    health,
    no,
    damage,
  }) {
    // Call the constructor of the base class (Sprite)
    super({
      position,
      imageSrc,
      scale,
      framemax,
      offset,
    });

    // Initialize fighter-specific properties
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastkey = "";
    this.attackbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackbox.offset,
      width: attackbox.width,
      height: attackbox.height,
    };
    this.color = color;
    this.isattacking = false;
    this.health = health;
    this.framecurrent = 0;
    this.framelapsed = 0;
    this.framehold = 5;
    this.sprites = sprites;
    this.dead = false;
    this.enemy = enemy;
    this.no = no;
    this.damage = damage;

    // Load images for all sprites in the fighter
    for (const Sprite in this.sprites) {
      sprites[Sprite].image = new Image();
      sprites[Sprite].image.src = sprites[Sprite].imageSrc;
    }
  }

  // Update the fighter's state
  update() {
    this.draw();
    if (!this.dead) this.animateframe();

    this.attackbox.position.x = this.position.x + this.attackbox.offset.x;
    this.attackbox.position.y = this.position.y + this.attackbox.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Apply gravity
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 97) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += gravity;
  }

  // Execute the second attack animation
  attack2() {
    this.switchsprite("attack2");
    this.isattacking = true;
  }

  // Execute the first attack animation
  attack1() {
    this.switchsprite("attack1");
    this.isattacking = true;
  }

  // Execute the take-hit animation and update health
  takehit() {
    this.switchsprite("takehit");

    this.health -= this.damage;

    if (this.health <= 0) {
      this.switchsprite("death");
    } else this.switchsprite("takehit");
  }

  // Switch the current sprite to a specified sprite
  switchsprite(sprite) {
    // If the current sprite is the death sprite and the last frame is reached, mark the fighter as dead
    if (this.image === this.sprites.death.image) {
      if (this.framecurrent === this.sprites.death.framemax - 1)
        this.dead = true;
      return;
    }

    // Return if the current sprite is still animating
    if (
      this.image === this.sprites.attack1.image &&
      this.framecurrent < this.sprites.attack1.framemax - 1
    )
      return;
    if (
      this.image === this.sprites.attack2.image &&
      this.framecurrent < this.sprites.attack2.framemax - 1
    )
      return;

    if (
      this.image === this.sprites.takehit.image &&
      this.framecurrent < this.sprites.takehit.framemax - 1
    )
      return;

    // Switch to the specified sprite based on the given sprite name
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framemax = this.sprites.idle.framemax;
          this.framecurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framemax = this.sprites.run.framemax;
          this.framecurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framemax = this.sprites.jump.framemax;
          this.framecurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framemax = this.sprites.fall.framemax;
          this.framecurrent = 0;
        }
        break;
      case "attack2":
        if (this.image !== this.sprites.attack2.image) {
          this.image = this.sprites.attack2.image;
          this.framemax = this.sprites.attack2.framemax;
          this.framecurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framemax = this.sprites.attack1.framemax;
          this.framecurrent = 0;
        }
        break;
      case "takehit":
        if (this.image !== this.sprites.takehit.image) {
          this.image = this.sprites.takehit.image;
          this.framemax = this.sprites.takehit.framemax;
          this.framecurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framemax = this.sprites.death.framemax;
          this.framecurrent = 0;
        }
        break;
    }
  }
}
