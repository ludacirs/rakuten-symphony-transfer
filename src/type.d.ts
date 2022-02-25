export interface ILink {
  created_at: number;
  key: string;
  expires_at: number;
  download_count: number;
  count: number;
  size: number;
  summary: string;
  thumbnailUrl: string;
  files: File[];
  sent: Sent;
}

export interface File {
  key: string;
  thumbnailUrl: string;
  name: string;
  size: number;
}

export interface Sent {
  subject: string;
  content: string;
  emails: string[];
}
