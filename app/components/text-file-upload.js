import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  //classNames: 'btn btn-file btn-sm btn-primary-outline'.w(),
  //classNames: ['hidden'],
  attributeBindings: ['name'],

  change(evt) {
    let input = evt.target;

    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        let uploadedFile = e.srcElement.result;
        this.sendAction('action', uploadedFile);
      };
      return reader.readAsText(input.files[0]);
    }
  }
});
