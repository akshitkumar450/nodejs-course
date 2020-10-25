const fs = require('fs');
// const text = fs.readFileSync(__dirname + '/txt/input.txt', 'utf-8')

// fs.writeFile(__dirname + '/txt/output.txt', text, () => {
//     console.log('file written');
// })

// file system using asynchronours
// fs.readFile(__dirname + '/txt/input.txt', 'utf-8', (err, data) => {
//     fs.writeFile(__dirname + '/txt/output2.txt', data.toString(), () => {
//         console.log('file updated');
//     })
// })

// deep dive in non blocking asynchronous code for file system
fs.readFile(__dirname + '/txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(__dirname + `/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(__dirname + '/txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile(__dirname + '/txt/finalOut.txt', `${data2}\n ${data3}`, () => {
                console.log('file written');
            })
        })
    })
})
console.log('reading files..');