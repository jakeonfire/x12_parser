import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  clientIdForMember: DS.attr(),
  dependent: DS.attr(),
  groupNumber: DS.attr(),
  primaryPhone: DS.attr(),
  email: DS.attr(),
  address1: DS.attr(),
  address2: DS.attr(),
  ssn: DS.attr()
});
