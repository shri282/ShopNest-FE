import { format } from "date-fns";

export const formatDate = (dateString, formatStr) => {
  const date = new Date(dateString);
  return format(date, formatStr);
};

export const formatReadableDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
