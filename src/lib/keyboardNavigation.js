export function handleArrowNavigation(e, items, activeElement) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();

    let currentIndex = Array.from(items).indexOf(activeElement);

    if (currentIndex === -1) {
      currentIndex = 0;
    } else {
      currentIndex += e.key === "ArrowUp" ? -1 : 1;

      if (currentIndex < 0) {
        currentIndex = items.length - 1;
      } else if (currentIndex >= items.length) {
        currentIndex = 0;
      }
    }

    items[currentIndex].focus();
  }
}
