# unit_2_project

link to project:

[Memory Lane](https://unit-2-project-rina.herokuapp.com/main)

User Stories:
- user must log in or make an account to access the main page
- user is able to make new posts of memories they would like to save on the application
- user can see all the posts they have created and posts are timestamped
- user can then edit or delete any posts made
- user can see a view count of how many times a certain post has been viewed
- user is able to comment on different posts
- user is able to like posts

Technologies Used:
- MongoDB Atlas
- Mongoose
- Node.js
- Express
- EJS
- CSS
- Bootstrap
- Javascript

Approach taken:
- 7 RESTFUL routes with full CRUD
- MVC file structure (Models, Views, Controllers)

Things to Work On:
- currently working through 'one-to-many' relationships additional lecture notes (not able to implement at this time)
- able to get view count to increase on each post 'view memory' click
    - made a separate route that acts as both a show route and a put route, it shows the posts description and also adds one to the view property at the same time
- attempting to check for existing username when user tries to sign up for first time
    - got the check for existing username to work!; had to comment out the initial if statement giving me the error message, to get the foundUsername message to pop up
- trying to add comment box functionality, cannot get it to work so far
    - got commenting to work for each post, Nolo helped me fix a few things with my commenting route and form submission
- able to add "like" functionality
- added a small animation to my banner on the index page, a simple slide in/fade in animation

Things to Improve in the Future:
- adding the specific username to each comment posted
- making it so that a certain user can only like a post once
- fix the view counter so that it doesn't increase on each show page reload
- making user profiles and making it so that every post is specific to a certain user
- along with the above, making my app more like a social media app; where users can "friend" other users and like each others posts and visit each others profiles to see their specific memories


