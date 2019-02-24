# General Information
A democratic decisionsmaking tool to find sustainable and conflict free solutions.  
Based on the principles of *"systemic consensus"* (http://www.sk-prinzip.eu/)

# Development

**Requirements:**

 - Node.js/ npm https://nodejs.org/en/
 - MongoDB https://docs.mongodb.com/manual/installation/

**Installation:**
```sh
$ git clone https://github.com/leonvdb/systemic-consensys.git
$ cd systemic-consensys
$ npm install
$ touch src/server/config/secrets.ts
```
Edit *src/server/config/secrets.ts*, according to the example file and include a working email address (in gmail less secure apps have to be enabled: https://myaccount.google.com/lesssecureapps).




**Run:** 
```sh
$ npm run start
```
