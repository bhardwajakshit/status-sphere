import { Logo } from "../assets/Logo";

export const Header = () => {
  return (
    <div className="flex items-center gap-3">
      <Logo />
      <h1 className="justify-center pb-6 pt-8 font-semibold text-2xl font-mono">
        Status Sphere
      </h1>
    </div>
  );
};
