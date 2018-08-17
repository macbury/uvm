import { assert } from './errors'

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
    assert(name != null, `Unknown opcode: ${opcode}`)
    return name
  }

  execute(opcode, vm) {
    let name = this.resolve(opcode)
    this.expressions[name](vm)
  }
}
//https://andreabergia.com/stack-based-virtual-machines-4/
const Opcodes = new OpcodesBuilder()

Opcodes.register('Halt', function(vm) {
  vm.halted = true
})

Opcodes.register('Push', function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
})

Opcodes.register('Add', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left + right)
})

Opcodes.register('Sub', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left - right)
})

Opcodes.register('Mul', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left * right)
})

Opcodes.register('Div', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left / right)
})

export default Opcodes