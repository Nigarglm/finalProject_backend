import Category from "../models/category.model.js"


export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error in getAllCategories:", error);
        res.status(500).json({ message: "Error fetching categories" });
    }
}


export const getSingleCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error("Error in getSingleCategory:", error);
        res.status(500).json({ message: "Error fetching categories" });
    }
}


export const createCategory = async (req, res) => {
    try {
        const { image, name} = req.body;

        if (!name || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCategory = new Category({ image, name});
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        console.error("Error in createCategory:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { image, name } = req.body;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const updateData = {};
        if (image !== undefined) updateData.image = image;
        if (name !== undefined) updateData.name = name;

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true, runValidators: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated", category: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", category: deletedCategory });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}