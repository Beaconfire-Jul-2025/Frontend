import type {Request, Response} from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
  // Landlord
  'GET /api/housing/landlord': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({
      list: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          cellPhone: '1234567890',
          createDate: new Date().toISOString(),
          lastModificationDate: new Date().toISOString(),
        },
      ],
      current: 1,
      pageSize: 10,
      total: 1,
    });
  },
  'POST /api/housing/landlord': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({...req.body, id: Math.floor(Math.random() * 1000)});
  },
  'GET /api/housing/landlord/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({
      id: Number(req.params.id),
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cellPhone: '1234567890',
      createDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
    });
  },
  'PUT /api/housing/landlord/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({...req.body, id: Number(req.params.id)});
  },
  'DELETE /api/housing/landlord/:id': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({status: 'ok'});
  },

  // House
  'GET /api/housing/house': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({
      list: [
        {
          id: 1,
          landlordId: 1,
          address: '123 Main St',
          maxOccupant: 4,
          description: 'Nice house',
          currentOccupant: 2,
          createDate: new Date().toISOString(),
          lastModificationDate: new Date().toISOString(),
        },
      ],
      current: 1,
      pageSize: 10,
      total: 1,
    });
  },
  'POST /api/housing/house': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({...req.body, id: Math.floor(Math.random() * 1000), currentOccupant: 0});
  },
  'GET /api/housing/house/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({
      id: Number(req.params.id),
      landlordId: 1,
      address: '123 Main St',
      maxOccupant: 4,
      description: 'Nice house',
      currentOccupant: 2,
      createDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
    });
  },
  'PUT /api/housing/house/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({...req.body, id: Number(req.params.id), currentOccupant: 2});
  },
  'DELETE /api/housing/house/:id': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({status: 'ok'});
  },
  'POST /api/housing/house/:houseId/current-occupant/increase': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send(3); // new currentOccupant
  },
  'POST /api/housing/house/:houseId/current-occupant/decrease': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send(1); // new currentOccupant
  },
  'POST /api/housing/house/assign': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send(1); // assigned houseId
  },
  'GET /api/housing/house/:houseId/current-occupant': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send(2); // currentOccupant
  },
  'GET /api/housing/house/available': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({
      list: [
        {
          id: 2,
          landlordId: 1,
          address: '456 Oak St',
          maxOccupant: 3,
          description: 'Available house',
          currentOccupant: 0,
          createDate: new Date().toISOString(),
          lastModificationDate: new Date().toISOString(),
        },
      ],
      current: 1,
      pageSize: 3,
      total: 1,
    });
  },

  // Facility
  'GET /api/housing/facilities': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({
      list: [
        {
          id: 1,
          type: 'Washer',
          quantity: 2,
          description: 'Washer in basement',
          createDate: new Date().toISOString(),
          lastModificationDate: new Date().toISOString(),
          house: {
            id: 1,
            landlordId: 1,
            address: '123 Main St',
            maxOccupant: 4,
            description: 'Nice house',
            currentOccupant: 2,
            createDate: new Date().toISOString(),
            lastModificationDate: new Date().toISOString(),
          },
          facilityReports: [],
        },
      ],
      current: 1,
      pageSize: 10,
      total: 1,
    });
  },
  'POST /api/housing/facilities': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({...req.body, id: Math.floor(Math.random() * 1000)});
  },
  'GET /api/housing/facilities/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({
      id: Number(req.params.id),
      type: 'Washer',
      quantity: 2,
      description: 'Washer in basement',
      createDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
      house: {
        id: 1,
        landlordId: 1,
        address: '123 Main St',
        maxOccupant: 4,
        description: 'Nice house',
        currentOccupant: 2,
        createDate: new Date().toISOString(),
        lastModificationDate: new Date().toISOString(),
      },
      facilityReports: [],
    });
  },
  'PUT /api/housing/facilities/:id': async (req: Request, res: Response) => {
    await waitTime(300);
    res.send({...req.body, id: Number(req.params.id)});
  },
  'DELETE /api/housing/facilities/:id': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({status: 'ok'});
  },

  // Facility Report
  'GET /api/housing/facility-report': async (req: Request, res: Response) => {
    await waitTime(500);
    res.send({
      list: [
        {
          id: 1,
          facility: {
            id: 1,
            type: 'Washer',
            quantity: 2,
            description: 'Washer in basement',
            createDate: new Date().toISOString(),
            lastModificationDate: new Date().toISOString(),
            house: {
              id: 1,
              landlordId: 1,
              address: '123 Main St',
              maxOccupant: 4,
              description: 'Nice house',
              currentOccupant: 2,
              createDate: new Date().toISOString(),
              lastModificationDate: new Date().toISOString(),
            },
            facilityReports: [],
          },
          employeeId: 'E001',
          title: 'Broken Washer',
          description: 'The washer is not working.',
          createDate: new Date().toISOString(),
          status: 'open',
        },
      ],
      current: 1,
      pageSize: 10,
      total: 1,
    });
  },
  'POST /api/housing/facility-report': async (req: Request, res: Response) => {
    await waitTime(500);
    res.status(201).send({reportId: Math.floor(Math.random() * 1000), message: 'Report created'});
  },
  'POST /api/housing/facility-report/:reportId/comment': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({commentId: Math.floor(Math.random() * 1000), message: 'Comment added'});
  },
  'PATCH /api/housing/facility-report/:reportId/status': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({
      success: true,
      message: 'Status updated',
      reportId: Number(req.params.reportId),
      previousStatus: 'open',
      newStatus: req.query.status,
      updatedAt: new Date().toISOString(),
    });
  },
  'PATCH /api/housing/facility-report/:reportId/comment/:commentId': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({commentId: Number(req.params.commentId), message: 'Comment updated'});
  },
  'GET /api/housing/facility-report/:reportId/details': async (req: Request, res: Response) => {
    await waitTime(200);
    res.send({
      id: Number(req.params.reportId),
      facilityType: 'Washer',
      title: 'Broken Washer',
      description: 'The washer is not working.',
      status: 'open',
      createdBy: 'E001',
      createDate: new Date().toISOString(),
      lastModificationDate: new Date().toISOString(),
      comments: [
        {
          commentId: 1,
          createdBy: 'E001',
          commentDate: new Date().toISOString(),
          description: 'Please fix soon.',
        },
      ],
    });
  },
};

