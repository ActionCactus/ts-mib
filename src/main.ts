import fs = require("fs");
import * as TS_MIB from "./Parser";

function loadContents(filePath: string): string
{
    return fs.readFileSync(filePath,'utf8');
}

let rawContents: string = loadContents('data/RFC1213-MIB.txt')

let Parser: TS_MIB.Parser = new TS_MIB.Parser();
let parsedMIB = Parser.parse(rawContents)