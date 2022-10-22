import React from 'react';
import { Meta, Story } from '@storybook/react';

import Title, { TitleProps } from '.';
import { INBOX } from '@/components/common/Figure';

export default {
  component: Title,
  title: 'components/Title',
} as Meta;

const Template: Story<TitleProps> = (args) => <Title {...args} />;

export const Default = Template.bind({});

Default.args = {
  icon: <INBOX focused />,
  title: 'Inbox',
};

export const WithButton = Template.bind({});

WithButton.args = {
  icon: <INBOX focused />,
  title: 'Inbox',
  actionText: '할 일 추가',
};
