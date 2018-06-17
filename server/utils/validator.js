export const usernameRegex = /^[A-Za-z0-9_._\u4e00-\u9fa5_\。_\、_\@]+$/;
export const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
export const linkRegex = /^\S*$/;
export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const usernameValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please type a username'));
  }
  if (value.length <= 3) {
    return callback(new Error('Please type more that 3 characters'));
  }
  if (value.length >= 40) {
    return callback(new Error('Please type less that 20 characters'));
  }
  if (!usernameRegex.test(value)) {
    return callback(new Error('Cannot use special characters in username'));
  }
  callback();
}

export const passwordValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please type a password'));
  }
  if (value.length <= 5) {
    return callback(new Error('Please type more that 6 characters'));
  }
  callback();
}

export const emailValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please type a email'));
  }
  if (!emailRegex.test(value)) {
    return callback(new Error('Please type a vaild email'));
  }
  callback();
}

export const urlValidator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('Please type a link'));
  }
  if (!urlRegex.test(value)) {
    return callback(new Error('Please type a vaild link, need to be start with http:// or https://'));
  }
  callback();
}
