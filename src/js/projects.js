import { observer } from "./app.js";
const projects = [
  {
    title: "Rock Paper Game",
    img: "./assets/RPSG.png",
    description: `Petit jeu de shifumi contre l'ordinateur.<br/>Défiez votre chance. Projet autodidacte venant des <a href="https://www.100jsprojects.com/" class="underline font-bold">100JS</a>.`,
    demo: "https://feryluc.github.io/Rock-Paper-Scissors-Vue/",
    repo: "https://github.com/FeryLuc/Rock-Paper-Scissors-Vue",
  },
  {
    title: "Contact List",
    img: "./assets/CL.png",
    description: `Examen de première année en script client.
    Une liste de contacts basique.`,
    demo: "https://feryluc.github.io/CONTACTLIST-VUE_TW/",
    repo: "https://github.com/FeryLuc/CONTACTLIST-VUE_TW",
  },
  {
    title: "Todo List",
    img: "./assets/Todo.png",
    description: `Une Todo App basée sur les modèles de TodoMVC. Petit projet m’ayant servi à pratiquer et à consolider les connaissances acquises lors de mon premier examen de script client.`,
    demo: "https://feryluc.github.io/TODOLIST_VUE_CLI_MOCKAPI/",
    repo: "https://github.com/FeryLuc/TODOLIST_VUE_CLI_MOCKAPI",
  },
  {
    title: "Magasin en ligne",
    img: "./assets/Shop.png",
    description: `Simulation d'un magasin en ligne, dans le cadre d'un examen de seconde année pour le cours de framework client. Travailler avec 2 sources de vérité, les produits d'un catalogue et les produits du panier du magasin.
    MockAPI + LocalStorage.`,
    demo: "https://eval-magasin-en-ligne.netlify.app/",
    repo: "https://github.com/FeryLuc/EVAL-MAGASIN_EN-LIGNE-LUC-FERY",
  },
  {
    title: "Alex Parker Blog",
    img: "./assets/APB.png",
    description: `Examen de première année en script server.
    Un petit blog simulé en MVC.`,
    demo: "/",
    repo: "https://github.com/FeryLuc/EVAL-ALEX-PARKER-LUC-FERY",
  },
  {
    title: "Read It Blog",
    img: "./assets/RI.png",
    description: `Projet MVC. Petit projet où tout n’est pas encore fonctionnel. J’y mets l’accent sur les redirections (public/backoffice), le login/logout, le cryptage des mots de passe, le bouncer pour sécuriser l’accès au backoffice, ainsi que la gestion des sessions en PHP.`,
    demo: "/",
    repo: "https://github.com/FeryLuc/READ_IT_25_26",
  },
  {
    title: "GitHub",
    img: "./assets/GithubProfil.png",
    description: `Voici ma page GitHub. Un peu chaotique, elle recense une multitude de projets en tout genre, allant d’une simple maquette à des projets front, jusqu’à des projets back.`,
    demo: "/",
    repo: "https://github.com/FeryLuc?tab=repositories",
  },
];
// Create cards
const projectsContainer = document.getElementById("projectsContainer");
document.getElementById("nextProject").onclick = () => {
  projectsContainer.scrollBy({
    left: projectsContainer.clientWidth,
    behavior: "smooth",
  });
};

document.getElementById("prevProject").onclick = () => {
  projectsContainer.scrollBy({
    left: -projectsContainer.clientWidth,
    behavior: "smooth",
  });
};

projectsContainer.innerHTML = projects
  .map(
    (project, idx) => `
<div class="container-frame group relative rounded-lg scale-95 hover:scale-100 transition-transform duration-300 cursor-pointer snap-center min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[22%]">

  <article class="card group h-full bg-gray-600 flex flex-col gap-6 rounded-lg overflow-hidden">
    
    <div class="card-inner transition-all duration-300 group-hover:blur-sm">
      <img src="${project.img}" class="w-full object-cover" />

      <main class="flex flex-col gap-2 p-6">
        <h3 class="font-bold text-2xl accent">${project.title}</h3>
        <p class="line-clamp-5 muted">${project.description}</p>
      </main>
    </div>

  </article>

  <a target="_blank" rel="noopener noreferrer" href="${project.demo}" class="${idx + 1 === projects.length ? "hidden" : ""} demo flex justify-center items-center absolute top-0 left-0 h-1/2 w-0 rounded-tl-lg rounded-tr-lg text-2xl opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100  z-10">
   <span class="border border-orange-100 rounded-xl p-2 hover:border-orange-300 transition-all duration-800 hover:scale-120">DEMO</span>
  </a>

  <a target="_blank" rel="noopener noreferrer" href="${project.repo}" class="code flex justify-center items-center absolute bottom-0 right-0 ${idx + 1 === projects.length ? "h-full" : "h-1/2"} w-0 rounded-bl-lg rounded-br-lg opacity-0 group-hover:w-full transition-all duration-1000 z-10 group-hover:opacity-100">
    <i class="fa-brands fa-github text-6xl  hover:text-orange-200 transition-all duration-800 hover:scale-120"></i>
  </a>

</div>
`,
  )
  .join("");

const projectArticles = document.querySelectorAll(
  "#projectsContainer div.fade-section",
);
projectArticles.forEach((article) => observer.observe(article));

// Tap-to-reveal sur mobile (pas de :hover sur touch)
if (window.matchMedia("(hover: none)").matches) {
  projectsContainer.addEventListener("click", (e) => {
    const frame = e.target.closest(".container-frame");
    if (!frame) return;

    // Lien de description (hors overlays) → laisser naviguer
    if (e.target.closest("a:not(.demo):not(.code)")) return;

    // Overlay sur carte déjà active → laisser naviguer
    if (frame.classList.contains("is-active") && e.target.closest(".demo, .code")) return;

    const isActive = frame.classList.contains("is-active");
    document.querySelectorAll(".container-frame.is-active").forEach((f) => f.classList.remove("is-active"));
    if (!isActive) frame.classList.add("is-active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".container-frame")) {
      document.querySelectorAll(".container-frame.is-active").forEach((f) => f.classList.remove("is-active"));
    }
  });
}
