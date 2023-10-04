export function currencyFormatter(value: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  })

  return formatter.format(value)
}