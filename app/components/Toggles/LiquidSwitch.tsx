import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";

const LiquidTagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleAddTag = () => {
    if (text.trim() !== "") {
      setTags([...tags, text.trim()]);
      setText("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <AnimatedTag key={index} text={tag} onRemove={() => handleRemoveTag(index)} />
        ))}
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddTag}
          placeholder="Type and press enter..."
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

const AnimatedTag = ({ text, onRemove }: { text: string; onRemove: () => void }) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.tag, animatedStyle]}>
      <Svg width={60} height={40} viewBox="0 0 60 40">
        <Path d="M10 20 Q30 5, 50 20 T10 20" fill="#4CAF50" />
      </Svg>
      <Text style={styles.tagText}>{text}</Text>
      <Pressable onPress={onRemove}>
        <Text style={styles.remove}>✕</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    minWidth: 100,
    fontSize: 16,
    padding: 5,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: "white",
    marginRight: 5,
  },
  remove: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LiquidTagInput;
