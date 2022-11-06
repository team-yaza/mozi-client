import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chip from '.';
import { TAG, PLACE } from '@/components/common/Figure';

export default {
  title: 'components/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const TagTemplate: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;
const LocationTemplate: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const TagChip = TagTemplate.bind({});
export const LocationChip = LocationTemplate.bind({});

TagChip.args = {
  fontColor: '#585858',
  backgroundColor: '#F5F5F5',
  icon: <TAG stroke="#92909F" fill="#92909F" />,
  content: '테스트 태그',
};

LocationChip.args = {
  fontColor: '#585858',
  backgroundColor: '#F5F5F5',
  icon: <PLACE fill="#92909F" />,
  content: '충남대학교',
};
