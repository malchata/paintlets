# paintlets!

a gallery of tweakable and downloadable paint worklets: https://paintlets.herokuapp.com/

## What the hell is this?

This is a small Node app currently in development that showcases [paint worklets](https://developers.google.com/web/updates/2018/01/paintapi) as a gallery.

## What the hell are "paint worklets"?

Paint worklets are a part of CSS Houdini. They're a really neat way of combining [programmatically generated artwork](https://www.youtube.com/watch?v=4Se0_w0ISYk) with CSS. The API used to draw the artwork is the same as the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), only your code is wrapped in a class with a `paint` method that gets exposed to CSS, where it can then be used in properties like `background-image`:

```css
.fancy {
  background-image: paint(my-paint-worklet);
}
```

## How the hell can I get my paint worklet(s) on this thing?

_**tl;dr:** It's a lot of work, and I'm very particular. If you have a paint worklet you'd like me to add for you, I'd be happy to do so. Just file an issue with a link to your paint worklet, the screen name you'd like to be credited under, a link to your personal website, twitter, or whatever._

If you have a paint worklet you'd like to add to the gallery, the process is a bit involved. Don't fret! I'll walk you through it.

### 1. Fork the repo and install npm packages

You'll submit your paint worklet through a pull request. To do that, fork the repo, clone it, and install the npm packages for the project.

### 2. Properly scope your paint worklet and its custom properties

To ensure your paint worklet works properly in the app, it should be properly scoped. Let's say you have a worklet called `barf`, and you access it in CSS with `paint(barf)`. `barf` is your scope. The name of your paint worklet's JavaScript file should be the same as the scope you've chosen, meaning in this example, it should be called `barf.js`.

If your paint worklet has custom properties that allow it to be controlled by CSS (and your paint worklet should have at least one), you'll need to scope those, too. The format this app uses to register custom properties is as follows:

```
--[SCOPE]-[PROPERTY_NAME]
```

Continuing with our `barf` example, let's say our paint worklet has a custom property for controlling the alpha transparency of the generated art. That property would look like this:

```
--barf-alpha
```

This scoping is done to ensure that paint worklets don't register properties that conflict with other ones in the app. It's also just good practice.

If you find that your chosen scope is already taken, rescope your paint worklet accordingly:

1. Rename the JavaScript file.
2. Rename whatever handle you've given your paint worklet in the `registerPaint` method.
3. Rename your custom properties in your paint worklet's static `inputProperties` method.

Now you're ready to add your cool paint worklet to the app itself!

### 3. Add your paint worklet to the `worklets` folder

Once you've scoped your paint worklet, you'll need to add its JavaScript to this project. A paint worklet should consist of a single JavaScript file. Add that file to the [`src/client/worklets` folder](https://github.com/malchata/paintlets/tree/master/src/client/worklets).

### 4. Add your paint worklet to `worklets.js`

This app discovers paint worklets through a file named [`worklets.js`](https://github.com/malchata/paintlets/blob/master/src/server/worklets.js), which is found in the [`src/server` folder](https://github.com/malchata/paintlets/tree/master/src/server). This file exports a collection of objects. Each one is for an individual paint worklet. The key for each object is the scope for that paint worklet.

Each object in the collection has three child objects:

1. `author`, which identifies the creator of the paint worklet.
2. `backgroundColor`, which is the initial background color assigned to the paint worklet's container element after it loads.
2. `customProperties`, which contains the custom properties for the associated paint worklet.

Here's what a definition for our `barf` paint worklet may look like:

```javascript
export default {
  barf: {
    author: {
      // Screen names preferred.
      screenName: "pukebeast",
      // If you don't have a website, point to a social media URL.
      website: "https://muhwebsites.wtf/"
    },
    backgroundColor: "#fffbfe",
    customProperties: {
      // Custom properties with multiple words should be in kebab case and quoted.
      "splatter-radius": {
        syntax: "<integer>",
        value: 32
      },
      color: {
        syntax: "<color>",
        value: "#f0f"
      },
    }
  },
  // Other worklets...
};
```

Each key in your `customProperties` collection should correspond to an individual custom property. The key is interpolated into the scoped custom property format described above. So in the above example, the `splatter-radius` key is interpolated into a custom property which is ultimately named `--barf-splatter-radius`.

The two objects necessary for each custom property are `syntax` and `value`:

1. `syntax` should be a [supported syntax string](https://www.w3.org/TR/css-properties-values-api-1/#supported-syntax-strings).
2. `value` should be a default value. When your paint worklet renders, it will initially use this value for the associated custom property. Ensure this default is valid for the chosen syntax string.

### 5. Make sure everything works properly and submit a PR

Once you've done everything, build the app with either `npm run build` or `npm run build:dev`. Then, test it locally by spinning up the node server with `npm run server` and go to http://localhost:8080. If there are no bugs and everything seems to work, [submit a PR](https://github.com/malchata/paintlets/pulls) for review.

## How the hell can I fix what's broken on this thing?

Even though it functions, this project is still under development, so it's totally possible things could be busted that I didn't catch. Before you file an issue, though, make sure your browser actually supports paint worklets. Chrome and its derivatives (e.g., Opera and Edge) support them. Safari supports them, but the `registerProperty` method throws an error. Browser support bugs will be closed.

If your issue is _not_ due to browser compatibility, then file an issue. An unsolicited PR will likely be declined unless it addresses a bug. Major architectural changes are not likely to be accepted, unless there's a compelling reason. Filing issues is a preferred default, as it spurs conversation rather than assumptions.

## Who the hell are you?

I'm [Jeremy Wagner](https://jeremy.codes/). I'm an independent web performance consultant, [author](https://jeremy.codes/writing), and [speaker](https://speaking.jeremy.codes).
