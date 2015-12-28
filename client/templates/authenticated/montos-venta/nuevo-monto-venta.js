Template.nuevoMontoVenta.onCreated(function () {
  let self = this;
  self.subscribe('dpa');
  self.subscribe('cialcos');
});
