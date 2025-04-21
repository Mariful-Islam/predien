import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface CarouselItem {
  image: any;

  client_name: string;
  review: string;
  rating: number
}

const Carousel = () => {
  const items: CarouselItem[] = [
    { image: <FaUser />, client_name: "", review: "", rating: 5 },
    { image: <FaUser />, client_name: "", review: "", rating: 5 },
    { image: <FaUser />, client_name: "", review: "", rating: 4.5 },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
            {item.review}
            {item.image} 
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &#8594;
      </button>
    </div>
  );
};





export default function Clients() {
  return (
    <div><Carousel/></div>
  )
}
