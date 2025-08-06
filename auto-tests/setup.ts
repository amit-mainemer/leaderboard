import axios from 'axios';
import { faker } from '@faker-js/faker';

axios.defaults.timeout = 10000;

export const generateUsername = (prefix: string = "test") => {
  return `${prefix}_${faker.internet.username()}`;
};

export const generateScore = (min: number = 0, max: number = 100000) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));