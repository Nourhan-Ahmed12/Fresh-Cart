import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../assets/images/coffee.jpg";
import slider2 from "../../assets/images/Chicken-and-Vegetable.jpg";
import slider3 from "../../assets/images/chocolate.jpeg";
import slider4 from "../../assets/images/Bakery-Bread-Pastry.jpg";
import slider5 from "../../assets/images/cake.jpg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2 lg:gap-4">
      {/* Main Slider (75% width on desktop) */}
      <div className="w-full lg:w-3/4">
        <Slider {...settings}>
          <div>
            <img 
              src={slider1} 
              className="w-full h-[170px] sm:h-[250px] md:h-[340px] object-cover" 
              alt="Coffee" 
            />
          </div>
          <div>
            <img 
              src={slider4} 
              className="w-full h-[170px] sm:h-[250px] md:h-[340px] object-cover" 
              alt="Bakery" 
            />
          </div>
          <div>
            <img 
              src={slider5} 
              className="w-full h-[170px] sm:h-[250px] md:h-[340px] object-cover" 
              alt="Cake" 
            />
          </div>
        </Slider>
      </div>

      {/* Side Images (25% width on desktop) */}
      <div className="w-full lg:w-1/4 flex flex-col gap-2 lg:gap-4">
        <img 
          src={slider2} 
          className="w-full h-[80px] sm:h-[120px] md:h-[170px] object-cover" 
          alt="Chicken" 
        />
        <img 
          src={slider3} 
          className="w-full h-[80px] sm:h-[120px] md:h-[170px] object-cover" 
          alt="Chocolate" 
        />
      </div>
    </div>
  );
}