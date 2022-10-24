import React from 'react';
import TodoListItem from '.';
import TodoListItem2 from './temp';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/TodoListItem',
  component: TodoListItem2,
} as ComponentMeta<typeof TodoListItem2>;

// const Template: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem {...args} />;

// export const Default = Template.bind({});

const Template2: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem2 {...args} />;

export const Default2 = Template2.bind({});

Default2.args = {
  id: 'hello-mozi',
  title: '팅팅',
};
