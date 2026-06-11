import { Navbar } from "../components/home/Navbar"
import { HeroSection } from "../components/home/HeroSection";
import { HowItWorks } from "../components/home/HowItWorks";
import { DemoVideo } from "../components/home/DemoVideo";
import { Benefits } from "../components/home/Benefits";
import { Upcoming } from "../components/home/Upcoming";
import { FaqSection } from "../components/home/FaqSection";
import { CtaSection } from "../components/home/CtaSection";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs decorativos de fondo */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "-120px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "30%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
          }}
        />
      </div>

      <Navbar />
      <HeroSection />
      <HowItWorks />
      <DemoVideo />
      <Benefits />
      <Upcoming />
      <FaqSection />
      <CtaSection />
    </div>
  );
}
