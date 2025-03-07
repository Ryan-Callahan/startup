# My Notes
## A Memoir by Ryan Callahan

### Git / Github
- Used for version control and collaboration
- Basic commands are:
  ```
  git status
  git add
  git commit -m "your message here"
  git push
  git pull
  git clone
  ```
- Remember: merge conflict bad (except when it's good)
- I actually knew all that already. Been doing it at work for about a year now

# AWS Server Instance
IP address: 3.85.182.55
Current domain: http://schedulizer260.com/

### SSH
in command line:
```
ssh -i "C:\Users\ryanc\BYU\Winter25\cs260\DO_NOT_COMMIT_260RSAkey.pem" ubuntu@3.85.182.55
```
or 
```
ssh -i "C:\Users\ryanc\BYU\Winter25\cs260\DO_NOT_COMMIT_260RSAkey.pem" ubuntu@schedulizer260.com
```

### Deployment

deployFiles
```
./deployFiles.sh -k "C:\Users\ryanc\BYU\Winter25\cs260\DO_NOT_COMMIT_260RSAkey.pem" -h schedulizer260.com -s startup
```

deployReact
```
./deployReact.sh -k "C:\Users\ryanc\BYU\Winter25\cs260\DO_NOT_COMMIT_260RSAkey.pem" -h schedulizer260.com -s startup
```


### Calendar stuff
 - The calendar will use an html grid system, each cell will need to be styled appropriately with borders and spacing
 - css will be helpful here to min/max/resize the calendar appropriately
 - events will represent json objects that contain the info/metadata for each event
 - events will be represented by divs that horizontally fill their cell, or are within a subgrid of that cell

### The grid system
 - the calendar will be one giant grid using javascript for coordinates/dates probably in year-month-day format, including
    seconds seems needlessly tedious
 - each cell will contain a subgrid that will hold events
   - divided into hours
   - into minutes if I have time to make a zoom-in function
 - each event will be a one-column grid with title, description, etc.
 - clicking an event should open a modal for that event where it can be edited and viewed

### The Event JSON Object
 - Each event will consist of:
   - Parent calendar
   - Date (to the minute)
   - Title
   - Description
   - Misc. information if i'm not lazy
 - Each event needs a unique identifier
   - easiest would be generated based on number of db entries
     - persistent
     - unique
     - small
     - allows for "duplicate" events (with same details, different IDs)

```json
{ 
  "EventID": 1,
  "calendarID": 4,
  "time": 1741312740000,
  "name": "Ryan's appointment",
  "description": "the appointed hour shall arrive"
}
```

### The chat system
 - idk seems kinda bs tbh
 - probably pretty simple
