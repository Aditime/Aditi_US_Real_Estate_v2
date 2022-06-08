export const filterData = [
  {
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Purpose",
    queryName: "purpose",
  },
  {
    items: [
      { name: "135,000", value: "135000" },
      { name: "160,000", value: "160000" },
      { name: "185,000", value: "185000" },
      { name: "200,000", value: "200000" },
      { name: "300,000", value: "300000" },
      { name: "400,000", value: "400000" },
      { name: "500,000", value: "500000" },
      { name: "600,000", value: "600000" },
      { name: "700,000", value: "700000" },
      { name: "800,000", value: "800000" },
      { name: "900,000", value: "900000" },
      { name: "1000,000", value: "1000000" },
    ],
    placeholder: "Min Price(USD)",
    queryName: "price_min",
  },
  {
    items: [
      { name: "135,000", value: "135000" },
      { name: "160,000", value: "160000" },
      { name: "185,000", value: "185000" },
      { name: "200,000", value: "200000" },
      { name: "300,000", value: "300000" },
      { name: "400,000", value: "400000" },
      { name: "500,000", value: "500000" },
      { name: "600,000", value: "600000" },
      { name: "700,000", value: "700000" },
      { name: "800,000", value: "800000" },
      { name: "900,000", value: "900000" },
      { name: "1000,000", value: "1000000" },
    ],
    placeholder: "Max Price(USD)",
    queryName: "price_max",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Rooms",
    queryName: "beds_min",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6", value: "6" },
      { name: "7", value: "7" },
      { name: "8", value: "8" },
      { name: "9", value: "9" },
      { name: "10", value: "10" },
    ],
    placeholder: "Baths",
    queryName: "baths_min",
  },
  {
    items: [
      { name: "1000", value: "1000" },
      { name: "1250", value: "1250" },
      { name: "1500", value: "1500" },
      { name: "1750", value: "1750" },
      { name: "2000", value: "2000" },
      { name: "2250", value: "2250" },
      { name: "3000", value: "3000" },
      { name: "3750", value: "3750" },
      { name: "5000", value: "5000" },
      { name: "7500", value: "7500" },
    ],
    placeholder: "Min Area(sqft)",
    queryName: "home_size_min",
  },
  {
    items: [
      { name: "1000", value: "1000" },
      { name: "1250", value: "1250" },
      { name: "1500", value: "1500" },
      { name: "1750", value: "1750" },
      { name: "2000", value: "2000" },
      { name: "2250", value: "2250" },
      { name: "3000", value: "3000" },
      { name: "3750", value: "3750" },
      { name: "5000", value: "5000" },
      { name: "7500", value: "7500" },
      { name: "10000", value: "10000" },
    ],
    placeholder: "Max Area(sqft)",
    queryName: "home_size_max",
  },

  {
    items: [
      { name: "Lowest Price", value: "lowest_price" },
      { name: "Highest Price", value: "highest_price" },
      { name: "Newest", value: "newest" },
      { name: "Relevant", value: "relevant" },
      { name: "Sqft", value: "largest_sqft" },
    ],
    placeholder: "Sort",
    queryName: "sort",
  },

  {
    items: [
      { name: "Multi family", value: "multi_family" },
      { name: "Single family", value: "single_family" },
      { name: "Mobile", value: "mobile" },
      { name: "Land", value: "land" },
      { name: "Farm", value: "farm" },
    ],
    placeholder: "Property Type",
    queryName: "property_type",
  },
];

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    price_min,
    price_max,
    home_size_min,
    home_size_max,
    beds_min,
    baths_min,
    sort,
    property_type,
  } = filterValues;

  const values = [
    {
      name: "purpose",
      value: purpose,
    },
    {
      name: "price_min",
      value: price_min,
    },
    {
      name: "price_max",
      value: price_max,
    },
    {
      name: "beds_min",
      value: beds_min,
    },
    {
      name: "baths_min",
      value: baths_min,
    },
    {
      name: "home_size_min",
      value: home_size_min,
    },
    {
      name: "home_size_max",
      value: home_size_max,
    },
    {
      name: "sort",
      value: sort,
    },
    {
      name: "property_type",
      value: property_type,
    },
  ];

  return values;
};
