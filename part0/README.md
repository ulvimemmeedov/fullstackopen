# 0.4: New note

![Diagram](0.4.png)

```
title 0.4: New note

note over browser:
The user enters a note to the form input
and clicks on the "Save" button.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
The server stores the note.
end note

server-->browser: HTTP 302 location: /exampleapp/notes

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTTP 304

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: HTTP 304
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: HTTP 304

note over browser:
The browser executes main.js
which requests data.json.
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: HTTP 200

note over browser:
main.js adds the requested data to the DOM.
end note
```

# 0.5: Single page app

![Diagram](0.5.png)

```
title 0.5: Single page app

note over browser:
The user navigates to the page.
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTTP 200

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: HTTP 200
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: HTTP 200

note over browser:
The browser executes spa.js
which requests data.json.
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: HTTP 200

note over browser:
spa.js adds the requested data to the DOM.
end note
```

# 0.6: New note

![Diagram](0.6.png)

```
title 0.6: New note

note over browser:
The user enters a note to the form input
and clicks on the "Save" button.
end note

note over browser:
spa.js adds the note to the DOM
and sends it to the server.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over server:
The server stores the note.
end note

server-->browser: HTTP 201
```
