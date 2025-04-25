import React from 'react';
import './css/register.css';

const Register: React.FC = () => {

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Create an Account</h2>
                <div className='form'>
                    <div className="form-group">
                        <label htmlFor="username">Username*</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                />
                                Other
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                        />
                    </div>


                </div>
                <div className='password'>
                    <div className="form-group">
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password*</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                        />
                    </div>
                </div>
                <button className="submit-btn">
                    submit
                </button>
            </div>
        </div>
    );
};

export default Register;