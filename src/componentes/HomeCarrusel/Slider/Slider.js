import React, {useContext, Component} from 'react'
import MyContext from '../../../Context';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import ActionAreaCard from '../../CardContenido/CardContenidoCarrusel';
import VideoPlayer from '../VideoCard/VideoPlayer';

//Funcion para mostrar en carrusel los videos agregados
function MySlider({ videos }) {
  const { handleVideoLoading, setVideoToPlay } = useContext(MyContext);
  // console.log('videos:', videos);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true, // Habilita la pausa al pasar el mouse
    responsive: [
      {
        breakpoint: 639, // Menos de 639px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991, // Entre 640px y 991px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1199, // Entre 991px y 1199px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1200, // Desde 1200px
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {videos && videos.map((video) => (
          <div key={video.id}>
            <div className="slide-container">
            <Link to={"/videoPlayer"}>
          <ActionAreaCard
              video={video}
              categoriaColor="yellow"
              onClick={() => handleVideoLoading(video.linkVideo)}
          />
        </Link>
            </div>
          </div>
          
        ))}
      </Slider>
    </div>
  );
}


export default MySlider;  