import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        javaCode: {
            type: String,
            required: true,
        },

        nodes: [
            {
                id: String,
                type: String,
                position: {x : Number, y:Number},
                data: mongoose.Schema.Types.Mixed,
            },
        ],

        edges : [
            {
                id:String,
                source: String,
                target: String,
                type: String,
                label: String,
            },
        ],

        classes: [
            {
                name:String,
                type: String,
                accessModifier: String,
                parent: String,
                interfaces: [String],
                methods: [
                    {
                        name: String,
                        returnType: String,
                        access: String,
                        isStatic: Boolean,
                        isAbstract: Boolean,
                    },
                ],
                fields: [
                    {
                        name: String,
                        type: String,
                        access: String,
                        isStatic: Boolean,
                    },
                ],
                depth: Number,
                isOrphan: Boolean,
            },
        ],
        errors: [String],
    },
    {timestamps : true}
);

const Project = mongoose.model("Project",projectSchema);
export default Project;