// Real Addis Ababa location and route data extracted from AddisMapTransit
export interface AddisLocation {
  id: string;
  name: string;
  alternativeNames?: string[];
  localizedNames?: Record<string, string>;
  coordinates: [number, number]; // [longitude, latitude]
  address?: string;
  type?: string;
}

export interface BusStop {
  id: string;
  name: string;
  coordinates: [number, number];
  stopOrder: number;
  estimatedTime?: number; // minutes from start
}

export interface BusRoute {
  id: string;
  routeName: string;
  routeNumber: string;
  startLocation: string;
  endLocation: string;
  distance: number; // km
  estimatedDuration: number; // minutes
  farePrice: number; // ETB
  isActive: boolean;
  color: string;
  stops?: BusStop[];
  operatingHours: {
    start: string;
    end: string;
  };
  frequency: number; // minutes between buses
}

// Real locations from AddisMapTransit search.json
export const ADDIS_LOCATIONS: AddisLocation[] = [
  {
    id: "addis_ababa",
    name: "Addis Ababa",
    alternativeNames: ["አዲስ አበባ"],
    localizedNames: { "am": "አዲስ አበባ", "en": "Addis Ababa" },
    coordinates: [38.763611, 9.005401],
    type: "city"
  },
  {
    id: "meskel_square",
    name: "Meskel Square",
    alternativeNames: ["መስቀል አደባባይ"],
    localizedNames: { "am": "መስቀል አደባባይ", "en": "Meskel Square" },
    coordinates: [38.7615397, 9.0106094],
    type: "landmark"
  },
  {
    id: "bole_airport",
    name: "Bole International Airport",
    alternativeNames: ["ቦሌ አለምአቀፍ አውሮፕላን ማረፊያ"],
    localizedNames: { "am": "ቦሌ አለምአቀፍ አውሮፕላን ማረፊያ", "en": "Bole International Airport" },
    coordinates: [38.7938428, 8.9833477],
    type: "airport"
  },
  {
    id: "mercato",
    name: "Mercato",
    alternativeNames: ["መርካቶ"],
    localizedNames: { "am": "መርካቶ", "en": "Mercato" },
    coordinates: [38.7396038, 9.0296278],
    type: "marketplace"
  },
  {
    id: "piazza",
    name: "Piazza",
    alternativeNames: ["ፒያሳ"],
    localizedNames: { "am": "ፒያሳ", "en": "Piazza" },
    coordinates: [38.7547538, 9.0336984],
    type: "area"
  },
  {
    id: "kazanchis",
    name: "Kazanchis",
    alternativeNames: ["ካዛንቺስ"],
    localizedNames: { "am": "ካዛንቺስ", "en": "Kazanchis" },
    coordinates: [38.7712221, 9.0159277],
    type: "area"
  },
  {
    id: "arat_kilo",
    name: "Arat Kilo",
    alternativeNames: ["አራት ኪሎ"],
    localizedNames: { "am": "አራት ኪሎ", "en": "Arat Kilo" },
    coordinates: [38.7633823, 9.0329476],
    type: "area"
  },
  {
    id: "4_kilo",
    name: "4 Kilo",
    alternativeNames: ["አራት ኪሎ"],
    localizedNames: { "am": "አራት ኪሎ", "en": "4 Kilo" },
    coordinates: [38.7632408, 9.0344007],
    type: "area"
  },
  {
    id: "megenagna",
    name: "Megenagna",
    alternativeNames: ["መገናኛ"],
    localizedNames: { "am": "መገናኛ", "en": "Megenagna" },
    coordinates: [38.8016732, 9.0196149],
    type: "area"
  },
  {
    id: "bole",
    name: "Bole",
    alternativeNames: ["ቦሌ"],
    localizedNames: { "am": "ቦሌ", "en": "Bole" },
    coordinates: [38.7933956, 8.9867182],
    type: "area"
  },
  {
    id: "lideta",
    name: "Lideta",
    alternativeNames: ["ልደታ"],
    localizedNames: { "am": "ልደታ", "en": "Lideta" },
    coordinates: [38.7304012, 9.0195026],
    type: "area"
  },
  {
    id: "kirkos",
    name: "Kirkos",
    alternativeNames: ["ቂርቆስ"],
    localizedNames: { "am": "ቂርቆስ", "en": "Kirkos" },
    coordinates: [38.7564134, 9.0023309],
    type: "area"
  },
  {
    id: "addis_ketema",
    name: "Addis Ketema",
    alternativeNames: ["አዲስ ከተማ"],
    localizedNames: { "am": "አዲስ ከተማ", "en": "Addis Ketema" },
    coordinates: [38.7289821, 9.0386175],
    type: "area"
  },
  {
    id: "yeka",
    name: "Yeka",
    alternativeNames: ["የካ"],
    localizedNames: { "am": "የካ", "en": "Yeka" },
    coordinates: [38.8339605, 9.0499765],
    type: "area"
  },
  {
    id: "akaki_kaliti",
    name: "Akaki Kaliti",
    alternativeNames: ["አቃቂ ቃሊቲ"],
    localizedNames: { "am": "አቃቂ ቃሊቲ", "en": "Akaki Kaliti" },
    coordinates: [38.8003557, 8.9013695],
    type: "area"
  },
  {
    id: "nifas_silk_lafto",
    name: "Nifas Silk Lafto",
    alternativeNames: ["ንፋስ ስልክ ላፍቶ"],
    localizedNames: { "am": "ንፋስ ስልክ ላፍቶ", "en": "Nifas Silk Lafto" },
    coordinates: [38.7274968, 8.9577358],
    type: "area"
  },
  {
    id: "kolfe_keranyo",
    name: "Kolfe Keranyo",
    alternativeNames: ["ኮልፌ ቀራኒዎ"],
    localizedNames: { "am": "ኮልፌ ቀራኒዎ", "en": "Kolfe Keranyo" },
    coordinates: [38.6874854, 9.0049643],
    type: "area"
  },
  {
    id: "stadium",
    name: "Stadium",
    alternativeNames: ["እስታዲየም"],
    localizedNames: { "am": "እስታዲየም", "en": "Stadium" },
    coordinates: [38.757777, 9.0119673],
    type: "landmark"
  },
  {
    id: "legehar",
    name: "Legehar",
    alternativeNames: ["ለገሃር"],
    localizedNames: { "am": "ለገሃር", "en": "Legehar" },
    coordinates: [38.753104, 9.0116448],
    type: "area"
  },
  {
    id: "mexico",
    name: "Mexico",
    alternativeNames: ["ሜክሲኮ"],
    localizedNames: { "am": "ሜክሲኮ", "en": "Mexico" },
    coordinates: [38.744549, 9.0103877],
    type: "area"
  },
  {
    id: "tor_hailoch",
    name: "Tor Hailoch",
    alternativeNames: ["ጦር ኃይሎች"],
    localizedNames: { "am": "ጦር ኃይሎች", "en": "Tor Hailoch" },
    coordinates: [38.7229117, 9.0113652],
    type: "area"
  },
  {
    id: "coca_cola",
    name: "Coca Cola",
    alternativeNames: ["ኮካኮላ"],
    localizedNames: { "am": "ኮካኮላ", "en": "Coca Cola" },
    coordinates: [38.7292724, 9.0120564],
    type: "landmark"
  },
  {
    id: "st_lideta",
    name: "St. Lideta",
    alternativeNames: ["ቅድስት ልደታ"],
    localizedNames: { "am": "ቅድስት ልደታ", "en": "St. Lideta" },
    coordinates: [38.7359928, 9.0113665],
    type: "area"
  },
  {
    id: "tegbared",
    name: "Tegbared",
    alternativeNames: ["ተግባረዕድ"],
    localizedNames: { "am": "ተግባረዕድ", "en": "Tegbared" },
    coordinates: [38.7425727, 9.010527],
    type: "area"
  },
  {
    id: "riche",
    name: "Riche",
    alternativeNames: ["ሪቼ"],
    localizedNames: { "am": "ሪቼ", "en": "Riche" },
    coordinates: [38.7604314, 9.0027652],
    type: "area"
  },
  {
    id: "meshwalekya",
    name: "Meshwalekya",
    alternativeNames: ["መሿለኪያ"],
    localizedNames: { "am": "መሿለኪያ", "en": "Meshwalekya" },
    coordinates: [38.7587009, 9.0076487],
    type: "area"
  },
  {
    id: "temenja_yazh",
    name: "Temenja Yazh",
    alternativeNames: ["ጠመንጃያዥ"],
    localizedNames: { "am": "ጠመንጃያዥ", "en": "Temenja Yazh" },
    coordinates: [38.7596421, 8.9953506],
    type: "area"
  },
  {
    id: "lancha",
    name: "Lancha",
    alternativeNames: ["ላንቻ"],
    localizedNames: { "am": "ላንቻ", "en": "Lancha" },
    coordinates: [38.7597577, 8.989616],
    type: "area"
  },
  {
    id: "gotera",
    name: "Gotera",
    alternativeNames: ["ጎተራ"],
    localizedNames: { "am": "ጎተራ", "en": "Gotera" },
    coordinates: [38.7584682, 8.9820782],
    type: "area"
  },
  {
    id: "kera",
    name: "Kera",
    alternativeNames: ["ቄራ"],
    localizedNames: { "am": "ቄራ", "en": "Kera" },
    coordinates: [38.7502416, 8.9847803],
    type: "area"
  },
  {
    id: "saris",
    name: "Saris",
    alternativeNames: ["ሳሪስ"],
    localizedNames: { "am": "ሳሪስ", "en": "Saris" },
    coordinates: [38.7636211, 8.9532491],
    type: "area"
  },
  {
    id: "nifas_silk_1",
    name: "Nifas Silk 1",
    alternativeNames: ["ንፋስ ስልክ 1"],
    localizedNames: { "am": "ንፋስ ስልክ 1", "en": "Nifas Silk 1" },
    coordinates: [38.7629649, 8.9656989],
    type: "bus_stop"
  },
  {
    id: "nifas_silk_2",
    name: "Nifas Silk 2",
    alternativeNames: ["ንፋስ ስልክ 2"],
    localizedNames: { "am": "ንፋስ ስልክ 2", "en": "Nifas Silk 2" },
    coordinates: [38.7607564, 8.9731053],
    type: "bus_stop"
  },
  {
    id: "abo_junction",
    name: "Abo Junction",
    alternativeNames: ["አቦ ማዞሪያ"],
    localizedNames: { "am": "አቦ ማዞሪያ", "en": "Abo Junction" },
    coordinates: [38.7662787, 8.9449579],
    type: "junction"
  },
  {
    id: "kality",
    name: "Kality",
    alternativeNames: ["ቃሊቲ"],
    localizedNames: { "am": "ቃሊቲ", "en": "Kality" },
    coordinates: [38.7630345, 8.9379944],
    type: "area"
  },
  {
    id: "hayahulet_1",
    name: "Hayahulet 1",
    alternativeNames: ["ሃያ ሁለት 1"],
    localizedNames: { "am": "ሃያ ሁለት 1", "en": "Hayahulet 1" },
    coordinates: [38.7893254, 9.016216],
    type: "bus_stop"
  },
  {
    id: "hayahulet_2",
    name: "Hayahulet 2",
    alternativeNames: ["ሃያ ሁለት 2"],
    localizedNames: { "am": "ሃያ ሁለት 2", "en": "Hayahulet 2" },
    coordinates: [38.7832421, 9.0148763],
    type: "bus_stop"
  },
  {
    id: "lem_hotel",
    name: "Lem Hotel",
    alternativeNames: ["ለም ሆቴል"],
    localizedNames: { "am": "ለም ሆቴል", "en": "Lem Hotel" },
    coordinates: [38.7959087, 9.0179073],
    type: "landmark"
  },
  {
    id: "gurd_sholla_1",
    name: "Gurd Sholla 1",
    alternativeNames: ["ጉርድ ሾላ 1"],
    localizedNames: { "am": "ጉርድ ሾላ 1", "en": "Gurd Sholla 1" },
    coordinates: [38.8199558, 9.0190934],
    type: "bus_stop"
  },
  {
    id: "gurd_sholla_2",
    name: "Gurd Sholla 2",
    alternativeNames: ["ጉርድ ሾላ 2"],
    localizedNames: { "am": "ጉርድ ሾላ 2", "en": "Gurd Sholla 2" },
    coordinates: [38.8101942, 9.0202215],
    type: "bus_stop"
  },
  {
    id: "management_institute",
    name: "Management Institute",
    alternativeNames: ["ሥራ አመራር ኢንስቲዩት"],
    localizedNames: { "am": "ሥራ አመራር ኢንስቲዩት", "en": "Management Institute" },
    coordinates: [38.8283708, 9.0208538],
    type: "landmark"
  },
  {
    id: "st_michael",
    name: "St. Michael",
    alternativeNames: ["ቅ. ሚካኤል"],
    localizedNames: { "am": "ቅ. ሚካኤል", "en": "St. Michael" },
    coordinates: [38.8426094, 9.0214017],
    type: "landmark"
  },
  {
    id: "cmc",
    name: "C.M.C",
    alternativeNames: ["ሲ.ኤም.ሲ"],
    localizedNames: { "am": "ሲ.ኤም.ሲ", "en": "C.M.C" },
    coordinates: [38.8504569, 9.0209903],
    type: "area"
  },
  {
    id: "meri",
    name: "Meri",
    alternativeNames: ["መሪ"],
    localizedNames: { "am": "መሪ", "en": "Meri" },
    coordinates: [38.8603712, 9.020597],
    type: "area"
  },
  {
    id: "ayat",
    name: "Ayat",
    alternativeNames: ["አያት"],
    localizedNames: { "am": "አያት", "en": "Ayat" },
    coordinates: [38.8460555, 9.0345734],
    type: "area"
  }
];

// Real bus routes based on Addis Ababa public transport system
export const ADDIS_BUS_ROUTES: BusRoute[] = [
  {
    id: "route_001",
    routeName: "Meskel Square - Bole Airport",
    routeNumber: "001",
    startLocation: "Meskel Square",
    endLocation: "Bole International Airport",
    distance: 8.5,
    estimatedDuration: 35,
    farePrice: 15,
    isActive: true,
    color: "#2563eb",
    operatingHours: { start: "05:30", end: "22:00" },
    frequency: 15,
    stops: [
      { id: "stop_001_01", name: "Meskel Square", coordinates: [38.7615397, 9.0106094], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_001_02", name: "Kazanchis", coordinates: [38.7712221, 9.0159277], stopOrder: 2, estimatedTime: 8 },
      { id: "stop_001_03", name: "Hayahulet 2", coordinates: [38.7832421, 9.0148763], stopOrder: 3, estimatedTime: 15 },
      { id: "stop_001_04", name: "Megenagna", coordinates: [38.8016732, 9.0196149], stopOrder: 4, estimatedTime: 22 },
      { id: "stop_001_05", name: "Bole", coordinates: [38.7933956, 8.9867182], stopOrder: 5, estimatedTime: 30 },
      { id: "stop_001_06", name: "Bole International Airport", coordinates: [38.7938428, 8.9833477], stopOrder: 6, estimatedTime: 35 }
    ]
  },
  {
    id: "route_002",
    routeName: "Mercato - Piazza",
    routeNumber: "002",
    startLocation: "Mercato",
    endLocation: "Piazza",
    distance: 4.2,
    estimatedDuration: 25,
    farePrice: 8,
    isActive: true,
    color: "#dc2626",
    operatingHours: { start: "05:00", end: "23:00" },
    frequency: 10,
    stops: [
      { id: "stop_002_01", name: "Mercato", coordinates: [38.7396038, 9.0296278], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_002_02", name: "Addis Ketema", coordinates: [38.7289821, 9.0386175], stopOrder: 2, estimatedTime: 8 },
      { id: "stop_002_03", name: "Arat Kilo", coordinates: [38.7633823, 9.0329476], stopOrder: 3, estimatedTime: 15 },
      { id: "stop_002_04", name: "Piazza", coordinates: [38.7547538, 9.0336984], stopOrder: 4, estimatedTime: 25 }
    ]
  },
  {
    id: "route_003",
    routeName: "Tor Hailoch - Stadium",
    routeNumber: "003",
    startLocation: "Tor Hailoch",
    endLocation: "Stadium",
    distance: 6.8,
    estimatedDuration: 30,
    farePrice: 12,
    isActive: true,
    color: "#16a34a",
    operatingHours: { start: "05:30", end: "22:30" },
    frequency: 12,
    stops: [
      { id: "stop_003_01", name: "Tor Hailoch", coordinates: [38.7229117, 9.0113652], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_003_02", name: "Coca Cola", coordinates: [38.7292724, 9.0120564], stopOrder: 2, estimatedTime: 5 },
      { id: "stop_003_03", name: "St. Lideta", coordinates: [38.7359928, 9.0113665], stopOrder: 3, estimatedTime: 12 },
      { id: "stop_003_04", name: "Tegbared", coordinates: [38.7425727, 9.010527], stopOrder: 4, estimatedTime: 18 },
      { id: "stop_003_05", name: "Mexico", coordinates: [38.744549, 9.0103877], stopOrder: 5, estimatedTime: 22 },
      { id: "stop_003_06", name: "Legehar", coordinates: [38.753104, 9.0116448], stopOrder: 6, estimatedTime: 26 },
      { id: "stop_003_07", name: "Stadium", coordinates: [38.757777, 9.0119673], stopOrder: 7, estimatedTime: 30 }
    ]
  },
  {
    id: "route_004",
    routeName: "Kality - Meskel Square",
    routeNumber: "004",
    startLocation: "Kality",
    endLocation: "Meskel Square",
    distance: 12.3,
    estimatedDuration: 45,
    farePrice: 18,
    isActive: true,
    color: "#7c3aed",
    operatingHours: { start: "05:00", end: "22:00" },
    frequency: 20,
    stops: [
      { id: "stop_004_01", name: "Kality", coordinates: [38.7630345, 8.9379944], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_004_02", name: "Abo Junction", coordinates: [38.7662787, 8.9449579], stopOrder: 2, estimatedTime: 8 },
      { id: "stop_004_03", name: "Saris", coordinates: [38.7636211, 8.9532491], stopOrder: 3, estimatedTime: 15 },
      { id: "stop_004_04", name: "Nifas Silk 1", coordinates: [38.7629649, 8.9656989], stopOrder: 4, estimatedTime: 22 },
      { id: "stop_004_05", name: "Nifas Silk 2", coordinates: [38.7607564, 8.9731053], stopOrder: 5, estimatedTime: 28 },
      { id: "stop_004_06", name: "Lancha", coordinates: [38.7597577, 8.989616], stopOrder: 6, estimatedTime: 35 },
      { id: "stop_004_07", name: "Temenja Yazh", coordinates: [38.7596421, 8.9953506], stopOrder: 7, estimatedTime: 40 },
      { id: "stop_004_08", name: "Meskel Square", coordinates: [38.7615397, 9.0106094], stopOrder: 8, estimatedTime: 45 }
    ]
  },
  {
    id: "route_005",
    routeName: "Megenagna - Ayat",
    routeNumber: "005",
    startLocation: "Megenagna",
    endLocation: "Ayat",
    distance: 9.7,
    estimatedDuration: 40,
    farePrice: 16,
    isActive: true,
    color: "#ea580c",
    operatingHours: { start: "06:00", end: "21:30" },
    frequency: 18,
    stops: [
      { id: "stop_005_01", name: "Megenagna", coordinates: [38.8016732, 9.0196149], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_005_02", name: "Gurd Sholla 2", coordinates: [38.8101942, 9.0202215], stopOrder: 2, estimatedTime: 8 },
      { id: "stop_005_03", name: "Gurd Sholla 1", coordinates: [38.8199558, 9.0190934], stopOrder: 3, estimatedTime: 15 },
      { id: "stop_005_04", name: "Management Institute", coordinates: [38.8283708, 9.0208538], stopOrder: 4, estimatedTime: 22 },
      { id: "stop_005_05", name: "St. Michael", coordinates: [38.8426094, 9.0214017], stopOrder: 5, estimatedTime: 28 },
      { id: "stop_005_06", name: "C.M.C", coordinates: [38.8504569, 9.0209903], stopOrder: 6, estimatedTime: 33 },
      { id: "stop_005_07", name: "Meri", coordinates: [38.8603712, 9.020597], stopOrder: 7, estimatedTime: 37 },
      { id: "stop_005_08", name: "Ayat", coordinates: [38.8460555, 9.0345734], stopOrder: 8, estimatedTime: 40 }
    ]
  },
  {
    id: "route_006",
    routeName: "Lideta - Kirkos",
    routeNumber: "006",
    startLocation: "Lideta",
    endLocation: "Kirkos",
    distance: 5.4,
    estimatedDuration: 28,
    farePrice: 10,
    isActive: true,
    color: "#0891b2",
    operatingHours: { start: "05:30", end: "22:30" },
    frequency: 15,
    stops: [
      { id: "stop_006_01", name: "Lideta", coordinates: [38.7304012, 9.0195026], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_006_02", name: "Addis Ketema", coordinates: [38.7289821, 9.0386175], stopOrder: 2, estimatedTime: 10 },
      { id: "stop_006_03", name: "Meshwalekya", coordinates: [38.7587009, 9.0076487], stopOrder: 3, estimatedTime: 18 },
      { id: "stop_006_04", name: "Riche", coordinates: [38.7604314, 9.0027652], stopOrder: 4, estimatedTime: 23 },
      { id: "stop_006_05", name: "Kirkos", coordinates: [38.7564134, 9.0023309], stopOrder: 5, estimatedTime: 28 }
    ]
  },
  {
    id: "route_007",
    routeName: "Yeka - Kolfe Keranyo",
    routeNumber: "007",
    startLocation: "Yeka",
    endLocation: "Kolfe Keranyo",
    distance: 15.2,
    estimatedDuration: 55,
    farePrice: 22,
    isActive: true,
    color: "#be185d",
    operatingHours: { start: "05:00", end: "21:00" },
    frequency: 25,
    stops: [
      { id: "stop_007_01", name: "Yeka", coordinates: [38.8339605, 9.0499765], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_007_02", name: "Ayat", coordinates: [38.8460555, 9.0345734], stopOrder: 2, estimatedTime: 12 },
      { id: "stop_007_03", name: "Megenagna", coordinates: [38.8016732, 9.0196149], stopOrder: 3, estimatedTime: 25 },
      { id: "stop_007_04", name: "Kazanchis", coordinates: [38.7712221, 9.0159277], stopOrder: 4, estimatedTime: 35 },
      { id: "stop_007_05", name: "Arat Kilo", coordinates: [38.7633823, 9.0329476], stopOrder: 5, estimatedTime: 42 },
      { id: "stop_007_06", name: "Addis Ketema", coordinates: [38.7289821, 9.0386175], stopOrder: 6, estimatedTime: 48 },
      { id: "stop_007_07", name: "Kolfe Keranyo", coordinates: [38.6874854, 9.0049643], stopOrder: 7, estimatedTime: 55 }
    ]
  },
  {
    id: "route_008",
    routeName: "Akaki Kaliti - Nifas Silk Lafto",
    routeNumber: "008",
    startLocation: "Akaki Kaliti",
    endLocation: "Nifas Silk Lafto",
    distance: 11.8,
    estimatedDuration: 48,
    farePrice: 20,
    isActive: true,
    color: "#059669",
    operatingHours: { start: "05:30", end: "21:30" },
    frequency: 22,
    stops: [
      { id: "stop_008_01", name: "Akaki Kaliti", coordinates: [38.8003557, 8.9013695], stopOrder: 1, estimatedTime: 0 },
      { id: "stop_008_02", name: "Kality", coordinates: [38.7630345, 8.9379944], stopOrder: 2, estimatedTime: 15 },
      { id: "stop_008_03", name: "Saris", coordinates: [38.7636211, 8.9532491], stopOrder: 3, estimatedTime: 25 },
      { id: "stop_008_04", name: "Nifas Silk 1", coordinates: [38.7629649, 8.9656989], stopOrder: 4, estimatedTime: 32 },
      { id: "stop_008_05", name: "Nifas Silk 2", coordinates: [38.7607564, 8.9731053], stopOrder: 5, estimatedTime: 38 },
      { id: "stop_008_06", name: "Gotera", coordinates: [38.7584682, 8.9820782], stopOrder: 6, estimatedTime: 43 },
      { id: "stop_008_07", name: "Nifas Silk Lafto", coordinates: [38.7274968, 8.9577358], stopOrder: 7, estimatedTime: 48 }
    ]
  }
];

// Search functions
export function searchLocations(query: string): AddisLocation[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return ADDIS_LOCATIONS.filter(location => {
    // Search in main name
    if (location.name.toLowerCase().includes(normalizedQuery)) return true;
    
    // Search in alternative names
    if (location.alternativeNames?.some(name => 
      name.toLowerCase().includes(normalizedQuery)
    )) return true;
    
    // Search in localized names
    if (location.localizedNames && Object.values(location.localizedNames).some(name => 
      name.toLowerCase().includes(normalizedQuery)
    )) return true;
    
    return false;
  }).slice(0, 10); // Limit to 10 results
}

export function getLocationCoordinates(locationName: string): [number, number] | null {
  const location = ADDIS_LOCATIONS.find(loc => 
    loc.name.toLowerCase() === locationName.toLowerCase() ||
    loc.alternativeNames?.some(name => name.toLowerCase() === locationName.toLowerCase()) ||
    (loc.localizedNames && Object.values(loc.localizedNames).some(name => 
      name.toLowerCase() === locationName.toLowerCase()
    ))
  );
  
  return location ? location.coordinates : null;
}

export function findRoutesBetweenLocations(from: string, to: string): BusRoute[] {
  if (!from || !to) return [];
  
  const normalizeLocation = (location: string) => location.toLowerCase().trim();
  const normalizedFrom = normalizeLocation(from);
  const normalizedTo = normalizeLocation(to);
  
  return ADDIS_BUS_ROUTES.filter(route => {
    const routeStops = route.stops || [];
    const allStopNames = [
      route.startLocation,
      route.endLocation,
      ...routeStops.map(stop => stop.name)
    ].map(name => normalizeLocation(name));
    
    const hasFromLocation = allStopNames.some(stopName => 
      stopName.includes(normalizedFrom) || normalizedFrom.includes(stopName)
    );
    
    const hasToLocation = allStopNames.some(stopName => 
      stopName.includes(normalizedTo) || normalizedTo.includes(stopName)
    );
    
    return hasFromLocation && hasToLocation && route.isActive;
  }).sort((a, b) => {
    // Sort by estimated duration (fastest first)
    return a.estimatedDuration - b.estimatedDuration;
  });
}

export function getRouteById(routeId: string): BusRoute | null {
  return ADDIS_BUS_ROUTES.find(route => route.id === routeId) || null;
}

export function getAllActiveRoutes(): BusRoute[] {
  return ADDIS_BUS_ROUTES.filter(route => route.isActive);
}

export function getPopularRoutes(): BusRoute[] {
  // Return routes sorted by popularity (frequency and usage)
  return ADDIS_BUS_ROUTES
    .filter(route => route.isActive)
    .sort((a, b) => {
      // Sort by frequency (more frequent = more popular)
      return a.frequency - b.frequency;
    })
    .slice(0, 6);
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  coord1: [number, number], 
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Find nearest locations to given coordinates
export function findNearestLocations(
  coordinates: [number, number], 
  maxDistance: number = 2
): AddisLocation[] {
  return ADDIS_LOCATIONS
    .map(location => ({
      ...location,
      distance: calculateDistance(coordinates, location.coordinates)
    }))
    .filter(location => location.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
}