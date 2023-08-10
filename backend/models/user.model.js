const bcrypt = require("bcryptjs");
const db = require("../data/database");

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postCode: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection("users").findOne({
            email: this.email
        });
    }

    async signUp() {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await db.getDb().collection("users").insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
    }

    hasMatchingPassord(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword)
    }
}

module.exports = User;