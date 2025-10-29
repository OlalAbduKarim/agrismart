const WISHLIST_KEY = 'userWishlist';

export const getWishlist = (): number[] => {
  try {
    const wishlistJson = localStorage.getItem(WISHLIST_KEY);
    return wishlistJson ? JSON.parse(wishlistJson) : [];
  } catch (error) {
    console.error("Error reading wishlist from localStorage", error);
    return [];
  }
};

export const saveWishlist = (wishlist: number[]): void => {
  try {
    const wishlistJson = JSON.stringify(wishlist);
    localStorage.setItem(WISHLIST_KEY, wishlistJson);
  } catch (error) {
    console.error("Error saving wishlist to localStorage", error);
  }
};

export const isInWishlist = (id: number): boolean => {
  const wishlist = getWishlist();
  return wishlist.includes(id);
};

export const addToWishlist = (id: number): number[] => {
  const wishlist = getWishlist();
  if (!wishlist.includes(id)) {
    const updatedWishlist = [...wishlist, id];
    saveWishlist(updatedWishlist);
    return updatedWishlist;
  }
  return wishlist;
};

export const removeFromWishlist = (id: number): number[] => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(itemId => itemId !== id);
  saveWishlist(updatedWishlist);
  return updatedWishlist;
};
