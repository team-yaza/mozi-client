export const getItemFromLocalForage = async (store: LocalForage, key: string) => {
  try {
    return await store.getItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const setItemToLocalForage = async (store: LocalForage, key: string, value: any) => {
  try {
    await store.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
