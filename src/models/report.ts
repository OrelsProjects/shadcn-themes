export interface Report {
  id: string;
  userId: string;
  themeId: string;
  comments?: string;
}

export type CreateReport = Omit<Report, "id" | "userId">;
export type UpdateReport = Pick<Report, "id" | "comments">;