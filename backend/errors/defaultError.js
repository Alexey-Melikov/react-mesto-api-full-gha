module.exports = class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};
