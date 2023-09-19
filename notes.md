# CS260 Notes
* Main Notes file (also points to other markdown files)
* I have learned how to resolve conflicts both from terminal as well as using VS code
* I have also learned how to use GitLens from VS code to visually see git changes
## SSH Login
* my ip address for CS260 class is: http://54.85.34.16
* the remote command to sign in is: ssh -i cs260.pem ubuntu@54.85.34.16
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
