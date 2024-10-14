export type RecentSearchStreet = {
	type: string;
	lngLat: [number, number];
	displayTitle: string;
	title: string;
	city: string;
	postcode: string;
};

export type RecentSearchPlace = {
	type: string;
	lngLat: [number, number];
	displayTitle: string;
	country: string;
	city: string;
};

export type RecentSearchPOI = {
	type: string;
	lngLat: [number, number];
	displayTitle: string;
	name: string;
	address: string;
};

export type RecentSearchCountry = {
	type: string;
	lngLat: [number, number];
	displayTitle: string;
	country: string;
};

export type RecentSearchAddress = {
	type: string;
	lngLat: [number, number];
	displayTitle: string;
	address: string;
};	

export type RecentSearchUnknown = {
	type: string;
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