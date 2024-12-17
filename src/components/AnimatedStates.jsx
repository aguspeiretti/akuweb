/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";

const AnimatedStats = ({ value, label }) => {
  const [currentValue, setCurrentValue] = useState(0); // Valor animado
  const elementRef = useRef(null); // Referencia al componente
  const [hasAnimated, setHasAnimated] = useState(false); // Controla si ya se animó

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue(0, value, 2000); // Animar en 2 segundos
          setHasAnimated(true); // Evita reanimar si el usuario vuelve a hacer scroll
        }
      },
      { threshold: 0.5 } // 50% visible en la pantalla
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, hasAnimated]);

  const animateValue = (start, end, duration) => {
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    let current = start;
    const increment = end > start ? 1 : -1;

    const timer = setInterval(() => {
      current += increment;
      setCurrentValue(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  return (
    <div
      ref={elementRef}
      className="text-center my-4 flex flex-col justify-center items-center"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <p className="text-4xl font-bold text-indigo-600">{`+${currentValue}`}</p>
      <p className="text-lg text-gray-300">{label}</p>
    </div>
  );
};

export default AnimatedStats;
