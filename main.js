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

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry) {
                setActiveTab(visibleEntry.target.id);
            }
        },
        {
            rootMargin: "-40% 0px -40% 0px",
            threshold: [0.2, 0.4, 0.6],
        }
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if (hash) {
            setActiveTab(hash);
        }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
});