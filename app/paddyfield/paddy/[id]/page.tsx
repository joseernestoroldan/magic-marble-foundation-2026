import { getAllPaddyField, getPortalPaddyFieldById } from "@/client";
import Container from "@/components/Layouts/Container/Container";
import ImageGallery from "@/components/PaddyField/ImageGallery";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"] });

export async function generateStaticParams() {
  const paddyFields = await getAllPaddyField();
  if (!paddyFields) return [];
  return paddyFields.map((p) => ({
    id: p._id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await getPortalPaddyFieldById(params.id);
  if (!data || data.length === 0) {
    return { title: "Paddy Field Not Found" };
  }
  const paddy = data[0];
  return {
    title: `${paddy.title} | Paddy Field`,
    description: paddy.description || "Learn more about this paddy field.",
    openGraph: {
      title: paddy.title,
      description: paddy.description || undefined,
      images: paddy.mainImage ? [paddy.mainImage] : undefined,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function PaddyFieldDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getPortalPaddyFieldById(params.id);

  if (!data || data.length === 0) {
    return notFound();
  }

  const paddy = data[0];

  const formattedDate = new Date(paddy._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const images = [];
  if (paddy.mainImage) images.push({ src: paddy.mainImage, alt: `${paddy.title} - Image 1`, hotSpot: paddy.hotSpot });
  if (paddy.secondImage) images.push({ src: paddy.secondImage, alt: `${paddy.title} - Image 2`, hotSpot: paddy.hotSpotSecond });
  if (paddy.thirdImage) images.push({ src: paddy.thirdImage, alt: `${paddy.title} - Image 3`, hotSpot: paddy.hotSpotThird });
  if (paddy.fourthImage) images.push({ src: paddy.fourthImage, alt: `${paddy.title} - Image 4`, hotSpot: paddy.hotSpotFourth });

  return (
    <div className="min-h-screen bg-[#f4fdf8] pb-24">
      {/* Editorial Header */}
      <div className="w-full bg-[#042f1a] pt-32 pb-24 px-4 text-center relative overflow-hidden">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <Container>
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
            {paddy.topPick && (
               <span className="inline-block bg-[#10b981] text-[#042f1a] text-xs font-bold px-4 py-1.5 uppercase tracking-[0.2em] mb-8">
                 Editor's Top Pick
               </span>
            )}
            <h1 className={`${playfair.className} text-[#f4fdf8] font-bold text-4xl md:text-5xl lg:text-7xl capitalize mb-8 leading-tight tracking-tight drop-shadow-lg`}>
              {paddy.title}
            </h1>
            <div className="w-16 h-1 bg-[#10b981] mb-8"></div>
            <p className="text-[#10b981] font-bold text-sm tracking-widest uppercase">
              {formattedDate}
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto -mt-16 relative z-20">
          
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="w-full mb-16 shadow-[0_20px_50px_rgba(4,47,26,0.2)] rounded-sm overflow-hidden">
              <ImageGallery images={images} />
            </div>
          )}

          {/* Description (Editorial Intro) */}
          {paddy.description && (
            <p className={`${playfair.className} text-[#042f1a] text-2xl md:text-3xl leading-relaxed italic text-center px-4 md:px-12 mb-16 font-medium`}>
              "{paddy.description}"
            </p>
          )}

          {/* Divider */}
          <div className="w-full flex justify-center mb-16">
            <span className="text-[#10b981] tracking-[0.5em] text-xl">•••</span>
          </div>

          {/* Content */}
          {paddy.contenido && (
            <div className="w-full text-lg md:text-xl text-[#042f1a]/80 space-y-8 font-serif leading-relaxed px-4 md:px-0
              [&>p]:mb-8 
              [&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-bold [&>h2]:mt-16 [&>h2]:mb-8 [&>h2]:text-[#042f1a] [&>h2]:font-sans [&>h2]:tracking-tight
              [&>h3]:text-2xl [&>h3]:md:text-3xl [&>h3]:font-bold [&>h3]:mt-12 [&>h3]:mb-6 [&>h3]:text-[#042f1a] [&>h3]:font-sans
              [&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-8 [&>ul>li]:mb-4 [&>ul>li]:marker:text-[#10b981]
              [&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-8 [&>ol>li]:mb-4 [&>ol>li]:marker:text-[#042f1a]
              [&>blockquote]:border-l-2 [&>blockquote]:border-[#10b981] [&>blockquote]:pl-8 [&>blockquote]:italic [&>blockquote]:my-12 [&>blockquote]:text-[#042f1a] [&>blockquote]:text-2xl
              [&_a]:text-[#10b981] [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#042f1a] transition-colors">
              <PortableText value={paddy.contenido as any} />
            </div>
          )}

          {/* Video */}
          {paddy.youtubeLink && (
            <div className="w-full aspect-video rounded-sm overflow-hidden shadow-2xl mt-16 bg-[#042f1a]">
              <iframe
                src={paddy.youtubeLink.replace("watch?v=", "embed/")}
                title={paddy.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Back Link */}
          <div className="w-full mt-24 pt-8 border-t border-[#042f1a]/10 flex justify-center">
            <Link
              href="/paddyfield"
              className="inline-flex items-center justify-center gap-3 text-[#042f1a] hover:text-[#10b981] font-bold text-sm uppercase tracking-widest transition-colors py-4 px-8 border border-transparent hover:border-[#10b981]/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Return to Portal
            </Link>
          </div>

        </div>
      </Container>
    </div>
  );
}
