import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('logic', function() {
    describe('Not', function() {
      it('unary is not true', withVM([Opcodes.Not], function(vm) {
        vm.stack.set([1])
        expect(vm.step()).to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted).to.be.true
        expect(vm.stack.toArray()).to.deep.eq([0])
      }))

      it('unary is not false', withVM([Opcodes.Not], function(vm) {
        vm.stack.set([0])
        expect(vm.step()).to.be.false
        expect(vm.stack.toArray()).to.deep.eq([1])
      }))

      it('requires one element on stack', withVM([Opcodes.Not], function(vm) {
        expect(() => vm.step()).to.throw(/Stack underflow error/)
      }))

      it('element on stack must be a number', withVM([Opcodes.Not], function(vm) {
        vm.stack.set(['yolo'])
        expect(() => vm.step()).to.throw(/Expected yolo to be type of number/)
      }))
    })
  })
})