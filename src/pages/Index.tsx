import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation3D } from "@/components/Navigation3D";
import { Hero3D } from "@/components/Hero3D";
import { About3D } from "@/components/About3D";
import { Skills3D } from "@/components/Skills3D";
import { Projects3D } from "@/components/Projects3D";
import { Contact3D } from "@/components/Contact3D";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <Navigation3D />
        <Hero3D />
        <About3D />
        <Skills3D />
        <Projects3D />
        <Contact3D />
      </div>
    </SmoothScroll>
  );
};

export default Index;
