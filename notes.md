
DONE:
-When someone wants to create a poll, check if email already in users.
    If not in users create new unregistered user (only information is email) and retrieve user.id
    Else if already in users simply retrieve user.id
-Add new poll to db with 'creator' referencing the user by id

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
