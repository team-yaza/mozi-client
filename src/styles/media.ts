import { breakPoints } from '@/shared/constants/breakpoints';

const { phone } = breakPoints;

const mediaQuery = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`;

export const media = {
  phone: mediaQuery(phone),
};
