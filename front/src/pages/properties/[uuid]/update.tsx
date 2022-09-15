import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { CreateForm } from '../../../components/properties/create-form';
import { ReactElement } from 'react';
import React from 'react';
import { UpdateForm } from '../../../components/properties/update-form';

function UpdateProperty(): ReactElement {
  return (
    <>
      <Head>
        <title>
          Settings | Material Kit
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
          <Typography
            sx={{mb: 3}}
            variant="h4"
          >
            Properties
          </Typography>
          <Box sx={{pt: 3}}>
            <UpdateForm/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

UpdateProperty.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default UpdateProperty;
