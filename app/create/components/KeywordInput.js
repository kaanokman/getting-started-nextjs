import React, { useState } from "react";
import "../../../styles/KeywordInput.css"

const KeywordInput = () => {
    const [keywords, setKeywords] = useState([]); // State to store keywords
    const [inputValue, setInputValue] = useState(""); // State for input field

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Handle keyword addition
    const handleAddKeyword = () => {
        if (inputValue && keywords.length < 5) {
            setKeywords((prevKeywords) => [...prevKeywords, inputValue]);
            setInputValue(""); // Clear the input field
        }
    };

    // Handle keyword deletion
    const handleDeleteKeyword = (index) => {
        setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
    };

    return (
        <div className="keyword-input-container">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter keyword..."
            />
            <button onClick={handleAddKeyword}>Add</button>
            <div className="keyword-list">
                {keywords.map((keyword, index) => (
                    <div key={index} className="keyword-item">
                        {keyword} <span className="delete" onClick={() => handleDeleteKeyword(index)}>x</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeywordInput;
