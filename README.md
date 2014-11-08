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
If you want consistent Gulp outputs (and you do), make sure to follow the following file structure inside each module's folder:

* `ModuleNameModule.js` _(you instantiate the module here, also notice the xxModule.js, Module is an important keyword)_
* `ModuleNameModel.js`
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

###### Declaring models:

Declaring models is really easy. Models can be both stored in the `_dev/models` folder or your `_dev/modules/ModuleName/` folder _(just remember to have a xxModel.js format when storing them inside the module's folder)_. To create a model simply write

```javascript
app.model('MyAwesomeModel', {
  this.name = 'Awesome';
});
```

And to get the instance of the model:

```javascript
var instance = app.model('MyAwesomeModel');
```

###### Declaring components:

Components are app-wide reusable modules that can be attached to any container. They're stored in the `_dev/components` folder.
Here's how to declare a component, remember that the controller and view function properties are mandatory according to MithrilJS conventions:

```javascript
app.component('MyComponent', containerElement, {
  controller : function () {
    // First Gotham, then the World
  },
  view : function (controller) {
    // Allow me to break the ice
  }
});
```

This'll automatically attach this component to the container and instantiate it. You can also get an existing component instance (and use it in possibly a different container):

```javascript
var instance = app.component('MyComponent');

// This'll set it to this element
app.component('MyComponent', containerElement);
```

##### Conclusion:

I hope this boilerplate is useful to anybody in the vast space that is the Internet. Be sure to write me back with ideas on how I can improve this further, I'll be glad to read them.