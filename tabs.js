const menuTabs = document.querySelectorAll(".tabs-wrapper .tab-item");
const tableTabs = document.querySelectorAll(".table-tabs-wrapper .tab-item");

function changeTabColor(tab, tabs) {
  // Remove active class from all tabs
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Add active class to the clicked tab
  tab.classList.add("active");
}


menuTabs.forEach(tab => {
    tab.addEventListener('click', (evt) => {
        changeTabColor(evt.target, menuTabs)})
})

tableTabs.forEach(tab => {
    tab.addEventListener('click', (evt) => {
        changeTabColor(evt.target, tableTabs)})
})
