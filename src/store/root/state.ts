import { Notification } from 'models/notification';

export interface RootState {
  notification: Notification | null;
}
