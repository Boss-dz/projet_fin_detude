import { useThree } from "@react-three/fiber";

export default function CameraButton() {
  const { camera, controls } = useThree();

  const presetViews = [
    { name: "Front", position: [0, 2, 8], target: [0, 2, 0] },
    { name: "Back", position: [0, 2, -8], target: [0, 2, 0] },
    { name: "Top", position: [0, 10, 0], target: [0, 2, 0] },
    { name: "Right", position: [8, 2, 0], target: [0, 2, 0] },
    { name: "Left", position: [-8, 2, 0], target: [0, 2, 0] },
  ];

  const setCameraView = (position, target) => {
    camera.position.set(...position);
    if (controls) {
      controls.target.set(...target);
      controls.update();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {presetViews.map((view, index) => (
        <button
          key={index}
          onClick={() => setCameraView(view.position, view.target)}
          style={{
            padding: "8px 12px",
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            backdropFilter: "blur(10px)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.2)"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
        >
          {view.name}
        </button>
      ))}
    </div>
  );
}