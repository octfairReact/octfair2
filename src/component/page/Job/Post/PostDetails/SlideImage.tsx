import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideImage: React.FC = () => {
  // Slider 설정 타입 적용
  const settings: Settings = {
    dots: false,
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 2, // 화면에 표시될 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 수
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 2000, // 자동 재생 속도
    arrows: true,
  };

  return (
    <>
      <div className="mt-5"></div>
      <div style={{ width: '100%', margin: '0 auto', padding: '2rem 0' }}>
        <Slider {...settings}>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+1"
              alt="Slide 1"
              style={{ width: '100%', height: 'auto', borderRadius: '0px' }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Slide 2"
              style={{ width: '100%', height: 'auto', borderRadius: '0px' }}
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default SlideImage;
