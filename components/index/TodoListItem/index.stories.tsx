import { ComponentStory, ComponentMeta } from '@storybook/react';

import TodoListItem from '.';
import { Todo } from '@/shared/types/todo';

export default {
  title: 'Index/TodoListItem',
  component: TodoListItem,
} as ComponentMeta<typeof TodoListItem>;

const todo: Todo = {
  _id: '1',
  title: 'Todo 1',
};

const Template: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  todo,
};
