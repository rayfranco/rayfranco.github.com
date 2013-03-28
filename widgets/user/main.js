define(['text!./user.html', 'underscore'], function(tpl, _) {
  var template = _.template(tpl);

  return {
    initialize: function() {
      _.bindAll(this);
      this.options.style = this.options.style || 'small';
      if (this.options.user) {
        this.path = "users/" + this.options.user;
      } else {
        this.path = "orgs/" + this.options.org;
      }
      this.fetch();
    },

    fetch: function() {
      this.sandbox.github(this.path).then(this.render);
    },

    render: function(user) {
      this.html(template({
        user: user,
        style: this.options.style
      }));
    }
  };

});