HTMLCollection.prototype.toArray = 
NodeList.prototype.toArray = function() {
    return Array.prototype.map.call(this, item => item)
}

Array.prototype.delete = function(object) {
    return this.filter(el => el !== object);
}

Array.prototype.last = function() {
    return this[this.length-1]
}

Array.prototype.where = function(property, value) {
    return this.filter(item => item[property] == value);
}
