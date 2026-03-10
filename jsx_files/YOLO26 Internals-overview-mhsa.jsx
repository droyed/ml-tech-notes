import { useState, useRef, useEffect } from "react";

const COLORS = {
  bg: "#0a0e1a",
  bgCard: "#0f1424",
  border: "#1a2140",
  borderHi: "#2a3a6a",
  cyan: "#00e5ff",
  cyanDim: "#00e5ff33",
  cyanGlow: "#00e5ff18",
  teal: "#00bfa5",
  amber: "#ffab00",
  amberDim: "#ffab0033",
  pink: "#ff4081",
  pinkDim: "#ff408133",
  purple: "#b388ff",
  purpleDim: "#b388ff33",
  text: "#c8d6e5",
  textBright: "#e8f0fe",
  textDim: "#5a6a8a",
  green: "#69f0ae",
  greenDim: "#69f0ae33",
};

const font = `'IBM Plex Mono', 'Fira Code', 'SF Mono', monospace`;
const fontSans = `'DM Sans', 'Segoe UI', sans-serif`;

function Connector({ height = 32, dashed = false, color = COLORS.cyan }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", height, position: "relative" }}>
      <div style={{
        width: 2, height: "100%",
        background: dashed ? `repeating-linear-gradient(to bottom, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)` : color,
        boxShadow: `0 0 6px ${color}44`,
      }} />
      <div style={{
        position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
        borderTop: `6px solid ${color}`,
        filter: `drop-shadow(0 0 3px ${color}66)`,
      }} />
    </div>
  );
}

function SplitConnector({ color = COLORS.cyan }) {
  return (
    <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
      <line x1="200" y1="0" x2="200" y2="10" stroke={color} strokeWidth="2" />
      <circle cx="200" cy="12" r="3" fill={color} filter="url(#glow)" />
      <line x1="200" y1="14" x2="100" y2="36" stroke={color} strokeWidth="2" />
      <line x1="200" y1="14" x2="300" y2="36" stroke={color} strokeWidth="2" />
      <polygon points="97,32 103,32 100,38" fill={color} />
      <polygon points="297,32 303,32 300,38" fill={color} />
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
    </svg>
  );
}

function MergeConnector({ color = COLORS.cyan }) {
  return (
    <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
      <line x1="100" y1="2" x2="200" y2="26" stroke={color} strokeWidth="2" />
      <line x1="300" y1="2" x2="200" y2="26" stroke={color} strokeWidth="2" />
      <circle cx="200" cy="28" r="3" fill={color} filter="url(#glow2)" />
      <line x1="200" y1="30" x2="200" y2="40" stroke={color} strokeWidth="2" />
      <polygon points="197,36 203,36 200,42" fill={color} />
      <defs>
        <filter id="glow2"><feGaussianBlur stdDeviation="2" result="g" /><feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
    </svg>
  );
}

function TripleSplit({ color = COLORS.cyan }) {
  return (
    <svg width="100%" height="40" viewBox="0 0 420 40" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
      <line x1="210" y1="0" x2="210" y2="10" stroke={color} strokeWidth="2" />
      <circle cx="210" cy="12" r="3" fill={color} />
      <line x1="210" y1="14" x2="70" y2="36" stroke={color} strokeWidth="2" />
      <line x1="210" y1="14" x2="210" y2="36" stroke={color} strokeWidth="2" />
      <line x1="210" y1="14" x2="350" y2="36" stroke={color} strokeWidth="2" />
      <polygon points="67,32 73,32 70,38" fill={color} />
      <polygon points="207,32 213,32 210,38" fill={color} />
      <polygon points="347,32 353,32 350,38" fill={color} />
    </svg>
  );
}

function Badge({ children, color = COLORS.cyan }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      background: color + "18", border: `1px solid ${color}44`,
      color, fontSize: 10, fontFamily: font, letterSpacing: 1,
      textTransform: "uppercase", fontWeight: 600,
    }}>{children}</span>
  );
}

function NodeBox({ title, subtitle, children, color = COLORS.cyan, icon, width = "100%", compact = false }) {
  return (
    <div style={{
      width, background: COLORS.bgCard,
      border: `1px solid ${color}33`,
      borderRadius: 8, padding: compact ? "10px 14px" : "16px 20px",
      boxShadow: `0 0 20px ${color}08, inset 0 1px 0 ${color}11`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.6,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: compact ? 4 : 8 }}>
        {icon && <span style={{ fontSize: compact ? 14 : 18 }}>{icon}</span>}
        <span style={{
          fontFamily: font, fontSize: compact ? 12 : 14, fontWeight: 700,
          color: COLORS.textBright, letterSpacing: 0.5,
        }}>{title}</span>
      </div>
      {subtitle && (
        <div style={{
          fontFamily: fontSans, fontSize: 11, color: COLORS.textDim,
          marginBottom: 8, fontStyle: "italic", lineHeight: 1.4,
        }}>{subtitle}</div>
      )}
      {children}
    </div>
  );
}

function StageHeader({ number, title, tagline, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
      padding: "12px 16px", borderRadius: 8,
      background: `linear-gradient(135deg, ${color}11, ${color}06)`,
      border: `1px solid ${color}22`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        border: `2px solid ${color}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: font, fontSize: 16, fontWeight: 800, color,
        boxShadow: `0 0 12px ${color}33`,
      }}>{number}</div>
      <div>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: COLORS.textBright, letterSpacing: 0.5 }}>{title}</div>
        <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.textDim, marginTop: 1 }}>{tagline}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, color = COLORS.cyan }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 4 }}>
      <span style={{ fontFamily: font, fontSize: 10, color, fontWeight: 600, minWidth: 10 }}>▸</span>
      <span style={{ fontFamily: fontSans, fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>
        <strong style={{ color: COLORS.textBright }}>{label}</strong> — {value}
      </span>
    </div>
  );
}

function ExpandableSection({ title, color = COLORS.purple, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      marginTop: 16, border: `1px solid ${color}22`, borderRadius: 8,
      background: `${color}06`, overflow: "hidden",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "10px 16px", border: "none", cursor: "pointer",
        background: "transparent", display: "flex", alignItems: "center", gap: 8,
        fontFamily: font, fontSize: 12, fontWeight: 700, color, letterSpacing: 0.5,
      }}>
        <span style={{
          display: "inline-block", transition: "transform 0.2s",
          transform: open ? "rotate(90deg)" : "rotate(0deg)", fontSize: 10,
        }}>▶</span>
        {title}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: COLORS.textDim }}>{open ? "collapse" : "expand"}</span>
      </button>
      {open && <div style={{ padding: "4px 16px 16px" }}>{children}</div>}
    </div>
  );
}

function QKVDiagram() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, margin: "10px 0",
    }}>
      {[
        { label: "Q", full: "Query", desc: "What do I seek?", c: COLORS.cyan },
        { label: "K", full: "Key", desc: "What do I offer?", c: COLORS.amber },
        { label: "V", full: "Value", desc: "My content", c: COLORS.green },
      ].map(({ label, full, desc, c }) => (
        <div key={label} style={{
          textAlign: "center", padding: "10px 6px", borderRadius: 6,
          background: `${c}11`, border: `1px solid ${c}33`,
        }}>
          <div style={{ fontFamily: font, fontSize: 20, fontWeight: 800, color: c }}>{label}</div>
          <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.textBright, marginTop: 2 }}>{full}</div>
          <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>{desc}</div>
        </div>
      ))}
    </div>
  );
}

function HeadViz() {
  const heads = [
    { label: "Head 1", focus: "Edges", c: COLORS.cyan },
    { label: "Head 2", focus: "Centers", c: COLORS.amber },
    { label: "Head 3", focus: "Texture", c: COLORS.green },
    { label: "Head N", focus: "…", c: COLORS.purple },
  ];
  return (
    <div style={{ display: "flex", gap: 6, margin: "10px 0", justifyContent: "center", flexWrap: "wrap" }}>
      {heads.map(h => (
        <div key={h.label} style={{
          padding: "6px 10px", borderRadius: 4,
          background: `${h.c}11`, border: `1px dashed ${h.c}44`,
          textAlign: "center", minWidth: 68,
        }}>
          <div style={{ fontFamily: font, fontSize: 10, color: h.c, fontWeight: 700 }}>{h.label}</div>
          <div style={{ fontFamily: fontSans, fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>{h.focus}</div>
        </div>
      ))}
    </div>
  );
}

export default function YOLO26Flowchart() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} style={{
      minHeight: "100vh", background: COLORS.bg, padding: "32px 16px",
      fontFamily: fontSans, color: COLORS.text,
      backgroundImage: `radial-gradient(${COLORS.border} 1px, transparent 1px)`,
      backgroundSize: "24px 24px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: font, fontSize: 11, letterSpacing: 4,
            color: COLORS.textDim, textTransform: "uppercase", marginBottom: 8,
          }}>Inference Pipeline</div>
          <h1 style={{
            fontFamily: font, fontSize: 28, fontWeight: 800,
            color: COLORS.textBright, margin: 0, letterSpacing: -0.5,
            textShadow: `0 0 30px ${COLORS.cyan}33`,
          }}>
            YOLO<span style={{ color: COLORS.cyan }}>26</span>
          </h1>
          <div style={{
            fontFamily: fontSans, fontSize: 12, color: COLORS.textDim, marginTop: 6,
          }}>Architecture Overview → Multi-Head Self-Attention</div>
        </div>

        {/* Input */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            padding: "8px 24px", borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.cyan}22, ${COLORS.teal}11)`,
            border: `1px solid ${COLORS.cyan}44`,
            fontFamily: font, fontSize: 13, fontWeight: 700, color: COLORS.cyan,
            boxShadow: `0 0 20px ${COLORS.cyan}22`,
          }}>📷 Raw Image Input</div>
        </div>

        <Connector color={COLORS.cyan} />

        {/* ═══ STAGE 1: BACKBONE ═══ */}
        <StageHeader number="1" title="BACKBONE" tagline={`"What's in this image?"`} color={COLORS.cyan} />

        <NodeBox title="C3k2 Blocks" subtitle="Repeated at increasing depth — edges → textures → parts → objects" color={COLORS.cyan} icon="🔬">
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center", margin: "8px 0" }}>
            <div style={{
              padding: "8px 10px", borderRadius: 6, textAlign: "center",
              background: COLORS.cyanGlow, border: `1px solid ${COLORS.cyan}33`,
            }}>
              <div style={{ fontFamily: font, fontSize: 10, color: COLORS.cyan, fontWeight: 700 }}>Heavy Path</div>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>Deep analysis</div>
            </div>
            <div style={{ fontFamily: font, fontSize: 18, color: COLORS.textDim }}>⟩⟩</div>
            <div style={{
              padding: "8px 10px", borderRadius: 6, textAlign: "center",
              background: COLORS.cyanGlow, border: `1px dashed ${COLORS.cyan}22`,
            }}>
              <div style={{ fontFamily: font, fontSize: 10, color: COLORS.cyan, fontWeight: 700 }}>Shortcut</div>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>Skip ahead</div>
            </div>
          </div>
          <div style={{ textAlign: "center", fontFamily: font, fontSize: 10, color: COLORS.textDim, marginTop: 4 }}>
            → Merge → <Badge color={COLORS.teal}>43% faster on CPU</Badge>
          </div>
        </NodeBox>

        <Connector height={20} color={COLORS.cyan} />

        <NodeBox title="SPPF" subtitle="Spatial Pyramid Pooling — Fast" color={COLORS.teal} icon="🔭" compact>
          <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, lineHeight: 1.5 }}>
            Multi-scale pooling — helps the model "zoom out" for whole-scene context
          </div>
        </NodeBox>

        <div style={{ textAlign: "center", margin: "8px 0" }}>
          <Badge color={COLORS.cyan}>Outputs feature maps at 3 scales: S · M · L</Badge>
        </div>

        <TripleSplit color={COLORS.cyan} />

        {/* ═══ STAGE 2: NECK ═══ */}
        <StageHeader number="2" title="NECK" tagline={`"Let's make sense of things at every size"`} color={COLORS.amber} />

        <NodeBox title="Feature Fusion" subtitle="Blends multi-scale features — sharp detail + meaningful context" color={COLORS.amber} icon="🔀" compact>
          <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text }}>
            Like overlaying a satellite photo with a labeled city map
          </div>
        </NodeBox>

        <Connector height={20} color={COLORS.amber} />

        <NodeBox title="C2PSA" subtitle="Cross-Stage Partial Position-Sensitive Attention" color={COLORS.amber} icon="🔦">
          <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, marginBottom: 10 }}>
            The "spotlight" — focuses on important regions, ignores noise
          </div>

          {/* C2PSA internal flow */}
          <div style={{
            padding: 12, borderRadius: 6,
            background: `${COLORS.amber}08`, border: `1px solid ${COLORS.amber}18`,
          }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <Badge color={COLORS.amber}>STEP 1 — SPLIT</Badge>
            </div>

            <SplitConnector color={COLORS.amber} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "4px 0" }}>
              <div style={{
                padding: 10, borderRadius: 6, textAlign: "center",
                background: COLORS.amberDim, border: `1px dashed ${COLORS.amber}33`,
              }}>
                <div style={{ fontFamily: font, fontSize: 11, color: COLORS.amber, fontWeight: 700 }}>Bypass Path</div>
                <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 4, lineHeight: 1.4 }}>
                  Raw data preserved intact — aids gradient flow
                </div>
              </div>
              <div style={{
                padding: 10, borderRadius: 6, textAlign: "center",
                background: COLORS.pinkDim, border: `1px solid ${COLORS.pink}33`,
              }}>
                <div style={{ fontFamily: font, fontSize: 11, color: COLORS.pink, fontWeight: 700 }}>PSA Path</div>
                <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 4, lineHeight: 1.4 }}>
                  Attention scoring — "what matters here?"
                </div>
                <div style={{ margin: "6px 0 2px" }}>
                  <Badge color={COLORS.pink}>STEP 2 — ATTEND</Badge>
                </div>
                <div style={{ margin: "6px 0 0", fontFamily: fontSans, fontSize: 10, color: COLORS.textDim }}>↓</div>
                <Badge color={COLORS.pink}>STEP 3 — REFINE</Badge>
                <div style={{ fontFamily: fontSans, fontSize: 9, color: COLORS.textDim, marginTop: 4 }}>
                  Blend + small neural layers
                </div>
              </div>
            </div>

            <MergeConnector color={COLORS.amber} />

            <div style={{ textAlign: "center", marginTop: 4 }}>
              <Badge color={COLORS.amber}>STEP 4 — REUNITE</Badge>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 4 }}>
                → Richer feature map (knows <em>where</em> important things are, at ½ the cost)
              </div>
            </div>
          </div>
        </NodeBox>

        <TripleSplit color={COLORS.amber} />

        {/* ═══ STAGE 3: HEAD ═══ */}
        <StageHeader number="3" title="HEAD" tagline={`"Here are my final answers"`} color={COLORS.green} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { size: "S", label: "Small Objects", icon: "🐦" },
            { size: "M", label: "Medium Objects", icon: "🐕" },
            { size: "L", label: "Large Objects", icon: "🚛" },
          ].map(h => (
            <div key={h.size} style={{
              padding: "12px 8px", borderRadius: 6, textAlign: "center",
              background: COLORS.greenDim, border: `1px solid ${COLORS.green}33`,
            }}>
              <div style={{ fontSize: 20 }}>{h.icon}</div>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 800, color: COLORS.green, marginTop: 4 }}>
                Head {h.size}
              </div>
              <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>{h.label}</div>
            </div>
          ))}
        </div>

        <MergeConnector color={COLORS.green} />

        <div style={{
          textAlign: "center", padding: "10px 16px", borderRadius: 8,
          background: COLORS.greenDim, border: `1px solid ${COLORS.green}33`,
        }}>
          <span style={{ fontFamily: font, fontSize: 12, color: COLORS.green, fontWeight: 700 }}>
            📦 Bounding Boxes &nbsp;·&nbsp; 🏷️ Labels &nbsp;·&nbsp; ✓ Confidence
          </span>
        </div>

        {/* ═══════════ DEEP DIVE: PSA ═══════════ */}
        <ExpandableSection title="DEEP DIVE — Inside PSA (Position-Sensitive Attention)" color={COLORS.pink} defaultOpen={true}>
          <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.textDim, marginBottom: 12, lineHeight: 1.5 }}>
            PSA is the engine inside C2PSA's attention path. It gives the network a bird's-eye view —
            seeing the entire image at once instead of peeping through a tiny 3×3 window.
          </div>

          <NodeBox title="Step 1 — Flatten" color={COLORS.pink} icon="📐" compact>
            <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, lineHeight: 1.5 }}>
              Feature map <code style={{ color: COLORS.pink, background: COLORS.pinkDim, padding: "1px 4px", borderRadius: 3, fontSize: 11 }}>C × H × W</code> → sequence of <code style={{ color: COLORS.pink, background: COLORS.pinkDim, padding: "1px 4px", borderRadius: 3, fontSize: 11 }}>H×W tokens</code>
            </div>
            <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 4, fontStyle: "italic" }}>
              Like turning a chessboard into a numbered list of 64 squares
            </div>
          </NodeBox>

          <Connector height={20} color={COLORS.pink} />

          {/* ═══════════ MHSA — THE DESTINATION ═══════════ */}
          <div style={{
            borderRadius: 10, padding: 3,
            background: `linear-gradient(135deg, ${COLORS.purple}66, ${COLORS.pink}44, ${COLORS.cyan}44)`,
            boxShadow: `0 0 30px ${COLORS.purple}22, 0 0 60px ${COLORS.pink}11`,
          }}>
            <NodeBox title="Step 2 — MHSA" subtitle="Multi-Head Self-Attention — the core engine" color={COLORS.purple} icon="🧠">
              <div style={{
                fontFamily: fontSans, fontSize: 11, color: COLORS.text, marginBottom: 10, lineHeight: 1.5,
                padding: "6px 10px", borderRadius: 4,
                background: `${COLORS.purple}11`, borderLeft: `2px solid ${COLORS.purple}44`,
              }}>
                Borrowed from Transformers (GPT / Claude). Every token compares itself to every other token to discover spatial relationships.
              </div>

              <QKVDiagram />

              <div style={{
                margin: "10px 0", padding: 10, borderRadius: 6,
                background: `${COLORS.purple}08`, border: `1px solid ${COLORS.purple}18`,
              }}>
                <div style={{ fontFamily: font, fontSize: 10, color: COLORS.purple, fontWeight: 700, marginBottom: 6 }}>
                  ATTENTION COMPUTATION
                </div>
                <div style={{
                  textAlign: "center", fontFamily: font, fontSize: 13, color: COLORS.textBright,
                  padding: "6px 0", letterSpacing: 0.5,
                }}>
                  Score = Q · K<sup>T</sup> / √d
                </div>
                <div style={{ textAlign: "center", fontFamily: font, fontSize: 11, color: COLORS.textDim, margin: "2px 0" }}>↓</div>
                <div style={{
                  textAlign: "center", fontFamily: font, fontSize: 13, color: COLORS.textBright,
                  padding: "4px 0",
                }}>
                  Weights = softmax(Score)
                </div>
                <div style={{ textAlign: "center", fontFamily: font, fontSize: 11, color: COLORS.textDim, margin: "2px 0" }}>↓</div>
                <div style={{
                  textAlign: "center", fontFamily: font, fontSize: 13, color: COLORS.textBright,
                  padding: "4px 0",
                }}>
                  Output = Weights · V
                </div>
              </div>

              <div style={{ fontFamily: font, fontSize: 10, color: COLORS.purple, fontWeight: 700, marginBottom: 6, marginTop: 12 }}>
                PARALLEL HEADS
              </div>
              <HeadViz />
              <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, lineHeight: 1.5, marginTop: 6 }}>
                Each head operates on a smaller slice of the data, learning different relationship types. Outputs are <strong style={{ color: COLORS.purple }}>concatenated</strong> and passed through a linear projection <code style={{ color: COLORS.purple, background: COLORS.purpleDim, padding: "1px 4px", borderRadius: 3, fontSize: 11 }}>W⁰</code> — the "committee chair" that merges all perspectives.
              </div>
            </NodeBox>
          </div>

          <Connector height={20} color={COLORS.pink} />

          <NodeBox title="Step 3 — FFN" subtitle="Feed-Forward Network" color={COLORS.pink} icon="⚙️" compact>
            <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, lineHeight: 1.5 }}>
              Two-layer MLP per token. Attention found the connections — FFN thinks harder about what they mean.
            </div>
          </NodeBox>

          <Connector height={20} color={COLORS.pink} />

          <NodeBox title="Step 4 — Residual Shortcut" subtitle="Output = Step 3 + Original Input" color={COLORS.pink} icon="🔄" compact>
            <div style={{ fontFamily: fontSans, fontSize: 11, color: COLORS.text, lineHeight: 1.5 }}>
              Skip connection preserves fine details (textures, edges) that would otherwise wash out through deep layers.
            </div>
          </NodeBox>

          <Connector height={20} dashed color={COLORS.pink} />

          <div style={{
            textAlign: "center", padding: "8px 16px", borderRadius: 20,
            background: COLORS.pinkDim, border: `1px solid ${COLORS.pink}33`,
            fontFamily: font, fontSize: 11, color: COLORS.pink,
          }}>
            ↩ Attention-enriched features → back to C2PSA REUNITE
          </div>
        </ExpandableSection>

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 32, padding: "12px 0",
          borderTop: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ fontFamily: font, fontSize: 10, color: COLORS.textDim, letterSpacing: 2 }}>
            YOLO26 INFERENCE PIPELINE
          </div>
          <div style={{ fontFamily: fontSans, fontSize: 10, color: COLORS.textDim, marginTop: 4 }}>
            PSA is the car · MHSA is the engine
          </div>
        </div>
      </div>
    </div>
  );
}
