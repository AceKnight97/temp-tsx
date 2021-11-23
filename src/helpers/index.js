
export const toggleArr = (item = '', arr = []) => {
  const array = [...arr]; // make a separate copy of the array
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
    return array;
  }
  array.push(item);
  return array;
};

export const isValidEmail = (email = '') => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email.trim()).toLowerCase());
};
