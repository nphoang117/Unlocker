import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#00000099',
    // backgroundTransparency: 1,
  },
  popupContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 250,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  minutes: {
    color: 'lightgrey',
    fontSize: 36,
  },
  distance: {
    color: 'lightgrey',
    fontSize: 26,
  },
  locksmithType: {
    color: 'lightgrey',
    fontSize: 20,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBg: {
    backgroundColor: '#008bff',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  declineButton: {
    top: 20,
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,
    width: 100,
    alignItems: 'center',
  },
  declineText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
