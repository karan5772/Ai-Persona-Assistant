// persona info to html
document.addEventListener("DOMContentLoaded", function () {
  const buddyCards = document.querySelectorAll(".buddy-card");
  const personas = [
    {
      name: "Hitesh Choudhary",
      img: "https://github.com/hiteshchoudhary.png",
    },
    {
      name: "Piyush Garg",
      img: "https://github.com/piyushgarg-dev.png",
    },
  ];
  buddyCards.forEach((card, idx) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const persona = personas[idx];
      const url = `chat.html?name=${encodeURIComponent(
        persona.name
      )}&img=${encodeURIComponent(persona.img)}`;
      window.location.href = url;
    });
  });
});
