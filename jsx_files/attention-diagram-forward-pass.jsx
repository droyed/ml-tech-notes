import { useState } from "react";

const COLORS = {
  bg: "#0a0e17",
  surface: "#111827",
  surfaceLight: "#1a2235",
  border: "#2a3650",
  text: "#e2e8f0",
  textMuted: "#8896b0",
  textDim: "#5a6a84",
  input: { bg: "#1a2a3a", border: "#2d7d9a", text: "#67e8f9", label: "#22d3ee" },
  qkv: { bg: "#1e2540", border: "#4f5fa3", text: "#a5b4fc", label: "#818cf8" },
  q: { bg: "#2a1a1a", border: "#b84c3a", text: "#fca5a5", label: "#f87171", glow: "rgba(248,113,113,0.08)" },
  k: { bg: "#1a2a1a", border: "#3a9a5a", text: "#86efac", label: "#4ade80", glow: "rgba(74,222,128,0.08)" },
  v: { bg: "#221a2e", border: "#8b5cf6", text: "#c4b5fd", label: "#a78bfa", glow: "rgba(167,139,250,0.08)" },
  attn: { bg: "#2a2210", border: "#ca8a04", text: "#fde68a", label: "#facc15", glow: "rgba(250,204,21,0.06)" },
  pe: { bg: "#0e2a2a", border: "#0d9488", text: "#5eead4", label: "#2dd4bf" },
  proj: { bg: "#1a1a2a", border: "#6366f1", text: "#a5b4fc", label: "#818cf8" },
  output: { bg: "#1a2a3a", border: "#2d7d9a", text: "#67e8f9", label: "#22d3ee" },
  arrow: "#4a5a74",
  arrowHighlight: "#6b7fa0",
};

function Block({ x, y, width, height, color, label, shape, analogy, code, small }) {
  const fontSize = small ? 11 : 13;
  return (
    <g>
      <defs>
        <filter id={`shadow-${label.replace(/\s/g, "")}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={color.border} floodOpacity="0.25" />
        </filter>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        fill={color.bg}
        stroke={color.border}
        strokeWidth={1.5}
        filter={`url(#shadow-${label.replace(/\s/g, "")})`}
      />
      {color.glow && (
        <rect
          x={x + 1}
          y={y + 1}
          width={width - 2}
          height={height - 2}
          rx={7}
          fill={color.glow}
        />
      )}
      <text
        x={x + width / 2}
        y={y + (analogy ? 18 : height / 2 - (shape ? 6 : 0))}
        textAnchor="middle"
        fill={color.label}
        fontSize={fontSize + 1}
        fontFamily="'JetBrains Mono', 'Fira Code', monospace"
        fontWeight="700"
        letterSpacing="0.5"
      >
        {label}
      </text>
      {shape && (
        <text
          x={x + width / 2}
          y={y + (analogy ? 34 : height / 2 + 10)}
          textAnchor="middle"
          fill={color.text}
          fontSize={fontSize - 1}
          fontFamily="'JetBrains Mono', 'Fira Code', monospace"
          opacity={0.85}
        >
          {shape}
        </text>
      )}
      {analogy && (
        <text
          x={x + width / 2}
          y={y + height - (code ? 18 : 10)}
          textAnchor="middle"
          fill={COLORS.textMuted}
          fontSize={10}
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          fontStyle="italic"
        >
          {analogy}
        </text>
      )}
      {code && (
        <text
          x={x + width / 2}
          y={y + height - 7}
          textAnchor="middle"
          fill={COLORS.textDim}
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
        >
          {code}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, dashed, color, label, labelSide, curved, curveDir }) {
  const arrowColor = color || COLORS.arrow;
  let path;
  if (curved) {
    const midY = (y1 + y2) / 2;
    const cx = curveDir === "left" ? Math.min(x1, x2) - 40 : Math.max(x1, x2) + 40;
    path = `M ${x1} ${y1} Q ${cx} ${midY} ${x2} ${y2}`;
  } else if (x1 === x2) {
    path = `M ${x1} ${y1} L ${x2} ${y2}`;
  } else {
    const midY = (y1 + y2) / 2;
    path = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
  }

  const markerId = `arrowhead-${Math.random().toString(36).substr(2, 6)}`;

  return (
    <g>
      <defs>
        <marker id={markerId} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M 0 0 L 8 3 L 0 6 Z" fill={arrowColor} />
        </marker>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={arrowColor}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5,4" : "none"}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={labelSide === "right" ? Math.max(x1, x2) + 6 : (x1 + x2) / 2 + (labelSide === "left" ? -8 : 8)}
          y={(y1 + y2) / 2 + 4}
          textAnchor={labelSide === "left" ? "end" : "start"}
          fill={COLORS.textDim}
          fontSize={9}
          fontFamily="'JetBrains Mono', monospace"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function SplitBrace({ x, y, width, height, color }) {
  return (
    <path
      d={`M ${x} ${y} L ${x} ${y + height / 2} M ${x + width} ${y} L ${x + width} ${y + height / 2} M ${x} ${y + height / 2} L ${x + width} ${y + height / 2} M ${x + width / 2} ${y + height / 2} L ${x + width / 2} ${y + height}`}
      fill="none"
      stroke={color || COLORS.arrow}
      strokeWidth={1.2}
      strokeDasharray="3,3"
    />
  );
}

function StepNumber({ x, y, num }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={COLORS.surfaceLight} stroke={COLORS.border} strokeWidth={1} />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={COLORS.textMuted}
        fontSize={10}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
      >
        {num}
      </text>
    </g>
  );
}

function AddCircle({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={COLORS.surfaceLight} stroke={COLORS.border} strokeWidth={1.5} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={COLORS.text}
        fontSize={16}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
      >
        +
      </text>
    </g>
  );
}

function MatMulCircle({ x, y, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={COLORS.surfaceLight} stroke={COLORS.attn.border} strokeWidth={1.5} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={COLORS.attn.label}
        fontSize={12}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
      >
        {label || "@"}
      </text>
    </g>
  );
}

export default function AttentionDiagram() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const W = 900;
  const H = 1158;
  const cx = W / 2;

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: 920, width: "100%" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{
            color: COLORS.attn.label,
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}>
            Ultralytics · Self-Attention Module
          </span>
        </div>
        <h1 style={{
          color: COLORS.text,
          fontSize: 28,
          fontWeight: 300,
          margin: "0 0 4px 0",
          letterSpacing: -0.5,
          fontFamily: "'Inter', sans-serif",
        }}>
          Forward Pass <span style={{ color: COLORS.attn.label, fontWeight: 600 }}>Data Flow</span>
        </h1>
        <p style={{
          color: COLORS.textMuted,
          fontSize: 13,
          margin: "0 0 24px 0",
          lineHeight: 1.5,
        }}>
          How every pixel learns which other pixels matter — tensor shapes traced through each operation.
        </p>

        <div style={{
          background: COLORS.surface,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: "20px 10px 10px",
          overflow: "auto",
        }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            style={{ display: "block" }}
          >
            {/* Step 1: Input */}
            <StepNumber x={28} y={38} num="1" />
            <Block
              x={cx - 130} y={16} width={260} height={52}
              color={COLORS.input}
              label="Input x"
              shape="(B, C, H, W)"
              analogy="Feature map from backbone"
            />

            {/* Arrow down */}
            <Arrow x1={cx} y1={68} x2={cx} y2={110} />

            {/* Step 2: QKV Conv */}
            <StepNumber x={28} y={130} num="2" />
            <Block
              x={cx - 150} y={110} width={300} height={68}
              color={COLORS.qkv}
              label="QKV Conv 1×1"
              shape="(B, C+2·Kd·h, H, W)"
              analogy='"Information Generator"'
              code="self.qkv(x)"
            />

            {/* Arrow down */}
            <Arrow x1={cx} y1={178} x2={cx} y2={215} />

            {/* Step 3: Reshape + Split */}
            <StepNumber x={28} y={238} num="3" />
            <Block
              x={cx - 140} y={215} width={280} height={52}
              color={{ bg: COLORS.surfaceLight, border: COLORS.border, text: COLORS.textMuted, label: COLORS.text }}
              label="Reshape → Split"
              shape=".view(B, h, Kd·2+Hd, N).split(...)"
            />

            {/* Three arrows splitting to Q, K, V */}
            <Arrow x1={cx - 70} y1={267} x2={170} y2={310} />
            <Arrow x1={cx} y1={267} x2={cx} y2={310} />
            <Arrow x1={cx + 70} y1={267} x2={730} y2={310} />

            {/* Q Block */}
            <Block
              x={80} y={310} width={180} height={70}
              color={COLORS.q}
              label="Query (Q)"
              shape="(B, h, Kd, N)"
              analogy='"What am I looking for?"'
            />

            {/* K Block */}
            <Block
              x={cx - 90} y={310} width={180} height={70}
              color={COLORS.k}
              label="Key (K)"
              shape="(B, h, Kd, N)"
              analogy='"What do I contain?"'
            />

            {/* V Block */}
            <Block
              x={640} y={310} width={180} height={70}
              color={COLORS.v}
              label="Value (V)"
              shape="(B, h, Hd, N)"
              analogy='"My actual visual data"'
            />

            {/* Q transpose label */}
            <text x={170} y={400} textAnchor="middle" fill={COLORS.q.text} fontSize={10} fontFamily="'JetBrains Mono', monospace" opacity={0.7}>
              .transpose(-2, -1)
            </text>
            <text x={170} y={414} textAnchor="middle" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              → (B, h, N, Kd)
            </text>

            {/* Arrows from Q and K to matmul */}
            <Arrow x1={170} y1={418} x2={330} y2={460} color={COLORS.q.border} />
            <Arrow x1={cx} y1={380} x2={370} y2={460} color={COLORS.k.border} />

            {/* Step 4: MatMul Q^T @ K */}
            <StepNumber x={28} y={490} num="4" />
            <MatMulCircle x={350} y={474} label="@" />
            <text x={375} y={470} textAnchor="start" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              Qᵀ @ K
            </text>

            {/* Arrow to attention scores block */}
            <Arrow x1={350} y1={488} x2={350} y2={516} color={COLORS.attn.border} />

            {/* Step 5: Scale */}
            <Block
              x={260} y={516} width={180} height={62}
              color={COLORS.attn}
              label="× Scale"
              shape="(B, h, N, N)"
              analogy='"Stabilizer" — key_dim⁻⁰·⁵'
              small
            />

            {/* Arrow down */}
            <Arrow x1={350} y1={578} x2={350} y2={606} color={COLORS.attn.border} />

            {/* Step 6: Softmax */}
            <StepNumber x={28} y={626} num="5" />
            <Block
              x={260} y={606} width={180} height={56}
              color={COLORS.attn}
              label="Softmax"
              shape="(B, h, N, N)"
              analogy='"The Highlighter" — scores → %'
            />

            {/* V dual path: one down to attn multiply, one right to PE */}
            {/* V arrow going down to the matmul with attn */}
            <line x1={730} y1={380} x2={730} y2={698} stroke={COLORS.v.border} strokeWidth={1.5} strokeDasharray="none" />
            <Arrow x1={730} y1={698} x2={460} y2={698} color={COLORS.v.border} label="" />

            {/* V arrow branching right to PE */}
            <line x1={800} y1={350} x2={840} y2={350} stroke={COLORS.v.border} strokeWidth={1.2} strokeDasharray="4,3" />
            <line x1={840} y1={350} x2={840} y2={788} stroke={COLORS.v.border} strokeWidth={1.2} strokeDasharray="4,3" />

            {/* PE Block on right */}
            <StepNumber x={28} y={816} num="7" />
            <Block
              x={740} y={793} width={150} height={64}
              color={COLORS.pe}
              label="PE Conv 3×3"
              shape="(B, C, H, W)"
              analogy='"Position Perceiver"'
              code="self.pe(v.reshape(…))"
              small
            />
            <Arrow x1={840} y1={788} x2={840} y2={793} color={COLORS.pe.border} />
            <text x={848} y={782} textAnchor="start" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              reshape to 2D
            </text>

            {/* Attn arrow down to matmul with V */}
            <Arrow x1={350} y1={662} x2={350} y2={678} color={COLORS.attn.border} />
            <text x={360} y={675} textAnchor="start" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              .transpose(-2, -1)
            </text>

            {/* Step 6: V @ Attn^T  */}
            <StepNumber x={28} y={698} num="6" />
            <MatMulCircle x={440} y={698} label="@" />
            <text x={455} y={716} textAnchor="start" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              V @ Attnᵀ
            </text>
            <Arrow x1={350} y1={686} x2={426} y2={698} color={COLORS.attn.border} />

            {/* Arrow down from matmul */}
            <Arrow x1={440} y1={712} x2={440} y2={748} color={COLORS.v.border} />

            {/* Reshape to 2D */}
            <Block
              x={360} y={748} width={160} height={38}
              color={{ bg: COLORS.surfaceLight, border: COLORS.border, text: COLORS.textMuted, label: COLORS.text }}
              label="Reshape → 2D"
              shape=".view(B, C, H, W)"
              small
            />

            {/* Arrows converging to Add */}
            <Arrow x1={440} y1={786} x2={cx} y2={868} />
            <Arrow x1={815} y1={857} x2={cx + 15} y2={873} color={COLORS.pe.border} />

            {/* Step 8: Add circle */}
            <AddCircle x={cx} y={884} />
            <text x={cx + 22} y={888} textAnchor="start" fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
              Attention + Position
            </text>

            {/* Arrow down */}
            <Arrow x1={cx} y1={898} x2={cx} y2={938} />

            {/* Step 9: Projection */}
            <StepNumber x={28} y={966} num="8" />
            <Block
              x={cx - 130} y={938} width={260} height={60}
              color={COLORS.proj}
              label="Proj Conv 1×1"
              shape="(B, C, H, W)"
              analogy='"Final Packaging" — reproject'
              code="self.proj(x)"
            />

            {/* Arrow down */}
            <Arrow x1={cx} y1={998} x2={cx} y2={1038} />

            {/* Output */}
            <Block
              x={cx - 130} y={1038} width={260} height={52}
              color={COLORS.output}
              label="Output"
              shape="(B, C, H, W)"
              analogy="Context-aware features → next layer"
            />

            {/* Legend */}
            <g transform="translate(20, 1103)">
              <text fill={COLORS.textMuted} fontSize={10} fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing={1.5}>
                LEGEND
              </text>
              {[
                { color: COLORS.q.border, label: "Query path" },
                { color: COLORS.k.border, label: "Key path" },
                { color: COLORS.v.border, label: "Value path" },
                { color: COLORS.attn.border, label: "Attention scores" },
                { color: COLORS.pe.border, label: "Position encoding" },
              ].map((item, i) => (
                <g key={i} transform={`translate(${i * 160}, 18)`}>
                  <line x1={0} y1={0} x2={20} y2={0} stroke={item.color} strokeWidth={2} />
                  <text x={26} y={4} fill={COLORS.textMuted} fontSize={9} fontFamily="'Inter', sans-serif">
                    {item.label}
                  </text>
                </g>
              ))}
            </g>

            {/* Dimension key */}
            <g transform="translate(20, 1133)">
              <text fill={COLORS.textDim} fontSize={9} fontFamily="'JetBrains Mono', monospace">
                B = batch  ·  C = channels (dim)  ·  h = num_heads  ·  Hd = head_dim  ·  Kd = key_dim  ·  N = H×W (pixels)
              </text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
