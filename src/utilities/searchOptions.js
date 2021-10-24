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

// TODO: add in department data
const departments = [];

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
