Meteor.publish('template', () => {
  return Collection.find({'owner': this.userId}, {fields: {'owner': 1}});
});
