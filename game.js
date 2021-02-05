const voxel = require('voxel')
const createGame = require('voxel-engine')
const player = require('voxel-player')
const walk = require('voxel-walk')
const highlight = require('voxel-highlight')
const fly = require('voxel-fly')

// start game
const defaults = {
    generate: voxel.generator['Valley'],
    chunkDistance: 2,
    materialFlatColor: true,
    worldOrigin: [0, 0, 0],
    materials: ["#fff", "#000", "#ff0000"],
    controls: { discreteFire: true },
    skyColor: 0xff0000, //0xff0000, 0x3EA78C
}

let game = createGame(defaults)
let container = document.body
game.appendTo(container)


// player
const createPlayer = player(game)
const avatar = createPlayer('player.png')
avatar.possess()
avatar.yaw.position.set(2, 14, 4)

const avatar2 = createPlayer('player.png')
avatar2.possess()
avatar2.yaw.position.set(2, 14, 4)

// global variable target controls
const target = game.controls.target()

// fly
const makeFly = fly(game)
game.flyer = makeFly(target)


// third person
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'R'.charCodeAt(0)) avatar2.toggle()
})


// motion
game.on('tick', function() {
  walk.render(target.playerSkin)
  let vx = Math.abs(target.velocity.x)
  let vz = Math.abs(target.velocity.z)
  if (vx > 0.001 || vz > 0.001) walk.stopWalking()
  else walk.startWalking()
})


// action item
let blockPosPlace
const hl = game.highlighter = highlight(game, { color: 0xff0000 })
hl.on('highlight', function (voxelPos) { blockPosPlace = voxelPos })


// action
game.on('fire', function (data, state) {
  game.setBlock(blockPosPlace, 0)
})
