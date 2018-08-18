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

    describe('Jmp', function() {
      it('set ip to address', withVM([Opcodes.Push, 1, Opcodes.Jmp, 0], function(vm) {
        vm.step()
        expect(vm.ip).to.eq(2)
        vm.step()
        expect(vm.ip).to.eq(0)
      }))

      it('throws error if trying to jump to something other than address', withVM([Opcodes.Jmp, 'sss'], function(vm) {
        expect(() => vm.step()).to.throw(/Address sss is invalid/)
      }))
    })
  })
})