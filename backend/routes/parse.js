import express from "express";
import { extractClasses } from "../parser/classExtractor.js";
import { parseMembers } from "../parser/memberParser.js";
import { parseAccess } from "../parser/accessParser.js";
import { parseModifiers } from "../parser/modifierParser.js";
import { countMethods } from "../parser/methodCounter.js";
import { calculateDepth } from "../parser/depthCalculator.js";
import { detectOrphans } from "../parser/orphanDetetctor.js";
import { collectErrors } from "../parser/errorCollector.js";

const router = express.Router();

//POST /api/parse

router.post("/",(req,res) => {
    try{
        const { code } = req.body;

        if(!code || typeof code  !== "string"){
            return res.status(400).json({error:"Java code string is required."});
        }

        //Extract all classes/Interfaces
        const classes = extractClasses(code);
        if (classes.length === 0){
            return res.status(422).json({error:"No classes found in the provided code"});
        }

        //filling each class with members,access,modifiers
        classes.forEach((cls) => {
            cls.methods = parseMembers(cls.body,"method");
            cls.fields = parseMembers(cls.body,"field");
            cls.accessModifier = parseAccess(cls.raw);
            cls.modifiers = parseModifiers(cls.raw);
            cls.methodCount = countMethods(cls.methods);
        });

        //calculate depth+detect orphans
        calculateDepth(classes);
        detectOrphans(classes);
        

        //Collect any parse errors/warnings
        const errors = collectErrors(classes,code);

        //react flow nodes
        const nodes = classes.map((cls,index) => ({
            id: cls.name,
            type: "classNode",
            position: {x:(index%4)*260,y: Math.floor(index/4)*200},
            data: {
                name: cls.name,
                type: cls.type,
                accessModifier: cls.accessModifier,
                modifiers: cls.modifiers,
                methods: cls.methods,
                fields: cls.fields,
                methodCount: cls.methodCount,
                depth: cls.depth,
                isOrphan: cls.isOrphan,
                parent: cls.parent || null,
                interfaces: cls.interfaces || [],
            },
        }));

        // react flow edges

        const edges = [];
        classes.forEach((cls) => {
            if (cls.parent) {
                edges.push({
                    id:`${cls.parent}->${cls.name}`,
                    source: cls.parent,
                    target: cls.name,
                    type: "smoothstep",
                    label: "extends",
                });
            }

            //interface edges
            (cls.interfaces || []).forEach((iface) => {
                edges.push({
                    id:`${iface}->${cls.name}`,
                    source: iface,
                    target: cls.name,
                    type:"smoothstep",
                    label: "implements",
                });
            });
        });

        return res.status(200).json({nodes,edges,classes,errors});
    } catch(err) {
        console.error("Parse Error ::",err.message);
        return res.status(500).json({error: "Failed to parse java code."});
    }
});

export default router;