import React, { useState } from "react";
import { Button, Collapse, Divider, SimpleGrid } from "@chakra-ui/react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { FaBed, FaBath } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import { MdHomeWork, MdAlternateEmail } from "react-icons/md";
import { BsGridFill, BsFillPersonFill } from "react-icons/bs";
import ImageScrollbar from "../../components/ImageScrollbar";
import { StarIcon, WarningIcon } from "@chakra-ui/icons";
import { PieChart } from "react-minimal-pie-chart";
import Link from "next/link";
import {
  baseUrl,
  fetchPropertyDetails,
} from "../../utils/fetchPropertyDetails";

const PropertyDetails = ({
  propertyDetails: {
    list_price,
    photos,
    prop_common,
    description,
    address,
    agent,
    mortgage,
    neighborhood,
    prop_status,
    community,
    advertisers,
    year_built,
    prop_type,
  },
}) => {
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const handleTogglepropertyDetails = () =>
    setShowPropertyDetails(!showPropertyDetails);

  const [showAgents, setShowAgents] = useState(false);
  const handleToggleAgents = () => setShowAgents(!showAgents);

  const [showPayment, setshowPayment] = useState(false);
  const handleTogglePayment = () => setshowPayment(!showPayment);
  const coordinates = [
    {
      lat: address?.location?.lat,
      lng: address?.location?.lon,
    },
  ];

  const pieData = [
    {
      color: "#004B2A",
      title: "Principal and interest",
      value: mortgage?.estimate?.principal_and_interest,
    },
    {
      color: "#4B002A",
      title: "Property Taxes",
      value: mortgage?.estimate?.monthly_property_taxes,
    },
    {
      color: "#1E88E5",
      title: "Monthly home insurance",
      value: mortgage?.estimate?.monthly_home_insurance,
    },
    {
      color: "#F7ACD5",
      title: "Monthly Mortage insurance",
      value: mortgage?.estimate?.monthly_mortgage_insurance,
    },
    {
      color: "#E67E00",
      title: "Hoa fees",
      value: mortgage?.estimate?.hoa_fees,
    },
  ];

  //console.log("mortga payment: ", mortgage);
  return (
    // address , agent, features, mortgage , listings, photos, prop_common, neighborhood

    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}

      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            {prop_common?.status === "for_sale" && (
              <Text fontWeight="bold" fontSize="lg">
                {" "}
                ${list_price?.toLocaleString()}{" "}
              </Text>
            )}
            {prop_status === "for_rent" && (
              <Text fontWeight="bold" fontSize="sm">
                Range : ${community?.price_min.toLocaleString()} - $
                {community?.price_max.toLocaleString()}{" "}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex justifyContent="space-between">
          {prop_common?.status === "for_sale" && (
            <Text>
              Beds: {prop_common?.bed} | baths: {prop_common?.bath} | Area:{" "}
              {prop_common?.sqft.toLocaleString()} sqft
            </Text>
          )}
          {prop_status === "for_rent" && (
            <Box width="100%">
              <Text>
                Beds: {community?.beds_min} - {community?.beds_max} | baths:{" "}
                {community?.baths_min} - {community?.baths_max} | Area:{" "}
                {community?.sqft_min} - {community?.sqft_max} sqft
              </Text>
            </Box>
          )}
        </Flex>
        {prop_common?.status === "for_sale" && (
          <Link
            href={{
              pathname: `http://www.google.com/maps/place/${address?.location?.lat},${address?.location?.lon}`,
            }}
          >
            <a target="_blank">
              {address?.line +
                ", " +
                address?.city +
                ", " +
                address?.state_code +
                ", " +
                address?.postal_code}
            </a>
          </Link>
        )}

        {prop_status === "for_rent" && (
          <Link
            href={{
              pathname: `http://www.google.com/maps/place/${address?.lat},${address?.long}`,
            }}
          >
            <a target="_blank">
              {address?.line +
                ", " +
                address?.city +
                ", " +
                address?.state_code +
                ", " +
                address?.postal_code}
            </a>
          </Link>
        )}
      </Box>

      <br />
      <Box marginTop="2"></Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Neighborhood</Text>
          <Text fontWeight="bold">{neighborhood}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">
            {prop_common?.status.replace("_", " ")}{" "}
            {prop_status?.replace("_", " ")}
          </Text>
        </Flex>

        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Year Built </Text>
          <Text fontWeight="bold">
            {prop_common?.year_built} {year_built}
          </Text>
        </Flex>

        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type </Text>
          <Text fontWeight="bold">
            {prop_common?.type} {prop_type}{" "}
          </Text>
        </Flex>
      </Flex>
      <Box>
        <br />
        <br />
      </Box>
      <Box>
        <Button onClick={handleTogglepropertyDetails}>Property Details </Button>
        <Collapse in={showPropertyDetails} animateOpacity>
          <Box
            p="40px"
            color="black"
            rounded="md"
            shadow="md"
            backgroundColor="white"
            justifyContent="center"
          >
            <p>{description}</p> <p>{prop_common?.description}</p>
          </Box>
        </Collapse>
      </Box>

      <Box>
        <br />
        <Divider orientation="horizontal" />
        <br />
      </Box>

      {/**     agents  */}
      {agent && (
        <Box>
          <Button onClick={handleToggleAgents}>Agents</Button>
          <Collapse in={showAgents} animateOpacity>
            <Box
              p="40px"
              color="black"
              rounded="md"
              shadow="md"
              backgroundColor="white"
              justifyContent="center"
            >
              <SimpleGrid columns={2} spacing={10}>
                <Flex alignItems="center">
                  <BsFillPersonFill /> &nbsp;&nbsp;{agent?.name}
                </Flex>
                <Flex alignItems="center">
                  <MdHomeWork /> &nbsp;&nbsp; {agent?.office_name}
                </Flex>
                <Flex alignItems="center">
                  <MdAlternateEmail /> &nbsp;&nbsp; {agent?.email}
                </Flex>
                <Flex alignItems="center">
                  <AiFillPhone /> &nbsp;&nbsp;{" "}
                  {agent?.phones[0]?.primary[0]?.number}
                </Flex>
              </SimpleGrid>
            </Box>
          </Collapse>
        </Box>
      )}
      {/**   advertisers    */}

      {prop_status === "for_rent" && (
        <Box>
          <Button onClick={handleToggleAgents}>advertisers</Button>
          <Collapse in={showAgents} animateOpacity>
            <Box
              p="40px"
              color="black"
              rounded="md"
              shadow="md"
              backgroundColor="white"
              justifyContent="center"
            >
              <SimpleGrid columns={2} spacing={10}>
                <Flex alignItems="center">
                  <BsFillPersonFill /> &nbsp;&nbsp;{advertisers[0]?.name}
                </Flex>
                <Flex alignItems="center">
                  <MdAlternateEmail /> &nbsp;&nbsp; {advertisers[0]?.email}
                </Flex>
              </SimpleGrid>
            </Box>
          </Collapse>
        </Box>
      )}
      <Box>
        <br />
        <Divider orientation="horizontal" />
        <br />
      </Box>
      {/**     Monthly payment  */}
      {mortgage?.estimate && (
        <Box>
          <Button onClick={handleTogglePayment}>Monthly Payment</Button>
          <Collapse in={showPayment} animateOpacity>
            <Box
              p="40px"
              color="black"
              rounded="md"
              shadow="md"
              backgroundColor="white"
              justifyContent="center"
            >
              <SimpleGrid columns={2} spacing={10}>
                <Box>
                  <Text fontSize="20" fontWeight="bold">
                    Mortage Payment for this House
                  </Text>
                  <br />
                  <Flex justifyContent="space-between">
                    <Text fontWeight="bold"> Home Price</Text>
                    <Text fontWeight="bold">
                      ${prop_common?.price.toLocaleString()}{" "}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="bold"> Downtown Payment </Text>
                    <Text fontWeight="bold">
                      ${mortgage?.estimate?.down_payment.toLocaleString()}{" "}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text fontWeight="bold"> Monthly Payment</Text>
                    <Text fontWeight="bold">
                      ${mortgage?.estimate?.monthly_payment.toLocaleString()}{" "}
                    </Text>
                  </Flex>

                  <Flex
                    justifyContent="space-between"
                    color="gray.500"
                    fontSize="15"
                  >
                    <Text> Loan</Text>
                    <Text>
                      ${mortgage?.estimate?.term}-Year Fixed loan at{" "}
                      {mortgage?.estimate?.rate}%
                    </Text>
                  </Flex>
                  <br />
                  <Flex justifyContent="space-between">
                    <Text>
                      {" "}
                      <StarIcon w={3} h={3} color="#004B2A" /> Principal and
                      interest
                    </Text>
                    <Text>
                      $
                      {mortgage?.estimate?.principal_and_interest.toLocaleString()}
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text>
                      {" "}
                      <StarIcon w={3} h={3} color="#4B002A" /> Property tax
                    </Text>
                    <Text>
                      $
                      {mortgage?.estimate?.monthly_property_taxes.toLocaleString()}
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text>
                      {" "}
                      <StarIcon w={3} h={3} color="blue.600" /> Home Insurance
                    </Text>
                    <Text>
                      $
                      {mortgage?.estimate?.monthly_home_insurance.toLocaleString()}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text>
                      {" "}
                      <StarIcon w={3} h={3} color="#F7ACD5" /> Mortage Insurance
                    </Text>
                    <Text>
                      $
                      {mortgage?.estimate?.monthly_mortgage_insurance.toLocaleString()}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text>
                      {" "}
                      <StarIcon w={3} h={3} color="#E67E00" /> HOA fees
                    </Text>
                    <Text>
                      ${mortgage?.estimate?.hoa_fees.toLocaleString()}
                    </Text>
                  </Flex>
                </Box>
                <Box width="300" height="300" paddingTop="10">
                  <PieChart
                    data={pieData}
                    labelPosition={65}
                    labelStyle={{
                      fontSize: "10px",
                      fontColor: "#FFF",
                      fontWeight: "800",
                    }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Collapse>
        </Box>
      )}
      {mortgage?.estimate && (
        <Box>
          <br />
          <Divider orientation="horizontal" />
          <br />
        </Box>
      )}
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchPropertyDetails(
    `${baseUrl}/v2/property-detail?property_id=${id}`
  );
  return {
    props: {
      propertyDetails: data.data.property_detail,
    },
  };
}
