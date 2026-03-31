import Editor from "@monaco-editor/react";

export default function CodeEditor({code,onChange}){
    function handleMount(editor){
        editor.focus();

        setTimeout(() => {
            editor.getAction("editor.action.formatDocument")?.run();
        },300);
    }

    return (
        <div
            style = {{
                borderRadius: "var(--radius)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                flexShrink: 0,
            }}
        >
            <Editor 
                height="340px"
                language="java"
                value={code}
                onChange={(val) => onChange(val || "")}
                onMount={handleMount}
                theme="vs-dark"
                options={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontLigatures: true,
                    minimap: {enabled: false},
                    scrollBeyondLastLine : false,
                    lineNumbers: "on",
                    roundedSelection: true,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap : "on",
                    bracketPairColorization: {enabled: true},
                    padding: {top:12, bottom: 12},
                    scrollbar: {
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                }}
            />
        </div>
    );
}