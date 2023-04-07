export const normalizeValue = (array, value, campo, string) => {
  const indice = array.findIndex(el => el.value === value && el.campo === campo)
  if (indice >= 0) {
    array[indice] = { ...array[indice], cantidad: array[indice].cantidad + 1 }
  } else array.push({ value, cantidad: 1, campo, string })
}
