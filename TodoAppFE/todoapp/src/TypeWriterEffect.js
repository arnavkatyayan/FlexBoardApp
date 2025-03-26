import React, { useState, useEffect } from "react";

function TypeWriterEffect({ word, onComplete, terminate, setIsVanishEnabled }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      if (index < word.length) {
        setDisplayedText((prev) => prev + word[index]);
        index++;
      } else {
        clearInterval(interval);
        if(terminate) {
          setIsVanishEnabled(true);
          return;
        }
        setTimeout(() => {
          onComplete(); 
        }, 1000); 
      }
    }, 150);

    return () => clearInterval(interval);
  }, [word]);

  return <h4 className="typewritereffect">{displayedText}</h4>;
}

export default TypeWriterEffect;
