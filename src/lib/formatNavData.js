export const formatNavData = navData => {
  const menuAttachedItems = navData.filter(item => item.menuAttached === true);
  const asideNavItems = navData;

  return {
    top: menuAttachedItems,
    aside: asideNavItems,
  };
};
