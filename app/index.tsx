import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image, Animated} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LogoImage = require('@/assets/images/pinterest.png');

const images = [
  { source: require('@/assets/images/image1.jpg'), height: 190 },
  { source: require('@/assets/images/image2.jpg'), height: 190 },
  { source: require('@/assets/images/image3.jpg'), height: 190 },
  { source: require('@/assets/images/image4.jpg'), height: 190 },
  { source: require('@/assets/images/image5.jpg'), height: 190 },
  { source: require('@/assets/images/image6.jpg'), height: 190 },
  { source: require('@/assets/images/image7.jpg'), height: 190 },
  { source: require('@/assets/images/image8.jpg'), height: 190 },
  { source: require('@/assets/images/image9.jpg'), height: 190 },
  { source: require('@/assets/images/image10.jpg'), height: 190 },
  { source: require('@/assets/images/image11.jpg'), height: 190 },
  { source: require('@/assets/images/image12.jpg'), height: 190 },
];

export default function Index() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollY.setValue(0);
    Animated.loop(
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  
    return () => {
      scrollY.stopAnimation();
    };
  }, [scrollY]);

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  const handleNavigate = (action: 'masuk' | 'daftar') => {
    Alert.alert(
      action === 'masuk' ? 'Masuk' : 'Daftar',
      action === 'masuk' ? 'Kamu mencoba untuk masuk.' : 'Kamu mencoba untuk daftar.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => router.push('/home') },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      
      <Animated.View style={[styles.backgroundGallery, { transform: [{ translateY }] }]}>
        {images.concat(images).map((img, index) => (
          <Image key={index} source={img.source} style={[styles.backgroundImage, { height: img.height }]} resizeMode="cover" />
        ))}
      </Animated.View>

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.welcomeText}>Selamat datang di Pinterest</Text>
        
        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => handleNavigate('daftar')}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => handleNavigate('masuk')}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Dengan melanjutkan, berarti Anda menyetujui <Text style={styles.linkText}>Persyaratan Layanan</Text> Pinterest dan menyatakan bahwa Anda telah membaca <Text style={styles.linkText}>Kebijakan Privasi</Text> kami.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundGallery: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    width: '32%',
    margin: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    borderRadius: 10,
    width: '100%',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    bottom: 0,
    backgroundColor:'#000',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: '#E60023', 
  },
  loginButton: {
    backgroundColor: '#555', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
