import { useMutation } from '@tanstack/vue-query';
import type { User } from './contracts/user';

export function useRegisterMutation() {
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: async (values: User) => {
      const response = await fetch('/api/users/new', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const payoad = await response.json();
      if (!payoad.success) {
        throw new Error(payoad.error);
      }
    },
  });
  return { register: mutateAsync, ...rest };
}
