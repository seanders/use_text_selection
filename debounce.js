export default function(fn, debounceTime) {
  // debounced function
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), debounceTime);
  };
};
