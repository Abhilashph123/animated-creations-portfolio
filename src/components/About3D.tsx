import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap, Code, Calendar, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    title: "Full Stack Developer",
    company: "Aproit Solutions",
    location: "Infopark Thrissur",
    period: "July 2025 - Present",
    description: "Building interactive UIs with React/Next.js, Node.js APIs, WordPress customization, and MongoDB optimization.",
    icon: Briefcase,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Full Stack Developer Training",
    company: "Midnay Cyberpark",
    location: "Kozhikode",
    period: "Dec 2023 - June 2025",
    description: "Specialized training in WordPress development, custom plugins, themes, and modern JavaScript frameworks.",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Freelance Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2018 - 2022",
    description: "4+ years delivering custom WordPress solutions, theme development, and web applications for clients worldwide.",
    icon: Briefcase,
    color: "from-pink-500 to-rose-500",
  },
];

const education = [
  { degree: "BCA", institution: "Manipal University", year: "2025" },
  { degree: "Higher Secondary", institution: "Avanoor Higher Secondary School", year: "Completed" },
];

export const About3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Summary card
      gsap.from(".about-summary", {
        scrollTrigger: {
          trigger: ".about-summary",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Experience cards with stagger
      gsap.from(".exp-card", {
        scrollTrigger: {
          trigger: ".exp-cards",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Education cards
      gsap.from(".edu-card", {
        scrollTrigger: {
          trigger: ".edu-cards",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-purple/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-blue/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="about-title font-display text-5xl md:text-7xl font-bold text-center mb-6">
          <span className="text-gradient">About Me</span>
        </h2>

        {/* Summary */}
        <div className="about-summary glass-card rounded-3xl p-8 md:p-12 mb-20 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
            Highly skilled <span className="text-primary font-medium">WordPress Developer</span> and{" "}
            <span className="text-primary font-medium">Full-Stack Engineer</span> with{" "}
            <span className="text-foreground font-medium">5+ years</span> of experience. Specialized in building
            custom WordPress solutions, React applications, and modern web experiences with{" "}
            <span className="text-foreground">Next.js, Node.js, and MongoDB</span>.
          </p>
        </div>

        {/* Experience */}
        <h3 className="font-display text-3xl font-bold text-center mb-12">
          Professional Journey
        </h3>

        <div className="exp-cards space-y-6 mb-20">
          {experience.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="exp-card group glass-card-hover rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {exp.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company} • {exp.location}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all hidden md:block" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <h3 className="font-display text-3xl font-bold text-center mb-12">Education</h3>
        <div className="edu-cards flex flex-wrap justify-center gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="edu-card glass-card-hover rounded-2xl p-6 text-center min-w-[250px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
              <p className="text-muted-foreground text-sm mb-2">{edu.institution}</p>
              <span className="text-primary text-sm font-medium">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
