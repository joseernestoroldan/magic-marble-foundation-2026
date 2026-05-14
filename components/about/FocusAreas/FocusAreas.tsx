import Container from "@/components/Layouts/Container/Container";
import { focusAreas } from "./focusAreasData";
import Image from "next/image";

const FocusAreas = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-12 py-16 w-full">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Our Focus Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the key areas where Magic Marble Foundation makes a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {focusAreas.map((area) => (
            <div 
              key={area.id} 
              className="group flex flex-col bg-card text-card-foreground rounded-3xl overflow-hidden shadow-md border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={area.imageUrl} 
                  alt={area.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white">
                    {area.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow bg-card">
                <p className="text-muted-foreground leading-relaxed text-base">
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
