const changeName = (value, type) => {
  switch (type) {
    case 'Sin_espacios':
      console.log(value.toUpperCase);
      return value.toUpperCase();
    case 'TO_LOWER_CASE':
      return value.toLowerCase();
    default:
      return value.toUpperCase();
  }
};

module.exports = { changeName };
