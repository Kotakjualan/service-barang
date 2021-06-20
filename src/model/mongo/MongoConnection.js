const MongoDB = require('mongodb');
const ConnectionOption = require('./MongoConnectionOption');

class MongoConnection{  
  constructor(){
    this._connection = null;
    this._database   = null;
    this._collection = null;
  }
  getConnection(){
    return this._connection;
  }
  getDatabase(){
    return this._database;
  }
  getCollection(){
    return this._collection;
  }
  createConnection(param = new ConnectionOption()){        
    MongoDB.connect(param.getUri(),{useNewUrlParser:true, useUnifiedTopology:true, poolSize:25}, (err, client)=>{
      if(err) console.log("Have Error in Connection")
      this._connection = client
      try {this._database = this._connection?.db(param.getDatabaseName());} 
      catch (error) {
        console.error("Database not found");
      }
      try {this._collection = this._database?.collection(param.getCollectionName());} 
      catch (error) {
        console.error("Collection not found");  
      }
    })     
    return this;
  }

}

module.exports = MongoConnection;