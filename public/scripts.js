const input = document.getElementById("url-input");
const subBtn = document.getElementById("sub-btn");
const output = document.getElementById("output");

const getShortUrlCode = async (url) => {
  return await fetch(window.location.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ longUrl: url }),
  })
    .then((res) => res.json())
    .then((res) => res.urlCode)
    .catch((e) => console.log(e));
};
const onSubmit = async (e) => {
  e.preventDefault();
  subBtn.disabled = true;
  subBtn.removeEventListener("click", onSubmit);

  await getShortUrlCode(input.value)
    .then((urlCode) => {
      const shortUrl = `${window.location.href}${urlCode}`;

      if (urlCode) {
        output.innerHTML = `<h2>Your shorted url</h2><a class="output__url" href="${shortUrl}">${shortUrl}</a>`;
      } else {
        output.innerHTML = `<h2 class="error">Error</h2>`;
      }

      subBtn.disabled = false;
      subBtn.addEventListener("click", onSubmit);
    })
    .catch((e) => (output.innerHTML = `<h2 class="error">Error</h2>`));
};

subBtn.addEventListener("click", onSubmit);
