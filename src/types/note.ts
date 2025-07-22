export interface Note {
  id: string;
  title: string;
  content: string;
  priority: 'alta' | 'baixa' | null;
  createdAt: string;
}
