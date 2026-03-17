export const HOTEL = {
  name: "Numa Rotterdam Coolsingel",
  lat: 51.9225,
  lng: 4.4792,
};

export interface POI {
  id: string;
  name: string;
  walkTime: string;
  rating: number;
  description: string;
  lat: number;
  lng: number;
  image: string;
}

export const POIS: POI[] = [
  {
    id: "markthal",
    name: "Markthal Rotterdam",
    walkTime: "5 min walk",
    rating: 4.4,
    description:
      "Iconic horseshoe-shaped market hall with a stunning painted ceiling, housing over 100 food stalls and restaurants.",
    lat: 51.9201,
    lng: 4.4867,
    image: "/map/markthal.jpg",
  },
  {
    id: "cube-houses",
    name: "Kubuswoningen",
    walkTime: "7 min walk",
    rating: 4.2,
    description:
      "Tilted cube-shaped houses designed by Piet Blom in 1984. One is open as a museum so visitors can experience the interior.",
    lat: 51.9207,
    lng: 4.4903,
    image: "/map/cube-houses.jpg",
  },
  {
    id: "depot",
    name: "Depot Boijmans",
    walkTime: "15 min walk",
    rating: 4.3,
    description:
      "The world's first publicly accessible art depot, a mirrored bowl-shaped building with a rooftop garden and panoramic views.",
    lat: 51.914,
    lng: 4.472,
    image: "/map/depot.jpg",
  },
  {
    id: "erasmus-bridge",
    name: "Erasmusbrug",
    walkTime: "10 min walk",
    rating: 4.6,
    description:
      "Rotterdam's iconic 800-meter cable-stayed bridge nicknamed 'The Swan,' connecting north and south across the Nieuwe Maas.",
    lat: 51.9095,
    lng: 4.4868,
    image: "/map/erasmus-bridge.jpg",
  },
  {
    id: "wereldmuseum",
    name: "Wereldmuseum",
    walkTime: "12 min walk",
    rating: 4.3,
    description:
      "World culture museum in a 19th-century waterfront building, showcasing ethnographic collections from Asia, Africa, and the Americas.",
    lat: 51.913,
    lng: 4.483,
    image: "/map/wereldmuseum.jpg",
  },
  {
    id: "het-park",
    name: "Het Park",
    walkTime: "18 min walk",
    rating: 4.5,
    description:
      "English-style landscape park along the river, perfect for walks and picnics with views of the Euromast tower.",
    lat: 51.909,
    lng: 4.469,
    image: "/map/het-park.jpg",
  },
  {
    id: "laurenskerk",
    name: "Laurenskerk",
    walkTime: "4 min walk",
    rating: 4.5,
    description:
      "The only remaining medieval building in Rotterdam's center, a 15th-century church with a stunning organ.",
    lat: 51.921,
    lng: 4.4878,
    image: "/map/laurenskerk.jpg",
  },
];
