import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, HStack, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Index = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVehicleDetails = async () => {
    setLoading(true);
    setError("");
    setVehicleDetails(null);

    try {
      // Simulate an API call
      const response = await fetch(`/api/vehicle-details?trackingNumber=${trackingNumber}`);
      if (!response.ok) {
        throw new Error("Vehicle not found");
      }
      const data = await response.json();
      setVehicleDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Automated Traffic System</Text>
        <HStack width="100%">
          <Input placeholder="Enter Tracking Number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
          <Button onClick={fetchVehicleDetails} colorScheme="blue">
            Search
          </Button>
        </HStack>
        {loading && <Spinner size="xl" />}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {vehicleDetails && (
          <Box borderWidth="1px" borderRadius="lg" p={4} width="100%">
            <HStack spacing={4}>
              <FaCar size="2em" />
              <VStack align="start">
                <Text>
                  <strong>Owner:</strong> {vehicleDetails.owner}
                </Text>
                <Text>
                  <strong>Tax Status:</strong> {vehicleDetails.taxStatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                </Text>
                <Text>
                  <strong>Insurance Status:</strong> {vehicleDetails.insuranceStatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                </Text>
                <Text>
                  <strong>Pollution Status:</strong> {vehicleDetails.pollutionStatus ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />}
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
