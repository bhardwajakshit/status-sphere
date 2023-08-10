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
import AWSIcon from "./assets/aws-icon.svg";
import GitHub from "./assets/github.svg";
import NotionIcon from "./assets/notion-icon.svg";
import logo from "./assets/logo.png";
import Image from "next/image";
import BlinkingDot from "./blinkingDot";
import { JellyTriangle } from "@uiball/loaders";

interface GithubStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface VercelStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface LinkedInStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface LinkedInApiStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface MongoDBStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface OpenAIStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface StripeStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface SendGridStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface NotionStatus {
  status: {
    description: string;
    indicator: string;
  };
  page: {
    updated_at: string;
  };
}

interface StatusData {
  title: string;
  status: string;
  updatedAt: string;
  icon: React.ReactNode;
  indicator?: string;
}

const StatusBox: React.FC<StatusData> = ({
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
            color={status !== "All Systems Operational" ? "orange" : "green"}
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

const HomePage: React.FC = () => {
  const [githubStatus, setGithubStatus] = useState<GithubStatus | null>(null);
  const [vercelStatus, setVercelStatus] = useState<VercelStatus | null>(null);
  const [linkedInStatus, setLinkedInStatus] = useState<LinkedInStatus | null>(
    null
  );
  const [linkedInApiStatus, setLinkedInApiStatus] =
    useState<LinkedInApiStatus | null>(null);
  const [mongoDBStatus, setMongoDBStatus] = useState<MongoDBStatus | null>(
    null
  );
  const [openAIStatus, setOpenAIStatus] = useState<OpenAIStatus | null>(null);
  const [stripeStatus, setStripeStatus] = useState<StripeStatus | null>(null);
  const [sendGridStatus, setSendGridStatus] = useState<SendGridStatus | null>(
    null
  );
  const [notionstatus, setNotionStatus] = useState<NotionStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const serviceEndpoints = [
    "https://www.githubstatus.com/api/v2/status.json",
    "https://www.vercel-status.com/api/v2/status.json",
    "https://www.linkedin-apistatus.com/api/v2/status.json",
    "https://www.linkedin-status.com/api/v2/status.json",
    "https://status.cloud.mongodb.com/api/v2/status.json",
    "https://status.openai.com/api/v2/status.json",
    "https://www.stripestatus.com/api/v2/status.json",
    "https://status.sendgrid.com/api/v2/status.json",
    "https://status.notion.so/api/v2/status.json",
  ];

  async function fetchStatus(endpoint: RequestInfo | URL) {
    return fetch(endpoint)
      .then((response) => response.json())
      .catch((error) => {
        console.error(`Error fetching status from ${endpoint}:`, error);
        return null;
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchPromises = serviceEndpoints.map((endpoint) =>
        fetchStatus(endpoint)
      );

      Promise.all(fetchPromises)
        .then((fetchedStatuses) => {
          setTimeout(() => {
            setGithubStatus(fetchedStatuses[0]);
            setVercelStatus(fetchedStatuses[1]);
            setLinkedInStatus(fetchedStatuses[2]);
            setLinkedInApiStatus(fetchedStatuses[3]);
            setMongoDBStatus(fetchedStatuses[4]);
            setOpenAIStatus(fetchedStatuses[5]);
            setStripeStatus(fetchedStatuses[6]);
            setSendGridStatus(fetchedStatuses[7]);
            setNotionStatus(fetchedStatuses[8]);
            setIsLoading(false);
          }, 2000);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching data:", error);
          setIsLoading(false);
        });
    };

    const intervalId = setInterval(fetchData, 15000); // Fetch every 15 seconds

    fetchData(); // Fetch data immediately upon component mount

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen container mx-auto py-4 items-center justify-between p-5">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={80} height={80} />
        <h1 className="justify-center pb-6 pt-8 font-semibold text-2xl font-mono">
          Status Sphere
        </h1>
      </div>
      <div className="flex z-10 w-full py-10 items-center justify-center font-mono text-sm">
        <div className="h-[70vh] flex items-center justify-center">
          {isLoading &&
            (!githubStatus ||
              !vercelStatus ||
              !linkedInStatus ||
              !linkedInApiStatus ||
              !mongoDBStatus ||
              !openAIStatus ||
              !stripeStatus ||
              !sendGridStatus ||
              !notionstatus) && (
              <JellyTriangle size={40} speed={1.75} color="white" />
            )}
        </div>
        <div className="grid xl:grid-cols-3 xs:grid-cols-1 lg:grid-cols-2 gap-4">
          {githubStatus && (
            <StatusBox
              title="GitHub Server Status"
              icon={<GitHubIcon />}
              status={githubStatus.status.description}
              updatedAt={githubStatus.page.updated_at}
              indicator={githubStatus.status.indicator}
            />
          )}
          {vercelStatus && (
            <StatusBox
              title="Vercel Server Status"
              icon={<VercelIcon />}
              status={vercelStatus.status.description}
              updatedAt={vercelStatus.page.updated_at}
              indicator={vercelStatus.status.indicator}
            />
          )}
          {linkedInStatus && (
            <StatusBox
              title="LinkedIn Server Status"
              icon={<LinkedInIcon />}
              status={linkedInStatus.status.description}
              updatedAt={linkedInStatus.page.updated_at}
              indicator={linkedInStatus.status.indicator}
            />
          )}
          {linkedInApiStatus && (
            <StatusBox
              title="LinkedIn API Server Status"
              icon={<LinkedInAPIIcon />}
              status={linkedInApiStatus.status.description}
              updatedAt={linkedInApiStatus.page.updated_at}
              indicator={linkedInApiStatus.status.indicator}
            />
          )}
          {mongoDBStatus && (
            <StatusBox
              title="MongoDB Server Status"
              icon={<MongoDBIcon />}
              status={mongoDBStatus.status.description}
              updatedAt={mongoDBStatus.page.updated_at}
              indicator={mongoDBStatus.status.indicator}
            />
          )}
          {openAIStatus && (
            <StatusBox
              title="OpenAI Server Status"
              icon={<OpenAIIcon />}
              status={openAIStatus.status.description}
              updatedAt={openAIStatus.page.updated_at}
              indicator={openAIStatus.status.indicator}
            />
          )}
          {stripeStatus && (
            <StatusBox
              title="Stripe Server Status"
              icon={<StripeIcon />}
              status={stripeStatus.status.description}
              updatedAt={stripeStatus.page.updated_at}
              indicator={stripeStatus.status.indicator}
            />
          )}
          {sendGridStatus && (
            <StatusBox
              title="SendGrid Server Status"
              icon={<SendGridIcon />}
              status={sendGridStatus.status.description}
              updatedAt={sendGridStatus.page.updated_at}
              indicator={sendGridStatus.status.indicator}
            />
          )}
          {notionstatus && (
            <StatusBox
              title="Notion Server Status"
              icon={<NotionIcon />}
              status={notionstatus.status.description}
              updatedAt={notionstatus.page.updated_at}
              indicator={notionstatus.status.indicator}
            />
          )}
        </div>
      </div>
      <footer className="flex items-center justify-center gap-4">
        <GitHub />
        <p className="text-center text-gray-500 dark:text-gray-400">
          <a
            href="https://www.github.com/bhardwajakshit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akshit Bhardwaj
          </a>
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
