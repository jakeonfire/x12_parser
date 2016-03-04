import Ember from 'ember';
import { processX12 } from '../helpers/process-x12';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('coverage');
  },

  actions: {
    processX12File(fileContents) {
      //console.log("==> processX12", processX12);
      let coverages = processX12([fileContents]);
      for (let coverage of coverages) {
        this.store.createRecord('coverage', coverage);
      }
    }
  }
});
