import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const ProjectCube = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox ref={meshRef} args={[1.2, 1.2, 1.2]} radius={0.2}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </Float>
  );
};

const projects = [
  {
    title: "WordPress Plugin Suite",
    description: "Enterprise-grade plugins with custom Gutenberg blocks, REST API integrations, and advanced MySQL optimization.",
    tech: ["WordPress", "PHP", "MySQL", "REST API"],
    gradient: "from-blue-500 to-cyan-400",
    color: "#4d9fff",
  },
  {
    title: "Next.js E-Commerce",
    description: "Full-stack e-commerce with React, Next.js, MongoDB backend, and seamless payment integration.",
    tech: ["Next.js", "React", "MongoDB", "Node.js"],
    gradient: "from-violet-500 to-purple-500",
    color: "#b482ff",
  },
  {
    title: "Real-time Dashboard",
    description: "Interactive analytics dashboard with real-time data visualization and WebSocket connections.",
    tech: ["React", "Node.js", "WebSocket", "Docker"],
    gradient: "from-pink-500 to-rose-500",
    color: "#ff6b9d",
  },
  {
    title: "Theme Framework",
    description: "Scalable WordPress theme framework with Gutenberg support and performance optimization.",
    tech: ["WordPress", "PHP", "JavaScript", "CSS"],
    gradient: "from-orange-500 to-amber-500",
    color: "#ffa94d",
  },
  {
    title: "API Integration Hub",
    description: "Robust third-party API integration system with advanced error handling and debugging.",
    tech: ["PHP", "REST API", "WordPress", "MySQL"],
    gradient: "from-green-500 to-emerald-500",
    color: "#4ade80",
  },
  {
    title: "MongoDB Web App",
    description: "Modern full-stack application with Node.js backend and React frontend for seamless UX.",
    tech: ["MongoDB", "Node.js", "React", "Express"],
    gradient: "from-teal-500 to-cyan-500",
    color: "#2dd4bf",
  },
];

export const Projects3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".project-cards",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        rotateY: -10,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-pink/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-blue/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="projects-title font-display text-5xl md:text-7xl font-bold text-center mb-6">
          <span className="text-gradient">Featured Projects</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          From WordPress solutions to modern React applications — building end-to-end experiences
        </p>

        <div className="project-cards grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card group glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 3D Header */}
              <div className="h-44 relative overflow-hidden bg-secondary/30">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={1.5} color={project.color} />
                  <ProjectCube color={project.color} />
                </Canvas>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
                    <Github className="w-4 h-4" />
                    Code
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-sm font-medium hover:bg-secondary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
