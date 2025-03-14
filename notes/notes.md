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
   - Title
   - Description
   - Misc. information if i'm not lazy
 - Each event needs a unique identifier
   - easiest would be generated based on number of db entries
     - small
     - allows for "duplicate" events (with same details, different IDs)
 - Events will be stored within an array corresponding to the time of the event. This way, events that take place at 
   the same time can be easily accessed by the date.
 - In the future, it may be more efficient to create a second container array that corresponds to each calendar. This 
   would allow the DAO to pull only events related to calendars the user is entitled to, without pulling every single 
   event from every single calendar that takes place at a given date only to display a fraction of them.

```json
{
  "calendarID" : 4,
  "dates" : [
    {
      "date": 1741312740000,
      "events": [
        {
          "EventID": 1,
          "name": "Ryan's appointment",
          "description": "the appointed hour shall arrive"
        }
      ]
    }
  ]
}
```

### The Event Table
 - In the db, every event will be stored in an array of events with the ID of the array being the time of the events 
   in epoch time. For example, when an event is created the time selected for the event will be converted to epoch 
   time, the corresponding array will be looked up (and created if it doesn't exist) and the event will be stored 
   in the array
 - This allows the calendar display to look up any/all events per cell without having to resort to iterating through 
   a list of all events for every cell, or having to pass the events in as a prop for the Time jsx function.

### The chat system
 - idk seems kinda bs tbh
 - probably pretty simple
