export const baseUrl = "http://127.0.0.1:3000";

export const deleteCarApi = async (id: number): Promise<void> => {
  await fetch(`${baseUrl}/garage/${id}`, {
    method: "DELETE",
  });
};
