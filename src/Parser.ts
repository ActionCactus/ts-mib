/**
 * Parses Management Information Base (MIB) in to a usable JSON data structure
 *
 * @class      Parser
 */
export class Parser
{
    parse(raw:string)
    {
        let tokenizer:Tokenizer = new Tokenizer()
        let lines:Array<String> = tokenizer.rawToArray(raw)

        let documentName:String = tokenizer.getMIBName(lines)
        console.log("Document name: " + documentName)
    }
}

/**
 * Used for simple tokenization of the MIB string
 *
 * @class      Tokenizer
 */
class Tokenizer
{
    rawToArray(raw:string):Array<String>
    {
        let usableRaw: String = new String(raw)

        return usableRaw.split("\n")
    }

    getMIBName(lines:Array<String>):String
    {
        var pattern:Array<Tokens> = [
            Tokens.CTYPE_ALNUM,
            Tokens.DEFINITIONS,
            Tokens.ASSIGN,
            Tokens.BEGIN
        ]

        let headerLine:Array<String> = lines[0].split(" ");

        // Validate
        for(let i = 0; i < pattern.length; i++){
            if(headerLine[i] == undefined){
                throw "Invalid MIB declaration!  Expecting: " + pattern.toString()
            }

            if(headerLine[i].search(pattern[i]) == -1){
                throw "Invalid MIB declaration!  Expecting " + pattern[i] + "; found " + headerLine[i]
            }
        }

        return headerLine[0]
    }
}

enum Tokens
{
    CTYPE_ALNUM = "[a-zA-Z0-9]",
    DEFINITIONS = "DEFINITIONS",
    ASSIGN = "::=",
    BEGIN = "BEGIN",
    COMMENT = "--",
    OBJ = "OBJECT-TYPE"
}