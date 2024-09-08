import { dummyData } from './dummy-data';
import _ from 'lodash';

export function load() {
  const groupedChats = _.groupBy(dummyData, 'sessionId');
  const summarizedChats = _.map(groupedChats, (chats, sessionId) => ({
    sessionId,
    title: _.first(chats)?.title ?? '-untitled chat-',
    firstMessage: _.first(chats)?.content ?? '(empty message)',
    createdAt: _.first(chats)?.timestamp ?? 'N/A',
  }));
  return { chats: summarizedChats };
}
