import bcrypt from 'bcryptjs';

console.log('cabalo:', bcrypt.hashSync('cabalo', 10));
