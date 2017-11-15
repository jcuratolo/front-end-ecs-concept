const {
  Game,
  Entity,
} = require('ecs')

const Events = {
  Tick: "TICK",
  KeyPress: "KEYPRESS"
}

const constants = {
  G: 9.8, // meters per second squard
  SimulationDeltaT: 1,
  RenderDeltaT: 15
}

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

document.body.appendChild(canvas)
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

const game = Game.create()
window.game = game
const physicsSystem = (state, dt, entity) => {
  if (!entity.components.position) return
  if (!entity.components.physics) return

  entity.state.vY += constants.G * dt

  entity.state.pX += entity.state.vX * dt
  entity.state.pY += entity.state.vY * dt
}

const canvasRenderingSystem = (state, dt, entity) => {
  if (!entity.components.position) return
  if (!entity.components.render) return
  
  game.state.renderCount += 1
  game.state.fps = game.state.renderCount / (game.state.timeStamp / 1000)

  /* eslint-disable */
  timeDisplay.innerHTML = game.state.timeStamp
  renderCountDisplay.innerHTML = game.state.renderCount
  fpsDisplay.innerHTML = game.state.fps
  /* eslint-enable */
  
  ctx.fillStyle = "black"
  ctx.fillRect(
    0,
    0, 
    canvas.width, 
    canvas.height
  )

  ctx.fillStyle = "red"
  ctx.fillRect(
    entity.state.pX,
    entity.state.pY,
    10,
    10
  )
}

const e = Entity.create()

e.addComponent("position", true)
e.addComponent("render", true)
e.addComponent("physics", true)
e.state = {
  vX: 0,
  vY: 0,
  pX: 0,
  pY: 0
}

game.addSystem(physicsSystem)
game.addSystem(canvasRenderingSystem)
game.addEntity(e)
game.state.time = 0
game.state.renderCount = 0
game.start()

/* eslint-disable */
tickButton
/* eslint-enable */
.addEventListener("click", function () {
  game.dispatch({
    type: Events.Tick,
    dt: constants.SimulationDeltaT
  })
})