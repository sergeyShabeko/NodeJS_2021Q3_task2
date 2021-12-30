import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

export const checkPassword = async (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword)