import { Client, Databases, Storage} from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('653d55920d4fd37abda4');
    
  export const db = new Databases(client)
  
  export const storage = new Storage(client);
  
  export default client

