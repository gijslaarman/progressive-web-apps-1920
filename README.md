# Making a client side app into a Progressive Web App

## Installation
```shell
# Clone repository
git clone https://github.com/gijslaarman/progressive-web-apps-1920.git && cd progressive-web-apps-1920

# Install dependencies
npm install

# Create .env file
touch .env && sudo nano .env

# Paste in these configs:
PORT=<your_port_number>
API_KEY=<your_api_key> # Where to get an API key down below 👇

# Scripts
npm run dev # For file change detection
npm start # For production

# Build scripts
generateTeams # For creating a local JSON file with the teams to keep on the server.
open:localhost # For opening a browser window when running dev script.
```
#### Api key
Apply here: [football-data](https://football-data.org)

## Optimization

### Audit score
<img src="/docs/img/score.png" alt="Google audit score: 100 on performance, 78 on accessibility, 93 on best practices & 78 on SEO" style="margin: 0 auto; width: 80%"/>

### Gzipping compression
With Express it was easy to implement Gzipping.
![Proof of gzipping](/docs/img/gzip.png)

### Service worker
To make the PWA offline available I implemented a service worker. Currently it caches all requests made, so the app will be available offline as well as downloadable as a chrome extension.

## Clientside vs Serverside
So I've handled both Clientside & Serverside in my project. The pages are all rendered server side for direct navigation. But handled client side with a preventDefault on every anchor in the site, that makes api calls and generates HTML all clientside. Not fully functioning though, things that aren't working:
- clientside match detailpage handling.

This is to theoretically lower the loadbalance of the server.

## Service worker & manifest
I implemented a service worker to cache the files the client fetches. Currently it's set up as a search cache & fallback to network. So it will still make requests everytime but the client can handle it without making a request. If you were to be offline than the cache can find the files but not able to make a request. https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_falling_back_to_the_network
![Proof of service worker & downloadable app](/docs/img/manifest.png)

## Critical rendering path
The server builds the HTML for the client and with that links it to the CSS & JS.
![paint steps of my app](/docs/img/paint.png)

This is the steps of the first meaningful paint according to google. The Images are sometimes not loaded in yet on the second image.

When the JS is loaded in it takes over the website to make it more of a Single webpage application feeling. Whilst still being backed up by a server.

The application is too small to properly test this since the build and rendering is too fast. (The CSS is instantly loaded in according to google audits)


<!-- 


## My struggles
- I had to switch to another rendering engine, took me almost a day of work to understand it. EJS was super buggy, handlebars is a lot more reliable. On client side you ofcourse don't see a difference but on the backend I had to rewrite quite a lot.
- Set up a database to store the teams, this was way too overkill and not needed > I rewrote that to generate the JSON locally with a prebuild/predev build script. Now the routes can fetch the JSON to find the correct team info, (such as shortname). This is a lot faster and easier to use (thanks Declan!).
- I didn't have the time yet to make something I'm proud of :(. So far it's only been debugging/refactoring the #@! out of my serverside project. I heavily underestimated it, but to be fair EJS bugging out was also a big factor to it breaking.

## Service worker
- I have put in the first steps of the service worker. You can now save the pages locally so it's also available offline. I would have liked to also be able to click on the install button in the top right, but that's not a main priority right now.
- Saving the pages is fine, but right now it saves everything you fetch (so also all the pages & images.). Now this is cool for offline but this clutters up the cache fast. So I will have to find out a way to limit the caching.
- I have now wrote the service worker in a way that it's using the [cache falling back to the network](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#cache_falling_back_to_the_network). The disadvantage of that is that it will always make a fetch request, instead of saying ok here's it cached use this, no more fetch needed. I will look at this in the future.

## To-do's:
- [x] Render my [WebApp](https://gijslaarman.github.io/web-app-from-scratch-1920/) serverside.
- [x] Save this season's teams so that I can use the shortname instead. (The Api gave the long names back e.g: Tottenham (< shortname) was: Tottenham Hotspur FC, no football fan calls it like that.)
- [x] Create build scripts & implement them in Package.json.
- [x] Implement service worker.
- [ ] Make it installable.
- [ ] Optimize service worker.
- [ ] Style the app 1:1 with the offline variant. (The currently selected menu item highlight is not working etc.) -->