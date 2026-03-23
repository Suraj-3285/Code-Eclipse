const Modifiers = ["abstract","final","static","strictfp","synchronized"];

export function parseModifiers(raw){
    if(!raw) return [];
    const found = [];

    Modifiers.forEach((modifier) => {
        if(raw.includes(modifier)){
            found.push(modifier);
        }
    });
    return found;
}