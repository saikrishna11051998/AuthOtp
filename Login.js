import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    // Function to send the verification code
    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error Sending Code: ", error);
        }
    };

    // Function to confirm the code and sign in
    const confirmCode = async () => {
        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            const userDocument = await firestore()
                .collection("users")
                .doc(user.uid)
                .get();

            if (userDocument.exists) {
                navigation.navigate("Dashboard");
            } else {
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            console.log("Invalid code", error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBD88" }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 40 }}>
                Phone Number Authentication
            </Text>

            {!confirm ? (
                <>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>
                        Enter Your Phone Number
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: "100%",
                            borderColor: "black",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10,
                        }}
                        placeholder="e.g., +1 650-555-3434"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity
                        onPress={signInWithPhoneNumber}
                        style={{
                            backgroundColor: "#841584",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                            Send code
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={{ marginBottom: 20, fontSize: 18 }}>
                        Enter the code sent to your phone:
                    </Text>
                    <TextInput
                        style={{
                            height: 50,
                            width: "100%",
                            borderColor: "black",
                            borderWidth: 1,
                            marginBottom: 30,
                            paddingHorizontal: 10,
                        }}
                        placeholder="Enter code"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity
                        onPress={confirmCode}
                        style={{
                            backgroundColor: "#841584",
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 20,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
                            Confirm code
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
