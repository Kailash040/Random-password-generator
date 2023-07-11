import './App.css';
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import PasswordStrengthBar from "react-password-strength-bar";
export default function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const handlePasswordLengthChange = (event) => {
    setPasswordLength(Number(event.target.value));
  };

  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name;
    const checkboxValue = event.target.checked;

    if (checkboxName === "includeUppercase") {
      setIncludeUppercase(checkboxValue);
    } else if (checkboxName === "includeLowercase") {
      setIncludeLowercase(checkboxValue);
    } else if (checkboxName === "includeSymbols") {
      setIncludeSymbols(checkboxValue);
    } else if (checkboxName === "includeNumbers") {
      setIncludeNumbers(checkboxValue);
    }
  };
  const generatePassword = () => {
    let characters = "";

    if (includeUppercase) {
      characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeLowercase) {
      characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (includeSymbols) {
      characters += "!@#$%^&*()";
    }

    if (includeNumbers) {
      characters += "0123456789";
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="App ">
      <div className="heading_container">
        <span>{generatedPassword}</span>{" "}
        <CopyToClipboard
          text={generatedPassword}
          onCopy={() => setIsCopied(true)}
        >
          <img
            style={{ width: "25px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Font_Awesome_5_regular_copy.svg/1792px-Font_Awesome_5_regular_copy.svg.png"
            alt="img"
          />
        </CopyToClipboard>
      </div>
      <div className="passwordLength_container">
        <div className="passwordLength_paragraph   ">
          <label htmlFor="passwordLength" className="passwordLength">
            {" "}
            Character Length
          </label>{" "}
          <span style={{ "font-size": "15px" }}>{passwordLength}</span>
        </div>
        <br />
        <input
          type="range"
          id="passwordLength"
          min="4"
          max="20"
          value={passwordLength}
          onChange={handlePasswordLengthChange}
        />
      </div>
      <div className="include_letter_margin">
        <label>
          <input
            type="checkbox"
            name="includeUppercase"
            checked={includeUppercase}
            onChange={handleCheckboxChange}
          />
          &nbsp; Include Uppercase Letters
        </label>
      </div>
      <div className="include_letter_margin">
        <label>
          <input
            type="checkbox"
            name="includeLowercase"
            checked={includeLowercase}
            onChange={handleCheckboxChange}
          />
          &nbsp; Include Lowercase Letters
        </label>
      </div>
      <div className="include_letter_margin">
        <label>
          <input
            type="checkbox"
            name="includeNumbers"
            checked={includeNumbers}
            onChange={handleCheckboxChange}
          />
          &nbsp; Include Numbers
        </label>
      </div>
      <div className="include_letter_margin">
        <label>
          <input
            type="checkbox"
            name="includeSymbols"
            checked={includeSymbols}
            onChange={handleCheckboxChange}
          />
          &nbsp; Include Symbols
        </label>
      </div>
      <div className="pwd-container">
        <p>STRENGTH</p>
        <input
          type="password"
          placeholder="Enter Password"
          value={generatedPassword}
          onChange={(e) => setGeneratedPassword(e.target.value)}
          style={{ display: "none" }}
        />
        <PasswordStrengthBar password={generatedPassword} />
      </div>
      <button className="generate_button" onClick={generatePassword}>
        GENERATE
      </button>
      <div></div>
    </div>
  );
}

