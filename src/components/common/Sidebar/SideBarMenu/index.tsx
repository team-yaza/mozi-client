import React from 'react';
import { Container, IconContainer, MenuName, Count } from './styles';
export interface SideBarMenuProps {
  icon: React.ReactNode;
  count: number;
  name: string;
  focused: boolean;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({ name, icon, count = 0, focused }) => {
  return (
    <Container focused={focused}>
      <IconContainer>{icon}</IconContainer>
      <MenuName>{name}</MenuName>
      <Count>{count}</Count>
    </Container>
  );
};

export default SideBarMenu;
