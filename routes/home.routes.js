const express=require('express');
const routes=express.Router();
const fileModel = require('../models/files.model'); 
const upload = require('../config/multer');
const authMiddleware=require('../middlewares/authe')




routes.get('/home', authMiddleware,async(req,res)=>{
    const userFiles=await fileModel.find({
        user:req.user.userId
    })
    res.render('home',{
        files:userFiles
    });
    
})

routes.post('/upload',authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const file = new  fileModel({
            originalName: req.file.originalname,
            storedName: req.file.filename,
            filePath: req.file.path,
            fileSize: req.file.size,
            fileType: req.file.mimetype,
            user:req.user.userId

        });
        await file.save();
        res.status(200).redirect(`${req.protocol}://${req.get('host')}/home`)
        
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
});


// routes.get('/download/:path',authMiddleware,async (req,res)=>{
//     const logInUser=req.user.userId;
//     const path=req.params.path;
//     const file=await fileModel.findOne({
//         user: logInUser,
//         path:path
//     })

//     const temp="../upload"+file.originalName;
//     console.log(file);
//     if (!file) {
//         return res.status(404).json({ message: 'File not found' });
//     }

//     res.download( temp, (err) => {
//         if (err) {
//             console.error('Error downloading file:', err);
//             return res.status(500).json({ message: 'Error downloading file' });
//         }
//     });
// })



module.exports=routes;