import { useState, useCallback } from "react";
import axios from "axios";

import Navbar from "./components/Navbar.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import TreeCanvas from "./components/TreeCanvas.jsx";
import HoverPanel from "./components/HoverPanel.jsx";
import Legend from "./components/Legend.jsx";
import ExportBar from "./components/ExportBar.jsx";
import FileUpload from "./components/FileUpload.jsx";
import SnippetDropdown from "./components/SnippetDropdown.jsx";
import ErrorPanel from "./components/ErrorPanel.jsx";
import ProjectHistory from "./components/ProjectHistory.jsx";

const API = "http://localhost:5000/api";

export default function App() {
  const [dark, setDark] = useState(true);

  // Editor
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Tree-data
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [classes, setClasses] = useState([]);
  const [errors, setErrors] = useState([]);

  // UI state
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false); // Fixed: setter name

  // Parse Java Code
  const handleParse = useCallback(async () => {
    if (!code.trim()) return;
    setLoading(true);
    setErrors([]);
    setSelectedClass(null);

    try {
      const { data } = await axios.post(`${API}/parse`, { code });
      setNodes(data.nodes);
      setEdges(data.edges);
      setClasses(data.classes);
      setErrors(data.errors || []);
    } catch (err) {
      setErrors([err.response?.data?.error || "Failed to parse code."]);
    } finally {
      setLoading(false);
    }
  }, [code]);

  // File Upload
  const handleFileUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axios.post(`${API}/upload`, formData); // Fixed: "upload" typo
      setCode(data.code);
    } catch (err) {
      setErrors([err.response?.data?.error || "File upload failed"]);
    }
  }, []);

  // Load saved projects
  const handleLoadProject = useCallback((project) => {
    setCode(project.javaCode);
    setNodes(project.nodes);
    setEdges(project.edges);
    setClasses(project.classes);
    setErrors(project.errors || []); // Fixed: "errors" typo
    setShowHistory(false);
  }, []);

  const handleClear = useCallback(() => {
    setCode("");
    setNodes([]);
    setEdges([]);
    setClasses([]);
    setErrors([]);
    setSelectedClass(null);
    setSearchQuery("");
  }, []);

  return (
    <div className={dark ? "dark" : ""} style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar
        dark={dark}
        onToggleTheme={() => setDark(!dark)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onToggleHistory={() => setShowHistory(!showHistory)}
      />

      {/* Main Layout*/}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Editor (left panel) */}
        <div style={{
          width: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "10px",
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
        }}>
          <SnippetDropdown onSelect={setCode} />
          <FileUpload onUpload={handleFileUpload} />
          <CodeEditor code={code} onChange={setCode} />

          {/* Parse + Clear Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="btn btn-accent"
              style={{ flex: 1 }}
              onClick={handleParse}
              disabled={loading}
            >
              {loading ? "Parsing..." : "⚡ Parse"}
            </button>
            <button className="btn" onClick={handleClear}>
              ✕ Clear
            </button>
          </div>

          <ErrorPanel errors={errors} />
        </div>

        {/* Canvas (right panel) */}
        <div style={{ flex: 1, position: "relative" }}>
          <TreeCanvas
            nodes={nodes}
            edges={edges}
            searchQuery={searchQuery}
            onNodeClick={(cls) => setSelectedClass(cls)}
          />

          {/* Overlays on canvas */}
          <Legend />
          <ExportBar />

          {/* Hover Panel */}
          {selectedClass && (
            <HoverPanel
              cls={selectedClass}
              onClose={() => setSelectedClass(null)}
            />
          )}
        </div>
      </div>

      {/* History sidebar */}
      {showHistory && (
        <ProjectHistory
          code={code}
          nodes={nodes}
          edges={edges}
          classes={classes}
          errors={errors}
          onLoad={handleLoadProject}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}