export function detectOrphans(classes){
    //Building a set of all classes that are someone's parents
    const parentsSet = new Set();
    classes.forEach((cls) => {
        if(cls.parent) parentsSet.add(cls.parent);
        (cls.interfaces || []).forEach((iface) => parentsSet.add(iface));
    });

    classes.forEach((cls) => {
        const hasParent = !!cls.parent;
        const hasInterfaces = cls.interfaces && cls.interfaces.length > 0;
        const hasChildren = parentsSet.has(cls.name);

        cls.isOrphan = !hasParent && !hasInterfaces && !hasChildren;
    });
    return classes;
}