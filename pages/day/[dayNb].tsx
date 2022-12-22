import dbClient from 'data/dbClient';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { SongRow } from '../../types/songs';

export const getStaticPaths: GetStaticPaths = async () => {
  const getDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };
  const nbOfDays = getDays(2022, 12);

  return {
    paths: Array.from({ length: nbOfDays }, (_, i) => ({
      params: { dayNb: `${i + 1}` },
    })),
    fallback: false,
  };
};

type DayPageProps = { songs: SongRow[] };

export const getStaticProps: GetStaticProps<DayPageProps> = async ({ params }) => {
  const { dayNb } = params ?? {};

  if (!dayNb) {
    return { notFound: true };
  }

  const pageDate = new Date(`December ${dayNb}, 2022`).toISOString();
  const nextDayNb = (Number(dayNb) + 1) % 31;
  const nextDate = new Date(`December ${nextDayNb ? nextDayNb : 1}, 2022`).toISOString();

  const res = await dbClient?.from('songs').select().gte('published_date', pageDate).lt('published_date', nextDate);

  const { data, error } = res ?? {};

  if (error || !data) {
    return { notFound: true };
  }

  return { props: { songs: data }, revalidate: 3600 };
};

export default function DayPage({ songs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="py-10 p-4 flex flex-col justify-center gap-8 max-w-[1000px] mx-auto">
      <Link href="/">
        <span className="text-2xl font-bold flex flex-col">
          &larr; Retour
          <hr className="border-none h-[2px] w-0 hover:w-full transition-all bg-white" />
        </span>
      </Link>
      {songs.map((song) => (
        <article className="rounded-lg bg-white shadow-lg p-2 flex xs:flex-col md:flex-row w-full">
          <div className="min-h-[320px] min-w-[320px] bg-slate-300 rounded-sm overflow-hidden">
            {song.cover_url ? <Image src={song.cover_url} alt={song.name ?? ''} width={320} height={320} /> : null}
          </div>
          <section className="flex flex-col gap-2 p-4 justify-center w-full">
            <h2 className="text-black text-2xl font-bold">{song.name ?? 'Default Title'}</h2>
            <p></p>
          </section>
        </article>
      ))}
    </main>
  );
}
