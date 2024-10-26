import Subscribtion from "../models/subscribtions.model.js"


export const getAllSubscribtions = async (req, res) => {
    try {
        const subscribtions = await Subscribtion.find();
        res.status(200).json(subscribtions);
    } catch (error) {
        console.error("Error in getAllSubscribtions:", error);
        res.status(500).json({ message: "Error fetching subscribtions" });
    }
}


export const getSingleSubscribtion = async (req, res) => {
    try {
        const subscribtionId = req.params.id;
        const subscribtion = await Subscribtion.findById(subscribtionId);

        if (!subscribtion) {
            return res.status(404).json({ message: "Subscribtion not found" });
        }

        res.status(200).json(subscribtion);
    } catch (error) {
        console.error("Error in getSingleSubscribtion:", error);
        res.status(500).json({ message: "Error fetching subscribtion" });
    }
}


export const createSubscribtion = async (req, res) => {
    try {
        const { name, price, describtion, userId } = req.body;

        if (!name ||!price | !describtion | !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubscribtion = new Subscribtion({ name, price, describtion, userId });
        await newSubscribtion.save();

        res.status(201).json({ message: "Subscribtion created successfully", subscribtion: newSubscribtion });
    } catch (error) {
        console.error("Error in createSubscribtion:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editSubscribtion = async (req, res) => {
    try {
        const subscribtionId = req.params.id;
        const { name, price, describtion, userId } = req.body;

        if (!subscribtionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Subscribtion ID format" });
        }

        const updateData = {};
        if (name!== undefined) updateData.name = name;
        if (price!== undefined) updateData.price = price;
        if (describtion!== undefined) updateData.describtion = describtion;
        if (userId!== undefined) updateData.userId = userId;

        const updatedSubscribtion = await Subscribtion.findByIdAndUpdate(subscribtionId, updateData, { new: true, runValidators: true });

        if (!updatedSubscribtion) {
            return res.status(404).json({ message: "Subscribtion not found" });
        }

        res.status(200).json({ message: "Subscribtion updated successfully", subscribtion: updatedSubscribtion });
    } catch (error) {
    
}
}


export const deleteSubscribtion = async (req, res) => {
    try {
        const subscribtionId = req.params.id;

        if (!subscribtionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Subscribtion ID format" });
        }

        const subscribtion = await Subscribtion.findByIdAndDelete(subscribtionId);

        if (!subscribtion) {
            return res.status(404).json({ message: "Subscribtion not found" });
        }

        res.status(200).json({ message: "Subscribtion deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSubscribtion:", error);
        res.status(500).json({ message: "Error deleting Subscribtion" });
    }
}