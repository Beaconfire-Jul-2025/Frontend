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
    if (username === 'admin' && password === 'ant.design') {
      res.send({
        status: 'ok',
        type: 'account',
        currentAuthority: 'hr',
        token: 'mock-jwt-token-hr',
      });
      return;
    }
    if (username === 'user' && password === 'ant.design') {
      res.send({
        status: 'ok',
        type: 'account',
        currentAuthority: 'employee',
        token: 'mock-jwt-token-employee',
      });
      return;
    }
    if (username === 'onboard' && password === 'ant.design') {
      res.send({
        status: 'ok',
        type: 'account',
        currentAuthority: 'employee-onboard',
        token: 'mock-jwt-token-employee-onboard',
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
