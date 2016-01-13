Template.nuevoProductor.onCreated(function () {
  let self = this;
  self.subscribe('dpa');
  self.subscribe('organizaciones');
  self.subscribe('cialcos');
});

Template.nuevoProductor.helpers({
  s2optOrganizaciones: function () {
    return {
      placeholder: "Seleccione una o varias organizaciones",
      allowClear: true
    };
  },
  s2optCialcos: function () {
    return {
      placeholder: "Seleccione uno o varios CIALCOs",
      allowClear: true
    };
  }
});

Template.nuevoProductor.events({
  'change [name="cedula"]': function (event, template) {
    event.preventDefault();

    let cedula = event.currentTarget.value;
    if (cedula !== '') {
      Meteor.call('consultarPorCedula', cedula, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          $('input[name="apellidos"]').val(response.apellidos);
          $('input[name="nombres"]').val(response.nombres);
          $('input[name="edad"]').val(response.edad);
          $(`input[name=sexo][value=${response.sexo}]`).attr('checked', 'checked');
          $(`input[name=estadoCivil][value=${response.estadoCivil}]`).attr('checked', 'checked');
        }
      });
    }
  }
});
