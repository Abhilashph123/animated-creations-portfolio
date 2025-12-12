import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const GlowOrb = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.4 * scale, 32, 32]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </Sphere>
    </Float>
  );
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "abhilashph85@gmail.com", href: "mailto:abhilashph85@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 8590192435", href: "tel:+918590192435" },
  { icon: MapPin, label: "Location", value: "Thrissur, Kerala", href: "#" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export const Contact3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-cards",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".contact-cta", {
        scrollTrigger: {
          trigger: ".contact-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      gsap.from(".social-icon", {
        scrollTrigger: {
          trigger: ".social-icons",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-purple/15 blur-[200px] rounded-full" />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#b482ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#6b8aff" />
          
          <GlowOrb position={[-3, 2, 0]} color="#b482ff" scale={1.2} />
          <GlowOrb position={[3, -2, -1]} color="#6b8aff" />
          <GlowOrb position={[0, 3, -2]} color="#ff6b9d" scale={0.8} />
          <GlowOrb position={[-2, -3, -1]} color="#ffa94d" />
          <GlowOrb position={[4, 1, -3]} color="#4ade80" scale={0.6} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="contact-title font-display text-5xl md:text-7xl font-bold mb-6">
          <span className="text-gradient">Let's Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          Ready to bring your web project to life? Let's build something amazing together!
        </p>

        {/* Contact Cards */}
        <div className="contact-cards grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <a
                key={info.label}
                href={info.href}
                className="contact-card glass-card-hover rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold mb-1">{info.label}</h3>
                <p className="text-muted-foreground text-sm">{info.value}</p>
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          href="mailto:abhilashph85@gmail.com"
          className="contact-cta inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px] hover:shadow-purple-500 mb-16"
        >
          <Send className="w-6 h-6" />
          Hire Me Now
        </a>

        {/* Social Links */}
        <div className="social-icons flex justify-center gap-4 mb-16">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-14 h-14 glass-card-hover rounded-2xl flex items-center justify-center"
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-muted-foreground text-sm">
          © 2025 Abhilash PH. Full Stack Developer | WordPress Expert
        </p>
      </div>
    </section>
  );
};
