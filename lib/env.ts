// Public env vars exposed to the browser. Both are restricted server-side
// (Mapbox: URL-restricted in the Mapbox account; Google Maps: HTTP-referrer
// restricted in Cloud Console) so it's safe for them to ship in the bundle.
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''
export const GMAPS_KEY = process.env.NEXT_PUBLIC_GMAPS_KEY ?? ''
