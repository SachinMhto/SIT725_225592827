$(document).ready(function () {
  $.get("/api/recipes", function (response) {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
});

function addCards(items) {
  items.forEach((item) => {
    let itemToAppend = `
      <div class="col s12 m6 l4">
        <div class="card medium">
         <span class="card-title black-text">${item.title}</span>
          <div class="card-image">
          
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <p><strong>Ingredients:</strong> ${item.ingredients}</p>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(itemToAppend);
  });
}
