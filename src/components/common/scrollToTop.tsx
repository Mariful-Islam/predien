import { useEffect, useState } from 'react';
import { GoArrowUp } from 'react-icons/go';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Show button after 300px of scroll
    } else {
      setIsVisible(false); // Hide button when back to the top
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to the scroll event
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${ isVisible ? 'block' : 'hidden' } z-50 bg-green-500 fixed bottom-4 right-4 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer hover:bg-green-700 duration-200`}
      onClick={scrollToTop}
    >
      <GoArrowUp className='text-white h-5 w-5' />
    </div>
  );
};

export default ScrollToTop;
