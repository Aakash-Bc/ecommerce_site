export const formatPrice = (price) => `Rs. ${price.toLocaleString('en-IN')}`;

export const calcDiscount = (original, final) =>
  Math.round(((original - final) / original) * 100);

export const applyCoupon = (subtotal, coupon) => {
  if (!coupon) return 0;
  if (coupon.type === 'percentage') return Math.round(subtotal * coupon.value / 100);
  if (coupon.type === 'flat') return coupon.value;
  return 0;
};

export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const truncate = (str, n) =>
  str.length > n ? str.slice(0, n) + '...' : str;

export const getStarArray = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};

export const sortProducts = (products, sortBy) => {
  const arr = [...products];
  switch (sortBy) {
    case 'price-asc': return arr.sort((a, b) => a.finalPrice - b.finalPrice);
    case 'price-desc': return arr.sort((a, b) => b.finalPrice - a.finalPrice);
    case 'rating': return arr.sort((a, b) => b.rating - a.rating);
    case 'discount': return arr.sort((a, b) => b.discountPercentage - a.discountPercentage);
    case 'newest': return arr.sort((a, b) => b.id - a.id);
    default: return arr;
  }
};

export const filterProducts = (products, filters) => {
  return products.filter(p => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.brand?.length && !filters.brand.includes(p.brand)) return false;
    if (filters.size?.length && !p.sizes.some(s => filters.size.includes(s))) return false;
    if (filters.color?.length && !p.colors.some(c => filters.color.includes(c))) return false;
    if (filters.minPrice && p.finalPrice < filters.minPrice) return false;
    if (filters.maxPrice && p.finalPrice > filters.maxPrice) return false;
    if (filters.minRating && p.rating < filters.minRating) return false;
    if (filters.minDiscount && p.discountPercentage < filters.minDiscount) return false;
    if (filters.inStock && p.stock === 0) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });
};
