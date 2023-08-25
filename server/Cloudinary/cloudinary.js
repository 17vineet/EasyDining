const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dedenmpd7',
    api_key: 663763467816195,
    api_secret: 'EC6PnOFOsz38Ccb3fFUHwofLrTE',

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sample',
        allowedFormats: ['jpg', 'jpeg', 'png']
        //   format: async (req, file) => ['jpeg','png','jpg'] // supports promises as well

    },
});

// Change parser.single('file') to parser.array('files', count)
const parser = multer({ storage: storage }).array('images', 5); // Upload up to 5 files
module.exports = { cloudinary, storage, parser };

// const parser = multer({ storage: storage });
// module.exports = { cloudinary, storage, parser };