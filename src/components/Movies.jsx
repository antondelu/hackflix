import { CCardImage, CCard } from "@coreui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./movies.css";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export const CardsMovies = ({ rating }) => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const filmsFilter = films.filter((el) => el.vote_average + 2 > rating);
  useEffect(() => {
    const listFilms = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      //Solucion anterior
      // !films.length > 0
      //   ? setFilms(response.data.results)
      //   : setFilms((prevFilms) => prevFilms.concat(response.data.results));

      //Solucion mejorada
      setFilms((prevFilms) => [...prevFilms, ...response.data.results]);
    };
    listFilms();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={films.length}
      hasMore={true}
      next={() => setPage((prevPage) => prevPage + 1)}
    >
      <div className="contentCard">
        {filmsFilter.length !== 0 ? (
          filmsFilter.map((element, index) => {
            return (
              <Link to={`/movie/${element.id}`}>
                <div className="moviCard" key={index}>
                  <CCard style={{ width: "14rem" }}>
                    <CCardImage
                      src={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
                    />
                  </CCard>
                  <div className="infoCard">
                    <button class="icon-btn add-btn" title="agregar a la lista">
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
          <p>No hay peliculas con el rating solicitado</p>
        )}
      </div>
    </InfiniteScroll>
  );
};
