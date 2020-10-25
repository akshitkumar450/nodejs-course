const fs = require('fs');
const http = require('http')
const url = require('url')





//  FILE SYSTEM *****************************

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
// fs.readFile(__dirname + '/txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(__dirname + `/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(__dirname + '/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile(__dirname + '/txt/finalOut.txt', `${data2}\n ${data3}`, () => {
//                 console.log('file written');
//             })
//         })
//     })
// })
// console.log('reading files..');

//  HTTP SERVER *******************************

const srv = http.createServer((req, res) => {
    // console.log(req.url);
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('overview page')
    } else if (pathName === '/products') {
        res.end('products page')
    } else {
        // writeHead is used to  set status code
        res.writeHead(404, {
            'Content-type':'text/html'
        })
        res.end(`<h2>${req.url} could not found</h2>`)
    }
})
srv.listen(8000, () => {
    console.log('server started');
})