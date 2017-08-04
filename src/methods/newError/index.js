export default (msg) => {
  setTimeout(() => {
    throw new Error(`[react-waterfall-calendar] ${msg}`);
  }, 0);
};
