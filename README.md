# Norinco log management app (Name TBD)

## How to setup development environment

- Download and install the latest jdk8:
  [https://www.oracle.com/in/java/technologies/javase/javase-jdk8-downloads.html](https://www.oracle.com/in/java/technologies/javase/javase-jdk8-downloads.html)
- Verify JAVA_HOME environment variable is set correctly. Check if java is present in path by opening a terminal and running `java -version`. If not, set that in path.
- Next you need to setup your android development environment. You can find the exact steps from the **Android development environment** section in the link below:
  [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
- Prepare your android device (turn on usb debugging) or virtual device (start it from android studio).
- In the vscode terminal execute:

  NPM

  ```
  npm i
  npm run android
  ```

  YARN

  ```
  yarn
  yarn android
  ```

- Read more at [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

## Development flow

- We'll be following the [**Git Feature Branch Workflow**](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).
- Before working on any new feature, do a `git checkout master`.
- See if you don't have any changes on your master branch, then do a `git pull` to pull the latest changes.
- Then do a `git checkout <feature-branch-name>` to create a copy of the current master branch and then start working.
- After you're done, stage your files, commit your changes, then do a `git push -u origin <feature-branch-name>`.
- Try to write [**Semantic Commit Messages**](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) whenever possible.
