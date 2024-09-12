import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    // dummy code;
    console.log('/task create action', data);

    try {
      dummyValidateCreateAction(data);
    } catch (error: any) {
      return fail(422, {
        description: error?.cause ?? 'Validation error',
        error: error.message,
      });
    }
  },
};

const dummyValidateCreateAction = (data: FormData) => {
  if (!data.has('userMessage') || !data.get('userMessage')?.toString()?.trim()) {
    throw new Error('userMessage', { cause: 'User message is required' });
  }
};
