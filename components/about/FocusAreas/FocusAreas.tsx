import Container from "@/components/Layouts/Container/Container";
import { focusAreas } from "./focusAreasData";
import Image from "next/image";

const FocusAreas = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-24 w-full">
        
          <h2 className="text-cyan-600 font-bold text-3xl">
            Our Focus Areas
          </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {focusAreas.map((area) => (
            <div 
              key={area.id} 
              className="group flex flex-col rounded-[5px] overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
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
                <p className="text-muted-foreground leading-relaxed text-base text-gray-500">
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
