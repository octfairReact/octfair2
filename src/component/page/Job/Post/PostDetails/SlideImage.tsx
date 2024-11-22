import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideImage: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 2, // 화면에 표시할 슬라이드 개수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 개수
    autoplay: true, // 자동 재생
    autoplaySpeed: 2000, // 자동 재생 속도 (ms)
    arrows: false, // 화살표 표시
    adaptiveHeight: true, // 슬라이드 높이 자동 조정
    responsive: [
      {
        breakpoint: 768, // 모바일 화면
        settings: {
          slidesToShow: 1, // 한 개의 슬라이드 표시
        },
      },
      {
        breakpoint: 1024, // 태블릿 화면
        settings: {
          slidesToShow: 2, // 두 개의 슬라이드 표시
        },
      },
    ],
  };

  return (
    <>
      <div
        style={{
          maxWidth: '1200px', // 슬라이더 최대 너비 제한
          margin: '0 auto', // 가운데 정렬
          padding: '2rem 0',
          overflow: 'hidden',
        }}
      >
        <Slider {...settings}>
          <div>
            <img
              src="https://placehold.co/400"
              alt="Slide 1"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover', // 이미지 잘라내기
                borderRadius: '0px',
              }}
            />
          </div>
          <div>
            <img
              src="https://via.placeholder.com/800x400?text=Slide+2"
              alt="Slide 2"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover', // 이미지 잘라내기
                borderRadius: '0px',
              }}
            />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default SlideImage;
