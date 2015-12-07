let startup = () => {
  Bert.defaults.style = 'growl-top-right';
  SimpleSchema.debug = true;
  AutoForm.debug();
};

Modules.client.startup = startup;
