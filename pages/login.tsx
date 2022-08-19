import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

const Login: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <p>signed in as {session?.user?.email}</p>;
  }

  return (
    <div>
      <div>KaKao login</div>
      {!session && <a href="/api/auth/signin">sign in</a>}
      {session && <div onClick={() => signOut()}>sign out</div>}
    </div>
  );
};

export default Login;
