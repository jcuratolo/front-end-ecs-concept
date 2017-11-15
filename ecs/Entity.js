let count = 0

class Entity {
  constructor() {
    count++
    this.id = count
    this.components = {}
    this.state = {}
  }

  addComponent(name, component) {
    this.components[name] = component
    return this
  }
}

const create = () => {
  return new Entity()
}

const resetCount = () => {
  count = 0
}

exports.create = create
exports.resetCount = resetCount