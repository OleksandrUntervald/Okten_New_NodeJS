// console.log("Hello from");
// console.log(__dirname);
// console.log()

// /////////////////////
//***** http *****//


// const http = require('node:http');
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type':'application/json'})
//
//     if (req.url === '/cars'){
//         switch (req.method){
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data:'my cars'
//                 }))
//             case 'POST':
//                 return res.end(JSON.stringify({
//                     data: 'Want to create car'
//                 }))
//         }
//     }
// })
// server.listen(5555);
// /////////////////

//***** path *****//

// import path from 'node:path'
// const filePath = path.join(process.cwd(), 'services', 'test.js');
// console.log(path.basename(filePath)); // остання частина шляху
// console.log(path.dirname(filePath)); // все окрім останньої
// console.log(path.extname(filePath)); // розширення файлу
// console.log(path.parse(filePath));  // object about way
// console.log(path.normalize(filePath)); //
// console.log(path.isAbsolute(filePath));



/////////////////////
// /////////////////

//***** readLine *****//

// const readLine = require('node:readline/promises');
//
// const start  = async () => {
//   const rlInterface = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//
//     const name = await rlInterface.question('what is your name ?');
//     const age = await rlInterface.question('what is your age ?');
//     console.log(`Hello, ${name} - ${age}`);
//     process.exit(0);
//
// }
//
// start()

///////////////////////
//
// //***** fs *****//

const afs = require('node:fs/promises');
const fs = require('node:fs');
const readLine = require('node:readline/promises');

const path = require('node:path');

const start = async () => {
    // await fs.mkdir(path.join('storage','files'), {recursive: true});
    const filePath = path.join('storage', 'adddd.txt')
    // await fs.writeFile(filePath, 'Hello\n');
    // await fs.appendFile(filePath, 'hello2\t');
    // const arrayBufferLikeBuffer = await fs.readFile(filePath, {encoding: 'utf-8'})
    // console.log(arrayBufferLikeBuffer);
    // await fs.rename(filePath, path.join(process.cwd(), 'storage', 'asd', 'myFile1.txt'))
    // await  fs.rename(filePath, path.join(path.dirname(filePath), 'adddd.txt'))
    // await fs.copyFile(filePath, path.join(path.dirname(filePath), 'MyFile1.txt'))
    // await fs.rm(path.join(process.cwd(), 'storage'), {recursive: true})
    // await fs.unlink('34.txt')
    // await fs.stat('services')

    // const fileStream = fs.createReadStream(filePath, 'utf-8')
    // const rl = readLine.createInterface({input: fileStream});
    // try {
    //     for await (const line of rl) {
    //         await afs.appendFile('res.txt', `${line}------\n`);
    //     }
    // } finally {
    //     await rl.close()
    // }

}

start()

// ///////////////////////
//
// //*****  *****//
//
//
// ///////////////////////
//
// //*****  *****//
//
//
// ///////////////////////
//
// //*****  *****//
//
//
// ///////////////////////
//
// //*****  *****//
//
//
// ///////////////////////
//
// //*****  *****//
//
//
// ///////////////////////
//
// //*****  *****//
//
//
// /////////////////////