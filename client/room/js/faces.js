const wizard = [wizard_1, wizard_2];
const warrior = [warrior_1, warrior_2];
const samurai = [samurai_1, samurai_2];
const king = [king_1, king_2];
const fire = [fire_wizard_1, fire_wizard_2];
const evil = [evil_1, evil_2];
const knight = [knight_1, knight_2];
const goblin = [goblin_1, goblin_2];
const skeleton = [skeleton_1, skeleton_2];
const hunter = [hunter_1, hunter_2];
const el_crystal = [el_crystal_1, el_crystal_2];
const el_wind = [el_wind_1, el_wind_2];

function face_P(i) {
  if (opp_1.name === "wizard") {
    player_use = wizard[i];
  } else if (opp_1.name === "warrior") {
    player_use = warrior[i];
  } else if (opp_1.name === "samurai") {
    player_use = samurai[i];
  } else if (opp_1.name === "king") {
    player_use = king[i];
  } else if (opp_1.name === "Evil wizard") {
    player_use = evil[i];
  } else if (opp_1.name === "Knight") {
    player_use = knight[i];
  } else if (opp_1.name === "fire wizard") {
    player_use = fire[i];
  } else if (opp_1.name === "goblin") {
    player_use = goblin[i];
  } else if (opp_1.name === "skeleton") {
    player_use = skeleton[i];
  } else if (opp_1.name === "idk") {
    player_use = hunter[i];
  } else if (opp_1.name === "wind") {
    player_use = el_wind[i];
  } else if (opp_1.name === "crystal") {
    player_use = el_crystal[i];
  }

  player.sprites.idle.image.src = player_use.sprites.idle.imgSrc;
  player.sprites.run.image.src = player_use.sprites.run.imgSrc;
  player.sprites.jump.image.src = player_use.sprites.jump.imgSrc;
  player.sprites.fall.image.src = player_use.sprites.fall.imgSrc;
  player.sprites.attack2.image.src = player_use.sprites.attack2.imgSrc;
  player.sprites.attack1.image.src = player_use.sprites.attack1.imgSrc;
  player.sprites.death.image.src = player_use.sprites.death.imgSrc;
  player.sprites.takehit.image.src = player_use.sprites.hit.imgSrc;
  player.attackbox.offset.x = player_use.attackbox.offset.x;
}
