import { Dispatch, SetStateAction } from 'react';
import { Location, LocationSearchResult } from '@/shared/types/location';
import { Container, RecentSearchHeading, RecentSearchKeyword, RecentSearchList } from './styles';

interface RecentSearchProps {
  recentSearch: LocationSearchResult[];
  setCoords: Dispatch<SetStateAction<Location | undefined>>;
}

const RecentSearch: React.FC<RecentSearchProps> = ({ recentSearch, setCoords }) => {
  return (
    <Container>
      <RecentSearchHeading>최근 검색어</RecentSearchHeading>
      <RecentSearchList>
        {recentSearch.map((recentSearchItem) => (
          <RecentSearchKeyword
            onClick={() =>
              setCoords({
                longitude: recentSearchItem.location[0],
                latitude: recentSearchItem.location[1],
              })
            }
          >
            {recentSearchItem.name}
          </RecentSearchKeyword>
        ))}
      </RecentSearchList>
    </Container>
  );
};

export default RecentSearch;
