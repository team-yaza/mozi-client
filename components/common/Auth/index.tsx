interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  // const router = useRouter();
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //   }
  // }, [session]);

  return <>{children}</>;
};

export default Auth;
