Meteor.publish('cialcos', function () {
  return Cialcos.find({}, {fields: {nombreCialco: 1}});
});
