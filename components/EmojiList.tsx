import { useState } from 'react';
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSource[]>([
    require("../assets/images/emoji (1).png"),
    require("../assets/images/emoji (2).png"),
    require("../assets/images/emoji (3).png"),
    require("../assets/images/emoji (4).png"),
    require("../assets/images/emoji (5).png"),
    require("../assets/images/emoji (6).png"),
    require("../assets/images/emoji (7).png"),
    require("../assets/images/emoji (8).png"),
    require("../assets/images/emoji (9).png"),
    require("../assets/images/emoji (10).png"),
    require("../assets/images/emoji (11).png"),
    require("../assets/images/emoji (12).png"),
    require("../assets/images/emoji (13).png"),
    require("../assets/images/emoji (14).png"),
    require("../assets/images/emoji (15).png"),
    require("../assets/images/emoji (16).png"),
    require("../assets/images/emoji (17).png"),
    require("../assets/images/emoji (18).png"),
    require("../assets/images/emoji (19).png"),
    require("../assets/images/emoji (20).png"),
    require("../assets/images/emoji (21).png"),
    require("../assets/images/emoji (22).png"),
    require("../assets/images/emoji (23).png"),
    require("../assets/images/emoji (24).png"),
    require("../assets/images/emoji (25).png"),
    require("../assets/images/emoji (26).png"),
    require("../assets/images/emoji (27).png"),
    require("../assets/images/emoji (28).png"),
    require("../assets/images/emoji (29).png"),
    require("../assets/images/emoji (30).png"),
    require("../assets/images/emoji (31).png"),
    require("../assets/images/emoji (32).png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
