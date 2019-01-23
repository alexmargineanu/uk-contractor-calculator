
export function financial(amount) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(Math.floor(amount));
}

export function position(value) {
    return {
      left: percentOf(window.innerWidth, percentOfWeeklyRate(value)),
    };
  }

  export function widthValueToPx(value) {
      return {
        width: percentOf(window.innerWidth, percentOfWeeklyRate(value)),
      };
    }

  export function percentOfWeeklyRate(value) {
    return percent(value, 350 * 5);
  };

  export function percentOf(isPercent, of) {
    console.log(Math.floor(isPercent * (of / 100)), isPercent, of);
    return Math.floor(isPercent * (of / 100));
  }

  export function percent(x, y) {
    const z = Math.floor((x / y) * 100);
    return z;
  }
