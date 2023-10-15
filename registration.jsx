import React, { useState } from 'react';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsTeacherChange = (e) => {
    setIsTeacher(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      firstName,
      lastName,
      password,
      isTeacher,
    };

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        /* headers: {
          'Content-Type': 'application/json',
        }, */
        body: JSON.stringify(registrationData),
      });
      console.log(response.json())
      if (response.status === 200) {
        setConfirmationMessage('Registration successful');
      } else {
        setConfirmationMessage('Registration failed');
      }
    } catch (error) {
      setConfirmationMessage('Error: ' + error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="userType"
              checked={isTeacher}
              onChange={handleIsTeacherChange}
            />
            I am a teacher
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}

export default Registration;
