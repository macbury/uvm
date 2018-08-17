import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('variables', function() {
    describe('Load', function() {
      it('push loaded value to stack', withVM([Opcodes.Load, 5], function(vm) {
        vm.frame.set(5, 'my value')
        expect(vm.step()).to.be.false
        expect(vm.ip).to.eq(2)
        expect(vm.halted).to.be.true
        expect(vm.stack.toArray()).to.deep.eq(['my value'])
      }))
    })

    describe('Store', function() {
      it('pop value from stack and store in frame', withVM([Opcodes.Store, 10], function(vm) {
        vm.stack.set([666])
        expect(vm.step()).to.be.false
        expect(vm.stack.toArray()).to.be.empty
        expect(vm.frame.get(10)).to.eq(666)
      }))
    })
  })
})