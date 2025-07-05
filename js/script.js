const loader = document.getElementById('loader');
let menuData = [];
loader.style.display = 'block';
    fetch('menu.json')
      .then(response => response.json())
      .then(data => {
        menuData = data;
        createCategoryButtons(menuData);
        displayMenu(menuData); // نمایش اولیه
        loader.style.display = 'none' ;
      })
      .catch(error => {
        console.error('خطا در بارگذاری منو:', error);
      });

    function displayMenu(items) {
      const container = document.getElementById('menu-container');
      container.innerHTML = '';
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = 
         ` <img src="${item.image}" alt="${item.name}" loading="lazy">
          <h3>${item.name}</h3>
          <p>${item.category}</p>
          <p>${item.price} تومان</p>
          
       ` ;
       
        container.appendChild(div);
      });
    }

    function filterMenu(category) {
      if (category === 'همه') {
        displayMenu(menuData);
      } else {
        const filtered = menuData.filter(item => item.category === category);
        displayMenu(filtered);
      }
    }

    function createCategoryButtons(data) {
      const categoriesDiv = document.getElementById('categories');

      // استخراج دسته‌بندی‌ها به صورت یونیک
      const categories = ['همه', ...new Set(data.map(item => item.category))];

      // ساخت دکمه برای هر دسته
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.onclick = () => filterMenu(cat);
        categoriesDiv.appendChild(btn);
      });
    }
    const btn = document.getElementById('scrollToTopBtn') ;
    window.onscroll = function(){
      if(document.body.scrollTop > 320 || document.documentElement.scrollTop > 320){
        btn.style.display = "block"
      }else{
        btn.style.display = "none" ;
      }

    } ;
    btn.onclick = function(){
      window.scrollTo({top:0,behavior: "smooth"}) ;
    };
    
    const bar = document.getElementById('categories');
    window.addEventListener('scroll', () => {
      bar.classList.toggle('scrolled', window.scrollY > 10);
    });