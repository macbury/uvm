class StackOverflow extends Error {
  constructor() {
    super('Stack overflow error...')
  }
}

class StackUnderflow extends Error {
  constructor() {
    super('Stack underflow error...')
  }
}

class InvalidStackType extends Error {
  constructor(value, requiredType) {
    super(`Expected ${value} to be type of ${requiredType}`)
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
    this.list.push(obj)
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