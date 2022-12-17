const Menu = [
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'mdi-home-city',
    name: 'Dashboard',
    action: '/'
  },
  { header: 'Store' },
  {
    title: 'Store',
    group: 'Store',
    icon: 'mdi-store-cog',
    items: [
      { name: 'attributes', title: 'Attributes', action: shop => (`/${shop}/attributes`), icon: 'mdi-store-outline' },
      { name: 'products', title: 'Products', badge: 'new', action: shop => (`/${shop}/products`), icon: 'mdi-store-plus' }
    ]
  }
]
// reorder menu
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      const textA = x.title.toUpperCase()
      const textB = y.title.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }
})

export default Menu
