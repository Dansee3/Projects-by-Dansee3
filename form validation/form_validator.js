class FormValidator {
  constructor() {
    this.formFields = [];

    this.form = document.getElementById('form');

    // this.addFormField('#username', {
    //   minlength: 4,
    //   maxlength: 20,
    // });

    // this.addFormField('#email', {
    //   minlength: 4,
    //   maxlength: 50,
    // });

    // this.addFormField('#password', {
    //   minlength: 5,
    //   maxlength: 30,
    // });

    // this.addFormField('#password2', {
    //   minlength: 5,
    //   maxlength: 30,
    //   matchWithPasswordId: '#password',
    // });

    this.processForm();

    console.log(this.formFields);

    this.init();
  }

  processForm = () => {
    this.form.querySelectorAll('input').forEach((e) => {
      let minlength = e.getAttribute('minlength');
      if (!minlength) minlength = undefined;

      let maxlength = e.getAttribute('maxlength');
      if (!maxlength) maxlength = undefined;

      let matchWithPasswordId = e.getAttribute('data-match-with-password-id');
      if (!matchWithPasswordId) matchWithPasswordId = undefined;

      this.addFormField(`#${e.id}`, {
        minlength: minlength,
        maxlength: maxlength,
        matchWithPasswordId: matchWithPasswordId,
      });
    });
  };

  addFormField = (cssSelector, options) => {
    const formField = new FormField(cssSelector, options);
    this.formFields.push(formField);
  };

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.validateForm();
    });
  }

  validateForm = () => {
    const formResults = this.formFields.map((f) => f.validate());

    if (formResults.includes(false)) {
      console.log('błąd w formularzu, error in the form');
    } else {
      console.log('Formularz jest ok, form is ok');
    }
  };
}
