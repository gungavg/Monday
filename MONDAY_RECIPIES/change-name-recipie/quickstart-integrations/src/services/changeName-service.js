const changeName = (value, type) => {
  switch (type) {
    case 'Sin_espacios':
      const valueSnEsp = value.replace(/\s+/g, ' ').trim();
      return valueSnEsp;

    case 'Sin_espacios_mayusc':
      const valueSnEspMay = value.replace(/\s+/g, ' ').trim();
      return valueSnEspMay.toUpperCase();

    case 'Sin_espacios_minus':
      const valueSnEspMin = value.replace(/\s+/g, ' ').trim();
      return valueSnEspMin.toLowerCase();
    

    default:
      return value.toUpperCase();
  }
};

module.exports = { changeName };
