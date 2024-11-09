import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Pressable,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

// Definisi interface untuk tipe data gambar
interface ImageItem {
  id: string;
  source: any; // atau gunakan typeof require('@/assets/images/image1.jpg')
  height: number;
  label: string;
}

// Interface untuk props ImageViewer
interface ImageViewerProps {
  image: ImageItem;
  onClose: () => void;
}

// Daftar gambar
const images: ImageItem[] = [
  { id: '1', source: require('@/assets/images/image1.jpg'), height: 180, label: '@ella.freya' },
  { id: '2', source: require('@/assets/images/image2.jpg'), height: 180, label: '@m.by__sana' },
  { id: '3', source: require('@/assets/images/image3.jpg'), height: 250, label: '@mayay___y' },
  { id: '4', source: require('@/assets/images/image4.jpg'), height: 250, label: '@m.by__sana' },
  { id: '5', source: require('@/assets/images/image5.jpg'), height: 200, label: '@m.by__sana' },
  { id: '6', source: require('@/assets/images/image6.jpg'), height: 200, label: '@momo' },
  { id: '7', source: require('@/assets/images/image7.jpg'), height: 200, label: '@m.by__sana' },
  { id: '8', source: require('@/assets/images/image8.jpg'), height: 200, label: '@mayay___y' },
  { id: '9', source: require('@/assets/images/image9.jpg'), height: 220, label: '@m.by__sana' },
  { id: '10', source: require('@/assets/images/image10.jpg'), height: 220, label: '@xeesoxee' },
  { id: '11', source: require('@/assets/images/image11.jpg'), height: 250, label: '@imwinter' },
  { id: '12', source: require('@/assets/images/image12.jpg'), height: 250, label: '@xeesoxee' },
];

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = (image: ImageItem) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const ImageViewer: React.FC<ImageViewerProps> = ({ image, onClose }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <StatusBar hidden />
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
        <View style={styles.modalImageContainer}>
          <Image
            source={image.source}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <View style={styles.modalOverlay}>
            <Text style={styles.modalOverlayText}>{image.label}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handleImagePress(item)}
            activeOpacity={0.9}
          >
            <Image
              source={item.source}
              style={[styles.image, { height: item.height }]}
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      
      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 5,
  },
  modalOverlayText: {
    color: '#fff',
    fontSize: 16,
  },
});