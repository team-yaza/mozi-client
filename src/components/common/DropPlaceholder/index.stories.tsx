import React from 'react';
import { Meta, Story } from '@storybook/react';

import { INBOX } from '@/components/common/Figure';
import DropPlaceholder, { DropPlaceholderProps } from '.';

export default {
  component: DropPlaceholder,
  title: 'Common/DropPlaceholder',
} as Meta;

const Template: Story<DropPlaceholderProps> = (args) => <DropPlaceholder {...args} />;

export const Default = Template.bind({});

Default.args = {
  isDragging: true,
  active: true,
  backgroundColor: '#DEEBFF',
  borderColor: '#4C99FF',
  hoverColor: '#0552CC',
  children: <></>,
  icon: <INBOX />,
  text: 'Drop here',
};
