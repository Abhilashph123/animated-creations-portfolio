import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text3D, Center } from "@react-three/drei";
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

const skills = [
  { name: "React", level: 95, color: "#61DAFB" },
  { name: "TypeScript", level: 90, color: "#3178C6" },
  { name: "Node.js", level: 88, color: "#339933" },
  { name: "Three.js", level: 85, color: "#3ECFEF" },
  { name: "GSAP", level: 82, color: "#88CE02" },
  { name: "Next.js", level: 90, color: "#FFFFFF" },
];

export const Skills3D = () => {
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
        y: 100,
        opacity: 0,
        scale: 0.8,
      });

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
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

      // Parallax effect
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
          <IconBox position={[4, 3, -3]} color="#3178C6" delay={1} />
          <IconBox position={[-5, -2, -4]} color="#339933" delay={2} />
          <IconBox position={[5, -2, -2]} color="#3ECFEF" delay={3} />
          <IconBox position={[0, 4, -5]} color="#88CE02" delay={4} />
          <IconBox position={[0, -4, -3]} color="#A855F7" delay={5} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-center mb-20 text-gradient neon-text"
        >
          Tech Arsenal
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-500 group cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transform: "perspective(1000px)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <div
                  className="w-16 h-16 rounded-xl neon-border flex items-center justify-center"
                  style={{ backgroundColor: `${skill.color}20` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Proficiency</span>
                  <span className="text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-secondary/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full rounded-full neon-glow transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, #3ECFEF)`,
                    }}
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 group-hover:text-foreground transition-colors">
                Advanced expertise in modern {skill.name} development
              </p>
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
