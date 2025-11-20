import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Float, Box } from "@react-three/drei";

const ProjectCube = ({ color }: { color: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Box>
    </Float>
  );
};

const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack web application built with React and Node.js",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#3ECFEF",
  },
  {
    title: "Project Beta",
    description: "Mobile-first e-commerce platform with modern UI/UX",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    color: "#A855F7",
  },
  {
    title: "Project Gamma",
    description: "Real-time collaboration tool with WebSocket integration",
    tech: ["Vue.js", "Socket.io", "Express"],
    color: "#3ECFEF",
  },
];

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary transition-all card-glow group"
            >
              {/* 3D Canvas Header */}
              <div className="h-48 bg-secondary/50 relative">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <ProjectCube color={project.color} />
                </Canvas>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </button>
                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                    <span>Demo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
