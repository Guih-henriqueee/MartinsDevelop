import ScrollReveal from "scrollreveal";

export const scrollHeader = () => {
  ScrollReveal().reveal(".reveal-1", {
    duration: 800,
    distance: "40px",
    origin: "left",
    easing: "ease-in-out",
    delay: 100,
    reset: false,
  });

  ScrollReveal().reveal(".reveal-2", {
    duration: 800,
    distance: "40px",
    origin: "left",
    easing: "ease-in-out",
    delay: 200,
    reset: false,
  });

  ScrollReveal().reveal(".reveal-3", {
    duration: 800,
    distance: "40px",
    origin: "bottom",
    easing: "ease-in-out",
    delay: 300,
    reset: false,
  });

  ScrollReveal().reveal(".reveal-4", {
    duration: 800,
    distance: "40px",
    origin: "bottom",
    easing: "ease-in-out",
    delay: 400,
    reset: false,
  });

  ScrollReveal().reveal(".reveal-5", {
    duration: 800,
    distance: "40px",
    origin: "bottom",
    easing: "ease-in-out",
    delay: 500,
    reset: false,
  });

  ScrollReveal().reveal(".reveal-img", {
    duration: 1000,
    distance: "60px",
    origin: "right",
    easing: "ease-in-out",
    delay: 600,
    reset: false,
  });
};
