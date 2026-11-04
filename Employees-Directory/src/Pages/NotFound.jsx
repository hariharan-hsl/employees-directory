import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          Sorry, the page you are looking for doesn't exist
          or may have been moved.
        </p>

        <Link to="/" className="home-button">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;