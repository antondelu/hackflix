import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CCardTitle, CRow, CCardText, CCardBody } from "@coreui/react";
import "./MoviesDetails.css";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [urlTrailer, setUrlTrailer] = useState("");
  const [languages, setLanguages] = useState([]);
  const [genere, setGenere] = useState([]);
  useEffect(() => {
    const infoMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e4c88a5823315f70273f174efa3a60b5&append_to_response=videos`
      );
      setMovie(response.data);
      setUrlTrailer(
        response.data.videos.results.find(
          (element) => element.type.toLowerCase() === "Trailer".toLowerCase()
        ).key
      );
      setLanguages(response.data.spoken_languages);
      setGenere(response.data.genres.filter((element) => element.name));
    };
    infoMovie();
  }, []);
  return (
    <div>
      {movie ? (
        <div className="contentMovieDetails">
          <CRow className="g-0">
            <div className="ratio ratio-16x9 trailer">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${urlTrailer}?autoplay=1&modestbranding=1&autohide=1&rel=0&controls=0&showinfo=0&loop=1&theme=dark&autohide=2&playlist=${urlTrailer}`}
                title="Borrego Official Trailer (2022) - Lucy Hale and Nicholas Gonzalez"
                frameborder="0"
                allow=" autoplay;encrypted-media"
                allowfullscreen
              />
              <div></div>
            </div>

            <CCardBody className="infoMovieDetails">
              <CCardTitle className="titleDetails">{movie.title}</CCardTitle>
              <CCardText className="genres">
                <h5>Generos : </h5>
                {genere.map((element, index) => {
                  return (
                    <Link to={"/"} className="link">
                      {element.name}
                    </Link>
                  );
                })}
              </CCardText>
              <div className="lenguageDetails">
                <h5>Lenguajes : </h5>
                {languages.map((element, index) => {
                  return <p>{element.name}</p>;
                })}
              </div>
              <div className="lenguageDetails">
                <h5 className="start">
                  <div>
                    <AiFillStar size={22} />
                    <AiFillStar size={22} />
                    <AiFillStar size={22} />
                    <AiFillStar size={22} />
                  </div>
                  <div>
                    <AiFillStar size={22} />
                  </div>
                </h5>
                <p>{movie.vote_average}</p>
              </div>
              <p className="movieDescription">{movie.overview} </p>
            </CCardBody>
          </CRow>
        </div>
      ) : (
        <div className="loading">Loading&#8230;</div>
      )}
    </div>
  );
};
