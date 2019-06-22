const roles = {
    guest: 1,
    hr: 2,
    admin: 3,
    moderator: 4
};
const keys = {
    secretKey: process.env.SECRET,
    publickKey: process.env.PUBLIC
};
module.exports = { roles, keys };
