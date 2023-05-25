import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import HomeIndex from "./Pages/HomeIndex";
import ProductPage from "./Pages/ProductPage";
import CreateVenue from "./Pages/CreateVenue";
import VenueManager from "./Pages/VenueManager";
import Authentication from "./Pages/Authentication";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createContext, useState } from "react";
import Profile from "./Pages/Profile";
import { useGetVenuesQuery } from "./services/venueApi";

export const AuthenticationContext = createContext();
function App() {
  const [authentication, setAuthentication] = useState({});
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { data: venues, isLoading } = useGetVenuesQuery();

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search !== "") {
      const results = venues?.filter((venue) =>
        venue.name.toLowerCase().includes(e.target.value)
      );
      setSearchResult(results);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      <div>
        <Routes>
          <Route path="/" element={<Home handleSearch={handleSearch} />}>
            <Route
              index
              element={
                <HomeIndex
                  handleSearch={handleSearch}
                  searchResult={searchResult}
                  search={search}
                  isLoading={isLoading}
                  venues={venues}
                />
              }
            />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/create-venue" element={<CreateVenue />} />
            <Route path="/venue-manager" element={<VenueManager />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/my-profile" element={<Profile />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </AuthenticationContext.Provider>
  );
}

export default App;
