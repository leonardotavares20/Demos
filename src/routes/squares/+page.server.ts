import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async () => {
  async function getImage() {
    let response = await fetch(`https://api.unsplash.com/photos/${env.PHOTO}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${env.ACESS_TOKEN}`,
      },
    });

    const data = await response.json();

    return data;
  }

  return {
    image: getImage(),
  };
};
