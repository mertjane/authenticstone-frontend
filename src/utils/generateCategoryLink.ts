export function generateCategoryLink(parentTitle: string, childTitle: string): string {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[&()]/g, '')
      .replace(/-+/g, '-');

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^\w]/g, ''); // removes everything except letters and digits

  const childSlug = slugify(childTitle);
  const normalizedParent = normalize(parentTitle);
  const normalizedChild = normalize(childTitle);

  

  switch (normalizedParent) {
    case 'naturalstonetiles':
      return `/collections/stone-collection/${childSlug}`;
    case 'stoneslabs':
      return `/collections/${childSlug}`;
    case 'stonecolours':
      return `/colour/${childSlug}`;
    case 'usageareas':
      return `/room-type-usage/${childSlug}`;
    case 'stonefinishes':
      return `/finish/${childSlug}`;
    case 'customstonework':
        if (['mouldings', 'skirtings'].includes(normalizedChild)) {
          return `/collections/stone-collection/mouldings-skirtings`;
        }
        return `/collections/custom-stonework/${childSlug}`;
    case 'designpatterncollection':
      return `/collections/design-pattern-collection/${childSlug}`;
    case 'stockclearance':
      return `/stone-collection/${childSlug}`;
    default:
      return '#'; // fallback
  }
}


