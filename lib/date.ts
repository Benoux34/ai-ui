export function formatMessageTime(date: Date): string {
  const now = new Date();
  const messageDate = new Date(date);

  const isToday = now.toDateString() === messageDate.toDateString();

  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    messageDate.toDateString();

  const isThisYear = now.getFullYear() === messageDate.getFullYear();

  if (isToday) {
    return messageDate.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday) {
    return `Hier ${messageDate.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  if (isThisYear) {
    return messageDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return messageDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
