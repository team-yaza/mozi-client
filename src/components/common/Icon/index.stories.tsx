import React from 'react';
import Icon from '.';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'ARROWLEFT',
  width: '2rem',
  height: '2rem',
};
