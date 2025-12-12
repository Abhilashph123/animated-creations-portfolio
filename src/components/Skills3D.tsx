import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const IconBox = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + delay) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime + delay) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <RoundedBox ref={meshRef} args={[1, 1, 1]} position={position} radius={0.1}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </RoundedBox>
    </Float>
  );
};

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95, color: "#61DAFB" },
      { name: "Next.js", level: 90, color: "#FFFFFF" },
      { name: "JavaScript", level: 95, color: "#F7DF1E" },
      { name: "HTML/CSS", level: 98, color: "#E34F26" },
      { name: "jQuery", level: 85, color: "#0769AD" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88, color: "#339933" },
      { name: "PHP", level: 92, color: "#777BB4" },
      { name: "MongoDB", level: 85, color: "#47A248" },
      { name: "MySQL", level: 90, color: "#4479A1" },
    ],
  },
  {
    title: "WordPress",
    skills: [
      { name: "Plugin Dev", level: 95, color: "#21759B" },
      { name: "Theme Dev", level: 92, color: "#21759B" },
      { name: "Custom Blocks", level: 90, color: "#21759B" },
      { name: "API Integration", level: 88, color: "#21759B" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "Docker", level: 80, color: "#2496ED" },
    ],
  },
];

export const Skills3D = () => {
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

      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
            y: 100,
            opacity: 0,
            rotateY: -20,
            scale: 0.8,
          });
        }
      });

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        backgroundPosition: "50% 100%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allSkillsFlat = skillCategories.flatMap((cat) => cat.skills);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(62, 207, 239, 0.1) 0%, transparent 50%)",
        backgroundSize: "100% 100%",
        backgroundPosition: "50% 0%",
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3ECFEF" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#A855F7" />
          
          <IconBox position={[-4, 3, -2]} color="#61DAFB" delay={0} />
          <IconBox position={[4, 3, -3]} color="#339933" delay={1} />
          <IconBox position={[-5, -2, -4]} color="#777BB4" delay={2} />
          <IconBox position={[5, -2, -2]} color="#21759B" delay={3} />
          <IconBox position={[0, 4, -5]} color="#F05032" delay={4} />
          <IconBox position={[0, -4, -3]} color="#47A248" delay={5} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-center mb-8 text-gradient neon-text"
        >
          Tech Arsenal
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          5+ years of experience building scalable web solutions with modern technologies
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              ref={(el) => (cardsRef.current[catIndex] = el)}
              className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-500 group"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}, #3ECFEF)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Languages</h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {["English", "Hindi", "Malayalam"].map((lang) => (
              <span
                key={lang}
                className="px-6 py-3 glass-card rounded-full text-primary font-medium hover:scale-110 transition-all neon-border"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3ECFEF_1px,transparent_1px),linear-gradient(to_bottom,#3ECFEF_1px,transparent_1px)] bg-[size:6rem_6rem]" />
      </div>
    </section>
  );
};
