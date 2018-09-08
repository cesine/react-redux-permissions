/**
* An object walk callback.  Receives information about every non-object leaf
* of an object.
*
* @callback objectWalkCallback
* @param {Object} options
* Callback details
* @param {Mixed} [options.value] The value of the current leaf field
* @param {Object} [options.object] The object containing the key and value
* @param {String} [options.key] The key of the current value
* @param {String} [options.keyPath] The full deep keyPath of the current value
*/

/**
 * Helper function for walking an object recursively like a tree and collecting
 * information on every non-object leaf node.
 *
 * @example
 * const obj = {
 *   x: {
 *     y: {
 *       z: 'z'
 *     },
 *     f: () => {},
 *   },
 *   '0': 'number',
 * };
 * const walker = walkDeepObject(({ object, key, value, keyPath }) =>
 *   console.log(keyPath, value))
 * walker(obj);
 * => 'x.y.z z'
 * => 'x.f [Function]'
 * => '0 number'
 */
export const walkObject = (() => {
  /**
   * Helper function for generating deep keyPaths while walking object
   * @private
   *
   * @param {String|undefined} keyPath
   * The full keyPath
   *
   * @param {String} key
   * The current key
   *
   * @returns {String} the full keypath
   */
  function appendKey(keyPath, key) {
    if (keyPath === '') {
      return key;
    }
    return `${keyPath}.${key}`;
  }

  /**
   * @typedef {function} objectWalkFunction
   * @param {Object} The object to walk
   */

  /**
   * Creates an object walking function.
   *
   * @param {objectWalkCallback} callback
   * The callback that will receive information on every non-object leaf field
   *
   * @returns {objectWalkFunction}
   */
  return function objectWalkFactory(callback) {
    return function recurse(object, keyPath) {
      keyPath = keyPath || '';
      Object.keys(object).forEach(key => {
        const value = object[key];
        if (value != null && typeof value === 'object') {
          recurse(value, appendKey(keyPath, key));
        } else {
          callback({ value, object, keyPath: appendKey(keyPath, key), key });
        }
      });
    };
  }

})();

export const checkVisibility = (roles, allowed, except) => {
  if (except.length > 0 && except.some(elem => roles.indexOf(elem) > -1)) {
    return false
  }
  if (allowed.length > 0) {
    if (allowed.some(elem => roles.indexOf(elem) > -1)) {
      return true
    }
    return false
  }
  return true
}

export default {
  checkVisibility,
}
