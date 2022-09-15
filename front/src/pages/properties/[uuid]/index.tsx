import Head from 'next/head';
import {
  Box, Button, Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Typography
} from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function ReadProperty(): ReactElement {
  const [property, setProperty] = useState();
  const router = useRouter();
  const { uuid } = router.query;

  console.log(uuid);

  const fetchProperty = async(uuid) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/1.0/properties/${uuid}`);

      if (response) {
        setProperty(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (uuid) {
      fetchProperty(uuid);
    }
  }, [uuid]);

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
        { property !== undefined && (
          <Container maxWidth={false}>
            <Typography
              sx={{mb: 3}}
              variant="h4"
            >
              Properties
            </Typography>
            <Box sx={{pt: 3}}>
              <Card>
                <CardHeader
                  subheader="The information can be edited"
                  title={ property.title }
                />
                <Divider />
                <CardContent>
                  <Typography
                    sx={{mb: 3}}
                  >
                    Price: { property.price }
                  </Typography>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="error"
                    type="submit"
                    variant="outlined"
                    href={`/properties/${ property.uuid }/delete`}
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    href={`/properties/${ property.uuid }/update`}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Box>
          </Container>
        )}
      </Box>
    </>
  )
}

ReadProperty.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ReadProperty;
