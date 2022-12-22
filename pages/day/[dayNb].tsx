import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { Card } from 'components/card';
import dbClient from 'data/dbClient';

import { ForeignUser, SongRow } from '../../types/songs';

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

type DayPageProps = {
  songs: (SongRow & ForeignUser)[];
};

export const getStaticProps: GetStaticProps<DayPageProps> = async ({ params }) => {
  const { dayNb } = params ?? {};

  if (!dayNb) {
    return { notFound: true };
  }

  const pageDate = new Date(`December ${dayNb}, 2022`).toISOString();
  const nextDayNb = (Number(dayNb) + 1) % 31;
  const nextDate = new Date(`December ${nextDayNb ? nextDayNb : 1}, 2022`).toISOString();

  const res = await dbClient
    ?.from('songs')
    .select('*, users(id,name)')
    .gte('published_date', pageDate)
    .lt('published_date', nextDate);

  const { data, error } = res ?? {};

  console.log(JSON.stringify(data));
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
      {songs.map((song, i) => (
        <Card key={song.id} song={song} />
      ))}
    </main>
  );
}
