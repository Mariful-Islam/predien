import Review from "../../../models/Client";
import multer from "multer";
import connectToDatabase from "../../../lib/mongodb";
import nextConnect from "next-connect";


const upload = multer({
    dest: './pubic/upload',
    limits: 5 * 1024 * 1024
})

const handler = nextConnect()

handler.use(upload.single("image"))

handler.post(async (res, req)=>{
    try {
        const { clientName, clientImage, review, star } = req.body;

        if (!clientName || !clientImage || !review || !star || !req.file) {
            return res.status(400).json({ success: false, message: "All fields are required." });
          }
      
          // Validate the star rating (should be between 1 and 5)
        if (star < 1 || star > 5) {
        return res.status(400).json({ success: false, message: "Star rating must be between 1 and 5." });
        }

        const {db} = connectToDatabase()


        const {originalName, mimtype, size} = req.file
        const imageUrl = `/uploads/${req.file.filename}`;
        
        const newReview = new Review({
            clientName,
            clientImage,
            review,
            star,
            imageUrl,
            filename: originalname,
            mimetype,
            size,
        })

        await newReview.save()

        return res.status(200).json({ success: true, message: "Review uploaded successfully", data: newReview });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to upload review", error: error.message });
    }
})



export default handler