import connectToDatabase from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
    const {slug} = req.query
    if (req.method === 'GET') {
      try {
        await connectToDatabase();
        const blogs = await Blog.findOne({slug: slug});

        return res.status(200).json(blogs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
      }
    }else if (req.method === 'PUT') {
      try {
        await connectToDatabase();
        const updatedBlog = await Blog.findOneAndUpdate(
          { slug: slug },
          { $set: req.body },  // Update the fields with the new data from the request body
          { new: true } // Return the updated document
        );
  
        if (!updatedBlog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
  
        return res.status(200).json(updatedBlog);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to update project', error: error.message });
      }
    } else if (req.method === 'DELETE') {
      try {
        await connectToDatabase();
        const blogs = await Blog.deleteOne({slug: slug});

        return res.status(200).json(blogs);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to delte blog', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  