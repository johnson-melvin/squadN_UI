
import { ReactNode } from "react";

const StatCard = ({
  icon,
  value,
  label,
  accent,
}: {
  icon: ReactNode;
  value: string | number;
  label: string;
  accent?: boolean;
}) => (
  <div className={`rounded-2xl px-6 py-6 flex flex-col items-start gap-1 ${accent ? 'bg-gradient-to-tr from-orange-500 to-pink-500 text-white' : 'bg-[#10131a] text-white'} shadow-sm`}>
    <div className="mb-3">{icon}</div>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm text-gray-400 font-medium">{label}</div>
  </div>
);

export default StatCard;
