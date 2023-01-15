import { Router } from 'express';
import categoryController from './app/models/controllers/categoryController';
import productController from './app/models/controllers/productController';
import multer, { diskStorage } from 'multer';
import path from 'node:path';
import orderController from './app/models/controllers/orderController';

const router = Router();
const upload = multer({
	storage: diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()} - ${file.originalname}`)
		},
	})
});

//List categories
router.get('/categories', categoryController.list);

//Create categories
router.post('/categories', categoryController.create);

// List products
router.get('/products', productController.list);

// Create product
router.post('/products', upload.single('image'), productController.create);

// Get products by category
router.get('/categories/:categoryId/products', productController.listByCategory);

// Create orders
router.post('/orders', orderController.createOrder);

// List orders
router.get('/orders', orderController.list);

// Change order status
router.patch('/orders/:orderId', orderController.updateOrderStatus);

// Delete order
router.delete('/orders/:orderId', orderController.deleteOrder);

export default router;