import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';

interface PageTemplateProps {
  children: React.ReactNode;
  title: string;
  onClickBack?: () => void;
}

const PageTemplate = ({ children, title, onClickBack }: PageTemplateProps) => {
  return (
    <PageWrapper>
      <Header title={title} onClickBack={onClickBack}></Header>
      {children}
    </PageWrapper>
  );
};

export default PageTemplate;

const PageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 375px;
  width: 375px;

  padding: 0 28px 28px 28px;
`;
