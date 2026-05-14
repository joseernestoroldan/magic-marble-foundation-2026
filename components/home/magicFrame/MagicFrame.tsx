import VideoFrame from "@/components/VideoFrame/VideoFrame";

const MagicFrame = () => {
  return (
    <section className="flex flex-col items-center gap-24 w-full">
      <h2 className="text-cyan-600 font-bold text-3xl">A Bit Of Magic</h2>

      <VideoFrame src="https://www.youtube.com/embed/Y8e-XFkNoAk?autoplay=1&mute=1" />
    </section>
  );
};

export default MagicFrame;
