Template.nuevoProductor.onCreated(function () {
  let self = this;
  self.subscribe('provincias');
  self.subscribe('organizaciones');
  self.subscribe('cialcos');
});
