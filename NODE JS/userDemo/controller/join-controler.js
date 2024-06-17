const { Router } = require("express");
const router = Router();
const { QueryTypes, Sequelize } = require('sequelize');


const sequelize = new Sequelize('mysql://root:Bansi@localhost:4306/enquiry_database');

router.get('/', async (req, res) => {
    try {
        const users = await sequelize.query(
            // 'SELECT users.firstName, users.id, enquiries.subject FROM users INNER JOIN enquiries ON users.id = enquiries.user_id',
            //  'SELECT users.id,users.firstName, users.lastName,users.email, enquiries.subject,enquiries.message FROM users LEFT JOIN enquiries on users.id=enquiries.user_id',
        //  'SELECT users.id,users.firstName, users.lastName,users.email, enquiries.subject FROM users RIGHT JOIN enquiries on users.id=enquiries.user_id',
        //'SELECT users.firstName, enquiries.subject FROM users CROSS JOIN enquiries',
        `SELECT A.firstName AS userName1, B.firstName AS userName2, A.email
            FROM users A, users B
            WHERE A.id <> B.id AND A.email = B.email
            ORDER BY A.email`,
            {
                type: QueryTypes.SELECT
            }
        );
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;
