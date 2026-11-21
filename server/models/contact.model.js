import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
    name:{
        type: String,
        required: [true, "name is required"],
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true
    },
    message:{
        type: String,
        required: true,
        trim: true
    }
})

const Contact = model('Contact', ContactSchema);
export default Contact;