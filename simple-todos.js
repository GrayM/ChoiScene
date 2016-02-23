
Tasks = new Mongo.Collection("tasks");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
Template.body.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
      Meteor.call("deleteTask", this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  Meteor.methods({
    addTask: function (text) {
      // make sure the user is logged in before inserting a task
      if (!Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
      //Insert a task into the collection
      Tasks.insert({
        text: text,
        createdAt: new Date(),            //current time
        owner: Meteor.userId(),           //_id of logged in user
        username: Meteor.user().username  //username of logged in user
      });
    },
    deleteTask: function (taskId) {
      tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
      tasks.update(taskId, { $set: { checked: setChecked}});
    }
  });
  var text = event.target.text.value;

  //insert a task into the collection
  Meteor.call("addTask", text);

  //clear form
  event.target.text.value="";


}