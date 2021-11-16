import ee from 'eventemitter3'

// this emitter is used to show a loading animation for axios requests.
// events are emitted in _api/index.js via axios intercepters,
//  and can be listened to in any component

const eventEmitter = new ee()

const Emitter = {
	on: (e, fn) => eventEmitter.on(e, fn),
	once: (e, fn) => eventEmitter.once(e, fn),
	off: (e, fn) => eventEmitter.off(e, fn),
	emit: (e, fn) => eventEmitter.emit(e, fn),
}

// prevent new properties being added
Object.freeze(Emitter)

export default Emitter
