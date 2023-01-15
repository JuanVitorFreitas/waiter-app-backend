import { Request, Response } from "express";
import { io } from "../../..";
import { Order } from '../Order';

export default {
	async list(req: Request, res: Response) {
		try {
			const { table, products } = req.body;

			const orders = await Order.find().sort({
				createdAt: 'asc',
			}).populate('products.product');

			return res.json(orders)

		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	},

	async createOrder(req: Request, res: Response) {
		try {
			const { table, products } = req.body;

			const order = await Order.create({
				table,
				products,
			});

			const orderDetails = await order.populate('products.product');

			io.emit('order@new', orderDetails);

			return res.json(order);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	},

	async updateOrderStatus(req: Request, res: Response) {
		try {
			const { orderId } = req.params;
			const { status } = req.body;

			if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
				res.status(400).json({ message: 'Status not accepted' })
			}

			await Order.findOneAndUpdate({ id: orderId }, { status });

			return res.sendStatus(201);

		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	},

	async deleteOrder(req: Request, res: Response) {
		try {
			const { orderId } = req.params;

			await Order.findByIdAndDelete(orderId);
			return res.sendStatus(204);

		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	}
}