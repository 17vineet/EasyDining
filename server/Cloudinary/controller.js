import { cloudinary } from './cloudinary.js';

export const uploadImages = async (req, res) => {
    const uploadedFiles = req.files;

    // Handle each uploaded file
    const img_urls = [];
    const promises = uploadedFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result.secure_url);
        img_urls.push(result.secure_url);
    });

    // Wait for all uploads to complete
    Promise.all(promises)
        .then(() => {
            res.json({ img_urls });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred during upload' });
        });
};

export const uploadThumbnail = async (req, res) => {
    const uploadedFiles = req.files;

    // Handle each uploaded file
    const img_urls = [];
    const promises = uploadedFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        console.log(result.secure_url);
        img_urls.push(result.secure_url);
    });

    // Wait for all uploads to complete
    Promise.all(promises)
        .then(() => {
            res.json({ img_urls });
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred during upload' });
        });
};

export const deleteImage = async (req, res) => {
    const {img_url}=req.body
    const publicId=getPublicIdFromImageUrl(img_url);
    console.log(publicId)
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        res.json({ message: 'Image deleted successfully', result });
      } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Error deleting image' });
      }


    
};

function getPublicIdFromImageUrl(imageUrl) {
    // Use a more flexible regular expression to match the public ID
    const regex = /\/v\d+\/([\w_\-\/]+)/;
    const match = imageUrl.match(regex);
  
    if (match) {
      const publicId = match[1];
      return publicId;
    }
  
    return null;
  }