import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const publisher = {
  subscribe: function (eventName, cache) {
    eventEmitter.on(eventName, payload => {
      this.cache[eventName] = cache(payload);
      // console.log("payload:", payload)
      // console.log("cache", this.cache)
    });
  },
  unsubscribe: function (eventName, fn) {
    eventEmitter.off(eventName, fn)
  },
  dispatch: function (eventName, payload) {
    eventEmitter.emit(eventName, payload);

    if (!this.cache[eventName]) {
      this.cache[eventName] = payload;
    }
  },
  getState: function (topic) {
    return this.cache[topic] || {};
  },
  cache: {}
}

export { publisher }