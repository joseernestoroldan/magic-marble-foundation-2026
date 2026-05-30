import Container from "@/components/Layouts/Container/Container";
import Image from "next/image";
import { focusAreas } from "./focusAreasData";
import styles from "./FocusAreas.module.css";

const FocusAreas = () => {
  return (
    <Container>
      <div className={styles.section}>
        
          <h2 className={styles.title}>
            Our Focus Areas
          </h2>

        <div className={styles.grid}>
          {focusAreas.map((area) => (
            <div key={area.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={area.imageUrl} 
                  alt={area.title} 
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.overlay}></div>
                <div className={styles.overlayTitle}>
                  <h3 className={styles.overlayTitleText}>
                    {area.title}
                  </h3>
                </div>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.description}>
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FocusAreas;
