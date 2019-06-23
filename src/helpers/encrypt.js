const bcrypt = require('bcrypt');

const encryptData = async data =>
    await new Promise((resolve, reject) =>
        bcrypt.genSalt(12, async function(error, salt) {
            if (error) {
                reject(error);
            }
            bcrypt.hash(data, salt, function(error, hash) {
                if (error) {
                    reject(error);
                }
                resolve(hash);
            });
        })
    );

const compareEncrypted = async (candidatePassword, storedPassword) => {
    console.log(`candidate - ${candidatePassword}, user - ${storedPassword}`);
    const match = await bcrypt.compare(candidatePassword, storedPassword);

    if (match) {
        return true;
        //login
    }
    return false;
};

module.exports = { encryptData, compareEncrypted };
