import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedGeometry = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current && torusRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={1.8}>
          <MeshDistortMaterial
            color="#3ECFEF"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <Torus ref={torusRef} args={[2, 0.3, 32, 100]} position={[0, 0, -1]}>
          <MeshDistortMaterial
            color="#A855F7"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#3ECFEF" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#A855F7" />
    </>
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
          <AnimatedGeometry />
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
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold mb-8 text-gradient neon-text"
        >
          Software Developer
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light"
        >
          Crafting immersive digital experiences with cutting-edge technology
        </p>
        <button
          ref={buttonRef}
          onClick={scrollToAbout}
          className="px-10 py-5 glass-card text-primary font-semibold rounded-full hover:scale-110 transition-all neon-border text-lg"
        >
          Explore My Universe
        </button>
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
