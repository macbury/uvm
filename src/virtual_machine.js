import Opcodes from './opcodes'
import Frame from './frame'
import Stack from './stack'
import { assert } from './errors'

export class VirtualMachine {
  /**
  * Instruction pointer
  */
  ip = 0
  stack = []
  program = []
  halted = false

  constructor(instructions) {
    this.program = instructions
    this.ip = 0
    this.stack = new Stack()
    this.frame = new Frame()
  }

  /**
  * Run program execution until its halted
  */
  run() {
    while(this.step()) {}
  }

  canStep() {
    return !this.halted && this.ip < this.program.length
  }

  /**
  * Step to next instruction
  */
  step() {
    assert(!this.halted, "VM is halted!")

    let nextOpcode = this.next("End of program")
    Opcodes.execute(nextOpcode, this)
    if (this.canStep()) {
      return true
    } else {
      this.halted = true
      return false
    }
  }

  next(message = "End of program") {
    assert(this.ip < this.program.length, message)
    let nextWord = this.program[this.ip]
    this.ip += 1
    return nextWord
  }
}
