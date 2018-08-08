import Opcodes from './opcodes'

class VmError extends Error {

}

export default class Vm {
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
    this.stack = []
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
    this.checkState(!this.halted, "VM is halted!")

    let nextOpcode = this.next("End of program")
    Opcodes.execute(nextOpcode, this)
    if (this.canStep()) {
      return true
    } else {
      this.halted = true
      return false
    }
  }

  checkState(condition, message) {
    if (!condition) {
      this.halted = true
      throw new VmError(message)
    }
  }

  next(message = "End of program") {
    this.checkState(this.ip < this.program.length, message)
    let nextWord = this.program[this.ip]
    this.ip += 1
    return nextWord
  }
}
