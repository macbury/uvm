import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('flow', function() {
    it('Halt', withVM([Opcodes.Halt], function(vm) {
      expect(vm.step()).to.be.false
      expect(vm.ip).to.eq(1)
      expect(vm.halted).to.be.true
      expect(vm.stack.toArray()).to.be.empty
    }))
  })
})