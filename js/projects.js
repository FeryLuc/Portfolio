const projects = [
  {
    title: 'Rock Paper Game',
    img: './assets/RPSG.png',
    description: `Petit jeu de shifumi contre l'ordinateur.<br/>Défiez votre chance. Projet autodidacte venant des <a href="https://www.100jsprojects.com/" class="underline font-bold">100JS</a>.`,
    tags: [
      {
        tech: 'Javascript',
        demo: 'https://feryluc.github.io/Rock-Paper-Scissors/',
        code: 'https://github.com/FeryLuc/Rock-Paper-Scissors',
      },
      {
        tech: 'Vue.js',
        demo: 'https://feryluc.github.io/Rock-Paper-Scissors-Vue/',
        code: 'https://github.com/FeryLuc/Rock-Paper-Scissors-Vue',
      },
      {
        tech: 'React.js',
        demo: '',
        code: '',
      },
    ],
  },
  {
    title: 'Contact List',
    img: './assets/CL.png',
    description: `Examen de première année en script client.
    Une liste de contacts basique.`,
    tags: [
      {
        tech: 'Javascript',
        demo: 'https://feryluc.github.io/EVAL-CONTACTLIST-LUC-FERY/',
        code: 'https://github.com/FeryLuc/EVAL-CONTACTLIST-LUC-FERY',
      },
      {
        tech: 'Vue.js',
        demo: 'https://feryluc.github.io/CONTACTLIST-VUE_TW/',
        code: 'https://github.com/FeryLuc/CONTACTLIST-VUE_TW',
      },
      {
        tech: 'React.js',
        demo: '',
        code: '',
      },
    ],
  },
  {
    title: 'Todo List',
    img: './assets/Todo.png',
    description: `Une Todo App basée sur les modèles de TodoMVC. Petit projet m’ayant servi à pratiquer et à consolider les connaissances acquises lors de mon premier examen de script client.`,
    tags: [
      {
        tech: 'Javascript',
        demo: 'https://feryluc.github.io/TODOLIST_MODERN_VANILLA_VITE_JS/',
        code: 'https://github.com/FeryLuc/TODOLIST_MODERN_VANILLA_VITE_JS',
      },
      {
        tech: 'Vue.js',
        demo: 'https://feryluc.github.io/TODOLIST_VUE_CLI_MOCKAPI/',
        code: 'https://github.com/FeryLuc/TODOLIST_VUE_CLI_MOCKAPI',
      },
      {
        tech: 'React.js',
        demo: '',
        code: '',
      },
    ],
  },
  {
    title: 'Alex Parker Blog',
    img: './assets/APB.png',
    description: `Examen de première année en script server.
    Un petit blog simulé en MVC.`,
    tags: [
      {
        tech: 'PHP',
        demo: '',
        code: 'https://github.com/FeryLuc/EVAL-ALEX-PARKER-LUC-FERY',
      },
      {
        tech: 'Laravel',
        demo: '',
        code: '',
      },
    ],
  },
  {
    title: 'Read It Blog',
    img: './assets/RI.png',
    description: `Projet MVC. Petit projet où tout n’est pas encore fonctionnel. J’y mets l’accent sur les redirections (public/backoffice), le login/logout, le cryptage des mots de passe, le bouncer pour sécuriser l’accès au backoffice, ainsi que la gestion des sessions en PHP.`,
    tags: [
      {
        tech: 'PHP',
        demo: '',
        code: 'https://github.com/FeryLuc/READ_IT_25_26',
      },
      {
        tech: 'Laravel',
        demo: '',
        code: '',
      },
    ],
  },
  {
    title: 'GitHub',
    img: './assets/GithubProfil.png',
    description: `Voici ma page GitHub. Un peu chaotique, elle recense une multitude de projets en tout genre, allant d’une simple maquette à des projets front, jusqu’à des projets back.`,
    tags: [
      {
        tech: 'Aller voir',
        demo: '',
        code: 'https://github.com/FeryLuc?tab=repositories',
      },
    ],
  },
];
// Create cards
const container = document.querySelector('#projectsContainer');

container.innerHTML = projects
  .map(
    (project) => `
  <article class="p-6 rounded-xl card bdr myShadowCard flex flex-col justify-between">
    <img class="rounded" src="${project.img}" alt="${project.title}" />

    <h4 class="text-xl font-semibold accent my-2">${project.title}</h4>

    <p class="muted my-2">${project.description}</p>

    <div class="tagsContainer flex gap-4 py-2 text-center">
      ${project.tags
        .map(
          (tag) => `
        <div class="bdr accent rounded-lg p-2 surface transition-all duration-300 ease-in-out w-1/3">
          ${tag.tech}
          <div class="invisible">
            ${
              tag.demo
                ? `<a href="${tag.demo}" target="_blank" rel="noopener noreferrer">DEMO</a>`
                : ''
            }
            ${tag.demo && tag.code ? ' || ' : ''}
            ${
              tag.code
                ? `<a href="${tag.code}" target="_blank" rel="noopener noreferrer">CODE</a>`
                : ''
            }
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  </article>
`
  )
  .join('');

//Tags des projets.
const allTagContainers = document.querySelectorAll('.tagsContainer');
allTagContainers.forEach((tagsContainer) => {
  const tags = tagsContainer.querySelectorAll(':scope > div');
  let openedTag = null;

  tags.forEach((tag) => {
    const content = tag.querySelector('div');
    const links = content.querySelectorAll('a');
    const hasValidLink = Array.from(links).some(
      (a) => a.getAttribute('href')?.trim() !== ''
    );

    const label = tag.childNodes[0].textContent.trim();
    tag.dataset.label = label;

    if (!hasValidLink) {
      tag.classList.add('cursor-not-allowed', 'opacity-50');
      tag.dataset.disabled = 'true';
    } else {
      tag.classList.add('cursor-pointer');
    }

    tag.addEventListener('click', (e) => {
      if (tag.dataset.disabled === 'true') {
        e.preventDefault();
        return;
      }

      if (openedTag === tag) {
        closeTag(tag);
        openedTag = null;
        return;
      }

      if (openedTag) {
        closeTag(openedTag);
      }

      openTag(tag);
      openedTag = tag;
    });
  });

  function openTag(tag) {
    tag.querySelector('div').classList.remove('invisible');
    tag.childNodes[0].textContent = '';
    tag.classList.add('w-full');
  }

  function closeTag(tag) {
    tag.querySelector('div').classList.add('invisible');
    tag.childNodes[0].textContent = tag.dataset.label;
    tag.classList.remove('w-full');
  }
});
