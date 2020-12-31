const jsonfile = require('jsonfile')
const sort = require('sort-array')

const file = './data.json'
const data = jsonfile.readFileSync(file)

sort(data.events, { by: 'date' });
jsonfile.writeFileSync(file, data, { spaces: 4, EOL: '\n', finalEOL: false });