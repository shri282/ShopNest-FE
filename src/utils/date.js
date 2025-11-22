import { format } from "date-fns";

export const formatDate = (dateString, formatStr) => {
  const date = new Date(dateString);
  return format(date, formatStr);
};
