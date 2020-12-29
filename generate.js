const fs = require('fs')
const liquid = require('liquid')
const jsonfile = require('jsonfile')
const engine = new liquid.Engine()
const template = fs.readFileSync('./source/index.liquid').toString()
const data = jsonfile.readFileSync('./data.json')
const filesystem = new liquid.LocalFileSystem('./source/templates', 'liquid');

data.events.forEach(event => {
    event.date = new Date(event.date);
    event.id = Math.random();
});

engine.registerFilters({
    json: input => {
        return JSON.stringify(input)
    },
    unique: input => {
        return input.filter((value, index) => {
            return input.indexOf(value) === index;
        })
    }
})

const templates = {};
fs.readdirSync(filesystem.root).forEach(file => {
    templates[file.replace('.liquid', '')] = fs.readFileSync(filesystem.root+'/'+file).toString()
})

const context = {
    timeline: data,
    templates: templates
}

engine.registerFileSystem(filesystem)

engine
  .parseAndRender(template, context)
  .then(html => fs.writeFileSync('./public/index.html', html))
