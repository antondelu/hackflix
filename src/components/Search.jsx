import { useEffect, useState } from "react";
import { CCardImage, CCard } from "@coreui/react";
import { Link } from "react-router-dom";
import "./search.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
export const Search = () => {
  const [searchFilms, setSearchFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");

  const handlerSearch = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  useEffect(() => {
    const wantedMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${title}&page=${page}`
      );

      // //Solucion anterior
      // !searchFilms.length > 0
      //   ? setSearchFilms(response.data.results)
      //   : setSearchFilms((prevSearchFilms) =>
      //       prevSearchFilms.concat(response.data.results)
      //     );

      //Solucion mejorada
      setSearchFilms((prevSearchFilms) => [
        ...prevSearchFilms,
        ...response.data.results,
      ]);
    };
    wantedMovie();
  }, [title, page]);

  useEffect(() => {
    setSearchFilms([]);
    setPage(1);
  }, [title]);

  return (
    <InfiniteScroll
      dataLength={searchFilms.length}
      hasMore={true}
      next={() => setPage((prevPage) => prevPage + 1)}
    >
      <div className="prueba">
        <div class="group">
          <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            class="input searchInput"
            onChange={handlerSearch}
          />
        </div>

        <div className="contentCard">
          {searchFilms.length !== 0 ? (
            searchFilms.map((element, index) => {
              console.log(searchFilms);
              return (
                <Link to={`/movie/${element.id}`}>
                  <div key={index} className="moviCard">
                    <CCard style={{ width: "14rem" }}>
                      <CCardImage
                        src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
                      />
                    </CCard>
                    <div className="infoCard">
                      <button
                        class="icon-btn add-btn"
                        title="agregar a la lista"
                      >
                        <div class="add-icon"></div>
                        <div class="btn-txt">Ok</div>
                      </button>
                      <a class="play-btn" href="#" title="Play"></a>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="notResultSearch">
              No hay resultados para tu busqueda {title}
            </p>
          )}
        </div>
      </div>
    </InfiniteScroll>
  );
};
