export type RecentSearchStreet = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
	title: string | undefined;
	city: string | undefined;
	postcode: string | undefined;
};

export type RecentSearchPlace = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
	country: string | undefined;
	city: string | undefined;
};

export type RecentSearchPOI = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
	name: string | undefined;
	address: string | undefined;
};

export type RecentSearchCountry = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
	country: string | undefined;
};

export type RecentSearchAddress = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
	address: string | undefined;
};	

export type RecentSearchUnknown = {
	type: string | undefined;
	lngLat: [number, number];
	displayTitle: string;
};

export type RecentSearch =
	| RecentSearchStreet
	| RecentSearchPlace
	| RecentSearchPOI
	| RecentSearchCountry
	| RecentSearchAddress
	| RecentSearchUnknown;