import React from "react";
import aboutImg from "../assets/about.jpg"; // put your image here

export default function About() {
  return (
    <section>
      <div className="about home">
        {/* LEFT SIDE */}
        <div className="left">
          <h1>About SpaceXP Shopping</h1>

          <h5>
            SpaceXP Shopping is a modern online shopping platform designed to
            bring premium space-inspired products to customers around the
            world.
          </h5>

          <p className="about-text">
            Our platform allows users to explore exclusive SpaceX-themed
            merchandise, manage favourite products, and enjoy a smooth and
            secure shopping experience. Built using React, REST APIs, and
            modern web technologies, SpaceXP Shopping focuses on performance,
            usability, and clean design.
          </p>

          <p className="about-text">
            We aim to combine innovation and simplicity to deliver a reliable
            e-commerce experience inspired by space exploration.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <img src={aboutImg} alt="About SpaceXP Shopping" />
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
