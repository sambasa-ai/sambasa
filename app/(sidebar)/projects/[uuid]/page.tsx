export default async function ProjectPage(
  props: PageProps<"/projects/[uuid]">,
) {
  const { uuid } = await props.params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M12 2v4" />
          <path d="m16.2 7.8 2.9-2.9" />
          <path d="M18 12h4" />
          <path d="m16.2 16.2 2.9 2.9" />
          <path d="M12 18v4" />
          <path d="m4.9 19.1 2.9-2.9" />
          <path d="M2 12h4" />
          <path d="m4.9 4.9 2.9 2.9" />
        </svg>
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold tracking-tight">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Projects are under construction. This feature will be available in a
          future update.
        </p>
      </div>
    </div>
  );
}
