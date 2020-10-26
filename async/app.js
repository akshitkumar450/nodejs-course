const fs = require('fs');
const superagent = require('superagent')

// building promise function
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

//************************************/
//## consuming promises using async await **************************//

//async function also returns a promise
async function getDogpic() {
    try {
        const data = await readfilepro(__dirname + '/dog.txt')
        console.log(data);

        // const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
        // console.log(res.body.message);

        //get 3 dog pics at same time..
        const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
        const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)
        const res3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `)

        const all = await Promise.all([res1, res2, res3])
        const imgs = all.map(el => el.body.message)
        console.log(imgs)

        // await writefilepro('async/dog-img.txt', res.body.message)
        await writefilepro('async/dog-img.txt', imgs.join('\n'))
        console.log('file written');
    }
    catch (err) {
        console.log(err);
        // to catch a error from async function we should throw an error ,then only while consuming promise catch will extract error,otherwise not
        throw (err)
    }
    // if a async function return something then it should be consume using then method bcz it retunrs a promise
    return 'three'
}


// general pattern consuming async fn is by usng IIFE

//## accessing the async fn by async await  ******************/

(async () => {
    try {
        console.log('one');
        const data = await getDogpic()
        console.log(data);
        console.log('two');
    } catch (err) {
        console.log("ERROR 💥");
    }
})()

//## accessing the async fn by then and catch ******************/

// console.log('one');
// getDogpic()
//     .then(data => {
//         console.log(data);
//     }).catch((err) => {
//         console.log("ERROR 💥");
//     })
// console.log('two');


//************************************/
//## consuming promises using then and catch **************************//


// readfilepro(__dirname + '/dog.txt')
//     .then(data => {
//         console.log(data);
//         //superagent return a promise
        // return a new promise before calling them ,,which can we used by chaining
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


