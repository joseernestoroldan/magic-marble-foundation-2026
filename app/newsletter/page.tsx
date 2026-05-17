import { getAllChimp } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import NewsletterList from "@/components/Newsletter/NewsletterList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Magic Marble Foundation",
  description:
    "Stay up to date with the Magic Marble Foundation. Browse our newsletter archive for the latest updates, stories, and initiatives.",
};

const NewsletterPage = async () => {
  const chimpData = await getAllChimp();

  // Filter entries that have a chimpLink
  const newsletters = chimpData?.filter((item) => item.chimpLink) ?? [];

  return (
    <div className="flex flex-col items-center gap-24 w-full pt-24">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">
        Our Newsletter
      </h2>
      <Container>
        {newsletters.length > 0 ? (
          <NewsletterList newsletters={newsletters} />
        ) : (
          <p className="text-slate-400 text-center py-12">
            No newsletters available yet.
          </p>
        )}
      </Container>
    </div>
  );
};

export default NewsletterPage;