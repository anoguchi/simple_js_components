const tabby = document.querySelector(".tabby");
const tabsList = tabby.querySelector(".tabs");
const tabs = [...tabby.querySelectorAll(".tab")];
const tabContents = tabby.querySelector(".tab-contents");
const tabContent = [...tabContents.querySelectorAll(".tab-content")];

tabsList.addEventListener("click", (event) => {
  const tab = event.target;
  const target = tab.dataset.theme;
  const tabContentList = tabContents.querySelector(`[data-theme=${target}]`);

  // Selects a tab
  tabs.forEach((t) => {
    t.classList.remove("is-selected");
  });
  tab.classList.add("is-selected");

  // Selects the corresponding tab content
  tabContent.forEach((c) => {
    c.classList.remove("is-selected");
  });
  tabContentList.classList.add("is-selected");
});
