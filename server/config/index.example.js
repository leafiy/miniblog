const config = {
  session: {
    secrets: '****',
    invitation: '****'
  },
  db: {
    "development": "****-dev",
    "production": "****"
  },
  port: {
    "development": 8500,
    "production": 8510
  },
  domain: {
    "development": "http://****.local",
    "production": "https://****.com"
  }
};

module.exports = config;
