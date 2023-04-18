import { useLocation } from "react-router-dom";

export function HeaderView() {
  const location = useLocation();
  return location.pathname;
}
