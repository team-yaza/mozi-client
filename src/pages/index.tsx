import TestComponent from '@src/components/TestComponent';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      Next.js
      <TestComponent />
    </div>
  );
};

export default Home;
