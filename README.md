## alamid Todo-MVC

![alamid todo mvc](https://raw.github.com/peerigon/alamid-todo-example/master/alamid-todomvc.png)

An implementation of the [TodoMVC](http://addyosmani.github.com/todomvc/) app based on alamid.

## Usage 

First of all git clone the todo-example

`git clone git://github.com/peerigon/alamid-todo-example.git`

Switch to the example folder

`cd alamid-todo-example`

Install the dependencies

`npm install`

Then start the app

`node app/init.server.js`

["Open app"](http://localhost:9000) in your browser (preferably Chrome, Firefox has CSS troubles)

## Playing with alamid

### Browser-console 
We attached the Todo-model to the window-object so you can interact with it directly via console. 

__Some Examples:__

```javascript
var todo = new Todo();
```

```javascript
todo.set("title", "your title here");
```

```javascript
todo.get();
```

```javascript
todo.validate(function onValidation(validation) { 
	console.log(validation.result);
});
```

```javascript
todo.getId();
```

```javascript 
todo.save(function onSave(err, res) { 
    if(err) { throw err; }
    console.log(res);
});
```

```javascript
todo.getId();
```

```javascript
Todo.findById(1, function onFindById(err, todo) {
   if(err) { throw err; }
   console.log(todo.get());
});
```

```javascript
Todo.find({}, function onFind(err, todos) {
	todos.each(function(todo) {
	    console.log(todo.get());
	});
});
```

### Code-changes 

You can change client-code (views, pages, client-services) on the fly. Simply reload to see the changes. If you are changing the server-service you have to restart the alamid-server. 

### Client-only-mode
We extended the TodoMVC example to use alamid's server-service. This way we can make it realtime and push changes to all connected clients. If you want to disable the server-service and create a client-only app, simply set the `__useServerService` attribute to `false` in __/app/services/todo/TodoService.client.class.js__ 

__NOTE:__ The server-service stores the data directly in memory / the service itself. 
That's just to keep things simple in the example. Don't do this in production unlike you love memory-leaks ;)

 
### Any issues?
Feel free to create issues if something wents wrong or feels crazy. 
