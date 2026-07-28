// Ensure script runs after HTML document is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. DATA STRUCTURES (ARRAYS & OBJECTS)
    // ==========================================

    // Array of project objects
    const projectsData = [
        {
            title: "Local LLM Deployment Env",
            tools: "Isolated Volumes, PyTorch, Ollama",
            status: "Completed"
        },
        {
            title: "Data Structure Visualizer",
            tools: "Java, Binary Search Trees, OOP Concepts",
            status: "Completed"
        },
        {
            title: "Relational Database Management System",
            tools: "SQL, Complex Queries, Schema Design",
            status: "In Progress"
        }
    ];

    // Array of skill category objects
    const skillsData = [
        {
            category: "Core Technical Competencies",
            items: [
                "Languages: C, Java, Python, SQL",
                "AI/ML Foundations: Machine Learning Workloads, Local Model Execution, Neural Network Basics",
                "Computer Science: Data Structures & Algorithms (DSA), Relational Databases (DBMS)"
            ]
        }
    ];

    // Array to temporarily store inquiries submitted via the form
    const formSubmissions = [];

    // ==========================================
    // 2. FUNCTIONS
    // ==========================================

    /**
     * Renders the table rows based on an array of project objects.
     * @param {Array} projects - Array containing project objects.
     */
    function renderProjects(projects) {
        const tbody = document.querySelector("#projects table tbody");
        if (!tbody) return;

        // Clear existing static rows
        tbody.innerHTML = "";

        // Iterate through array and append rows using map/join
        tbody.innerHTML = projects.map(project => `
            <tr>
                <td><strong>${project.title}</strong></td>
                <td>${project.tools}</td>
                <td>
                    <span style="color: ${project.status === 'Completed' ? '#34d399' : '#fbbf24'}">
                        ${project.status}
                    </span>
                </td>
            </tr>
        `).join("");
    }

    /**
     * Renders skill directories dynamically under the section paragraph.
     * @param {Array} skills - Array containing skill categories.
     */
    function renderSkills(skills) {
        const skillsSection = document.querySelector("#skills");
        if (!skillsSection) return;

        // 1. Remove the static HTML 'Core Technical Competencies' details block to prevent duplicates
        const staticDetails = skillsSection.querySelectorAll("details");
        staticDetails.forEach(detail => {
            const summaryText = detail.querySelector("summary")?.textContent;
            if (summaryText && summaryText.includes("Core Technical Competencies")) {
                detail.remove();
            }
        });

        // 2. Check if dynamic container exists; if not, create and insert AFTER the section paragraph
        let dynamicContainer = document.getElementById("dynamic-skills");
        if (!dynamicContainer) {
            dynamicContainer = document.createElement("div");
            dynamicContainer.id = "dynamic-skills";

            const descriptionParagraph = skillsSection.querySelector("p");
            if (descriptionParagraph) {
                descriptionParagraph.insertAdjacentElement("afterend", dynamicContainer);
            } else {
                skillsSection.appendChild(dynamicContainer);
            }
        }

        // 3. Render skill categories
        dynamicContainer.innerHTML = skills.map(skillGroup => `
            <details open>
                <summary><strong>${skillGroup.category}</strong></summary>
                <ul>
                    ${skillGroup.items.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </details>
        `).join("");
    }

    /**
     * Handles the Academic Connect Form Submission
     * @param {Event} event - Form submission event
     */
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent page reload & query parameter creation in URL

        const username = document.getElementById("username").value.trim();
        const purpose = document.getElementById("purpose").value;
        const comments = document.getElementById("comments").value.trim();

        if (!username || !comments) {
            alert("Please fill in all required fields.");
            return;
        }

        // Construct submission object
        const newInquiry = {
            id: Date.now(),
            username: username,
            purpose: purpose,
            comments: comments,
            submittedAt: new Date().toLocaleTimeString()
        };

        // Push into array
        formSubmissions.push(newInquiry);

        // Feedback UI message creation/updating
        let feedbackMessage = document.getElementById("form-feedback");
        if (!feedbackMessage) {
            feedbackMessage = document.createElement("p");
            feedbackMessage.id = "form-feedback";
            feedbackMessage.style.cssText = "color: #34d399; font-weight: bold; margin-top: 15px;";
            event.target.appendChild(feedbackMessage);
        }

        feedbackMessage.textContent = `Thank you, ${username}! Your inquiry regarding "${purpose}" has been logged successfully.`;

        // Reset the form fields
        event.target.reset();
    }

    // ==========================================
    // 3. INITIALIZATION & EVENT LISTENERS
    // ==========================================

    // Initialize initial render
    renderProjects(projectsData);
    renderSkills(skillsData);

    // Attach form submit handler
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleFormSubmit);
    }
});