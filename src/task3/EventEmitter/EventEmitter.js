class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Array();
    }
    this.listeners[eventName].push(fn);
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceFn = (data) => {
      fn(data);
      this.removeListener(eventName, onceFn);
    }
    this.addListener(eventName, onceFn);
  }

  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((listener) => {
        listener(...args);
      });
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName] : [];
  }
}

module.exports = EventEmitter;