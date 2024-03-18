import AppendDots from "../components/Carousel";
import TextContent from "../components/TextContent";
import "../assets/styles/HomePage.scss";

const HomePage = () => {
  return (
    <>
      <AppendDots></AppendDots>
      <TextContent></TextContent>
      <div className="ad-banner"></div>
    </>
  );
};

export default HomePage;
