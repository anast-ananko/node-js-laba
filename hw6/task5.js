function onScroll(event) {
  // Handle scroll event
  console.log("Scroll event:", event);
}

function throttle(fn, interval) {
  let timerId;

  return function(...args) {
    if (!timerId) {
      fn.apply(this, args);
      timerId = setTimeout(() => {
        timerId = undefined;
      }, interval)
    }
  }
}

const throttledScrollHandler = throttle(onScroll, 5000);

window.addEventListener("scroll", throttledScrollHandler);
