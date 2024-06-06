import {
  CssLogo,
  HtmlLogo,
  JsLogo,
  ReactIcon,
  Shadcn,
  TailwindIcon,
} from "@/assets/images/svgs/Icons";
import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <MaxWidthWrapper>
      <div className="my-10 flex w-full flex-col gap-2 rounded-md border-2 border-border p-2">
        <div className="mb-2 w-full text-center font-mono text-3xl font-semibold">
          In this git repo, I demonstrate my skills
        </div>
        <Separator />
        <div className="flex flex-col gap-2 p-2">
          <section className="col-span-2 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              Core languages
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-orange-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://www.w3schools.com/html/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HTML
              <HtmlLogo />
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />

            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://www.w3schools.com/css/default.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              CSS
              <CssLogo />
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://www.w3schools.com/js/default.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              JavaScript
              <JsLogo />
            </Link>
          </section>
          <Separator />
          <section className="col-span-1 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              JS Framework
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-yellow-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
              <ReactIcon />
            </Link>
          </section>
          <Separator />
          <section className="col-span-1 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              CSS Framework
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-sky-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind
              <TailwindIcon />
            </Link>
          </section>
          <Separator />
          <section className="col-span-1 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              UI Framework
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-blue-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shadcn UI
              <Shadcn />
            </Link>
          </section>
          <Separator />
          <section className="col-span-1 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              State Management
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-green-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://zustand-demo.pmnd.rs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zustand
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://react.dev/reference/react/useContext"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Context
            </Link>
          </section>
          <Separator />
          <section className="col-span-1 flex items-center gap-2 text-start">
            <h2 className="w-[30%] text-start font-mono text-2xl">
              Other Libraries
            </h2>
            <Separator
              orientation="vertical"
              className="min-h-8 min-w-[3px] bg-green-500"
            />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://tanstack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanstack Query
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://www.i18next.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              i18next
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://zod.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zod
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://axios-http.com/docs/intro"
              target="_blank"
              rel="noopener noreferrer"
            >
              axios
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link
              className="flex items-center gap-1 p-2 hover:bg-secondary"
              to="https://www.npmjs.com/package/tailwind-merge"
              target="_blank"
              rel="noopener noreferrer"
            >
              tailwind-merge
            </Link>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
