// In a new file called Card.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  shouldForwardProp,
} from "@chakra-ui/react";
import {
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { MovieData } from "../../../shared/MovieInfo";

export const createMovieCard = (movie: MovieData): JSX.Element => {
  return (
    <Card maxW="sm" variant="outline">
      <CardBody mt="0">
        <img
          key={movie.id}
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
          style={{
            borderRadius: "5%",
            width: "auto", // adjust the width of the image
            height: "200px", // adjust the height of the image
          }}
        />
        <Stack mt="3">
          <Heading size="md">{movie.title}</Heading>
          <Text color="blue.600">{movie.release_date.split("-")[0]}</Text>
        </Stack>
      </CardBody>
      <Divider mt="0" />
      <CardFooter>
        <ButtonGroup mt="0">
          <Button variant="solid" colorScheme="blue">
            Add
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
