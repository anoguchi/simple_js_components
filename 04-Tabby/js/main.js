// const tabs = document.querySelectorAll(".tab");
// const tabby = document.querySelector('.tab-contents')
// const tabContents = Array.from(tabby.querySelectorAll('.tab-content'))

// tabs.forEach((tab) => {
//   tab.addEventListener("click", (event) => {
//     const target = tab.dataset.theme
//     const tabContent = tabby.querySelector(`[data-theme=${target}]`)
//     tabs.forEach(t => t.classList.remove('is-selected'))
//     tab.classList.add('is-selected')
//     tabContents.forEach(c => c.classList.remove('is-selected'))
//     tabContent.classList.add('is-selected')
//   });
// });


const tabby = document.querySelector('.tabby')
const tabsList = tabby.querySelector(".tabs");
const tabs = Array.from(tabby.querySelectorAll('.tab'))
const tabContents = tabby.querySelector('.tab-contents')
const tabContent = Array.from(tabContents.querySelectorAll('.tab-content'))

tabsList.addEventListener('click', event => {
  const tab = event.target
  const target = tab.dataset.theme
  const tabContentList = tabContents.querySelector(`[data-theme=${target}]`)

  // Selects a tab
  tabs.forEach(t => {
    t.classList.remove('is-selected')
  });
  tab.classList.add('is-selected')

  // Selects the corresponding tab content
  tabContent.forEach(c => {
    c.classList.remove('is-selected')
  });
  tabContentList.classList.add('is-selected')
})

