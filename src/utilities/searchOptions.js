const years = [
  {
    value: "20169",
    label: "'16 Fall - '17 Winter",
    short_label: "'16-'17 FW",
  },
  {
    value: "20175",
    label: "'17 Summer",
    short_label: "'17 S",
  },
  {
    value: "20179",
    label: "'17 Fall - '18 Winter",
    short_label: "'17-'18 FW",
  },
  {
    value: "20185",
    label: "'18 Summer",
    short_label: "'18 S",
  },
  {
    value: "20189",
    label: "'18 Fall - '19 Winter",
    short_label: "'18-'19 FW",
  },
  {
    value: "20195",
    label: "'19 Summer",
    short_label: "'19 S",
  },
  {
    value: "20199",
    label: "'19 Fall - '20 Winter",
    short_label: "'19-'20 FW",
  },
  {
    value: "20205",
    label: "'20 Summer",
    short_label: "'20 S",
  },
  {
    value: "20209",
    label: "'20 Fall - '21 Winter",
    short_label: "'20-'21 FW",
  },
  {
    value: "20215",
    label: "'21 Summer",
    short_label: "'21 S",
  },
  {
    value: "20219",
    label: "'21 Fall - '22 Winter",
    short_label: "'21-'22 FW",
  },
];

const sessions = [
  "20169",
  "20175",
  "20179",
  "20185",
  "20189",
  "20195",
  "20199",
  "20205",
  "20209",
  "20215",
  "20219",
];

const instances = sessions.flatMap((v) => [
  { session: v, section: "f" },
  { session: v, section: "s" },
  { session: v, section: "y" },
]);

const deptCodes = (
  "ABP/ACT/AFR/AMS/ANA/ANT/APM/ARC/ARH/AST/BCB/BCH/" +
  "BIO/BMS/BPM/CAR/CAS/CDN/CHC/CHM/CIN/CJH/CJS/CLA/" +
  "CLT/COG/COL/CRE/CRI/CSB/CSC/CSE/CTA/DHU/DRM/DTS/" +
  "EAS/ECE/ECO/EDS/EDU/EEB/EHJ/ELL/ENG/ENT/ENV/ESS/" +
  "EST/ETH/EUR/FAH/FCS/FIN/FOR/FRE/FSL/GER/GGR/GRK/" +
  "HAJ/HIS/HMB/HPS/HST/HUN/IFP/IMC/IMM/INI/INS/IRE/" +
  "ITA/IVP/JAH/JAL/JAR/JCA/JCC/JCI/JDC/JEE/JEG/JEH/" +
  "JEI/JFE/JFG/JFL/JFP/JFV/JGA/JGE/JGI/JGJ/JGU/JHA/" +
  "JHE/JHN/JHP/JIA/JIG/JLN/JLP/JLS/JMB/JNH/JNR/JNS/" +
  "JOP/JPA/JPD/JPE/JPF/JPH/JPI/JPM/JPP/JPR/JPS/JPU/" +
  "JQR/JRA/JSC/JSH/JSR/JSU/JSV/JUG/JUM/JWE/LAS/LAT/" +
  "LCT/LIN/LMP/MAT/MCS/MGR/MGT/MGY/MHB/MIJ/MST/MUN/" +
  "MUS/NEW/NFS/NMC/NML/NUS/PCJ/PCL/PHC/PHL/PHS/PHY/" +
  "PLN/POL/PPG/PRT/PSL/PSY/REN/RLG/RSM/SAS/SDS/SLA/" +
  "SMC/SOC/SPA/STA/SWE/SWK/TRN/UNI/URB/USA/UTP/VIC/" +
  "WDW/WGS/WRR"
).split("/");

const daytime = [
  {
    value: "AM",
    label: "Morning",
  },
  {
    value: "PM",
    label: "Afternoon",
  },
  {
    value: "EVE",
    label: "Evening",
  },
];

const studyYears = [
  {
    value: "1",
    label: "100-level",
  },
  {
    value: "2",
    label: "200-level",
  },
  {
    value: "3",
    label: "300-level",
  },
  {
    value: "4",
    label: "400-level",
  },
];

const weekdays = [
  {
    value: "MO",
    label: "Mon",
  },
  {
    value: "TU",
    label: "Tue",
  },
  {
    value: "WE",
    label: "Wed",
  },
  {
    value: "TH",
    label: "Thu",
  },
  {
    value: "FR",
    label: "Fri",
  },
];

const breadth = [
  {
    value: "1",
    label: "Creative and Cultural Representations (1)",
  },
  {
    value: "2",
    label: "Thought, Belief and Behaviour (2)",
  },
  {
    value: "3",
    label: "Society and its Institutions (3)",
  },
  {
    value: "4",
    label: "Living Things and Their Environment (4)",
  },
  {
    value: "5",
    label: "The Physical and Mathematical Universes (5)",
  },
];

const deliveryModes = [
  {
    value: "ONLSYNC",
    label: "Online - Synchronous",
  },
  {
    value: "ONLASYNC",
    label: "Online - Asynchronous",
  },
  {
    value: "CLASS",
    label: "In-person",
  },
];

const sections = [
  {
    value: "F",
    label: "Fall (F)",
  },
  {
    value: "S",
    label: "Winter (S)",
  },
  {
    value: "Y",
    label: "Year (Y)",
  },
];

const departments = [
  { value: "CSUS", label: "American Studies (AMS) (USA)" },
  { value: "ANA", label: "Anatomy (ANA)" },
  {
    value: "ANT",
    label: "Anthropology (ANT) (ARH) (HAJ) (JAH) (JAL) (JAR) (JGA)",
  },
  {
    value: "ARCLA",
    label: "Architecture, Landscape & Design, Faculty of (FOR) (ARC)",
  },
  { value: "FAR", label: "Art History (FAH)" },
  { value: "AST", label: "Astronomy & Astrophysics (AST) (JCA) (PLN)" },
  { value: "BCH", label: "Biochemistry (BCH)" },
  {
    value: "CITA",
    label: "Canadian Institute for Theoretical Astrophysics (CTA)",
  },
  { value: "CSB", label: "Cell and Systems Biology (CSB) (BCB) (BIO) (CJH)" },
  { value: "CHM", label: "Chemistry (CHM) (JCC) (JSC) (NUS) (PHC)" },
  { value: "CINE", label: "Cinema Studies (CIN)" },
  { value: "CLAS", label: "Classics (CLA) (GRK) (LAT)" },
  { value: "COL", label: "Comparative Literature (COL) (JDC)" },
  { value: "CSC", label: "Computer Science (CSC) (COG) (ECE) (JCC) (JSC)" },
  { value: "OISUT", label: "Concurrent Teacher Education Program (EDU)" },
  { value: "ASI", label: "Contemporary Asian Studies (CAS) (JHA) (JPA) (SAS)" },
  {
    value: "CRIM",
    label: "Criminology and Sociolegal Studies, Centre for (CRI)",
  },
  { value: "DTS", label: "Diaspora and Transnational Studies (DTS)" },
  {
    value: "DRAMA",
    label:
      "Drama, Theatre and Performance Studies, Centre for (DRM) (JDC) (JIA)",
  },
  {
    value: "ES",
    label: "Earth Sciences (ESS) (JEG) (JGA) (ENV) (JEE) (JPA) (JPE)",
  },
  { value: "EAS", label: "East Asian Studies (EAS)" },
  {
    value: "EEB",
    label:
      "Ecology & Evolutionary Biology (EEB) (BIO) (EHJ) (ENV) (JMB) (JHE) (NUS)",
  },
  { value: "ECO", label: "Economics (ECO)" },
  { value: "ENG", label: "English (ENG) (JEI) (JWE)" },
  { value: "ENT", label: "Entrepreneurship, Centre for (IMC) (ENT)" },
  { value: "ENVMT", label: "Environment, School of (ENV) (JEE) (JEH) (JGE)" },
  { value: "ETHIC", label: "Ethics, Centre for (ETH)" },
  { value: "CERES", label: "European Studies (EUR) (HUN) (MGR) (JRA)" },
  { value: "FRE", label: "French (FRE) (FCS) (FSL) (JFG) (JFL) (JFV)" },
  {
    value: "GGR",
    label: "Geography (GGR) (JFG) (JFE) (JGE) (JGI) (JUG) (JEG) (JGU) (JIG)",
  },
  { value: "GER", label: "German (GER) (JFG) (JGJ)" },
  { value: "HIS", label: "History (HIS) (JHA) (JHP) (JHN) (JSH) (JAH)" },
  {
    value: "IHPST",
    label: "History and Philosophy of Science and Technology (HPS) (JHE) (JPH)",
  },
  {
    value: "HMB",
    label: "Human Biology (HMB) (CJH) (HAJ) (JEH) (EHJ) (JHA) (JNH)",
  },
  { value: "IMM", label: "Immunology (IMM) (MIJ)" },
  { value: "ASABS", label: "Indigenous Studies (INS) (JFP) (JIG) (JPI)" },
  {
    value: "IRE",
    label: "Industrial Relations and Human Resources, Centre for (IRE)",
  },
  {
    value: "INNIS",
    label: "Innis College (INI) (JGI) (JEI) (JGU) (JWE) (URB) (WRR)",
  },
  { value: "ITA", label: "Italian (ITA) (JCI)" },
  { value: "JSP", label: "Jewish Studies, Centre for (CJS) (JGJ)" },
  { value: "LMP", label: "Laboratory Medicine and Pathobiology (LMP)" },
  { value: "LIN", label: "Linguistics (LIN) (JLP) (JLS) (JAL) (JFL) (ARH)" },
  { value: "MAT", label: "Mathematics (MAT) (APM) (JMB) (JUM)" },
  { value: "MST", label: "Medieval Studies, Centre for (MST)" },
  { value: "MEDGM", label: "Molecular Genetics and Microbiology (MGY) (MIJ)" },
  { value: "MUSIC", label: "Music (MUS)" },
  { value: "NMC", label: "Near & Middle Eastern Civilizations (NMC) (NML)" },
  {
    value: "NEW",
    label:
      "New College (NEW) (AFR) (BPM) (CAR) (CSE) (ELL) (IFP) (JHN) (JLN) (JNH) (JNR) (JNS) (JQR) (UTP)",
  },
  { value: "NUSCI", label: "Nutritional Sciences (NFS)" },
  {
    value: "GLAF",
    label: "Peace, Conflict and Justice Studies (PCJ) (MUN) (PPG)",
  },
  { value: "PCL", label: "Pharmacology (PCL) (JPM)" },
  { value: "PHL", label: "Philosophy (PHL)" },
  { value: "PHY", label: "Physics (PHY) (ENV) (JPE) (JPH) (JPA) (JOP) (IVP)" },
  { value: "PSL", label: "Physiology (PSL) (JPM)" },
  {
    value: "POL",
    label:
      "Political Science (POL) (JHP) (JPA) (JPD) (JPF) (JPI) (JPP) (JPR) (JPS) (JPU) (JRA)",
  },
  { value: "PSY", label: "Psychology (PSY) (JLP)" },
  { value: "RLG", label: "Religion (RLG) (MHB) (JAR) (JNR) (JPR) (JSR)" },
  { value: "COMPG", label: "Rotman Commerce (RSM) (MGT)" },
  {
    value: "SDST",
    label:
      "Sexual Diversity Studies, Mark S. Bonham Centre (SDS) (JNS) (JPS) (JPU) (JSU)",
  },
  {
    value: "SLA",
    label: "Slavic Languages and Literature (SLA) (EST) (FIN) (JSH) (SWE)",
  },
  { value: "SWK", label: "Social Work (SWK)" },
  { value: "SOC", label: "Sociology (SOC)" },
  { value: "SAS", label: "South Asian Studies (SAS)" },
  { value: "SPA", label: "Spanish (SPA) (PRT) (LAS)" },
  {
    value: "SMC",
    label: "St. Michael's College (SMC) (BMS) (CHC) (CLT) (JCA) (MST)",
  },
  { value: "STAT", label: "Statistical Sciences (STA) (ACT) (JSC)" },
  { value: "TRIN", label: "Trinity College (TRN)" },
  {
    value: "UC",
    label:
      "University College (UNI) (CDN) (COG) (HST) (JCI) (JSU) (JUG) (JUM) (PHS)",
  },
  {
    value: "VIC",
    label:
      "Victoria College (VIC) (CRE) (EDS) (IVP) (JSV) (JFV) (LCT) (MCS) (REN)",
  },
  { value: "WGSI", label: "Women and Gender Studies (WGS)" },
  { value: "WDW", label: "Woodsworth College (WDW) (ABP) (DHU)" },
];

export {
  years,
  deptCodes,
  instances,
  daytime,
  studyYears,
  weekdays,
  breadth,
  deliveryModes,
  sections,
  departments,
};
