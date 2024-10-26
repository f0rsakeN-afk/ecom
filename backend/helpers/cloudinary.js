const cloudinary = require('cloudinary').v2;
const multer = require('multer')


console.log({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


cloudinary.config({
    cloud_name: 'dhnmjyd24',
    api_key: '155963819783853',
    api_secret: 'B95yhFuVz43llZwsrkJbnpoLYK0',
    secure: true
})




const storage = new multer.memoryStorage();


async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, { resource_type: 'auto' })
    return result;
}


const upload = multer({ storage });
module.exports = { upload, imageUploadUtil };