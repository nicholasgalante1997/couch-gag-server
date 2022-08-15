const alpha: readonly string[] = [
  'heller',
  'melville',
  'sedaris',
  'cotton',
  'berry',
  'inhale',
  'green',
  'sarcophogus',
  'brittle',
  'lovecraft'
] as const;
const beta: readonly string[] = [
  'rabbit',
  'dumpling',
  'chief',
  'dallas',
  'sagan',
  'tyson',
  'battlestar',
  'parker',
  'stone',
  'butters'
] as const;
const gamma: readonly string[] = [
  'tiger',
  'himalayas',
  'bitcoin',
  'evil-patrick',
  'corner',
  'tarantino',
  'hollywood',
  'doberman'
] as const;
const delta: readonly string[] = [
  'denver',
  'cow',
  'south',
  'grim',
  'cathcart',
  'yossarian',
  'nately',
  'mcwatt',
  'cthulhu'
] as const;

const plausibles = [alpha, beta, gamma, delta];

export function colloqIdRegister() {
  let cId = '';
  for (const p of plausibles) {
    cId += p[Math.floor(Math.random() * (p.length - 1))];
    if (plausibles.indexOf(p) != plausibles.length - 1) cId += '-';
  }
  return cId;
}
