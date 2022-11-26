const calcElement = document.querySelector('[data-js="calc"]') as HTMLInputElement;
const resultElement = document.querySelector('[data-js="result"]') as HTMLElement;

const round = (value: number) => {
  return Math.round(value * 1000) / 1000;
};

const evaluate = (expression: string): number | null => {
  try {
    if (expression.match(/[a-zA-Z&#$<>{}]/g)) throw new Error();
    return new Function(`return ${expression}`)();
  } catch (e) {
    return null;
  };
};

const isNumber = (value: unknown): value is number => {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  } else {
    return false;
  };
};

const calculate = () => {
  localStorage.setItem('calc', calcElement.value);

  const lines = calcElement.value.split(/\r?\n/).map(evaluate);

  resultElement.innerHTML = `<div>${lines
    .map((line) => `<div>${isNumber(line) ? round(line) : '---'}</div>`)
    .join('')}</div>`;

  const total = lines.filter(isNumber).reduce((acc, line) => acc + line, 0);
  
  resultElement.innerHTML += `<div id="total">Total: ${round(total)}</div>`;

  const totalElement = document.querySelector('#total') as HTMLElement;
  totalElement.addEventListener('click', () => {
    navigator.clipboard.writeText(String(total));
  });
};

calcElement.value = localStorage.getItem('calc') || '';
calcElement.addEventListener('input', calculate);
calculate();