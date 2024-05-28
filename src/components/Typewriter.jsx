import { useTypewriter } from "@/hooks/useTypewriter";
import { Card } from "./ui/card";

const Typewriter = ({ text, speed, ...props }) => {
  const displayText = useTypewriter(text, speed);

  return <Card {...props}>{displayText}</Card>;
};

export default Typewriter;

