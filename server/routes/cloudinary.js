import express from 'express' ;

import { parser } from '../Cloudinary/cloudinary.js'
import { uploadImages, uploadThumbnail } from '../Cloudinary/controller.js';


const router = express.Router() ;

router.post('/images', parser, uploadImages) ;
router.post('/thumbnail', parser, uploadThumbnail) ;

export default router ;