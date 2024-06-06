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
            <Link to="/html" className="p-2 hover:bg-secondary">
              HTML
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/css" className="p-2 hover:bg-secondary">
              CSS
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/javascript" className="p-2 hover:bg-secondary">
              JavaScript
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
            <Link to="/react" className="p-2 hover:bg-secondary">
              React
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
            <Link to="/tailwind" className="p-2 hover:bg-secondary">
              Tailwind
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
            <Link to="/shadcn-ui" className="p-2 hover:bg-secondary">
              Shadcn UI
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
            <Link to="/zustand" className="p-2 hover:bg-secondary">
              Zustand
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/react-context" className="p-2 hover:bg-secondary">
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
            <Link to="/tanstack-query" className="p-2 hover:bg-secondary">
              Tanstack Query
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/i18next" className="p-2 hover:bg-secondary">
              i18next
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/zod" className="p-2 hover:bg-secondary">
              Zod
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/axios" className="p-2 hover:bg-secondary">
              axios
            </Link>
            <Separator orientation="vertical" className="min-h-8 min-w-[3px]" />
            <Link to="/tailwind-merge" className="p-2 hover:bg-secondary">
              tailwind-merge
            </Link>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
