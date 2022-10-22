import React from 'react';
import { Meta, Story } from '@storybook/react';

import TextInput, { TextInputProps } from '.';

export default {
  component: TextInput,
  title: 'components/TextInput',
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '아무거나 입력해보세요.',
};

export const NoBorder = Template.bind({});
NoBorder.args = {
  placeholder: '아무거나 입력해보세요.',
};

export const WithMaxLegnth = Template.bind({});
WithMaxLegnth.args = {
  supportsMaxLength: true,
  maxLength: 10,
  placeholder: '아무거나 입력해보세요.',
};
