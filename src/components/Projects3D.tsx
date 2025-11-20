import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const ProjectCube = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.15}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </Float>
  );
};

const projects = [
  {
    title: "Neural Canvas",
    description: "AI-powered 3D art generation platform with real-time rendering",
    tech: ["React", "Three.js", "TensorFlow"],
    color: "#3ECFEF",
    gradient: "from-neon-cyan to-neon-purple",
  },
  {
    title: "Quantum Dashboard",
    description: "Next-gen analytics platform with immersive data visualization",
    tech: ["Next.js", "GSAP", "D3.js"],
    color: "#A855F7",
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    title: "MetaSpace",
    description: "Virtual collaboration hub with WebRTC and spatial audio",
    tech: ["WebRTC", "Socket.io", "React"],
    color: "#3ECFEF",
    gradient: "from-neon-cyan to-primary",
  },
];

export const Projects3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        scale: 0.9,
      });

      // Project cards reveal
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
            y: 150,
            opacity: 0,
            rotateX: -30,
            scale: 0.8,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-neon-purple blur-[150px] rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-neon-cyan blur-[150px] rounded-full opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-center mb-6 text-gradient neon-text"
        >
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-20 max-w-3xl mx-auto">
          Pushing the boundaries of web technology with immersive experiences
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 group cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* 3D Canvas Header */}
              <div className="h-64 bg-secondary/20 relative overflow-hidden">
                <Canvas camera={{ position: [0, 0, 3.5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={2} color={project.color} />
                  <ProjectCube color={project.color} />
                </Canvas>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 glass text-sm rounded-full font-medium hover:neon-border transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-primary hover:scale-110 transition-all neon-border">
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 glass-card rounded-xl text-primary hover:scale-110 transition-all neon-border">
                    <ExternalLink className="w-5 h-5" />
                    <span>Live</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3ECFEF_1px,transparent_1px),linear-gradient(to_bottom,#3ECFEF_1px,transparent_1px)] bg-[size:8rem_8rem]" />
      </div>
    </section>
  );
};
