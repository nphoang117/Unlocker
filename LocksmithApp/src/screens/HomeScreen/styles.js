import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  //   container: {flex: 1},
  bottomContainer: {
    height: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  bottomText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  goButton: {
    position: 'absolute',
    backgroundColor: '#1495ff',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 80,
    left: Dimensions.get('window').width / 2 - 37,
  },
  goText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  balanceButton: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 30,
    left: Dimensions.get('window').width / 2 - 50,
  },
  balanceText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
