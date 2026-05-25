import { Link } from "react-router-dom";

export type DemoPageFooterProps = {
  /** Short project name shown after "HM Coding ·" (e.g. "Gym Management demo"). */
  projectLabel: string;
};

export function DemoPageFooter({ projectLabel }: DemoPageFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-8 dark:border-gray-700">
      <Link
        to="/projects"
        className="text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400"
      >
        ← All projects
      </Link>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        HM Coding · {projectLabel} · frontend preview
      </p>
    </div>
  );
}
