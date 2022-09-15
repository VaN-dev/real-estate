import { FunctionComponent, ReactElement, useReducer, useState } from 'react';
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

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.target.name]: event.target.value
//   }
// }

type Property = {
  title: string;
  price: number;
}

export function CreateForm(): ReactElement {
  const router = useRouter();

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data: Property = {
      title: event.target.title.value,
      price: parseInt(event.target.price.value),
    }

    try {
      const response = await axios.post('http://localhost:4000/api/1.0/properties', data);

      if (response.status === 201) {
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
          title="Create property"
        />
        <Divider />
        <CardContent>
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
                variant="outlined"
              />
            </Grid>
          </Grid>


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
