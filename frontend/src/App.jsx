import {useState,useCallback} from "react";
import axios from "axios";

import Navbar           from "./components/Navbar.jsx";
import CodeEditor       from "./components/CodeEditor.jsx";
import TreeCanvas       from "./components/TreeCanvas.jsx";
import HoverPanel       from "./components/HoverPanel.jsx";
import Legend           from "./components/Legend.jsx";
import ExportBar        from "./components/ExportBar.jsx";
import FileUpload       from "./components/FileUpload.jsx";
import SnippetDropdown  from "./components/SnippetDropdown.jsx";
import ErrorPanel       from "./components/ErrorPanel.jsx";
import ProjectHistory   from "./components/ProjectHistory.jsx";

const API = "http://localhost:5000/api";

export default function App(){
  const [dark,setDark] = useState(true);
//editor
  const [code,setCode] = useState("");
  const [loading,setLoading] = useState(false);

  //Tree-data
  const [nodes, setNodes] = useState([]);
  const [edges,setEdges] = useState([]);
  const [classes,setClasses] = useState([]);
  const [errors,setErrors] = useState([]);

  //UI state
  const [selectedClass,setSelectedClass] = useState(null);
  const [searchQuery,setSearchQuery] = useState("");
  const [showHistory,setShownHistory] = useState(false);

  //Parse Java Code
  const handleParse = useCallback(async () => {
    if(!code.trim()) return;
    setLoading(true);
    setErrors([]);
    setSelectedClass(null);

    try{
      const {data} = await axios.post(`${API}/parse`,{code});
      setNodes(data.nodes);
      setEdges(data.edges);
      setClasses(data.classes);
      setErrors(data.errors || []);
    }catch(err) {
      setErrors([err.response?.data?.error || "Failed to parse code."]);
    }finally{
      setLoading(false);
    }
  },[code]);


  // File Upload
  const handleFileUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file",file);
    try{
      const { data } = await axios.post(`${API}/uplaod`,formData);
      setCode(data.code);
    }catch (err) {
      setErrors([err.response?.data?.error || "File uplaod failed"]);
    }
  },[]);

  //Load saved projects
  const handleLoadProject = useCallback((project) => {
    setCode(project.javaCode);
    setNodes(project.nodes);
    setEdges(project.edges);
    setClasses(project.classes);
    setErrors(project.erros || []);
    setShownHistory(false);
  },[])

  const handleClear = useCallback(() => {
    setCode("");
    setNodes([]);
    setEdges([]);
    setClasses([]);
    setErrors([]);
    setSelectedClass(null);
    setSearchQuery("");
  },[]);

}