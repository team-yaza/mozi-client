import localForage from 'localforage';

export const getItemFromLocalForage = async (key: string) => {
  try {
    return await localForage.getItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const setItemToLocalForage = async (key: string, value: any) => {
  try {
    await localForage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
