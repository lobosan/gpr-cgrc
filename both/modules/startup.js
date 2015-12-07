let startup = () => {
  if (Meteor.isClient) {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage('es')
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        console.log(error_message);
      });
  }
};

Modules.both.startup = startup;
