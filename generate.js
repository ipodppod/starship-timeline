const fs = require('fs')
const liquid = require('liquid')
const jsonfile = require('jsonfile')
const { date } = require('liquid/lib/liquid/standard_filters')
const engine = new liquid.Engine()
const template = fs.readFileSync('./source/index.liquid').toString()
const data = jsonfile.readFileSync('./data.json')

data.timeline.forEach(event => {
    event.date = new Date([event.year, event.month, event.day].join('-'))
})

engine
  .parseAndRender(template, data)
  .then(html => fs.writeFileSync('./public/index.html', html))
