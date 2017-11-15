const test = require('ava')
const Events = require('./Events')
const Entity = require('./Entity')
const Systems = require('./Systems')
const Game = require('./Game')

let game

test.beforeEach(() => {
  game = Game.create()
  Entity.resetCount()
})

test("add a system", t => {
  t.is(game.state.systems.length,
    0,
    "Expected systems to have length of 0")

  game.addSystem(Systems.textInput)

  t.is(game.state.systems.length,
    1,
    "Expected systems to have length of 1")
})

test("add an entity", t => {
  t.is(Object.keys(game.state.entities).length, 0)

  game.addEntity(Entity.create())

  t.is(Object.keys(game.state.entities).length, 1)
})

test("add a component", t => {
  const textInputEntity = Entity.create()

  t.is(textInputEntity.components.textInput,
    void 0,
    "Expected textInput component to be undefined")

  textInputEntity.addComponent("textInput", true)

  t.true(textInputEntity.components.textInput,
    "Expected textInput component to be true")
})

test("dispatch keyPress", t => {
  const textInputEntity = Entity.create()
      .addComponent("textInput", true)
      .addComponent("selection", true)

  const blankEntity = Entity.create()

  game
    .addEntity(textInputEntity)
    .addEntity(blankEntity)
    .addSystem(Systems.textInput)
    .addSystem(Systems.selection)

  t.is(textInputEntity.state.value,
    void 0,
    "Expected state.value to be undefined")

  t.is(blankEntity.state.value,
    void 0,
    "Expected state.value to be undefined")

  game.dispatch({
    type: Events.keyPress,
    key: "x"
  })

  t.is(textInputEntity.state.value,
    void 0,
    "Expected state.value to be undefined")

  game.dispatch({
    type: Events.select,
    id: textInputEntity.id
  })

  t.is(textInputEntity.state.selected, true)

  game.dispatch({ type: Events.keyPress, key: "x" })

  t.is(textInputEntity.state.value,
    "x",
    "Expected state.value to be x")

  game.dispatch({
    type: Events.keyPress,
    key: "p" 
  })

  t.is(textInputEntity.state.value,
    "xp",
    "Expected state.value to be xp")

  t.is(blankEntity.state.value,
    void 0,
    "Expected blankEntity state.value to be undefined")
})