import { View, Text, Button, Alert } from "react-native";
import React, { FC, useState } from "react";
import { useAuthStore } from "@state/authStore";
import { deliveryLogin } from "@service/authService";
import { resetAndNavigate } from "@utils/NavigationUtils";

const DeliveryDashboard: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate("DeliveryDashboard");
    } catch (error) {
      Alert.alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Text>DeliveryDashboard</Text>
    </View>
  );
};

export default DeliveryDashboard;
