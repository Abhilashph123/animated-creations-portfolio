import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, OrbitControls } from "@react-three/drei";
import { Mesh, Group } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedSphere = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 100, 100]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} args={[2.5, 0.1, 16, 100]} position={[0, 0, -2]}>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </Torus>
    </Float>
  );
};

const Scene = () => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <AnimatedSphere />
      <FloatingTorus />
    </group>
  );
};

export const Hero3D = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          buttonRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        opacity: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Thrissur, Kerala</span>
        </div>
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-bold mb-4 text-gradient neon-text"
        >
          ABHILASH PH
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-primary">
          Full Stack Web Developer
        </h2>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light"
        >
          5+ years crafting custom WordPress solutions, React applications & modern web experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            ref={buttonRef}
            onClick={scrollToAbout}
            className="px-10 py-5 glass-card text-primary font-semibold rounded-full hover:scale-110 transition-all neon-border text-lg"
          >
            Explore My Work
          </button>
          <a
            href="mailto:abhilashph85@gmail.com"
            className="px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-110 transition-all text-lg"
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce">
        <ChevronDown className="w-10 h-10 text-primary neon-glow" onClick={scrollToAbout} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#3ECFEF_1px,transparent_1px),linear-gradient(to_bottom,#3ECFEF_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    </section>
  );
};
