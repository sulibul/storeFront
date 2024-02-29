import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { AJAX } from "../utils/getJson";
import { API_URL } from "../config";
import "./Carousel.scss";

// type ad = { id: number; name: string; img_url: string; ad_url: string };

const Carousel = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentIndex, setCurrent] = useState(0);

  const fetchData = async () => {
    const result = await AJAX(`${API_URL}/ad/`);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="carousel">
        <div
          className="carousel-wraper"
          style={{ transform: `translate:(-${currentIndex * 100})` }}
        >
          {data.map((ad, index) => (
            <img
              src={ad.img_url}
              alt={ad.name}
              className={
                index == currentIndex
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            />
          ))}
        </div>
      </div>
      <div className="carousel_buttons">
        {data.map((ad, index) => (
          <Button
            key={index}
            onClick={() => {}}
            onMouseEnter={() => setCurrent(index)}
          >
            <a>{ad.name}</a>
          </Button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
