// import { films } from "../db";
import { useState, useEffect } from "react";
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import axios from "axios";
export const Carousel = () => {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const listFilms = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/756999?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images`
      );
      //756999 id REF 12,15

      setFilms(response.data.images.backdrops.slice(9, 13));
    };
    listFilms();
  }, []);
  return (
    <>
      <CCarousel
        controls
        indicators
        dark
        interval={4000}
        transition="crossfade"
      >
        {films.map((element, index) => {
          return (
            <CCarouselItem>
              <CImage
                className="d-block  imgCarousel"
                src={`https://image.tmdb.org/t/p/original${element.file_path}`}
                alt="slide 1"
              />
            </CCarouselItem>
          );
        })}
      </CCarousel>
    </>
  );
};
