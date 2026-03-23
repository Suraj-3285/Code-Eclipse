export function extractClasses(code) {
    const classes = [];
    const classRegex = /(public|private|protected)?\s*(abstract\s+class|interface|class)\s+(\w+)\s*(extends\s+(\w+))?\s*(implements\s+([\w\s,]+))?\s*\{/g;

    let match;

    while((match = classRegex.exec(code)) !== null) {
        const fullMatch = match[0];
        const typeRaw = match[2].trim();
        const name = match[3];
        const parent = match[5] || null;
        const ifaceRaw = match[7] || "";

        const type = typeRaw === "interface"?"interface" : typeRaw === "abstract class"?"abstract":"class";

        const interfaces  = ifaceRaw ? ifaceRaw.split(",").map((i) => i.trim()).filter(Boolean) : [];

        const startIndex = classRegex.lastIndex -1;
        const body = extractBody(code,startIndex);

        classes.push({name,type,parent,interfaces,body,raw: fullMatch,});
    }

    return classes;
}

function extractBody(code,startIndex){
    let depth = 0;
    let i = startIndex;
    let body = "";
    while(i < code.length){
        const char = code[i];
        if(char==="{") depth++;
        if(char==="}"){
            depth--;
            if(depth===0) break;
        }
        body+=char;
        i++;
    }
    return body;
}