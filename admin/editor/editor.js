const editor = new EditorJS({
    holder: 'editor',
    autofocus: true, // Enable typing by default
    tools: {
        header: {
            class: Header,
            inlineToolbar: true
        },
        list: {
            class: List,
            inlineToolbar: true
        }
    }
});

// Default subtopics
let subtopics = [
    { id: 1, name: "Introduction", checked: true, order: 1 },
    { id: 2, name: "Setup Guide", checked: true, order: 2 },
    { id: 3, name: "Features", checked: false, order: 3 },
    { id: 4, name: "FAQs", checked: false, order: 4 },
    { id: 5, name: "Conclusion", checked: true, order: 5 }
];

const subtopicList = document.getElementById("subtopic-list");

// Render subtopics
function renderSubtopics() {
    subtopicList.innerHTML = "";
    subtopics.sort((a, b) => a.order - b.order).forEach((subtopic) => {
        const li = document.createElement("li");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = subtopic.checked;
        checkbox.addEventListener("change", () => {
            subtopic.checked = checkbox.checked;
        });

        // Order Input
        const orderInput = document.createElement("input");
        orderInput.type = "number";
        orderInput.value = subtopic.order;
        orderInput.style.width = "40px";
        orderInput.addEventListener("change", () => {
            subtopic.order = parseInt(orderInput.value);
            renderSubtopics();
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(` ${subtopic.name} `));
        li.appendChild(orderInput);
        subtopicList.appendChild(li);
    });
}

// Load existing subtopics or default ones
window.onload = () => {
    const savedSubtopics = localStorage.getItem("subtopics");
    if (savedSubtopics) {
        subtopics = JSON.parse(savedSubtopics);
    }
    renderSubtopics();
};

// Save content and subtopics
document.getElementById("save-btn").addEventListener("click", async () => {
    try {
        const savedData = await editor.save();
        localStorage.setItem("editorContent", JSON.stringify(savedData));
        localStorage.setItem("subtopics", JSON.stringify(subtopics));
        alert("Content and Subtopics Saved!");
    } catch (error) {
        console.error("Saving failed:", error);
    }
});
