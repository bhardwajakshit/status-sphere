import { JellyTriangle } from "@uiball/loaders";
import { ServicesStatus } from "../types";

export const Loader = ({
  isLoading,
  servicesStatus,
}: {
  isLoading: boolean;
  servicesStatus: ServicesStatus;
}) => {
  return (
    <div className="h-[70vh] flex items-center justify-center">
      {isLoading &&
        Object.values(servicesStatus).some(
          (service) => service.status === null
        ) && <JellyTriangle size={40} speed={1.75} color="white" />}
    </div>
  );
};
