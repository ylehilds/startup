# CS260 Notes
* Main Notes file (also points to other markdown files)
* I have learned how to resolve conflicts both from terminal as well as using VS code
* I have also learned how to use GitLens from VS code to visually see git changes
## SSH Login
* my ip address for CS260 class is: http://54.85.34.16
* the remote command to sign in is: ssh -i ~/keys/cs260/cs260.pem ubuntu@54.85.34.16
* AWS Route53 is where to purchase and regster a domain
## AWS linking ip address with domain name
* Crete an "A" record and give the public ipaddress. This is the root domain name and how you link/glue the website name and the public ip address. for example: cs260.click with value 18.224.126.40
* Create another "A" record for wildcard "*" meaning all subdomains will point to the root domain. for example: *.cs260.click with value 18.224.126.40
## Enabling HTTPS using Caddy 
* Caddy uses Let's Encrypt to generate a web certificate every time an HTTPS request is made for a domain name that Caddy doesn't have a web certificate for. When this happens Caddy asks Let's Encrypt to verify that the domain for the requested certificate is actually owned by the requester. Let's Encrypt does that by telling the requester to return a specific digitally signed response for a temporary URL when an HTTP request to the domain is made. Let's Encrypt then makes the HTTP request, and if successful, issues the certificate to the requester.
* Enabling https in Caddy consists of modifying its configuration file "Caddyfile". By not specifying a port the rule will serve up files using port 443 (HTTPS), and any request to port 80 will automatically redirect the browser to port 443. 
* If your domain name was myfunkychickens.click it would look like the following:
```
myfunkychickens.click {
   root * /usr/share/caddy
   file_server
   header Cache-Control no-store
   header -etag
   header -server
   }

startup.myfunkychickens.click {
   reverse_proxy * localhost:4000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}

simon.myfunkychickens.click {
   reverse_proxy * localhost:3000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}
```
* Restart Caddy so that your changes take effect. Note that since this requires you to use sudo to elevate your user to have the rights to restart the gateway.
```
sudo service caddy restart
```
* copy from local to server:
  ```
  scp -i <pem_file_location> <src_location_file> ubuntu@<public_ipaddress>:public_html/<either_leave_blank_or_rename_file>
  ```
* Startup Websockets potential & future implementation: motivational quotes and/or most popular receipes top 10.

## Deploy Files (the deploy script is different in each lab, so pay attention to that!)
* my ip address for CS260 class is: http://54.85.34.16
* the remote command to deploy is: ./deployFiles.sh -k ~/keys/cs260/cs260.pem -h quizmaker.click -s simon

## CSS Flexbox
* basic html page skeleton:
```html
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>
```
* basic styling:
```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}

header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

* media queries syntax:
```css
@media (orientation: portrait) {
  main {
    flex-direction: column;
  }
}

@media (max-height: 700px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
}
```

## CSS Frameworks
* Adding bootstrap:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
  </head>
  <body>
    ...
  </body>
</html>
```

```html
<body>
  ...

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"
  ></script>
</body>
```


## CSS Practice
* Animation:
```css
p {
  text-align: center;
  font-size: 20vh;
}
```

```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}
```

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  to {
    font-size: 20vh;
  }
}
```

```css
@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

## Startup CSS
* Adding toggle between dark and light themes in bootstrap:
```javascript
document.getElementById('flexSwitchCheckDefault').addEventListener('change', () => {
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.querySelector('main').style.backgroundColor = 'LightGrey';
    } 
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
    }
})
// the below line is to default the theme to dark
document.querySelector('main').style.backgroundColor = 'DarkSlateGrey';
```

* Basic CSS styling
```css
body {
  display: flex;
  flex-direction: column;
  min-width: 375px;
}

header {
  flex: 0 80px;
}

main {
  flex: 1 calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: sans-serif;
}

footer {
  flex: 0 30px;
}

menu {
  flex: 1;
  display: flex;
  /*  overwrite Bootstrap so the menu does not wrap */
  flex-direction: row !important;
  list-style: none;
}

.navbar-brand {
  padding-left: 0.3em;
  border-bottom: solid rgb(182, 182, 182) thin;
}

menu .nav-item {
  padding: 0 0.3em;
}

footer a {
  float: right;
}

@media (max-height: 600px) {
  header {
    display: none;
  }
  footer {
    display: none;
  }
  main {
    flex: 1 100vh;
  }
}
```
