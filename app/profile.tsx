import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const spacing = 8;
const itemWidth = (windowWidth - (spacing * 3)) / 2; // 2 kolom dengan spacing

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Dibuat');

  const renderFolderGrid = () => {
    return (
      <View style={styles.gridContainer}>
        {/* Yang Saya Simpan Folder */}
        <TouchableOpacity style={styles.folderContainer}>
          <View style={styles.folderImageContainer}>
            <View style={styles.mainImageContainer}>
              <Image 
                source={require('@/assets/images/image1.jpg')} 
                style={styles.mainImage}
              />
            </View>
            <View style={styles.smallImagesContainer}>
              <Image 
                source={require('@/assets/images/image2.jpg')}
                style={styles.smallImage}
              />
              <Image 
                source={require('@/assets/images/image10.jpg')}
                style={styles.smallImage}
              />
            </View>
          </View>
          <Text style={styles.folderTitle}>Yang Saya Simpan</Text>
          <Text style={styles.folderSubtitle}>3 Pin </Text>
        </TouchableOpacity>

        {/* Desain Folder */}
        <TouchableOpacity style={styles.folderContainer}>
          <View style={styles.folderImageContainer}>
            <View style={styles.mainImageContainer}>
              <Image 
                source={require('@/assets/images/image8.jpg')}
                style={styles.mainImage}
              />
            </View>
            <View style={styles.smallImagesContainer}>
              <Image 
                source={require('@/assets/images/image6.jpg')}
                style={styles.smallImage}
              />
              <Image 
                source={require('@/assets/images/image22.jpg')}
                style={styles.smallImage}
              />
            </View>
          </View>
          <Text style={styles.folderTitle}>Populer</Text>
          <Text style={styles.folderSubtitle}>3 Pin </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </Text>
      </TouchableOpacity>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={require('@/assets/images/image23.jpg')} style={styles.profileImage} />
        <Text style={styles.username}>b1modp</Text>
        <Text style={styles.handle}>@haarper666</Text>
      </View>

      {/* Follower Count */}
      <View style={styles.followContainer}>
        <Text style={styles.followText}>312 pengikut · 67 mengikuti</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit profil</Text>
      </TouchableOpacity>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Dibuat')}>
          <Text style={[styles.tab, activeTab === 'Dibuat' && styles.activeTab]}>Dibuat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Disimpan')}>
          <Text style={[styles.tab, activeTab === 'Disimpan' && styles.activeTab]}>Disimpan</Text>
        </TouchableOpacity>
      </View>

      {/* Content Based on Active Tab */}
      {activeTab === 'Dibuat' ? (
        <Text style={styles.noContentMessage}>
          Belum ada Pin yang dibuat
        </Text>
      ) : (
        renderFolderGrid()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
    marginTop: 50,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  handle: {
    color: 'gray',
    fontSize: 14,
  },
  followContainer: {
    marginVertical: 10,
  },
  followText: {
    color: 'gray',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  editButtonText: {
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tab: {
    color: 'gray',
    fontSize: 16,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  activeTab: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing,
    width: '100%',
  },
  folderContainer: {
    width: itemWidth,
    marginHorizontal: spacing / 2,
  },
  folderImageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  mainImageContainer: {
    flex: 2,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
  },
  smallImagesContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  smallImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#333',
    margin: 0.5,
  },
  folderTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  folderSubtitle: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
  },
  noContentMessage: {
    color: 'gray',
    marginTop: 50,
    textAlign: 'center',
  },
});