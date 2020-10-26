const fs = require('fs');
const superagent = require('superagent')

function readfilepro(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('i could not find the file')
            resolve(data)
        })
    })
}

function writefilepro(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject(' could not write file')
            resolve('file written')
        })
    })
}
// return a new promise before calling them ,,which can we used by chaining
readfilepro(__dirname + '/dog.txt')
    .then(data => {
        console.log(data);
        //superagent return a promise
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
    })
    .then(res => {
        console.log(res.body.message);
        // return a promise
        return writefilepro('async/dog-img.txt', res.body.message)
    })
    .then(() => {
        console.log('file written');
    })
    .catch(err => {
        if (err) return console.log(err);
    })


