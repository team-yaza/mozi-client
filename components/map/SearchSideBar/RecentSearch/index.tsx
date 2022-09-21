import { LocationSearchResult } from '@/shared/types/location';
import { Container, RecentSearchHeading, RecentSearchKeyword, RecentSearchList } from './styles';

interface RecentSearchProps {
  recentSearch: LocationSearchResult[];
}

const RecentSearch: React.FC<RecentSearchProps> = ({ recentSearch }) => {
  return (
    <Container>
      <RecentSearchHeading>최근 검색어</RecentSearchHeading>
      <RecentSearchList>
        {recentSearch.map((recentSearchItem) => (
          <RecentSearchKeyword>{recentSearchItem.name}</RecentSearchKeyword>
        ))}
      </RecentSearchList>
    </Container>
  );
};

export default RecentSearch;
