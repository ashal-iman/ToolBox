function searchLinks() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const allSections = document.querySelectorAll("h2, .grid");

  if (query.trim() === "") {
    allSections.forEach(el => el.style.display = "");
    return;
  }

  allSections.forEach(el => el.style.display = "none");

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h3")?.innerText.toLowerCase() || "";
    const description = card.querySelector("p")?.innerText.toLowerCase() || "";

    if (title.includes(query) || description.includes(query)) {
      card.style.display = "";
      card.parentElement.style.display = ""; 
      const heading = card.parentElement.previousElementSibling;
      if (heading && heading.tagName === "H2") heading.style.display = ""; 
    } else {
      card.style.display = "none";
    }
  });
  document.querySelectorAll('input[name="filter"]').forEach(input => {
  input.addEventListener('change', applyFilters);
});

function applyFilters() {
  const selectedFilters = Array.from(document.querySelectorAll('input[name="filter"]:checked'))
                                .map(input => input.value);

  document.querySelectorAll('.card').forEach(card => {
    const tags = card.getAttribute('data-tags') || '';
    const matches = selectedFilters.every(filter => tags.includes(filter));
    card.style.display = matches || selectedFilters.length === 0 ? 'block' : 'none';
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  const cards = document.querySelectorAll('.card');

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterCards);
  });

  function filterCards() {
    const activeFilters = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());

    cards.forEach(card => {
      const tags = card.getAttribute('data-tags').toLowerCase().split(" ");
      const matches = activeFilters.every(filter => tags.includes(filter));
      card.style.display = (activeFilters.length === 0 || matches) ? "block" : "none";
    });
  }
});

}
