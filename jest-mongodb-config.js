module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.2.6',
      skipMD5: true,
    },
    instance: {
      dbName: 'jest',
    },
    autoStart: false,
  },
}
