import VM from './vm'
import Opcodes from './opcodes'

let vm = new VM(
  Opcodes.Push, 2, Opcodes.Push, 3, Opcodes.Add
)

vm.run()
