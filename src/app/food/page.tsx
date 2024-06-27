import { Category, SearchParams, parseSearchParams } from '../categories';
import LocationsPageComponent, { fetchLocations } from '../locations/locations-page';

export default async function LocationsPage({ searchParams }: { searchParams: SearchParams }) {
    const category:Category = 'food'
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
