import styles from "./CarouselDots.module.css";

interface CarouselDotsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({ totalSlides, currentSlide, onDotClick }: CarouselDotsProps) => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`${styles.dot} ${currentSlide === index ? styles.active : styles.inactive}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
