const crypto = await import('node:crypto');

import sql from "mssql";

sql.on("error", err => {

});


class Repo {
  constructor() {
    this.pool = null;
    this.NOT_FOUND = Symbol();
    this.CONFLICT = Symbol();
    this.MALFORMED = Symbol();
    this.UNAUTHORIZED = Symbol();
  }

  connect = async function(server, port, db, user, pwd) {
    this.pool = await sql.connect({
      server: server,
      port: port,
      database: db,
      user: user,
      password: pwd,
      options: {
        trustServerCertificate: true
      }
    });
  }

  getUserByName = function(username, cb) {
    let sr;
    try {
      sr = this.pool.request().input('username', sql.VarChar, username);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("SELECT * FROM dbo.Users WHERE username = @username;")
    .then(res => {
      let rs = res.recordset;
      if (rs.length === 0) cb(this.NOT_FOUND);
      else cb(null, rs[0]);
    })
    .catch(err => {
      cb(err);
    });
  }

  getUserByEmail = function(email, cb) {
    let sr;
    try {
      sr = this.pool.request().input('email', sql.VarChar, email);
    }
    catch (e) {
      return cb(this.MALFORMED);
    }
    sr.query("SELECT * FROM dbo.Users WHERE email = @email;")
    .then(res => {
      let rs = res.recordset;
      if (rs.length === 0) cb(this.NOT_FOUND);
      else cb(null, rs[0]);
    })
    .catch(err => {
      cb(err);
    });
  }

  getUserById = function(id, cb) {
    let sr;
    try {
      sr = this.pool.request().input('id', sql.Int, id);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("SELECT user_id, username, password, phone, email, permission_level FROM dbo.Users WHERE user_id = @id;")
    .then(res => {
      let rs = res.recordset;
      if (rs.length === 0) cb(this.NOT_FOUND);
      else cb(null, rs[0]);
    })
    .catch(err => {
      cb(err);
    });
  }

  addUser = function(req, user, cb) {
    // the line below if we want to have the accounts created by other users (admins) only
    // if (req.user === undefined || req.user.permission_level > user.permission_level) return cb(this.UNAUTHORIZED);
    this.getUserByName(user.username, (err, res) => {
      if (err == null) return cb(this.CONFLICT);
      else if (err != this.NOT_FOUND) return cb(err);
      let sr;
      try {
        sr = this.pool.request().input('username', sql.VarChar, user.username)
        .input('password', sql.VarChar, user.password)
        .input('phone', sql.VarChar, "+00000000000")
        .input('email', sql.VarChar, user.email)
        .input('permission_level', sql.Int, 0);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query(`INSERT INTO dbo.Users (username, password, phone, email, permission_level)
        OUTPUT inserted.user_id, inserted.username
        VALUES(@username, @password, @phone, @email, @permission_level);`) // user_id is enough for serialization?
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    });
  }

  editUser = function(req, id, user, cb) {
    this.getUserById(id, (err, res) => {
      if (err != null) return cb(err);
      if (req.user === undefined || req.user.permission_level > user.permission_level || req.user.permission_level > res.permission_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('id', sql.Int, id)
        .input('username', sql.VarChar, user.username)
        .input('password', sql.VarChar, user.password)
        .input('phone', sql.VarChar, user.phone)
        .input('email', sql.VarChar, user.email)
        .input('permission_level', sql.Int, user.permission_level);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query("UPDATE dbo.Users SET username = @username, password = @password, phone = @phone, email = @email, permission_level = @permission_level WHERE id = @id")
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    });
  }

  deleteUser = function(req, id, cb) {
    this.getUserById(id, (err, res) => {
      if (err != null) return cb(err);
      if (req.user === undefined || req.user.permission_level > res.permission_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('id', sql.Int, id);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query("DELETE FROM dbo.Users WHERE id = @id")
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    });    
  }

  getUserPermissions = function(id, cb) {
    let sr;
    try {
      sr = this.pool.request().input('id', sql.Int, id);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("SELECT permission_id FROM dbo.UserPermissions WHERE user_id = @id")
    .then(res => {
      let rs = res.recordset;
      let a = rs.map(e => e.permission_id);
      cb(null, a);
    })
    .catch(err => {
      cb(err);
    })
  }

  getItems = function(cb) {
    sql.query(`SELECT I.item_index, T.item_id, T.name as t_name, T.description as t_desc, T.price, T.restricted_level as t_rl, L.location_id, L.name as l_name, L.description as l_desc, L.restricted_level as l_rl, I.details, I.quantity, I.restricted_level as i_rl FROM dbo.Items AS I
                LEFT JOIN dbo.ItemTypes AS T ON I.item_id = T.item_id
                LEFT JOIN dbo.Locations AS L ON I.location_id = L.location_id`)
    .then(res => {
      let rs = res.recordset;
      let a = []
      rs.forEach(e => {
        let ae = {id: e.item_index,
                  type: {
                    id: e.item_id,
                    name: e.t_name,
                    description: e.t_desc,
                    price: e.price,
                    restricted_level: e.t_rl
                  },
                  location: {
                    id: e.location_id,
                    name: e.l_name,
                    description: e.l_desc,
                    restricted_level: e.l_rl
                  },
                  details: e.details,
                  quantity: e.quantity,
                  restricted_level: e.i_rl
          };
        a.push(ae);
      });
      cb(null, a);
    })
    .catch(err => {
      cb(err);
    })
  }

  getItemById = function(id, cb) {
    let sr;
    try {
      sr = this.pool.request().input('id', sql.Int, id);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query(`SELECT I.item_index, T.item_id, T.name as t_name, T.description as t_desc, T.price, T.restricted_level as t_rl, L.location_id, L.name as l_name, L.description as l_desc, L.restricted_level as l_rl, I.details, I.quantity, I.restricted_level as i_rl FROM dbo.Items AS I
                LEFT JOIN dbo.ItemTypes AS T ON I.item_id = T.item_id
                LEFT JOIN dbo.Locations AS L ON I.location_id = L.location_id
                WHERE item_index = @id`)
    .then(res => {
      let rs = res.recordset;
      if (rs.length == 0) return cb(this.NOT_FOUND);
      let e = rs[0];
      let ae = {id: e.item_index,
                type: {
                  id: e.item_id,
                  name: e.t_name,
                  description: e.t_desc,
                  price: e.price,
                  restricted_level: e.t_rl
                },
                location: {
                  id: e.location_id,
                  name: e.l_name,
                  description: e.l_desc,
                  restricted_level: e.l_rl
                },
                details: e.details,
                quantity: e.quantity,
                restricted_level: e.i_rl
        };
      cb(null, ae);
    })
    .catch(err => {
      cb(err);
    })
  }

  addItem = function(req, item, cb) {
    if (req.user === undefined || req.user.permission_level > item.restricted_level) return cb(this.UNAUTHORIZED);
    let sr;
    try {
      sr = this.pool.request().input('item_id', sql.VarChar, item.item_id)
      .input('location_id', sql.VarChar, item.location_id)
      .input('details', sql.VarChar, item.details)
      .input('quantity', sql.Decimal, item.quantity)
      .input('restricted_level', sql.Int, item.restricted_level);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("INSERT INTO dbo.Items (item_id, location_id, details, quantity, restricted_level) OUTPUT inserted.item_index VALUES(@item_id, @location_id, @details, @quantity, @restricted_level);")
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
  }

  updateItem = function(req, id, item, cb) {
    this.getItemById(id, (err, res) => {
      if (err != null) return cb(err);
      if (req.user === undefined || req.user.permission_level > res.restricted_level || req.user.permission_level > item.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('item_index', sql.Int, id)
        .input('item_id', sql.Int, item.item_id)
        .input('location_id', sql.Int, item.location_id)
        .input('details', sql.VarChar, item.details)
        .input('quantity', sql.Decimal, item.quantity)
        .input('restricted_level', sql.Int, item.restricted_level);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sql.query(`UPDATE dbo.Items SET item_id = @item_id, location_id = @location_id, details = @details, quantity = @quantity, restricted_level = @restricted_level
                WHERE item_index = @item_index;`)
      .then(res => {
        let rs = res.recordset;
        if (rs.length == 0) return cb(this.NOT_FOUND);
        let e = rs[0];
        let ae = {id: e.item_index,
                  type: {
                    id: e.item_id,
                    name: e.t_name,
                    description: e.t_desc,
                    price: e.price,
                    restricted_level: e.t_rl
                  },
                  location: {
                    id: e.location_id,
                    name: e.l_name,
                    description: e.l_desc,
                    restricted_level: e.l_rl
                  },
                  details: e.details,
                  quantity: e.quantity,
                  restricted_level: e.i_rl
          };
        cb(null, ae);
      })
      .catch(err => {
        cb(err);
      });
    });    
  }

  deleteItem = function(req, id, cb) {
    this.getItemById(id, (err, res) => {
      if (err != null) return cb(err);
      if (req.user === undefined || req.user.permission_level > res.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('item_index', sql.Int, id);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sql.query(`DELETE FROM dbo.Items WHERE item_index = @item_index;`)
      .then(res => {
        let rs = res.recordset;
        if (rs.length == 0) return cb(this.NOT_FOUND);
        let e = rs[0];
        let ae = {id: e.item_index,
                  type: {
                    id: e.item_id,
                    name: e.t_name,
                    description: e.t_desc,
                    price: e.price,
                    restricted_level: e.t_rl
                  },
                  location: {
                    id: e.location_id,
                    name: e.l_name,
                    description: e.l_desc,
                    restricted_level: e.l_rl
                  },
                  details: e.details,
                  quantity: e.quantity,
                  restricted_level: e.i_rl
          };
        cb(null, ae);
      })
      .catch(err => {
        cb(err);
      });
    });    
  }

  getItemTypes = function(cb) {
    sql.query(`SELECT item_id, name, description, price, restricted_level FROM dbo.ItemTypes`)
    .then(res => {
      let rs = res.recordset;      
      cb(null, rs);
    })
    .catch(err => {
      cb(err);
    })
  }

  getItemTypeById = function(id, cb) {
    let sr;
    try {
      sr = this.pool.request().input('id', sql.Int, id);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query(`SELECT item_id, name, description, price, restricted_level FROM dbo.ItemTypes
                WHERE item_id = @id`)
    .then(res => {
      let rs = res.recordset;
      if (rs.length == 0) return cb(this.NOT_FOUND);
      cb(null, rs[0]);
    })
    .catch(err => {
      cb(err);
    })
  }

  addItemType = function(req, itype, cb) {
    if (req.user === undefined || req.user.permission_level > itype.restricted_level) return cb(this.UNAUTHORIZED);
    let sr;
    try {
      sr = this.pool.request().input('name', sql.VarChar, itype.name)
      .input('description', sql.VarChar, itype.description)
      .input('price', sql.Decimal, itype.price)
      .input('restricted_level', sql.Int, itype.restricted_level);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("INSERT INTO dbo.ItemTypes (name, description, price, permission_level) OUTPUT inserted.item_id VALUES(@name, @description, @price, @permission_level);")
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
  }

  updateItemType = function(req, id, itype, cb) {
    this.getItemTypeById(id, (err, res) => {
      if (req.user === undefined || req.user.permission_level > itype.restricted_level || req.user.permission_level > res.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('item_id', sql.Int, id)
        .input('name', sql.VarChar, itype.name)
        .input('description', sql.VarChar, itype.description)
        .input('price', sql.Decimal, itype.price)
        .input('restricted_level', sql.Int, itype.restricted_level);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query(`UPDATE dbo.ItemTypes SET name = @name, description = @description, price = @price, permission_level = @permission_level
                WHERE item_id = @item_id;`)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    })    
  }

  deleteItemType = function(req, id, cb) {
    this.getItemTypeById(id, (err, res) => {
      if (req.user === undefined || req.user.permission_level > res.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('item_id', sql.VarChar, id)
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query(`DELETE FROM dbo.ItemTypes WHERE item_id = @item_id;`)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    })    
  }

  getLocations = function(cb) {
    sql.query(`SELECT location_id, name, description, restricted_level FROM dbo.Locations`)
    .then(res => {
      let rs = res.recordset;      
      cb(null, rs);
    })
    .catch(err => {
      cb(err);
    })
  }

  getLocationById = function(id, cb) {
    let sr;
    try {
      sr = this.pool.request().input('id', sql.Int, id);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query(`SELECT location_id, name, description, restricted_level FROM dbo.Locations
                WHERE location_id = @id`)
    .then(res => {
      let rs = res.recordset;
      if (rs.length == 0) return cb(this.NOT_FOUND);
      cb(null, rs[0]);
    })
    .catch(err => {
      cb(err);
    })
  }

  addLocation = function(req, loc, cb) {
    if (req.user === undefined || req.user.permission_level > loc.restricted_level) return cb(this.UNAUTHORIZED);
    let sr;
    try {
      sr = this.pool.request().input('name', sql.VarChar, loc.name)
      .input('description', sql.VarChar, loc.description)
      .input('restricted_level', sql.Int, loc.restricted_level);
    }
    catch {
      return cb(this.MALFORMED);
    }
    sr.query("INSERT INTO dbo.Locations (name, description, permission_level) OUTPUT inserted.location_id VALUES(@name, @description, @permission_level);")
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
  }

  updateLocation = function(req, id, loc, cb) {
    this.getLocationById(id, (err, res) => {
      if (req.user === undefined || req.user.permission_level > loc.restricted_level || req.user.permission_level > res.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('location_id', sql.Int, id)
        .input('name', sql.VarChar, loc.name)
        .input('description', sql.VarChar, loc.description)
        .input('restricted_level', sql.Int, loc.restricted_level);
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query(`UPDATE dbo.Locations SET name = @name, description = @description, permission_level = @permission_level
                WHERE location_id = @location_id;`)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    })    
  }

  deleteLocation = function(req, id, cb) {
    this.getLocationById(id, (err, res) => {
      if (req.user === undefined || req.user.permission_level > res.restricted_level) return cb(this.UNAUTHORIZED);
      let sr;
      try {
        sr = this.pool.request().input('location_id', sql.VarChar, id)
      }
      catch {
        return cb(this.MALFORMED);
      }
      sr.query(`DELETE FROM dbo.Locations WHERE location_id = @location_id;`)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
    })    
  }

  errorHandling = function(err, res, next) {
    if (err == this.UNAUTHORIZED) {
      res.status(403);
      res.send("403 Forbidden");
    }
    else if (err == this.MALFORMED) {
      res.status(400);
      res.send("400 Bad Request");
    } 
    else if (err == this.NOT_FOUND) {
      res.status(404);
      res.send("404 Not Found");
    }
    else if (err == this.CONFLICT) {
      res.status(409);
      res.send("409 Conflict");
    }
    else if (err) {
      res.status(500);
      res.send("500 Internal Server Error");
    }
    else next();
  }
}

const repo = new Repo();



export { repo };