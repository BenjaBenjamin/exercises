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
  copy.querySelector("h1").textContent = hero.name;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("ul").textContent = hero.Powers;
  document.querySelector("#app").appendChild(copy);
}

function post() {
  const data = {
    name: "Batman",
    realname: "Bruce Wayne",
    age: 69,
    Powers: "smart/fast"
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

document.querySelector("button").addEventListener("click", post);
