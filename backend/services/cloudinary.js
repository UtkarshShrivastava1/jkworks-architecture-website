const cloudinary = require("cloudinary").v2;
const config = require("../config/config");

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Upload a file to Cloudinary
const uploadToCloudinary = async (localPath, folder = "default") => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      resource_type: "image", // You can also use "auto" if unsure
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    throw new Error("Cloudinary Upload Failed: " + err.message);
  }
};

// Delete an image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw new Error("Cloudinary Deletion Failed: " + err.message);
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
};
