import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  link: string;
  error?: string;
};

export default async function deezerHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { body } = req;
  const { artistName, trackName } = JSON.parse(body);
  try {
    const urlSearch = `https://api.deezer.com/search?q=artist:"${artistName}"track:"${trackName}"`;

    const raw = await fetch(urlSearch, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const serverAns = await raw.json();

    res.status(200).json({
      link: serverAns.data?.[0]?.link ?? 'not found',
    });
  } catch (err) {
    res.status(404).json({ error: 'enough' });
  }
}
