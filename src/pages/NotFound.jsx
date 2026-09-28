import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <div className="container page">
      <EmptyState icon={Compass} title="Page not found" text="That page doesn't exist. Head back to the shelf.">
        <Link className="btn btn-primary" to="/">Go home</Link>
      </EmptyState>
    </div>
  );
}
