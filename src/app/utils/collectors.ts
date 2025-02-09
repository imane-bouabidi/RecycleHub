// @ts-ignore
import {User} from '../models/User.model';

const COLLECTORS_KEY = 'recyclehub_collectors';

const collectors: User[] = [
  {
    id: 'collector1',
    fullName: 'Collector One',
    address: '123 St, Safi',
    "city": "Safi",
    phone: '1111111111',
    email: 'collector1@example.com',
    password: 'password1',
    birthdate: new Date('1980-01-01'),
    role:'collector'
  },
  {
    id: 'collector2',
    fullName: 'Collector Two',
    address: '456 , Casa',
    "city": "casa",
    phone: '2222222222',
    email: 'collector2@example.com',
    password: 'password2',
    birthdate: new Date('1985-01-01'),
    role:'collector'
  },
  {id: 'collector3',
    fullName: 'Collector Two',
    address: '456 , Casa',
    "city": "agadir",
    phone: '2222222222',
    email: 'collector3@example.com',
    password: 'password3',
    birthdate: new Date('1985-01-01'),
    role:'collector'
  }
];

localStorage.setItem(COLLECTORS_KEY, JSON.stringify(collectors));
console.log('Collectors pre-registered in localStorage');
