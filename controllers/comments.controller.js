import Comment from "../models/comments.model.js"


export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error in getAllComments:", error);
        res.status(500).json({ message: "Error fetching comments" });
    }
}


export const getSingleComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error("Error in getSingleComment:", error);
        res.status(500).json({ message: "Error fetching comment" });
    }
}


export const createComment = async (req, res) => {
    try {
        const { comment, movieId, userId } = req.body;

        if (!comment ||!movieId | !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newComment = new Comment({ comment, movieId, userId });
        await newComment.save();

        res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
        console.error("Error in createComment:", error);
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((val) => val.message);
            return res.status(400).json({ message: messages.join(". ") });
        }
        res.status(500).json({ message: "Server error" });
    }
}


export const editComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { comment, movieId, userId } = req.body;

        if (!commentId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Comment ID format" });
        }

        const updateData = {};
        if (comment!== undefined) updateData.comment = comment;
        if (movieId!== undefined) updateData.movieId = movieId;
        if (userId!== undefined) updateData.userId = userId;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true, runValidators: true });

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
    } catch (error) {
    
}
}


export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        if (!commentId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid Comment ID format" });
        }

        const comment = await Comment.findByIdAndDelete(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error in deleteComment:", error);
        res.status(500).json({ message: "Error deleting Comment" });
    }
}