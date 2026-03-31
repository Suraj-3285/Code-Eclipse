import { useState, useEffect} from "react";
import { getAllProjects, saveProject, deleteProject } from "../api/projectApi.js";

export default function ProjectHistory({code, nodes, edges, classes, errors, onLoad, onClose}) {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("");

    // Fetching projects
    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        try{
            const data = await getAllProjects();
            setProjects(data.projects || []);
        } catch {
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    }

    // Saving current project
    async function handleSave() {
        if(!projectName.trim()){
            setError("please enter a project name");
            return;
        }
        if(!code.trim()){
            setError("no code to save");
            return;
        }
        setSaving(true);
        setError("");
        try{
            await saveProject({
                name: projectName,
                javaCode: code,
                nodes,edges,classes,errors
            });
            setProjectName("");
            await fetchProjects();
        }catch {
            setError("Failed to save project.");
        }finally{
            setSaving(false);
        }
    }
    //Delete Project 

    async function handleDelete(id){
        try{
            await deleteProject(id);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch{
            setError("Failed to delete project.");
        }
    }

    return (
        <>
        {/* Backdrop */}
        <div
            onClick={onClose}
            style={{
                position : "fixed",
                inset : 0,
                background : "rgba(0,0,0,0.4)",
                zIndex : 90
            }}
        />

        {/* Sidebar */}
        <div    
            className = "panel"
            style ={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "340px",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                borderRadius: "0",
                borderLeft: "1px solid var(--border)",
                animation: "slideInRight 0.25s ease"
            }}
        >
            {/* Header */}
            <div    
                style = {{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    borderBottom: "1px solid var(--border)",
                    flexShrink: 0
                }}
            >
                <div>
                    <div
                        style = {{
                            fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: "var(--text-primary)"
                        }}
                    >
                        🗂 Project History
                    </div>
                    <div
                        style = {{
                            fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        color: "var(--text-muted)"
                        }}
                    >
                         Code-Eclipse · Saved Trees
                    </div>
                </div>
                <button
                    className="btn"
                    onClick={onClose}
                    style={{ padding : "5px 10px"}}
                >
                    ✕
                </button>
            </div>

            {/* Save current project */}
            <div
                style={{
                    padding : "12px 16px",
                    borderBottom : "1px solid var(--border)",
                    flexShrink:0
                }}
            >
                <div    
                    style = {{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "8px"
                    }}
                >
                    Save Current Tree
                </div>

                <div style = {{ display : "flex",gap: "6px"}}>
                    <input
                        type="text"
                        placeholder="Project name..."
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        style={{
                            flex: 1,
                            padding: "7px 10px",
                            background: "var(--bg-panel)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius)",
                            color: "var(--text-primary)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            outline: "none"
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />

                <button 
                    className="btn btn-accent"
                    onClick={handleSave}
                    disabled={saving}
                    style={{ padding: "7px 12px", fontSize : "12px"}}
                >
                    {saving ? "..." : "Save"}
                </button>
                </div>

                {/* Error */}
                {error && (
                    <div    
                        style={{
                            fontFamily:"'JetBrains Mono',monospace",
                            fontSize:"11px",
                            color: "var(--node-orphan)",
                            marginTop: "6px"
                        }}
                    >
                       ⚠ {error}
                    </div> 
                )}
            </div>

            {/* Project List */}
            <div style={{ flex: 1,overflowY : "auto",padding: "12px 16px"}}>
                {loading && (
                    <div
                        style ={{
                            textAlign: "center",
                            color: "var(--text-muted)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            marginTop: "24px"
                        }}
                    >
                        Loading...
                    </div>
                )}

                {!loading && projects.length === 0 && (
                    <div 
                        style={{
                            textAlign: "center",
                            color: "var(--text-muted)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                            marginTop: "24px"
                        }}
                    >
                        No saved projects yet.
                    </div>
                )}

                {!loading && projects.map((project) => (
                    <div
                        key={project._id}
                        className="panel"
                        style={{
                            padding: "10px 12px",
                            marginBottom: "8px",
                            cursor: "pointer",
                            transition: "border-color 0.2s ease"
                        }}
                        onMouseEnter={(e) => 
                        (e.currentTarget.style.borderColor = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                        }
                    >
                        {/* Project Name */}
                        <div    
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: "13px",
                                color: "var(--text-primary)",
                                marginBottom: "4px"
                            }}
                        >
                            {project.name}
                        </div>

                        {/* Meta */}
                        <div    
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px",
                                color: "var(--text-muted)",
                                marginBottom: "8px"
                            }}
                        >
                            {project.classes?.length || 0} classes .{" "}
                            {new Date(project.createdAt).toLocaleDateString("en-US",{
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex",gap: "6px"}}>
                            <button
                                className = "btn btn-accent"
                                onClick={() => onLoad(project)}
                                style={{ flex:1, fontSize: "11px", padding: "5px 0"}}
                            >
                                Load
                            </button>
                            
                            <button 
                                className="btn"
                                onClick={() => handleDelete(project._id)}
                                style={{
                                    fontSize : "11px",
                                    padding: "5px 10px",
                                    color: "var(--node-orphan)",
                                    borderColor: "var(--node-orphan)55"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Slide in animations */}

            <style>
                {`
                    @keyframes slideInRight {
            from { opacity: 0; transform: translateX(40px); }
            to   { opacity: 1; transform: translateX(0); }
                    }
                `}
            </style>
        </div>
        </>
    );
} 