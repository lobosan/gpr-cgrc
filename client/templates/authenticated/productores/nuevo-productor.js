Template.nuevoProductor.onCreated(() => {
  Template.instance().subscribe('provincias');
  Template.instance().subscribe('organizaciones');
  Template.instance().subscribe('cialcos');
});
