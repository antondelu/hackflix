import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "./components/Navbar.jsx";
import { Rating } from "./components/Rating";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieDetails } from "./components/MovieDetails";
import { Search } from "./components/Search";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Rating />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route
          path="/peliculas/:id"
          element={<Navigate to="/movie/:id" />}
        ></Route>
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
