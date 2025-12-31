import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/cart", {
      headers: {
        authorization: "bearer " + localStorage.getItem("token")
      }
    }).then(res => setCart(res.data));
  }, []);

  return (
    <section>
      <div className="contact home">
        {/* LEFT SIDE */}
        <div className="left">
          <h1>My Cart</h1>

          {cart?.products.map((item, index) => (
            <div key={index}>
              <p><strong>{item.productId.name}</strong></p>
              <p>Price: Rs. {item.productId.price}</p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="right">
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />

            <select required>
              <option value="">Select Payment Method</option>
              <option>Cash on Delivery</option>
              <option>PayBank</option>
            </select>

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </section>
  );
}
