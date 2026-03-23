export function collectErrors(classes,code){
    const errors = [];
    const classMap = new Map();
    classes.forEach((cls) => classMap.set(cls.name,cls));

    classes.forEach((cls) => {
        // Missing Parent
        if(cls.parent && !classMap.has(cls.parent)){
            errors.push(`Class "${cls.name}" extends "${cls.parent}" but "${cls.parent}" was not found in the code.`);
        }

        //Missing Interfaces
        (cls.interfaces || []).forEach((iface) => {
            if(!classMap.has(iface)){
                errors.push(`Class "${cls.name}" implements "${iface}" but "${iface}" was not found in the code.`);
            }
        });
        //Empty Class
        const hasMembers = (cls.methods && cls.methods.length > 0) || (cls.fields && cls.fields.length > 0);

        if(!hasMembers){
            errors.push(`Class "${cls.name}" has no methods or fields.`);
        }
        //Circular Inheritance
        if(hasCircularInheritance(cls,classMap)){
            errors.push(`Circular inheritance detected at class "${cls.name}".`);
        }

        //Abstract class with no abstract methods
        if(cls.type === "abstract"){
            const hasAbstractMethod = (cls.methods || []).some((m) => m.isAbstract);
            if(!hasAbstractMethod){
                errors.push(`Abstract class "${cls.name}" has no abstract methods.`);
            }
        }

        //Interface with no methods
        if(cls.type === "interface" && (!cls.methods || cls.methods.length === 0))
            errors.push(`Interface "${cls.name}" has no methods defined.`);
    });

    return errors;
}

function hasCircularInheritance(cls,classMap,visited = new Set()){
    if(!cls.parent) return false;
    if(visited.has(cls.name)) return true;
    visited.add(cls.name);
    const parent = classMap.get(cls.parent);
    if(!parent) return false;
    return hasCircularInheritance(parent,classMap,visited);
}