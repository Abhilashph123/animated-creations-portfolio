import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { 
  Code2, 
  Database, 
  Layers, 
  Cloud, 
  Palette, 
  Globe,
  Server,
  GitBranch
} from "lucide-react";

const FloatingOrb = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere args={[0.3, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="hsl(189, 94%, 55%)"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    color: "from-primary/20 to-primary/5",
    technologies: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js", level: 80 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "from-glow/20 to-glow/5",
    technologies: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
      { name: "WebSocket", level: 80 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "from-primary/20 to-primary/5",
    technologies: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 90 },
      { name: "Redis", level: 75 },
      { name: "Prisma", level: 80 },
      { name: "Supabase", level: 85 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "from-glow/20 to-glow/5",
    technologies: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "GitHub Actions", level: 85 },
    ],
  },
  {
    category: "Design",
    icon: Palette,
    color: "from-primary/20 to-primary/5",
    technologies: [
      { name: "Figma", level: 85 },
      { name: "UI/UX Design", level: 90 },
      { name: "Responsive Design", level: 95 },
      { name: "Animation", level: 85 },
      { name: "Prototyping", level: 80 },
    ],
  },
  {
    category: "Tools & Other",
    icon: GitBranch,
    color: "from-glow/20 to-glow/5",
    technologies: [
      { name: "Git", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 90 },
      { name: "Jest", level: 80 },
      { name: "Webpack", level: 75 },
    ],
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <FloatingOrb position={[-3, 2, 0]} />
          <FloatingOrb position={[3, -2, -2]} />
          <FloatingOrb position={[0, 3, -1]} />
          <FloatingOrb position={[-2, -3, -2]} />
          <FloatingOrb position={[4, 0, -3]} />
        </Canvas>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, categoryIndex) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, rotateY: 0 }
                    : { opacity: 0, scale: 0.9, rotateY: -20 }
                }
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border overflow-hidden hover:border-primary transition-all card-glow group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`p-6 bg-gradient-to-br ${skill.color} border-b border-border/50`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-background/80 rounded-xl group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{skill.category}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -20 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + techIndex * 0.05,
                      }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{tech.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {tech.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.1 + techIndex * 0.05 + 0.2,
                            ease: "easeOut",
                          }}
                          className="h-full bg-gradient-to-r from-primary to-glow rounded-full relative"
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            animate={{
                              x: ["-100%", "100%"],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
