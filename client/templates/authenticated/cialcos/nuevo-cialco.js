Template.nuevoCialco.onCreated(function () {
  let self = this;
  self.subscribe('dpa');
});

Template.nuevoCialco.events({
  'change #ciaCedulaRepresentante': function (event, template) {
    event.preventDefault();

    let cedula = event.currentTarget.value;
    if (cedula !== '') {
      Meteor.call('consultarPorCedula', cedula, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          $('#ciaNombreRepresentante').val(`${response.apellidos} ${response.nombres}`);
        }
      });
    }
  }
});
