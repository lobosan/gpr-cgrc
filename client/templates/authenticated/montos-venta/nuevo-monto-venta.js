Template.nuevoMontoVenta.onCreated(() => {
  Template.instance().subscribe('provincias');
  Template.instance().subscribe('cialcos');
});
