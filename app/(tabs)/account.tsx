import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definisikan tipe parameter untuk stack navigator
type RootStackParamList = {
  index: undefined; // Rute 'index' tidak memiliki parameter
  profile: undefined; // Rute 'profile' tidak memiliki parameter
};

// Definisikan tipe navigasi
type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function AccountScreen() {
  const navigation = useNavigation<AccountScreenNavigationProp>(); // Menetapkan jenis navigasi

  const handleLogout = () => {
    Alert.alert(
      "Anda telah logout",
      "",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('index'), // Navigasi ke halaman 'index'
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Akun anda</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('@/assets/images/image23.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>b1modp</Text>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
              <Text style={styles.viewProfile}>Lihat profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pengaturan</Text>
          {['Manajemen akun', 'Visibilitas profil', 'Penyesuai sajian beranda', 'Akun yang diklaim',
            'Izin fitur sosial dan riwayat aktivitas', 'Notifikasi', 'Privasi dan data', 'Pusat laporan dan pelanggaran'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text style={styles.optionText}>{item}</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Masuk</Text>
          {['Tambahkan akun...', 'Keamanan', 'Jadilah penguji beta'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.option}>
              <Text style={styles.optionText}>{item}</Text>
              <Ionicons name={item === 'Jadilah penguji beta' ? 'open-outline' : 'chevron-forward'} size={20} color="#fff" />
            </TouchableOpacity>
          ))}
          {/* Tombol "Keluar" */}
          <TouchableOpacity
            style={styles.option}
            onPress={handleLogout} // Memanggil fungsi handleLogout saat tombol diklik
          >
            <Text style={styles.optionText}>Keluar</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '37%',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flexDirection: 'column',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
  },
  viewProfile: {
    color: '#ccc',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ccc',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
