const form = document.querySelector("form");
form.setAttribute("novalidate", true);
form.elements.name.addEventListener("focus", (e = {}));
form.addEventListener("submit", e => {
  e.preventDefault();

  post();
});

function get() {
  fetch("https://frontendautumn2019-883b.restdb.io/rest/superheroes", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887444fd86cb75861e25ef",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(addNewHero);
    });
}
get();

function addNewHero(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("article.hero").dataset.heroid = hero._id;
  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("ul").textContent = hero.Powers;
  copy.querySelector(".delete").addEventListener("click", () => {
    deleteIt(hero._id);
  });
  document.querySelector("#app").prepend(copy);
}

function post() {
  let powers = "";
  form.elements.power.forEach(el => {
    if (el.checked) {
      powers += el.value + ", ";
    }
  });
  const data = {
    name: form.elements.name.value,
    realname: form.elements.realname.value,
    Powers: powers
  };

  const postData = JSON.stringify(data);
  fetch("https://frontendautumn2019-883b.restdb.io/rest/superheroes", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887444fd86cb75861e25ef",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      addNewHero(data);
    });
}

function deleteIt(id) {
  fetch("https://frontendautumn2019-883b.restdb.io/rest/superheroes/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887444fd86cb75861e25ef",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => {
      document.querySelector(`.hero[data-heroid="${id}"]`).remove();
    });
}

document.querySelector(".add").addEventListener("click", post);
