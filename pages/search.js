import React from 'react'
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { baseUrl, fetchPropertyDetails } from "../utils/fetchPropertyDetails";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import noresult from "../assets/images/notfound.jpeg";


const Search = ({ properties: { results } }) => {
 
  //console.log("results: ", results);
  const [searchFilters, setSearchFilters] = useState(true);
  const router = useRouter(); 

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      {results?.length > 0 ? (
      <Flex flexWrap="wrap">
        {results?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      ):
      (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const price_min = query.price_min || "0";
  const price_max = query.price_max || "1000000";
  const beds_min = query.beds_min || "0";
  const baths_min = query.baths_min || "0";
  const sort = query.sort || "newest";
  const home_size_min = query.home_size_min || "1000";
  const home_size_max = query.home_size_max || "35000";
  const property_type = query.property_type || "multi_family";
  const queryCity = query.City || "New York";
  const queryState = query.state_code || "NY";


  const data = await fetchPropertyDetails(
    `${baseUrl}/v2/${purpose}?offset=0&limit=42&state_code=${queryState}&city=${queryCity}&property_type=${property_type}&price_min=${price_min}&price_max=${price_max}&sort=${sort}&baths_min=${baths_min}&beds_min=${beds_min}&home_size_max=${home_size_max}&home_size_min=${home_size_min}`
    //&price_min=${minPrice}&price_max=${maxPrice}&beds_min=${roomsMin}&baths_min=${bathsMin}&sort=${sort}&home_size_min=${areaMin}&home_size_max=${areaMax}`
  );
//  console.log("city & state: ", query, data);

  return {
    props: {
      properties: data?.data?.home_search? data?.data?.home_search : [],
    },
  };
}

export default Search;
