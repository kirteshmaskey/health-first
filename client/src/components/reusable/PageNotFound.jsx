import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <h1 className="display-1">404</h1>
      <p className="lead">
        Oops! The page you're looking for must've been abducted by aliens 👽
      </p>
      <Link to="/" className="btn btn-primary">
        Take me home
      </Link>
    </div>
  );
};

export default PageNotFound;
