import Contact from "../models/contact.model.js"


export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error in getAllContacts:", error);
        res.status(500).json({ message: "Error fetching social media links" });
    }
}


export const getSingleContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ message: "Social media link not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error("Error in getSingleContact:", error);
        res.status(500).json({ message: "Error fetching social media link" });
    }
}


export const createContact = async (req, res) => {
    try {
        const { name, icon, link } = req.body;

        if (!name ||!icon ||!link) {
            return res.status(400).json({ message: "All fields (name, icon, link) are required" });
        }

        const newContact = new Contact({ name, icon, link });
        await newContact.save();

        res.status(201).json({ message: "Social media link created successfully", contact: newContact });
    } catch (error) {
        console.error("Error in createContact:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const { name, icon, link } = req.body;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: "Invalid social media link ID format" });
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (icon !== undefined) updateData.icon = icon;
        if (link !== undefined) updateData.link = link;

        const updatedContact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true, runValidators: true });

        if (!updatedContact) {
            return res.status(404).json({ message: "Social media link not found" });
        }

        res.status(200).json({ message: "Social media link updated", social: updatedContact });
    } catch (error) {
        console.error('Error updating social media link:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: "Invalid social media link ID format" });
        }

        const deletedContact = await Contact.findByIdAndDelete(contactId);

        if (!deletedContact) {
            return res.status(404).json({ message: "Social media link not found" });
        }

        res.status(200).json({ message: "Social media link deleted successfully", social: deletedContact });
    } catch (error) {
        console.error('Error deleting social media link:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

