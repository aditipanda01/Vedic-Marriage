// Form options constants mapped from backend enums
// Source: VDM/src/enums/regular.enum.ts

export const GENDER_OPTIONS = [
  "Male", 
  "Female", 
  "Other"
] as const;

export const MARITAL_STATUS_OPTIONS = [
  "Unmarried",
  "Divorced",
  "Widowed",
  "Applied/Awaited Divorce",
  "Other"
] as const;

export const LANGUAGES_OPTIONS = [
  "Aka", "Arabic", "Arunachali", "Assamese", "Awadhi", "Baluchi", "Bengali",
  "Bhojpuri", "Bhutia", "Brahui", "Brij", "Burmese", "Chattisgarhi", "Chinese",
  "Coorgi", "Dogri", "English", "French", "Garo", "Garhwali", "Gujarati",
  "Haryanavi", "Himachali / Pahari", "Hindi", "Hindko", "Kakbarak", "Kanauji",
  "Kannada", "Kashmiri", "Khandesi", "Khasi", "Konkani", "Koshali", "Kumaoni",
  "Kutchi", "Ladakhi", "Lepcha", "Magahi", "Maithili", "Malay", "Malayalam",
  "Manipuri", "Marathi", "Marwari", "Miji", "Mizo", "Monpa", "Nepali", "Odia",
  "Pashto", "Persian", "Punjabi", "Rajasthani", "Russian", "Sanskrit", "Santhali",
  "Seraiki", "Sindhi", "Sinhala", "Sourashtra", "Spanish", "Swedish", "Tagalog",
  "Tamil", "Telugu", "Tulu", "Urdu", "Other"
] as const;

export const HEIGHT_OPTIONS = [
  { label: "Below 4ft 5in", value: "132cm" },
  { label: "4ft 5in - 134cm", value: "134cm" },
  { label: "4ft 6in - 137cm", value: "137cm" },
  { label: "4ft 7in - 139cm", value: "139cm" },
  { label: "4ft 8in - 142cm", value: "142cm" },
  { label: "4ft 9in - 144cm", value: "144cm" },
  { label: "4ft 10in - 147cm", value: "147cm" },
  { label: "4ft 11in - 149cm", value: "149cm" },
  { label: "5ft - 152cm", value: "152cm" },
  { label: "5ft 1in - 154cm", value: "154cm" },
  { label: "5ft 2in - 157cm", value: "157cm" },
  { label: "5ft 3in - 159cm", value: "159cm" },
  { label: "5ft 4in - 162cm", value: "162cm" },
  { label: "5ft 5in - 164cm", value: "164cm" },
  { label: "5ft 6in - 167cm", value: "167cm" },
  { label: "5ft 7in - 170cm", value: "170cm" },
  { label: "5ft 8in - 172cm", value: "172cm" },
  { label: "5ft 9in - 175cm", value: "175cm" },
  { label: "5ft 10in - 177cm", value: "177cm" },
  { label: "5ft 11in - 180cm", value: "180cm" },
  { label: "6ft - 182cm", value: "182cm" },
  { label: "6ft 1in - 185cm", value: "185cm" },
  { label: "6ft 2in - 187cm", value: "187cm" },
  { label: "6ft 3in - 190cm", value: "190cm" },
  { label: "6ft 4in - 193cm", value: "193cm" },
  { label: "6ft 5in - 195cm", value: "195cm" },
  { label: "6ft 6in - 198cm", value: "198cm" },
  { label: "6ft 7in - 200cm", value: "200cm" },
  { label: "6ft 8in - 203cm", value: "203cm" },
  { label: "6ft 9in - 205cm", value: "205cm" },
  { label: "6ft 10in - 208cm", value: "208cm" },
  { label: "6ft 11in - 210cm", value: "210cm" },
  { label: "7ft - 213cm", value: "213cm" },
  { label: "Above 7ft", value: "215cm" }
] as const;

export const HEALTH_CONDITION_OPTIONS = [
  "No Health Problems", "HIV positive", "Diabetes", "Low BP", "High BP", 
  "Heart Ailments", "Other diseases"
] as const;

export const DISABILITY_OPTIONS = [
  "None", 
  "Physical Disability"
] as const;

export const RELIGION_OPTIONS = [
  "Hindu", "Islam", "Christianity", "Sikh", "Buddhism", 
  "Jain", "Parsi", "Jewish", "Spiritual", "No Religion", "Other"
] as const;

export const ETHNICITY_OPTIONS = [
  'African', 'African American', 'Afro-Caribbean',
  'Arab', 'Armenian', 'Ashkenazi Jewish',
  'Australian Aboriginal', 'Austronesian', 'Basque',
  'Black African', 'Central Asian', 'Chinese',
  'East African', 'East Asian', 'Egyptian',
  'European', 'Filipino', 'Hispanic or Latino',
  'Hmong', 'Indian (South Asian)', 'Indigenous Australian',
  'Indigenous South American', 'Indigenous Central American',
  'Iranian', 'Israeli Jewish', 'Japanese',
  'Korean', 'Kurdish', 'Lebanese',
  'Maori', 'Melanesian', 'Middle Eastern',
  'Mongolian', 'Native American', 'Pacific Islander',
  'Persian', 'Polynesian', 'Roma',
  'Russian', 'Sami', 'Scandinavian',
  'Sephardic Jewish', 'South Asian', 'Southeast Asian',
  'Thai', 'Turkish', 'West African',
  'White or Caucasian', 'Yoruba', 'Zulu',
  'Mixed or Multi-ethnic', "Don't know", 'Other'
] as const;

// Astro Section Options
export const RASHI_OPTIONS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", 
  "Pisces", "Don't know"
] as const;

export const NAKSHATRA_OPTIONS = [
  "Don't know", "Ashwini", "Bharani", "Kṛttikā", "Rohiṇī", 
  "Mṛgaśīrṣa", "Ārdrā", "Punarvasu", "Puṣya", "Aśleṣā", 
  "Maghā", "Pūrvaphalgunī", "Uttaraphalgunī", "Hastā", 
  "Chitrā", "Svāti", "Viśākhā", "Anurādhā", "Jyeṣṭhā", 
  "Mūla", "Pūrva Āṣāḍhā", "Uttarāṣāḍhā", "Śravaṇa", 
  "Dhaniṣṭhā", "Śatabhiṣā", "Pūrva Bhādrapadā", 
  "Uttara Bhādrapadā", "Revatī", "Other"
] as const;

export const MANGLIK_OPTIONS = ["Don't know", "Yes", "No"] as const;

export const COMMUNITY_OPTIONS = [
  "Don't Know", "Manai", "Telugu", "Chettiar", "Kuli", 
  "Maratha", "Kokanastha", "Adi", "AndhraAdi", "DharmiAdi", 
  "DravidaAdi", "Karnataka"
] as const;

// Family Background Options
export const FAMILY_CULTURE_OPTIONS = [
  "Traditional",
  "Modern",
  "Mix of traditional and modern",
  "Liberal",
  "Spiritual",
  "Other"
] as const;

export const FAMILY_STATUS_OPTIONS = [
  "Lower class",
  "Lower-middle class",
  "Middle class",
  "Upper-middle class",
  "Upper class",
  "Affluent",
  "Other"
] as const;

export const FATHER_PREFIX_OPTIONS = [
  "Mr",
  "Dr",
  "Sir",
  "Late"
] as const;

export const MOTHER_PREFIX_OPTIONS = [
  "Ms",
  "Mrs",
  "Dr",
  "Madam",
  "Late"
] as const;

// Career Section Options
export const COMPANY_TYPE_OPTIONS = {
  PRIVATE_COMPANY: "Private Company",
  GOVERNMENT_PUBLIC_SECTOR: "Government / Public Sector",
  DEFENSE_CIVIL_SERVICES: "Defense / Civil Services",
  BUSINESS_SELF_EMPLOYED: "Business / Self Employed",
  NOT_WORKING: "Not Working"
} as const;

export const INCOME_OPTIONS = {
  UPTO_INR_1_LAKH: "Upto INR 1 Lakh",
  INR_1_LAKH_TO_2_LAKH: "INR 1 Lakh to 2 Lakh",
  INR_2_LAKH_TO_4_LAKH: "INR 2 Lakh to 4 Lakh",
  INR_4_LAKH_TO_7_LAKH: "INR 4 Lakh to 7 Lakh",
  INR_7_LAKH_TO_10_LAKH: "INR 7 Lakh to 10 Lakh",
  INR_10_LAKH_TO_15_LAKH: "INR 10 Lakh to 15 Lakh",
  INR_15_LAKH_TO_20_LAKH: "INR 15 Lakh to 20 Lakh",
  INR_20_LAKH_TO_30_LAKH: "INR 20 Lakh to 30 Lakh",
  INR_30_LAKH_TO_50_LAKH: "INR 30 Lakh to 50 Lakh",
  INR_50_LAKH_TO_75_LAKH: "INR 50 Lakh to 75 Lakh",
  INR_75_LAKH_TO_1_CRORE: "INR 75 Lakh to 1 Crore",
  INR_1_CRORE_ABOVE: "INR 1 Crore & above",
  NOT_APPLICABLE_OR_NOT_WORKING: "Not applicable or not working",
  KEEP_THIS_PRIVATE: "Keep this private"
} as const;

export const QUALIFICATIONS_OPTIONS = {
  POST_DOCTORAL_AND_ABOVE: "Post Doctoral and above",
  DOCTORATE: "Doctorate",
  MASTER: "Master",
  BACHELOR: "Bachelor",
  HONOURS: "Honours",
  ASSOCIATE: "Associate",
  DIPLOMA: "Diploma",
  HIGHER_SECONDARY_EDUCATION: "Higher Secondary Education",
  SECONDARY_EDUCATION: "Secondary Education",
  LESS_THAN_HIGH_SCHOOL: "Less than high school",
  NO_FORMAL_EDUCATION: "No formal education",
  BE_BTECH: "B.E / B.Tech",
  ME_MTECH: "M.E / M.Tech",
  BSC: "B.Sc",
  MSC: "M.Sc",
  BCA: "BCA",
  MCA: "MCA",
  BBA: "BBA",
  MBA: "MBA",
  BCOM: "B.Com",
  MCOM: "M.Com",
  BA: "B.A",
  MA: "M.A",
  BFA: "B.F.A",
  MFA: "M.F.A",
  BDS: "BDS",
  MDS: "MDS",
  MBBS: "MBBS",
  MD: "MD",
  BHMS: "BHMS",
  BAMS: "BAMS",
  LLB: "LLB",
  LLM: "LLM",
  BPHARM: "B.Pharm",
  MPHARM: "M.Pharm",
  BARCH: "B.Arch",
  MARCH: "M.Arch",
  BPLAN: "B.Plan",
  MPLAN: "M.Plan",
  BVSC: "BVSc",
  MVSC: "MVSc",
  OTHER: "Other"
} as const;

// Spiritual Section Options - Backend Enum Values
export const SPIRITUAL_AFFILIATION_OPTIONS = {
  NO: "No",
  ART_OF_LIVING: "Art of Living Foundation",
  BRAHMA_KUMARIS: "Brahma Kumaris",
  CHINMAYA_MISSION: "Chinmaya Mission",
  ISHA_FOUNDATION: "Isha Foundation",
  ISKCON: "ISKCON",
  ISKCON_BANGALORE: "ISKCON Bangalore & HKM Centers",
  GAUDIYA_VAISHNAVA: "Gaudiya Vaishnava",
  MADHVA: "Madhva",
  SRI_VAISHNAVA: "Sri Vaishnava",
  SRI_SRI_GROUP: "Sri Sri Group",
  OTHERS: "Other organization"
} as const;

export const CHANTING_ROUNDS_OPTIONS = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", 
  "16", "Not Regular Chanter", "Other"
] as const;

export const TEMPLE_VISIT_OPTIONS = [
  "Daily", "Many times in a week", "Many times in a month", 
  "On festivals", "Occasionally", "Other"
] as const;

export const SPIRITUALITY_ROLE_OPTIONS = [
  "Central and guiding force", "Significant influence and source of strength", 
  "Meaningful aspect and source of inspiration", 
  "Present but not central to daily life", "Not a significant factor or influence", "Other"
] as const;

export const INITIATION_STATUS_OPTIONS = [
  "Yes", "No", "Aspiring", "Others"
] as const;

export const FOUR_REGULATIVE_PRINCIPLES_OPTIONS = [
  "Yes", "No", "Don't Know", "Occasionally", "Follow Few of them"
] as const;

export const EKADASHI_OPTIONS = [
  "Yes", "No", "Occasionally"
] as const;

export const PARENT_PRACTICE_KRISHNA_OPTIONS = [
  "Serious Practitioners", "Beginners", "They Support KC", 
  "No", "Indifferent/Against/Other"
] as const;

export const BOOKS_NAMES_OPTIONS = [
  "Bhagavad-gita as it is", "Srimad Bhagavatam", "Sri Caitanya caritamrta", 
  "KRSNA, The Supreme Personality of Godhead"
] as const;

export const ASSOCIATED_TYPE_OPTIONS = [
  "Full-time Temple Devotee", "Part-time devotee", "Regular visitor", 
  "Supporter", "Not associated", "Other"
] as const;

export const ATTENDED_SEMINAR_OPTIONS = [
  "Yes", "No", "Maybe"
] as const;

// Diet Preferences Options
export const DIET_PREFERENCES_OPTIONS = [
  "Jain", 
  "Vegan", 
  "Strictly Vegetarian", 
  "Krishna Prasadam Vegetarian",
  "Vegetarian and occasionally Krishna Prasadam", 
  "Vegetarian with occasional onion and garlic", 
  "Eggetarian",
  "Non-veg", 
  "Other"
] as const;

// Type exports for TypeScript
export type Gender = typeof GENDER_OPTIONS[number];
export type MaritalStatus = typeof MARITAL_STATUS_OPTIONS[number];
export type Language = typeof LANGUAGES_OPTIONS[number];
export type Height = typeof HEIGHT_OPTIONS[number]['value'];
export type HealthCondition = typeof HEALTH_CONDITION_OPTIONS[number];
export type Disability = typeof DISABILITY_OPTIONS[number];
export type Religion = typeof RELIGION_OPTIONS[number];
export type Ethnicity = typeof ETHNICITY_OPTIONS[number];
export type Rashi = typeof RASHI_OPTIONS[number];
export type Nakshatra = typeof NAKSHATRA_OPTIONS[number];
export type Manglik = typeof MANGLIK_OPTIONS[number];
export type Community = typeof COMMUNITY_OPTIONS[number];
export type FamilyCulture = typeof FAMILY_CULTURE_OPTIONS[number];
export type FamilyStatus = typeof FAMILY_STATUS_OPTIONS[number];
export type FatherPrefix = typeof FATHER_PREFIX_OPTIONS[number];
export type MotherPrefix = typeof MOTHER_PREFIX_OPTIONS[number];
export type CompanyType = typeof COMPANY_TYPE_OPTIONS[keyof typeof COMPANY_TYPE_OPTIONS];
export type Income = typeof INCOME_OPTIONS[keyof typeof INCOME_OPTIONS];
export type Qualification = typeof QUALIFICATIONS_OPTIONS[keyof typeof QUALIFICATIONS_OPTIONS];
export type SpiritualAffiliation = typeof SPIRITUAL_AFFILIATION_OPTIONS[keyof typeof SPIRITUAL_AFFILIATION_OPTIONS];
export type InitiationStatus = typeof INITIATION_STATUS_OPTIONS[number];
export type ChantingRounds = typeof CHANTING_ROUNDS_OPTIONS[number];
export type TempleVisit = typeof TEMPLE_VISIT_OPTIONS[number];
export type SpiritualityRole = typeof SPIRITUALITY_ROLE_OPTIONS[number];
export type FourRegulativePrinciples = typeof FOUR_REGULATIVE_PRINCIPLES_OPTIONS[number];
export type Ekadashi = typeof EKADASHI_OPTIONS[number];
export type ParentPracticeKrishna = typeof PARENT_PRACTICE_KRISHNA_OPTIONS[number];
export type BooksNames = typeof BOOKS_NAMES_OPTIONS[number];
export type AssociatedType = typeof ASSOCIATED_TYPE_OPTIONS[number];
export type AttendedSeminar = typeof ATTENDED_SEMINAR_OPTIONS[number]; 