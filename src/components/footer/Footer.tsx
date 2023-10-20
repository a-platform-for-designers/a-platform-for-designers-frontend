import "./Footer.scss";

const Footer: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return <footer className="footer">Footer {currentYear}</footer>;
};

export default Footer;
