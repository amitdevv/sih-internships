export type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
  read?: boolean;
};

export const mockNotifications: NotificationItem[] = [
  { id: "n1", title: "Mentor approved your application", createdAt: "2h", read: false },
  { id: "n2", title: "Interview scheduled for Backend Intern", createdAt: "1d", read: true },
  { id: "n3", title: "Offer extended from Acme Corp", createdAt: "3d", read: false },
];


