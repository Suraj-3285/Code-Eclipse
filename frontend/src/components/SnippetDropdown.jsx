import { snippets } from "../samples/snippets.js"

export default function SnippetDropdown({ onSelect }) {
    function handleChange(e) {
        const index  = e.target.value;
        if(index === "") return;
        onSelect(snippets[index].code);
        //Reset dropdown
        e.target.value = "";
    }

    return (
        <div>
        <div style = {{
            fontFamily : "'Syne',sans-serif",
            fontWeight : 700,
            fontSize : "11px",
            color: "var(--text-muted)",
            textTransform : "uppercase",
            letterSpacing : "0.08em",
            marginBottom : "6px",
        }}>
            Load Example
        </div>
        {/* DropDown */}
        <select 
            defaultValue= ""
            onChange={handleChange}
            style={{
                width : "100%",
                padding : "8px 12px",
                background : "var(--bg-panel)",
                border: "1px solid var(--border)",
                borderRadius : "var(--radius)",
                color : "var(--text-primary)",
                fontFamily : "'JetBrains Mono',monospace",
                fontSize : "12px",
                cursor : "pointer",
                outline : "none",
                appearance : "none",
                backgroundImage : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a1a1aa' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat : "no-repeat",
                backgroundPosition : "right 12px center",
                paddingRight : "32px",
                transition : "border-color 0.2s ease",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
        >
            {/* Placeholder */}
            <option value = "" disabled>
                🌑 Code-Eclipse Examples...
            </option>

            {/* Snippet Options */}
            {snippets.map((snippet,index) => (
                <option key={index} value = {index}>
                    {snippet.label}-{snippet.description}
                </option>
            ))}
        </select>
        </div>
    );
}