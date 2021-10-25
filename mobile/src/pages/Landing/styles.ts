import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8eb897',
    justifyContent: 'center',
    padding: 40,
  },

  banner: {
    width: '90%',
    resizeMode: 'contain',
    zIndex: -7,
    alignSelf: 'center',
  },

  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFF',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
  },

  titleApp: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFF',
    fontSize: 50,
    zIndex: 3,
  },

  image: {
    width: 40,
    height: 40,
    tintColor: '#ffffff',
  },

  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },

  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonPrimary: {
    backgroundColor: '#9ddbad',
  },

  buttonSecondary: {
    backgroundColor: '#20a4f3',
  },

  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 20,
  },

  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 12,
    lineHeight: 20,
    maxWidth: 140,
    marginTop: 40,
  },
});

export default styles;
