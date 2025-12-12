import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Code, Calendar } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const FloatingShape = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <RoundedBox ref={meshRef} args={[0.8, 0.8, 0.8]} position={position} radius={0.1}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </RoundedBox>
    </Float>
  );
};

const experience = [
  {
    title: "Full Stack Developer",
    company: "Aproit Solutions",
    location: "Infopark Thrissur",
    period: "July 2025 - Present",
    description: "Building interactive UIs with React/Next.js, Node.js APIs, WordPress customization, and MongoDB optimization.",
    icon: Briefcase,
    color: "#3ECFEF",
  },
  {
    title: "Full Stack Developer (WordPress)",
    company: "Midnay Cyberpark Kozhikode",
    location: "Training Program",
    period: "Dec 2023 - June 2025",
    description: "Specialized training in WordPress development, custom plugins, themes, and modern JavaScript frameworks.",
    icon: Code,
    color: "#A855F7",
  },
  {
    title: "Full Stack Developer Intern",
    company: "Freelance Projects",
    location: "Remote",
    period: "Jan 2023 - May 2023",
    description: "Gained hands-on experience building real-world web applications and WordPress solutions.",
    icon: GraduationCap,
    color: "#F43F5E",
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2018 - 2022",
    description: "4+ years delivering custom WordPress solutions, theme development, and web applications for clients worldwide.",
    icon: Briefcase,
    color: "#47A248",
  },
];

const education = [
  {
    degree: "BCA",
    institution: "Manipal University",
    year: "2025",
  },
  {
    degree: "Higher Secondary",
    institution: "Avanoor Higher Secondary School",
    year: "Completed",
  },
];

export const About3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            scale: 0.9,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3ECFEF" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#A855F7" />
          
          <FloatingShape position={[-5, 3, -2]} color="#3ECFEF" />
          <FloatingShape position={[5, 3, -3]} color="#A855F7" />
          <FloatingShape position={[-4, -3, -4]} color="#F43F5E" />
          <FloatingShape position={[4, -3, -2]} color="#47A248" />
        </Canvas>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple blur-[150px] rounded-full opacity-15 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan blur-[150px] rounded-full opacity-15 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-center mb-8 text-gradient neon-text"
        >
          About Me
        </h2>

        {/* Summary */}
        <div className="glass-card p-8 rounded-3xl mb-16 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
            Highly skilled <span className="text-primary font-semibold">WordPress Developer</span> and{" "}
            <span className="text-primary font-semibold">Full-Stack Engineer</span> with{" "}
            <span className="text-primary font-semibold">5+ years</span> of experience. Specialized in building
            custom WordPress solutions, React applications, and modern web experiences. Proficient in{" "}
            <span className="text-primary">Next.js, Node.js, MongoDB</span>, and advanced MySQL optimization.
          </p>
        </div>

        {/* Experience Timeline */}
        <h3 className="text-3xl font-bold text-center mb-12">Professional Journey</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {experience.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.title + exp.company}
                ref={(el) => (cardsRef.current[index] = el)}
                className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 neon-border"
                    style={{ backgroundColor: `${exp.color}20` }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <h3 className="text-3xl font-bold text-center mb-8">Education</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="glass-card px-8 py-6 rounded-2xl hover:scale-105 transition-all text-center"
            >
              <GraduationCap className="w-10 h-10 text-primary mx-auto mb-3" />
              <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
              <p className="text-muted-foreground">{edu.institution}</p>
              <span className="text-sm text-primary">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3ECFEF_1px,transparent_1px),linear-gradient(to_bottom,#3ECFEF_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      </div>
    </section>
  );
};
