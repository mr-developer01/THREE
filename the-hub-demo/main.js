const vedioCard = document.querySelectorAll(".vedio-card");
const vedioTitle = document.querySelector(".video-title");
const titleDescription = document.querySelector(".title-description");
const mainIframe = document.querySelector(".main-iframe");

vedioCard.forEach((vedio) => {
  vedio.addEventListener("click", () => {
    const iframe = vedio.querySelector("iframe");
    if (iframe) {
      const newSrc = iframe.getAttribute("src");
      mainIframe.setAttribute("src", newSrc);

      const title = vedio.querySelector("h3").textContent;
      vedioTitle.textContent = title;
      const description = vedio.querySelector("p").textContent;
      titleDescription.textContent = description;
      vedio.classList.add("highlight");
      // Remove highlight class from all other videos
      vedioCard.forEach((otherVedio) => {
        if (otherVedio !== vedio) {
          otherVedio.classList.remove("highlight");
        }
      });
    }
  });
  console.log(vedio);
});
