import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  'POST /api/auth/login': async (req: Request, res: Response) => {
    const { username, password } = req.body;
    await waitTime(1000);
    if ((username === 'admin' || username === 'user') && password === 'ant.design') {
      // Return a mock JWT token
      res.send({
        status: 'ok',
        type: 'account',
        currentAuthority: username === 'admin' ? 'admin' : 'user',
        token: 'mock-jwt-token',
      });
      return;
    }
    res.send({
      status: 'error',
      type: 'account',
      currentAuthority: 'guest',
    });
  },
};
