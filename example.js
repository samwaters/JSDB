cDB = DatabaseFactory.getCustomerDB();
cDB.load(1, false);
console.log(cDB.id + " -- " + cDB.name);
cDB.name = "Bob";
cDB.save();
