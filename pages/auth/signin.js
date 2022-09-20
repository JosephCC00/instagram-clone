import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

/**
 * * This is essentially running on the client's browser
 */
function signin({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
        <p className="font-xs italic">
          This is NOT the real app, it is made for educational purpose ONLY.
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div
              key={provider.name}
              className="flex justify-center p-3 bg-blue-500 text-white w-48 mx-auto rounded-lg"
            >
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * * This is Server-Side Render
 * * See here: https://next-auth.js.org/configuration/pages
 */
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signin;
