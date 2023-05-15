import {db} from "../db.js";

export const getProducts = (req, res) => {
    const code = req.query.code;
    const q = `SELECT * FROM products where code=${code}`;

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
};