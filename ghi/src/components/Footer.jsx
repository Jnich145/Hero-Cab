import React from 'react';
// import { ClickButton } from './components/ClickButton';
import { Link } from 'react-router-dom';
import '../App.css'

function Footer() {
    return (
        <div className="container-wrapper">
            <footer className="footer bg-body-tertiary text-center text-lg-start">
                <div
                    className="text-center p-3"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    <section>
                        <p className="footer-subscription-heading">
                            Join our newsletter!
                        </p>
                        <p className="footer-subscription-text">
                            You can unsubscribe at any time.
                        </p>
                        <div className="input-group mb-3 justify-content-center">
                            <input
                                type="email"
                                className="form-control-alternative col-4"
                                placeholder="Your Email"
                                aria-label="Recipient's email"
                                aria-describedby="button-addon2"
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-addon2"
                            >
                                Subscribe
                            </button>
                        </div>
                    </section>
                    <div className="footer-links">
                        <div className="container p-4">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">About Us</h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/sign-up"
                                                className="text-dark"
                                            >
                                                How it works
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Reviews
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Careers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Terms of Service
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">
                                        Contact Us
                                    </h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Contact
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Support
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">
                                        Social Media
                                    </h5>
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Instagram
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Facebook
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Youtube
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="text-dark">
                                                Twitter
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="text-center p-3"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    >
                        © 2024 Hero-Cab
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
