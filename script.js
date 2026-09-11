document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button, .mobile-menu");
    const sidebar = document.querySelector(".sidebar");

    if (!menuButton || !sidebar) return;

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);


    // Open / close sidebar
    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("sidebar-open");
        overlay.classList.toggle("overlay-visible");

    });


    // Close when overlay is clicked
    overlay.addEventListener("click", () => {

        sidebar.classList.remove("sidebar-open");
        overlay.classList.remove("overlay-visible");

    });


    // Close after selecting a navigation item
    const navLinks = sidebar.querySelectorAll(".nav-item");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            sidebar.classList.remove("sidebar-open");
            overlay.classList.remove("overlay-visible");

        });

    });

});
const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        logoutButton.disabled = true;

        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST"
            });

            const data = await response.json();

            if (!data.authenticated) {
    window.location.href = "/pages/login.html";
    return;
}

const fullName = data.user.full_name || "Patient";

const patientName = document.getElementById("patientName");
const welcomeName = document.getElementById("welcomeName");
const patientAvatar = document.getElementById("patientAvatar");

if (patientName) {
    patientName.textContent = fullName;
}

if (welcomeName) {
    welcomeName.textContent = fullName;
}

if (patientAvatar) {
    const initials = fullName
        .trim()
        .split(/\s+/)
        .map(name => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    patientAvatar.textContent = initials;
}

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Logout failed.");
            }

            window.location.href = "/pages/login.html";

        } catch (error) {
            console.error("Logout error:", error);

            logoutButton.disabled = false;

            alert("Unable to log out right now. Please try again.");
        }
    });
}
const startCaseButton = document.getElementById("startCaseButton");

if (startCaseButton) {
    startCaseButton.addEventListener("click", () => {
        window.location.href = "/pages/new-case.html";
    });
}

async function loadActiveCases() {
    const activeCasesCount = document.getElementById("activeCasesCount");

    if (!activeCasesCount) return;

    try {
        const response = await fetch("/api/case/current");
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Unable to load case information.");
        }

        activeCasesCount.textContent = data.hasCase ? "1" : "0";

    } catch (error) {
        console.error("Active cases loading error:", error);
        activeCasesCount.textContent = "0";
    }
}

loadActiveCases();
