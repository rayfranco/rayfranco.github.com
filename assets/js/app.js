require(['aura/aura'], function (Aura) {
  var app = new Aura({
    github: { client_id: '60c7ab102b827976136d' }
  });
  app.use('assets/js/extensions/aura-github');
  app.use('assets/js/extensions/aura-time');
  app.start({ widgets: 'body' });
});