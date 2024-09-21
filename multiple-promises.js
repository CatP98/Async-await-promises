//Imagine yopu would want to get 3 images of dogs from the api, 
//if you just run 'const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); console.log(res.body.message)'
//3 times it wouldn't make much sense, bc there's no need for the promises to wait for each other, since they don't depend on each other
// Solution: not await for the Promise, but store the promise in a variable 
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject(`Could not find that file!`); 
            resolve(data); 
        });
    })
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
    try{
    
    const data = await readFilePro(`${__dirname}/dog.txt`); 
    console.log(`Breed: ${data}`);
    
    const res1Pro = superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    
    const res2Pro = superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
        `https://dog.ceo/api/breed/${data}/images/random`
    );
    
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]); 
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n')); // join -> joins the 3 strings into a new string 
    console.log(`${data} image saved to file!`);
    }
    catch (err){
        throw(err);
    }
    return '2: Readyyy';
};


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