const Events = require('./Events')

const selection = (state, event, entity) => {
  if (event.type !== Events.select) return
  if (!entity.components.selection) return
  
  event.id === entity.id ?
    entity.state.selected = true :
    entity.state.selected = false
}

const textInput = (state, event, entity) => {
  if (!entity.components.textInput) return
  if (!entity.state.selected) return

  entity.state.value = entity.state.value || ""
  entity.state.value += event.key
}

exports.textInput = textInput
exports.selection = selection