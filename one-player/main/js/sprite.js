//sprites

const background = new sprite({
  position: {
    x: background_use.position.x,
    y: background_use.position.y,
  },
  imageSrc: background_use.need.imgSrc,
  width: background_use.need.width,
  height: background_use.need.height,
});
const background1 = new sprite({
  position: {
    x: background_use.position.x + background_use.need.width,
    y: background_use.position.y,
  },
  imageSrc: background_use.need.imgSrc,
  width: background_use.need.width,
  height: background_use.need.height,
});
const background0 = new sprite({
  position: {
    x: background_use.position.x - background_use.need.width,
    y: background_use.position.y,
  },
  imageSrc: background_use.need.imgSrc,
  width: background_use.need.width,
  height: background_use.need.height,
});
if (background_use.need.Shop) {
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
const player = new Fighter({
  position: {
    x: 20,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: player_use.sprites.idle.imgSrc,
  framemax: player_use.sprites.idle.framemax,
  scale: player_use.scale,
  offset: {
    x: player_use.offset.x,
    y: player_use.offset.y,
  },
  health: 300,
  no: 300,
  damage: 4,
  sprites: {
    idle: {
      imageSrc: player_use.sprites.idle.imgSrc,
      framemax: player_use.sprites.idle.framemax,
    },
    run: {
      imageSrc: player_use.sprites.run.imgSrc,
      framemax: player_use.sprites.run.framemax,
    },
    jump: {
      imageSrc: player_use.sprites.jump.imgSrc,
      framemax: player_use.sprites.jump.framemax,
    },
    fall: {
      imageSrc: player_use.sprites.fall.imgSrc,
      framemax: player_use.sprites.fall.framemax,
    },
    attack2: {
      imageSrc: player_use.sprites.attack2.imgSrc,
      framemax: player_use.sprites.attack2.framemax,
    },
    attack1: {
      imageSrc: player_use.sprites.attack1.imgSrc,
      framemax: player_use.sprites.attack1.framemax,
    },
    takehit: {
      imageSrc: player_use.sprites.hit.imgSrc,
      framemax: player_use.sprites.hit.framemax,
    },
    death: {
      imageSrc: player_use.sprites.death.imgSrc,
      framemax: player_use.sprites.death.framemax,
    },
  },
  attackbox: {
    offset: {
      x: player_use.attackbox.offset.x,
      y: player_use.attackbox.offset.y,
    },
    width: player_use.attackbox.width,
    height: 50,
  },
});
