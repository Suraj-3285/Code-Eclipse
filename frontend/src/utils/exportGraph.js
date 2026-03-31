import { toPng, toSvg } from "html-to-image";
import jsPDF from "jspdf";

//Getting reactflow canvas element

function getCanvas(){
    const el = document.querySelector(".react-flow__renderer");
    if(!el) throw new Error("Canvas not found.");
    return el;
}

// Download helper

function triggerDownload(dataUrl, filename){
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
}

// Export as PNG

export async function exportAsPNG(filename = "code-eclipse-tree.png"){
    const el = getCanvas();
    const dataUrl = await toPng(el, {cacheBust:true, pixelRatio: 2});
    triggerDownload(dataUrl,filename);
}

//export as SVG
export async function exportAsSVG(filename = "code-eclipse-tree.svg"){
    const el = getCanvas();
    const dataUrl = await toSvg(el, { cacheBust: true});
    triggerDownload(dataUrl, filename);
}

//Export as PDF

export async function exportAsPDF(filename = "code-eclipse-tree.pdf"){
    const el = getCanvas();
    const dataUrl = await toPng(el, { cacheBust: true,pixelRatio: 2});

    const pdf = new jsPDF({
        orientation : "landscape",
        unit : "px",
        format: [el.offsetWidth, el.offsetHeight],
    });

    pdf.addImage(dataUrl, "PNG" , 0, 0, el.offsetWidth, el.offsetHeight);
    pdf.save(filename);
}