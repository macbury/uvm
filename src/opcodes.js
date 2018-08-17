import OpcodesBuilder from './opcode_builder'

//https://andreabergia.com/stack-based-virtual-machines-4/
const Opcodes = new OpcodesBuilder()
export default Opcodes

Opcodes.register('Halt', function(vm) {
  vm.halted = true
})

Opcodes.register('Push', function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
})

Opcodes.register('Pop', function(vm) {
  vm.stack.pop()
})

Opcodes.register('Dup', function(vm) {
  vm.stack.push(vm.stack.peek())
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

Opcodes.register('Not', function(vm) {
  let value = vm.stack.popBoolean()
  vm.stack.push(!value)
})

Opcodes.register('And', function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left && right)
})

Opcodes.register('Or', function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left || right)
})
