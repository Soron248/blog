// MasonryGrid.jsx — সব বাদ দিয়ে এটা দাও
export default function MasonryGrid({ children, gap = 16 }) {
  return (
    <div
      style={{
        columns: "5 200px",
        gap: `${gap}px`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}