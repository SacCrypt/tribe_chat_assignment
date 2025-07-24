import { allStylesObject } from "@/css/allStyles";
import { postNewMessage } from "@/services/messageService";
import { useMessageStore } from "@/store/useMessageStore";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MessageInput = () => {
  const [text, setText] = useState("");
  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    try {
      const newMsg = await postNewMessage(text);
      useMessageStore.getState().addMessage(newMsg);
      setText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={allStylesObject.textContainer}
    >
      <View style={allStylesObject.inputRow}>
        <TextInput
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
          style={allStylesObject.input}
        />
        <TouchableOpacity
          onPress={() => handleSend(text)}
          style={allStylesObject.sendButton}
        >
          <Text style={allStylesObject.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;
