import { FunctionComponent, ReactElement, useEffect, useReducer, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid,
  InputLabel,
  TextField
} from '@mui/material';
import axios from 'axios';
import register from '../../pages/register';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRouter } from 'next/router';

type Property = {
  title: string;
  price: number;
}

export function UpdateForm(): ReactElement {
  const [property, setProperty] = useState();
  const router = useRouter();
  const { uuid } = router.query;

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

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data: Property = {
      title: event.target.title.value,
      price: parseInt(event.target.price.value),
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/1.0/properties/${uuid}`, data);

      if (response.status === 200) {
        await router.push('/properties')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Update property"
        />
        <Divider />
        <CardContent>
          {property && (
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="title"
                  name="title"
                  required
                  defaultValue={property.title}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="price"
                  name="price"
                  required
                  type="number"
                  defaultValue={property.price}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          )}

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
            color="primary"
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
}
