export const preferenceConfig = {
  basic: {
    title: "Basic Preference",
    fields: [
      { 
        id: "marital-status", 
        label: "Preferred Marital Status",
        type: "select",
        options: [] // To be populated later
      },
      { 
        id: "age-range", 
        label: "Preferred Age Range", 
        type: "range",
        min: 18,
        max: 70
      },
      { 
        id: "height", 
        label: "Preferred Height", 
        type: "range",
        min: 140,
        max: 220
      },
    ],
  },
  community: {
    title: "Community Preference",
    fields: [
      { 
        id: "religion", 
        label: "Preferred Religion",
        type: "select",
        options: []
      },
      { 
        id: "caste", 
        label: "Preferred Caste",
        type: "select",
        options: []
      },
      { 
        id: "language", 
        label: "Preferred Language",
        type: "select",
        options: []
      },
    ],
  },
  location: {
    title: "Location Preferences",
    fields: [
      { 
        id: "location", 
        label: "Preferred City / Location",
        type: "select",
        options: []
      }
    ],
  },
  education: {
    title: "Educational Preferences",
    fields: [
      { 
        id: "qualification", 
        label: "Preferred Qualification",
        type: "select",
        options: []
      },
      { 
        id: "professional", 
        label: "Preferred Professional Background",
        type: "select",
        options: []
      },
      { 
        id: "income", 
        label: "Preferred Annual Income",
        type: "select",
        options: []
      },
    ],
  },
  diet: {
    title: "Diet Preferences",
    fields: [
      { 
        id: "food", 
        label: "Food Preferences",
        type: "select",
        options: []
      }
    ],
  },
  family: {
    title: "Family and Life style",
    fields: [
      { 
        id: "family-values", 
        label: "Preferred Family Values",
        type: "select",
        options: []
      },
      { 
        id: "family-status", 
        label: "Preferred Family status",
        type: "select",
        options: []
      },
    ],
  },
  spiritual: {
    title: "Spiritual Preference",
    fields: [
      { 
        id: "spiritual-background", 
        label: "Preferred Spiritual Background",
        type: "select",
        options: []
      },
      { 
        id: "initiation", 
        label: "Preferred Initiation Status",
        type: "select",
        options: []
      },
      { 
        id: "affiliation", 
        label: "Preferred Partner's Affiliation",
        type: "select",
        options: []
      },
    ],
  },
}; 