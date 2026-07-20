import React, { useState, useEffect } from "react";
import type { DemoProject } from "../constants/demoProjects";

interface CarouselProps {
  projects: DemoProject[];
  autoPlay?: boolean;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  projects,
  autoPlay = true,
  interval = 4000,
}) => {
  const [current, setCurrent] = useState(0);
  const length = projects.length;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % length),
      interval
    );
    return () => clearInterval(timer);
  }, [autoPlay, interval, length]);

  const goTo = (index: number) => setCurrent(index);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-full relative block"
          >
            <img
              src={project.image}
              alt={project.title}
              className="carousel-img"
            />
          </a>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 pointer-events-none">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`pointer-events-auto w-3 h-3 rounded-full ${
              current === index ? "bg-purple-600" : "bg-gray-400"
            } transition-colors`}
          />
        ))}
      </div>

      {/* Title below carousel */}
      <div className="carousel-title">
        {projects[current].title}
      </div>
    </div>
  );
};

export default Carousel;
