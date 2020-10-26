const fs = require('fs')
const superagent = require('superagent')
// superagent is used to make api call in node 
//superagent returns a promise
fs.readFile(__dirname + '/dog.txt', 'utf-8', (err, data) => {
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
