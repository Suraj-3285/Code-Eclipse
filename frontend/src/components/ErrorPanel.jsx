export default function ErrorPanel({errors}) {
    if(!errors || errors.length === 0) return null;

    return (
        <div 
            className="panel"
            style ={{
                padding: "12px",
                borderColor:"var(--node-orphan)",
                background:"var(--node-orphan)11",
            }}
        >
            {/* Header */}
            <div 
                style ={{
                    display : "flex",
                    alignItems:"center",
                    gap:"6px",
                    marginBottom:"8px",
                }}
            >
                <span style = {{ fontSize: "14px"}}>⚠️</span>
                <span 
                    style ={{
                        fontFamily : "'Syne',sans-serif",
                        fontWeight:700,
                        fontSize : "12px",
                        color : "var(--node-orphan)",
                        textTransform:"uppercase",
                        letterSpacing : "0.06em",
                    }}
                >
                    {errors.length} Issue{errors.length !== 1 ? "s" : ""} Found
                </span>
            </div>

            {/* List of errors */}
            <div
                style ={{
                    display : "flex",
                    flexDirection:"column",
                    gap:"5px",
                }}
            >
                {errors.map((error,i) => (
                    <div
                        key={i}
                        style={{
                            display : "flex",
                            gap:"8px",
                            alignItems:"flex-start",
                            background:"var(--bg-secondary)",
                            border : "1px solid var(--node-orphan)44",
                            borderRadius: "8px",
                            padding : "7px 10px",
                        }}
                    >
                        {/* Indexing */}
                        <span   
                            style ={{
                                fontFamily:"'JetBrains Mono',monospace",
                                fontSize:"10px",
                                color:"var(--node-orphan)",
                                fontWeight : 600,
                                flexShrink:0,
                                marginTop: "1px",
                            }}
                        >
                            {String(i+1).padStart(2,"0")}
                        </span>
                        {/* Error message */}
                        <span 
                            style ={{
                                fontFamily:"'JetBrains Mono',monospace",
                                fontSize : "11px",
                                color : "var(--text-secondary)",
                                lineHeight: 1.5,
                            }}
                        >
                            {error}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}