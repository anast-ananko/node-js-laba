function debouncedSearch(query) {
  // Perform search operation with the query
  console.log("Searching for:", query);
}

function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

const inputElement = document.getElementById("search-input");
inputElement.addEventListener("input", (event) => {
  debouncedSearchHandler(event.target.value);
});
