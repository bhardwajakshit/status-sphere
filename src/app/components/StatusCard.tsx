import BlinkingDot from "../blinkingDot";
import { StatusColor, StatusData } from "../types";

export const StatusCard: React.FC<StatusData> = ({
  title,
  icon,
  status,
  updatedAt,
  indicator,
}) => {
  return (
    <div className="border bg-gray-300 border-gray-300 rounded-lg px-8 py-6">
      <span className="flex items-center justify-between">
        <div>{icon}</div>
        <span className="mb-auto">
          <BlinkingDot
            color={
              status !== "All Systems Operational"
                ? StatusColor.ORANGE
                : StatusColor.GREEN
            }
          />
        </span>
      </span>
      <div className="flex items-center gap-3">
        <h2 className="text-zinc-600 font-semibold text-base my-2">{title}</h2>
        {status !== "All Systems Operational" && (
          <div className="text-orange-600 font-sans bg-orange-300 rounded-xl text-[11px] px-1.5 py-1 font-semibold">
            {indicator?.toUpperCase()}
          </div>
        )}
      </div>
      <p className="text-zinc-600 mb-2">Status: {status}</p>
      <p className="text-zinc-600">
        Server Updated: {new Date(updatedAt).toLocaleString()}
      </p>
    </div>
  );
};
