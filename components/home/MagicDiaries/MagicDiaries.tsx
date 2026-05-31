import { getAllDiaries } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import DiaryMosaicGallery from "./DiaryMosaicGallery";
import styles from "./MagicDiaries.module.css";

const MagicDiaries = async () => {
  const diaries = await getAllDiaries();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Magic Diaries
      </h2>
      <Container>
        {diaries && diaries.length > 0 ?
          <DiaryMosaicGallery diaries={diaries} />
        : <p className={styles.empty}>
            No diaries available yet.
          </p>
        }
      </Container>
    </div>
  );
};

export default MagicDiaries;
