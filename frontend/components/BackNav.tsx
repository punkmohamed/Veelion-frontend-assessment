import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackNavProps = {
  href?: string;
  label?: string;
};

export function BackNav({ href = "/", label = "Back" }: BackNavProps) {
  return (
    <nav className="nav-back">
      <Link href={href} className="button button-ghost nav-back-link">
        <ArrowLeft size={18} strokeWidth={2} aria-hidden />
        {label}
      </Link>
    </nav>
  );
}
