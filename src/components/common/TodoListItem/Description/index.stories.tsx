import React from 'react';
import TodoListItemDescription from '.';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/TodoListItemDescription',
  component: TodoListItemDescription,
} as ComponentMeta<typeof TodoListItemDescription>;

const Template: ComponentStory<typeof TodoListItemDescription> = (args) => <TodoListItemDescription {...args} />;

export const Default = Template.bind({});

Default.args = {
  todo: {
    id: '1',
    title: 'Todo Title',
    description: 'Todo Description',
    index: 1,
    done: false,
    alarmed: false,
    createdAt: new Date(),
  },
};
