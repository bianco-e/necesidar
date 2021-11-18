import type { UTM } from "../interfaces";

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

export const trackAction = (
  action_type: string,
  utm: UTM,
  user_id?: number,
  user_agent?: string
) => {
  const body = JSON.stringify({
    action_type,
    utm,
    user_id,
    user_agent,
  });
  fetch(`/api/actions/track-action`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};
