import { getAllDiaries } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import DiariesFullMosaic from "@/components/Diaries/DiariesFullMosaic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic Diaries | Magic Marble Foundation",
  description:
    "Browse all the Magic Diaries from the Magic Marble Foundation — stories, experiences, and updates from our community.",
};

const DiariesPage = async () => {
  const diaries = await getAllDiaries();

  return (
    <div className="flex flex-col items-center gap-24 w-full pt-24">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">
        Magic Diaries
      </h2>
      <Container>
        {diaries && diaries.length > 0 ? (
          <DiariesFullMosaic diaries={diaries} />
        ) : (
          <p className="text-slate-400 text-center py-12">
            No diaries available yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default DiariesPage;
