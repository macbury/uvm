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
})