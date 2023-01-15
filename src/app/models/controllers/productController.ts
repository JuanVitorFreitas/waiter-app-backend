import { Product } from './../Product';
import { Request, Response } from "express";

export default {
	async list(req: Request, res: Response) {
		const products = await Product.find();
		res.json(products);
	},

	async create(req: Request, res: Response) {
		try {
			const { name, description, price, ingredients, category } = req.body;
			const imagePath = req.file?.filename;

			const product = await Product.create({
				name,
				description,
				ingredients: ingredients && JSON.parse(ingredients),
				price: Number(price),
				category,
				imagePath
			})
			return res.status(201).json(product);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	},

	async listByCategory(req: Request, res: Response) {
		try {
			const { categoryId } = req.params
			const products = await Product.find().where('category').equals(categoryId);

			return res.status(201).json(products);

		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	},

};
