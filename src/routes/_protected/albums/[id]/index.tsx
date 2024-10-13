import { createFileRoute } from "@tanstack/react-router";
import Photo from "../../-components/Photo";

export const Route = createFileRoute("/_protected/albums/[id]/")({
  component: () => <div>Hello /_protected/albums/[id]/!</div>,
});
