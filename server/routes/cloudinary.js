import express from 'express' ;

import { parser } from '../Cloudinary/cloudinary.js'
import { uploadImages, uploadThumbnail,deleteImage, deleteAllImages } from '../Cloudinary/controller.js';


const router = express.Router() ;

router.post('/images', parser, uploadImages) ;
router.post('/thumbnail', parser, uploadThumbnail) ;
router.post('/deleteImage',deleteImage)
router.post('/deleteAllImages',deleteAllImages)

export default router ;