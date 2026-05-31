import VideoFrame from "@/components/VideoFrame/VideoFrame";
import styles from "./MagicFrame.module.css";

const MagicFrame = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>A Bit Of Magic</h2>

      <VideoFrame src="https://www.youtube.com/embed/Y8e-XFkNoAk?autoplay=1&mute=1" />
    </section>
  );
};

export default MagicFrame;
