import Opcodes from './opcodes'

export default class VM {
  /**
  * Instruction pointer
  */
  ip = 0
  stack = []
  program = []
  halted = false

  constructor(...instructions) {
    this.program = instructions
    this.ip = 0
    this.stack = []
  }

  /**
  * Run program execution until its halted
  */
  run() {
    while(!this.halted) {
      this.step()
    }
  }

  /**
  * Step to next instruction
  */
  step() {
    this._checkState(!this.halted)

    let nextInstruction = this._getNextWordFromProgram("Should have a next instruction")
    this._decodeInstruction(nextInstruction)
  }

  _checkState(condition, message) {
    if (condition) {
      this.halted = true
      throw message
    }
  }

  _getNextWordFromProgram(message) {
    this._checkState(this.ip >= this.program.length)
    let nextWord = this.program[this.ip]
    this.ip += 1;
    return nextWord
  }

  _decodeInstruction(instruction) {
    switch(instruction) {
      default:
        throw `Unknown instruction: ${instruction}`
        this.halted = true
      case Opcodes.Halt:
        this.halted = true
        break
      case Opcodes.Push:
        let value = this._getNextWordFromProgram("Should have the value after the PUSH instruction")
        this.stack.push(value)
      break
      case Opcodes.Add:
        this._checkState(this.stack.length >= 2, "There should be two values on stack to perform ADD")
        let a = this.stack.pop()
        let b = this.stack.pop()
        this.stack.push(a + b)
      break
    }
  }
}
