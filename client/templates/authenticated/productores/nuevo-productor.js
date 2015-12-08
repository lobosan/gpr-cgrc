Template.nuevoProductor.onCreated(() => {
  Template.instance().subscribe('provincias');
  Template.instance().subscribe('organizaciones');
});
