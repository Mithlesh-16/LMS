import Contact from "../models/contact.model.js"
async function submitMessage (req, res, next){
    const {name, email, message} = req.body;
    const contactForm = await Contact.create({
        name,
        email,
        message
    })
    await contactForm.save();
    res.status(200).json({
        success: true,
        message: "message submitted successfully"
    })
}

export default submitMessage;