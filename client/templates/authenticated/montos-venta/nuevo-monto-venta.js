Template.nuevoMontoVenta.onCreated(function () {
  let self = this;
  self.subscribe('provincias');
  self.subscribe('cialcos');
});
