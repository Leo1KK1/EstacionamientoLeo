import { Request, Response } from 'express'
import  Product  from '../models/Product.model'
import { getAttributes } from 'sequelize-typescript';

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body);
  
    res.json({data: product});
}
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
        order:[
            ['id', 'ASC']
        ],
        attributes: { exclude: ['createdAt', 'updatedAt', 'disponibility'] },
        limit: 30,
    });
    res.json({data: products});
    } catch (error) {
        console.log(error);
    }

}
//MÉTODO GET PARA OBTENER UN PRODUCTO POR ID
export const getProductById = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return
        }
        res.json({data: product});
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return
        }
        await product.update(req.body);
        await product.save();
        res.json({data: product});
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return
        }
        await product.destroy();
        res.json({message: 'Producto eliminado'});
    } catch (error) {
        console.log(error);
    }
}


