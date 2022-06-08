import { Box, Grid } from '@chakra-ui/react';

import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children }) {
  //console.log("children", children);
  return (

    <>
      <Box maxWidth='1280px' m='auto'>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}