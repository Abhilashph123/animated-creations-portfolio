# 🚀 Futuristic 3D Portfolio - Setup Guide

## Overview
A cutting-edge software developer portfolio built with React, Three.js, GSAP, and Lenis. Features immersive 3D elements, buttery-smooth scrolling, glassmorphism UI, and neon accents.

## 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: GSAP + ScrollTrigger + Lenis
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Radix UI + Lucide Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Key Features

### 1. **Smooth Scrolling with Lenis**
- Buttery-smooth scroll experience
- Integrated with GSAP ScrollTrigger
- Optimized performance

### 2. **3D Elements**
- Interactive 3D hero scene with animated geometries
- Floating 3D skill icons
- Rotating project cubes
- Dynamic lighting and materials

### 3. **Glassmorphism Design**
- Frosted glass effects with backdrop-filter
- Transparent cards with subtle borders
- Layered depth perception

### 4. **Neon Accents**
- Glowing cyan, purple, and pink colors
- Text shadows and glow effects
- Border animations

### 5. **GSAP Animations**
- Scroll-triggered reveals
- Parallax effects
- Smooth transitions
- Stagger animations

## 📁 Project Structure

```
src/
├── components/
│   ├── SmoothScroll.tsx      # Lenis wrapper
│   ├── Navigation3D.tsx      # Glassmorphic navbar
│   ├── Hero3D.tsx            # 3D hero section
│   ├── About.tsx             # About section
│   ├── Skills3D.tsx          # Interactive 3D skills
│   ├── Projects3D.tsx        # Scroll-triggered projects
│   └── Contact3D.tsx         # Contact with 3D elements
├── pages/
│   └── Index.tsx             # Main page
├── index.css                 # Global styles & utilities
└── main.tsx                  # App entry point
```

## 🎯 Component Breakdown

### SmoothScroll Component
Wraps the entire app with Lenis smooth scrolling and GSAP integration.

```tsx
<SmoothScroll>
  <App />
</SmoothScroll>
```

### Hero3D
- Animated sphere and torus geometries
- GSAP entrance animations
- Parallax scroll effects
- Neon text effects

### Skills3D
- Floating 3D cubes in background
- Glassmorphic skill cards
- Animated progress bars
- Scroll-triggered reveals

### Projects3D
- 3D rotating cubes for each project
- Scroll-based card animations
- Glassmorphic project cards
- Interactive hover effects

### Contact3D
- Floating spheres background
- Social media links with animations
- Neon glow effects

## 🎨 Design System

### Colors (HSL)
```css
--primary: 189 94% 55%        /* Cyan */
--neon-cyan: 189 94% 55%      /* Neon Cyan */
--neon-purple: 280 90% 65%    /* Neon Purple */
--neon-pink: 320 90% 65%      /* Neon Pink */
```

### Utilities
- `.glass` - Glassmorphism effect
- `.glass-card` - Enhanced glass card
- `.neon-text` - Neon text glow
- `.neon-border` - Neon border glow
- `.neon-glow` - Neon shadow glow
- `.text-gradient` - Gradient text

## 🔧 Customization

### Update Personal Info
Edit the content in each component:
- `Hero3D.tsx` - Name and tagline
- `About.tsx` - Bio and description
- `Skills3D.tsx` - Tech stack and skills
- `Projects3D.tsx` - Project details
- `Contact3D.tsx` - Contact info and socials

### Change Colors
Modify variables in `src/index.css`:
```css
:root {
  --neon-cyan: 189 94% 55%;
  --neon-purple: 280 90% 65%;
  --neon-pink: 320 90% 65%;
}
```

### Add More 3D Elements
Use React Three Fiber components:
```tsx
import { Canvas } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
```

### Adjust Scroll Speed
Modify Lenis settings in `SmoothScroll.tsx`:
```tsx
const lenis = new Lenis({
  duration: 1.2,  // Lower = faster
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

## 📱 Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Mobile navigation menu
- Touch-optimized interactions

## ⚡ Performance Tips
1. Lazy load heavy 3D scenes
2. Use `will-change` for animated elements
3. Optimize Three.js geometries
4. Minimize backdrop-filter usage on mobile
5. Use GSAP's `scrub` for smooth scroll animations

## 🚀 Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify/etc
# Upload the 'dist' folder
```

## 📄 Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari 15+
- Mobile browsers with WebGL support

## 🤝 Contributing
Feel free to customize and extend this portfolio template!

## 📝 License
MIT License - Use freely for personal and commercial projects

---

Built with ❤️ using React, Three.js, GSAP & Lenis
