import { useState } from "react";

const NODE_TYPES = [
  { label: "Class",     color: "var(--node-class)"     },
  { label: "Interface", color: "var(--node-interface)" },
  { label: "Abstract",  color: "var(--node-abstract)"  },
  { label: "Orphan",    color: "var(--node-orphan)"    },
];

const ACCESS_TYPES = [
  { label: "public",    color: "var(--access-public)"    },
  { label: "private",   color: "var(--access-private)"   },
  { label: "protected", color: "var(--access-protected)" },
  { label: "package",   color: "var(--access-package)"   },
];

export default function Legend() {
    const [collapsed,setCollapsed] = useState(false);

    return (
        <div
            className="panel"
            style = {{
                position : "absolute",
                bottom : "24px",
                left : "12px",
                zIndex : 40,
                padding : collapsed ? "8px 12px" : "12px 14px",
                minWidth : "160px",
                transition : "all 0.2s ease",
            }}
        >
            {/*Header*/}
            <div
                onClick = {() => setCollapsed(!collapsed)}
                style = {{
                    display : "flex",
                    justifyContent : "space-between",
                    alignItems : "center",
                    cursor : "pointer",
                    marginBottom : collapsed ? 0 : "10px",
                }}
            >
                <span
                    style = {{
                        fontFamily : "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing : "0.08em",
                    }}
                >
                    Legend
                </span>
                <span style = {{fontSize:"10px",color:"var(--text-muted)"}}>
                    {collapsed? "▲" : "▼"}
                </span>
            </div>
            {/* Body */}

            {!collapsed && (
                <>
                {/* Node Types */}
                <GroupLabel label = "Node Type"/>
                {NODE_TYPES.map(({label,color}) => (
                    <LegendRow
                        key={label}
                        label = {label}
                        color = {color}
                        shape = "square"
                    />
                ))}
                <Divider />
                {/*Access Modifiers*/}
                <GroupLabel label = "Access"/>
                {ACCESS_TYPES.map(({label,color}) => (
                    <LegendRow
                        key={label}
                        label={label}
                        color={color}
                        shape="circle"
                    />
                ))}

                <Divider/>
                {/* Edge Types */}
                <GroupLabel label = "Edges"/>
                <EdgeRow label="extends" dashed={false}/>
                <EdgeRow label="implements" dashed={true}/>
                </>
            )}
        </div>
    );
}

//Sub Components

function GroupLabel({label}) {
    return (
        <div
            style ={{
                fontFamily:    "'JetBrains Mono', monospace",
                fontSize:      "9px",
                color:         "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom:  "4px",
                marginTop:     "2px",
            }}
        >
            {label}
        </div>
    );
}

function LegendRow({label,color,shape}){
    return (
        <div 
            style ={{
                display:      "flex",
                alignItems:   "center",
                gap:          "8px",
                marginBottom: "4px",
            }}
        >
            {/* Color Indicator */}
            <span
                style = {{
                    width:        shape === "circle" ? "8px" : "10px",
                    height:       shape === "circle" ? "8px" : "10px",
                    borderRadius: shape === "circle" ? "50%" : "3px",
                    background:   color,
                    flexShrink:   0,
                }}
            />
            <span
                style ={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize:   "11px",
                    color:      "var(--text-secondary)",
                }}
            >
                {label}
            </span>
        </div>
    );
}

function EdgeRow({ label,dashed }){
    return (
        <div
            style ={{
                display:      "flex",
                alignItems:   "center",
                gap:          "8px",
                marginBottom: "4px",
            }}
        >
            {/* Edge line preview */}
             <div
                style={{
                    width:      "24px",
                    height:     "2px",
                    background: dashed ? "transparent" : "var(--accent)",
                    borderTop:  dashed ? "2px dashed var(--accent)" : "none",
                    flexShrink: 0,
                }}
            />
            <span
                style ={{
                    fontFamily : "'JetBrains Mono',monospace",
                    fontSize: "11px",
                    color: "var(--text-secondary)",
                }}
            >
                {label}
            </span>
        </div>
    );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        margin:    "8px 0",
      }}
    />
  );
}