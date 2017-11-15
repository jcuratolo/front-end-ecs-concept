class Game {
  constructor() {
    this.state = {
      timeStamp: 0,
      lastUpdateTimeStamp: 0,
      config: {},
      entities: {},
      events: [],
      systems: []
    }
  }

  dispatch(event) {
    this.state.events.push(event)
  }

  update(timeStamp) {
    // console.group("UPDATE")
    // console.log(state.entities)

    let length = this.state.systems.length

    this.state.timeStamp = timeStamp
    this.state.deltaTime = 1 / 60
    this.state.lastUpdateTimeStamp = timeStamp

    for (let i = 0; i < length; i++) {
      for (let id in this.state.entities) {
        let entity = this.state.entities[id]
        this.state.systems[i](
          this.state,
          this.state.deltaTime,
          entity
        )
      }
    }
    // console.groupEnd()
  }

  start() {
    const u = (timeStamp) => {
      this.update(timeStamp)
      requestAnimationFrame(u)
    }

    this.state.timeStamp = 0

    u(this.state.timeStamp)
  }

  addEntity(entity) {
    this.state.entities[entity.id] = entity
    return this
  }

  addSystem(system) {
    this.state.systems.push(system)
    return this
  }
}

const create = () => {
  return new Game()
}

exports.create = create