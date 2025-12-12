import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, TorusKnot, Stars } from "@react-three/drei";
import { Mesh } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GlowingSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[2, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#b482ff"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <TorusKnot ref={meshRef} args={[1, 0.3, 128, 16]} position={[3, 1, -3]}>
        <meshStandardMaterial color="#6b8aff" emissive="#6b8aff" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </TorusKnot>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#b482ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#6b8aff" />
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <GlowingSphere />
      <FloatingTorus />
    </>
  );
};

export const Hero3D = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { y: 30, opacity: 0, duration: 1, delay: 0.3 })
        .from(".hero-name", { y: 80, opacity: 0, duration: 1.2 }, "-=0.6")
        .from(".hero-title", { y: 60, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-desc", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-buttons", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".scroll-indicator", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");

      // Parallax on scroll
      gsap.to(contentRef.current, {
        yPercent: 30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-purple/20 blur-[150px] rounded-full opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-blue/20 blur-[150px] rounded-full opacity-30" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Thrissur, Kerala</span>
        </div>

        <h1 className="hero-name font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
          <span className="text-gradient glow-text">ABHILASH</span>
          <span className="text-foreground"> PH</span>
        </h1>

        <h2 className="hero-title text-2xl md:text-4xl font-display font-medium text-primary mb-8">
          Full Stack Web Developer
        </h2>

        <p className="hero-desc text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          5+ years crafting <span className="text-foreground">WordPress solutions</span>,{" "}
          <span className="text-foreground">React applications</span> & modern web experiences
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToAbout}
            className="group px-8 py-4 glass-card rounded-2xl font-medium transition-all duration-300 hover:scale-105 glow-border shine"
          >
            <span className="text-gradient-static">Explore My Work</span>
          </button>
          <a
            href="mailto:abhilashph85@gmail.com"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px] hover:shadow-primary"
          >
            <Mail className="w-5 h-5" />
            Hire Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <span className="text-sm font-medium">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
