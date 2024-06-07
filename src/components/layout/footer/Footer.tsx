import MaxWidthWrapper from "@/components/ui/MaxWidthWrapper";

export default function Footer() {
  return (
    <div className="min-w-full border-t bg-accent/50">
      <MaxWidthWrapper className="h-18 grid place-items-center py-8">
        <p className="">
          © {new Date().getFullYear()} Ioane Devnozashvili. All rights
          reserved.
        </p>
      </MaxWidthWrapper>
    </div>
  );
}
