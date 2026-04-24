

const afs = require('node:fs/promises');
const fs = require('node:fs');
const readLine = require('node:readline/promises');
const path = require('node:path');

const start = async () => {

    const  sourceFilePath = path.join(process.cwd(), 'emails.txt');
    const targetFilePath = path.join(process.cwd(), 'gmails.txt')

    const fileStream = fs.createReadStream(sourceFilePath, 'utf-8');
    const rl = readLine.createInterface({input: fileStream});
    try {
        for await (const line of rl) {
         const email =  line.split('\t').splice(-1)[0];
         const domainName = email.split('@').splice(-1)[0];
         if (domainName === 'gmail.com'){
             await afs.appendFile(path.join(process.cwd(),'emails', `${domainName}.txt`),`${email}\n`);
         }
        }
    } finally {
         rl.close()
    }
}

start()
