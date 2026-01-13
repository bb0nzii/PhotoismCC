// -- nav
document.addEventListener("DOMContentLoaded", () => {
  const mappings = {
    "handover-nav1": "handover1",
    "handover-nav2": "handover2",
    "handover-nav3": "handover3",
    "handover-nav4": "handover4",
    "handover-nav5": "handover5",
    "handover-nav6": "handover6",
  };

  Object.keys(mappings).forEach(navId => {
    const navItem = document.getElementById(navId);
    const targetId = mappings[navId];

    if (navItem) {
      navItem.addEventListener("click", () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });
});