const GITHUB_USERNAME = "micminem-glitchs"; // CHANGE THIS

async function loadRepos() {
  const container = document.getElementById("repos");

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );

    const repos = await res.json();

    if (!Array.isArray(repos)) {
      throw new Error("Failed to load");
    }

    container.innerHTML = repos
      .filter((repo) => !repo.fork)
      .map(
        (repo) => `
        <div class="card">
          <h3>${repo.name}</h3>

          <p>${repo.description || "No description provided"}</p>

          <div class="meta">
            ${
              repo.language
                ? `<span>● ${repo.language}</span>`
                : ""
            }

            <span>★ ${repo.stargazers_count}</span>
          </div>

          <div style="margin-top: 12px;">
            <a href="${repo.html_url}" target="_blank">
              View Code
            </a>

            ${
              repo.homepage
                ? ` | <a href="${repo.homepage}" target="_blank">Live Demo</a>`
                : ""
            }
          </div>
        </div>
      `
      )
      .join("");

    document.getElementById(
      "github-link"
    ).href = `https://github.com/${GITHUB_USERNAME}`;

  } catch (err) {
    container.innerHTML =
      "<p class='loading'>Couldn't load repos. Check your username.</p>";
  }
}

loadRepos();