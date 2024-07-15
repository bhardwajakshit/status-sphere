import GitHub from "../assets/github.svg";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-4 mt-auto">
      <GitHub />
      <a
        href="https://www.github.com/bhardwajakshit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-gray-500 dark:text-gray-400"
      >
        Akshit Bhardwaj
      </a>
    </footer>
  );
};
