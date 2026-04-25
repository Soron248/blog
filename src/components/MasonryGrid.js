// MasonryGrid.jsx
import { useEffect, useRef, useCallback } from "react";

export default function MasonryGrid({ children, gap = 16 }) {
  const gridRef = useRef(null);

  const layout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const containerWidth = grid.offsetWidth;
    const minColWidth = 250;
    const cols = Math.max(1, Math.floor(containerWidth / minColWidth));
    const colWidth = (containerWidth - gap * (cols - 1)) / cols;

    const colHeights = Array(cols).fill(0);
    const items = Array.from(grid.children);

    items.forEach((item) => {
      item.style.width = `${colWidth}px`;
      item.style.position = "absolute";

      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      item.style.left = `${shortestCol * (colWidth + gap)}px`;
      item.style.top = `${colHeights[shortestCol]}px`;

      colHeights[shortestCol] += item.offsetHeight + gap;
    });

    grid.style.height = `${Math.max(...colHeights)}px`;
  }, [gap]);

  useEffect(() => {
    layout();

    // ✅ suppress the harmless ResizeObserver loop warning
    const observer = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) return;
        layout();
      });
    });

    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [children, layout]);

  return (
    <div ref={gridRef} style={{ position: "relative", width: "100%" }}>
      {children}
    </div>
  );
}