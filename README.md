# What's this? 
MysteryBoard lets you post content while remaining anonymous.

# Built with
HTML, CSS, BOOTSTRAP 5, NODE, JS, EJS, MONGODB, EXPRESS, PATH, DAYJS, UNDRAW

# How it works
The user lands on the home page, submits their data via a simple form, and express posts that data to mongodb, where it is stored for subsequent retrieval. 

When express redirects the user to the mysteryboards view, it renders the data from the database, and the most recent post is at the top. All content is rendered into a unique container with the users fictional name (optional, default is anonymous), text content, and dayjs formatted date. The user can scroll through all other mysteryboard posts from other users. 

You don't need a username or password to use mysteryboard. 

[View live](https://mysteryboard.herokuapp.com/)

