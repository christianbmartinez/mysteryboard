# What's this? 
MysteryBoard lets you post text anonymously. This is the initial prototype. 

# Tech Stack
HTML, CSS, BOOTSTRAP 5, NODE, JS, EJS, MONGODB, EXPRESS, PATH, DAYJS, TBC...

# How it works
The user lands on the index.html page, submits their data via a form, and express posts that data to mongodb, where it is stored for subsequent retrieval. 

When express redirects the user to the index.ejs dashboard, it renders the data from the database, and the most recent post is at the top. All content is rendered into a unique container with the users fictional name (optional, default is anonymous), text content, and dayjs formatted date (a few seconds ago, minutes ago, etc). The user can scroll through all other mysteryboard posts from other users. 

You won't need a username or password to use mysteryboard. It will remain completely anonymous. 

MysteryBoard is 100% written by me. No Youtube tutorials or anything besides reference docs. I wanted to challenge myself to a full stack application. 

