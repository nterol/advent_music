import { DeezerIcon, SpotifyIcon, YoutubeMusicIcon } from 'components/icons/platform-icons';
import Image from 'next/image';
import { ForeignUser, SongRow } from 'types/songs';
import { intersperse } from 'utils/intersperse';

type CardProps = {
  song: SongRow & ForeignUser;
};

export function Card({ song }: CardProps): JSX.Element {
  const { users } = song;

  return (
    <article className="rounded-xl bg-white shadow-lg xs:p-2 md:p-6 flex xs:flex-col md:flex-row overflow-hidden">
      <div className="relative h-[250px] min-w-[250px] bg-slate-300 rounded-xl overflow-hidden shadow-xl">
        {song.cover_url ? <Image src={song.cover_url} alt={song.name ?? ''} fill /> : null}
      </div>
      <main className="flex xs:flex-col md:flex-row gap-3 p-8 w-full">
        <div className="flex gap-2">
          <section className="flex flex-col gap-2 justify-center w-full">
            <h2 className="text-black text-2xl font-bold whitespace-nowrap">{song.name ?? 'Default Title'}</h2>
            {song?.artists?.length ? (
              <p className="text-md text-black font-bold">
                {intersperse(
                  song.artists?.map((a) => <span key={a}>{a}</span>),
                  () => (
                    <span>, </span>
                  ),
                )}
              </p>
            ) : null}
            <p className="text-sm text-black italic">{song.album}</p>
          </section>
          <section className="flex items-end gap-6 col-1">
            {song.spotify_url ? (
              <a href={song.spotify_url} target="_blank">
                <SpotifyIcon className="h-[24px] w-[24px]" />
              </a>
            ) : null}
            {song.deezer_url ? (
              <a href={song.deezer_url} target="_blank">
                <DeezerIcon className="h-[24px] w-[24px]" />
              </a>
            ) : null}
            {song.youtube_url ? (
              <a href={song.youtube_url} target="_blank">
                <YoutubeMusicIcon className="h-[24px] w-[24px]" />
              </a>
            ) : null}
          </section>
        </div>
        {song.comment ? (
          <section className="relative rounded-xl bg-light p-5 col-2 row-span-2">
            <div className="border border-txt-light absolute top-[-15px] hover:w-[150px] left-[-15px] p-1 flex bg-white gap-2 rounded-full h-[32px] w-[32px] overflow-hidden transition-all items-center">
              <div className="rounded-full min-w-[22px] min-h-[22px] w-[22px] h-[22px] bg-orange-200" />
              <p className="text-black text-sm">{Array.isArray(users) ? users[0].name : users?.name ?? ''}</p>
            </div>
            <p className="text-txt-light">{song.comment}</p>
          </section>
        ) : (
          <div></div>
        )}
      </main>
    </article>
  );
}
