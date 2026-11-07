export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  category: "survey" | "solar" | "geotech" | "infrastructure" | "utilities";
  iconName: string;
  features: string[];
  equipmentUsed: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "highways" | "solar" | "railways" | "utilities" | "transmission" | "pipelines";
  categoryLabel: string;
  location: string;
  client: string;
  scope: string;
  year: string;
  metric: string;
  image: string;
  featured?: boolean;
}

export interface EquipmentItem {
  name: string;
  quantity: string;
  make: string;
  model: string;
  purpose: string;
  icon: string;
}

export interface TeamMember {
  name: string;
  designation: string;
  role: string;
  qualification: string;
  experienceYears: number;
  joinedYear: string;
  specialization: string;
  avatar: string;
}

export const COMPANY_PROFILE = {
  name: "HARSH SURVEY CONSULTANCY",
  divisionSolar: "Harsh Survey Consultancy — Solar Services",
  tagline: "Survey, Planning, Drawing, Geotechnical Investigation & Solar Engineering",
  subheading:
    "Empowering Nation-Building Infrastructure with Millimeter-Precision Topography, Geodesic Alignments, DGPS/Total Station Technology & Turnkey Solar Farm Development.",
  establishedYear: 2009,
  headquarters: {
    address: "Harsh House, Plot No: 169, VPO: Deori",
    city: "Agra",
    state: "Uttar Pradesh",
    pincode: "282009",
    country: "India",
  },
  contacts: {
    managingDirector: {
      name: "Ram Kumar",
      title: "Managing Director",
      phones: ["+91 9411692001", "+91 7351982876"],
      emails: ["harshsurveyconsultancy@gmail.com", "ram2010agra@gmail.com"],
      whatsapp: "919411692001",
    },
  },
  stats: [
    { label: "Years of Precision Engineering", value: "15+", suffix: "" },
    { label: "Highway & Route Surveys", value: "1,500+", suffix: "KM" },
    { label: "Urban & Telecom Mapping", value: "7,500+", suffix: "Ha" },
    { label: "Solar Ground Surveys & EPC", value: "37+", suffix: "MW" },
    { label: "Government & Blue-Chip Clients", value: "25+", suffix: "" },
    { label: "Survey Instruments & Total Stations", value: "18+", suffix: "Units" },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: "topographical-survey",
    title: "Topographical & Close Contour Surveys",
    shortDesc:
      "High-precision site topography and close interval contouring using dual-frequency DGPS and electronic Total Stations for infrastructure layouts and site grading.",
    category: "survey",
    iconName: "Mountain",
    features: [
      "Millimeter-level 3D point cloud and spot level grids (5x5m, 10x10m)",
      "Digital Terrain Modeling (DTM) and elevation contour mapping",
      "Demarcation of physical boundary, natural features, water bodies and ROW",
      "Bench Mark (BM) & Temporary Bench Mark (TBM) pillar establishment",
    ],
    equipmentUsed: ["Hemisphere DGPS", "Topcon Total Station", "Sokkia Auto Level"],
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "highway-route-survey",
    title: "Highways, Roads & PMGSY DPR Studies",
    shortDesc:
      "Comprehensive route survey, OGL collection, L-Section, Cross-Section profiling, strip plan development, and alignment staking for NH, SH, and rural road networks.",
    category: "infrastructure",
    iconName: "Route",
    features: [
      "Preparation of Detailed Project Reports (DPR) for PMGSY & State Highways",
      "Longitudinal (L-Section) and Cross-Sectional (X-Section) profiling",
      "Original Ground Level (OGL) data capture and quantity computation (Earthwork)",
      "Detailed Strip Plan preparation with LHS/RHS feature inventory & culvert scheduling",
    ],
    equipmentUsed: ["Electronic Total Stations", "Magellan GPS", "AutoCAD Civil 3D"],
    image:
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "solar-energy-engineering",
    title: "Solar Power Plant Survey & Installation",
    shortDesc:
      "Turnkey solar engineering from pre-feasibility ground survey, 5x5m contour gridding, shadow/tilt analysis to module mounting structure (MMS) alignment and installation.",
    category: "solar",
    iconName: "Sun",
    features: [
      "Utility-scale solar ground survey (Phalodi 22MW, Susner 10MW, Agar 5MW)",
      "High density 5x5m spot level gridding for cut/fill balance & drainage",
      "Piling coordinates layout and MMS table alignment with Total Station",
      "Rooftop & ground-mount installation, wiring, inverter & commissioning",
    ],
    equipmentUsed: ["Hemisphere DGPS", "Topcon GTS", "Global Mapper", "Laser Levels"],
    image:
      "/images/solar-farm.jpg",
  },
  {
    id: "geotechnical-soil-testing",
    title: "Geotechnical Investigation & Soil Testing",
    shortDesc:
      "End-to-end soil analysis, borehole sampling, Plate Load Tests, and Safe Bearing Capacity (SBC) reports essential for heavy foundation engineering and solar piling.",
    category: "geotech",
    iconName: "TestTubes",
    features: [
      "Safe Bearing Capacity (SBC) certified laboratory reports",
      "Standard Penetration Tests (SPT) & Core Soil Sampling",
      "Direct Shear, Atterberg Limits, Grain Size & Moisture analysis",
      "Pull-out test for solar structure piles ensuring seismic & wind stability",
    ],
    equipmentUsed: ["Soil Core Drilling Rigs", "Hydraulic Pull-Out Testing Apparatus", "Soil Testing Lab"],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pipeline-route-surveys",
    title: "Oil & Gas Pipeline Route Surveys",
    shortDesc:
      "Specialized linear route engineering for high-pressure fluid & gas pipelines, detailing road, rail, river, and canal crossings with precision geodesic coordinates.",
    category: "infrastructure",
    iconName: "Workflow",
    features: [
      "Over 70 KM route survey executed for GAIL-AJPL Gas Pipeline",
      "Horizontal Directional Drilling (HDD) crossing profile design",
      "Complete cadastral alignment, pipe corridor strip plans, and landowner boundary",
      "Geodesic curvature and elevation profile for pipeline stress modeling",
    ],
    equipmentUsed: ["Total Station", "DGPS Network", "Global Mapper"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "railway-container-yard",
    title: "Railway Alignment & Freight Logistics Yards",
    shortDesc:
      "Track centerline alignment, rail siding surveys, flying leveling, TBM establishment, and container freight station (CFS) topographic surveys.",
    category: "infrastructure",
    iconName: "Train",
    features: [
      "Manesar to Patli 8.5 KM new rail line survey & DPR execution",
      "Kandla Port Rail Line topography & DGPS traversing",
      "Bhimana Container Yard topographic survey for Hind Terminal Pvt. Ltd.",
      "Track cant, super-elevation, turnout profiling, and clearance verification",
    ],
    equipmentUsed: ["Total Station", "Sokkia Auto Levels", "TBM Pillars"],
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "transmission-line-survey",
    title: "Power Transmission Lines & Substations",
    shortDesc:
      "Complete electrical transmission route planning: preliminary reconnaissance, walkover survey, tower spotting, SAG tension profile, and high-voltage substation grids.",
    category: "infrastructure",
    iconName: "Zap",
    features: [
      "220 KV S/C Badnagar to Runija transmission route & tower schedule",
      "220/400 KV Substation topography & grid control for Power Grid Corp. (PGCIL)",
      "Preparation of Bill of Quantities (BOQ), benching & revetment assessment",
      "Span ground clearance, angle tower positioning & forest clearance mapping",
    ],
    equipmentUsed: ["DGPS", "Total Station", "Magellan GPS"],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "urban-drainage-cad",
    title: "Urban Planning, Townships & Water Drainage",
    shortDesc:
      "Large-scale municipal and corporate utility surveys: water supply pipelines, storm water drainage, underground utility mapping, and town planning master layouts.",
    category: "utilities",
    iconName: "Building2",
    features: [
      "Over 6,500 Hectares telecom utility mapping for HFCL Infotech across Punjab",
      "450+ KM drainage & sewerage survey for UP Jal Nigam (Moradabad, Sambhal, Rampur)",
      "150 Hectare Greater Mohali sector demarcation for GAMADA",
      "RMSI Noida & West Karawal Nagar / Shiv Vihar urban utility digitization",
    ],
    equipmentUsed: ["AutoCAD 2024", "Total Station", "GPS", "Laser Measure"],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "22MW PV Solar Power Project Topography & Contour Survey",
    category: "solar",
    categoryLabel: "Solar Power",
    location: "Phalodi, Rajasthan",
    client: "L&T Power",
    scope:
      "Detailed Topographical survey & contour reference with 5x5m spot levels grid for PV module foundation and substation area.",
    year: "2013",
    metric: "22 MW / 120+ Acres",
    image:
      "/images/solar-farm.jpg",
    featured: true,
  },
  {
    id: "proj-2",
    name: "GAIL Gas Pipeline Route Survey with Major River/Road Crossings",
    category: "pipelines",
    categoryLabel: "Gas Pipeline",
    location: "Dibiyapur, Uttar Pradesh",
    client: "GAIL - AJPL",
    scope:
      "Route survey by Total Station, cross sections with level for all major & minor crossings, HDD profile, and ROW alignment.",
    year: "2013",
    metric: "70 KM Alignment",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "proj-3",
    name: "10MW PV Solar Power Project Survey & Contouring",
    category: "solar",
    categoryLabel: "Solar Power",
    location: "Susner (Agar), Madhya Pradesh",
    client: "Sterling & Wilson Power",
    scope:
      "Topography and contour survey referenced by DGPS control points, 5x5m spot level gridding, and inverter pad positioning.",
    year: "2015",
    metric: "10 MW",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "proj-4",
    name: "Manesar to Patli New Rail Line DPR Survey",
    category: "railways",
    categoryLabel: "Railways",
    location: "Haryana",
    client: "Sarvada Engineering Project Management Pvt. Ltd.",
    scope:
      "DPR preparation for 8.5km rail line: chainage marking, traversing, DGPS and TBM pillar fixing, flying leveling.",
    year: "2018",
    metric: "8.5 KM Rail Corridor",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "proj-5",
    name: "Patiala to Yamuna Nagar SH-06 Road Project",
    category: "highways",
    categoryLabel: "Highways & Roads",
    location: "Punjab - Haryana",
    client: "SGE Consultancy Pvt. Ltd.",
    scope:
      "100 KM Topographical survey, existing chainage marking, traversing, DGPS and TBM pillar fixing, EPC mode flying leveling.",
    year: "2018",
    metric: "100 KM Highway",
    image:
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "proj-6",
    name: "220/400 KV High-Voltage Substation Grid Survey",
    category: "transmission",
    categoryLabel: "Substations",
    location: "Sohawal (Faizabad), Uttar Pradesh",
    client: "Power Grid Corporation of India Ltd. (PGCIL)",
    scope:
      "High-precision contour & topographic survey, boundary coordinates, switchyard layout, and primary geodesic control network.",
    year: "2012",
    metric: "220/400 KV Substation",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: "proj-7",
    name: "HFCL Telecom Infrastructure Utility & Cadastral Survey",
    category: "utilities",
    categoryLabel: "Urban Utilities",
    location: "Bhatinda, Jaito Mandi & Nagal (Punjab)",
    client: "HFCL Infotech Mohali",
    scope:
      "Detailed survey of existing buildings, roads, drains, electric/telephone lines with consumer detail mapping across 3 major districts.",
    year: "2009",
    metric: "6,500 Hectares Total",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-8",
    name: "Kandla Port Rail Line Topography & DPR Survey",
    category: "railways",
    categoryLabel: "Railways & Ports",
    location: "Kandla Port, Gujarat",
    client: "Sarvada Engineering Project Management Pvt. Ltd.",
    scope:
      "DPR preparation for 8.5km port connectivity rail corridor: traversing, DGPS network, and flying leveling TBM.",
    year: "2018",
    metric: "8.5 KM Port Rail",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-9",
    name: "Moradabad Sewerage & Water Planning Master Survey",
    category: "utilities",
    categoryLabel: "Water & Drainage",
    location: "Moradabad, Uttar Pradesh",
    client: "UP Jal Nigam Moradabad",
    scope:
      "Topographic survey for comprehensive drainage & water supply network planning across the municipal corporation.",
    year: "2011",
    metric: "250 KM Line",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-10",
    name: "Pithoragarh to Munsyari Mountain Road DPR",
    category: "highways",
    categoryLabel: "Highways & PMGSY",
    location: "Uttarakhand",
    client: "PMGSY Uttarakhand",
    scope:
      "DPR preparation for 48km hill road: Total Station OGL, L-Section, Cross-Section, culverts, drains, retaining walls, and rock profile.",
    year: "2013",
    metric: "48 KM Hill Road",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-11",
    name: "220 KV S/C Transmission Line Badnagar to Runija",
    category: "transmission",
    categoryLabel: "Transmission Lines",
    location: "Madhya Pradesh",
    client: "M/s Engineering Associates",
    scope:
      "Preliminary reconnaissance, walk-over survey, route survey, tower spotting, SAG calculation, cheek survey, and profiling.",
    year: "2017",
    metric: "220 KV Power Line",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-12",
    name: "Bhimana Container Yard Topographic Survey",
    category: "railways",
    categoryLabel: "Container Yards",
    location: "Rajasthan",
    client: "Hind Terminal Pvt. Ltd.",
    scope:
      "Complete site topography, OGL capture, contour mapping, railway siding connection, and drainage inventory.",
    year: "2018",
    metric: "Multimodal Yard",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-13",
    name: "Beed to Aurangabad NH-211 Road Section",
    category: "highways",
    categoryLabel: "Highways & Roads",
    location: "Maharashtra",
    client: "NPEC Consultancy Pvt. Ltd.",
    scope:
      "50 KM Topographical survey, existing chainage marking, traversing, DGPS and TBM pillar fixing, EPC mode flying leveling.",
    year: "2018",
    metric: "50 KM NH-211",
    image:
      "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-14",
    name: "Greater Mohali New Sector Master Demarcation",
    category: "utilities",
    categoryLabel: "Town Planning",
    location: "Greater Mohali, Punjab",
    client: "GAMADA Mohali",
    scope:
      "Topography survey for each level of colony development: contour survey, road demarcation, plot boundary, utility pipelines.",
    year: "2010",
    metric: "150 Hectares",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "proj-15",
    name: "Honda Industrial Plant Topographical Survey",
    category: "utilities",
    categoryLabel: "Industrial",
    location: "Dharuhera, Haryana",
    client: "Honda (Delhi)",
    scope:
      "Existing detail survey: buildings, roads, underground drainage, spot levels, and expansion zone mapping.",
    year: "2012",
    metric: "110 Hectares",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
];

export const EQUIPMENT: EquipmentItem[] = [
  {
    name: "Differential Global Positioning System (DGPS)",
    quantity: "1 System",
    make: "Hemisphere (USA)",
    model: "Multi-Frequency GNSS",
    purpose: "Primary geodesic ground control, geodetic network, satellite reference",
    icon: "Satellite",
  },
  {
    name: "Electronic Total Stations",
    quantity: "6 Units",
    make: "Topcon / Govin",
    model: "High Precision Optical EDM",
    purpose: "Millimeter-accuracy angle/distance measurements, traversing, staking out",
    icon: "Compass",
  },
  {
    name: "Automatic Levels with Levelling Staffs",
    quantity: "5 Sets",
    make: "Sokkia",
    model: "B-Series Damped Compensator",
    purpose: "Flying leveling, TBM fixing, vertical control & bench mark transfers",
    icon: "Ruler",
  },
  {
    name: "Handheld GPS Systems (±1.5m)",
    quantity: "5 Units",
    make: "Magellan",
    model: "GS20 Sub-meter receiver",
    purpose: "Walkover survey, preliminary route scouting, inventory point geotagging",
    icon: "MapPin",
  },
  {
    name: "Geotechnical Soil Testing & Pile Rig",
    quantity: "Complete Fleet",
    make: "Standard BIS Certified",
    model: "Hydraulic Testing & SPT Core",
    purpose: "SBC evaluation, soil load-bearing capacity, pull-out test for solar piles",
    icon: "TestTubes",
  },
  {
    name: "Plane Tables & Surveyor Compasses",
    quantity: "5 Units",
    make: "Field Equipment",
    model: "Standard Prismatic",
    purpose: "Auxiliary cross-checking and traditional baseline verifications",
    icon: "Layers",
  },
  {
    name: "Laser Distance Measures & Steel Tapes",
    quantity: "7 Sets",
    make: "Industrial Grade",
    model: "High-precision digital laser",
    purpose: "Culvert dimension checks, structure offsets, corridor boundary offsets",
    icon: "Crosshair",
  },
  {
    name: "CAD Engineering Software Suite",
    quantity: "Licensed Suite",
    make: "Autodesk / Global Mapper",
    model: "AutoCAD Civil & Global Mapper",
    purpose: "DTM generation, L-Section/X-Section profiling, contour vectorization",
    icon: "Laptop",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Ram Kumar",
    designation: "Managing Director",
    role: "Overall Strategy, Technical Direction & Geodesic Leadership",
    qualification: "Diploma in Civil Engineering (2010)",
    experienceYears: 15,
    joinedYear: "Founder (2009)",
    specialization: "DGPS Networks, Geodesic Computations & Highway Alignment",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rama Shankar Upreti",
    designation: "Project Director",
    role: "Project Execution & Quality Assurance",
    qualification: "Diploma in Civil Engineering (2005)",
    experienceYears: 20,
    joinedYear: "2014",
    specialization: "Highway Profiling, PMGSY DPRs & Utility Networks",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Suraj Singh",
    designation: "Chief Executive",
    role: "Operations & Client Liaison",
    qualification: "Diploma in Civil Engineering (2003)",
    experienceYears: 22,
    joinedYear: "2014",
    specialization: "Transmission Lines, Gas Pipelines & Railway Siding",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Baljindra Singh",
    designation: "Senior Highway Surveyor",
    role: "AutoCAD & Highway Geometric Design",
    qualification: "I.T.I. in Surveying (2006)",
    experienceYears: 18,
    joinedYear: "2016",
    specialization: "Cross-Section / L-Section, Centerline Staking & OGL",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Sunil Tomer",
    designation: "Senior Surveyor (Layout)",
    role: "Field Traversing & TBM Verification",
    qualification: "I.T.I. in Surveying (2009)",
    experienceYears: 15,
    joinedYear: "2015",
    specialization: "Total Station Traversing & Substation Switchyards",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Kuldeep Singh",
    designation: "Surveyor & AutoCAD Specialist",
    role: "Field Data Download & Digitization",
    qualification: "I.T.I. in Surveying (2013)",
    experienceYears: 11,
    joinedYear: "2014",
    specialization: "Total Station Download, DTM Contouring & Strip Plans",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
];

export const CLIENTS = [
  { name: "L&T Power", type: "EPC & Solar Giant" },
  { name: "GAIL India (AJPL)", type: "Navratna Oil & Gas" },
  { name: "Sterling & Wilson Power", type: "Global Clean Energy" },
  { name: "Power Grid Corporation (PGCIL)", type: "Maharatna Central PSU" },
  { name: "PMGSY Uttarakhand", type: "National Highway / Rural Roads" },
  { name: "UP Jal Nigam", type: "State Water & Urban Drainage" },
  { name: "HFCL Infotech", type: "Telecom & Fiber Infrastructure" },
  { name: "GAMADA Mohali", type: "Urban Development Authority" },
  { name: "RMSI Noida", type: "Geospatial & IT Services" },
  { name: "Hind Terminal Pvt. Ltd.", type: "Rail & Multimodal Logistics" },
  { name: "Sarvada Engineering", type: "Railway Project Management" },
  { name: "Honda (Delhi)", type: "Automobile Manufacturing" },
  { name: "AICON Engineering Bhopal", type: "Highway Infrastructure" },
  { name: "Designilla & NPEC", type: "EPC Highway Contractors" },
];
