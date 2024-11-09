import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, FlatList, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const imagePopuler = [
    { id: '1', source: require('@/assets/images/image13.jpg') },
    { id: '2', source: require('@/assets/images/image15.jpg') },
    { id: '3', source: require('@/assets/images/image17.jpg') },
    { id: '4', source: require('@/assets/images/image16.jpg') },
    { id: '5', source: require('@/assets/images/image18.jpg') },
    { id: '6', source: require('@/assets/images/image19.jpg') },
  ];

  const imageLucu = [
    { id: '1', source: require('@/assets/images/lucu1.jpg') },
    { id: '2', source: require('@/assets/images/lucu2.jpg') },
    { id: '3', source: require('@/assets/images/lucu3.jpg') },
    { id: '4', source: require('@/assets/images/lucu4.jpg') },
    { id: '5', source: require('@/assets/images/lucu5.jpg') },
    { id: '6', source: require('@/assets/images/lucu6.jpg') },
  ];

  const featuredImages = [
    { source: require('@/assets/images/image14.jpg'), title: 'dress & kebaya', subtitle: 'Model seragam bridesmaid' },
    { source: require('@/assets/images/image21.jpg'), title: 'Summer Collection', subtitle: 'Inspirasi musim panas' },
    { source: require('@/assets/images/image20.jpg'), title: 'Wedding Ideas', subtitle: 'Ide pernikahan elegan' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % featuredImages.length;
        scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentImageIndex(newIndex);
  };

  const handleImagePress = (source: any) => {
    setSelectedImage(source);
    setModalVisible(true);
  };

  const renderImageItem = ({ item }: { item: { id: string; source: any } }) => (
    <TouchableOpacity 
      onPress={() => handleImagePress(item.source)}
      style={styles.imageContainer}
      activeOpacity={0.7}
    >
      <Image source={item.source} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.featuredImageContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {featuredImages.map((item, index) => (
            <Image key={index} source={item.source} style={styles.featuredImage} />
          ))}
        </ScrollView>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            placeholder="Cari di Pinterest"
            placeholderTextColor="#ccc"
            style={styles.searchInput}
          />
          <Ionicons name="camera-outline" size={20} color="#ccc" style={styles.cameraIcon} />
        </View>
        <View style={styles.overlayText}>
          <Text style={styles.title}>{featuredImages[currentImageIndex].title}</Text>
          <Text style={styles.subtitle}>{featuredImages[currentImageIndex].subtitle}</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Populer di Pinterest</Text>
        <FlatList
          data={imagePopuler}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderImageItem}
          contentContainerStyle={styles.imageList}
        />
        <Text style={styles.sectionTitle}>Gambar profil lucu</Text>
        <FlatList
          data={imageLucu}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderImageItem}
          contentContainerStyle={styles.imageList}
        />
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image source={selectedImage} style={styles.modalImage} />
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close-circle" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  cameraIcon: {
    marginLeft: 8,
  },
  featuredImageContainer: {
    position: 'relative',
  },
  featuredImage: {
    width: width,
    height: 400,
  },
  overlayText: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 16,
  },
  imageContainer: {
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  imageList: {
    paddingHorizontal: 11,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.6,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 20,
    padding: 5,
  },
});