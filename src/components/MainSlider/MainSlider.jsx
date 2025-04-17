import Style from './MainSlider.module.css';
import slider1 from "../../assets/images/coffee.jpg";
import slider2 from "../../assets/images/Chicken-and-Vegetable.jpg";
import slider3 from "../../assets/images/chocolate.jpeg";
import slider4 from "../../assets/images/Bakery-Bread-Pastry.jpg";
import slider5 from "../../assets/images/cake.jpg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false
    };
  return ( <>
    <div className="row">
      <div className="w-3/4">
        <Slider {...settings}>
          <img  src={slider1} className='w-full h-[340px]'/>
          <img  src={slider4} className='w-full h-[340px]'/>
          <img  src={slider5} className='w-full h-[340px]'/>
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={slider2} className='w-full h-[170px]'/>
        <img src={slider3} className='w-full h-[170px]'/>
      </div>
    </div>
    </> )
}
