const fs = require('fs');
// const text = fs.readFileSync(__dirname + '/txt/input.txt', 'utf-8')

// fs.writeFile(__dirname + '/txt/output.txt', text, () => {
//     console.log('file written');
// })

// file system using asynchronours
fs.readFile(__dirname + '/txt/input.txt', (err, data) => {
    fs.writeFile(__dirname + '/txt/output1.txt', data.toString(), () => {
        console.log('file updated');
    })
})