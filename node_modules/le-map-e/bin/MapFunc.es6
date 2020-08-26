'use strict';
module.exports = (() => {

    function _Map(key,value) {
        return new Map([[key,value]]);
    }

    Map.prototype.setOrPush = function (key, value) {
        if (this.has(key)) {
            let tmp = this.get(key);
            tmp.push(value);
            return this.set(key, tmp);
        }
        return this.set(key, value)
    };

    Map.prototype.setOrCombine = function (key, value) {
        if (this.has(key)) {
            return this.set(key, this.get(key).concat(value));
        }
        return this.set(key, value)
    };

    Map.prototype.last = function (removeFromMap) {
        let self = this;
        let lastItem = Array.from(self.entries());
        lastItem = lastItem.pop();
        if (removeFromMap) {
            this.delete(lastItem[0][0]);
        }
        return new Map([lastItem]);
    };

    Map.prototype.pop = function() {
        return this.last(true);
    };

    Map.prototype.sort = function() {
        return new Map(Array.from(this.entries()).sort());
    }
})();