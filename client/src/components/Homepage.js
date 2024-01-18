import React from "react";
import "./Homepage.css"; // Import your CSS file for styling
import devfolioImage from "./assets/devfolio.png";
import FAQ from "./FAQ";

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaDiscord, FaLinkedin } from "react-icons/fa";


const Homepage = () => {


  return (
    <div className="homepage-container">
      <section id="hero" className="dark-section">
        <div className="hero-content">
          <h2>
            <span className="hero-text">Caffeine and Code</span>
          </h2>
          <p>
            <span className="cyan-text">Fueling Open Source Adventures</span>
          </p>
          <a
            className="register-button"
            style={{ marginTop: "20px" }}
            href="https://caffeine-and-code.devfolio.co/"
            target="_blank"
            rel="noreferrer"
          >
            Register
          </a>
        </div>
      </section>
      <section>
        <div className="button-container"></div>
      </section>

      <section id="sponsor" className="light-section">
        <div className="sponsor-content">
          <h2>Our Sponsors</h2>
          <p>Special thanks to our sponsors for their generous support.</p>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >

            <div
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img className="sponsorImage" src={devfolioImage} alt="replit" />
            </div>
          </div>
          <p
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Support our mission by becoming a sponsor! Your contributions help
            us make a positive impact on the community.
          </p>
          <button className="dark-tone">Sponsor Us</button>
        </div>
      </section>

      <section id="timeline" className="dark-section">
        <div className="timeline-content">
          <h2>Event Timeline</h2>
        </div>

        <ul className="timeline">
          <li>
            <div className="direction-r">
              <div className="flag-wrapper">
                <span className="flag">Registration Starts</span>
              </div>
              <div className="desc">11 Jan 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-l">
              <div className="flag-wrapper">
                <span className="flag">
                  Project and Mentor Registration Starts
                </span>
              </div>
              <div className="desc">20 Jan 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-r">
              <div className="flag-wrapper">
                <span className="flag">Registration Ends</span>
              </div>
              <div className="desc">25 Feb 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-l">
              <div className="flag-wrapper">
                <span className="flag">
                  Project and Mentor Registration Ends
                </span>
              </div>
              <div className="desc">08 Mar 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-r">
              <div className="flag-wrapper">
                <span className="flag">Event Begins</span>
              </div>
              <div className="desc">10 Mar 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-l">
              <div className="flag-wrapper">
                <span className="flag">Event Closes</span>
              </div>
              <div className="desc">24 Mar 2024</div>
            </div>
          </li>

          <li>
            <div className="direction-r">
              <div className="flag-wrapper">
                <span className="flag">Result</span>
              </div>
              <div className="desc">30 Mar 2024</div>
            </div>
          </li>
        </ul>
      </section>
      <section className="dark-section">
        <div className="socials-content">
          <h2>Wanna become a mentor?</h2>
          <p style={{
            marginBottom:'20px'
          }}>
            Share your knowledge and experience with aspiring developers. Join
            us as a mentor and help others on their open-source journey.
          </p>
          <a
            className="dark-tone"
            style={{ marginTop: "20px" }}
            href="https://caffeine-and-code.devfolio.co/"
            target="_blank"
            rel="noreferrer"
          >Become A Mentor
          </a>
        </div>
      </section>

      <section id="faq" className="light-section">
        <div className="faq-content">
          <FAQ />
        </div>
      </section>

      <section id="socials" className="dark-section">
        <div className="socials-content">
        <img src="https://phicsit.in/wp-content/uploads/2023/12/phy.png" style={{
          width:"50px",
          margin:'20px'
        }} alt=""/>
          <h2>Connect with Us</h2>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/PHICSIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/PHICSIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/phicsit.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/phicsit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin/>
            </a>
            <a
              href="https://discord.com/invite/zt3hVmENcX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord/>
            </a>
          </div>
          <div className="contact-content" style={{
            marginTop:'15px'
          }}>
          <p>For any inquiries or assistance, feel free to reach out to us via email.</p>
          <p>Email: <a href="mailto:info@yourdomain.com" style={{
            textDecorationLine:"none",
            color:"gray"
          }}>info@yourdomain.com</a></p>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
