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
./deployFiles.sh -k "C:\Users\ryanc\BYU\Winter25\cs260\DO_NOT_COMMIT_260RSAkey.pem" -h schedulizer260.com -s startup
```
