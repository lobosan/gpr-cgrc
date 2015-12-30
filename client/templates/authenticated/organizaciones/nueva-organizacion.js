Template.nuevaOrganizacion.onCreated(function () {
  let self = this;
  self.subscribe('dpa');
  self.subscribe('cialcos');
});

Template.nuevaOrganizacion.events({
  'change [name="ruc"]': function (event, template) {
    event.preventDefault();

    let ruc = event.currentTarget.value;
    if (ruc !== '') {
      Meteor.call('consultarPorRUC', ruc, function (error, response) {
        if (error) {
          Bert.alert(error.reason, "warning");
        } else {
          if (response.error) {
            Bert.alert(response.error, "warning");
            $('input[name="nombreOrganizacion"]').val('');
            $('input[name="actividadEconomica"]').val('');
            $('input[name="cedulaRepresentante"]').val('');
            $('input[name="nombreRepresentante"]').val('');
            $('textarea[name="direccion"]').val('');
            $('input[name="telefonoFijo1"]').val('');
            $('input[name="telefonoFijo2"]').val('');
            $('input[name="telefonoFijo3"]').val('');
          } else {
            $('input[name="nombreOrganizacion"]').val(response.nombreOrganizacion);
            $('input[name="actividadEconomica"]').val(response.actividadEconomica);
            $('input[name="cedulaRepresentante"]').val(response.cedulaRepresentante);
            $('input[name="nombreRepresentante"]').val(response.nombreRepresentante);
            $('textarea[name="direccion"]').val(response.direccion);
            $('input[name="telefonoFijo1"]').val(response.telefonoFijo1);
            $('input[name="telefonoFijo2"]').val(response.telefonoFijo2);
            $('input[name="telefonoFijo3"]').val(response.telefonoFijo3);
          }
        }
      });
    }
  }
});

