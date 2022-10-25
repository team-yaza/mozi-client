import { Dispatch, SetStateAction, useId, useRef } from 'react';

import { Location, LocationSearchResult } from '@/shared/types/location';
import { CANCEL } from '@/components/common/Figure';
import { getItem, setItem } from '@/store/localStorage';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import {
  Container,
  DeleteContainer,
  RecentSearchHeading,
  RecentSearchItem,
  RecentSearchKeyword,
  RecentSearchList,
} from './styles';

interface RecentSearchProps {
  recentSearch: LocationSearchResult[];
  setRecentSearch: Dispatch<SetStateAction<LocationSearchResult[]>>;
  setCoords: Dispatch<SetStateAction<Location | undefined>>;
  clearSearch: () => void;
}

const RecentSearch: React.FC<RecentSearchProps> = ({ recentSearch, setRecentSearch, setCoords, clearSearch }) => {
  const id = useId();
  const recentSearchListRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(recentSearchListRef, () => {
    clearSearch();
  });

  const onDeleteRecentSearchKeyword = (deletedIndex: number) => {
    setRecentSearch((prev) => prev.filter((_, index) => id + index !== id + deletedIndex));

    const recentSearchFromLocalStorage = getItem('RECENT_SEARCH');

    if (recentSearchFromLocalStorage) {
      const parsedRecentSearch = JSON.parse(recentSearchFromLocalStorage) as LocationSearchResult[];

      setItem('RECENT_SEARCH', JSON.stringify(parsedRecentSearch.filter((_, index: number) => index !== deletedIndex)));
    }
  };

  return (
    <Container ref={recentSearchListRef}>
      <RecentSearchHeading>최근 검색어</RecentSearchHeading>
      <RecentSearchList>
        {recentSearch.map((recentSearchItem, index) => (
          <RecentSearchItem key={id + index}>
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
            <DeleteContainer onClick={() => onDeleteRecentSearchKeyword(index)}>
              <CANCEL />
            </DeleteContainer>
          </RecentSearchItem>
        ))}
      </RecentSearchList>
    </Container>
  );
};

export default RecentSearch;
