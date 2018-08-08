import { expect } from 'chai'
import { withVM } from './helpers'
import Opcodes from '../src/opcodes'

describe('VM', function() {
  describe('opcodes', function() {
    it('Halt', withVM([Opcodes.Halt], function(vm) {
      expect(vm.step()).to.be.false
      expect(vm.ip).to.eq(1)
      expect(vm.halted).to.be.true
      expect(vm.stack).to.be.empty
    }))

    it('Push', withVM([Opcodes.Push, 2], function(vm) {
      expect(vm.step(), "to be final step").to.be.false
      expect(vm.ip).to.eq(2)
      expect(vm.halted, "not to be halted").to.be.false
      expect(vm.stack).to.deep.eq([2])
    }))

    describe('Add', function() {
      it('with two numbers on stack', withVM([Opcodes.Add], function(vm) {
        vm.stack = [2, 3]
        expect(vm.step(), "to be final step").to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted, "not to be halted").to.be.false
        expect(vm.stack).to.deep.eq([5])
      }))

      it('with less than two elements on stack', withVM([Opcodes.Add], function(vm) {
        vm.stack = [2]
        expect(vm.step, "throw error about bad stack").to.throw(Error)
      }))
    })
  })

  describe('simple program', function() {
    it('can sum two numbers', withVM([Opcodes.Push, 1, Opcodes.Push, 2, Opcodes.Add, Opcodes.Halt], function(vm) {
      vm.run()
      expect(vm.halted, "to be halted").to.be.true
      expect(vm.ip).to.eq(6)
      expect(vm.stack).to.deep.eq([3])
    }))
  })
})