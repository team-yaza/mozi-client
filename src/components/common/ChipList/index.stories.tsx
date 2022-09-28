import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChipList from '.';
import { DEADLINE, PLACE, TAG } from '@/components/common/Figure';
import { ChipProps } from '@/components/common/Chip';

export default {
  title: 'Common/ChipList',
  component: ChipList,
} as ComponentMeta<typeof ChipList>;

const ColumnTemplate: ComponentStory<typeof ChipList> = (args) => <ChipList {...args} />;
const RowTemplate: ComponentStory<typeof ChipList> = (args) => <ChipList {...args} />;

export const ColumnChipList = ColumnTemplate.bind({});
export const RowChipList = RowTemplate.bind({});

const chipPropsList: ChipProps[] = [
  {
    type: 'tag',
    fontColor: '#585858',
    backgroundColor: '#F5F5F5',
    Icon: <TAG fill="#92909F" />,
    content: '테스트 태그',
  },
  {
    type: 'location',
    fontColor: '#585858',
    backgroundColor: '#F5F5F5',
    Icon: <PLACE fill="#92909F" />,
    content: '충남대학교',
  },
  {
    type: 'deadline',
    fontColor: '#FF6161',
    backgroundColor: '#FFF2F2',
    Icon: <DEADLINE stroke="#FF6161" fill="#FF6161" />,
    content: '8월 24일',
  },
];

ColumnChipList.args = {
  ChipChildren: chipPropsList,
  align: 'column',
};

RowChipList.args = {
  ChipChildren: chipPropsList,
  align: 'row',
};
