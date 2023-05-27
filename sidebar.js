import { data } from "./data.js";

//* present the data in ui
const mainMenu = document.querySelector('.main-menu ul');
const list = document.querySelector('.list');

const searchInput = document.querySelector('input[type="search"]');

const mainMenuList = data.map(el => `<li title="${el.label}" id="${el.id}"><img src="${el.icon}" alt="${el.label}" /></li>`).join('')

const sidebar = document.querySelector('.sidebar');

mainMenu.innerHTML = mainMenuList;



const mainMenuListItems = document.querySelectorAll('.main-menu ul li');

let dataSet = [];

let activePros = null;
if(activePros === null) {
  sidebar.style.display = 'none'
}

const activeProsProxy = new Proxy({ value: activePros }, {
  set: function(target, property, value) {
    if (property === 'value') {
      if(value === null) {
        sidebar.style.display = 'none'
      } else {
        sidebar.style.display = 'block'
      }
    }

    target[property] = value;
    return true;
  }
});

const searchInputProxy = new Proxy({ value: searchInput.value }, {
  set: function(target, property, value) {
    if (property === 'value') {
      if(value !== null) {
        const newDataSet = dataSet.filter(el => el.code.includes(searchInput.value));
       const newMenuData = newDataSet.map(el => `<div class="item-wrapper">
  <input type="radio" id="${el.code}" name="list-item" value="${el.id}" class="radio-list" />
  <div class="cpt">
  <label for="${el.code}">Code: ${el.code}</label>
  <label for="${el.code}" class="desc" >Description: ${el.description.substring(0, 20)}...</label>
  </div>
  
  </div>`).join('')
  list.innerHTML = newMenuData;
      }
     
    }

    target[property] = value;
    return true;
  }
});

// activePros.addEventListener('cha')
mainMenuListItems.forEach(function (item) {
  item.addEventListener("click", function () {
      const itemId = this.id;
      const menuFilter = data.find(el => el.id === parseFloat(itemId));
      activeProsProxy.value = menuFilter;
      dataSet = menuFilter.setData;
      const menuData = menuFilter.setData.map(el => `<div class="item-wrapper">
      <i class="fa-solid fa-life-ring"></i>
      <div class="cpt">
      <label for="${el.code}">Code: ${el.code}</label>
      <label for="${el.code}" class="desc" >Description: ${el.description.substring(0, 20)}...</label>
      </div>
      
      </div>`).join('')
      list.innerHTML = menuData;
  });
});

searchInput.addEventListener('change', () => {
  searchInputProxy.value = searchInput.value
})

//* get all radios
const radios = document.querySelectorAll('.radio-list');
const radioParent = document.querySelectorAll('.item-wrapper')

console.log({radios})
radios.forEach(function (radioButton) {
  console.log({radioButton})
  radioButton.addEventListener("change", function (evt) {
    console.log("first")
    radioParent.forEach(wrapper => {
      wrapper.classList.remove('item-wrapper-radio-checked')
    })
    if (evt.target.checked) {
      console.log("first")
      console.log({tt: evt.target.parentNode})
      evt.target.parentNode.classList.add('item-wrapper-radio-checked')
      const radioValue = this.value;
      const menuFilter = data.find(el => el.id === parseInt(radioValue));
      const menuData = menuFilter.setData.map(el => `<div class="radio-wrapper">
      <input type="radio" id="${el.code}" name="list-item" value="${el.id}" class="radio-list" />
      <div >
      <label for="${el.code}">${el.code}</label>
      <label for="${el.code}">${el.description}</label>
      </div>
      
      </div>`).join('')
      list.innerHTML = menuData;
    }
  });
});

