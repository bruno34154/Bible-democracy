import axios from 'axios';

export default async function BooksHandleRequestGet(link, token) {
  try {
    const response = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    return `erro ${e}`;
  }
}
