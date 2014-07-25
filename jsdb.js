var DB = function(table, fields, pk)
{
  this._data = [];
  this._table = table;
  this._fields = [];
  this._identifier = pk;
  for(var field in fields)
  {
    var fieldData = fields[field];
    if(typeof fieldData != "object")
    {
      this._fields[fieldData] = {"type": "string", "required": false}
    }
    else
    {
      if(typeof fieldData.name == "undefined" || typeof fieldData.type == "undefined" || typeof fieldData.required == "undefined")
      {
        continue;
      }
      this._fields[fieldData.name] = {"type": fieldData.type, "required": fieldData.required}
    }
    getFunc = function(fieldName) { return this._data[fieldName]; };
    setFunc = function(fieldName, value) { this._data[fieldName] = value; };
    fieldName = fields[field];
    Object.defineProperty(this, fields[field], {
      get: getFunc.bind(this, fields[field]),
      set: setFunc.bind(this, fields[field])
    });
  }
  this.load = function(id, fromServer)
  {
    console.log(id + " -- " + fromServer);
    if(!fromServer && typeof sessionStorage[this._table + "_" + id] != "undefined")
    {
      var data = sessionStorage[this._table + "_" + id];
      var dataObj = JSON.parse(data);
      for(var key in dataObj)
      {
        if(!dataObj.hasOwnProperty(key))
        {
          continue;
        }
        this[key] = dataObj[key];
      }
      return;
    }
    var data = {id: 1, name: "Sam"};
    var keys = Object.keys(data);
    for(var key in data)
    {
      if(!data.hasOwnProperty(key))
      {
        continue;
      }
      this[key] = data[key];
    }
    if(typeof sessionStorage == "object" && typeof JSON == "object")
    {
      sessionStorage[this._table + "_" + id] = JSON.stringify(data);
    }
  }
  this.reload = function(fromServer)
  {
    if(typeof fromServer == "undefined")
    {
      fromServer = false;
    }
    var id="";
    if(typeof this._identifier == "array")
    {
      for(var key in this._identifier)
      {
        if(!this._identifier.hasOwnProperty(key))
        {
          continue;
        }
        id = id + this[this._identifier[key]] + "_";
      }
      id = id.substring(0, id.length - 1)
    }
    else
    {
      id = this[this._identifier];
    }
    this.load(id, fromServer);
  }
  this.save = function()
  {

  }
  Object.seal(this);
};
