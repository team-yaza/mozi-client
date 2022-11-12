export const setSideBarStateToLocalStorage = (state: boolean) => {
  localStorage.setItem('SideBarState', JSON.stringify({ SideBarState: state }));
};

export const setSearchSideBarStateToLocalStorage = (state: boolean) => {
  localStorage.setItem('SearchSideBarState', JSON.stringify({ SearchSideBarState: state }));
};

export const getSideBarStateFromLocalStorage = () => {
  const result = localStorage.getItem('SideBarState');
  if (result) {
    return JSON.parse(result).SideBarState;
  }
  return false;
};

export const getSearchSideBarStateFromLocalStorage = () => {
  const result = localStorage.getItem('SearchSideBarState');
  if (result) {
    return JSON.parse(result).SearchSideBarState;
  }
  return false;
};
