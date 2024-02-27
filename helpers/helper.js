import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;  // Add this line to return the hashed password
    } catch (error) {
        console.log("Error in hashing the password", error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};