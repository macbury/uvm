class OpcodesBuilder {
  expressions = {}
  index = 0
  indexToName = {}

  register(name, expression) {
    this.expressions[name] = expression
    this[name] = this.index
    this.indexToName[this.index] = name
    this.index += 1
  }

  /**
  * Resolve instruction name
  * @param {Integer} opcode 
  * @return {String} instruction name
  */
  resolve(opcode) {
    let name = this.indexToName[opcode]
    if (name == null) {
      throw `Unknown opcode: ${opcode}`
    }
    return name
  }

  execute(opcode, vm) {
    let name = this.resolve(opcode)
    this.expressions[name](vm)
  }
}

const Opcodes = new OpcodesBuilder()

Opcodes.register('Halt', function(vm) {
  vm.halted = true
})

Opcodes.register('Push', function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
})

Opcodes.register('Add', function(vm) {
  vm.checkState(vm.stack.length >= 2, "There should be two values on stack to perform Add")
  let right = vm.stack.pop()
  let left = vm.stack.pop()
  vm.stack.push(left + right)
})

Opcodes.register('Sub', function(vm) {
  vm.checkState(vm.stack.length >= 2, "There should be two values on stack to perform Sub")
  let right = vm.stack.pop()
  let left = vm.stack.pop()
  vm.stack.push(left - right)
})

export default Opcodes