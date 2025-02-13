 <!-- Load Editor.js -->
    <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>

    <!-- Load Required Plugins -->
    <script src="https://cdn.jsdelivr.net/npm/@editorjs/header@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/@editorjs/list@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/@editorjs/paragraph@latest"></script>

    <!-- Link to external CSS -->
    <link rel="stylesheet" href="editor.css">






document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Editor.js script loaded!");

    // Check if plugins are loaded
    if (typeof Header === "undefined") {
        console.error("❌ Error: Header plugin is missing!");
    }
    if (typeof List === "undefined") {
        console.error("❌ Error: List plugin is missing!");
    }
    if (typeof Paragraph === "undefined") {
        console.error("❌ Error: Paragraph plugin is missing!");
    }

    // Initialize Editor.js
    const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
            header: {
                class: Header,
                inlineToolbar: true
            },
            list: {
                class: List,
                inlineToolbar: true
            },
            paragraph: {
                class: Paragraph,
                inlineToolbar: true
            }
        },
        data: {
            blocks: [
                {
                    type: "header",
                    data: {
                        text: "Type Your Title Here...",
                        level: 2
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "Start writing your content here..."
                    }
                }
            ]
        },
        onReady: () => {
            console.log("✅ Editor.js is ready!");
        },
        onChange: () => {
            console.log("✏️ Editor content changed!");
        }
    });

    document.getElementById("save-btn").addEventListener("click", async () => {
        try {
            const savedData = await editor.save();
            localStorage.setItem("editorContent", JSON.stringify(savedData));
            alert("✅ Content Saved!");
        } catch (error) {
            console.error("❌ Saving failed:", error);
        }
    });
});
