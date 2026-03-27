import { useState, useRef } from "react";

export default function FileUpload({onUpload}) {
    const [dragging,setDragging] = useState(false);
    const [error,setError] = useState("");
    const [fileName,setFileName] = useState("");
    const inputRef = useRef(null);

    //Validate + fire
    function handleFile(file) {
        setError("");
        if(!file) return;
        if(!file.name.endsWith(".java")) {
            setError("Only .java files are allowed.");
            return;
        }

        setFileName(file.name);
        onUpload(file);
    }

    //Drag Events
    function onDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function onDragLeave() {
        setDragging(false);
    }

    function onDrop(e) {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }

    //Click to browse

    function onClick() {
        inputRef.current?.click();
    }

    function onInputChange(e) {
        handleFile(e.target.files[0]);
    }

    return (
        <div>
            {/* Drop zone */}
            <div 
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop = {onDrop}
                onClick={onClick}
                style = {{
                    border:`2px dashed ${dragging ? "var(--accent)" : "var(--border)"}`,
                    borderRadius : "var(--radius)",
                    padding : "14px",
                    textAlign : "center",
                    cursor : "pointer",
                    background : dragging ? "var(--accent-soft)" : "var(--bg-panel)",
                    transition: "all 0.2s ease",
                }}
            >
                {/* Icon */}
                <div style={{fontSize: "22px", marginBottom: "6px"}}>
                    {dragging ? "📂" : "📁"}
                </div>
                {/* Text */}
                {fileName ? (
                    <div
                        style={{
                            fontFamily : "'JetBrains Mono',monospace",
                            fontSize : "11px",
                            color: "var(--accent)",
                            fontWeight:600,
                        }}
                    >
                      ✓ {fileName}
                    </div>  
                ): (
                    <>
                        <div
                            style={{
                                fontFamily: "'Syne',sans-serif",
                                fontWeight:600,
                                fontSize:"12px",
                                color: "var(--text-secondary)",
                                marginBottom : "2px",
                            }}
                        >
                            Drop a .java file
                        </div>
                        <div
                            style={{
                                fontFamily : "'JetBrains Mono',monospace",
                                fontSize: "10px",
                                color: "var(--text-muted)",
                            }}
                        >
                            or click to browse
                        </div>
                    </>
                )}

                {/* Hidden file input */}
                <input  
                    ref={inputRef}
                    type="file"
                    accept=".java"
                    onChange={onInputChange}
                    style={{ display : "none"}}
                />
            </div>
            {/* Error Message */}
            {error && (
                <div    
                    style={{
                         fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "var(--node-orphan)",
                        marginTop: "5px",
                        paddingLeft: "4px",
                    }}
                >
                    ⚠ {error}
                </div> 
            )}
        </div>
    );
}