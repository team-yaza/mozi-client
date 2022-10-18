/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { Container, LogoContainer } from './styles';

export interface ProfileProps {
  a?: any;
}

const Profile: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <Image src="/assets/svgs/mozi.svg" width={40} height={40} />
      </LogoContainer>
      // ! Next Image가 스토리북에서 잘 악먹음 ㅠㅡㅠ
    </Container>
  );
};

export default Profile;
