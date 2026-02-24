# TODO: Add SignIn and SignUp buttons to Navbar

## Plan:
- [x] Add Sign In and Sign Up buttons to desktop navbar
- [x] Add Sign In and Sign Up options to mobile dropdown menu

## File Edited:
- client/src/components/Navbar.jsx

---

# TODO: Delay Nikhil's task post notification by 20 seconds

## Plan:
- [x] Modify HeroGlow component in Landingpage.jsx to add 20-second delay when displaying "Nikhil posted a new task"

## File Edited:
- client/src/components/Landingpage.jsx

## Changes Made:
- Added getDelay() function that returns 20000ms for Nikhil's update (id: 3) and 10000ms for others
- Changed from setInterval to recursive setTimeout to allow variable delay
- Used React.useRef to properly manage timeout cleanup
