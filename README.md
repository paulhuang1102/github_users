## Env
- Nodejs: 17.0.1
- npm: 8.14.0

## Usage
- install package
  ```
  npm i 
  ```
- run project
  ```
  npm start
  ```

## Module
- Github
  - users: `Users list`
  - loading: `Is fetching data`
  - errorMsg: `Error message`
  - since: `Current page`
  - prev: `Previous page`
  - next: `Next page`
  - selectedUser: `The user clicked to show detail`

## Known issues
> Not sure why https://api.github.com/users couldn't get `rel="prev"`
- Store pagination to implement previous page feature.

  "/epics/github.ts"
  ```js
    tap(() => {
            const index = paginations.findIndex((p) => p === action.payload.since);
            if (index < 0) {
              paginations.push(action.payload.since);
            }
          }),
  ```