export function countMethods(methods){
    if(!methods || !Array.isArray(methods)) return 0;
    return methods.length;
}