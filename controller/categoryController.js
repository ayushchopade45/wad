import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(401).send({ message: 'name is required' })

        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            sucess: true,
            message: 'new category created',
            category
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in category'
        })
    }
};


//update category 
export const updateCatgeoryContoller = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            sucess: true,
            message: "category updated successfuly",
            category,
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            error,
            message: 'error while updating category'
        })
    }

};

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            sucess: true,
            message: 'All categories list',
            category,
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error while creating category'
        })
    }

};

export const singleCategoryContoller = async (req, res) => {
    try {
        //const {slug}=req.params
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            status: 'succes',
            message: 'get single category sucess',
            category

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            error, message: 'Error while getting single category'
        })
    }

};

export const deleteCategoryContoller = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'category deleted sucessfully',

        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'deletion unsucessfull'
        })
    }
};