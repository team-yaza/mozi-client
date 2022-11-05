import React from 'react';
import { Meta, Story } from '@storybook/react';

import Skeleton from '.';

export default {
  component: Skeleton,
  title: 'components/Skeleton',
} as Meta;

const Template: Story = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
