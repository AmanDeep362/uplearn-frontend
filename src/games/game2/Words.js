
var states = [
  "andhra-pradesh",
  "arunachal-pradesh",
  "assam",
  "bihar",
  "chattishgarh",
  "goa",
  "gujarat",
  "haryana",
  "himachal pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya-pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil-nadu",
  "telangana",
  "tripura",
  "uttarakhand",
  "uttar-pradesh",
  "west-bengal",
];

function randomWord() {
  return states[Math.floor(Math.random() * states.length)];
}

export { randomWord };
