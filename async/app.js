const fs = require('fs')
const superagent = require('superagent')
// superagent is used to make api call in node 
fs.readFile(__dirname + '/dog.txt', 'utf-8', (err, data) => {
    console.log(data);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random `).end((err, res) => {
        console.log(res.body.message);
        fs.writeFile('dog-img.txt', res.body.message, (err) => {
            console.log('file written');
        })
    })
})
