WARNING!
When using Google Chrome, use following plugin, as by default making API requests in Google Chrome is not possible.

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en


CURRENT STATUS: 
Can view post on http://localhost:3000/poll/:poll_id
All other API requests (including for poll creation) still need to be made manually (i.e. with postman)


Auth-TODO:
-Create JWT for accessing Poll with moderator rights
-Embed JWT in link that references poll and send to creator email (Best redirect user, so that final link 
    will not include the token, so that there is no risk in accidently sharing the link. 
    Also hide link in html element in email)
-Add JWT to local storage and take care of continuous auth when developing frontend


When sharing with more participants:
-Per Email: link sent that includes token, so that they can revisit and edit
-Sharing poll link: Create token and save to local storage in first visit. 
    Participant can return and edit as long as token is still in local storage

Resources: 

Visotschnig, E. & Visotschnig, V. (2016). Einführung in das SK-Prinzip. Retrieved from http://www.sk-prinzip.eu/wp-content/uploads/2016/12/Einf%C3%BChrung-in-systemisches-Konsensieren-2.pdf
