import * as Mailgen from 'mailgen';

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'localhost',
    link: 'http://localhost:3000/',
  },
});
