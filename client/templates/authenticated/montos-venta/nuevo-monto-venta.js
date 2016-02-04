Template.nuevoMontoVenta.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = DPASubs.subscribe('dpa');
    let handleCialcos = CialcosSubs.subscribe('cialcos');
    self.ready.set(handleDPA.ready());
    self.ready.set(handleCialcos.ready());
  });
});
