export function parseInheritance(classes){
    const classMap = new Map();
    classes.forEach((cls) => classMap.set(cls.name,cls));

    classes.forEach((cls) => {
        if(cls.parent){
            if(!classMap.has(cls.parent)){
                cls.parentMissing = true;
            }else{
                cls.parentMissing = false;
                const parent = classMap.get(cls.parent);
                if(!parent.children) parent.children = [];
                parent.children.push(cls.name);
            }
        }

        if(cls.interfaces && cls.interfaces.length > 0){
            cls.missingInterfaces = cls.interfaces.filter(
                (iface) => !classMap.has(iface)
            );

            cls.resolvedInterfaces = cls.interfaces.filter(
                (iface) => classMap.has(iface)
            );
        }else{
            cls.missingInterfaces = [];
            cls.resolvedInterfaces = [];
        }
    });
    return classes;
}