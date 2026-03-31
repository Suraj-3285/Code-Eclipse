import axios from "axios";

const API = "http://localhost:5000/api";

//Get all projects

export async function getAllProjects() {
    const { data } = await axios.get(`${API}/projects`);
    return data;
}

//Get single project by ID
export async function getProjectById(id){
    const { data } = await axios.get(`${API}/projects/${id}`);
    return data;
}

export async function saveProject(payload) {
    const { data } = await axios.post(`${API}/projects`,payload);
    return data;
}

export async function deleteProject(id) {
    const { data } = await axios.delete(`${API}/projects/${id}`);
    return data;
}

