export function calculateDepth(classes){
    const classMap = new Map();
    classes.forEach((cls) => classMap.set(cls.name,cls));

    function getDepth(cls,visited = new Set()){
        if(!cls.parent) return 0;
        if(visited.has(cls.name)){
            console.warn(`In depthCalculator, Circular inheritance detetced at : ${cls.name}`);
            return 0;
        }

        visited.add(cls.name);
        const parent = classMap.get(cls.parent);
        if(!parent) return 1;
        return 1+getDepth(parent,visited);
    }

    classes.forEach((cls) => {
        cls.depth = getDepth(cls);
    });
    return classes;
}