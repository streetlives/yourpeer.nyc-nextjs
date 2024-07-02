import { Category, SearchParams, parseSearchParams } from '../common';
import LocationsPageComponent, { fetchLocations } from '../locations/locations-page';

export default async function LocationsPage({ searchParams }: { searchParams: SearchParams }) {
    const category:Category = 'personal-care'
    const parsedSearchParams = parseSearchParams(searchParams);
    return (
      <LocationsPageComponent
        category={category}
        locationDataResponse={await fetchLocations(category, parsedSearchParams)}
        parsedSearchParams={parsedSearchParams}
        searchParams={searchParams}
      />
    );
}
