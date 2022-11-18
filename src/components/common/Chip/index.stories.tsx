import { ComponentStory, ComponentMeta } from '@storybook/react';

import Chip from '.';
import TAG from '@/components/common/Figure/TAG';
import PLACE from '@/components/common/Figure/PLACE';

export default {
  title: 'components/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const TagTemplate: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;
const LocationTemplate: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

export const TagChip = TagTemplate.bind({});
export const LocationChip = LocationTemplate.bind({});

TagChip.args = {
  icon: <TAG stroke="#92909F" fill="#92909F" />,
  content: '테스트 태그',
};

LocationChip.args = {
  icon: <PLACE />,
  content: '충남대학교',
};
