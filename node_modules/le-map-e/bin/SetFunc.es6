/**
 *  le-map-e
 * Author: michael
 * Date: 19.09.15.
 * License: MIT
 */
'use strict';
module.exports = (() => {

    function _Set (value) {
        return new Set([value]);
    }

    Set.prototype.deepMapAppendOrNew = function (key,value) {
        let self = this;
        if (self.size == 0) {
            return this.add(new Map([[key,value]]))
        }
        if (Array.from(self.last()).pop().has(key)) {
            return this.add(new Map([[key,value]]));
        }
        let tmp = Array.from(this.pop().keys());
        tmp = tmp.pop().set(key,value);
        return this.add(tmp);
    };

    Set.prototype.last = function(removeFromSet){
        let items =  Array.from(this.entries());
        let lastItem = items.pop();
        if (removeFromSet) {
            this.delete(lastItem[0]);
        }
        return new Set(lastItem);
    };

    Set.prototype.pop = function(){
        return this.last(true);
    }

})();