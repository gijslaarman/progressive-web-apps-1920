# Making a client side app into a Progressive Web App

## Installation
```
Create .env file, insert:
PORT=0000 // Change this to your desired number
API_KEY="your key" // Request an API key from football-data.org
```

#### Api key
Apply here: [football-data](https://football-data.org)

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
- [ ] Style the app 1:1 with the offline variant. (The currently selected menu item highlight is not working etc.)