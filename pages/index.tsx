import { GetStaticProps, InferGetStaticPropsType } from 'next';

import g from '@/styles/grid.module.css';
import dbClient from 'data/dbClient';
import { TCoverSong } from 'types/songs';
import { DECEMBER_LENGTH } from 'utils/constants';
import { DayCard } from 'components/day-card';

type HomePageProps = {
  songPerDay: TCoverSong[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  if (!dbClient) {
    return { props: { songPerDay: [] } };
  }
  const { data, error } = await dbClient.from('songs').select('cover_url, name, published_date');
  if (error) throw new Error('wow');

  const o = data.reduce<Record<string, TCoverSong>>((acc, curr) => {
    if (!curr.published_date) return acc;
    const dayKey = new Date(curr.published_date).toLocaleDateString();
    if (acc[dayKey]) return acc;
    return { ...acc, [dayKey]: curr };
  }, {});

  return {
    props: { songPerDay: Object.values(o) },
  };
};

export default function Home({ songPerDay }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <header className="flex flex-col justify-center items-start gap-2 px-4 py-6 h-[20vh] max-w-[1300px] mx-auto">
        <h1 className="text-6xl text-white font-bold">All ears on me</h1>
        <h2 className="text-base">Salut la mif, bienvenu dans votre calendrier de l&apos;avent 2022</h2>
      </header>
      <main className="min-h-[80vh]  p-4 flex flex-col items-center justify-center">
        <section className={['grid w-full h-full gap-4 max-w-[1200px]', g.grid_container].join(' ')}>
          {Array.from({ length: DECEMBER_LENGTH }, (_, i) => {
            const song = songPerDay.find((s) =>
              s.published_date ? new Date(s.published_date).getDate() === i + 1 : false,
            );
            return <DayCard key={i + 1} index={i + 1} song={song} />;
          })}
        </section>
      </main>

      <footer className="flex justify-center items-center gap-2 py-8 border-t border-t-[#eaeaea]">
        <a href="https://github.com/nterol" target="_blank" rel="noopener noreferrer">
          From @nterol, with
          <span className="h-4">❤️</span>
        </a>
      </footer>
    </>
  );
}
