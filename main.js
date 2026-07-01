document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
    }

    const navLinks = Array.from(document.querySelectorAll(".nav-tabs .nav-tab"));
    const sections = Array.from(document.querySelectorAll("main .page-section[id]"));

    if (!navLinks.length || !sections.length) {
        return;
    }

    const setActiveTab = (activeId) => {
        navLinks.forEach((link) => {
            const targetId = link.getAttribute("href").split("#").pop();
            link.classList.toggle("active", targetId === activeId);
        });
    };

    const updateActiveSection = () => {
        const offset = 140;
        let activeSectionId = sections[0]?.id;
        let smallestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
            const distance = Math.abs(section.getBoundingClientRect().top - offset);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                activeSectionId = section.id;
            }
        });

        setActiveTab(activeSectionId);
    };

    const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
            setActiveTab(hash);
        }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", handleHashChange);
    updateActiveSection();
    handleHashChange();
});