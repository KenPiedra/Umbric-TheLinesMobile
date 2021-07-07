# How to get started

1. Install latest version of Node.js

2. Install Expo CLI and yarn package.
   ```Shell
   > npm install --global expo-cli
   > npm install --global yarn
   ```

3. Create `config.tsx` file under `firebase` directory in source repository. 
   Here's the code sample.

   ```js
   const firebaseConfig = {
     apiKey: "AIzaxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxx",
     authDomain: "the-lines-mobile.firebaseapp.com",
     databaseURL: "https://the-lines-mobile-default-rtdb.firebaseio.com",
     projectId: "the-lines-mobile",
     storageBucket: "the-lines-mobile.appspot.com",
     messagingSenderId: "xxxxxxxxxxxxx",
     appId: "1:xxxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxx"
   };

   export { firebaseConfig };
   ```

   You can get `apiKey`, `appId` and `messagingSenderId` from Firebase project Settings page.

4. Install all dependencies for the project.
   ```Shell
   > yarn install
   ```

5. Run with Expo CLI.
   ```Shell
   > expo start
   ```