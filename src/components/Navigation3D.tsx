import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navigation3D = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-bold text-gradient neon-text hover:scale-110 transition-transform"
        >
          Abhilash PH
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors relative group"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 neon-glow" />
            </a>
          ))}
          <a
            href="mailto:abhilashph85@gmail.com"
            className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:scale-110 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 glass-card rounded-lg neon-border"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card mt-2 mx-4 rounded-2xl p-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg text-foreground hover:text-primary transition-colors py-2"
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:abhilashph85@gmail.com"
            className="block w-full px-6 py-3 bg-primary text-primary-foreground text-center font-semibold rounded-full hover:scale-105 transition-all"
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};
