import "./Footer.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://github.com/consortium-web3atl" className="footer-a">
        <FaGithub size={14} className="icon" />
        GITHUB
      </a>
    </footer>
  );
}
