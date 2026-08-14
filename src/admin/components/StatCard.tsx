import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, loading, onClick }) => {
  const className = `rounded-xl border border-gray-800 bg-gray-900 p-6 text-left transition hover:border-[#2563eb]/50 hover:shadow-card-hover ${onClick ? "cursor-pointer" : ""}`;

  const content = (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {loading ? (
          <div className="mt-2 h-8 w-24 animate-pulse rounded bg-gray-800" />
        ) : (
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        )}
      </div>
      {icon && <div className="ml-4 text-[#2563eb]">{icon}</div>}
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`w-full ${className}`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
};

export default StatCard;
