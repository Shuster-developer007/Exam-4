import React from 'react'
import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container text-white">
                <div className='d-flex py-3 justify-content-around align-items-center'>
                    <h2>Newsletter Stay tuned for Updates</h2>
                    <input type="text" placeholder='Enter email address' className='form-control lk' />
                </div>
                <div className="divs d-flex justify-content-between">
                    <div className='d-flex flex-column align-items-center'>
                        <h4>Who We Are</h4>
                        <ul className='d-flex flex-column gap-2'>
                            <li>
                                Food Chili a registered
                            </li>
                            <li>
                                trademark of UK Company Ltd
                            </li>
                            <li>
                                435 King's Rd
                            </li>
                            <li>
                                Chelsea London SW10 Oli
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <h4>Contact Us</h4>
                        <ul className='d-flex flex-column gap-2'>
                            <li>
                                90 134 23 86
                            </li>
                            <li>
                                90 134 23 86
                            </li>
                            <li>
                                timurjava@gmail.com
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <h4>Quick Link</h4>
                        <ul className='d-flex flex-column gap-2'>
                            <li>
                                About Us
                            </li>
                            <li>
                                Contact Us
                            </li>
                            <li>
                                FAQ
                            </li>
                            <li>
                                Privacy Policy
                            </li>
                            <li>
                                Terms and Conditions
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <h4>Get In Touch </h4>
                        <div className='d-flex gap-2'>
                            <i className="fa-brands fs-3 fa-instagram"></i>
                            <i className="fa-brands fa-twitter fs-3"></i>
                            <i className="fa-brands fa-telegram fs-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
