const modulo = (a, b) => (+a % (b = +b) + b) % b;

const uuid = {
  v4: () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // we use `Math.random` for cross platform compatibility between NodeJS and ArangoDB
      // when we will be use uuid.v4() for setting value in some attribute
      // then it attribute must has unique constraint index,
      // and logic for setting must check existing record with its value
      const sixteenNumber = Number.parseInt(Math.random() * Math.pow(10, 16));
      const r = modulo(sixteenNumber, 16);
      const v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    })
};

export default uuid;
