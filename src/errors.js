export class VmError extends Error {}

export function assert(condition, message) {
  if (!condition) {
    throw new VmError(message)
  }
}