import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = await MongoMemoryServer.create()

(async () => {
  await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
    console.log('HELLO')

  // your code here

  await mongoose.disconnect();
})();
