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

### PAGE LOOK AND FUNCTIONS ###

#### header
- TBD
#### upper-body
- TBD
#### mid-body
- TBD
#### footer
- TBD


---

### TO-DO PREPARATIONS ###
- [X] **figure out technology stack**
  - [X] will be kept locally for now
  - [X] will be written in JS
  - [X] React
  - [X] state management Redux
  - [X] GraphQL?
    - [X] should complete FSO chapter 8 first in order to figure out whether to go with it or not
    - [X] yes
  - [X] MongoDB as database?
    - [X] how many records can be inside MongoDB?
  - [X] **coding preparation**
      - [X] do research about how are similar simple web apps structured
      - [X] create structure and place files into respective folders

---

### TO-DO WORK BACKEND ###
 - [X] start
 - [X] install packages, set-up lint
 - [X] create Mongo db
 - [X] define how database will look like
 - [X] typeDefs - setup how items and users should be structured
 - [X] models for above
 - [X] resolvers
 - [X] queries
 - [X] validator for authorization
 - [X] set-up context and tokens for authorization
 - [X] figure out item categories
 - [X] category resolvers, models, mutations etc.
 - [X] timestamps - 1 format, dayjs necessary?
 - [ ] category name link with item name - **don't need right now**
 - [ ] link item and categories with user etc. **to be tested better with frontend**
 - [ ] default values for currency

---

### TO-DO PREPARATIONS FRONT-END ###
- [ ] **expand main concept**
  - [ ] list all functions that app needs to have

- [ ] **figure out basic design**
  - [ ] figure out Tailwind/Bootstrap/???
  - [ ] basic look, button placement, how many pages

---

### TO-DO WORK FRONTEND ###
 - [X] install first packages
 - [X] get queries working in Apollo explorer
 - [X] routing
 - [X] implement registration(without styles)
 - [X] implement login(without styles)
 - [X] implement logout(without styles)
 - [X] implement navbar(without styles)
 - [X] implement hiding login/logout when user is logged-in
 - [X] implement hiding home/statistics when no-one is logged-in
 - [ ] basic view for getItems
 - [ ] basic view for getSpecificMonth
 - [ ] basic view for getItemsByUser
 - [ ] addItem
 - [ ] deleteItem
 - [ ] editItem
 - [ ] apply styles

---