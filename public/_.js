HTMLCollection.prototype.toArray = 
NodeList.prototype.toArray = function() {
    return Array.prototype.map.call(this, item => item)
}

Array.prototype.delete = function(object) {
    return this.filter(el => el !== object);
}
