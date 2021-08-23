export class MapWithTimeout extends Map {
  constructor (persistenceTimeout) {
    super ();
    this.persistenceTimeout = persistenceTimeout;
  }
  set (key, value) {
    super.set (key, value);
    setTimeout (() => {
      this.delete (key);
    }, this.persistenceTimeout);
  }
}

export const memoize =
  (fn, cache = new Map ()) =>
    (...args) => {
      const inCache = cache.has (args);
      if (!inCache) {
        const value = fn (...args);
        cache.set (args, value);
      }
      return cache.get (args);
    };

export const memoizeCurry =
  (fn, cache = new Map ()) =>
    arg => {
      const inCache = cache.has (arg);
      if (!inCache) {
        const value = fn (arg);
        const result =
          typeof value === 'function' ? memoizeCurry (value, new Map ()) : value;
        cache.set (arg, result);
      }
      return cache.get (arg);
    };
