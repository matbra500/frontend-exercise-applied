(async () => {
  const getData = async () => {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    return data;
  };

  let data = await getData();

  function preparePagination(array, itemsPerArray) {
    let separatedArrays = [];
    let currentArray = [];

    for (let i = 0; i < array.length; i++) {
      currentArray.push(array[i]);

      if (currentArray.length === itemsPerArray) {
        separatedArrays.push(currentArray);
        currentArray = [];
      }
    }

    if (currentArray.length > 0) {
      separatedArrays.push(currentArray);
    }

    return separatedArrays;
  }

  const pagesArrays = preparePagination(data, 8);

  function renderCards(page) {
    const cardsContainer = document.getElementById("cards-container");
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
    pagesArrays[page].map((objectData) => {
      cardsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card">
        <div class="card-content">
          <div class="card-front">
            <img src="${objectData.picture}" class="card-front-image" />
            <h2 class="card-front-title">${objectData.name}</h2>
            <h3 class="card-front-subtitle">${objectData.company}</h3>
          </div>
          <div class="card-back">
            <h4 class="card-back-title">E-mail</h4>
            <span class="card-back-subtitle">${objectData.email}</span>
            <h4 class="card-back-title">Phone</h4>
            <span class="card-back-subtitle">${objectData.phone}</span>
            <h4 class="card-back-title">Address</h4>
            <span class="card-back-subtitle">${objectData.address}</span>
          </div>
        </div>
      </div>
        `
      );
    });
  }

  function createPaginationControls() {
    const paginationContainer = document.getElementById("pagination-container");
    let selectedPageIndex = 0;
    pagesArrays.map((_, index) => {
      const paginationBlock = document.createElement("div");
      paginationBlock.className = "pagination-block";
      paginationBlock.innerHTML = `<span class="pagination-number">${
        index + 1
      }</span>`;
      paginationBlock.addEventListener("click", () => {
        paginationContainer.children[selectedPageIndex].classList.remove(
          "selected"
        );
        paginationBlock.classList.add("selected");
        selectedPageIndex = index;
        renderCards(index);
      });
      if (index === selectedPageIndex) {
        paginationBlock.classList.add("selected");
      }
      paginationContainer.appendChild(paginationBlock);
    });
  }

  renderCards(0);
  createPaginationControls();
})();
