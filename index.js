const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject(`Could not find that file!`); //whatever we pass into reject() function will be the error that we will pass on to the catch() method
            resolve(data); // whatever we pass into resolve() is the result of the promisse that will be available in the then handler When you read a file, you're retrieving data from the filesystem.
        });
    });
};

const writeFilePro = (file, data) => {
return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
        if(err) reject('Could not write the file');
        resolve(data);
    })
})  
} 

const getDogPic = async () => { 
    // This is an asynchronous function, meaning it runs in the background while other parts of the program continue executing in the event loop. 
    // It doesn't block the event loop while waiting for asynchronous operations to complete.
    try{
    // 1. Read file asynchronously
    const data = await readFilePro(`${__dirname}/dog.txt`); 
    // 'await' pauses the execution of this function until the Promise from readFilePro is resolved.
    // The rest of the code continues to run in the event loop while waiting.
    // Once resolved, the result (breed name from the file) is assigned to 'data'.
    console.log(`Breed: ${data}`);
    
    // 2. Fetch dog image asynchronously
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // Again, 'await' halts the function until the Promise from the API call is resolved.
    // When the result is received (a random dog image URL), it is stored in 'res'.
    console.log(res.body.message);
    
    // 3. Write the image URL to a file asynchronously
    await writeFilePro('dog-img.txt', res.body.message); 
    // 'await' ensures that the function pauses until the file writing Promise resolves.
    // The event loop continues running while the function waits, keeping the application responsive.
    console.log(`${data} image saved to file!`);
    }
    catch (err){
        throw(err);
    }
    return '2: Readyyy';
};

//Using iffy Pattern
(async () => {
    try{
        console.log('1: Will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics');
    }
    catch (err){
        console.log('ERRORRRR!!');
    }
})();

// Doesn't work bc since the getDog Pic is async and takes longer to execute, log 3 get's logged first (it's faster)
// console.log('1: Will get dog pics');
// getDogPic().then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pics');
// }).catch(err => {
//     console.log('ERROR!!!!');
// });





// //Creating a promise chain where data flows 
// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     })
//     .then(result => {
//         console.log(result.body.message);
//         return writeFilePro('dog-img.txt', result.body.message);
//     })
//     .then((data) => {
//         console.log(`${data} image saved to file!`);
//     })
//     .catch(err => {
//         console.log(err);
//     });


// //Using promises 
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);
    
//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then(result => {
//             console.log(result.body.message);
            
//             fs.writeFile('dog-img.txt', res.body.message, err  => {
//                 if(err) return console.log('err.message');
//                 console.log('Random dog image saved to file');
//             })
//         })
//         .catch(err => {
//             console.log(err.message);
//         });     
        
// })



// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             if(err) return console.log(err.message);
//             console.log(res.body.message);
            
//             fs.writeFile('dog-img.txt', res.body.message, err  => {
//                 if(err) return console.log('err.message');
//                 console.log('Random dog image saved to file');
//             })
//         });
// })