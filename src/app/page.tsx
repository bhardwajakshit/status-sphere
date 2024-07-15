"use client";

import React, { useEffect, useState } from "react";
import GitHubIcon from "./assets/github-icon.svg";
import VercelIcon from "./assets/vercel-icon.svg";
import LinkedInIcon from "./assets/linkedin-icon.svg";
import LinkedInAPIIcon from "./assets/linkedin-api-icon.svg";
import MongoDBIcon from "./assets/mongodb-icon.svg";
import OpenAIIcon from "./assets/openai-icon.svg";
import StripeIcon from "./assets/stripe-icon.svg";
import SendGridIcon from "./assets/sendgrid-icon.svg";
import NotionIcon from "./assets/notion-icon.svg";
import { fetchData } from "./utils/fetchData";
import { Header } from "./components/Header";
import { StatusCard } from "./components/StatusCard";
import { serviceEndpoints } from "./utils/endpoints";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { ServicesStatus } from "./types";

const HomePage: React.FC = () => {
  const [servicesStatus, setServicesStatus] = useState<ServicesStatus>({
    GitHub: { status: null, icon: <GitHubIcon /> },
    Vercel: { status: null, icon: <VercelIcon /> },
    LinkedIn: { status: null, icon: <LinkedInIcon /> },
    LinkedInAPI: { status: null, icon: <LinkedInAPIIcon /> },
    MongoDB: { status: null, icon: <MongoDBIcon /> },
    OpenAI: { status: null, icon: <OpenAIIcon /> },
    Stripe: { status: null, icon: <StripeIcon /> },
    SendGrid: { status: null, icon: <SendGridIcon /> },
    Notion: { status: null, icon: <NotionIcon /> },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      setIsLoading(true);
      const fetchPromises = Object.entries(serviceEndpoints).map(
        ([serviceName, endpoint]) =>
          fetchData(endpoint).then((status) => ({ serviceName, status }))
      );

      Promise.all(fetchPromises)
        .then((fetchedStatuses) => {
          setServicesStatus((prevStatus) => {
            const newStatus = { ...prevStatus } as any;
            fetchedStatuses.forEach(({ serviceName, status }) => {
              newStatus[serviceName].status = status;
            });
            return newStatus;
          });
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    const intervalId = setInterval(fetchStatuses, 15000); // Fetch every 15 seconds

    fetchStatuses();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen flex flex-col container mx-auto py-4 justify-between p-5">
      <Header />
      <div className="flex z-10 w-full py-10 items-center justify-center font-mono text-sm">
        <Loader isLoading={isLoading} servicesStatus={servicesStatus} />
        <div className="grid xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.entries(servicesStatus).map(
            ([serviceName, service]) =>
              service.status && (
                <StatusCard
                  key={serviceName}
                  title={`${serviceName} Server Status`}
                  icon={service.icon}
                  status={service.status?.status?.description || "Unknown"}
                  updatedAt={service.status?.page?.updated_at || Date.now()}
                  indicator={service.status?.status?.indicator || "Unknown"}
                />
              )
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
