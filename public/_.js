HTMLCollection.prototype.toArray = 
NodeList.prototype.toArray = function() {
    return Array.prototype.map.call(this, item => item)
}
