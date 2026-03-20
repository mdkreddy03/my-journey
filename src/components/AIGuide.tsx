/**
 * AI GUIDE - 3D Animated Character (Bottom-Right Corner)
 * Pre-scripted interactions that respond to scroll position
 */

import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import * as THREE from "three";

// ─── 3D Robot Character ───
const RobotCharacter = ({ animation }: { animation: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    // Idle bob
    groupRef.current.position.y = Math.sin(t * 2) * 0.05;

    if (animation === "wave" && rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 6) * 0.5 + 1.2;
    } else if (animation === "dance") {
      groupRef.current.rotation.y = Math.sin(t * 3) * 0.3;
      groupRef.current.position.y = Math.abs(Math.sin(t * 4)) * 0.15;
      if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(t * 4) * 0.6 - 0.3;
      if (rightArmRef.current) rightArmRef.current.rotation.z = Math.sin(t * 4 + Math.PI) * 0.6 + 0.3;
    } else if (animation === "nod" && headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 4) * 0.15;
    } else if (animation === "walk") {
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * 6) * 0.4;
      if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.4;
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.3;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * 6) * 0.3;
    } else {
      // idle
      if (rightArmRef.current) rightArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.05 + 0.1;
      if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.05 - 0.1;
    }
  });

  const bodyColor = "#2997ff";
  const accentColor = "#86868b";

  return (
    <group ref={groupRef} scale={0.9} position={[0, -0.3, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.1, 0]}>
        <boxGeometry args={[0.5, 0.45, 0.45]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 1.15, 0.23]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.12, 1.15, 0.23]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.55, 0.6, 0.35]} />
        <meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Chest light */}
      <mesh position={[0, 0.6, 0.18]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.38, 0.7, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.38, 0.7, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.45, 0.12]} />
          <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.15, 0.15, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.14, 0.35, 0.14]} />
          <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.42, 0.04]}>
          <boxGeometry args={[0.16, 0.06, 0.22]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.15, 0.15, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.14, 0.35, 0.14]} />
          <meshStandardMaterial color={accentColor} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.42, 0.04]}>
          <boxGeometry args={[0.16, 0.06, 0.22]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
      </group>
    </group>
  );
};

// ─── Pre-scripted messages based on scroll sections ───
const sectionMessages: Record<string, { text: string; animation: string }> = {
  hero: { text: "👋 Hey! Welcome to Dharani's portfolio. Scroll down to explore!", animation: "wave" },
  about: { text: "This is where you learn about who Dharani is — a data engineer with a passion for building.", animation: "nod" },
  skills: { text: "Check out these skills! From Python to Snowflake, quite the tech arsenal. 🛠️", animation: "dance" },
  experience: { text: "Real-world impact — click the cards to see detailed responsibilities!", animation: "nod" },
  journey: { text: "Beyond code — cooking, traveling, and personal stories. 🌍🍳", animation: "dance" },
  contact: { text: "Want to connect? Drop a message — Dharani would love to hear from you! 📬", animation: "wave" },
};

const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const [isMinimized, setIsMinimized] = useState(false);
  const [animation, setAnimation] = useState("wave");
  const [hasGreeted, setHasGreeted] = useState(false);

  // Track which section is in view
  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "journey", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "hero";
            setCurrentSection(id);
            setAnimation(sectionMessages[id]?.animation || "idle");
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe the main tag's direct children (sections)
    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id) || document.querySelector(`section:first-child`);
        if (el) observer.observe(el);
      });
    }, 1000);

    return () => observer.disconnect();
  }, []);

  // Auto-greet on first load
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasGreeted(true);
        setAnimation("wave");
        // Auto-close after 5s
        setTimeout(() => setIsOpen(false), 5000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  const currentMessage = sectionMessages[currentSection] || sectionMessages.hero;

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {/* Chat Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass rounded-2xl p-4 max-w-[260px] border border-white/10 shadow-elevated"
          >
            <p className="text-sm text-foreground leading-relaxed">{currentMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Character Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="relative group"
      >
        {/* Close/Minimize buttons */}
        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
          <button onClick={() => setIsMinimized(true)} className="w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-primary transition">
            <span className="text-[8px] text-white">—</span>
          </button>
        </div>

        {/* 3D Canvas */}
        <div
          className="w-[120px] h-[140px] cursor-pointer rounded-2xl overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Canvas camera={{ position: [0, 0.5, 3], fov: 35 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 3, 2]} intensity={1.2} />
            <pointLight position={[-2, 1, 1]} intensity={0.4} color="#2997ff" />
            <Suspense fallback={null}>
              <RobotCharacter animation={animation} />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
    </div>
  );
};

export default AIGuide;
