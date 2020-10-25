const fs = require('fs');
const text = fs.readFileSync(__dirname + '/txt/input.txt', 'utf-8')

fs.writeFile(__dirname + '/txt/output.txt', text, () => {
    console.log('file written');
})
