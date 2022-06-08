import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/filterData';
import noresult from '../assets/images/noresult.svg';


const SearchFilters =() => {
    const [filters] = useState(filterData);
    const [queryCity, setQueryCity] = useState("");
    const [queryState, setQueryState] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const searchProperties = (filterValues) => {
      
      const path = router.pathname;
      const { query } = router; 
  
      const values = getFilterValues(filterValues)
     // 
      query["City"] = queryCity ;
      query["state_code"] = queryState ;
      values.forEach((item) => {
         
        if(item.value && filterValues?.[item.name]) {     
          query[item.name] = item.value
        }
        else if(item.value===''){
          query[item.name] = undefined;
        }
      })

      router.push({ pathname: path, query: query });
    };

    const setCity = () =>{
      const path = router.pathname;
      const { query } = router; 
      query["City"] = queryCity ;

      const values = getFilterValues({'City' : queryCity})

      values.forEach((item) => {
        if(item.value && filterValues?.[item.name]) {
          query[item.name] = item.value
        }
      })

      router.push({ pathname: path, query: query });

    };

    const setState = () =>{
      const path = router.pathname;
      const { query } = router; 
      query["state_code"] = queryState ;
      const values = getFilterValues({'state_code' : queryState})

      values.forEach((item) => {
        if(item.value && filterValues?.[item.name]) {
          query[item.name] = item.value
        }
      })

      router.push({ pathname: path, query: query });
    };
   

    return ( 
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      <Box margin ="2">
      <Input placeholder='New York' size='md' value={queryCity} onChange={(e) => setQueryCity(e.target.value)} onBlur={()=>setCity()}/>
      </Box>
      <Box margin ="2">
      <Input placeholder='NY' size='md' value={queryState} onChange={(e) => setQueryState(e.target.value)} onBlur={()=>setCity()}/>
      </Box>

      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      
    </Flex>
    );
}

export default SearchFilters;
