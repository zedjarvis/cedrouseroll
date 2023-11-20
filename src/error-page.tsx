import { Link, useRouteError } from "react-router-dom";

interface Error {
  statusText: string
  message: string
}


export default function ErrorPage() {
  const error = useRouteError() as unknown as Error;
  console.error(error);

  return (
    <div id="error-page" className="h-screen w-screen flex flex-col justify-center items-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={'/'} className="border px-3 text-base mt-3">Go Home</Link>
    </div>
  );
}
