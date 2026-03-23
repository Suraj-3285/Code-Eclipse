import express from "express";
import multer from "multer";

const router  = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5*1024*1024},
    fileFilter: (req,file,cb) => {
        if(!file.originalname.endsWith(".java")) {
            return cb(new Error("Only .java files are allowed."));
        }
        cb(null,true);
    },
});

//POST /api/upload
router.post("/",upload.single("file"),(req,res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: "No file uploaded."});
        }

        const code = req.file.buffer.toString("utf-8");

        if(!code.trim()) {
            return res.status(422).json({error: "Uploaded file is empty."});
        }

        return res.status(200).json({
            code,
            filename: req.file.originalname,
            size: req.file.size,
        });
    } catch(err) {
        console.error("[Upload Error]",err.message);
        return res.status(500).json({error:"File upload failed."});
    }
});

router.use((err,req,res,next) => {
    if(err instanceof multer.MulterError){
        return res.status(400).json({error : `Multer error: ${err.message}`});
    }
    if(err) {
        return res.status(400).json({error : err.message});
    }
    next();
});

export default router;