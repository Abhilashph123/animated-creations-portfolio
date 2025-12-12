import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const FloatingSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
    </Float>
  );
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "abhilashph85@gmail.com", href: "mailto:abhilashph85@gmail.com", color: "#3ECFEF" },
  { icon: Phone, label: "Phone", value: "+91 8590192435", href: "tel:+918590192435", color: "#A855F7" },
  { icon: MapPin, label: "Location", value: "Thrissur, Kerala", href: "#", color: "#F43F5E" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "#FFFFFF" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "#0077B5" },
];

export const Contact3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        scale: 0.5,
        opacity: 0,
        rotateZ: -10,
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          end: "top 60%",
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#3ECFEF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#A855F7" />
          
          <FloatingSphere position={[-3, 2, 0]} color="#3ECFEF" />
          <FloatingSphere position={[3, -2, -1]} color="#A855F7" />
          <FloatingSphere position={[0, 3, -2]} color="#F43F5E" />
          <FloatingSphere position={[-2, -3, -1]} color="#3ECFEF" />
          <FloatingSphere position={[4, 1, -3]} color="#A855F7" />
        </Canvas>
      </div>

      {/* Radial gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-neon-purple/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-8 text-gradient neon-text"
        >
          Let's Connect
        </h2>

        <div ref={contentRef} className="space-y-12">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to bring your web project to life? Let's build something amazing together!
          </p>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 neon-border"
                    style={{ backgroundColor: `${info.color}20` }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{info.label}</h3>
                  <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </a>
              );
            })}
          </div>

          <a
            href="mailto:abhilashph85@gmail.com"
            className="inline-flex px-12 py-6 bg-primary text-primary-foreground font-bold rounded-full hover:scale-110 transition-all text-xl"
          >
            <span className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              Hire Me Now
            </span>
          </a>

          <div className="flex justify-center gap-6 pt-8">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  style={{
                    animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center hover:scale-125 transition-all neon-border group-hover:neon-glow">
                    <Icon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground pt-12">
            © 2025 Abhilash PH. Full Stack Developer | WordPress Expert
          </p>
        </div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3ECFEF_1px,transparent_1px),linear-gradient(to_bottom,#3ECFEF_1px,transparent_1px)] bg-[size:10rem_10rem]" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};
