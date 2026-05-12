import { getAllDiaries } from "@/client";
import Container from "@/components/layouts/container/Container";
import DiaryMosaicGallery from "./DiaryMosaicGallery";

const MagicDiaries = async () => {
  const diaries = await getAllDiaries();
  return (
    <div className="flex flex-col items-center gap-24">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">
        Magic Diaries
      </h2>
      <Container>
        {diaries && diaries.length > 0 ? (
          <DiaryMosaicGallery diaries={diaries} />
        ) : (
          <p className="text-slate-400 text-center py-12">
            No diaries available yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default MagicDiaries;
