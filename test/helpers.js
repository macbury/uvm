import VM from '../src/vm'

export function withVM(instructions, callback) {
  return function(done) {
    let vm = new VM(instructions)
    callback(vm)
    done()
  }
}