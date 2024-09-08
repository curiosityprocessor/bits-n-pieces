import { error } from '@sveltejs/kit';
import { dummyData } from '../dummy-data';

export function load({ params }) {
  const chats = dummyData.filter((data) => data.sessionId === parseInt(params.sessionId));

  if (!chats) {
    throw error(404, 'Not found');
  }
  return {
    chats,
  };
}
