export default function MiniChart({ data, color = '#34d399', height = 40 }) {
  const width = 100;
  const padding = 2;
  const chartHeight = height - padding * 2;
  const pointWidth = width / (data.length - 1);

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  const points = data.map((val, i) => {
    const x = padding + i * pointWidth;
    const y = padding + chartHeight - ((val - minVal) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <polyline points={points} fill={color} fillOpacity="0.15" stroke="none" />
    </svg>
  );
}
