import { Category } from './../Category';
import { Request, Response } from "express";

export default {
	async list(req: Request, res: Response) {
		const categories = await Category.find();
		res.json(categories);
	},

	async create(req: Request, res: Response) {
		try {
			const { icon, name } = req.body;
			const category = await Category.create({
				name,
				icon,
			});

			return res.status(201).json(category);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	},
};