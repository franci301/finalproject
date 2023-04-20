const toRadians = (degree) => degree * (Math.PI / 180);

/**
 * @param {number} limit - range specified by the user
 * @param {number} lat1 - latitude
 * @param {number} lon1 - longitude
 * @param {number} lat2 - latitude
 * @param {number} lon2 - longitude
 */
export default function CalculateValidDistance (limit,lat1, lon1, lat2, lon2) {
  const R = 6371; // radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= limit;
}