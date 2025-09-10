import bcrypt from 'bcryptjs';

console.log('admin:', bcrypt.hashSync('admin', 10));
console.log('client:', bcrypt.hashSync('client', 10));
