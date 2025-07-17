// service.storybook.ts
export async function rule() {
  return {
    data: [
      {
        key: 1,
        name: 'Rule 1',
        desc: 'Description 1',
        callNo: 10,
        status: 1,
        updatedAt: Date.now(),
      },
      {
        key: 2,
        name: 'Rule 2',
        desc: 'Description 2',
        callNo: 20,
        status: 2,
        updatedAt: Date.now(),
      },
    ],
    total: 2,
    success: true,
  };
}

export async function addRule() {
  return { success: true };
}

export async function updateRule() {
  return { success: true };
}

export async function removeRule() {
  return { success: true };
}
