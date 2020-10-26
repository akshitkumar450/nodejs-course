const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent')

function readfilepro(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('i could not find the file')
            resolve(data)
        })
    })
}

readfilepro(__dirname + '/dog.txt').then(data => {
    console.log(data);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random `)
        .then(res => {
            console.log(res.body.message);
            fs.writeFile('dog-img.txt', res.body.message, (err) => {
                console.log('file written');
            })
        })
        .catch(err => {
            if (err) return console.log(err.message);
        })
})

