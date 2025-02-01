import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";

const colors = [
  "#531CB3",
  "#7149EE",
  "#B754FF",
  "#ED4FEF",
  "#ED49AB",
  "#ED4FEF",
  "#B754FF",
  "#7149EE",
];

const DynamicTagInput = () => {
  const [tags, setTags] = useState<{ text: string; width: number; id: number }[]>([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const lastId = useRef(0);
  const [inputWidth, setInputWidth] = useState(50);

  const handleAddTag = () => {
    if (inputText.trim() === "") return;

    const newTag = {
      text: inputText.trim(),
      width: Math.max(inputWidth + 40, 50),
      id: ++lastId.current,
    };

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTags([...tags, newTag]);
    setInputText("");
    setInputWidth(50);
  };

  const handleRemoveTag = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <AnimatedTag key={tag.id} text={tag.text} width={tag.width} color={colors[index % colors.length]} onRemove={() => handleRemoveTag(tag.id)} />
        ))}

        {/* Input box that expands dynamically */}
        <TextInput
          ref={inputRef}
          style={[styles.input, { width: inputWidth }]}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
          }}
          onSubmitEditing={handleAddTag}
          placeholder="add +"
          returnKeyType="done"
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setInputWidth(Math.max(width, 50)); // Update input width based on text size
          }}
        />
      </View>
    </View>
  );
};

const AnimatedTag = ({ text, width, color, onRemove }: { text: string; width: number; color: string; onRemove: () => void }) => {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.tag, { backgroundColor: color, width }, animatedStyle]}>
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
    alignItems: "center",
  },
  label: {
    fontSize: 30,
    color: "#9b87fd",
    textAlign: "center",
  },
  instructions: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7149ee",
    borderRadius: 10,
    padding: 5,
    minWidth: "80%",
    backgroundColor: "#2a2734",
  },
  input: {
    fontSize: 24,
    color: "#7149ee",
    padding: 5,
    height: 48,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#7149ee",
    backgroundColor: "#2a2734",
    textAlign: "left",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 40,
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

export default DynamicTagInput;
