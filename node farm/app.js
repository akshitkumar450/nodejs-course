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
const tempOverview = fs.readFileSync(__dirname + '/templates/template-overview.html', 'utf-8')
const tempCard = fs.readFileSync(__dirname + '/templates/template-card.html', 'utf-8')
const tempProduct = fs.readFileSync(__dirname + '/templates/template-product.html', 'utf-8')

const data = fs.readFileSync(__dirname + '/dev-data/data.json', 'utf-8')

// array of all the products
const productDataObj = JSON.parse(data)

function changeProductData(temp, product) {
    let output = temp.replace(/{product name}/g, product.productName)
    output = output.replace(/{price}/g, product.price)
    output = output.replace(/{qty}/g, product.quantity)
    output = output.replace(/{product place}/g, product.from)
    output = output.replace(/{nutrients}/g, product.nutrients)
    output = output.replace(/{description}/g, product.description)
    output = output.replace(/{Id}/g, product.id)
    output = output.replace(/{image}/g, product.image)

    if (!product.organic)
        output = output.replace(/{not-organic}/g, 'not-organic')

    return output
}



const srv = http.createServer((req, res) => {
    // console.log(req.url);
    // const pathName = req.url;
    // console.log(req.url);
    // console.log(url.parse(req.url, true));

    //destructing syntax
    const { pathname, query } = url.parse(req.url, true)

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        //join is used to convert an array to string
        const cardHtml = productDataObj.map(el => changeProductData(tempCard, el)).join('')
        const output = tempOverview.replace(/{card holder}/g, cardHtml)
        res.end(output)

    } else if (pathname === '/products') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const product = productDataObj[query.id]
        const output = changeProductData(tempProduct, product)
        res.end(output)
    }
    else if (pathname === '/api') {
        // accessing the json file 

        // we should read file only once..bcz when evr we hit this route file we read all the times which makes our code slow
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)

    } else {
        // writeHead is used to  set status code
        res.writeHead(404, {
            'Content-type': 'text/html'
        })
        res.end(`<h2>${req.url} could not found</h2>`)
    }
})

srv.listen(8000, () => {
    console.log('server started');
})