
(() => {
  const search = document.getElementById('toolSearch');
  if (search) {
    const cards = [...document.querySelectorAll('[data-tool-card]')];
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach(card => {
        const hay = (card.dataset.search || '') + ' ' + card.innerText;
        card.style.display = !q || hay.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
})();
