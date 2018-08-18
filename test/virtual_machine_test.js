import { expect } from 'chai'
import { withVM } from './helpers'
import Opcodes from '../src/opcodes'

describe('VirtualMachine', function() {
  describe('simple program', function() {
    it('can sum two numbers', withVM([Opcodes.Push, 1, Opcodes.Push, 2, Opcodes.Add, Opcodes.Halt], function(vm) {
      vm.run()
      expect(vm.halted, "to be halted").to.be.true
      expect(vm.ip).to.eq(6)
    }))

    it('it halts without halt', withVM([Opcodes.Push, 2, Opcodes.Push, 2], function(vm) {
      vm.run()
      expect(vm.halted, "to be halted").to.be.true
      expect(vm.ip).to.eq(4)
      expect(vm.stack.toArray()).to.deep.eq([2, 2])
    }))
  })

  describe('set ip', function() {
    it('allows to set number', withVM([1,2,3], function(vm) {
      vm.ip = 1
    }))

    it('throws error if address is outside of program', withVM([], function(vm) {
      expect(() => vm.ip = 1000).to.throw(/Address 1000 is outside of program/)
    }))

    it('throws error if setting something other than number', withVM([], function(vm) {
      expect(() => vm.ip = 'blow this').to.throw(/Address blow this is invalid/)
    }))
  })
  
})