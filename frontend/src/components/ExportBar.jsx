import { useState } from "react";
import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";

// Helper to get the reactflow canvas element

function getCanvas() {
        return document.querySelector(".react-flow__renderer");
}

export default function ExportBar() {
    const [loading,setLoading] = useState("");

    // png exporting function
    async function exportPNG() {
        const el = getCanvas();
        if(!el) return;
        setLoading("png");
        try {
            const dataUrl = await toPng(el, {cacheBust:true, pixelRatio: 2});
            download(dataUrl, "code-eclipse-tree.png");
        } catch(err) {
            console.error("[ExportBar] PNG failed:",err.message);
        } finally{
            setLoading("");
        }
    }

    // function SVG export
    async function exportSVG() {
        const el = getCanvas();
        if(!el) return;
        setLoading("svg");
        try {
            const dataUrl = await toSvg(el, {cacheBust: true});
            download(dataUrl,"code-eclipse-tree.svg");
        } catch (err) {
            console.error("[Exportbar] SVG failed : ",err.message);
        } finally {
            setLoading("");
        }
    }
    //exporting PDF
    async function exportPDF() {
        const el = getCanvas();
        if(!el) return;
        setLoading("pdf");
        try {
            const dataUrl = await toPng(el, { cacheBust: true,pixelRatio : 2});
            const pdf = new jsPDF({
                orientation : "landscape",
                unit: "px",
                format: [el.offsetWidth,el.offsetHeight],
            });
            pdf.addImage(dataUrl,"PNG",0,0,el.offsetWidth,el.offsetHeight);
            pdf.save("code-eclipse-tree.pdf");
        } catch(err) {
            console.error("[ExportBar] PDF failed: ",err.message);
        } finally {
            setLoading("");
        }
    }

    //helper for download

    function download(dataUrl,filename) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        a.click();
    }

    const buttons = [
        {label: "PNG", key: "png", action: exportPNG,icon: "🖼"},
        {label: "SVG" , key:"svg" ,action: exportSVG, icon : "✏️"},
        {label: "PDF", key: "pdf" , action: exportPDF, icon : "📄"},
    ]

    return (
        <div    
            className="panel"
            style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                zIndex: 40,
                padding: "6px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
                }}
        >
            {/* Label */}
            <span
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                }}
            >
                Export
            </span>
            {/* Divider */}
            <div    
                style={{
                    width: "1px",
                    height: "20px",
                    background: "var(--border)",
                }}
            />
            {/* Buttons */}
            {buttons.map(({label,key,action,icon}) => (
                <button
                    key={key}
                    className="btn"
                    onClick={action}
                    disabled={loading !== ""}
                    title = {`Export as ${label}`}
                    style = {{
                        padding: "5px 10px",
                        fontSize: "11px",
                        fontFamily: "'JetBrains Mono', monospace",
                        opacity: loading !== "" && loading !== key ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    {loading === key ? "..." : `${icon} ${label}`}
                </button>
            ))}
        </div>
    );
}