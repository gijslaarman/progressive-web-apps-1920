module.exports = {
  escape: function(variable) {
    return variable.replace(/(['"])/g, '\\$1');
  }
}