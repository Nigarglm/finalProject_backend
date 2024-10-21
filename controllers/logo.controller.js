import Logo from "../models/logo.model.js"


export const getLogo = async (req, res) => {
    try {
        const logos = await Logo.find();
        res.status(200).json(logos);
    } catch (error) {
        console.error("Error in getLogo:", error);
        res.status(500).json({ message: "Error fetching logo" });
    }
}


export const createLogo = async (req, res) => {
    try {
        const { image } = req.body;

        if ( !image ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLogo = new Logo({ image });
        await newLogo.save();

        res.status(201).json({ message: "Logo created successfully", logo: newLogo });
    } catch (error) {
        console.error("Error in createLogo:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editLogo = async (req, res) => {
    try {
        const logoId = req.params.id;
        const { image } = req.body;

        if (!mongoose.Types.ObjectId.isValid(logoId)) {
            return res.status(400).json({ message: "Invalid logo ID format" });
        }

        const updateData = {};
        if (image !== undefined) updateData.image = image;

        const updatedLogo = await Logo.findByIdAndUpdate(logoId, updateData, { new: true, runValidators: true });

        if (!updatedLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }

        res.status(200).json({ message: "Logo updated", logo: updatedLogo });
    } catch (error) {
        console.error('Error updating logo:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteLogo = async (req, res) => {
    try {
        const logoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(logoId)) {
            return res.status(400).json({ message: "Invalid logo ID format" });
        }

        const deletedLogo = await Logo.findByIdAndDelete(logoId);

        if (!deletedLogo) {
            return res.status(404).json({ message: "Logo not found" });
        }

        res.status(200).json({ message: "Logo deleted successfully", logo: deletedLogo });
    } catch (error) {
        console.error('Error deleting logo:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}