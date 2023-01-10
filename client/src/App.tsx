import React, { useState } from "react";
import handleSearch from "./services/handleSearch";
import { Input, Box, IconButton } from "@chakra-ui/react";
import { createMovieCard, MovieData } from "./Cards";
import { SimpleGrid } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState<MovieData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEnter = async (event: any) => {
    if (event.key === "Enter") {
      const searchResults = await handleSearch(searchTerm);
      setData(searchResults);
    }
  };

  return (
    <div>
      <Box w="100%" display="flex" justifyContent="center">
        <Box
          display="flex"
          alignItems="center"
          borderWidth="1px"
          rounded="md"
          px="2"
          py="1"
        >
          <Input
            placeholder="Search for a movie"
            size="md"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleEnter}
          />
          <IconButton
            aria-label="Search database"
            variant="ghost"
            colorScheme="blue"
            onClick={handleEnter}
            ml={2}
            roundedRight="md"
          >
            <text>Search</text>
          </IconButton>
        </Box>
      </Box>
      <div>
        {data && (
          <div>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {data.map((movie) => createMovieCard(movie))}
            </SimpleGrid>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
