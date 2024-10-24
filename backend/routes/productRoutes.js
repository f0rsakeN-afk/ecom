const express = require('express')
const router = express.Router();


const { handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct } = require('../controllers/productController')
const { upload } = require('../helpers/cloudinary')


router.post('/upload-image', upload.single('my_file'), handleImageUpload)


router.route('/').get(fetchAllProducts).post(addProduct);


router.route('/:id').patch(editProduct).delete(deleteProduct)


module.exports = router;