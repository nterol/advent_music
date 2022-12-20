import Image from 'next/image';
import Link from 'next/link';
import type { TCoverSong } from '@/types/songs';

type DayCardProps = {
  index: number;
  song?: TCoverSong;
};

export function DayCard({ index, song }: DayCardProps) {
  const today = new Date().getDate();

  const dayName = new Date(`December ${index}, 2022`).toLocaleDateString('fr', { weekday: 'long' });
  const [c, ...rest] = dayName;

  return (
    <Link href={`/day/${index}`} className="">
      <article className="relative shadow-md rounded-md bg-slate-100 p-4 min-w-[250px] min-h-[250px] w-full  flex flex-col justify-end transition hover:-translate-y-1 hover:-translate-x-1 hover:shadow-2xl overflow-hidden">
        {song?.cover_url && song.name ? (
          <div className="absolute top-0 bottom-0 right-0 left-0 ">
            <Image
              alt={song.name}
              src={song.cover_url}
              fill
              className="contrast-75 hover:contrast-100 transition-all"
            />
          </div>
        ) : null}
        <section className="w-full pointer-events-none flex flex-col items-end text-6xl font-bold text-white z-10">
          <h2>{c.toUpperCase() + rest.join('')}</h2>
          <span
            className={[
              'w-fit block font-bold',
              today === index ? 'text-green-300' : today > index ? 'text-slate-500' : 'text-slate-900',
            ].join(' ')}
          >
            {index}
          </span>
        </section>
      </article>
    </Link>
  );
}
