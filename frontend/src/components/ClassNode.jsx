import { memo } from "react";
import { Handle,Position } from "reactflow";

const TYPE_COLORS = {
    class : "var(--node-class)",
    interface : "var(--node-interface)",
    abstract : "var(--node-abstract)",
};

const ACCESS_COLORS = {
    public : "var(--access-public)",
    private : "var(--access-private)",
    protected : "var(--access-protected)",
    package : "var(--access-package)",
};

function ClassNode({ data,selected }) {
    const {
        name,type = "class",accessModifier = "public",modifiers = [],methodCount = 0,depth = 0,isOrphan = false,isHighlighted = false,
    } = data;

    const typeColor = TYPE_COLORS[type] || TYPE_COLORS.class;
    const accessColor = ACCESS_COLORS[accessModifier] || ACCESS_COLORS.public;

    return (
        <div
            style = {{
                background: "var(--bg-secondary)",
                border: `2px solid ${isHighlighted ? "var(--accent)" : typeColor}`,
                borderRadius: "var(--radius)",
                padding : "12px 16px",
                minWidth : "200px",
                maxWidth : "240px",
                boxShadow: isHighlighted ? "0 0 0 4px var(--accent-soft), var(--shadow)" : "var(--shadow)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                position: "relative",
            }}
        >
            {/*handles*/}            
            <Handle type="target" position={Position.Top} style={{ background: typeColor,border:"none",width:10,height:10}}/>
            <Handle type = "source" position = {Position.Bottom} style={{ background: typeColor,border:"none",width:10,height:10}}/>

            {/*Orphan Warning*/}
            {isOrphan && (
                <span 
                    title = "Orphan class - no parent,children or interfaces"
                    style = {{
                        position:"absolute",
                        top:"8px",
                        right:"8px",
                        fontSize:"14px",
                        lineHeight:1,
                    }}
                >
                    Orphan Detected!!
                </span>
            )}
            {/*Class Name*/}

            <div style = {{
                fontFamily : "'Syne',sans-serif",
                fontWeight: 700,
                fontSize : "14px",
                color: "var(--text-primary)",
                marginBottom: "8px",
                paddingRight: isOrphan ? "20px" : "0",
                whiteSpace:"nowrap",
                overflow: "hidden",
                textOverflow:"ellipsis",
            }}>
                {name}
            </div>
            
            {/*Type + Access Badge*/}
            <div style = {{display:"flex",gap:"5px",flexWrap:"wrap",marginBottom:"8px"}}>
                {/* Type */}
                <span className = "badge" style = {{
                    background: typeColor + "22",
                    color: typeColor,
                    border: `1px solid ${typeColor}55`,
                }}>
                    {type}
                </span>

                {/*Accessbadge*/} 
                <span className = "badge" style = {{
                    background : accessColor + "22",
                    color: accessColor,
                    border: `1px solid ${accessColor}55`,
                }}>
                    {accessModifier}
                </span>
                {/*Modifier badge*/}
                {modifiers.map((mod) => (
                    <span key = {mod} className="badge" style = {{
                        background: "var(--bg-panel)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                    }}>
                        {mod}
                    </span>
                ))}
            </div>

                {/*Stats Row*/}

                <div style = {{
                    display: "flex",
                    justifyContent : "space-between",
                    alignItems:"center",
                    borderTop:"1px solid var(--border)",
                    paddingTop:"8px",
                    marginTop:"4px",
                }}>

                    {/* Method Count*/}
                    <span style = {{
                        fontFamily : "'JetBrains Mono',monospace",
                        fontSize : "11px",
                        color: "var(--text-muted)",
                    }}>
                        ƒ {methodCount} method{methodCount !==  1 ? "s" : ""}
                    </span>
                    {/*Depth*/}
                    <span style = {{
                        fontFamily : "'JetBrains Mono',monospace",
                        fontSize : "11px",
                        color: "var(--text-muted)",
                    }}>
                        D : {depth}
                    </span>
                </div>

                {/* Left Color bar */}
                <div style = {{
                    position : "absolute",
                    left : 0,
                    top : 0,
                    bottom : 0,
                    width: "4px",
                    background: typeColor,
                    borderRadius : "var(--radius) 0 0 var(--radius)",
                }}/>
        </div>
    );
}

export default memo(ClassNode)