import { useState, useEffect } from "react";

type Props = {
  message: string;
  duration?: number;
  onClose: Function;
};

const ErrorPopup = ({ message, duration = 3000, onClose }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
      <p>{message}</p>
    </div>
  );
};

export default ErrorPopup;
