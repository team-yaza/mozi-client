import React from 'react';
import TodoListItemDescription from '.';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/TodoListItemDescription',
  component: TodoListItemDescription,
} as ComponentMeta<typeof TodoListItemDescription>;

const Template: ComponentStory<typeof TodoListItemDescription> = (args) => <TodoListItemDescription {...args} />;

export const Default = Template.bind({});
