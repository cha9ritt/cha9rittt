# Web 02 · Log in & setup: handoff note

Figma file: Ridy 2.0, fileKey `AbSD4yMoivc23h1tEqsbV7`. Target page: `3:76` "Web 02 · Log in & setup".

## Brief (short)
Redesign every Web 02 screen so it matches App 01 (Welcome, Log in, Forgot password) and App 02 (Choose role → All set), in Desktop 1440, Tablet 834 and Mobile 390. Use the same responsive structure as "web 00 . home page log out" (`3:75`). Bind everything to variables and styles. Do not change the home, app or Design System pages. Then replace the old Web 02 frames, including the grey bar on "Setup done".

## Step counts (user's answers + what the app shows)
- Parent, 6 steps. Progress bars in App 02: Choose role 1, Complete profile 2, Verify phone 3, Enter code 3, Add child 4, Pickup location 5 ("STEP 5 OF 6"), School location 6. Permissions ("Turn on alerts") and All set are not counted.
- Student, 3 steps (App 09): Choose role 1, Your student profile 2 (name, university, student email, year), Home stop "Where do you live?" 3 ("STEP 3 OF 3"), then All set. No Add child, no phone step, no password in the app.
- The app has no "Skip for now" on any setup step. Permissions has "Not now".

## Screens to build (each × Desktop 1440 / Tablet 834 / Mobile 390)
Log in · Log in · Error · Log in · Forgot password · Log in · Reset link sent
Sign up · Choose role · Complete profile · Verify phone · Enter code · Add child · Pickup location · School location · Turn on alerts · All set
Student sign up · Choose role · Your profile · Home stop · All set
Frame names: "<Flow> · <Screen> · Desktop 1440" (and "Tablet 834", "Mobile 390").

## Layout decisions
- Desktop and tablet: horizontal auto layout. Left: brand panel (one real photo, radius/2xl, one live card). Right: form column with a Highlight wash background, logo header, and a white form card 460 wide (radius/xl, Shadow/Card).
- Map steps (Add child, Pickup, School, Home stop) on desktop and tablet: the "Web / Map image" panel replaces the photo. Form stays on the right on every screen, so it never jumps sides between steps.
- Mobile: app-style layout. Back button and step progress at the top, content, and a pinned bottom bar with the primary button. Pickup, School and Home stop use a bottom sheet over "Map / City · mobile".
- Text: titles Web/Page title (D/T) and Mobile/Title (M). Body, values and hints use Web/Body (16). Labels use Mobile/Row (16 bold). Links are brand/blue-700 (6.5:1). Secondary text is gray-700 (gray-500 fails on the wash).
- Errors: red border plus a red alert icon, with the message in ink (danger/red text is 3.9:1, which fails AA).

## Existing assets
- Variables: Ridy · Color (brand/*, neutral/*, danger/*), Ridy · Layout (space/4–64, radius/sm..full).
- Text styles: Web/*, Mobile/*, Button/*. Effects: Shadow/Card, Shadow/Sheet, Shadow/Float. Paints: Background/Highlight base, Background/Highlight wash.
- DS components (page 3:61): Button set 10:52, Input 10:85, Chip 10:70, Switch 10:91, Radio 10:96, Icon circle 10:202, Badge 10:64, Web / Icon button 83:147, Logo / Lockup 8:9, Logo / Blue 8:6, Web / Map image 89:2190, Map / City · mobile 26:77, Illustration / Email sent 116:660, Avatar / Lily 8:360, Avatar / Sarah 8:366, Avatar / Noah 8:378.
- Icons: mail 8:208, lock 8:167, eye 8:303, alert 8:150, check 8:93, back 8:68, user 8:46, phone 8:98, key 8:297, home 8:27, school 8:138, bus 8:106, edit 8:219, info 8:270, bell 8:52, pin 8:120, search 8:63, down 8:78, plus 8:83, camera 8:214, google 8:336, apple 8:331, users 8:40.
- Photo hashes: Arrival ffcde8a549b0e4e7156d2551656be7632f445765, Parent and child 934cafbfc806e78d8b71d1fd8cd0fafbbcbf85c6, School bus 1047f2a64dbdadd1b86078a2879cf51f556c642e, Campus 610f7d6da95f0b35f328969ea6744bc5e9a56c3c, Kids crossing fe2b2797ee97dd4186a4598e527f52b0c31b059d, School a3abbbf2a4f83c2656dcb9100184f12178533ab9.

## Status: done (2026-10-02)
- Components ("Web 02 · components", 266:376, left of the screens): Auth / Field 266:442, Step progress 266:515, Live card 267:404, Role card 267:440, Code box 267:447, Toggle row 267:448, Summary row 267:466, Option row 267:518, Divider 267:519, Role tabs 267:533, Choice chip 282:4066.
- 51 screens: 17 screens × Desktop 1440 (x=0) / Tablet 834 (x=1540) / Mobile 390 (x=2474), one row per screen, 1400px apart, in flow order (Log in, Error, Forgot, Reset sent, Choose role … All set, then Student Choose role, Your profile, Home stop, All set).
- The 14 old frames (Log in, Log in error, Reset link sent, Sign up, Verify email, Family setup, Setup done; desktop + phone) are deleted.
- Checks: no text overflow; no interactive element under 44px; every UI text is 16px+ on desktop/tablet and 15px+ on mobile. The only smaller text is street names inside the DS map artwork. Colors are bound to variables, except inside the DS map illustration.

## Open questions
- The student path in the app has no password or phone step. On the web, students have no way to log back in. Add a password to "Your student profile"?
- Mobile Add child uses the app's form layout, not a map bottom sheet: the app's Add child has no map.
- The app has no "Skip for now" on any setup step, so the web has none either. "Not now" is kept on Turn on alerts.
- Choose role is counted as step 1 in both flows (as in the app), so the screen shows "Step 1 of 6" for parents and "Step 1 of 3" for students.
