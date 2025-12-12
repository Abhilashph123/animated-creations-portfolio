import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const FloatingIcon = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5 + delay) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <RoundedBox ref={meshRef} args={[0.8, 0.8, 0.8]} position={position} radius={0.15}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </Float>
  );
};

const skillCategories = [
  {
    title: "Frontend",
    gradient: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 98 },
    ],
  },
  {
    title: "Backend",
    gradient: "from-violet-500 to-purple-500",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "PHP", level: 92 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 90 },
    ],
  },
  {
    title: "WordPress",
    gradient: "from-pink-500 to-rose-500",
    skills: [
      { name: "Plugin Dev", level: 95 },
      { name: "Theme Dev", level: 92 },
      { name: "Gutenberg", level: 90 },
      { name: "REST API", level: 88 },
    ],
  },
  {
    title: "DevOps",
    gradient: "from-orange-500 to-amber-500",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
    ],
  },
];

export const Skills3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-title", {
        scrollTrigger: {
          trigger: ".skills-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: ".skill-cards",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".lang-badge", {
        scrollTrigger: {
          trigger: ".lang-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-blue/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-purple/10 blur-[150px] rounded-full" />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#b482ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6b8aff" />
          
          <FloatingIcon position={[-5, 3, -3]} color="#b482ff" delay={0} />
          <FloatingIcon position={[5, 2, -4]} color="#6b8aff" delay={1} />
          <FloatingIcon position={[-4, -3, -5]} color="#ff6b9d" delay={2} />
          <FloatingIcon position={[4, -2, -3]} color="#ffa94d" delay={3} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="skills-title font-display text-5xl md:text-7xl font-bold text-center mb-6">
          <span className="text-gradient">Tech Arsenal</span>
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          5+ years building scalable solutions with modern technologies
        </p>

        <div className="skill-cards grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="skill-card glass-card-hover rounded-2xl p-6"
            >
              <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${category.gradient} mb-6`}>
                <h3 className="text-sm font-bold text-white">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="lang-section text-center">
          <h3 className="font-display text-2xl font-bold mb-8">Languages</h3>
          <div className="flex justify-center flex-wrap gap-4">
            {["English", "Hindi", "Malayalam"].map((lang) => (
              <span
                key={lang}
                className="lang-badge px-6 py-3 glass-card-hover rounded-2xl font-medium cursor-default"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
