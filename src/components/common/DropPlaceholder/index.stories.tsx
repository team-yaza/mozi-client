import React from 'react';
import { Meta, Story } from '@storybook/react';

import DropPlaceholder, { DropPlaceholderProps } from '.';
import styled from 'styled-components';

export default {
  component: DropPlaceholder,
  title: 'Common/DropPlaceholder',
} as Meta;

const Template: Story<DropPlaceholderProps> = (args) => <DropPlaceholder {...args} />;
const Action = styled.div``;

export const Default = Template.bind({});

Default.args = {
  isDragging: true,
  active: true,
  backgroundColor: '#DEEBFF',
  borderColor: '#4C99FF',
  hoverColor: '#0552CC',
  children: <Action />,
};
