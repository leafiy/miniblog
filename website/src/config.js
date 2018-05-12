export default {
  development: {
    host: 'qiansmile.local',
    sitePort: 80,
    apiPort: 'http://localhost:8500/api/v1',
    devPort: 8040,
    googleMapKey:'AIzaSyBKqc37jzShn5vhv10Ae5kZG4TBYpPd-nU',
  },
  production: {
    googleMapKey:'AIzaSyBKqc37jzShn5vhv10Ae5kZG4TBYpPd-nU',
    host: 'qiansmile.com',
    sitePort: 80,
    apiPort: 'https://qiansmile.com/api/v1',
  }
};
