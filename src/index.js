import { VirtualMachine } from './virtual_machine'
import Opcodes from './opcodes'

let vm = new VirtualMachine(
  Opcodes.Halt
)

vm.run()
