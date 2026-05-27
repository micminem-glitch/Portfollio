const GITHUB_USERNAME = "micminem-glitch";

async function loadRepos() {

  const container = document.getElementById("repos");

  try {

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    const repos = await response.json();

    const filteredRepos = repos.filter(
      repo => !repo.fork
    );

    container.innerHTML = filteredRepos
      .map(repo => `
        <div class="project-card">

          <h3>${repo.name}</h3>

          <p>
            ${repo.description || "No description available"}
          </p>

          <div class="project-meta">
            <span>💻 ${repo.language || "Code"}</span>
            <span>⭐ ${repo.stargazers_count}</span>
          </div>

          <div class="project-links">
            <a href="${repo.html_url}" target="_blank">
              View Repository →
            </a>
          </div>

        </div>
      `)
      .join("");

  } catch (error) {

    container.innerHTML = `
      <p class="loading">
        Failed to load repositories.
      </p>
    `;
  }
}

loadRepos();