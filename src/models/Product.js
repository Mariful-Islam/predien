import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,

})



const Project = mongoose.models.Product || mongoose.model('Product', productSchema)

// module.exports = Project
export default Project