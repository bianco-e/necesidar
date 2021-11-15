export const handleToggleFavorite = (
  e: React.MouseEvent,
  user_id: string,
  publication_id: string
) => {
  e.stopPropagation();
  const body = JSON.stringify({
    user_id,
    publication_id,
  });
  fetch(`/api/favorites/toggle-favorite`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .then((response) => response)
    .catch((e) => console.error(e));
};
