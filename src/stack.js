class StackError extends Error {

}

class StackOverflow extends StackError {
  constructor() {
    super('Stack overflow error...')
  }
}

class StackUnderflow extends StackError {
  constructor() {
    super('Stack underflow error...')
  }
}

class InvalidStackType extends StackError {
  constructor(value, requiredType) {
    super(`Expected ${value} to be type of ${requiredType}`)
  }
}

class InvalidPushType extends StackError {
  constructor() {
    super('You can only push number and string to stack')
  }
}

export default class Stack {
  list = []

  constructor(maxSize = 255) {
    this.maxSize = maxSize
  }

  push(obj) {
    if ((this.list.length + 1) >= this.maxSize) {
      throw new StackOverflow()
    }
    if (typeof(obj) == 'boolean') {
      this.list.push(obj ? 1 : 0)
    } else if (typeof(obj) == 'number' || typeof(obj) == 'string') {
      this.list.push(obj)
    } else {
      throw new InvalidPushType()
    }
  }

  pop() {
    if (this.list.length <= 0) {
      throw new StackUnderflow()
    }
    return this.list.pop()
  }

  popNumber() {
    let value = this.pop()
    if (typeof(value) == 'number') {
      return value
    } else {
      throw new InvalidStackType(value, 'number')
    }
  }

  popBoolean() {
    let value = this.popNumber()
    return value !== 0
  }

  set(newList) {
    this.list = newList
  }

  size() {
    return this.list.length
  }

  toArray() {
    return this.list.slice()
  }
}