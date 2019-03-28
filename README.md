# CoderSchool FTW - Github Issues Page

Created with love by: `lvltcode`, `HasanArmstrong`, `Kimtrinh`
  
View online at: ...netlify.com/
  
Short description: Our friend Github has a very user-friendly API. It's a great example of a well-designed API - good practice for when you start writing your own APIs soon.

## Video Walkthrough

Here's a walkthrough of implemented user stories.

To create a GIF, use [LiceCap](http://www.cockos.com/licecap/), [RecordIt](http://www.recordit.co), or [Loom](http://www.useloom.com), and link the image here in the markdown.

```
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
```

## User Stories

The following **required** functionalities are completed:

1. [ ] The user can enter a repository in a search bar, click "search", and see the associated issues. The repository should be of the format owner/repo-name, e.g. facebook/react.
2. [ ] If the repository does not exist, the user should see a proper error message.
3. [ ] The user should be able to see the following information for each issue:
  * Issue Title
  * Number of the issue
  * Owner of the Issue
  * Owner Avatar
  * How long ago the issue was created in a human-friendly format (e.g. 2 days ago)
  * Body of the Issue
  * Label - note the color as returned by the API.
  * State of Issue (Open/Closed).
  * The user should be able to see multiple pages of results, by clicking a pagination control.

4. [ ] The user should be able to see the body of the issue rendered in markdown.
5. [ ] The user should be able to create a new issue via a modal for the repository, by clicking on a "new issue" button. 
6. [ ] Clicking on this button will pop open a modal that asks for the requisite fields.
7. [ ] If there is an error creating the issue (for example, the user not supplying all required parameters), there should be a nice error message to the user.


The following **optional** features are implemented:

1. [ ] The user can see more details (including comments!) in a modal that's opened by clicking on the title of the issue.
2. [ ] The user, upon opening this modal, can add a comment via a textarea at the bottom of the page.
3. [ ] The user, upon opening the modal, can close the issue. If the person does not have the appropriate access to close an issue, the user sees a nicely formatted error message.
4. [ ] The user can see reactions attached to each comment (Reactions API).
5. [ ] The user can add reactions to a comment (API documentation).
6. [ ] Input Fuzzy Matching: the user should be able to type in either https://github.com/facebook/react or facebook/react, BOTH should work.
7. [ ] Instead of using Modal to show issue, use React Router (link) to navigate to different URL issues/:issueId to display the full issue. Have the Back button to go back to the previous page (from the individual issue page).

The following **additional** features are implemented:

* [ ] Think of something cool here, people. This is your last React group project!


## Time Spent and Lessons Learned

Time spent: 24 hours spent in total (8 hours/person)

Describe any challenges encountered while building the app.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

#Description about react

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
