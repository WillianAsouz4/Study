const bcrypto = require('bcryptjs')

async function crypto(pwd) {
    const salt = await bcrypto.gensaly()
    const pawssword = await bcrypto.hash(pwd, salt)
    return pawssword
}

module.exports = {
    crypto,
}