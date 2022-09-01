import { ComponentStory, ComponentMeta } from '@storybook/react';

import ChipList from '.';
import { DEADLINE, PLACE, TAG } from '@/components/common/Figure';
import { ChipProps } from './Chip';

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
    children: <TAG fill="#92909F" />,
    content: '테스트 태그',
    onFocused: true,
  },
  {
    type: 'location',
    fontColor: '#585858',
    backgroundColor: '#F5F5F5',
    children: <PLACE fill="#92909F" />,
    content: '충남대학교',
    onFocused: true,
  },
  {
    type: 'deadline',
    fontColor: '#FF6161',
    backgroundColor: '#FFF2F2',
    children: <DEADLINE stroke="#FF6161" fill="#FF6161" />,
    content: '8월 24일',
    onFocused: true,
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
