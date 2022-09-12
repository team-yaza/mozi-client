import React from 'react';
import Spinner from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Common/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
