var DatabaseFactory = {
  getCustomerDB: function() { return new DB("customer", ["id", "name"], "id"); }
}
