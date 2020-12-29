const fs = require('fs')
const liquid = require('liquid')
const jsonfile = require('jsonfile')
const engine = new liquid.Engine()
const template = fs.readFileSync('./source/index.liquid').toString()
const data = jsonfile.readFileSync('./data.json')

data.events.forEach(event => {
    event.date = new Date(event.date)
});

engine
  .parseAndRender(template, data)
  .then(html => fs.writeFileSync('./public/index.html', html))
