interface CarouselDotsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({ totalSlides, currentSlide, onDotClick }: CarouselDotsProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`
            rounded-full transition-all duration-300 cursor-pointer   
            ${
              currentSlide === index ? "w-8 h-3 bg-white" : (
                "w-3 h-3 bg-white/50 hover:bg-white/80"
              )
            }
          `}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
