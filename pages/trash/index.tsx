import type { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/common/AppLayout';

const Trash: NextPageWithLayout = () => {
  return <div>today</div>;
};

Trash.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Trash;
