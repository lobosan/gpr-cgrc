Template.nuevasMetas.onCreated(function () {
  let self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    let handleDPA = SubscriptionManager.subscribe('dpa');
    self.ready.set(handleDPA.ready());
  });
});
