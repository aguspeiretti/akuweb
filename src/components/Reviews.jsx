import { useState, useEffect } from "react";
import data from "../assets/review ";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const reviews = data;
  const [isAnimating, setIsAnimating] = useState(false);

  const getVisibleTestimonials = () => {
    const items = [...reviews];
    return items.concat(items).concat(items);
  };

  const visibleTestimonials = getVisibleTestimonials();

  const handleTransition = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);
    if (direction === "next") {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex >= reviews.length * 2 ? reviews.length : newIndex;
      });
    } else {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        return newIndex < 0 ? reviews.length - 1 : newIndex;
      });
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextSlide = () => handleTransition("next");
  // eslint-disable-next-line no-unused-vars
  const prevSlide = () => handleTransition("prev");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 2500);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating]);

  const getTransformStyles = (offset) => {
    // Aumentamos significativamente la separación en el eje X
    if (offset === -1) return "translate-x-96 -translate-y-8"; // Cambiado de translate-x-24 a translate-x-96
    if (offset === 1) return "-translate-x-96 -translate-y-8"; // Cambiado de -translate-x-24 a -translate-x-96
    return "translate-y-0";
  };

  const getZIndex = (offset) => {
    return offset === 0 ? "z-20" : "z-10";
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[80%] overflow-hidden ">
      <div className="h-full flex items-center justify-center ">
        {/* Botón previo */}
        {/* <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-4 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300 disabled:opacity-50"
        >
          ←
        </> */}

        {/* Testimonios visibles */}
        <div className="flex items-center justify-center ">
          {[-1, 0, 1].map((offset) => {
            const index =
              (currentIndex + offset + visibleTestimonials.length) %
              visibleTestimonials.length;
            const testimonial = visibleTestimonials[index];
            const isCenter = offset === 0;

            return (
              <div
                key={`${testimonial.id}-${index}`}
                className={`absolute transition-all duration-500 ease-in-out transform
                  ${getTransformStyles(offset)}
                  ${getZIndex(offset)}
                  ${isCenter ? "opacity-100" : "opacity-60"}
                  ${isAnimating ? "transition-transform" : ""}
                `}
                style={{
                  transitionProperty: "all",
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={`bg-transparet rounded-lg p-6 shadow-lg transform
                    ${isCenter ? "md:scale-150 mb-14" : "scale-90"}
                    transition-all duration-500 ease-in-out
                    hover:shadow-xl
                    w-80
                  `}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover w-full h-full transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-white text-2xl md:text-xl capitalize mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-indigo-300 text-lg md:text-sm mb-4">
                      {testimonial.job}
                    </p>
                    <p className="text-gray-100 text-lg md:text-sm line-clamp-4 font-semibold">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón siguiente */}
        {/* <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-4 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-300 disabled:opacity-50"
        >
          →
        </button> */}
      </div>
    </div>
  );
};

export default Reviews;
