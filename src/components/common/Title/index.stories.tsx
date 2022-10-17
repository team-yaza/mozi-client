import React from 'react';
import { Meta, Story } from '@storybook/react';

import Title, { TitleProps } from '.';

export default {
  component: Title,
  title: 'Common/Title',
} as Meta;

const Template: Story<TitleProps> = (args) => <Title {...args} />;

export const Default = Template.bind({});
