import { useLocation } from "react-router-dom";
import { resolveSeo } from "../constants/seo";
import { Seo } from "./Seo";

export function RouteSeo() {
  const { pathname } = useLocation();
  return <Seo {...resolveSeo(pathname)} />;
}
