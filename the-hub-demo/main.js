// import "./style.css"
import { renderCalendar } from "./calander";
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
});

renderCalendar();

const prevNews = document.querySelector("#prev-news");
const nextNews = document.querySelector("#next-news");
const newsBtnContainer = document.querySelector("#news-btn-container");

let trans = 0;

prevNews.addEventListener("click", () => {
  trans = trans - 7; // Move left by 8px
  trans === 0 && prevNews.classList.add("hidden")
  newsBtnContainer.style.transform = `translateX(-${trans}vw)`; // Apply the negative transformation
});

nextNews.addEventListener("click", () => {
  trans = trans + 7; // Move right by 8px
  console.log(trans);
  prevNews.classList.remove("hidden")
  newsBtnContainer.style.transform = `translateX(-${trans}vw)`; // Apply the transformation dynamically
});



const buttons = document.querySelectorAll("#news-btn-container button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active classes from all buttons
    buttons.forEach((btn) => {
      btn.classList.remove("bg-slate-700", "text-white", "font-semibold");
      btn.classList.add("bg-slate-200"); // Revert to the default style for non-active buttons
    });

    // Add active classes to the clicked button
    button.classList.remove("bg-slate-200"); // Remove default background
    button.classList.add("bg-slate-700", "text-white", "font-semibold"); // Add active classes
  });
});


const scrollContainer = document.getElementById('scroll-container');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            
            const scrollAmount = scrollContainer.offsetWidth * index;
            scrollContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
