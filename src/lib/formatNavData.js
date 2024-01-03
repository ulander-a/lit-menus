export const formatNavData = (navData, currentAudience) => {
  const filterByAudience = items =>
    items
      .filter(item => {
        const hasAudience = item.audience?.length > 0;
        const isValidAudience =
          hasAudience && item.audience.includes(currentAudience);

        return hasAudience ? isValidAudience : true;
      })
      .map(item => ({
        ...item,
        items: item.items ? filterByAudience(item.items) : undefined,
      }));

  const filteredByAudience = filterByAudience(navData);

  const menuAttachedItems = filteredByAudience.filter(
    item => item.menuAttached
  );

  return {
    top: menuAttachedItems,
    aside: filteredByAudience,
  };
};
