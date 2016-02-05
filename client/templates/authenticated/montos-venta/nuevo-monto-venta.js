Template.nuevoMontoVenta.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = SubscriptionManager.subscribe('dpa');
    let handleCialcos = SubscriptionManager.subscribe('cialcos');
    self.ready.set(handleDPA.ready());
    self.ready.set(handleCialcos.ready());
  });
});
