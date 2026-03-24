import { useEffect,useMemo,useCallback} from "react";
import ReactFlow, {
    Background,Controls,MiniMap,useNodesState,useEdgesState,MarkerType
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import ClassNode from "./ClassNode.jsx";

const nodeTypes = {classNode : ClassNode};
//Dagre layout config

const NODE_WIDTH = 240;
const NODE_HEIGHT = 110;

function applyDagreLayout(nodes,edges) {
    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: "TB",nodesep: 60,ranksep:80});

    nodes.forEach((node) => {
        g.setNode(node.id, {width: NODE_WIDTH,height : NODE_HEIGHT});
    });

    edges.forEach((edge) => {
        g.setEdge(edge.source,edge.target);
    });

    dagre.layout(g);

    return nodes.map((node) => {
        const pos = g.node(node.id);
        return {
            ...node,
            position: {
                x: pos.x-NODE_WIDTH/2,
                y: pos.y-NODE_HEIGHT/2,
            },
        };
    });
}

//Style edges based on label

function styleEdges(edges) {
    return edges.map((edge) => ({
        ...edge,
        animated: edge.label === "implements",
        style: {stroke: "var(--accent)",strokeWidth:2},
        labelStyle : {fill:"var(--text-secondary)",fontFamily: "JetBrains Mono",fontSize: 11},
        labelBgStyle : { fill:"var(--bg-secondary)",fillOpacity: 0.85},
        markerEnd : {
            type : MarkerType.ArrowClosed,
            color: "var(--accent)",
        },
    }));
}

export default function TreeCanvas({nodes: rawNodes,edges: rawEdges,searchQuery,onNodeClick}){
    const [nodes,setNodes,onNodesChange] = useNodesState([]);
    const [edges,setEdges,onEdgesChange] = useEdgesState([]);

    //Apply layout + search highlight
    useEffect(() => {
        if(!rawNodes.length) {
            setNodes([]);
            setEdges([]);
            return;
        }
        //Highlight nodes matched with search
        const highlightedNodes = rawNodes.map((node) => ({
            ...node,
            data: {
                ...node.data,
                isHighlighted:
                    searchQuery.trim() !== "" &&
                    node.data.name.toLowerCase().includes(searchQuery.toLowerCase()),
            },
        }));
        const laid = applyDagreLayout(highlightedNodes,rawEdges);
        const styled = styleEdges(rawEdges);

        setNodes(laid);
        setEdges(styled);
    },[rawNodes,rawEdges,searchQuery]);
    //Node click handlebar
    const handleNodeClick = useCallback((_, node) => {
        onNodeClick(node.data);
    },[onNodeClick]);

    //Minimap node color
    const minimapColor = useCallback((node) => {
        const map = {
            class: "#6366f1",
            interface: "#10b981",
            abstract: "#f59e0b",
        };
        return map[node.data?.type] || "#6366f1";
    },[]);

    return (
        <div style = {{width: "100%",height:"100%",background:"var(--bg-primary)"}}>
            <ReactFlow
            nodes = {nodes}
            edges = {edges}
            onNodesChange = {onNodesChange}
            onEdgesChange = {onEdgesChange}
            onNodeClick = {handleNodeClick}
            nodeTypes = {nodeTypes}
            fitView
            fitViewOptions={{padding: 0.2}}
            minZoom = {0.2}
            maxZoom = {2}
            deleteKeyCode = {null}
            >
                {/*Dot grid background*/}
                <Background variant = "dots" gap={20} size={1.2} color = "var(--border)"/>
                {/*Zooom + fit Controls*/}
                <Controls showInteractive={false}/>
                
                <MiniMap
                    nodeColor = {minimapColor}
                    maskColor = "var(--bg-primary)"
                    style = {{opacity: 0.85}}
                />
            </ReactFlow>
        </div>
    );
}
