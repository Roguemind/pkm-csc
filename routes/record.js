const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

// TODO: Sesuaikan konfigurasi database
const mysql_pool = mysql.createPool({
  host: "10.128.232.235",
  user: "pkmcsc",
  database: "pkmcsc",
  password: "pkmcsc123!"
});

router.post("/insertPresence", (req, res) => {
  const nim = req.body.nim;  
  const dosen = req.body.dosen;
  const card_id = req.body.card_id;

  console.log(req.body);

  // Assuming presence_status is 1 for "absent," you can change it as needed.
  const presence_status = 1;

  // Using a parameterized query to prevent SQL injection.
  const query =
    "INSERT INTO presence (nim, absen, dosen, waktu, card_id) VALUES (?, ?, ?, NOW(), ?)";

  	mysql_pool.getConnection(function(err, connection) {
      if (err) {
        connection.release();
        console.log(' Error getting mysql_pool connection: ' + err);
      }
      else {
        connection.query(
          query,
          [nim, presence_status, dosen, card_id],
          (err, rows, fields) => {
            if (err) {
              console.error("Error inserting presence:", err);
              res.status(500).send({ message: err });
              console.log(req.body);
            } else {
              res.status(200).send({ message: "Absen Berhasil" });
              console.log(req.body);
            }
            console.log('mysql_pool.release()');
            connection.release();
          }
        );
      }
    });
});

router.get("/cekDosen", (req, res) => {
  const card_id = req.query.card_id;
  const getQuery = 'SELECT count(nidn) as pencarian FROM dosen WHERE nidn = "'+ card_id + '"'
  mysql_pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log('Error Getting mysql_pool connection:' + err);
    } else {
      connection.query(getQuery, (err, result) => {
        if(err) {
          res.status(500).send({ err });
        } else {
          const hasil = result[0].pencarian;
          res.status(200).send(hasil);
          console.log(result);
          console.log(result[0].pencarian);
        }
        console.log('mysql_pool.release()');
        connection.release();
      });
    }
  })
});

router.get("/cekMhs", (req, res) => {
  const card_id = req.query.card_id;
  const getQuery = 'SELECT count(nim) as pencarian FROM mahasiswa WHERE card_id = "'+ card_id + '"'
  mysql_pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log('Error Getting mysql_pool connection:' + err);
    } else {
      connection.query(getQuery, (err, result) => {
        if(err) {
          res.status(500).send({ err });
        } else {
          const hasil = result[0].pencarian;
          res.status(200).json(hasil);
          console.log(result);
          console.log(result[0].pencarian);
        }
        console.log('mysql_pool.release()');
        connection.release();
      });
    }
  })
});

router.get("/cekJadwal", (req, res) => {
  const time = new Date;
  const card_id = req.query.card_id;
  connection.connect(function(err) {
    connection.query('SELECT * FROM jadwal WHERE ')
  })
})

module.exports = router;
