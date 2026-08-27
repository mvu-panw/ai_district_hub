// Team directory data. To add/remove someone, edit the relevant group
// below. `file` is optional — omit it (or leave it wrong) and the card
// falls back to an initials avatar automatically.
const TEAM_GROUPS = [
  {
    title: "Management",
    people: [
      {
        name: "Delfina Medina",
        role: "District Sales Manager",
        file: "delfina_medina.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=5549524A746F9833BE202B5D95C9136D",
      },
      {
        name: "Walt Rhodes",
        role: "Solutions Consultant Manager",
        file: "walt_rhodes.jpeg",
        profile: "https://app.glean.com/directory/people/profile?person=0D62AAC0938FB3CEF2B1878F70AB0740",
      },
    ],
  },
  {
    title: "Strategic Account Managers",
    people: [
      {
        name: "Aaron Albaum",
        file: "aaron_coreweave.png",
        profile: "https://app.glean.com/directory/people/profile?person=ECE42DFF7E1BEF6600067E7907EB8EF1",
      },
      {
        name: "Alicia Falcocchio",
        file: "alicia_falcocchio.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=7F89612999475406BACEBB8DA2D5772B",
      },
      {
        name: "Carly Tansil",
        file: "carly.png",
        profile: "https://app.glean.com/directory/people/profile?person=48EEDAAEFE78B70EEC113CCD827E97FA",
      },
      {
        name: "Devon Cusack",
        file: "devon.png",
        profile: "https://app.glean.com/directory/people/profile?person=4C6E0034B4E7E0BC199D37CF96F39B57",
      },
      {
        name: "Justin Kasser",
        file: "justin_kasser.png",
        profile: "https://app.glean.com/directory/people/profile?person=E0DE772E543D6D0356F623A74D0D9D54",
      },
      {
        name: "Neiland Concannon",
        file: "neiland_concannon.jpeg",
        profile: "https://app.glean.com/directory/people/profile?person=222D5CC9C631DFCA648470FBBE46E710",
      },
      {
        name: "Rich Hoban",
        file: "rich_hoban.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=AA804D660D77910FBDA6546074D6CD57",
      },
      {
        name: "Vincent Leoni",
        file: "vincent_leoni.png",
        profile: "https://app.glean.com/directory/people/profile?person=1C859AE31132247432BF8B919D33C512",
      },
    ],
  },
  {
    title: "Solutions Consultants",
    people: [
      {
        name: "Abigail Fink",
        file: "abigail_fink.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=945ADF9A438C9C014E557515B58D2B70",
      },
      {
        name: "Alex Laulhe",
        file: "alex_lauhle.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=397EC0FECA6924DF81B74825DA6A8591",
      },
      {
        name: "Jitesh Mhatre",
        file: "jitesh.png",
        profile: "https://app.glean.com/directory/people/profile?person=83070F7EF9C7ACFBEF7321022360C623",
      },
      {
        name: "Mike Vu",
        file: "mike_vu.png",
        profile: "https://app.glean.com/directory/people/profile?person=D4317794312E5516AB93C216D4E9D7F8",
      },
      {
        name: "Nathaniel Buck",
        file: "nathaniel_buck.png",
        profile: "https://app.glean.com/directory/people/profile?person=7E4930DDB1066D35E1925CE584221836",
      },
      {
        name: "Shweta Kondvilkar",
        file: "shweta.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=6BF83141B2732690D15C8C367F95A608",
      },
      {
        name: "Taylor Togami",
        file: "taylor_togami.png",
        profile: "https://app.glean.com/directory/people/profile?person=ED2DB2C302E045DED93F1CCA83A872FB",
      },
      {
        name: "Tehreem Tungekar",
        file: "Tehreem_Tungekar.jpg",
        profile: "https://app.glean.com/directory/people/profile?person=61B6AB4DDFB34B2D6DE0BED2A7A1D9AB",
      },
    ],
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildAvatarFallback(name) {
  const fallback = document.createElement("div");
  fallback.className = "avatar-fallback";
  fallback.textContent = initials(name);
  return fallback;
}

function buildCard(person) {
  const card = document.createElement("a");
  card.className = "team-card";
  card.href = person.profile;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  const avatar = document.createElement("div");
  avatar.className = "avatar";

  if (person.file) {
    const img = document.createElement("img");
    img.src = `assets/images/people/${person.file}`;
    img.alt = person.name;
    img.loading = "lazy";
    img.onerror = () => {
      img.replaceWith(buildAvatarFallback(person.name));
    };
    avatar.appendChild(img);
  } else {
    avatar.appendChild(buildAvatarFallback(person.name));
  }

  const name = document.createElement("div");
  name.className = "name";
  name.textContent = person.name;

  card.appendChild(avatar);
  card.appendChild(name);

  if (person.role) {
    const role = document.createElement("div");
    role.className = "role";
    role.textContent = person.role;
    card.appendChild(role);
  }

  return card;
}

function renderTeam() {
  const container = document.getElementById("team-directory");
  if (!container) return;

  TEAM_GROUPS.forEach((group) => {
    const section = document.createElement("div");
    section.className = "team-group";

    const heading = document.createElement("h3");
    heading.className = "team-group-title";
    heading.textContent = group.title;

    const grid = document.createElement("div");
    grid.className = "team-grid";

    group.people.forEach((person) => {
      grid.appendChild(buildCard(person));
    });

    section.appendChild(heading);
    section.appendChild(grid);
    container.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", renderTeam);
