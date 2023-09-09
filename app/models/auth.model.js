const db = require('../dbconnection')


exports.createUser = async (newUser) => {
    const { userName, userEmail, userPassword } = newUser;
    const sql = 'INSERT INTO users (userName,userEmail,userPassword) VALUES (?,?,?)';

    const [result] = await db.promise().execute(sql, [userName, userEmail, userPassword]);

    return result.insertId;
}

//get user by email

exports.getUserByEmail = async (userEmail) => {
    const sql = 'SELECT * FROM users WHERE userEmail = ?';
    const [result] = await db.promise().execute(sql, [userEmail]);
    return result[0]
}

exports.createUserIfNotExists = async (profile) => {
    const { displayName, emails, photos } = profile

    const exitingUser = await exports.getUserByEmail(emails[0].value)

    if (!exitingUser) {
        const sql = 'INSERT INTO users (userName,userEmail,userAvt) VALUES (?,?,?)'
        const [result] = await db.promise().execute(sql, [displayName, emails[0].value, photos[0].value])

        return { userId: result.insertId, userName: displayName, userEmail: emails[0].value, userAvatar: photos[0].value }
    }

    return exitingUser
}

exports.updateUserPassword = async (userEmail, userNewPassword) => {
    const sql = `UPDATE users SET userPassword = ? WHERE userEmail = ?`;
    const [result] = await db.promise().execute(sql, [userNewPassword, userEmail]);
    return result[0]
}

exports.updateDataUser = async (userPhoneNumber, userAddress, userEmail) => {
    const sql = 'UPDATE users SET userPhoneNumber = ?, userAddress = ? WHERE userEmail = ?'
    const [result] = await db.promise().execute(sql, [userPhoneNumber, userAddress, userEmail])
    if (result.length > 0) {
        return true
    } else {
        return false
    }
}