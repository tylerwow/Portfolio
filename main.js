document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
    }

    const navToggle = document.querySelector(".nav-toggle");
    const navOverlay = document.querySelector(".nav-overlay");
    const navDrawer = document.querySelector(".nav-drawer");
    const navLinks = Array.from(document.querySelectorAll(".nav-tabs .nav-tab"));
    const drawerLinks = Array.from(document.querySelectorAll(".nav-drawer .nav-tab"));
    const sections = Array.from(document.querySelectorAll("main .page-section[id]"));

    const closeDrawer = () => {
        if (!navDrawer || !navOverlay) {
            return;
        }

        navDrawer.classList.remove("open");
        navOverlay.hidden = true;
        document.body.classList.remove("nav-open");
        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
        }
    };

    const openDrawer = () => {
        if (!navDrawer || !navOverlay) {
            return;
        }

        navDrawer.classList.add("open");
        navOverlay.hidden = false;
        document.body.classList.add("nav-open");
        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "true");
        }
    };

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            const isOpen = navDrawer?.classList.contains("open");
            if (isOpen) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", closeDrawer);
    }

    [...drawerLinks, ...navLinks].forEach((link) => {
        link.addEventListener("click", closeDrawer);
    });

    if (!navLinks.length || !sections.length) {
        return;
    }

    const setActiveTab = (activeId) => {
        const allLinks = [...navLinks, ...drawerLinks];
        allLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const targetId = href.split("#").pop();
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