import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { PropertiesListToolbar } from '../../components/properties/properties-list-toolbar';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import PropertiesListResults from '../../components/properties/properties-list-results';

function Index(): ReactElement {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/1.0/properties')
      .then((response) => response.json())
      .then((body) => { setProperties(body.data) })
    ;
  }, []);

  return (
    <>
      <Head>
        <title>
          Properties | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <PropertiesListToolbar/>
          <Box sx={{ mt: 3 }}>
            <PropertiesListResults properties={properties}/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

Index.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Index;
