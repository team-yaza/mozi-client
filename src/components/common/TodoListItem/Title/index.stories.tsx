import React from 'react';
import TodoListItemTitle from '.';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/TodoListItemTitle',
  component: TodoListItemTitle,
} as ComponentMeta<typeof TodoListItemTitle>;

const Template: ComponentStory<typeof TodoListItemTitle> = (args) => <TodoListItemTitle {...args} />;

export const Default = Template.bind({});
