import type { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * Mock for /api/composite/currentUser
 */
export default {
  'GET /api/composite/currentUser': async (req: Request, res: Response) => {
    // Support JWT mock: check Authorization header or token query param
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.replace('Bearer ', '')) || req.query.token;
    let userData;
    if (token === 'mock-jwt-token-hr') {
      userData = {
        name: 'HR User',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: 'hr-0001',
        email: 'hr@demo.com',
        signature: 'Mocked HR user',
        title: 'HR Specialist',
        group: 'HR Group',
        tags: [
          { key: '0', label: 'HR' },
          { key: '1', label: 'Mock' },
        ],
        notifyCount: 10,
        unreadCount: 3,
        country: 'HRLand',
        access: 'hr',
        geographic: {
          province: { label: 'HR Province', key: '100000' },
          city: { label: 'HR City', key: '100001' },
        },
        address: 'HR Address',
        phone: '100-00000000',
      };
    } else if (token === 'mock-jwt-token-employee') {
      userData = {
        name: 'Employee User',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: 'employee-0001',
        email: 'employee@demo.com',
        signature: 'Mocked employee user',
        title: 'Employee',
        group: 'Employee Group',
        tags: [
          { key: '0', label: 'Employee' },
          { key: '1', label: 'Mock' },
        ],
        notifyCount: 2,
        unreadCount: 1,
        country: 'EmployeeLand',
        access: 'employee',
        geographic: {
          province: { label: 'Employee Province', key: '200000' },
          city: { label: 'Employee City', key: '200001' },
        },
        address: 'Employee Address',
        phone: '200-00000000',
      };
    } else if (token === 'mock-jwt-token-employee-onboard') {
      userData = {
        name: 'Onboarding Employee',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: 'onboard-0001',
        email: 'onboard@demo.com',
        signature: 'Mocked onboarding employee',
        title: 'Employee Onboard',
        group: 'Onboarding Group',
        tags: [
          { key: '0', label: 'Onboard' },
          { key: '1', label: 'Mock' },
        ],
        notifyCount: 0,
        unreadCount: 0,
        country: 'OnboardLand',
        access: 'employee-onboard',
        geographic: {
          province: { label: 'Onboard Province', key: '300000' },
          city: { label: 'Onboard City', key: '300001' },
        },
        address: 'Onboard Address',
        phone: '300-00000000',
      };
    } else {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    await waitTime(500);
    res.send({
      success: true,
      data: userData,
    });
  },
};
