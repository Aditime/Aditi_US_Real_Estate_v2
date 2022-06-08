import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { HiHome } from 'react-icons/hi';
import millify from 'millify';
import DefaultImage from '../assets/images/house.jpeg';


 const Property = ({ property: { primary_photo, location, description,list_price, list_price_min,list_price_max, status, property_id  } }) => (
  <Box alignItems='center' justifyContent='space-between' margin='30px'>
 <Link href={`/property/${property_id}`} passHref>
    <Flex flexWrap='wrap' w='320px' p='2' alignItems='center' paddingTop='2px' justifyContent='flex-start' cursor='pointer' >
      <Box>
        <Image src={primary_photo ? primary_photo.href : DefaultImage} width={350} height={260} />
      </Box>
      <Box w='full'>
        
          <Flex alignItems='center' justifyContent="space-between" flexWrap>
          {status === 'for_sale' &&
            <Text fontWeight='bold' fontSize='md'> ${millify(list_price)} </Text>
            
          }
          {status === 'for_rent' && 
            <Text fontWeight='bold' fontSize='md' >${list_price_min? list_price_min.toLocaleString():''} -  ${list_price_max? list_price_max.toLocaleString() :'' } </Text>
          }
            <Text fontWeight='bold' fontSize='md'> {description?.type} </Text>
          </Flex>

          {status === 'for_sale' &&
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {description?.beds}<FaBed /> | {description?.baths} <FaBath /> | {description?.sqft} sqft <BsGridFill />
        </Flex>
          }
          {status === 'for_rent' && 
            <Flex alignItems='center' p='1' fontSize='sm' justifyContent='space-between' w='300px' color='blue.400'>
            {description?.beds_min} - {description?.beds_max} <FaBed /> |  
            {description?.baths_min} - {description?.baths_max} <FaBath /> | 
            {description?.sqft_min} - {description?.sqft_max} sqft <BsGridFill />
          </Flex>
           }
       
       <Flex alignItems='center' p='1' fontSize='sm' w='300px' color='blue.400'>
       <HiHome/> 
         {location?.address?.line + ', ' + location?.address?.city +', ' + location?.address?.state_code + ', ' + location?.address?.postal_code} 
          </Flex>
        
          
       
      </Box>
    </Flex>
  </Link>
  </Box>
);

export default Property;