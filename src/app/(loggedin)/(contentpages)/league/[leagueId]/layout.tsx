import { Suspense } from "react";

export default function LeagueLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense fallback={<h1>Loading...Suspense</h1>}>
        <div>{children}</div>
      </Suspense>
    </>
  );
}
