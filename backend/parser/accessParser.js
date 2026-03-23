export function parseAccess(raw){
    if(!raw) return "package";
    if(raw.includes("public")) return "public";
    if(raw.includes("private")) return "private";
    if(raw.includes("protected")) return "protected";

    return "package";
}