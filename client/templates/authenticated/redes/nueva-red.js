Template.nuevaRed.onCreated(function () {
  let self = this;
  self.subscribe('dpa');
  self.subscribe('organizaciones');
  self.subscribe('cialcos');
});

Template.nuevaRed.events({
  'change #redCedulaRepresentante': function (event, template) {
    event.preventDefault();

    let cedula = event.currentTarget.value;
    if (cedula !== '') {
      Meteor.call('consultarPorCedula', cedula, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          $('#redNombreRepresentante').val(`${response.apellidos} ${response.nombres}`);
        }
      });
    }
  }
});
