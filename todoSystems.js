/* eslint-disable */
function todoDraftingSystem (state, entity, event) {
  if (event.type !== Events.KeyPress) return
  if (!entity.components.draftTodo) return

  entity.state.value = entity.state.value || ""
  entity.state.value += event.key
}

function todoCreationSystem (state, entity, event) {
  if (event.type !== "todos.create") return

  const draftTodo = state.entities.filter(e => e.components.draftTodo)[0]
  const newTodo = Entity.create()

  newTodo.addComponent("todoListItem", true)
  newTodo.state.text = draftTodo.state.text
  newTodo.state.completed = false

  game.addEntity(newTodo)

  draftTodo.text = ""
}