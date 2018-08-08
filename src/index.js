import VM from './vm'
import Opcodes from './opcodes'

let vm = new VM(
  Opcodes.Halt
)

vm.run()
