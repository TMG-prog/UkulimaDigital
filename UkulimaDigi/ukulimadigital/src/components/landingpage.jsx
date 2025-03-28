import React, { useState } from 'react';
import './landingpage.css'; 
import heroImage from './ukulimadigi.jpg'; 
import SignUpModal from './signUp';
import LogInModal from './Login';
import Aboutpic from './about.jpg';
import person1 from './person1.jpg';
import person2 from './person2.jpg';
import person3 from './person3.jpg';
const testimonials = [
  {
    quote: "My daughter told me about UkulimaDigi, and it changed my life. At the time, the produce I was growing to sell in the market was constantly being destroyed by pests. Now, with AI disease detection and expert farming tips, I can prevent losses and sell fresher produce.",
    author: "Wamuyu Lisa,  Market Vendor",
    image: person1,
  },
  {
    quote: "Pests and diseases were my biggest challenge. With UkulimaDigi’s AI disease detection, I now diagnose crop issues early and apply the right treatment. My farm is thriving, and I save money on pesticides!",
    author: "Aisha Awino, Small-scale farmer",
    image: person2,
  },
  {
    quote:  "For the longest time I wanted to grow my own vegetables but didn't know where to start, UkulimaDigi changed that. I was able to get starter farming tips and manage my small home farm.",
    author: "John Gitau, Home Farm Owner",
    image: person3,
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
   
    <section className="testimonial-card">
       <h1 >TESTIMONIALS</h1>
      <div className="testimonial-content">
        <div className="testimonial-text">
          <h2>"{testimonials[activeIndex].quote}"</h2>
          <p className="testimonial-author">- {testimonials[activeIndex].author}</p>
        </div>
        <div className="testimonial-image">
          <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].author} />
        </div>
      </div>
      <div className="indicator-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
     
    </section>
  );
};

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  const openLogInModal = () => setIsLogInOpen(true);
  const closeLogInModal = () => setIsLogInOpen(false);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="navbar">
        <div className="logo">UkulimaDigi</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Explore</a>
        </nav>
        <button className="btn-outline" onClick={openLogInModal}>Log In</button> 
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>UkulimaDigi</h1>
          <h3>Smart Farming, Right at your fingertips</h3>
          <div className="cta-buttons">
            <button className="btn-primary">Learn More</button>
            <button className="btn-secondary" onClick={openSignUpModal}>Sign Up</button> 
          </div>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Farmer using mobile phone" className="hero-image" />
        </div>
      </section>

      <SignUpModal isOpen={isSignUpOpen} onClose={closeSignUpModal} />
      <LogInModal isOpen={isLogInOpen} onClose={closeLogInModal} />

      {/* About Section */}
      <h2 className="highlight">ABOUT US</h2>
      <section className="about-container">
        <div className="image-section">
          <img src={Aboutpic} alt="Farmer using mobile phone" className="about-image" />
        </div>
        <div className="text-section">
          <h2>Smart Farming For Everyone</h2>
          <p>
            At UkulimaDigi, we believe that anyone can be a farmer. Whether you are growing crops in your backyard or managing a small farm, our digital platform helps you track your crops, 
            get real-time farming tips, and detect plant diseases using AI.
          </p>
          <button className="about-button" onClick={openSignUpModal}>GET STARTED</button>
        </div>
      </section>

      {/* What We Offer Section */}
      <h2 className="offer-title">What We Offer</h2>
      <section className="offer-section">
        <div className="offer-card">
          <img src="/offer.jpg" alt="Smart Crop Monitoring" />
          <h3>Smart Crop Monitoring</h3>
          <p>Track your crops in real-time using AI-powered insights.</p>
        </div>
        <div className="offer-card">
          <img src="/offer1.jpg" alt="Automated Disease Detection" />
          <h3>Automated Disease Detection</h3>
          <p>Upload images of crops and let AI detect potential diseases.</p>
        </div>
        <div className="offer-card">
          <img src="/offer4.jpg" alt="Eco-Friendly Farming Practices" />
          <h3>Eco-Friendly Farming Practices</h3>
          <p>Learn sustainable and eco-friendly farming methods.</p>
        </div>
        <div className="offer-card">
          <img src="/offer3.jpg" alt="Weather Insights" />
          <h3>Accurate Weather Insights</h3>
          <p>Get real-time weather updates for better farming decisions.</p>
        </div>
      </section>

      {/* Testimonials Section */}
     
      <Testimonials />

      {/* Footer */}
      <footer className="footer">
        <div className='footer-text'>
          <p>UkulimaDigi © 2025</p>
          
          <p>Contact Us: Ukulimadigital@gmail.com</p>
          <p>Instagram: UkulimaDigi</p>
          <p>X: UkulimaDigionX</p>
          
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;