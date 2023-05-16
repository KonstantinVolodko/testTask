document.addEventListener("DOMContentLoaded", () => {


  //= components/

  let basketIco = document.querySelector('.header-content__basket');
  basketIco.addEventListener('click', e => {
    window.location.href = "/basket.html";
  });

  let logo = document.querySelectorAll('.header-content__logo').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault()
      window.location.href = "/";
    })
  });

  let basketPage = document.querySelector('.basket');

  const headphones = [
    {
      img: "image1.jpg",
      title: "Apple BYZ S852I",
      price: "2927",
      oldPrice: "3527",
      rate: "4.7",
    },
    {
      img: "image2.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image3.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image1.jpg",
      title: "Apple BYZ S852I",
      price: "2927",
      oldPrice: "3527",
      rate: "4.7",
    },
    {
      img: "image2.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image3.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image1.jpg",
      title: "Apple BYZ S852I",
      price: "2927",
      oldPrice: "3527",
      rate: "4.7",
    },
    {
      img: "image2.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image3.jpg",
      title: "Apple EarPods",
      price: "2327",
      rate: "4.5",
    },
    {
      img: "image4.jpg",
      title: "Apple AirPods",
      price: "9527",
      rate: "4.7",
      wireless: true,
    },
    {
      img: "image5.jpg",
      title: "GERLAX GH-04",
      price: "6527",
      rate: "4.7",
      wireless: true,
    },
    {
      img: "image6.jpg",
      title: "BOROFONE BO4",
      price: "7527",
      rate: "4.7",
      wireless: true,
    },
  ];

  if (basketPage == null) {
    let productContainer = document.querySelector('.main-content');
    let productContainerWireless = document.querySelector('.main-content__wireless');

    headphones.forEach((e, i) => {
      const { img, title, price, oldPrice, wireless, rate } = e;

      let contentItem = document.createElement("div");
      contentItem.classList.add('main-content__item');

      const contentHTML = `
        <div class="main-content__img">
          <img src="./assets/images/main/${img}" alt="#">
        </div>

        <div class="main-content__options">
          <div class="main-content__top">
            <p class="main-content__title">${title}</p>
            <div class="main-content__price_container">
              <p class="main-content__price_actual">${price} ₽</p>
              <p class="main-content__price_old">${oldPrice !== undefined ? `${oldPrice} ₽` : ""}</p>
            </div>
          </div>

          <div class="main-content__bottom">
            <div class="main-content__rating">
              <svg>
                <use href="#star"></use>
              </svg>
              <span>${rate}</span>
              </div>
              <button class="buyBtn" data-index="${i}">
                Купить
              </button>
            </div>
          </div>
        `;

      if (wireless === undefined) {
        contentItem.innerHTML = contentHTML;
        productContainer.appendChild(contentItem);
      } else {
        contentItem.innerHTML = contentHTML;
        productContainerWireless.appendChild(contentItem);
      }
    });

    let buyBtns = document.querySelectorAll('.buyBtn');
    for (let i = 0; i < buyBtns.length; i++) {
      const buyBtn = buyBtns[i];
      buyBtn.addEventListener('click', () => {
        buyBtn.classList.add('pulse');

        setTimeout(() => {
          buyBtn.classList.remove('pulse');
        }, 300);
        const product = headphones[buyBtn.dataset.index];

        let productItems = localStorage.getItem('productItems');
        if (productItems) {
          productItems = JSON.parse(productItems);
        } else {
          productItems = [];
        }
        const index = productItems.findIndex((item) => item.title === product.title && item.price === product.price && item.img === product.img && item.rate === product.rate);
        if (index !== -1) {
          productItems[index].quantity++;
        } else {
          productItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('productItems', JSON.stringify(productItems));
        updateBasketItemCount();
      });
    }
  } else if (basketPage !== null) {
    let basketItemsString = localStorage.getItem("productItems"); let basketItems = JSON.parse(basketItemsString);
    function renderBasketItems(basketItems) {
      let basketContainer = document.querySelector(".basket-content__items");
      basketContainer.innerHTML = "";
      basketItems.forEach((item, index) => {
        let { img, title, price, quantity } = item;

        let basketItem = document.createElement("div");
        basketItem.classList.add("basket-content__item");

        let basketItemHTML = `
            <div class="basket-content__options">
              <div class="basket-content__mainBlock">
                <div class="basket-content__img">
                  <img src="./assets/images/main/${img}" alt="#">
                </div>
                <div class="basket-content__text">
                  <p class="basket-content__title">
                    ${title}
                  </p>
                  <p class="basket-content__subtitle">
                    ${price} ₽
                  </p>
                </div>
              </div>
              <button class="basket-content__trashBtn">
                <svg>
                  <use href="#trash"></use>
                </svg>
              </button>
            </div>
      
            <div class="basket-content__control">
              <div class="basket-content__countBtns">
                <button class="decreaseBtn">
                  -
                </button>
                <p class="basket-content__count">${quantity}</p>
                <button class="increaseBtn">
                  +
                </button>
              </div>
      
              <p class="totalPriceCoutn">${price * quantity}</p>
            </div>
          `;

        basketItem.innerHTML = basketItemHTML;

        let increaseBtn = basketItem.querySelector('.increaseBtn');
        let decreaseBtn = basketItem.querySelector('.decreaseBtn');
        let countElement = basketItem.querySelector('.basket-content__count');
        let trashBtn = basketItem.querySelector('.basket-content__trashBtn');

        increaseBtn.addEventListener('click', () => {
          item.quantity++;
          countElement.textContent = item.quantity;
          let totalPriceCountElement = basketItem.querySelector('.totalPriceCoutn');
          totalPriceCountElement.textContent = item.price * item.quantity;
          localStorage.setItem('productItems', JSON.stringify(basketItems));
          updateBasketItemCount();
          updateTotalPrice();

          increaseBtn.classList.add('pulse');
          setTimeout(() => {
            increaseBtn.classList.remove('pulse');
          }, 500);
        });

        decreaseBtn.addEventListener('click', () => {
          if (item.quantity > 1) {
            item.quantity--;
            countElement.textContent = item.quantity;
            let totalPriceCountElement = basketItem.querySelector('.totalPriceCoutn');
            totalPriceCountElement.textContent = item.price * item.quantity;
            localStorage.setItem('productItems', JSON.stringify(basketItems));
            updateBasketItemCount();
            updateTotalPrice();

            decreaseBtn.classList.add('pulse');
            setTimeout(() => {
              decreaseBtn.classList.remove('pulse');
            }, 500);
          }
        });

        trashBtn.addEventListener('click', () => {
          basketItem.classList.add('removing');
          setTimeout(() => {
            basketItems.splice(index, 1);
            basketContainer.removeChild(basketItem);
            localStorage.setItem('productItems', JSON.stringify(basketItems));
            updateBasketItemCount();
            updateTotalPrice();
          }, 300);
        });

        basketContainer.appendChild(basketItem);
      });
    }

    renderBasketItems(basketItems);
  }

  function updateBasketItemCount() {
    let productItems = localStorage.getItem('productItems');
    let count = 0;
    if (productItems) {
      productItems = JSON.parse(productItems);
      count = productItems.reduce((total, item) => total + item.quantity, 0);
    }
    let basketCountElement = document.querySelector('.header-content__basket span');
    basketCountElement.textContent = count > 0 ? (count > 9 ? '9+' : count.toString()) : '0';
  }

  window.addEventListener('DOMContentLoaded', updateBasketItemCount);

  function updateTotalPrice() {
    let basketItemsString = localStorage.getItem("productItems");
    let basketItems = JSON.parse(basketItemsString);
    let totalPrice = 0;
    if (basketItems) {
      totalPrice = basketItems.reduce(
        (total, item) => total + item.price * item.quantity,0
      );
    }

    if (basketPage !== null) {
      let totalPriceElement = document.querySelector('.basket-content__totalPrice');
      totalPriceElement.textContent = totalPrice;
    }
  }

  window.addEventListener('DOMContentLoaded', updateTotalPrice);

})
