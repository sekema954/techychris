require("dotenv").config();
const mongoose = require("mongoose");
const { cloudinary } = require("../middlewear/cloudinary");
const Blog = require("../models/blogs");

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {})
        .then(()=>{console.log('Connected to mongoDB')})
        .catch((Err)=>{console.error('Failed to connect to mongoDB', Err)})

    const blogs = await Blog.find({
      $or: [
        { thumbnail: { $regex: /^http:\/\/techychris/ } },
        { hero_image: { $regex: /^http:\/\/techychris/ } }
      ]
    });

    console.log(`Found ${blogs.length} blogs to migrate...`);

    for (const blog of blogs) {
      const updates = {};

      if (blog.thumbnail?.startsWith("http://techychris")) {
        const result = await cloudinary.uploader.upload(blog.thumbnail, {
          folder: "blogs",
          public_id: `thumbnail_${blog._id}`,
        });
        updates.thumbnail = result.secure_url;
        console.log(`✅ Thumbnail migrated for ${blog.title}`);
      }

      if (blog.hero_image?.startsWith("http://techychris")) {
        const result = await cloudinary.uploader.upload(blog.hero_image, {
          folder: "blogs",
          public_id: `hero_${blog._id}`,
        });
        updates.hero_image = result.secure_url;
        console.log(`✅ Hero migrated for ${blog.title}`);
      }

      if (Object.keys(updates).length > 0) {
        await Blog.findByIdAndUpdate(blog._id, updates);
      }
    }

    console.log("🎉 Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrateImages();
