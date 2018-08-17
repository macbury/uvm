class UndefinedVariable extends Error {
  constructor() {
    super('Could not find variable in frame')
  }
}

export default class Frame {
  variables = {}

  get(varNumber) {
    if (this.variables[varNumber] == null) {
      throw new UndefinedVariable()
    }
    return this.variables[varNumber]
  }

  set(varNumber, value) {
    this.variables[varNumber] = value
  }
}