/* eslint-disable import/prefer-default-export */
const copyToClipboard = (text) => {
  const Input = document.createElement('input');
  Input.setAttribute('type', 'text');
  Input.value = text;
  Input.style.position = 'absolute';
  Input.style.top = 0;
  Input.style.marginTop = '-100px';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(Input);
  Input.select();
  Input.setSelectionRange(0, 99999);
  document.execCommand('copy');
  Input.remove();
};
const debounce = (func, wait, immediate) => {
  let timeout;
  // eslint-disable-next-line func-names
  return function () {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
export {
  copyToClipboard,
  debounce,
};
