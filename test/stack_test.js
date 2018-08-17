import { expect } from 'chai'
import Stack from '../src/stack'

describe('Stack', function () {
  describe('#push', function() {
    it('adds element to stack', function() {
      let stack = new Stack()
      stack.push(2)
      expect(stack.toArray()).to.deep.eq([2])
    })

    it('throw stack overflow', function() {
      let stack = new Stack(2)
      stack.set([1,2])
      expect(() => stack.push(2)).to.throw(/Stack overflow error/)
    })
  })
  
  describe('#pop', function() {
    it('removes element from stack', function() {
      let stack = new Stack()
      stack.set([1])
      expect(stack.pop()).to.eq(1)
    })

    it('throw stack underflow', function() {
      let stack = new Stack()
      expect(() => stack.pop()).to.throw(/Stack underflow error/)
    })
  })

  describe('#popNumber', function() {
    it('returns number', function() {
      let stack = new Stack()
      stack.set([1])
      expect(stack.popNumber()).to.eq(1)
    })

    it('throws error for other type', function() {
      let stack = new Stack()
      stack.set(['1'])
      expect(() => stack.popNumber()).to.throw(/Expected.+/)
    })
  })
})
