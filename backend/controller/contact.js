const Contact = require("../models/Contact");

const saveContact = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body); // 🔍 DEBUG LINE

    const { name, email, message } = req.body;

    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    res.status(201).json({ message: "Contact saved successfully" }); // ✅ FIXED
  } catch (error) {
    console.error("SAVE ERROR:", error);
    res.status(500).json({ error: "Save failed" });
  }
};

module.exports = { saveContact };
