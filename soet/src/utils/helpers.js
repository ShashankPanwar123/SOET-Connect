export const formatDate =
(dateString) => {

  const date =
    new Date(dateString);

  return date
    .toLocaleDateString();

};

export const truncateText =
(
  text,
  maxLength = 100
) => {

  if (
    text.length <= maxLength
  ) {
    return text;
  }

  return (
    text.substring(
      0,
      maxLength
    ) + "..."
  );

};

export const capitalize =
(text) => {

  return (
    text.charAt(0)
      .toUpperCase() +
    text.slice(1)
  );

};