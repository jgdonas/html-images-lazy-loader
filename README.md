# HTML images lazy loader

This is **the simplest image lazy loader** for your website, made just for fun. This module allows you 'mark' your images to be loaded only if the user is close enough (depending on your preferences), so you can save bandwidth as long as only neccesarry pictures will be loaded.

All you have to do is:
   - Use any css selector to mark your images as 'lazy'. You could even use "img" selector if you want all your pictures to behave this lazy way. You also need to set an attribute called 'data-lazy-src' with the real src to be loaded at the proper moment, and the 'src' attribute set to a placeholder image, for example.
  - Choose an offset value, i.e.: the distance in pixels from the bottom of the viewport for the pictures to be loaded.
  - Include lazyLoad.js as any other script in your webpage
  - Invoke htmlImagesLazyLoader.init() with the both the correct selector and offset, that is, for example:

```js
htmlImagesLazyLoader.init({selector: ".lazy", offset: 400});
```

You can easily check how easy is to use is in the html file: lazy.html in this repository.

# TODO!

* ~~This code should be optimised since this module is using the scroll event to calculate all the images position, which is quite expensive in computational terms. An alternative version using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which by the way should be easier to implement that this solution.~~ Yes, I did it: [html-images-lazy-loader-w-intersection-api](https://github.com/jgdonas/html-images-lazy-loader-w-intersection-api)
