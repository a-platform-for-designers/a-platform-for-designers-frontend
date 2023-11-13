import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ScrollToTop() {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, [navigate]);

  return null;
}

export default ScrollToTop;
