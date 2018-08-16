export default class Frame {
  variables = {}

  get(varNumber) {
    return this.variables[varNumber]
  }

  set(varNumber, value) {
    this.variables[varNumber] = value
  }
}