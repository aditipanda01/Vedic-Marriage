interface Option {
  value: string;
  label: string;
}

interface Field {
  id: string;
  label: string;
  type: string;
  options: Option[];
  disabled?: boolean;
  suffix?: string;
  showInfo?: boolean;
}

interface KCDetails {
  howLong: Field;
  chantingRounds: Field;
}

interface BrahmachariField {
  id: string;
  label: string;
  type: string;
  disabled: boolean;
}

interface Brahmachari {
  label: string;
  fields: BrahmachariField[];
}

export interface SpiritualConfig {
  organization: Field;
  kcDetails: KCDetails;
  initiation: Field;
  disabledFields: Field[];
  regulativePrinciples: Field;
  ekadashi: Field;
  formFields: Field[];
  booksRead: Field;
  brahmachari: Brahmachari;
}

export const spiritualConfig: SpiritualConfig = {
  organization: {
    id: "organization",
    label: "Are you affiliated with any spiritual organization?",
    type: "select",
    options: [
      { value: "iskcon", label: "ISKCON" },
      { value: "other", label: "Other" },
    ],
  },
  kcDetails: {
    howLong: {
      id: "kcDuration",
      label: "How long have you been in KC?",
      type: "input",
      options: [],
      suffix: "years",
    },
    chantingRounds: {
      id: "chantingRounds",
      label: "How many rounds do you chant?",
      type: "select",
      options: [
        { value: "16", label: "16 rounds" },
        { value: "8", label: "8 rounds" },
        { value: "4", label: "4 rounds" },
        { value: "0", label: "No rounds" },
      ],
    },
  },
  initiation: {
    id: "initiated",
    label: "Are you initiated?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  disabledFields: [
    {
      id: "spiritualMaster",
      label: "Spiritual Master",
      type: "input",
      options: [],
      disabled: true,
    },
    {
      id: "initiationName",
      label: "Initiation Name",
      type: "input",
      options: [],
      disabled: true,
    },
  ],
  regulativePrinciples: {
    id: "regulativePrinciples",
    label: "Do you follow the Four Regulative Principles?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "others", label: "Others" },
    ],
    showInfo: true,
  },
  ekadashi: {
    id: "ekadashi",
    label: "Do you observe fasting on Ekadashi days?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  formFields: [
    {
      id: "templeAffiliation",
      label: "Are you affiliated with any temple?",
      type: "select",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      id: "spiritualRole",
      label: "What role does spirituality play in your life?",
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "tertiary", label: "Tertiary" },
      ],
    },
  ],
  booksRead: {
    id: "booksRead",
    label: "Which books of Srila Prabhupada have you read?",
    type: "select",
    options: [
      { value: "bhagavad_gita", label: "Bhagavad-gita As It Is" },
      { value: "srimad_bhagavatam", label: "Srimad-Bhagavatam" },
      { value: "nectar_of_devotion", label: "Nectar of Devotion" },
      { value: "none", label: "None" },
    ],
  },
  brahmachari: {
    label: "For Brahmachari Users",
    fields: [
      {
        id: "templeServices",
        label: "Temple Services",
        type: "input",
        disabled: true,
      },
      {
        id: "departmentName",
        label: "Department Name",
        type: "input",
        disabled: true,
      },
      {
        id: "designationNames",
        label: "Designation Names",
        type: "input",
        disabled: true,
      },
      {
        id: "rolesAndExperiences",
        label: "Roles and Experiences",
        type: "input",
        disabled: true,
      },
    ],
  },
}; 