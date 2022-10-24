import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

import { BOXARROWRIGHT, BOXPLUS, FOOTERCALENDAR, SEARCH } from '@/components/common/Figure';
import { TodoCreateRequest } from '@/shared/types/todo';
import { toastSuccess } from '@/shared/utils/toast';
import { Container, IconContainer, OptionsContainer } from './styles';

interface FooterProps {
  createTodo: UseMutateFunction<
    | {
        id: string;
        locationName: string | undefined;
        longitude: number | undefined;
        latitude: number | undefined;
        dueDate: Date | undefined;
        index: number;
        offline: boolean;
      }
    | undefined,
    unknown,
    TodoCreateRequest,
    unknown
  >;
}

const Footer: React.FC<FooterProps> = ({ createTodo }) => {
  const router = useRouter();

  const onClickArrowRight = useCallback(() => {
    switch (router.pathname) {
      case '/':
        router.push('/map');
        break;

      case '/map':
        router.push('/upcoming');
        break;

      case '/upcoming':
        router.push('/logbook');
        break;

      case '/logbook':
        router.push('/trash');
        break;

      case '/trash':
        router.push('/');
        break;

      default:
        break;
    }

    if (router.pathname === '/') {
      router.push('/map');
    }
  }, [router]);

  const onCreateTodo = useCallback(() => {
    createTodo({});
    toastSuccess('Inbox');
  }, [createTodo]);

  return (
    <Container>
      <OptionsContainer>
        <IconContainer onClick={onCreateTodo}>
          <BOXPLUS />
        </IconContainer>
        <IconContainer onClick={() => router.push('/upcoming')}>
          <FOOTERCALENDAR />
        </IconContainer>
        <IconContainer onClick={onClickArrowRight}>
          <BOXARROWRIGHT />
        </IconContainer>
        <IconContainer>
          <SEARCH />
        </IconContainer>
      </OptionsContainer>
    </Container>
  );
};

export default Footer;
