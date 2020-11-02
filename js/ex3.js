let i = 1;

document.getElementById("add-new-country").onclick = function () {
  let template = `
        <p>Country ${i}:</p>
        <label>name: </label>
        <input name="countries[${i}][name]" />

        <label>year: </label>
        <input name="countries[${i}][year]" type="number" />`;

  let container = document.getElementById("country_container");
  let div = document.createElement("div");
  div.innerHTML = template;
  container.appendChild(div);

  i++;
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const reqBody = {
    name: "",
    countries: [],
  };

  for (const key of data.keys()) {
    if (key.indexOf("countries") > -1) {
      const index = Number(key.match("\\d+")[0]);
      const prop = key.indexOf("name") > -1;
      if (reqBody.countries[index]) {
        reqBody.countries[index][prop ? "name" : "year"] = data.get(key);
      } else {
        let obj = {};
        obj[prop ? "name" : "year"] = data.get(key);
        reqBody.countries.push(obj);
      }
    } else {
      reqBody[key] = data.get(key);
    }
  }

  fetch("https://thejsway-server.herokuapp.com/api/countries", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  })
    .then((rsp) => rsp.text())
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});
