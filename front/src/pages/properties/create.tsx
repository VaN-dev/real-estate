import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { SettingsPassword } from '../../components/settings/settings-password';
import { CreateForm } from '../../components/properties/create-form';
import { ReactElement } from 'react';
import React from 'react';

function CreateProperty(): ReactElement {
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
            <CreateForm/>
          </Box>
        </Container>
      </Box>
    </>
  )
}

CreateProperty.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CreateProperty;
