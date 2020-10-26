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

// ## async await code 
async function getDogpic() {
    try {
        const data = await readfilepro(__dirname + '/dog.txt')
        console.log(data);

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
        console.log(res.body.message);

        await writefilepro('async/dog-img.txt', res.body.message)
        console.log('file written');
    }
    catch (err)  {
         console.log(err);
    }
}
getDogpic()

// return a new promise before calling them ,,which can we used by chaining
// readfilepro(__dirname + '/dog.txt')
//     .then(data => {
//         console.log(data);
//         //superagent return a promise
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
//     })
//     .then(res => {
//         console.log(res.body.message);
//         // return a promise
//         return writefilepro('async/dog-img.txt', res.body.message)
//     })
//     .then(() => {
//         console.log('file written');
//     })
//     .catch(err => {
//         return console.log(err);
//     })


