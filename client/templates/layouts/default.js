Template.default.onRendered( () => {
  Meteor.setTimeout(function () {
    return $(".side-menu .nav .dropdown").on('show.bs.collapse', function() {
      return $(".side-menu .nav .dropdown .collapse").collapse('hide');
    });
  }, 1500);
});

Template.default.events({
  'click .navbar-expand-toggle': function (event, template) {
    event.preventDefault();
    $(".app-container").toggleClass("expanded");
    return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
  },
  'click .navbar-right-expand-toggle': function (event, template) {
    event.preventDefault();
    $(".navbar-right").toggleClass("expanded");
    return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
  }
});
