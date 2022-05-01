---
### MAIN CONCEPTS ###
- web-app tracking expenses between 2 or more people(first version for two)
- basically a family/couples' home budget web-app
- each person inputs what they paid for in order to see who pays for what
- Statistics like:
    - total expenses
    - expenses per month
    - difference between persons(total, monthly)
    - division by categories(groceries, lunch, gas, etc..)
---

### TO-DO PREPARATIONS

- [x] **figure out technology stack**
  - [x] will be kept locally for now
  - [x] will be written in JS
  - [x] React
  - [x] state management Redux
  - [x] GraphQL?
    - [x] should complete FSO chapter 8 first in order to figure out whether to go with it or not
    - [x] yes
  - [x] MongoDB as database?
    - [x] how many records can be inside MongoDB?
  - [x] **coding preparation**
    - [x] do research about how are similar simple web apps structured
    - [x] create structure and place files into respective folders

---

### TO-DO WORK BACKEND

- [x] start
- [x] install packages, set-up lint
- [x] create Mongo db
- [x] define how database will look like
- [x] typeDefs - setup how items and users should be structured
- [x] models for above
- [x] resolvers
- [x] queries
- [x] validator for authorization
- [x] set-up context and tokens for authorization
- [x] figure out item categories
- [x] category resolvers, models, mutations etc.
- [x] timestamps - 1 format, dayjs necessary?
- [ ] category name link with item name - **don't need right now**
- [ ] link item and categories with user etc. **to be tested better with frontend**
- [x] default values for currency

---

### TO-DO WORK FRONTEND

- [x] install first packages
- [x] get queries working in Apollo explorer
- [x] routing
- [x] implement registration(without styles)
- [x] implement login(without styles)
- [x] implement logout(without styles)
- [x] implement navbar(without styles)
- [x] implement hiding login/logout when user is logged-in
- [x] implement hiding home/statistics when no-one is logged-in
- [x] basic view for getSpecificMonth
- [x] addItem
- [x] deleteItem
- [x] apply React-Bootstrap styles
  - [x] login/register
  - [x] navbar
  - [x] homepage
  - [x] for item records
- [x] calendar view when setting date
- [x] default date inside form = today
- [x] on item input, category should be drop-down with category options
- [x] buttons on homepage that will change items view per selected user
  - [x] after item is added, refetchQueries so new item is displayed immediately
  - [x] after item is deleted, refetchQueries
- [x] pop-up notifications
  - [x] after item added
  - [x] after item deleted
  - [x] for any type of error
  - [x] after item edited
- [x] implement useReducer, useQuery
  - [x] implement AuthContext + authReducer
  - [x] implement NotificationContext + notificationReducer
  - [x] implement ItemContext + itemReducer
- [x] start implementing CSS
  - [x] category icons
  - [x] custom form
  - [x] item card
  - [x] edit form
  - [x] notification bootstrap to custom css
  - [x] total spending card/button
- [x] improve navbar styling
- [x] display total spending card per user above addItem
  - [x] backend to be updated
  - [x] figure out how to return spending per user
  - [x] implement the returned value into TotalCard
- [x] fix disappearing user name after refresh
- [x] button next to item, that will display popup with:
  - [x] delete button
  - [x] fields for editItem
  - [x] implement editItem mutation
  - [ ] hide after item edited
- [x] category addition(somewhere)
  - [x] input
  - [x] category card
  - [x] category deletion
    - [x] update backend
- [x] .scss to .css
- [x] importance to category
- [x] CategoryContext
- [x] Page that will show all reacords
  - [x] udpate backend
  - [x] update/create context/reducers
  - [x] create All Records page
  - [x] filter according to year and month
  - [x] total spending card synced with selected year+month
- [ ] Statistics page
- [ ] difference between users
- [ ] Toggle for hiding of adding items/categories
- [ ] fix refetchQueries after item is added/edited/deleted
- [ ] uncontrolled component error during item editing
- [ ] improve the notification placement
- [ ] check that price contains numbers only
- [ ] validation for category on backend into separate component

---
