export default function decorate(block) {
  const children = [...block.children];
  let index = 0;

  function formatHTML() {
    children.forEach((el) => {
      const secondCol = el.querySelector('div:nth-child(2)');
      const backgroundHexCode = secondCol.textContent;

      secondCol.remove();
      el.style.backgroundColor = backgroundHexCode;
    });
  }

  function showNextItem() {
    children.forEach(item => item.style.display = "none");
    children[index].style.display = "block";
    index = (index + 1) % children.length;
  }

  // Initialize
  formatHTML();
  showNextItem();
  setInterval(showNextItem, 3000);
}