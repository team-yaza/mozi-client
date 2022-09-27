export const getSideBarStateFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const result = localStorage.getItem('SideBarState');
    if (result) {
      return JSON.parse(result).SideBarState;
    }
  }
  return false;
};

export const getSearchSideBarStateFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const result = localStorage.getItem('SearchSideBarState');
    if (result) {
      return JSON.parse(result).SearchSideBarState;
    }
  }
  return false;
};
