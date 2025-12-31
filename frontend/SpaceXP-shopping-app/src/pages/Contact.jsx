import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/contact", formData);
      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      alert("Failed to send message");
      console.error(error);
    }
  };

  return (
    <section>
      <div className="contact home">
        {/* LEFT SIDE */}
        <div className="left">
          <h1>Contact Us</h1>

          <h5>
            Have any questions or need support?  
            We’re here to help you.
          </h5>

          <p className="contact-text">
            Reach out to SpaceXP Shopping for product inquiries, order support,
            or general questions. Our team is always ready to assist you.
          </p>

          <div className="contact-info">
            <p><strong>Email:</strong> support@spacexp.com</p>
            <p><strong>Phone:</strong> +94 77 123 4567</p>
            <p><strong>Location:</strong> Colombo, Sri Lanka</p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* WAVE BACKGROUND */}
      <div className="bg">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#d4f6e8"
            fillOpacity="1"
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,181.3C672,192,768,192,864,186.7C960,181,1056,171,1152,186.7C1248,203,1344,245,1392,266.7L1440,288L1440,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
