import { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
      />
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize='2xl'
        cursor='pointer'
        d={['none','none','none','block']}
    />
    </Flex>
  );
}
export default function ImageSrollbar({ data }) {

    
  return (
    <ScrollMenu 
    LeftArrow={LeftArrow} RightArrow={RightArrow}
    >
      {data.map((item) => (
        <Box width='910px' key={item.href}  itemId={item.href}   overflow='hidden' p='1'>
        <Image placeholder="blur" blurDataURL={item.href} src={item.href} width={900} height={500}  
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
      </Box>
      ))}
    </ScrollMenu>
  );
}