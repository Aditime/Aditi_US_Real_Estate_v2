import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack
} from '@chakra-ui/react';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import BannerImage from '../assets/images/Banner.png';
import Image from 'next/image';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <Box bg={useColorModeValue('white.700', 'gray.900')} px={10}>
        <Flex alignItems={'center'} justifyContent={'space-between'} >
          <IconButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={4} alignItems={'center'} width={900}>
            <Box>
            <Link href="/" >
              <Image src={BannerImage} width={200} height={90} />
              </Link>
            </Box>
            <HStack
            paddingLeft={200}
               alignItems={'center'}
               fontSize={20}
               fontWeight={'bold'}
                
                as={'nav'}
                spacing={100}
                display={{ base: 'none', md: 'flex' }}>
               
               <Link px={2} py={1} rounded={'md'} 
                  _hover=
                  {{ 
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
              href='/search?purpose=for-sale'>Sell
              </Link>

              <Link px={2} py={1} rounded={'md'} 
                  _hover=
                  {{ 
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
              href='/search?purpose=for-rent'>Rent
              </Link>

              <Link px={2} py={1} rounded={'md'} 
                  _hover=
                  {{ 
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
              href='/mortgage'>Mortgage
              </Link>


            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
          
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link key={link}>{link}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
  );
              }

 export default Navbar;