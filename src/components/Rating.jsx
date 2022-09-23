import { useState } from "react";
import { CardsMovies } from "./Movies";
import { Carousel } from "./Carousel";
import "./rating.css";
export const Rating = () => {
  const [rating, setRating] = useState(2);

  const onchange = (event) => {
    setRating(event.target.value);
  };
  return (
    <>
      <Carousel />
      <div className="rate  py-3 text-white mt-3">
        <h6 className="mb-0">Puntuación</h6>
        <div className="rating">
          <input
            type="radio"
            name="rating"
            value="10"
            id="5"
            onChange={onchange}
          />
          <label for="5">☆</label>
          <input
            type="radio"
            name="rating"
            value="8"
            id="4"
            onChange={onchange}
          />
          <label for="4">☆</label>
          <input
            type="radio"
            name="rating"
            value="6"
            id="3"
            onChange={onchange}
          />
          <label for="3">☆</label>
          <input
            type="radio"
            name="rating"
            value="4"
            id="2"
            onChange={onchange}
          />
          <label for="2">☆</label>
          <input
            type="radio"
            name="rating"
            value="2"
            id="1"
            onChange={onchange}
          />
          <label for="1">☆</label>
        </div>
        <CardsMovies rating={rating} />
      </div>
    </>
  );
};
