// Generador de ID unico
export const getId = () => {
  const random = Math.random().toString(36).substring(2);
  const date = Date.now().toString(36);

  return random + date;
}

export const formatDate = date => {
  const newDate = new Date(date);

  const op = {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric'
  }

  return newDate.toLocaleDateString('es-Es', op);
}