import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chip from '.';
import TAG from '@/components/common/Figure/TAG';
import PLACE from '@/components/common/Figure/PLACE';

export default {
  title: 'Common/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template1: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;
const Template2: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const TagChip = Template1.bind({});
export const LocationChip = Template2.bind({});

TagChip.args = {
  fontColor: '#585858',
  backgroundColor: '#F5F5F5',
  children: <TAG />,
  content: '테스트 태그',
  onFocused: true,
};

LocationChip.args = {
  fontColor: '#585858',
  backgroundColor: '#F5F5F5',
  children: <PLACE />,
  content: '충남대학교',
  onFocused: true,
};
