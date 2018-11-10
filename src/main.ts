import fs = require("fs");


function loadContents(filePath: string): string
{
    return fs.readFileSync(filePath,'utf8');
}

let rawContents: string = loadContents('data/RFC1213-MIB.txt')

console.log(rawContents)