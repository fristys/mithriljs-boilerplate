## MithrilJS-boilerplate

My personal [MithrilJS](http://lhorie.github.io/mithril/) application boilerplate / skeleton

I've recently discovered this framework, and I love the basic concepts it brings to the table. I've made a small Boilerplate you can use in your projects, it uses a set of simple conventions and GulpJS to compile and minify everything.

##### Installation:

1. Make sure you have NodeJS installed
2. Clone or download this repository where you want to start your project
3. Run `npm install` in the root directory where you've done step 2
4. Run `gulp`
5. ???
6. Profit

##### File structure conventions:

The development files are located in the `_dev` folder, each module is stored in its own folder, located inside the `_dev/modules` folder.
If you want consistent Gulp outputs, make sure to follow the following file structure inside each module's folder:

* `ModuleName.js` _(you instantiate the module here)_
* `ModuleNameController.js`
* `ModuleNameView.js`

##### Code conventions:

I've been a keen AngularJS user for quite a while now, so I had to figure out an easy way of declaring and modifying modules and I came up with a 4-liner solution that's very reminiscent of Angular's angular.module()

###### Module declaration:
To declare a module, you need to create a new instance of it, here's how:

```javascript
app.module('ModuleName', {});
```

When declared like this, this'll be the module that's loaded at route '/' _(default route value if not declared)_
To declare a module with a specific route, you can simply use:

```javascript
app.module('ModuleName', {}, myRouteString);
```

Where `myRouteString` is a route string that follows the [MithrilJS route string standards](http://lhorie.github.io/mithril/routing.html).

###### Getting the module instance:

To get the instance of a module, simply call:

```javascript
app.module('ModuleName')
```

###### Declaring module controller / view:

Declaring controllers / views is easy as one-two-three:

```javascript
app.module('ModuleName').controller = function () {
  // Your top secret code to take over the World
};

app.module('ModuleName').view = function (controller) {
  // Visualizing your World domination
};
```

Rembember that you must call the `app.module('ModuleName')` properties exactly like this, as this is a Mithril convention and it won't work otherwise.

##### Conclusion:

I hope this boilerplate is useful to anybody in the vast space that is the Internet. Be sure to write me back with ideas on how I can improve this further, I'll be glad to read them.