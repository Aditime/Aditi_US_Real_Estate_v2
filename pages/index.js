import React, { useState } from "react";
import Link from "next/link";
import { Flex, Box, Text, Button, Image, Input, Stack , Select} from "@chakra-ui/react";

import Property from "../components/Property";
import DefaultImage from "../assets/images/house.jpeg";
import { baseUrl, fetchLocationApi } from "../utils/fetchLocationApi";

export const queryContext = React.createContext();

const Home = () => {

  const myStyle = {
    position: "relative",
    backgroundImage:
      "url('https://cdn.pixabay.com/photo/2018/04/02/16/03/old-elisabeth-3284212_1280.jpg')",
    width: 1200,
    height: 400,
    margin: "10px",
    fontSize: "30px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  
  const textstyle = {
    width: "90%",
    height: "7",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-51%, -70%)`,
  };

  const [queryPurpose, setQueryPurpose] = useState("for-sale");
  const [queryCity, setQueryCity] = useState("New York");
  const [queryState, setQueryState] = useState("NY");
  const [results, setResults] = useState({});

  const search = async () => {
    const { data } = await fetchLocationApi(
      queryPurpose,
      queryCity,
      queryState
    );
  
    const resultList = data?.home_search;
    setResults(resultList);
    //setQueryPurpose("");
   // setQueryCity("");
   // setQueryState("");
    
   
  };
  
  const queryC = {
    city: [queryCity, setQueryCity],
    state: [queryState, setQueryState],
  }
  return(
  <div>
    
    <Box padding="5" width="100%" alignItems="center">
      <div style={myStyle}>
        <Stack style={textstyle}>
        <Flex
        bg="white.100"
        bgcolor="white"
        borderBottom="3px"
        borderColor="blue.200"
        fontSize="lg"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Flex justifyContent="center" alignItems="center" m="5" width="100">
            <Select color="white"
              selectedOptionColor="blue"
              name="purpose"
              onChange={(e) => setQueryPurpose(e.target.value)}
            >
              <option value="for-sale"> For Sale </option>
              <option value="for-rent"> For Rent </option>
            </Select>
          </Flex>
        </Box>

        <Flex justifyContent="center" alignItems="center" m="5" width="100">
          <Text className="search-city" color ="black" fontWeight="bold" > City</Text>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          m="1"
          width="100"
          border="1px solid black"
          bg="white"
        >
          <input
            type="text"
            className="search-city"
            placeholder="New York "
            value={queryCity}
            onChange={(e) => setQueryCity(e.target.value)}
          />
        </Flex>

        <Flex justifyContent="center" alignItems="center" m="2" width="50">
          <Text className="search-State" color ="black" fontWeight="bold" > State</Text>
        </Flex>

        <Flex
          justifyContent="center"
          alignItems="center"
          m="10"
          width="100"
          border="1px solid black"
          bg="white"
        >
          <input
            type="text"
            className="search-state"
            placeholder="NY"
            value={queryState}
            onChange={(e) => setQueryState(e.target.value)}
          />
        </Flex>

        <Flex justifyContent="center" alignItems="center" m="5" width="50">
          <Button colorScheme="gray" onClick={(e) => search()}>
            Search
          </Button>
        </Flex>
      </Flex>
        </Stack>
      </div>
    </Box>

  <Box
      alignItems="center"
      justifyContent="center"
      paddingTop={10}
      fontWeight="bold"
      marginLeft={10}
    >
      <Text> properties {queryPurpose.replace("-", " ")}</Text>
      <Flex flexWrap="wrap">
        {results?.results?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

    </Box>
  </div>

);
};


export default Home ;




