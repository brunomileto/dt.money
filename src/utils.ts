export const formatCurrency = (value: number) => {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  return formatted;
};

export const formatDate = (value: string) => {
  const formatted = new Intl.DateTimeFormat("pt-BR").format(new Date(value));
  return formatted;
};
