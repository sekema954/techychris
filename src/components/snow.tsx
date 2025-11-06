import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const SnowParticles = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="snow"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 1, max: 3 } },
          move: { direction: "bottom", speed: 1, straight: false },
        },
        interactivity: {
          events: { onHover: { enable: false }, onClick: { enable: false } },
        },
      }}
    />
  );
};

export default SnowParticles;
