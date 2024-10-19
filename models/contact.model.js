import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, 
    required: true,
  },
  link: {
    type: String, 
    required: true,
  }
});

export const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;