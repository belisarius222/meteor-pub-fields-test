Widgets = new Meteor.Collection('widgets');

if (Meteor.isClient) {

  Meteor.subscribe('general');

  Deps.autorun(function(){
    var widgetId = Session.get('widgetId');
    Meteor.subscribe('specific',widgetId);
  });

  Template.allWidgets.theWidgets = function () {
    return Widgets.find();
  };

  Template.oneWidget.events({
    'click': function(event, template) {
      console.log('clicked.');
      var widgetId = template.data._id;
      Session.set('widgetId',widgetId);
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  Widgets.remove({});
    _.forEach([
      {profile: {general: 'a', specific: 'd'}},
      {profile: {general: 'b', specific: 'e'}},
      {profile: {general: 'c', specific: 'f'}},
    ],function(w){
      Widgets.insert(w);
    });
  });

  Meteor.publish('general',function(){
    return Widgets.find({},{fields: {
      'profile.general': 1
    }});
  });

  Meteor.publish('specific',function(widgetId){
    // the behavior doesn't change with only one of these present.
    // I left in both in order to demonstrate that neither works.
    return Widgets.find(widgetId,{fields: {
      'profile.specific': 1,
      profile: 1,
    }});
  });
}
