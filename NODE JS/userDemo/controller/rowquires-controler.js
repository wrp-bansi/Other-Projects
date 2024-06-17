const { Router } = require("express");
const router = Router();
const { QueryTypes, Sequelize } = require('sequelize');
const { user } = require('../models');

const sequelize = new Sequelize('mysql://root:Bansi@localhost:4306/enquiry_database');

router.get('/', async (req, res) => {
//     try {
//       const users = await sequelize.query("SELECT * FROM `users`", {
//         type: QueryTypes.SELECT,
//         model: user,

//   mapToModel: true,
// //   plain:true
//       });
//       res.json(users);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }


// const users=await sequelize.query(
//     'SELECT * FROM users WHERE password = ?',
//     {
//       replacements: ['123'],
//       type: QueryTypes.SELECT
//     }
//   );
//   res.json(users);
//   });

// const users=await sequelize.query(
//     'SELECT * FROM users WHERE id = :id',
//     {
//       replacements: {id: '1'},
//       type: QueryTypes.SELECT
//     }
//   );
//   res.json(users);
//   });

// const users=await sequelize.query(
//     'SELECT * FROM users WHERE firstName LIKE :search_name',
//     {
//     //   replacements: { search_name: 'ban%' },
//       replacements: { search_name: '%si' },
//       type: QueryTypes.SELECT
//     }
//   );
//   res.json(users);
//   });

// const users=await sequelize.query(

//      'SELECT * FROM users WHERE id =$id',
//     {
//       bind: { id: '1'},
//       type: QueryTypes.SELECT
//     }
//   );
//   res.json(users);
//   });


const users=await sequelize.query(
    'SELECT *, "text with literal $$1 and literal $$id" as t FROM users WHERE id = $1',
   {
     bind: ['1'] ,
     type: QueryTypes.SELECT
   }
 );
 res.json(users);
 });



module.exports=router