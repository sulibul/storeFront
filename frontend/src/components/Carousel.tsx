import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { AJAX } from "../utils/getJson";
import { API_URL } from "../config";
import "../assets/styles/Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function AppendDots() {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const result = await AJAX(`${API_URL}/ad/`);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <div>{i + 1}</div>,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((ad, index) => (
          <img src={ad.img_url} alt={ad.name} className={"carousel_card"} />
        ))}
      </Slider>
    </div>
  );

  // return (
  //   <>
  //     <div className="carousel">
  //       <div
  //         className="carousel-wraper"
  //         style={{ transform: `translate:(-${currentIndex * 100})` }}
  //       >
  //         {data.map((ad, index) => (
  //           <img
  //             src={ad.img_url}
  //             alt={ad.name}
  //             className={
  //               index == currentIndex
  //                 ? "carousel_card carousel_card-active"
  //                 : "carousel_card"
  //             }
  //           />
  //         ))}
  //       </div>
  //     </div>
  //     <div className="carousel_buttons">
  //       {data.map((ad, index) => (
  //         <Button
  //           key={index}
  //           onClick={() => {}}
  //           onMouseEnter={() => setCurrent(index)}
  //         >
  //           <a>{ad.name}</a>
  //         </Button>
  //       ))}
  //     </div>
  //   </>
  // );
}

export default AppendDots;
