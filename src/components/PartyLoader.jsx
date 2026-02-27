import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const pop = keyframes`
  0%, 100% { transform: rotate(-6deg) scale(1); }
  50% { transform: rotate(6deg) scale(1.06); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); opacity: 0.6; }
  40% { transform: translateY(-6px); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const PartyLoader = ({ open }) => {
  if (!open) return null;

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(5, 10, 20, 0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)"
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.5,
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background:
            "linear-gradient(120deg, rgba(15, 23, 42, 0.85), rgba(30, 123, 255, 0.25), rgba(255, 193, 7, 0.2))",
          backgroundSize: "200% 200%",
          animation: `${shimmer} 3s ease infinite`,
          boxShadow: "0 24px 60px rgba(2, 6, 23, 0.55)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          minWidth: 220
        }}
      >
        <Box sx={{ fontSize: 36, animation: `${pop} 1.15s ease-in-out infinite` }}>🎉</Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "warning.main", animation: `${bounce} 0.9s ease-in-out infinite` }} />
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#38BDF8", animation: `${bounce} 0.9s ease-in-out infinite 0.15s` }} />
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#FB7185", animation: `${bounce} 0.9s ease-in-out infinite 0.3s` }} />
        </Box>
        <Box
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "grey.100"
          }}
        >
          Loading...
        </Box>
      </Box>
    </Box>
  );
};

export default PartyLoader;
