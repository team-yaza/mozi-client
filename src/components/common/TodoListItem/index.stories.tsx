import React from 'react';
import TodoListItem from './index';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/TodoListItem',
  component: TodoListItem,
} as ComponentMeta<typeof TodoListItem>;

const Template: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  todo: {
    id: 'random uuid',
    title: 'MOZI',
    index: 1,
    done: false,
    createdAt: new Date(),
    alarmed: false,
    locationName: '서울특별시 강남구',
    alarmDate: '2021-08-01',
    dueDate: '2021-08-01',
  },
};
