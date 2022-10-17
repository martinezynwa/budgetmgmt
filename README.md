---
https://budget-mgmt-1.netlify.app

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

### PROGRESS

### 0.1

- [x] start
- [x] install packages, set-up lint
- [x] create Mongo db
- [x] define how database will look like
- [x] typeDefs - setup how items and users should be structured
- [x] models for above

### 0.11

- [x] resolvers
- [x] queries
- [x] set-up context and tokens for authorization

### 0.12

- [x] validator for authorization
- [x] figure out item categories
- [x] category resolvers, models, mutations etc.
- [x] timestamps - 1 format, dayjs necessary?
- [x] default values for currency
- [x] install first packages on frontend

### 0.13

- [x] get queries working in Apollo explorer
- [x] routing
- [x] implement registration(without styles)
- [x] implement login(without styles)
- [x] implement logout(without styles)
- [x] implement navbar(without styles)
- [x] implement hiding login/logout when user is logged-in
- [x] implement hiding home/statistics when no-one is logged-in

### 0.14

- [x] basic view for getSpecificMonth
- [x] addItem
- [x] deleteItem

### 0.15

- [x] apply React-Bootstrap styles
  - [x] login/register
  - [x] navbar
  - [x] homepage
  - [x] for item records

### 0.16

- [x] calendar view when setting date
- [x] default date inside form = today
- [x] on item input, category should be drop-down with category options

### 0.17

- [x] buttons on homepage that will change items view per selected user
  - [x] after item is added, refetchQueries so new item is displayed immediately
  - [x] after item is deleted, refetchQueries

### 0.18

- [x] pop-up notifications
  - [x] after item added
  - [x] after item deleted
  - [x] for any type of error
  - [x] after item edited
- [x] implement useReducer, useQuery
  - [x] implement AuthContext + authReducer
  - [x] implement NotificationContext + notificationReducer
  - [x] implement ItemContext + itemReducer

### 0.19

- [x] start implementing CSS
  - [x] category icons
  - [x] custom form
  - [x] item card
  - [x] edit form
  - [x] notification bootstrap to custom css
  - [x] total spending card/button
- [x] button next to item, that will display popup with:
  - [x] delete button
  - [x] fields for editItem
  - [x] implement editItem mutation

### 0.20

- [x] improve navbar styling
- [x] display total spending card per user above addItem
  - [x] backend to be updated
  - [x] figure out how to return spending per user
  - [x] implement the returned value into TotalCard
- [x] fix disappearing user name after refresh
- [x] category addition(somewhere)
  - [x] input
  - [x] category card
  - [x] category deletion
    - [x] update backend
- [x] .scss to .css

### 0.21

- [x] importance to category
- [x] CategoryContext
- [x] Page that will show all records
  - [x] udpate backend
  - [x] update/create context/reducers
  - [x] create All Records page
  - [x] filter according to year and month
  - [x] total spending card synced with selected year+month

### 0.22

- [x] difference between users

### 0.23

- [x] Statistics per category page
- [x] itemPrice issue after edit: itemPrice: { '0': '1', '1': '2', '2': '5'}
- [x] check that price contains numbers only
- [x] update project history into a better structure(each change into its version)
- [x] validation for category on backend into separate component
- [x] add check that default categories cannot be deleted
- [x] remove unnecessary bootstrap
  - [x] DeleteButton, EditButton, ItemModal - buttons

### 0.24

- [x] fixed navbar
- [x] toggle for hiding of adding items/categories
  - [x] create toggle that can be re-used between components
  - [x] toggle function(hook) that can be re-used between components
  - [x] CSS fixes for above
- [x] popup that asks if item/category should be edited/deleted
  - [x] component ConfirmDialog
  - [x] css styling
  - [x] custom hook so dialog can be reused anywhere
- [x] check that only user who created the item can edit/delete it

### 0.25

- [x] improve the notification placement and CSS styling
  - [x] for mobile view
  - [x] for normal view
  - [x] notification fix when item category cannot be deleted
- [x] Login/register page design
  - [x] bug fixes on TotalDifference and Navigation when third user is added
- [x] navbar active when logged-in on mobile, should be hidden

### 0.26

- [x] hide popup after item gets edited
- [x] show errors when one happens during item editation
- [x] uncontrolled component error during item editation
- [x] fix refetchQueries after item is added/edited/deleted
- [x] remove unused queries and mutations on backend/frontend

### 0.27

- [x] popup shown when item cannot be deleted
- [x] navmenu re-done
  - [x] normal view - moved to side
  - [x] mobile view - moved to bottom
- [x] csv --> json
  - [x] import CSV on frontend
  - [x] parse the csv into a better structure
  - [x] set-up backend for accepting imported items
  - [x] cleaner code on frontend
  - [x] style css
- [x] fix when refreshed, active button is home
- [x] data backup to json
  - [x] add component for file download
  - [x] figure out why is first downloaded file empty
  - [x] style css
- [x] button styling for import input
- [x] sort items by time

### 0.28

- [x] google sign-in instead of custom login/registering
- [x] find suitable solution
- [x] implement additions/changes on frontend
- [x] implement additions/changes on backend
- [x] remove old components etc
- [x] fix code that relied on old user type
- [x] figure out .env on frontend

### 0.29

- [x] possibility of changing name of user
- [x] hide data tab on mobile
- [x] change design of error on item form
- [x] re-do all records / statistics selection pages so they aren't in one component
- [x] css clean-up/refactoring of whole app

### 0.30

- [x] select buttons have draggable scroll when more users registered
- [x] on mobile - longer item name length increases card size
- [x] hide historical differences on demand

### 0.31

- [x] demo version
  - [x] login only for 5 persons max
  - [x] test data
  - [x] limit for adding items
  - [x] limit for adding categories
  - [x] clean-up of data after logout
  - [x] delete user after logout
  - [x] limit for uploaded file
  - [x] deploy

### 0.31
- [x] loading spinner on login page

---

### future

- [ ] migration to tailwind & re-design
 - [x] Navbar
 - [x] Home
 - [x] Statistics
 - [x] Items
 - [x] Options
 - [x] Data
 - [ ] Login
 - [ ] Modal
 - [ ] Notifications
 - [ ] confirmation of actions

- [ ] statistics page - comparison with previous month(s)
- [ ] dark mode

---
