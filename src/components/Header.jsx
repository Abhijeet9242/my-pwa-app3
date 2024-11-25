import React, { useState } from "react";
import { useNavigate, useSearchParams ,Link} from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState(""); // Local state for input
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle input change
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchText(query);
    // Update the URL query string
    navigate(`/movies?searchText=${query}`);
  };

  // Set the input value from the URL on initial load
  React.useEffect(() => {
    const queryFromUrl = searchParams.get("searchText");
    if (queryFromUrl) {
      setSearchText(queryFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="alert alert-primary">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>
                <Link to="/" style={{textDecoration:'none'}}>Movie Browser</Link>
                </h3>
          </div>
          <div className="col-md-8">
            <form>
              <input
                className="form-control"
                placeholder="Search..."
                value={searchText} // Controlled input
                onChange={handleInputChange} // Update URL on change
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
