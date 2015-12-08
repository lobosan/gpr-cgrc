Meteor.publish('organizaciones', function () {
  return Organizaciones.find();
});
