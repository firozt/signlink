import React from "react";
import { NativeBaseProvider, Box, Text, Button } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Box>
        <Text margin={10}>Hello world</Text>
        <Button width={40}>Click Here</Button>
      </Box>
    </NativeBaseProvider>
  );
}
