import { Container, RecentSearchHeading, RecentSearchKeyword, RecentSearchList } from './styles';

const RecentSearch: React.FC = () => {
  return (
    <Container>
      <RecentSearchHeading>최근 검색어</RecentSearchHeading>
      <RecentSearchList>
        <RecentSearchKeyword>은행</RecentSearchKeyword>
        <RecentSearchKeyword>8월 12일</RecentSearchKeyword>
      </RecentSearchList>
    </Container>
  );
};

export default RecentSearch;
