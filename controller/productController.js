const productSchema = require('../schema/productSchema');

const getProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Product cannot be found for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const createdProduct = await productSchema.create({ name, description, status });
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productSchema.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: `Cannot update product for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productSchema.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ message: `Cannot delete product for id: ${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
