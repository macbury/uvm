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