import Hero from "../models/herosec.model.js"


export const getHero = async (req, res) => {
    try {
        const heros = await Hero.find();
        res.status(200).json(heros);
    } catch (error) {
        console.error("Error in getHero:", error);
        res.status(500).json({ message: "Error fetching heros" });
    }
}


export const createHero = async (req, res) => {
    try {
        const { bg_image, text } = req.body;

        if (!bg_image || !text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newHero = new Hero({ bg_image, text});
        await newHero.save();

        res.status(201).json({ message: "Hero section created successfully", contact: newHero });
    } catch (error) {
        console.error("Error in createHero:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editHero = async (req, res) => {
    try {
        const heroId = req.params.id;
        const { bg_image, text } = req.body;

        if (!mongoose.Types.ObjectId.isValid(heroId)) {
            return res.status(400).json({ message: "Invalid hero section ID format" });
        }

        const updateData = {};
        if (bg_image !== undefined) updateData.bg_image = bg_image;
        if (text !== undefined) updateData.text = text;

        const updatedHero = await Hero.findByIdAndUpdate(heroId, updateData, { new: true, runValidators: true });

        if (!updatedHero) {
            return res.status(404).json({ message: "Hero section properities not found" });
        }

        res.status(200).json({ message: "Hero section updated", hero: updatedHero });
    } catch (error) {
        console.error('Error updating hero section:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteHero = async (req, res) => {
    try {
        const heroId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(heroId)) {
            return res.status(400).json({ message: "Invalid hero ID format" });
        }

        const deletedHero = await Hero.findByIdAndDelete(heroId);

        if (!deletedHero) {
            return res.status(404).json({ message: "Hero section properities not found" });
        }

        res.status(200).json({ message: "Hero section deleted successfully", hero: deletedHero });
    } catch (error) {
        console.error('Error deleting hero section:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

