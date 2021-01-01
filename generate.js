const fs = require('fs')
const liquid = require('liquid')
const jsonfile = require('jsonfile')
const sort = require('sort-array')
const engine = new liquid.Engine()
const data = jsonfile.readFileSync('./data.json')
const filesystem = new liquid.LocalFileSystem('./source/snippets', 'liquid');

data.events.forEach(event => {
    event.date = new Date(event.date);
    event.id = Math.random();
});

sort(data.events, { by: 'date' });

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

const snippets = {};
fs.readdirSync(filesystem.root).forEach(file => {
    snippets[file.replace('.liquid', '')] = fs.readFileSync(filesystem.root+'/'+file).toString()
})

const context = {
    timeline: data,
    snippets: snippets
}

engine.registerFileSystem(filesystem)

fs.readdirSync('./source').forEach(file => {
    if (file.endsWith('.liquid')) {
        const template = fs.readFileSync('./source/'+file).toString()
        engine
          .parseAndRender(template, context)
          .then(html => fs.writeFileSync('./public/'+file.replace('liquid', 'html'), html))
    }
})
