//Mobile nav
//Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const mobileNav = document.getElementById("mobile-nav");
mobileToggle.addEventListener("click", () =>
  mobileNav.classList.toggle("hidden")
);
//Fermer la nav au clique d'un lien
document.querySelectorAll("#mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
  });
});

//Formulaire CTA
//Activation
const formInputs = document.querySelectorAll("input, textarea");
const submitBtn = document.getElementById("submit-btn");
function checkFormState() {
  const isAllFilled = Array.from(formInputs).every(
    (f) => f.value.trim() !== ""
  );
  submitBtn.disabled = !isAllFilled;

  if (isAllFilled) {
    submitBtn.classList.add("active");
  } else {
    submitBtn.classList.remove("active");
  }
}
formInputs.forEach((i) => i.addEventListener("input", checkFormState));
//Reset inputs après l'action FormSpree
submitBtn.addEventListener("click", () => {
  setTimeout(() => {
    formInputs.forEach((i) => (i.value = ""));
  }, 200);
});

//Scroll
//Intersection Observer for fade-in at ~30% visibility
const sections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.3)
        entry.target.classList.add("fade-visible");
    });
  },
  { threshold: [0, 0.3, 1] }
);
sections.forEach((s) => observer.observe(s));
