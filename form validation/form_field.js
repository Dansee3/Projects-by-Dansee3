class FormField {
  constructor(
    formFieldSelector,
    { minlength = 4, maxlength = 50, errorMsgSelector, matchWithPasswordId },
  ) {
    this.formField = document.querySelector(formFieldSelector);
    this.type = this.formField.type;
    this.minlength = +minlength;
    this.maxlength = +maxlength;
    if (!errorMsgSelector) errorMsgSelector = `${formFieldSelector} + span`;
    this.errorMsgEl = document.querySelector(errorMsgSelector);
    this.matchWithPasswordId = matchWithPasswordId;
  }

  validate = () => {
    let valid = true;
    switch (this.type) {
      case 'password':
        valid = this.checkTextLength();
        if (valid && this.matchWithPasswordId) {
          valid = this.checkValidPassword();
        }
        break;

      case 'text':
        valid = this.checkTextLength();
        break;

      case 'email':
        valid = this.checkEmail();
        break;
    }

    return valid;
  };

  checkValidPassword = () => {
    if (!this.matchWithPasswordId) return true;
    const matchWidth = document.querySelector(this.matchWithPasswordId);

    if (
      this.formField.value.length > 0 &&
      matchWidth.value.length > 0 &&
      this.formField.value === matchWidth.value
    ) {
      this.showSuccess();
      return true;
    } else {
      this.showError('passwords must be the same');
      return false;
    }
  };

  checkTextLength = () => {
    if (this.formField.value.length < this.minlength) {
      this.showError(`Minimum characters required: ${this.minlength}`);
      return false;
    } else if (this.formField.value.length > this.maxlength) {
      this.showError(`Maximum characters required: ${this.maxlength}`);
      return false;
    } else {
      this.showSuccess();
      return true;
    }
  };

  checkEmail = () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (re.test(this.formField.value.trim())) {
      this.showSuccess();
      return true;
    } else {
      this.showError('enter a valid email');
      return false;
    }
  };

  showError = (msg) => {
    this.errorMsgEl.innerHTML = msg;
    this.errorMsgEl.classList.add('error');
    this.formField.classList.add('error');
    this.errorMsgEl.classList.remove('success');
    this.formField.classList.remove('success');
  };

  showSuccess = () => {
    this.errorMsgEl.innerHTML = '';
    this.errorMsgEl.classList.remove('error');
    this.formField.classList.remove('error');
    this.errorMsgEl.classList.add('success');
    this.formField.classList.add('success');
  };
}
