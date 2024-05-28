import { useState, useEffect, useRef } from "react";

export const useTypewriter = (text, speed = 20) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(-1);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current += 1;
        setDisplayText((prevText) => prevText + text.charAt(indexRef.current));
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

