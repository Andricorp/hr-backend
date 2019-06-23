const { secretKey } = require('../../keys');
const { encryptData, compareEncrypted } = require('../../helpers/encrypt');

const jsonwebtoken = require('jsonwebtoken');
const httpErrors = require('http-errors');
const crypto = require('crypto');
const uuid = require('uuid/v4');
require('console.json');
//const key = uuid()
// login;
// refreshToken;

// Forgotpassword;
// ResetPassword;

const createToken = async user => {
    console.json(user);
    const timestamp = new Date().getTime();
    const expires = Math.floor(Date.now() / 1000) + 4000 * 1;
    const refreshToken = crypto
        .createHmac('sha256', uuid())
        .update(uuid())
        .digest('hex');
    const storedRefreshHash = await encryptData(refreshToken);
    console.log(storedRefreshHash);
    const token = jsonwebtoken.sign(
        {
            ub: user.user_id,
            iat: timestamp,
            exp: expires
        },
        secretKey,
        { algorithm: 'HS512' }
    );
    await pool.query(`UPDATE user
    SET refresh = '${storedRefreshHash}'
    WHERE user_id = ${user.user_id};`);

    return { token, expires, refreshToken };
};

// Creates a new user and returns JWT
const signup = async input => {
    const email = input.email;
    const password = input.password;
    const id = input.userid;

    if (!email || !password) {
        return new Error('You must provide email and password');
    }

    try {
        throw new Error('signup is not allowed');
        //return await createToken(user);
    } catch (error) {
        console.log(error, 'user');
        throw new httpErrors.MethodNotAllowed(error.message);
    }
};

const signin = async input => {
    console.json(input);
    try {
        const currentUser = await pool.query(`SELECT user_password, user_id  FROM user WHERE user_email='${input.email}'`);
        console.json(currentUser);

        if (!currentUser.length && Object.keys(currentUser[0]).includes('user_password')) {
            throw new Error(`user with id ${user.userId} does not exist`);
        }
        const user = currentUser[0];
        console.json(user);

        const passwordMatches = await compareEncrypted(input.password, user.user_password);

        if (passwordMatches === Error) {
            throw new Error('An error occured while verifying the password.');
        }
        if (!passwordMatches) {
            throw new Error('Incorrect password');
        }
        console.log(`user ${input.email} is logged in`);
        return await createToken(user);
    } catch (error) {
        console.log('authentication.js: ' + error);
        throw new httpErrors.Unauthorized(error.message);
    }
};

const refresh = async input => {
    console.json(input);
    try {
        const currentUser = await pool.query(`SELECT refresh, user_id FROM user WHERE user_email='${input.email}'`);
        console.json(currentUser);

        if (!currentUser.length && Object.keys(currentUser[0]).includes('user_password')) {
            throw new Error(`user with id ${user.userId} does not exist`);
        }
        const user = currentUser[0];
        console.json(user);
        const passwordMatches = await compareEncrypted(input.refresh_token, user.refresh);

        console.log(passwordMatches);
        if (passwordMatches === Error) {
            throw new Error('An error occured while verifying the token.');
        }
        if (!passwordMatches) {
            throw new Error('Incorrect token');
        }
        console.log(`user ${input.email} is logged in`);
        return await createToken(user);
    } catch (error) {
        console.log('authentication.js: ' + error);
        throw new httpErrors.Unauthorized(error.message);
    }
};

module.exports = { signup, signin, refresh };
