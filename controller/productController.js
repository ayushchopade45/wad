
import productModel from '../models/productModel.js'
import fs from 'fs'
import slugify from 'slugify'
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //vlaidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })

            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo  is required and should be less than 1 mb' })

        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            sucess: true,
            message: "product created successfully",
            products,
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: 'error in creating a product'
        })
    }

};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            sucess: true,
            message: 'all products',
            products,
            count_total: products.length,


        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'product get fail',


            error: error.message
        })
    }
};

export const getSingleProductController = async (req, res) => {


    try {
        const product = await productModel.find({ slug: req.params.slug }).select('-photo').populate('category');

        res.status(200).send({
            sucess: true,
            message: 'single product fecthed',
            product
        })


    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'error while getting single product',
            error

        })
    }

};

//get photo

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);

        }


    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'error while getting photo',
            error
        })
    }
};

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            sucess: true,
            message: "product deleted sucessfully"
        })

    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'error while deleting product',
            error
        })
    }
};


export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //vlaidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' })

            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo  is required and should be less than 1 mb' })

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) },
            { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            sucess: true,
            message: "product updated successfully",
            products,
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: 'error in updating a product'
        })
    }

};