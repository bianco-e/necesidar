export const mapResponse = (rows: any[]) => {
  if (!rows) {
    console.log("undefined rows", rows);
  }
  return rows.map((r: any) => {
    if (r.created_at !== undefined) {
      return { ...r, created_at: r.created_at.getTime() };
    } else return r;
  });
};
