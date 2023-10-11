export const convertCssSizeToNumber = (string: string): {number: number, unit: string} => {
  let number: number[] | number = [];
  let unit = ''

  for(let i = 0; i < string.length; i++) {
    const a = parseInt(string[i], 10);

    isNaN(a) ? unit += string[i] : number.push(parseInt(string[i]))
  }
  number = parseInt(number.join(''))
  return { number, unit }
}
